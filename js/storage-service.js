/**
 * Edremit HEM Kursu - Depolama ve Oturum Servisi (LMS Storage Service)
 * Çift Modlu: LocalStorage (Varsayılan) + Firebase Realtime Database (Opsiyonel Bulut Senkronizasyonu)
 */

const STORAGE_KEYS = {
    USERS: 'ehem_users_db_v1',
    SESSION: 'ehem_current_session_v1',
    ADMIN_CREDS: 'ehem_admin_creds_v1',
    FIREBASE_CONFIG: 'ehem_firebase_config_v1',
    CLASSES: 'ehem_classes_db_v1',
    CUSTOM_MODULES: 'ehem_custom_modules_v1',
    ANNOUNCEMENTS: 'ehem_announcements_v1',
    MESSAGES: 'ehem_messages_v1'
};

const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'ehem1234',
    name: 'Kurs Yöneticisi'
};

const INITIAL_USERS = [
    {
        id: 'usr_1',
        fullName: 'Örnek Kursiyer (Ahmet Yılmaz)',
        username: 'ahmet',
        password: '123',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        currentModuleId: 1,
        completedModuleIds: [],
        unlockedModuleIds: [1],
        notes: 'Örnek Başlangıç Öğrencisi'
    },
    {
        id: 'usr_2',
        fullName: 'Örnek İleri Kursiyer (Zeynep Kaya)',
        username: 'zeynep',
        password: '123',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        currentModuleId: 4,
        completedModuleIds: [1, 2, 3],
        unlockedModuleIds: [1, 2, 3, 4],
        notes: 'İlk 3 bölümü tamamlamış öğrenci'
    }
];

class StorageService {
    constructor() {
        this.init();
    }

    init() {
        // Kullanıcı veritabanı yoksa başlat
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
        }

        // Admin kimlik bilgileri yoksa başlat
        if (!localStorage.getItem(STORAGE_KEYS.ADMIN_CREDS)) {
            localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(DEFAULT_ADMIN));
        }

        // Bulut ayarları
        this.firebaseConfig = this.getFirebaseConfig();

        // Yerel sunucu (server.js) çalışıyorsa veriyi senkronize et
        this.tryPullFromLocalServer();
    }

    async tryPullFromLocalServer() {
        if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
            try {
                const res = await fetch('/api/sync');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data));
                    }
                }
            } catch (e) {}
        }
    }

    async syncToLocalServer(users) {
        if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
            try {
                await fetch('/api/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(users)
                });
            } catch (e) {}
        }
    }

    // ==================== OTURUM & GİRİŞ İŞLEMLERİ ====================

    getAdminCreds() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_CREDS)) || DEFAULT_ADMIN;
        } catch (e) {
            return DEFAULT_ADMIN;
        }
    }

    updateAdminCreds(newUsername, newPassword) {
        const creds = {
            username: (newUsername || 'admin').trim(),
            password: (newPassword || 'ehem1234').trim(),
            name: 'Kurs Yöneticisi'
        };
        localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(creds));
        return creds;
    }

    changeAdminPassword(currentPassword, newPassword, newUsername = null) {
        const creds = this.getAdminCreds();
        const curPass = (currentPassword || '').trim();
        const newPass = (newPassword || '').trim();

        if (creds.password !== curPass) {
            return { success: false, message: 'Mevcut yönetici şifresi hatalı!' };
        }

        if (!newPass || newPass.length < 4) {
            return { success: false, message: 'Yeni şifre en az 4 karakter olmalıdır!' };
        }

        creds.password = newPass;

        if (newUsername && newUsername.trim()) {
            creds.username = newUsername.trim();
        }

        localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(creds));

        // Eğer mevcut oturum admin ise oturum bilgilerini güncelle
        const session = this.getCurrentSession();
        if (session && session.type === 'admin') {
            session.username = creds.username;
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
        }

        return { success: true, message: 'Yönetici şifresi başarıyla güncellendi!', creds };
    }

    login(username, password) {
        const u = (username || '').trim().toLowerCase();
        const p = (password || '').trim();

        // 1. Admin kontrolü
        const adminCreds = this.getAdminCreds();
        if (adminCreds.username.toLowerCase() === u && adminCreds.password === p) {
            const session = {
                type: 'admin',
                name: adminCreds.name,
                username: adminCreds.username,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
            return { success: true, role: 'admin', session };
        }

        // 2. Kursiyer kontrolü
        const users = this.getAllUsers();
        const user = users.find(x => x.username.toLowerCase() === u && x.password === p);

        if (user) {
            // Son aktiflik zamanını güncelle
            user.lastActive = new Date().toISOString();
            this.updateUser(user.id, { lastActive: user.lastActive });

            const session = {
                type: 'student',
                userId: user.id,
                name: user.fullName,
                username: user.username,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
            return { success: true, role: 'student', user, session };
        }

        return {
            success: false,
            message: 'Kullanıcı adı veya şifre hatalı!'
        };
    }

    logout() {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
    }

    getCurrentSession() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION));
        } catch (e) {
            return null;
        }
    }

    getCurrentStudent() {
        const session = this.getCurrentSession();
        if (!session || session.type !== 'student') return null;
        return this.getUserById(session.userId);
    }

    // ==================== KURSİYER (KULLANICI) İŞLEMLERİ ====================

    getAllUsers() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.USERS);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Kullanıcılar okunamadı:", e);
            return [];
        }
    }

    saveAllUsers(users) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        this.syncToFirebase(users);
        this.syncToLocalServer(users);
    }

    getUserById(id) {
        const users = this.getAllUsers();
        return users.find(u => u.id === id) || null;
    }

    addUser({ fullName, username, password, initialModuleId = 1, classId = null, notes = '' }) {
        const users = this.getAllUsers();
        const cleanUsername = (username || '').trim().toLowerCase();

        if (!cleanUsername) {
            return { success: false, message: "Kullanıcı adı zorunludur!" };
        }

        if (users.some(u => u.username.toLowerCase() === cleanUsername)) {
            return { success: false, message: `"${cleanUsername}" kullanıcı adı zaten kullanımda!` };
        }

        const startMod = parseInt(initialModuleId) || 1;
        const unlocked = [];
        const completed = [];
        for (let i = 1; i <= startMod; i++) {
            unlocked.push(i);
            if (i < startMod) {
                completed.push(i);
            }
        }

        const newUser = {
            id: 'usr_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            fullName: (fullName || cleanUsername).trim(),
            username: cleanUsername,
            password: (password || '1234').trim(),
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            currentModuleId: startMod,
            completedModuleIds: completed,
            unlockedModuleIds: unlocked,
            classId: classId || null,
            notes: notes.trim()
        };

        users.push(newUser);
        this.saveAllUsers(users);
        return { success: true, user: newUser };
    }

    updateUser(userId, updates) {
        const users = this.getAllUsers();
        const idx = users.findIndex(u => u.id === userId);
        if (idx === -1) return { success: false, message: 'Kullanıcı bulunamadı!' };

        // Kullanıcı adı değişiyorsa çakışma kontrolü
        if (updates.username) {
            const cleanU = updates.username.trim().toLowerCase();
            if (users.some(u => u.id !== userId && u.username.toLowerCase() === cleanU)) {
                return { success: false, message: `"${cleanU}" kullanıcı adı başka bir kursiyere ait!` };
            }
            updates.username = cleanU;
        }

        users[idx] = { ...users[idx], ...updates };
        this.saveAllUsers(users);
        return { success: true, user: users[idx] };
    }

    deleteUser(userId) {
        let users = this.getAllUsers();
        const beforeLen = users.length;
        users = users.filter(u => u.id !== userId);

        if (users.length === beforeLen) {
            return { success: false, message: 'Kullanıcı bulunamadı.' };
        }

        this.saveAllUsers(users);
        return { success: true };
    }

    bulkAddUsers(textData, defaultPassword = '123') {
        const lines = textData.split('\n').map(l => l.trim()).filter(Boolean);
        let addedCount = 0;
        let skippedCount = 0;

        lines.forEach(line => {
            // Biçimler: "Ad Soyad, kullanıcıadı, şifre" veya "Ad Soyad"
            let parts = line.split(',').map(p => p.trim());
            let fullName = parts[0] || '';
            let username = parts[1] || '';
            let password = parts[2] || defaultPassword;

            if (!username) {
                // İsimden otomatik kullanıcı adı üret (örn: Ali Veli -> aliveli)
                username = fullName
                    .toLowerCase()
                    .replace(/ç/g, 'c')
                    .replace(/ğ/g, 'g')
                    .replace(/ı/g, 'i')
                    .replace(/ö/g, 'o')
                    .replace(/ş/g, 's')
                    .replace(/ü/g, 'u')
                    .replace(/[^a-z0-9]/g, '');
            }

            if (username) {
                const res = this.addUser({ fullName, username, password });
                if (res.success) addedCount++;
                else skippedCount++;
            }
        });

        return { addedCount, skippedCount };
    }

    // ==================== İLERLEME & BÖLÜM KİLİTLERİ ====================

    completeModule(userId, moduleId) {
        const user = this.getUserById(userId);
        if (!user) return { success: false, message: 'Kullanıcı bulunamadı.' };

        // Özel modülleri kullan, yoksa 1-26 varsayılan
        const customMods = this.getCustomModules();
        const allModuleIds = customMods
            ? customMods.map(m => m.id)
            : Array.from({ length: 26 }, (_, i) => i + 1);
        const totalModules = allModuleIds.length;

        moduleId = parseInt(moduleId);
        const completed = new Set(user.completedModuleIds || []);
        const unlocked = new Set(user.unlockedModuleIds || [allModuleIds[0] || 1]);

        completed.add(moduleId);
        unlocked.add(moduleId);

        // Sıradaki bölümü bul ve aç
        const currentIdx = allModuleIds.indexOf(moduleId);
        const nextModuleId = (currentIdx >= 0 && currentIdx < allModuleIds.length - 1)
            ? allModuleIds[currentIdx + 1]
            : null;

        if (nextModuleId) unlocked.add(nextModuleId);

        user.completedModuleIds = Array.from(completed).sort((a, b) => a - b);
        user.unlockedModuleIds = Array.from(unlocked).sort((a, b) => a - b);
        user.currentModuleId = nextModuleId || moduleId;
        user.lastActive = new Date().toISOString();

        this.updateUser(userId, user);
        return {
            success: true,
            user,
            unlockedNext: nextModuleId || null,
            isAllCompleted: user.completedModuleIds.length >= totalModules
        };
    }

    toggleModuleLock(userId, moduleId) {
        const user = this.getUserById(userId);
        if (!user) return { success: false };

        moduleId = parseInt(moduleId);
        const unlocked = new Set(user.unlockedModuleIds || [1]);
        const completed = new Set(user.completedModuleIds || []);

        if (unlocked.has(moduleId)) {
            unlocked.delete(moduleId);
            completed.delete(moduleId);
        } else {
            unlocked.add(moduleId);
        }

        user.unlockedModuleIds = Array.from(unlocked).sort((a, b) => a - b);
        user.completedModuleIds = Array.from(completed).sort((a, b) => a - b);
        this.updateUser(userId, user);
        return { success: true, user };
    }

    unlockAllModules(userId) {
        const user = this.getUserById(userId);
        if (!user) return { success: false };

        const customMods = this.getCustomModules();
        const allIds = customMods
            ? customMods.map(m => m.id)
            : Array.from({ length: 26 }, (_, i) => i + 1);
        user.unlockedModuleIds = allIds;
        this.updateUser(userId, user);
        return { success: true, user };
    }

    resetUserProgress(userId) {
        const user = this.getUserById(userId);
        if (!user) return { success: false };

        user.completedModuleIds = [];
        user.unlockedModuleIds = [1];
        user.currentModuleId = 1;
        user.lastActive = new Date().toISOString();

        this.updateUser(userId, user);
        return { success: true, user };
    }

    // ==================== BULUT SENKRONİZASYON (FIREBASE) ====================

    getFirebaseConfig() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG)) || { enabled: false };
        } catch (e) {
            return { enabled: false };
        }
    }

    saveFirebaseConfig(cfg) {
        localStorage.setItem(STORAGE_KEYS.FIREBASE_CONFIG, JSON.stringify(cfg));
        this.firebaseConfig = cfg;
    }

    async syncToFirebase(users) {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return;

        try {
            // Firebase Realtime Database REST API doğrudan çalışır (sunucusuz)
            let url = cfg.databaseURL.replace(/\/$/, '') + '/kursiyerler.json';
            if (cfg.apiKey) {
                url += `?auth=${cfg.apiKey}`;
            }

            await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(users)
            });
            console.log("Firebase bulut senkronizasyonu başarılı.");
        } catch (err) {
            console.warn("Firebase senkronizasyon hatası:", err);
        }
    }

    async pullFromFirebase() {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return { success: false, message: 'Firebase aktif değil.' };

        try {
            let url = cfg.databaseURL.replace(/\/$/, '') + '/kursiyerler.json';
            const res = await fetch(url);
            const data = await res.json();
            if (data && Array.isArray(data)) {
                localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data));
                return { success: true, count: data.length };
            }
            return { success: false, message: 'Uzak sunucuda veri bulunamadı.' };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    // ==================== YEDEKLEME (JSON DIŞA/İÇE AKTAR) ====================

    exportBackupJSON() {
        const data = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            admin: this.getAdminCreds(),
            users: this.getAllUsers()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ehem_kursiyer_yedek_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importBackupJSON(jsonStr) {
        try {
            const data = JSON.parse(jsonStr);
            if (data && Array.isArray(data.users)) {
                this.saveAllUsers(data.users);
                if (data.admin) {
                    localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(data.admin));
                }
                return { success: true, count: data.users.length };
            }
            return { success: false, message: 'Geçersiz yedek dosyası yapısı.' };
        } catch (e) {
            return { success: false, message: 'JSON ayrıştırılamadı: ' + e.message };
        }
    }

    // ==================== SINIF YÖNETİMİ ====================

    getAllClasses() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.CLASSES);
            return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
    }

    saveAllClasses(classes) {
        localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
    }

    addClass({ name, description = '' }) {
        const classes = this.getAllClasses();
        const trimName = (name || '').trim();
        if (!trimName) return { success: false, message: 'Sınıf adı zorunludur!' };
        if (classes.some(c => c.name.toLowerCase() === trimName.toLowerCase())) {
            return { success: false, message: `"${trimName}" adlı sınıf zaten mevcut!` };
        }
        const newClass = {
            id: 'cls_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            name: trimName,
            description: (description || '').trim(),
            createdAt: new Date().toISOString()
        };
        classes.push(newClass);
        this.saveAllClasses(classes);
        return { success: true, cls: newClass };
    }

    updateClass(classId, updates) {
        const classes = this.getAllClasses();
        const idx = classes.findIndex(c => c.id === classId);
        if (idx === -1) return { success: false, message: 'Sınıf bulunamadı!' };
        if (updates.name) {
            const trimName = updates.name.trim();
            if (classes.some(c => c.id !== classId && c.name.toLowerCase() === trimName.toLowerCase())) {
                return { success: false, message: `"${trimName}" adlı sınıf başka bir kayıtta mevcut!` };
            }
            updates.name = trimName;
        }
        classes[idx] = { ...classes[idx], ...updates };
        this.saveAllClasses(classes);
        return { success: true, cls: classes[idx] };
    }

    deleteClass(classId) {
        let classes = this.getAllClasses();
        classes = classes.filter(c => c.id !== classId);
        this.saveAllClasses(classes);
        // Bu sınıfa atanmış kursiyerlerin atamasını temizle
        const users = this.getAllUsers();
        let changed = false;
        users.forEach(u => { if (u.classId === classId) { u.classId = null; changed = true; } });
        if (changed) this.saveAllUsers(users);
        return { success: true };
    }

    getUsersByClass(classId) {
        return this.getAllUsers().filter(u => u.classId === classId);
    }

    // ==================== ÖZEL MODÜL YÖNETİMİ ====================

    getCustomModules() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_MODULES);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    saveCustomModules(modules) {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_MODULES, JSON.stringify(modules));
    }

    resetModulesToDefault() {
        localStorage.removeItem(STORAGE_KEYS.CUSTOM_MODULES);
    }

    // ==================== TEMA & MENÜ TASARIM YÖNETİMİ ====================

    getValidThemes() {
        return ['night-blue', 'forest-green', 'purple-sunset', 'amber-gold', 'ocean-teal', 'clean-light'];
    }

    getThemeSettings() {
        try {
            const raw = localStorage.getItem('ehem_theme_settings');
            const def = {
                theme: localStorage.getItem('ehem_theme') || 'night-blue',
                allowMenuThemeSwitch: true,   // "Menü içinde tema ve tasarım değiştirme seçeneği"
                menuLayout: 'two-column',     // 'two-column' | 'card-grid' | 'compact'
                menuStyle: 'theme-adaptive',  // 'theme-adaptive' | 'classic-retro' | 'minimal'
                switcherPosition: 'both'      // 'bottom' | 'navbar' | 'both'
            };
            return raw ? { ...def, ...JSON.parse(raw) } : def;
        } catch (e) {
            return {
                theme: localStorage.getItem('ehem_theme') || 'night-blue',
                allowMenuThemeSwitch: true,
                menuLayout: 'two-column',
                menuStyle: 'theme-adaptive',
                switcherPosition: 'both'
            };
        }
    }

    saveThemeSettings(updates) {
        const current = this.getThemeSettings();
        const next = { ...current, ...updates };
        const validThemes = this.getValidThemes();
        if (next.theme && !validThemes.includes(next.theme)) {
            next.theme = 'night-blue';
        }
        localStorage.setItem('ehem_theme_settings', JSON.stringify(next));
        if (next.theme) {
            localStorage.setItem('ehem_theme', next.theme);
        }
        this.applyThemeSettings(next);
        return next;
    }

    applyThemeSettings(settings) {
        const s = settings || this.getThemeSettings();
        if (s.theme) {
            document.documentElement.setAttribute('data-theme', s.theme);
        }
        if (s.menuLayout) {
            document.documentElement.setAttribute('data-menu-layout', s.menuLayout);
        }
        if (s.menuStyle) {
            document.documentElement.setAttribute('data-menu-style', s.menuStyle);
        }
    }

    getTheme() {
        const s = this.getThemeSettings();
        return s.theme || localStorage.getItem('ehem_theme') || 'night-blue';
    }

    setTheme(themeName) {
        const valid = this.getValidThemes();
        if (!valid.includes(themeName)) return;
        localStorage.setItem('ehem_theme', themeName);
        document.documentElement.setAttribute('data-theme', themeName);
        this.saveThemeSettings({ theme: themeName });
    }

    // ==================== DUYURU YÖNETİMİ ====================

    getAllAnnouncements() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
            return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
    }

    saveAllAnnouncements(anns) {
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(anns));
    }

    addAnnouncement({ title, message, classId = null, type = 'info', expiryDate = null }) {
        const anns = this.getAllAnnouncements();
        const newAnn = {
            id: 'ann_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            title: (title || '').trim(),
            message: (message || '').trim(),
            classId: classId || null,
            type: type || 'info',
            expiryDate: expiryDate || null,
            createdAt: new Date().toISOString()
        };
        anns.push(newAnn);
        this.saveAllAnnouncements(anns);
        return { success: true, announcement: newAnn };
    }

    deleteAnnouncement(annId) {
        let anns = this.getAllAnnouncements();
        anns = anns.filter(a => a.id !== annId);
        this.saveAllAnnouncements(anns);
        return { success: true };
    }

    /**
     * Belirli bir kursiyer için aktif duyuruları döndürür.
     * classId null ise "tüm kursiyerler" duyurularını da alır.
     */
    getAnnouncementsForUser(userId) {
        const user = this.getUserById(userId);
        const anns = this.getAllAnnouncements();
        const now = new Date();
        return anns.filter(a => {
            // Süresi dolmuş mu?
            if (a.expiryDate && new Date(a.expiryDate) < now) return false;
            // Hedef kontrolü
            if (a.classId === null) return true; // Herkese
            return user && user.classId === a.classId;
        });
    }

    // ==================== ÖĞRENCİ - ÖĞRETMEN MESAJLAŞMA SİSTEMİ ====================

    getAllMessages() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    saveAllMessages(messages) {
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }

    getMessageById(id) {
        const messages = this.getAllMessages();
        return messages.find(m => m.id === id) || null;
    }

    getMessagesForUser(userId) {
        const messages = this.getAllMessages();
        return messages.filter(m => m.userId === userId);
    }

    getUnreadMessageCountForAdmin() {
        const messages = this.getAllMessages();
        return messages.filter(m => m.unreadByAdmin).length;
    }

    getUnreadMessageCountForStudent(userId) {
        const messages = this.getAllMessages();
        return messages.filter(m => m.userId === userId && m.unreadByStudent).length;
    }

    sendMessageFromStudent({ userId, subject, message, moduleRefId = null }) {
        const user = this.getUserById(userId);
        if (!user) return { success: false, message: 'Kullanıcı bulunamadı.' };

        const trimSubject = (subject || '').trim();
        const trimMessage = (message || '').trim();
        if (!trimSubject || !trimMessage) {
            return { success: false, message: 'Konusu ve mesaj içeriği zorunludur.' };
        }

        const classes = this.getAllClasses();
        const userClass = classes.find(c => c.id === user.classId);

        const messages = this.getAllMessages();
        const newMsg = {
            id: 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            userId: user.id,
            userName: user.fullName || user.username,
            userUsername: user.username,
            classId: user.classId || null,
            className: userClass ? userClass.name : '',
            subject: trimSubject,
            message: trimMessage,
            moduleRefId: moduleRefId ? parseInt(moduleRefId) : null,
            createdAt: new Date().toISOString(),
            status: 'pending', // 'pending' (Cevap Bekliyor) | 'answered' (Cevaplandı)
            unreadByAdmin: true,
            unreadByStudent: false,
            replies: []
        };

        messages.push(newMsg);
        this.saveAllMessages(messages);
        return { success: true, message: newMsg };
    }

    replyMessage({ messageId, sender = 'admin', senderName = 'Kurs Öğretmeni', text }) {
        const trimText = (text || '').trim();
        if (!trimText) return { success: false, message: 'Yanıt metni boş olamaz.' };

        const messages = this.getAllMessages();
        const msg = messages.find(m => m.id === messageId);
        if (!msg) return { success: false, message: 'Mesaj bulunamadı.' };

        if (!msg.replies) msg.replies = [];

        const replyObj = {
            id: 'rep_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            sender: sender, // 'admin' | 'student'
            senderName: senderName || (sender === 'admin' ? 'Kurs Öğretmeni' : msg.userName),
            text: trimText,
            createdAt: new Date().toISOString()
        };

        msg.replies.push(replyObj);

        if (sender === 'admin') {
            msg.status = 'answered';
            msg.unreadByStudent = true;
            msg.unreadByAdmin = false;
        } else {
            msg.status = 'pending';
            msg.unreadByAdmin = true;
            msg.unreadByStudent = false;
        }

        this.saveAllMessages(messages);
        return { success: true, message: msg, reply: replyObj };
    }

    markMessageAsReadByAdmin(messageId) {
        const messages = this.getAllMessages();
        const msg = messages.find(m => m.id === messageId);
        if (msg && msg.unreadByAdmin) {
            msg.unreadByAdmin = false;
            this.saveAllMessages(messages);
        }
        return { success: true };
    }

    markMessageAsReadByStudent(messageId) {
        const messages = this.getAllMessages();
        const msg = messages.find(m => m.id === messageId);
        if (msg && msg.unreadByStudent) {
            msg.unreadByStudent = false;
            this.saveAllMessages(messages);
        }
        return { success: true };
    }

    deleteMessage(messageId) {
        let messages = this.getAllMessages();
        messages = messages.filter(m => m.id !== messageId);
        this.saveAllMessages(messages);
        return { success: true };
    }
}

// Global olarak erişilebilir tekil nesne (Singleton)
window.lmsStorage = new StorageService();
