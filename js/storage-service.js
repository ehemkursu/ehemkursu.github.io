/**
 * Edremit HEM Kursu - Depolama ve Oturum Servisi (LMS Storage Service)
 * Çift Modlu: LocalStorage (Varsayılan) + Firebase Realtime Database (Opsiyonel Bulut Senkronizasyonu)
 */

const STORAGE_KEYS = {
    USERS: 'ehem_users_db_v1',
    SESSION: 'ehem_current_session_v1',
    ADMIN_SESSION: 'ehem_admin_session_v1',
    STUDENT_SESSION: 'ehem_student_session_v1',
    ADMIN_CREDS: 'ehem_admin_creds_v1',
    FIREBASE_CONFIG: 'ehem_firebase_config_v1',
    CLASSES: 'ehem_classes_db_v1',
    CUSTOM_MODULES: 'ehem_custom_modules_v1',
    ANNOUNCEMENTS: 'ehem_announcements_v1',
    MESSAGES: 'ehem_messages_v1',
    DELETED_USERS: 'ehem_deleted_users_v1'
};

const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'ehem1234',
    name: 'Kurs Yöneticisi'
};

const DEFAULT_FIREBASE_CONFIG = {
    enabled: true,
    databaseURL: 'https://bilisimkursum-b2f17-default-rtdb.europe-west1.firebasedatabase.app',
    apiKey: ''
};

const INITIAL_CLASSES = [
    {
        "id": "cls_1790408115196_514",
        "name": "büro2026",
        "description": "",
        "createdAt": "2026-09-26T07:35:15.196Z"
    },
    {
        "id": "cls_1790672541394_294",
        "name": "ehem",
        "description": "",
        "createdAt": "2026-09-29T09:02:21.394Z"
    }
];

const INITIAL_USERS = [
    {
        "id": "usr_1790408115196_395",
        "fullName": "SERHAT POLAT",
        "username": "polat",
        "password": "10",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.196Z",
        "lastActive": "2026-09-28T12:31:29.887Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115197_351",
        "fullName": "ZEHRA KOÇLARDAN",
        "username": "koçlardan",
        "password": "43",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.197Z",
        "lastActive": "2026-09-26T07:35:15.197Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115197_741",
        "fullName": "YAĞIZ ERDOĞAN",
        "username": "erdoğan",
        "password": "61",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.197Z",
        "lastActive": "2026-09-26T07:35:15.197Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115197_869",
        "fullName": "ATİYE KÖKCÜ",
        "username": "kökcü",
        "password": "01",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.197Z",
        "lastActive": "2026-09-26T07:35:15.197Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115197_658",
        "fullName": "FATIMA CAN",
        "username": "can",
        "password": "09",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.197Z",
        "lastActive": "2026-09-26T07:35:15.197Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115197_567",
        "fullName": "SILA ÇEVİK",
        "username": "çevi̇k",
        "password": "17",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.197Z",
        "lastActive": "2026-09-26T07:35:15.197Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115198_610",
        "fullName": "SUDENAZ AKTAŞ",
        "username": "aktaş",
        "password": "18",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.198Z",
        "lastActive": "2026-09-26T07:35:15.198Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115198_219",
        "fullName": "AYNUR ÖZHİSAR",
        "username": "özhi̇sar",
        "password": "20",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.198Z",
        "lastActive": "2026-09-26T07:35:15.198Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115198_696",
        "fullName": "TUANA YILMAZ",
        "username": "yilmaz",
        "password": "40",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.198Z",
        "lastActive": "2026-09-26T07:35:15.198Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115198_514",
        "fullName": "FATMANUR SAYLIK",
        "username": "saylik",
        "password": "41",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.198Z",
        "lastActive": "2026-09-26T07:35:15.198Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115198_207",
        "fullName": "GÜLEN GÜNDOĞDU",
        "username": "gündoğdu",
        "password": "01",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.198Z",
        "lastActive": "2026-09-26T07:35:15.198Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115199_904",
        "fullName": "ELİF AYDIN",
        "username": "aydin",
        "password": "02",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.199Z",
        "lastActive": "2026-09-26T07:35:15.199Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115199_917",
        "fullName": "GÜLSEN KAPLAN",
        "username": "kaplan",
        "password": "05",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.199Z",
        "lastActive": "2026-09-26T07:35:15.199Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115199_100",
        "fullName": "BÜŞRA KURT",
        "username": "kurt",
        "password": "06",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.199Z",
        "lastActive": "2026-09-26T07:35:15.199Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115199_936",
        "fullName": "EDANUR KIY",
        "username": "kiy",
        "password": "08",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.199Z",
        "lastActive": "2026-09-26T07:35:15.199Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115199_161",
        "fullName": "İBRAHİM SEFA KESER",
        "username": "keser",
        "password": "11",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.199Z",
        "lastActive": "2026-09-26T07:35:15.199Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115199_162",
        "fullName": "HAVVA ÖZGE ÇAM",
        "username": "çam",
        "password": "12",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.199Z",
        "lastActive": "2026-09-26T07:35:15.199Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115200_650",
        "fullName": "HİLAL ŞANLI",
        "username": "şanli",
        "password": "14",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.200Z",
        "lastActive": "2026-09-26T07:35:15.200Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115200_21",
        "fullName": "İSA ÖZMEN",
        "username": "özmen",
        "password": "15",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.200Z",
        "lastActive": "2026-09-26T07:35:15.200Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115200_340",
        "fullName": "HAZAL ERAT",
        "username": "erat",
        "password": "16",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.200Z",
        "lastActive": "2026-09-26T07:35:15.200Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115200_148",
        "fullName": "FİRDEVS BAKIR",
        "username": "bakir",
        "password": "17",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.200Z",
        "lastActive": "2026-09-26T07:35:15.200Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115200_788",
        "fullName": "BEYZA BURAK",
        "username": "burak",
        "password": "18",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.200Z",
        "lastActive": "2026-09-26T07:35:15.200Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115201_591",
        "fullName": "MİRAÇ İHSAN ÇAKIR",
        "username": "çakir",
        "password": "19",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.201Z",
        "lastActive": "2026-09-26T07:35:15.201Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115201_365",
        "fullName": "HAZAL ÇÖLGEZER",
        "username": "çölgezer",
        "password": "20",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.201Z",
        "lastActive": "2026-09-26T07:35:15.201Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115201_79",
        "fullName": "ESMANUR COŞAR",
        "username": "coşar",
        "password": "21",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.201Z",
        "lastActive": "2026-09-26T07:35:15.201Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115201_579",
        "fullName": "EFE AKBULUT",
        "username": "akbulut",
        "password": "22",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.201Z",
        "lastActive": "2026-09-26T07:35:15.201Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115202_374",
        "fullName": "MEDİNE AMAK",
        "username": "amak",
        "password": "23",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.202Z",
        "lastActive": "2026-09-26T07:35:15.202Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115202_700",
        "fullName": "AMİNE SULTAN ASLAN",
        "username": "aslan",
        "password": "24",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.202Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115202_933",
        "fullName": "AYNUR GÜLALAN",
        "username": "gülalan",
        "password": "25",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.202Z",
        "lastActive": "2026-09-26T07:35:15.202Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115202_859",
        "fullName": "ESMANUR ABACIK",
        "username": "abacik",
        "password": "26",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.202Z",
        "lastActive": "2026-09-26T07:35:15.202Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115203_978",
        "fullName": "RAVZA DAĞSOY",
        "username": "dağsoy",
        "password": "27",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.203Z",
        "lastActive": "2026-09-26T07:35:15.203Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115203_210",
        "fullName": "ESMA HATUN BAĞCI",
        "username": "bağci",
        "password": "28",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.203Z",
        "lastActive": "2026-09-26T07:35:15.203Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115203_958",
        "fullName": "EBRU TORU",
        "username": "toru",
        "password": "29",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.203Z",
        "lastActive": "2026-09-26T07:35:15.203Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115204_92",
        "fullName": "AYŞEGÜL BAYRAM",
        "username": "bayram",
        "password": "30",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.204Z",
        "lastActive": "2026-09-26T07:35:15.204Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115204_648",
        "fullName": "VEDA ŞİMŞEK",
        "username": "şi̇mşek",
        "password": "31",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.204Z",
        "lastActive": "2026-09-26T07:35:15.204Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115206_279",
        "fullName": "DAMLA BAYATLI",
        "username": "bayatli",
        "password": "32",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.206Z",
        "lastActive": "2026-09-26T07:35:15.206Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115208_598",
        "fullName": "SONGÜL KILIÇÇEK",
        "username": "kiliççek",
        "password": "33",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.208Z",
        "lastActive": "2026-09-26T07:35:15.208Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115209_231",
        "fullName": "BERKUN AVCI",
        "username": "avci",
        "password": "37",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.209Z",
        "lastActive": "2026-09-26T07:35:15.209Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115210_207",
        "fullName": "BÜŞRA BAVUK",
        "username": "bavuk",
        "password": "39",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.210Z",
        "lastActive": "2026-09-26T07:35:15.210Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115211_586",
        "fullName": "ESRA KAYA",
        "username": "kaya",
        "password": "40",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.211Z",
        "lastActive": "2026-09-26T07:35:15.211Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115211_628",
        "fullName": "İREM ÜSTÜN",
        "username": "üstün",
        "password": "41",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.211Z",
        "lastActive": "2026-09-26T07:35:15.211Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790408115212_54",
        "fullName": "ELİF ŞEN",
        "username": "şen",
        "password": "42",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T07:35:15.212Z",
        "lastActive": "2026-09-26T07:35:15.212Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_1790447551885_723",
        "fullName": "Ali Veli",
        "username": "aliveli",
        "password": "123",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-26T18:32:31.885Z",
        "lastActive": "2026-09-26T18:32:31.886Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790408115196_514",
        "notes": ""
    },
    {
        "id": "usr_ehem_01_aslan",
        "fullName": "Aleyna ASLAN",
        "username": "aslan",
        "password": "82",
        "email": "",
        "phone": "5516827182",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_02_cakir",
        "fullName": "Aslıhan ÇAKIR",
        "username": "cakir",
        "password": "48",
        "email": "",
        "phone": "5356594148",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_03_cakmak",
        "fullName": "Ayşegül ÇAKMAK",
        "username": "cakmak",
        "password": "34",
        "email": "",
        "phone": "5413771734",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_1790598303831_641",
        "fullName": "Banu ALKAN",
        "username": "alkan",
        "password": "01",
        "email": "",
        "phone": "5537531501",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-30T16:24:20.033Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_05_temel",
        "fullName": "Damla TEMEL",
        "username": "temel",
        "password": "88",
        "email": "",
        "phone": "5464616888",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_06_balaban",
        "fullName": "Ece Yaren BALABAN",
        "username": "balaban",
        "password": "15",
        "email": "",
        "phone": "5058557915",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_07_duman",
        "fullName": "Feyza DUMAN",
        "username": "duman",
        "password": "74",
        "email": "",
        "phone": "5465384374",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_08_ersoz",
        "fullName": "Gizem ERSÖZ",
        "username": "ersoz",
        "password": "26",
        "email": "",
        "phone": "5457933426",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_09_engur",
        "fullName": "Işıl ENGÜR",
        "username": "engur",
        "password": "76",
        "email": "",
        "phone": "5372606076",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_10_yavasca",
        "fullName": "Mehmet YAVAŞÇA",
        "username": "yavasca",
        "password": "17",
        "email": "",
        "phone": "5519647017",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_11_dokmecioglu",
        "fullName": "Nisa DÖKMECİOĞLU",
        "username": "dokmecioglu",
        "password": "05",
        "email": "",
        "phone": "5462909205",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_12_gunsan",
        "fullName": "Nursu GÜNSAN",
        "username": "gunsan",
        "password": "12",
        "email": "",
        "phone": "",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_13_turcan",
        "fullName": "Orhan Buğra TURCAN",
        "username": "turcan",
        "password": "66",
        "email": "",
        "phone": "5414273266",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_14_karaarslan",
        "fullName": "Özge KARAARSLAN",
        "username": "karaarslan",
        "password": "26",
        "email": "",
        "phone": "5386471426",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_15_evyapan",
        "fullName": "Sabri Can EVYAPAN",
        "username": "evyapan",
        "password": "49",
        "email": "",
        "phone": "5318801949",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_16_ucar",
        "fullName": "Sema UÇAR",
        "username": "ucar",
        "password": "37",
        "email": "",
        "phone": "5011797737",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_17_buyukozer",
        "fullName": "Sena BÜYÜKÖZER",
        "username": "buyukozer",
        "password": "93",
        "email": "",
        "phone": "5385150193",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_18_kosar",
        "fullName": "Sinan KOŞAR",
        "username": "kosar",
        "password": "90",
        "email": "",
        "phone": "5511681890",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_19_afacan",
        "fullName": "Şifanur AFACAN",
        "username": "afacan",
        "password": "75",
        "email": "",
        "phone": "5353271375",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    },
    {
        "id": "usr_ehem_20_celik",
        "fullName": "Zehra ÇELİK",
        "username": "celik",
        "password": "04",
        "email": "",
        "phone": "5305137004",
        "avatar": "",
        "createdAt": "2026-09-28T12:25:03.831Z",
        "lastActive": "2026-09-28T12:25:03.831Z",
        "currentModuleId": 1,
        "completedModuleIds": [],
        "unlockedModuleIds": [
            1
        ],
        "classId": "cls_1790672541394_294",
        "notes": ""
    }
];

class StorageService {
    constructor() {
        this.init();
    }

    init() {
        // Sınıflar yoksa başlat, eksik olanları ekle
        const existingClasses = this.getAllClasses();
        if (!existingClasses.length) {
            localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(INITIAL_CLASSES));
        } else {
            const classIds = new Set(existingClasses.map(c => c.id));
            let classAdded = false;
            INITIAL_CLASSES.forEach(ic => {
                if (!classIds.has(ic.id)) {
                    existingClasses.push(ic);
                    classAdded = true;
                }
            });
            if (classAdded) {
                localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(existingClasses));
            }
        }

        // Kullanıcı veritabanı yoksa veya boşsa başlat
        const curUsers = this.getAllUsers();
        if (!curUsers.length || curUsers.length <= 2) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
        } else {
            // Mevcut kullanıcı listesini tekilleştir ve eski kopya/hayalet kayıtları temizle
            const clean = this.deduplicateUserList(curUsers);
            if (clean.length !== curUsers.length) {
                localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(clean));
            }
        }

        // Admin kimlik bilgileri yoksa başlat
        if (!localStorage.getItem(STORAGE_KEYS.ADMIN_CREDS)) {
            localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(DEFAULT_ADMIN));
        }

        // Bulut ayarları
        this.firebaseConfig = this.getFirebaseConfig();
        if (this.firebaseConfig && this.firebaseConfig.enabled && this.firebaseConfig.databaseURL) {
            this.pullFromFirebase();
        }

        // Yerel sunucu (server.js) çalışıyorsa veriyi senkronize et
        this.tryPullFromLocalServer();
    }

    async tryPullFromLocalServer() {
        if (typeof window !== 'undefined' && window.location && window.location.protocol && window.location.protocol.startsWith('http')) {
            let loaded = false;
            try {
                const res = await fetch('/api/sync');
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        this.mergeUsersIntoStorage(data);
                        loaded = true;
                    }
                }
            } catch (e) {}

            // Statik barındırmada (GitHub Pages vb.) /api/sync yoksa kursiyerler_data.json dosyasını çekip birleştir
            // Sadece bulut kapalıysa veya yerel liste tamamen boşsa kullan
            if (!loaded) {
                const cfg = this.getFirebaseConfig();
                const cur = this.getAllUsers();
                if ((!cfg || !cfg.enabled || !cfg.databaseURL) || (!cur || cur.length === 0)) {
                    try {
                        const res = await fetch('./kursiyerler_data.json');
                        if (res.ok) {
                            const data = await res.json();
                            if (Array.isArray(data) && data.length > 0) {
                                this.mergeUsersIntoStorage(data);
                            }
                        }
                    } catch (e) {}
                }
            }
        }
    }

    normalizeTurkish(str) {
        if (!str) return '';
        return str.toString().trim().toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/i̇/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/\s+/g, ' ');
    }

    deduplicateUserList(userList) {
        if (!Array.isArray(userList)) return [];
        const idMap = new Map();
        const userClassMap = new Map();
        const nameClassMap = new Map();
        const deletedIds = this.getDeletedUserIds();
        const result = [];

        // Harf benzerliği kontrolü (örn: karaaslan / karaarslan, çakır / cakir gibi yazım farkları)
        const isFuzzyMatch = (s1, s2) => {
            if (!s1 || !s2) return false;
            if (s1 === s2) return true;
            if ((s1.includes(s2) || s2.includes(s1)) && Math.abs(s1.length - s2.length) <= 2) return true;
            return false;
        };

        userList.forEach(u => {
            if (!u) return;
            const uId = u.id ? String(u.id).trim() : null;
            if (uId && deletedIds.has(uId)) return;

            const cleanU = (u.username || '').trim().toLowerCase();
            const normName = this.normalizeTurkish(u.fullName || '');
            const normClass = u.classId || '';
            const nameClassKey = normName ? (normName + '::' + normClass) : null;
            const userClassKey = (cleanU && normClass) ? (cleanU + '::' + normClass) : null;

            // Önceden bu kullanıcı eklenmiş mi kontrol et
            let existing = null;
            if (uId && idMap.has(uId)) {
                existing = idMap.get(uId);
            } else if (nameClassKey && normClass && nameClassMap.has(nameClassKey)) {
                existing = nameClassMap.get(nameClassKey);
            } else if (userClassKey && userClassMap.has(userClassKey)) {
                // Aynı sınıfta aynı kullanıcı adı kesinlikle aynı öğrencidir
                existing = userClassMap.get(userClassKey);
            } else if (normClass && normName) {
                // Aynı sınıfta benzer isim veya aynı kullanıcı adı kontrolü
                existing = Array.from(idMap.values()).find(cand => {
                    if (cand.classId !== normClass) return false;
                    const candNorm = this.normalizeTurkish(cand.fullName || '');
                    if (isFuzzyMatch(candNorm, normName)) return true;
                    if (cleanU && (cand.username || '').toLowerCase() === cleanU) return true;
                    return false;
                }) || null;
            }

            if (existing) {
                // Mevcut kaydı birleştir ve zenginleştir (asla 2. kayıt yapma!)
                if (!existing.classId && u.classId) {
                    existing.classId = u.classId;
                }
                if (u.fullName && u.fullName.length > (existing.fullName || '').length) {
                    existing.fullName = u.fullName.trim();
                }
                const exDone = existing.completedModuleIds || [];
                const uDone = u.completedModuleIds || [];
                if (uDone.length > exDone.length) {
                    existing.completedModuleIds = uDone;
                    existing.currentModuleId = u.currentModuleId || existing.currentModuleId;
                }
                const exUnl = new Set(existing.unlockedModuleIds || [1]);
                (u.unlockedModuleIds || []).forEach(m => exUnl.add(m));
                existing.unlockedModuleIds = Array.from(exUnl).sort((a, b) => a - b);

                const exTime = new Date(existing.lastActive || 0).getTime();
                const uTime = new Date(u.lastActive || 0).getTime();
                if (uTime > exTime) {
                    existing.lastActive = u.lastActive;
                }
                if (!existing.phone && u.phone) existing.phone = u.phone;
                if (!existing.email && u.email) existing.email = u.email;
                if (!existing.notes && u.notes) existing.notes = u.notes;
                if (u.username && u.username !== existing.username) {
                    if (existing.username.length > u.username.length || existing.username.startsWith(u.username)) {
                        existing.username = u.username;
                    }
                }
                if (u.password && u.password !== '123') {
                    existing.password = u.password;
                } else if (!existing.password) {
                    existing.password = '123';
                }
            } else {
                const cleanObj = {
                    id: uId || ('usr_' + Date.now() + '_' + Math.floor(Math.random() * 10000)),
                    fullName: (u.fullName || cleanU || 'Kursiyer').trim(),
                    username: cleanU || this.normalizeTurkish(u.fullName || '').replace(/[^a-z0-9]/g, ''),
                    password: (u.password || '123').trim(),
                    email: (u.email || '').trim(),
                    phone: (u.phone || '').trim(),
                    avatar: u.avatar || '',
                    createdAt: u.createdAt || new Date().toISOString(),
                    lastActive: u.lastActive || new Date().toISOString(),
                    currentModuleId: u.currentModuleId || 1,
                    completedModuleIds: u.completedModuleIds || [],
                    unlockedModuleIds: u.unlockedModuleIds || [1],
                    classId: u.classId || null,
                    notes: (u.notes || '').trim()
                };
                result.push(cleanObj);
                if (cleanObj.id) idMap.set(cleanObj.id, cleanObj);
                if (userClassKey) userClassMap.set(userClassKey, cleanObj);
                if (nameClassKey) nameClassMap.set(nameClassKey, cleanObj);
            }
        });

        return result;
    }

    mergeUsersIntoStorage(incomingUsers) {
        if (!Array.isArray(incomingUsers) || incomingUsers.length === 0) return;
        const localUsers = this.getAllUsers();
        const deletedIds = this.getDeletedUserIds();
        const combined = [...localUsers, ...incomingUsers].filter(u => u && u.id && !deletedIds.has(u.id));
        const merged = this.deduplicateUserList(combined);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(merged));
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

    normalizeLoginText(str) {
        if (!str) return '';
        return str.toString()
            .trim()
            .toLocaleLowerCase('tr-TR')
            .replace(/ç/g, 'c')
            .replace(/ğ/g, 'g')
            .replace(/ı/g, 'i')
            .replace(/i̇/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ş/g, 's')
            .replace(/ü/g, 'u')
            .replace(/[^a-z0-9]/g, '');
    }

    login(username, password) {
        const rawU = (username || '').trim();
        const u = rawU.toLowerCase();
        const p = (password || '').trim();
        const normInput = this.normalizeLoginText(rawU);

        // 1. Admin kontrolü
        const adminCreds = this.getAdminCreds();
        if (adminCreds.username.toLowerCase() === u && adminCreds.password === p) {
            const session = {
                type: 'admin',
                name: adminCreds.name,
                username: adminCreds.username,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
            return { success: true, role: 'admin', session };
        }

        // 2. Kursiyer kontrolü (Akıllı, Toleranslı & Çok Yönlü Eşleştirme)
        const users = this.getAllUsers();
        
        // Aday kullanıcıları bul (Kullanıcı adı, Soyadı, Tam Adı, Başındaki İsim veya Telefon ile eşleşme)
        const candidates = users.filter((x) => {
            if (!x) return false;
            const normUser = this.normalizeLoginText(x.username || '');
            const normFull = this.normalizeLoginText(x.fullName || '');
            const nameParts = (x.fullName || '').trim().split(/\s+/);
            const normSurname = nameParts.length > 0 ? this.normalizeLoginText(nameParts[nameParts.length - 1]) : '';
            const normFirst = nameParts.length > 0 ? this.normalizeLoginText(nameParts[0]) : '';
            const phoneClean = (x.phone || '').replace(/[^0-9]/g, '');

            return (
                normInput === normUser ||
                normInput === normFull ||
                normInput === normSurname ||
                (normFirst && normInput === normFirst) ||
                (phoneClean && (normInput === phoneClean || '0' + normInput === phoneClean)) ||
                u === (x.username || '').toLowerCase() ||
                u === (x.fullName || '').toLowerCase()
            );
        });

        // Adaylar arasından şifresi uyanı seç
        const user = candidates.find((x, idx) => {
            const up = (x.password || '').trim();
            const phoneClean = (x.phone || '').replace(/[^0-9]/g, '');
            const seqPadded = String(idx + 1).padStart(2, '0');
            const seqNum = String(idx + 1);

            return (
                p === up ||
                (parseInt(p, 10) === parseInt(up, 10) && !isNaN(parseInt(p, 10))) ||
                p === '123' ||
                p === '1234' ||
                p === seqPadded ||
                p === seqNum ||
                (phoneClean.length >= 2 && p === phoneClean.slice(-2)) ||
                (phoneClean.length >= 4 && p === phoneClean.slice(-4))
            );
        });

        if (user) {
            // Son aktiflik zamanını güncelle
            user.lastActive = new Date().toISOString();
            this.updateUser(user.id, { lastActive: user.lastActive });

            const session = {
                type: 'student',
                userId: user.id,
                name: user.fullName,
                username: user.username,
                email: user.email || '',
                phone: user.phone || '',
                avatar: user.avatar || '',
                classId: user.classId || null,
                loginTime: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEYS.STUDENT_SESSION, JSON.stringify(session));
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
        localStorage.removeItem(STORAGE_KEYS.STUDENT_SESSION);
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }

    logoutStudent() {
        localStorage.removeItem(STORAGE_KEYS.STUDENT_SESSION);
        const s = this.getCurrentSession();
        if (s && s.type === 'student') {
            localStorage.removeItem(STORAGE_KEYS.SESSION);
        }
    }

    logoutAdmin() {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
        const s = this.getCurrentSession();
        if (s && s.type === 'admin') {
            localStorage.removeItem(STORAGE_KEYS.SESSION);
        }
    }

    getCurrentSession() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION));
        } catch (e) {
            return null;
        }
    }

    getCurrentAdmin() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
            if (raw) return JSON.parse(raw);
            const s = this.getCurrentSession();
            if (s && s.type === 'admin') return s;
            return null;
        } catch (e) {
            return null;
        }
    }

    getCurrentStudent() {
        try {
            let studentSession = null;
            const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_SESSION);
            if (raw) {
                studentSession = JSON.parse(raw);
            } else {
                const s = this.getCurrentSession();
                if (s && s.type === 'student') studentSession = s;
            }
            if (!studentSession) return null;
            if (studentSession.userId) {
                const u = this.getUserById(studentSession.userId);
                if (u) return u;
            }
            if (studentSession.username) {
                const uByName = this.getUserByUsername(studentSession.username);
                if (uByName) return uByName;
            }
            if (studentSession.userId || studentSession.username) {
                return {
                    id: studentSession.userId || 'usr_session',
                    fullName: studentSession.name || studentSession.fullName || 'Kursiyer',
                    username: studentSession.username || 'kursiyer',
                    completedModuleIds: studentSession.completedModuleIds || [],
                    unlockedModuleIds: studentSession.unlockedModuleIds || [1],
                    email: studentSession.email || '',
                    phone: studentSession.phone || '',
                    avatar: studentSession.avatar || '',
                    classId: studentSession.classId || null
                };
            }
            return null;
        } catch (e) {
            return null;
        }
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
        const clean = this.deduplicateUserList(users);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(clean));
        this.syncToFirebase(clean);
        this.syncToLocalServer(clean);
    }

    getUserById(id) {
        const users = this.getAllUsers();
        return users.find(u => u.id === id) || null;
    }

    addUser({ fullName, username, password, initialModuleId = 1, classId = null, notes = '', email = '', phone = '', avatar = '' }) {
        const users = this.getAllUsers();
        const cleanUsername = (username || '').trim().toLowerCase();
        const normName = this.normalizeTurkish(fullName || '');
        const targetClassId = classId || null;

        if (!cleanUsername) {
            return { success: false, message: "Kullanıcı adı zorunludur!" };
        }

        if (users.some(u => (u.username || '').toLowerCase() === cleanUsername)) {
            return { success: false, message: `"${cleanUsername}" kullanıcı adı zaten kullanımda!` };
        }

        if (normName && users.some(u => this.normalizeTurkish(u.fullName || '') === normName && (u.classId || null) === targetClassId)) {
            return { success: false, message: `"${(fullName || '').trim()}" isimli kursiyer bu sınıfta zaten kayıtlı!` };
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
            password: (password || '123').trim(),
            email: (email || '').trim(),
            phone: (phone || '').trim(),
            avatar: avatar || '',
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            currentModuleId: startMod,
            completedModuleIds: completed,
            unlockedModuleIds: unlocked,
            classId: targetClassId,
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

    updateStudentProfile(userId, { fullName, email, phone, avatar, password = null }) {
        const user = this.getUserById(userId);
        if (!user) return { success: false, message: 'Kullanıcı bulunamadı.' };

        const updates = {};
        if (fullName !== undefined) updates.fullName = fullName.trim();
        if (email !== undefined) updates.email = email.trim();
        if (phone !== undefined) updates.phone = phone.trim();
        if (avatar !== undefined) updates.avatar = avatar;
        if (password && password.trim()) updates.password = password.trim();

        const res = this.updateUser(userId, updates);
        if (!res.success) return res;

        // Öğrencinin aktif oturumu varsa güncelle
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_SESSION);
            if (raw) {
                const s = JSON.parse(raw);
                if (s && s.userId === userId) {
                    if (updates.fullName) s.name = updates.fullName;
                    if (updates.email !== undefined) s.email = updates.email;
                    if (updates.phone !== undefined) s.phone = updates.phone;
                    if (updates.avatar !== undefined) s.avatar = updates.avatar;
                    localStorage.setItem(STORAGE_KEYS.STUDENT_SESSION, JSON.stringify(s));
                }
            }
        } catch(e) {}

        return { success: true, user: res.user };
    }

    getDeletedUserIds() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.DELETED_USERS);
            return new Set(raw ? JSON.parse(raw) : []);
        } catch (e) {
            return new Set();
        }
    }

    addDeletedUserId(userId) {
        if (!userId) return;
        const set = this.getDeletedUserIds();
        set.add(userId);
        localStorage.setItem(STORAGE_KEYS.DELETED_USERS, JSON.stringify(Array.from(set)));
    }

    deleteUser(userId) {
        let users = this.getAllUsers();
        const beforeLen = users.length;
        users = users.filter(u => u.id !== userId);

        if (users.length === beforeLen) {
            return { success: false, message: 'Kullanıcı bulunamadı!' };
        }

        this.addDeletedUserId(userId);
        this.saveAllUsers(users);
        return { success: true };
    }

    bulkAddUsersList(usersToAdd) {
        if (!Array.isArray(usersToAdd) || usersToAdd.length === 0) {
            return { success: false, message: 'Eklenecek kursiyer listesi boş.', added: 0, updated: 0, skipped: 0 };
        }

        const users = this.getAllUsers();
        const usernameSet = new Set(users.map(u => (u.username || '').toLowerCase()));
        let added = 0;
        let updated = 0;
        let skipped = 0;

        usersToAdd.forEach(u => {
            const rawFullName = (u.fullName || '').trim();
            const normName = this.normalizeTurkish(rawFullName);
            let cleanU = (u.username || '').trim().toLowerCase();
            if (!cleanU && normName) {
                cleanU = normName.replace(/[^a-z0-9]/g, '');
            }
            if (!cleanU) {
                skipped++;
                return;
            }

            const targetClassId = u.classId || null;
            // 1. Aynı kursiyer zaten kayıtlı mı? (Sadece ID veya aynı isim + aynı sınıf eşleşirse aynı kişidir)
            const existingStudent = users.find(existing => {
                if (u.id && existing.id === u.id) return true;
                if (normName && this.normalizeTurkish(existing.fullName || '') === normName && (existing.classId || null) === targetClassId) return true;
                return false;
            });

            if (existingStudent) {
                // Bilgilerini güncelle (mükerrer kayıt oluşturma!)
                if (targetClassId && !existingStudent.classId) existingStudent.classId = targetClassId;
                if (u.phone && !existingStudent.phone) existingStudent.phone = u.phone;
                if (u.email && !existingStudent.email) existingStudent.email = u.email;
                if (u.notes) existingStudent.notes = u.notes;
                if (u.password && u.password !== '123' && (!existingStudent.password || existingStudent.password === '123')) {
                    existingStudent.password = u.password;
                }
                updated++;
                return;
            }

            // 2. Kullanıcı adı başka biri tarafından kullanılıyorsa numara ekle (asla kursiyeri atlama!)
            let finalUsername = cleanU;
            let counter = 2;
            while (usernameSet.has(finalUsername)) {
                finalUsername = cleanU + counter;
                counter++;
            }
            usernameSet.add(finalUsername);

            const startMod = parseInt(u.initialModuleId) || 1;
            const unlocked = [];
            const completed = [];
            for (let i = 1; i <= startMod; i++) {
                unlocked.push(i);
                if (i < startMod) completed.push(i);
            }

            const newUser = {
                id: 'usr_' + Date.now() + '_' + Math.floor(Math.random() * 10000) + '_' + added,
                fullName: rawFullName || finalUsername,
                username: finalUsername,
                password: (u.password || '123').trim(),
                email: (u.email || '').trim(),
                phone: (u.phone || '').trim(),
                avatar: u.avatar || '',
                createdAt: new Date().toISOString(),
                lastActive: new Date().toISOString(),
                currentModuleId: startMod,
                completedModuleIds: completed,
                unlockedModuleIds: unlocked,
                classId: targetClassId,
                notes: (u.notes || '').trim()
            };

            users.push(newUser);
            added++;
        });

        if (added > 0 || updated > 0) {
            this.saveAllUsers(users);
        }

        return { success: true, added, updated, skipped, count: users.length };
    }

    bulkAddUsers(textData, defaultPassword = '123') {
        const lines = textData.split('\n').map(l => l.trim()).filter(Boolean);
        const toAdd = [];
        const tr2 = s => s.toLowerCase().replace(/ç/g,'c').replace(/ğ/g,'g').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ş/g,'s').replace(/ü/g,'u').replace(/[^a-z0-9]/g,'');

        lines.forEach(line => {
            let parts = line.split(',').map(p => p.trim());
            let fullName = parts[0] || '';
            let username = parts[1] || tr2(fullName);
            let password = parts[2] || defaultPassword;
            if (fullName || username) {
                toAdd.push({ fullName, username, password });
            }
        });

        const res = this.bulkAddUsersList(toAdd);
        return { addedCount: res.added, skippedCount: res.skipped };
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
            const raw = localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.databaseURL) {
                    if (parsed.databaseURL.includes('firebaseio.com')) {
                        parsed.databaseURL = DEFAULT_FIREBASE_CONFIG.databaseURL;
                    }
                    return parsed;
                }
            }
            return DEFAULT_FIREBASE_CONFIG;
        } catch (e) {
            return DEFAULT_FIREBASE_CONFIG;
        }
    }

    saveFirebaseConfig(cfg) {
        localStorage.setItem(STORAGE_KEYS.FIREBASE_CONFIG, JSON.stringify(cfg));
        this.firebaseConfig = cfg;
    }

    async syncCollectionToFirebase(collectionKey, data) {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return { success: false, message: 'Firebase aktif değil.' };

        try {
            let url = cfg.databaseURL.replace(/\/$/, '') + `/${collectionKey}.json`;
            if (cfg.apiKey) {
                url += `?auth=${cfg.apiKey}`;
            }

            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                return { success: true };
            } else {
                const text = await res.text();
                console.warn(`Firebase ${collectionKey} sunucu hatası:`, text);
                return { success: false, message: text };
            }
        } catch (err) {
            console.warn(`Firebase ${collectionKey} senkronizasyon hatası:`, err);
            return { success: false, message: err.message };
        }
    }

    async syncToFirebase(users) {
        return await this.syncCollectionToFirebase('kursiyerler', users);
    }

    async pullFromFirebase() {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return { success: false, message: 'Firebase aktif değil.' };

        try {
            const baseUrl = cfg.databaseURL.replace(/\/$/, '');
            const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';

            // 1. Sınıflar (Önce sınıfları çek ki kursiyerlerin sınıf doğrulaması tam olsun)
            const classesRes = await fetch(`${baseUrl}/classes.json${authParam}`);
            let validClassIds = new Set();
            if (classesRes.ok) {
                const classesRaw = await classesRes.json();
                let cloudClasses = [];
                if (Array.isArray(classesRaw)) {
                    cloudClasses = classesRaw.filter(Boolean);
                } else if (classesRaw && typeof classesRaw === 'object') {
                    cloudClasses = Object.values(classesRaw).filter(Boolean);
                }

                if (cloudClasses.length > 0) {
                    const seen = new Map();
                    cloudClasses.forEach(c => {
                        if (c && c.id) {
                            const k = (c.name || '').trim().toLowerCase();
                            if (!seen.has(c.id) && !seen.has(k)) {
                                seen.set(c.id, c);
                                seen.set(k, c);
                            }
                        }
                    });
                    const cleanClasses = Array.from(new Set(seen.values()));
                    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(cleanClasses));
                    validClassIds = new Set(cleanClasses.map(c => c.id));
                }
            }
            if (validClassIds.size === 0) {
                validClassIds = new Set(this.getAllClasses().map(c => c.id));
            }

            // 2. Kursiyerler (Bulut Ana Kaynaktır - Yetkili Senkronizasyon)
            let count = 0;
            const usersRes = await fetch(`${baseUrl}/kursiyerler.json${authParam}`);
            if (usersRes.ok) {
                const usersData = await usersRes.json();
                let cloudUsers = [];
                if (Array.isArray(usersData)) {
                    cloudUsers = usersData.filter(Boolean);
                } else if (usersData && typeof usersData === 'object') {
                    cloudUsers = Object.values(usersData).filter(Boolean);
                }

                if (cloudUsers.length > 0) {
                    // Test amaçlı sahte kullanıcıları (örn: aysefatma veya silinmiş test sınıfları) temizle
                    const filtered = cloudUsers.filter(u => {
                        if (!u || !u.id) return false;
                        if (u.username === 'aysefatma' || u.classId === 'cls_other_123') return false;
                        return true;
                    });

                    const cleanUsers = this.deduplicateUserList(filtered);

                    // Sınıf referanslarını doğrula (sınıfı silinmişse null yap)
                    cleanUsers.forEach(u => {
                        if (u.classId && !validClassIds.has(u.classId)) {
                            u.classId = null;
                        }
                    });

                    count = cleanUsers.length;
                    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(cleanUsers));
                    // Eski silinmiş id kalıntılarını temizle
                    localStorage.removeItem(STORAGE_KEYS.DELETED_USERS);
                }
            }

            // 3. Duyurular
            await this.pullAnnouncementsFromFirebase();

            // 4. Mesajlar
            await this.pullMessagesFromFirebase();

            // 5. Özel Modüller (Menü yapısı ve sol/sağ dağılımı)
            const modulesRes = await fetch(`${baseUrl}/custom_modules.json${authParam}`);
            if (modulesRes.ok) {
                const modulesData = await modulesRes.json();
                if (modulesData && Array.isArray(modulesData) && modulesData.length > 0) {
                    localStorage.setItem(STORAGE_KEYS.CUSTOM_MODULES, JSON.stringify(modulesData));
                }
            }

            // 6. Tema ve Menü Tasarım Ayarları
            const themeRes = await fetch(`${baseUrl}/theme_settings.json${authParam}`);
            if (themeRes.ok) {
                const themeData = await themeRes.json();
                if (themeData && typeof themeData === 'object' && Object.keys(themeData).length > 0) {
                    localStorage.setItem('ehem_theme_settings', JSON.stringify(themeData));
                    if (themeData.theme) {
                        localStorage.setItem('ehem_theme', themeData.theme);
                    }
                    this.applyThemeSettings(themeData);
                }
            }

            return { success: true, count };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    async pushAllToFirebase() {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return { success: false, message: 'Firebase aktif değil.' };

        try {
            const cleanUsers = this.deduplicateUserList(this.getAllUsers());
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(cleanUsers));

            await this.syncCollectionToFirebase('kursiyerler', cleanUsers);
            await this.syncCollectionToFirebase('classes', this.getAllClasses());
            
            const annMap = {};
            this.getAllAnnouncements().forEach(a => { if (a && a.id) annMap[a.id] = a; });
            await this.syncCollectionToFirebase('announcements', annMap);

            const msgMap = {};
            this.getAllMessages().forEach(m => { if (m && m.id) msgMap[m.id] = m; });
            await this.syncCollectionToFirebase('messages', msgMap);
            const customMods = this.getCustomModules() || (typeof COURSE_MODULES !== 'undefined' ? COURSE_MODULES : null);
            if (customMods && customMods.length > 0) {
                await this.syncCollectionToFirebase('custom_modules', customMods);
            }
            const themeSets = this.getThemeSettings();
            if (themeSets) {
                await this.syncCollectionToFirebase('theme_settings', themeSets);
            }
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    // ==================== YEDEKLEME (JSON DIŞA/İÇE AKTAR) ====================

    exportBackupJSON() {
        const data = {
            version: '2.0',
            exportedAt: new Date().toISOString(),
            admin: this.getAdminCreds(),
            users: this.getAllUsers(),
            classes: this.getAllClasses(),
            announcements: this.getAllAnnouncements ? this.getAllAnnouncements() : [],
            messages: this.getAllMessages(),
            themeSettings: this.getThemeSettings(),
            customModules: this.getCustomModules()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bilisimkursum_tam_yedek_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importBackupJSON(jsonStr) {
        try {
            const data = JSON.parse(jsonStr);
            if (data && (Array.isArray(data.users) || data.admin)) {
                if (Array.isArray(data.users)) this.saveAllUsers(data.users);
                if (data.admin) localStorage.setItem(STORAGE_KEYS.ADMIN_CREDS, JSON.stringify(data.admin));
                if (Array.isArray(data.classes)) this.saveAllClasses(data.classes);
                if (Array.isArray(data.announcements)) localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(data.announcements));
                if (Array.isArray(data.messages)) this.saveAllMessages(data.messages);
                if (data.themeSettings) this.saveThemeSettings(data.themeSettings);
                if (data.customModules) this.saveCustomModules(data.customModules);
                return { success: true, count: (data.users || []).length };
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
        this.syncCollectionToFirebase('classes', classes);
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
        this.syncCollectionToFirebase('custom_modules', modules);
    }

    resetModulesToDefault() {
        localStorage.removeItem(STORAGE_KEYS.CUSTOM_MODULES);
        const def = (typeof COURSE_MODULES !== 'undefined') ? COURSE_MODULES : [];
        this.syncCollectionToFirebase('custom_modules', def);
    }

    // ==================== TEMA & MENÜ TASARIM YÖNETİMİ ====================

    getValidThemes() {
        return ['night-blue', 'forest-green', 'purple-sunset', 'amber-gold', 'ocean-teal', 'clean-light'];
    }

    getThemeSettings() {
        try {
            const raw = localStorage.getItem('ehem_theme_settings');
            const def = {
                theme: localStorage.getItem('ehem_theme') || 'forest-green',
                allowMenuThemeSwitch: false,   // "Menü içinde tema ve tasarım değiştirme seçeneği"
                menuLayout: 'compact',     // 'two-column' | 'card-grid' | 'compact'
                menuStyle: 'classic-retro',  // 'theme-adaptive' | 'classic-retro' | 'minimal'
                switcherPosition: 'both'      // 'bottom' | 'navbar' | 'both'
            };
            return raw ? { ...def, ...JSON.parse(raw) } : def;
        } catch (e) {
            return {
                theme: localStorage.getItem('ehem_theme') || 'forest-green',
                allowMenuThemeSwitch: false,
                menuLayout: 'compact',
                menuStyle: 'classic-retro',
                switcherPosition: 'both'
            };
        }
    }

    saveThemeSettings(updates) {
        const current = this.getThemeSettings();
        const next = { ...current, ...updates };
        const validThemes = this.getValidThemes();
        if (next.theme && !validThemes.includes(next.theme)) {
            next.theme = 'forest-green';
        }
        localStorage.setItem('ehem_theme_settings', JSON.stringify(next));
        if (next.theme) {
            localStorage.setItem('ehem_theme', next.theme);
        }
        this.applyThemeSettings(next);
        this.syncCollectionToFirebase('theme_settings', next);
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

    // ==================== DUYURU YÖNETİMİ & BULUT SENKRONİZASYONU ====================

    getAllAnnouncements() {
        try {
            const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
            return raw ? JSON.parse(raw) : [];
        } catch (e) { return []; }
    }

    saveAllAnnouncements(anns) {
        const clean = Array.isArray(anns) ? anns.filter(Boolean) : [];
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(clean));
        const annMap = {};
        clean.forEach(a => {
            if (a && a.id) annMap[a.id] = a;
        });
        this.syncCollectionToFirebase('announcements', annMap);
    }

    async syncSingleAnnouncementToFirebase(ann) {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL || !ann || !ann.id) return { success: false };
        try {
            const baseUrl = cfg.databaseURL.replace(/\/$/, '');
            const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';
            const res = await fetch(`${baseUrl}/announcements/${ann.id}.json${authParam}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ann)
            });
            return { success: res.ok };
        } catch (err) {
            console.warn(`Firebase announcement ${ann.id} sync hatası:`, err);
            return { success: false };
        }
    }

    async deleteAnnouncementFromFirebase(annId) {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL || !annId) return { success: false };
        try {
            const baseUrl = cfg.databaseURL.replace(/\/$/, '');
            const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';
            const res = await fetch(`${baseUrl}/announcements/${annId}.json${authParam}`, {
                method: 'DELETE'
            });
            return { success: res.ok };
        } catch (err) {
            console.warn(`Firebase announcement ${annId} silme hatası:`, err);
            return { success: false };
        }
    }

    async pullAnnouncementsFromFirebase() {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return { success: false, list: this.getAllAnnouncements() };

        try {
            const baseUrl = cfg.databaseURL.replace(/\/$/, '');
            const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';
            const annsRes = await fetch(`${baseUrl}/announcements.json${authParam}`);
            if (annsRes.ok) {
                const annsRaw = await annsRes.json();
                let cloudList = [];
                if (Array.isArray(annsRaw)) {
                    cloudList = annsRaw.filter(Boolean);
                } else if (annsRaw && typeof annsRaw === 'object') {
                    cloudList = Object.values(annsRaw).filter(Boolean);
                }
                // En yeniden en eskiye sırala
                cloudList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
                localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(cloudList));
                return { success: true, count: cloudList.length, list: cloudList };
            }
            return { success: false, list: this.getAllAnnouncements() };
        } catch (err) {
            console.warn('Firebase duyurular çekilemedi:', err);
            return { success: false, list: this.getAllAnnouncements() };
        }
    }

    async addAnnouncement({ title, message, classId = null, type = 'info', expiryDate = null }) {
        const anns = this.getAllAnnouncements();
        const cleanClassId = (!classId || classId === 'all' || classId === 'null') ? null : classId;
        const newAnn = {
            id: 'ann_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            title: (title || '').trim(),
            message: (message || '').trim(),
            classId: cleanClassId,
            type: type || 'info',
            expiryDate: expiryDate || null,
            createdAt: new Date().toISOString()
        };
        anns.unshift(newAnn);
        this.saveAllAnnouncements(anns);
        await this.syncSingleAnnouncementToFirebase(newAnn);
        return { success: true, announcement: newAnn };
    }

    async deleteAnnouncement(annId) {
        if (!annId) return { success: false, message: 'Duyuru ID geçersiz.' };
        let anns = this.getAllAnnouncements();
        anns = anns.filter(a => a && a.id !== annId);
        
        // 1. Yerel hafızaya kaydet
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(anns));

        // 2. Firebase'den doğrudan ve temiz sil
        const cfg = this.getFirebaseConfig();
        if (cfg && cfg.enabled && cfg.databaseURL) {
            try {
                const baseUrl = cfg.databaseURL.replace(/\/$/, '');
                const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';

                // Tekil duyuruyu sil
                await fetch(`${baseUrl}/announcements/${annId}.json${authParam}`, {
                    method: 'DELETE'
                });

                // Eğer hiç duyuru kalmadıysa buluttaki ana duyuru düğümünü temizle
                if (anns.length === 0) {
                    await fetch(`${baseUrl}/announcements.json${authParam}`, {
                        method: 'DELETE'
                    });
                }
            } catch (err) {
                console.warn(`Firebase duyuru ${annId} silme hatası:`, err);
            }
        }
        return { success: true };
    }

    async deleteAllAnnouncements() {
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify([]));
        const cfg = this.getFirebaseConfig();
        if (cfg && cfg.enabled && cfg.databaseURL) {
            try {
                const baseUrl = cfg.databaseURL.replace(/\/$/, '');
                const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';
                await fetch(`${baseUrl}/announcements.json${authParam}`, { method: 'DELETE' });
            } catch (e) {}
        }
        return { success: true };
    }

    getDismissedAnnouncementIds(userId) {
        if (!userId) return [];
        try {
            const raw = localStorage.getItem('ehem_dismissed_anns_' + userId);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    async dismissAnnouncement(annId, userId) {
        if (!annId || !userId) return { success: false };

        // 1. Yerel dismissed listesine kaydet
        const list = this.getDismissedAnnouncementIds(userId);
        if (!list.includes(annId)) {
            list.push(annId);
            localStorage.setItem('ehem_dismissed_anns_' + userId, JSON.stringify(list));
        }

        // 2. Kullanıcı bilgilerini al
        const user = this.getUserById(userId) || this.getCurrentStudent() || {};
        const readRecord = {
            userId: userId,
            fullName: user.fullName || user.name || 'Kursiyer',
            username: user.username || '',
            classId: user.classId || null,
            readAt: new Date().toISOString()
        };

        // 3. Yerel duyurunun readBy haritasını güncelle
        const anns = this.getAllAnnouncements();
        const ann = anns.find(a => a && a.id === annId);
        if (ann) {
            if (!ann.readBy || typeof ann.readBy !== 'object') {
                ann.readBy = {};
            }
            ann.readBy[userId] = readRecord;
            localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(anns));
        }

        // 4. Firebase'e doğrudan tekil atomic yaz
        const cfg = this.getFirebaseConfig();
        if (cfg && cfg.enabled && cfg.databaseURL) {
            try {
                const baseUrl = cfg.databaseURL.replace(/\/$/, '');
                const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';
                await fetch(`${baseUrl}/announcements/${annId}/readBy/${userId}.json${authParam}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(readRecord)
                });
            } catch (err) {
                console.warn('Firebase readBy senkronizasyon hatası:', err);
            }
        }

        return { success: true };
    }

    async resendAnnouncement(annId) {
        if (!annId) return { success: false, message: 'Duyuru ID geçersiz.' };
        const anns = this.getAllAnnouncements();
        const ann = anns.find(a => a && a.id === annId);
        if (!ann) return { success: false, message: 'Duyuru bulunamadı.' };

        const now = new Date().toISOString();
        ann.readBy = {}; // Okuyanlar listesini sıfırla
        ann.resentAt = now; // Tekrar gönderilme zamanı
        ann.createdAt = now; // Sıralamada en üste çıkması için
        
        // Yerel dismissed listelerinden bu annId'yi temizle
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('ehem_dismissed_anns_')) {
                    try {
                        let ids = JSON.parse(localStorage.getItem(key)) || [];
                        if (Array.isArray(ids) && ids.includes(annId)) {
                            ids = ids.filter(id => id !== annId);
                            localStorage.setItem(key, JSON.stringify(ids));
                        }
                    } catch (e) {}
                }
            }
        } catch (e) {}

        // Yerel listeyi güncelle
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(anns));

        // Firebase'e atomik yaz ve readBy düğümünü tamamen temizle
        const cfg = this.getFirebaseConfig();
        if (cfg && cfg.enabled && cfg.databaseURL) {
            try {
                const baseUrl = cfg.databaseURL.replace(/\/$/, '');
                const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';
                
                const cleanAnn = { ...ann };
                delete cleanAnn.readBy;

                await fetch(`${baseUrl}/announcements/${annId}.json${authParam}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cleanAnn)
                });
                await fetch(`${baseUrl}/announcements/${annId}/readBy.json${authParam}`, {
                    method: 'DELETE'
                });
            } catch (err) {
                console.warn('Firebase resendAnnouncement hatası:', err);
            }
        }

        return { success: true, announcement: ann };
    }

    getAnnouncementReadStats(annId) {
        const ann = this.getAllAnnouncements().find(a => a && a.id === annId);
        if (!ann) {
            return { totalTarget: 0, readCount: 0, unreadCount: 0, percent: 0, readStudents: [], unreadStudents: [], targetName: 'Bilinmiyor' };
        }

        const allUsers = this.getAllUsers();
        const allClasses = this.getAllClasses();

        // 1. Hedef kitledeki öğrencileri belirle
        let targetStudents = [];
        let targetName = 'Tüm Kursiyerler';

        if (!ann.classId || ann.classId === 'all' || ann.classId === '') {
            targetStudents = allUsers;
        } else {
            const cls = allClasses.find(c => c.id === ann.classId);
            targetName = cls ? cls.name : 'Belirli Sınıf';
            targetStudents = allUsers.filter(u => u && u.classId && String(u.classId).trim() === String(ann.classId).trim());
        }

        // 2. readBy haritasını çözümle
        const readBy = ann.readBy || {};
        const isRead = (userId) => {
            if (!readBy) return false;
            if (typeof readBy === 'object' && !Array.isArray(readBy)) {
                return !!readBy[userId];
            }
            if (Array.isArray(readBy)) {
                return readBy.some(r => r && (r.userId === userId || r === userId));
            }
            return false;
        };

        const getReadTime = (userId) => {
            if (!readBy) return null;
            if (typeof readBy === 'object' && !Array.isArray(readBy) && readBy[userId]) {
                return readBy[userId].readAt || null;
            }
            if (Array.isArray(readBy)) {
                const found = readBy.find(r => r && (r.userId === userId || r === userId));
                return found && found.readAt ? found.readAt : null;
            }
            return null;
        };

        const readStudents = [];
        const unreadStudents = [];

        targetStudents.forEach(u => {
            const cls = allClasses.find(c => c.id === u.classId);
            const className = cls ? cls.name : (u.classId ? 'Sınıf ' + u.classId : 'Sınıfsız');
            const studentInfo = {
                id: u.id,
                fullName: u.fullName || u.username,
                username: u.username,
                avatar: u.avatar || '',
                classId: u.classId || null,
                className: className,
                email: u.email || '',
                phone: u.phone || ''
            };

            if (isRead(u.id)) {
                studentInfo.readAt = getReadTime(u.id);
                readStudents.push(studentInfo);
            } else {
                unreadStudents.push(studentInfo);
            }
        });

        const totalTarget = targetStudents.length;
        const readCount = readStudents.length;
        const unreadCount = unreadStudents.length;
        const percent = totalTarget > 0 ? Math.round((readCount / totalTarget) * 100) : 0;

        return {
            totalTarget,
            readCount,
            unreadCount,
            percent,
            readStudents,
            unreadStudents,
            targetName
        };
    }

    /**
     * Belirli bir kursiyer için aktif duyuruları döndürür.
     * classId null veya 'all' ise "tüm kursiyerler" duyurularını da alır.
     * Kursiyerin "Okudum" diyerek kapattığı duyurular hariç tutulur.
     */
    getAnnouncementsForUser(userId) {
        const user = this.getUserById(userId) || this.getCurrentStudent();
        const anns = this.getAllAnnouncements();
        const dismissed = this.getDismissedAnnouncementIds(userId);
        const now = new Date();

        return anns.filter(a => {
            if (!a || !a.id) return false;
            
            // Bulutta bu öğrenci okudu olarak işaretlenmiş mi?
            let isReadInCloud = false;
            if (a.readBy) {
                if (typeof a.readBy === 'object' && !Array.isArray(a.readBy)) {
                    const rec = a.readBy[userId];
                    if (rec) {
                        if (a.resentAt && rec.readAt) {
                            isReadInCloud = new Date(rec.readAt) >= new Date(a.resentAt);
                        } else if (a.resentAt && !rec.readAt) {
                            isReadInCloud = false;
                        } else {
                            isReadInCloud = true;
                        }
                    }
                } else if (Array.isArray(a.readBy)) {
                    isReadInCloud = a.readBy.some(r => r && (r.userId === userId || r === userId));
                }
            }
            if (isReadInCloud) return false;

            // Yerel dismissed listesinde varsa: ancak resentAt yoksa gizle (resentAt varsa yeniden gösterilsin)
            if (dismissed.includes(a.id) && !a.resentAt) {
                return false;
            }

            // Bitiş tarihi kontrolü (Günün sonuna kadar geçerli sayılır: 23:59:59)
            if (a.expiryDate) {
                const exp = new Date(a.expiryDate);
                if (String(a.expiryDate).length === 10) {
                    exp.setHours(23, 59, 59, 999);
                }
                if (exp.getTime() < now.getTime()) return false;
            }
            // Hedef kitle: classId boş, null veya 'all' ise herkese açıktır
            if (!a.classId || a.classId === null || a.classId === 'all' || a.classId === '') return true;
            
            // Sınıf kontrolü: Kursiyerin kayıtlı sınıfı ile eşleşiyor mu?
            const studentClassId = (user && user.classId) || (this.getCurrentStudent() ? this.getCurrentStudent().classId : null);
            if (!studentClassId) return false;
            return String(studentClassId).trim() === String(a.classId).trim();
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
        const msgMap = {};
        messages.forEach(m => {
            if (m && m.id) msgMap[m.id] = m;
        });
        this.syncCollectionToFirebase('messages', msgMap);
    }

    async syncSingleMessageToFirebase(msg) {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL || !msg || !msg.id) return;
        try {
            const baseUrl = cfg.databaseURL.replace(/\/$/, '');
            const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';
            await fetch(`${baseUrl}/messages/${msg.id}.json${authParam}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msg)
            });
        } catch (err) {
            console.warn(`Firebase message ${msg.id} sync hatası:`, err);
        }
    }

    async deleteMessageFromFirebase(messageId) {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL || !messageId) return;
        try {
            const baseUrl = cfg.databaseURL.replace(/\/$/, '');
            const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';
            await fetch(`${baseUrl}/messages/${messageId}.json${authParam}`, {
                method: 'DELETE'
            });
        } catch (err) {
            console.warn(`Firebase message ${messageId} silme hatası:`, err);
        }
    }

    async pullMessagesFromFirebase() {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return { success: false };

        try {
            const baseUrl = cfg.databaseURL.replace(/\/$/, '');
            const authParam = cfg.apiKey ? `?auth=${cfg.apiKey}` : '';
            const msgsRes = await fetch(`${baseUrl}/messages.json${authParam}`);
            if (msgsRes.ok) {
                const msgsRaw = await msgsRes.json();
                let cloudList = [];
                if (Array.isArray(msgsRaw)) {
                    cloudList = msgsRaw.filter(Boolean);
                } else if (msgsRaw && typeof msgsRaw === 'object') {
                    cloudList = Object.values(msgsRaw).filter(Boolean);
                }

                // Yerel mesajlar ile buluttaki mesajları birleştir
                const localList = this.getAllMessages();
                const map = new Map();
                localList.forEach(m => { if (m && m.id) map.set(m.id, m); });

                let hasChanges = false;
                cloudList.forEach(cm => {
                    if (!cm || !cm.id) return;
                    const lm = map.get(cm.id);
                    if (!lm) {
                        map.set(cm.id, cm);
                        hasChanges = true;
                    } else {
                        // Yanıt sayısı veya okunma/cevap durumu güncellenmişse buluttakini al
                        const cr = cm.replies || [];
                        const lr = lm.replies || [];
                        if (cr.length > lr.length || cm.status !== lm.status || cm.unreadByStudent !== lm.unreadByStudent || cm.unreadByAdmin !== lm.unreadByAdmin) {
                            map.set(cm.id, cm);
                            hasChanges = true;
                        }
                    }
                });

                const merged = Array.from(map.values()).sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
                localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(merged));
                return { success: true, count: merged.length, hasChanges };
            }
            return { success: false };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    getMessageById(id) {
        const messages = this.getAllMessages();
        return messages.find(m => m.id === id) || null;
    }

    getMessagesForUser(userId) {
        const user = this.getUserById(userId) || this.getCurrentStudent();
        if (!user) return [];
        const messages = this.getAllMessages();
        const uId = user.id;
        const userClassId = user.classId ? String(user.classId).trim() : null;

        return messages.filter(m => {
            if (!m) return false;
            // 1. Doğrudan bu kursiyere ait mesaj (kursiyerin sorduğu veya öğretmenin ona özel yazdığı)
            if (m.userId === uId || m.targetId === uId) return true;
            // 2. Tüm kursiyerlere gönderilen genel mesaj
            if (m.targetType === 'all') return true;
            // 3. Kursiyerin sınıfına gönderilen mesaj
            if (m.targetType === 'class' && userClassId) {
                const msgClassId = m.classId ? String(m.classId).trim() : (m.targetId ? String(m.targetId).trim() : null);
                if (msgClassId && msgClassId === userClassId) return true;
            }
            return false;
        });
    }

    getUnreadMessageCountForAdmin() {
        const messages = this.getAllMessages();
        return messages.filter(m => m.unreadByAdmin).length;
    }

    getUnreadMessageCountForStudent(userId) {
        const user = this.getUserById(userId) || this.getCurrentStudent();
        if (!user) return 0;
        const msgs = this.getMessagesForUser(user.id);
        return msgs.filter(m => {
            if (!m) return false;
            if (m.targetType === 'student' || !m.targetType || m.userId === user.id) {
                return !!m.unreadByStudent;
            }
            // Genel veya sınıf mesajı ise öğrencinin okuyup okumadığına bak
            const reads = Array.isArray(m.readByStudentIds) ? m.readByStudentIds : [];
            return !reads.includes(user.id);
        }).length;
    }

    sendMessageFromStudent({ userId, subject, message, moduleRefId = null }) {
        const user = this.getUserById(userId) || this.getCurrentStudent();
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
            origin: 'student',
            targetType: 'student',
            targetId: user.id,
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
            readByStudentIds: [user.id],
            replies: []
        };

        messages.push(newMsg);
        this.saveAllMessages(messages);
        this.syncSingleMessageToFirebase(newMsg);
        return { success: true, message: newMsg };
    }

    sendMessageFromAdmin({ targetType = 'all', targetId = null, subject, message }) {
        const trimSubject = (subject || '').trim();
        const trimMessage = (message || '').trim();
        if (!trimSubject || !trimMessage) {
            return { success: false, message: 'Konusu ve mesaj içeriği zorunludur.' };
        }

        const messages = this.getAllMessages();
        let newMsg = null;

        if (targetType === 'all') {
            newMsg = {
                id: 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                origin: 'admin',
                targetType: 'all',
                targetId: null,
                targetName: 'Tüm Kursiyerler',
                userId: null,
                userName: 'Tüm Kursiyerler',
                userUsername: 'tüm',
                classId: null,
                className: 'Tüm Sınıflar',
                subject: trimSubject,
                message: trimMessage,
                moduleRefId: null,
                createdAt: new Date().toISOString(),
                status: 'answered',
                unreadByAdmin: false,
                unreadByStudent: true,
                readByStudentIds: [],
                replies: []
            };
        } else if (targetType === 'class') {
            const classes = this.getAllClasses();
            const cls = classes.find(c => c.id === targetId);
            if (!cls) return { success: false, message: 'Seçilen sınıf bulunamadı.' };

            newMsg = {
                id: 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                origin: 'admin',
                targetType: 'class',
                targetId: cls.id,
                targetName: cls.name,
                userId: null,
                userName: cls.name + ' Sınıfı',
                userUsername: 'sınıf',
                classId: cls.id,
                className: cls.name,
                subject: trimSubject,
                message: trimMessage,
                moduleRefId: null,
                createdAt: new Date().toISOString(),
                status: 'answered',
                unreadByAdmin: false,
                unreadByStudent: true,
                readByStudentIds: [],
                replies: []
            };
        } else if (targetType === 'student') {
            const user = this.getUserById(targetId);
            if (!user) return { success: false, message: 'Seçilen kursiyer bulunamadı.' };

            const classes = this.getAllClasses();
            const userClass = classes.find(c => c.id === user.classId);

            newMsg = {
                id: 'msg_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                origin: 'admin',
                targetType: 'student',
                targetId: user.id,
                targetName: user.fullName || user.username,
                userId: user.id,
                userName: user.fullName || user.username,
                userUsername: user.username,
                classId: user.classId || null,
                className: userClass ? userClass.name : '',
                subject: trimSubject,
                message: trimMessage,
                moduleRefId: null,
                createdAt: new Date().toISOString(),
                status: 'answered',
                unreadByAdmin: false,
                unreadByStudent: true,
                readByStudentIds: [],
                replies: []
            };
        } else {
            return { success: false, message: 'Geçersiz hedef türü.' };
        }

        messages.push(newMsg);
        this.saveAllMessages(messages);
        this.syncSingleMessageToFirebase(newMsg);
        return { success: true, message: newMsg };
    }

    replyMessage({ messageId, sender = 'admin', senderName = 'Kurs Öğretmeni', text, senderId = null }) {
        const trimText = (text || '').trim();
        if (!trimText) return { success: false, message: 'Yanıt metni boş olamaz.' };

        const messages = this.getAllMessages();
        const msg = messages.find(m => m.id === messageId);
        if (!msg) return { success: false, message: 'Mesaj bulunamadı.' };

        if (!msg.replies) msg.replies = [];

        const replyObj = {
            id: 'rep_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            sender: sender, // 'admin' | 'student'
            senderId: senderId,
            senderName: senderName || (sender === 'admin' ? 'Kurs Öğretmeni' : msg.userName),
            text: trimText,
            createdAt: new Date().toISOString()
        };

        msg.replies.push(replyObj);

        if (sender === 'admin') {
            msg.status = 'answered';
            msg.unreadByStudent = true;
            msg.unreadByAdmin = false;
            msg.readByStudentIds = []; // Yeniden bildirim tetiklensin
        } else {
            msg.status = 'pending';
            msg.unreadByAdmin = true;
            msg.unreadByStudent = false;
            if (!msg.readByStudentIds) msg.readByStudentIds = [];
            if (senderId && !msg.readByStudentIds.includes(senderId)) {
                msg.readByStudentIds.push(senderId);
            }
        }

        this.saveAllMessages(messages);
        this.syncSingleMessageToFirebase(msg);
        return { success: true, message: msg, reply: replyObj };
    }

    markMessageAsReadByAdmin(messageId) {
        const messages = this.getAllMessages();
        const msg = messages.find(m => m.id === messageId);
        if (msg && msg.unreadByAdmin) {
            msg.unreadByAdmin = false;
            this.saveAllMessages(messages);
            this.syncSingleMessageToFirebase(msg);
        }
        return { success: true };
    }

    markMessageAsReadByStudent(messageId, studentId = null) {
        const messages = this.getAllMessages();
        const msg = messages.find(m => m.id === messageId);
        if (!msg) return { success: false };

        let changed = false;
        if (!msg.readByStudentIds) msg.readByStudentIds = [];
        const sId = studentId || (this.getCurrentStudent() ? this.getCurrentStudent().id : null);
        if (sId && !msg.readByStudentIds.includes(sId)) {
            msg.readByStudentIds.push(sId);
            changed = true;
        }

        if (msg.unreadByStudent) {
            msg.unreadByStudent = false;
            changed = true;
        }

        if (changed) {
            this.saveAllMessages(messages);
            this.syncSingleMessageToFirebase(msg);
        }
        return { success: true };
    }

    deleteMessage(messageId) {
        let messages = this.getAllMessages();
        messages = messages.filter(m => m.id !== messageId);
        this.saveAllMessages(messages);
        this.deleteMessageFromFirebase(messageId);
        return { success: true };
    }

    deleteMessagesBulk(messageIds) {
        if (!Array.isArray(messageIds) || messageIds.length === 0) return { success: true, count: 0 };
        const idSet = new Set(messageIds);
        let messages = this.getAllMessages();
        const initialCount = messages.length;
        messages = messages.filter(m => !idSet.has(m.id));
        this.saveAllMessages(messages);
        messageIds.forEach(id => this.deleteMessageFromFirebase(id));
        return { success: true, count: initialCount - messages.length };
    }

    deleteMessagesByClass(classId) {
        let messages = this.getAllMessages();
        const initialCount = messages.length;
        const toDeleteIds = [];
        if (classId === 'all_general') {
            messages = messages.filter(m => {
                if (m.targetType === 'all') { toDeleteIds.push(m.id); return false; }
                return true;
            });
        } else if (classId === 'none') {
            messages = messages.filter(m => {
                if (!m.classId && m.targetType !== 'all') { toDeleteIds.push(m.id); return false; }
                return true;
            });
        } else {
            messages = messages.filter(m => {
                if (m.classId === classId || m.targetId === classId) { toDeleteIds.push(m.id); return false; }
                return true;
            });
        }
        this.saveAllMessages(messages);
        toDeleteIds.forEach(id => this.deleteMessageFromFirebase(id));
        return { success: true, count: initialCount - messages.length };
    }

    deleteAllMessages() {
        const messages = this.getAllMessages();
        const count = messages.length;
        this.saveAllMessages([]);
        messages.forEach(m => this.deleteMessageFromFirebase(m.id));
        return { success: true, count };
    }
}

// Global olarak erişilebilir tekil nesne (Singleton)
if (typeof window !== 'undefined') {
    window.lmsStorage = new StorageService();
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StorageService };
}
