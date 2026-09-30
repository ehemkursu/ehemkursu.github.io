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
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T18:32:31.885Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Ali Veli",
    "id": "usr_1790447551885_723",
    "lastActive": "2026-09-29T08:51:42.394Z",
    "notes": "",
    "password": "123",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "aliveli"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.202Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "AMİNE SULTAN ASLAN",
    "id": "usr_1790408115202_700",
    "lastActive": "2026-09-29T20:28:11.024Z",
    "notes": "",
    "password": "82",
    "phone": "5516827182",
    "unlockedModuleIds": [
      1
    ],
    "username": "aslan"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "completedModuleIds": [
      1,
      2,
      3,
      4,
      5
    ],
    "createdAt": "2026-09-26T07:35:15.197Z",
    "currentModuleId": 6,
    "email": "",
    "fullName": "ATİYE KÖKCÜ",
    "id": "usr_1790408115197_869",
    "lastActive": "2026-09-30T18:21:52.120Z",
    "notes": "",
    "password": "01",
    "phone": "",
    "unlockedModuleIds": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "username": "kökcü"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.202Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "AYNUR GÜLALAN",
    "id": "usr_1790408115202_933",
    "lastActive": "2026-09-26T07:35:15.202Z",
    "notes": "",
    "password": "25",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "gülalan"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.198Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "AYNUR ÖZHİSAR",
    "id": "usr_1790408115198_219",
    "lastActive": "2026-09-26T07:35:15.198Z",
    "notes": "",
    "password": "20",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "özhi̇sar"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.204Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "AYŞEGÜL BAYRAM",
    "id": "usr_1790408115204_92",
    "lastActive": "2026-09-26T07:35:15.204Z",
    "notes": "",
    "password": "30",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "bayram"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.209Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "BERKUN AVCI",
    "id": "usr_1790408115209_231",
    "lastActive": "2026-09-26T07:35:15.209Z",
    "notes": "",
    "password": "37",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "avci"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.200Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "BEYZA BURAK",
    "id": "usr_1790408115200_788",
    "lastActive": "2026-09-26T07:35:15.200Z",
    "notes": "",
    "password": "18",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "burak"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.210Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "BÜŞRA BAVUK",
    "id": "usr_1790408115210_207",
    "lastActive": "2026-09-26T07:35:15.210Z",
    "notes": "",
    "password": "39",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "bavuk"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.199Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "BÜŞRA KURT",
    "id": "usr_1790408115199_100",
    "lastActive": "2026-09-26T07:35:15.199Z",
    "notes": "",
    "password": "06",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "kurt"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.206Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "DAMLA BAYATLI",
    "id": "usr_1790408115206_279",
    "lastActive": "2026-09-26T07:35:15.206Z",
    "notes": "",
    "password": "32",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "bayatli"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.203Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "EBRU TORU",
    "id": "usr_1790408115203_958",
    "lastActive": "2026-09-26T07:35:15.203Z",
    "notes": "",
    "password": "29",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "toru"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.199Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "EDANUR KIY",
    "id": "usr_1790408115199_936",
    "lastActive": "2026-09-26T07:35:15.199Z",
    "notes": "",
    "password": "08",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "kiy"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.201Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "EFE AKBULUT",
    "id": "usr_1790408115201_579",
    "lastActive": "2026-09-26T07:35:15.201Z",
    "notes": "",
    "password": "22",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "akbulut"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.199Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "ELİF AYDIN",
    "id": "usr_1790408115199_904",
    "lastActive": "2026-09-26T07:35:15.199Z",
    "notes": "",
    "password": "02",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "aydin"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.212Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "ELİF ŞEN",
    "id": "usr_1790408115212_54",
    "lastActive": "2026-09-26T07:35:15.212Z",
    "notes": "",
    "password": "42",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "şen"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.203Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "ESMA HATUN BAĞCI",
    "id": "usr_1790408115203_210",
    "lastActive": "2026-09-26T07:35:15.203Z",
    "notes": "",
    "password": "28",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "bağci"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.202Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "ESMANUR ABACIK",
    "id": "usr_1790408115202_859",
    "lastActive": "2026-09-26T07:35:15.202Z",
    "notes": "",
    "password": "26",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "abacik"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.201Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "ESMANUR COŞAR",
    "id": "usr_1790408115201_79",
    "lastActive": "2026-09-26T07:35:15.201Z",
    "notes": "",
    "password": "21",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "coşar"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.211Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "ESRA KAYA",
    "id": "usr_1790408115211_586",
    "lastActive": "2026-09-26T07:35:15.211Z",
    "notes": "",
    "password": "40",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "kaya"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.197Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "FATIMA CAN",
    "id": "usr_1790408115197_658",
    "lastActive": "2026-09-26T07:35:15.197Z",
    "notes": "",
    "password": "09",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "can"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.198Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "FATMANUR SAYLIK",
    "id": "usr_1790408115198_514",
    "lastActive": "2026-09-26T07:35:15.198Z",
    "notes": "",
    "password": "41",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "saylik"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.200Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "FİRDEVS BAKIR",
    "id": "usr_1790408115200_148",
    "lastActive": "2026-09-26T07:35:15.200Z",
    "notes": "",
    "password": "17",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "bakir"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.198Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "GÜLEN GÜNDOĞDU",
    "id": "usr_1790408115198_207",
    "lastActive": "2026-09-26T07:35:15.198Z",
    "notes": "",
    "password": "01",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "gündoğdu"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.199Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "GÜLSEN KAPLAN",
    "id": "usr_1790408115199_917",
    "lastActive": "2026-09-26T07:35:15.199Z",
    "notes": "",
    "password": "05",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "kaplan"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.201Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "HAZAL ÇÖLGEZER",
    "id": "usr_1790408115201_365",
    "lastActive": "2026-09-26T07:35:15.201Z",
    "notes": "",
    "password": "20",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "çölgezer"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.200Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "HAZAL ERAT",
    "id": "usr_1790408115200_340",
    "lastActive": "2026-09-26T07:35:15.200Z",
    "notes": "",
    "password": "16",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "erat"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.200Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "HİLAL ŞANLI",
    "id": "usr_1790408115200_650",
    "lastActive": "2026-09-26T07:35:15.200Z",
    "notes": "",
    "password": "14",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "şanli"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.199Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "İBRAHİM SEFA KESER",
    "id": "usr_1790408115199_161",
    "lastActive": "2026-09-26T07:35:15.199Z",
    "notes": "",
    "password": "11",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "çam"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.211Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "İREM ÜSTÜN",
    "id": "usr_1790408115211_628",
    "lastActive": "2026-09-26T07:35:15.211Z",
    "notes": "",
    "password": "41",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "üstün"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.200Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "İSA ÖZMEN",
    "id": "usr_1790408115200_21",
    "lastActive": "2026-09-26T07:35:15.200Z",
    "notes": "",
    "password": "15",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "özmen"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.202Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "MEDİNE AMAK",
    "id": "usr_1790408115202_374",
    "lastActive": "2026-09-26T07:35:15.202Z",
    "notes": "",
    "password": "23",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "amak"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.201Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "MİRAÇ İHSAN ÇAKIR",
    "id": "usr_1790408115201_591",
    "lastActive": "2026-09-26T07:35:15.201Z",
    "notes": "",
    "password": "19",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "çakir"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.203Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "RAVZA DAĞSOY",
    "id": "usr_1790408115203_978",
    "lastActive": "2026-09-26T07:35:15.203Z",
    "notes": "",
    "password": "27",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "dağsoy"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.196Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "SERHAT POLAT",
    "id": "usr_1790408115196_395",
    "lastActive": "2026-09-29T08:51:42.382Z",
    "notes": "",
    "password": "10",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "polat"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.197Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "SILA ÇEVİK",
    "id": "usr_1790408115197_567",
    "lastActive": "2026-09-26T07:35:15.197Z",
    "notes": "",
    "password": "17",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "çevi̇k"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.208Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "SONGÜL KILIÇÇEK",
    "id": "usr_1790408115208_598",
    "lastActive": "2026-09-26T07:35:15.208Z",
    "notes": "",
    "password": "33",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "kiliççek"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.198Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "SUDENAZ AKTAŞ",
    "id": "usr_1790408115198_610",
    "lastActive": "2026-09-26T07:35:15.198Z",
    "notes": "",
    "password": "18",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "aktaş"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.198Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "TUANA YILMAZ",
    "id": "usr_1790408115198_696",
    "lastActive": "2026-09-26T07:35:15.198Z",
    "notes": "",
    "password": "40",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "yilmaz"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.204Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "VEDA ŞİMŞEK",
    "id": "usr_1790408115204_648",
    "lastActive": "2026-09-26T07:35:15.204Z",
    "notes": "",
    "password": "31",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "şi̇mşek"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.197Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "YAĞIZ ERDOĞAN",
    "id": "usr_1790408115197_741",
    "lastActive": "2026-09-29T08:51:42.396Z",
    "notes": "",
    "password": "61",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "erdoğan"
  },
  {
    "avatar": "",
    "classId": "cls_1790408115196_514",
    "createdAt": "2026-09-26T07:35:15.197Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "ZEHRA KOÇLARDAN",
    "id": "usr_1790408115197_351",
    "lastActive": "2026-09-29T08:51:42.390Z",
    "notes": "",
    "password": "43",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "koçlardan"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Aleyna ASLAN",
    "id": "usr_ehem_01_aslan",
    "lastActive": "2026-09-29T20:28:11.024Z",
    "notes": "",
    "password": "82",
    "phone": "5516827182",
    "unlockedModuleIds": [
      1
    ],
    "username": "aslan"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Aslıhan ÇAKIR",
    "id": "usr_ehem_02_cakir",
    "lastActive": "2026-09-28T12:25:03.831Z",
    "notes": "",
    "password": "48",
    "phone": "5356594148",
    "unlockedModuleIds": [
      1
    ],
    "username": "cakir"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Ayşegül ÇAKMAK",
    "id": "usr_ehem_03_cakmak",
    "lastActive": "2026-09-29T20:30:03.270Z",
    "notes": "",
    "password": "34",
    "phone": "5413771734",
    "unlockedModuleIds": [
      1
    ],
    "username": "cakmak"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Banu ALKAN",
    "id": "usr_1790598303831_641",
    "lastActive": "2026-09-30T16:24:20.033Z",
    "notes": "",
    "password": "01",
    "phone": "5537531501",
    "unlockedModuleIds": [
      1
    ],
    "username": "alkan"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Damla TEMEL",
    "id": "usr_ehem_05_temel",
    "lastActive": "2026-09-28T12:25:03.831Z",
    "notes": "",
    "password": "88",
    "phone": "5464616888",
    "unlockedModuleIds": [
      1
    ],
    "username": "temel"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-30T17:51:19.691Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "deneme",
    "id": "usr_1790790679691_649",
    "lastActive": "2026-09-30T17:51:19.692Z",
    "notes": "",
    "password": "123",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "deneme"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Ece Yaren BALABAN",
    "id": "usr_ehem_06_balaban",
    "lastActive": "2026-09-29T20:30:40.801Z",
    "notes": "",
    "password": "15",
    "phone": "5058557915",
    "unlockedModuleIds": [
      1
    ],
    "username": "balaban"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Feyza DUMAN",
    "id": "usr_ehem_07_duman",
    "lastActive": "2026-09-29T20:31:12.142Z",
    "notes": "",
    "password": "74",
    "phone": "5465384374",
    "unlockedModuleIds": [
      1
    ],
    "username": "duman"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Gizem ERSÖZ",
    "id": "usr_ehem_08_ersoz",
    "lastActive": "2026-09-29T20:31:38.814Z",
    "notes": "",
    "password": "26",
    "phone": "5457933426",
    "unlockedModuleIds": [
      1
    ],
    "username": "ersoz"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Işıl ENGÜR",
    "id": "usr_ehem_09_engur",
    "lastActive": "2026-09-29T20:33:08.013Z",
    "notes": "",
    "password": "76",
    "phone": "5372606076",
    "unlockedModuleIds": [
      1
    ],
    "username": "engur"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Mehmet YAVAŞÇA",
    "id": "usr_ehem_10_yavasca",
    "lastActive": "2026-09-29T20:43:26.995Z",
    "notes": "",
    "password": "17",
    "phone": "5519647017",
    "unlockedModuleIds": [
      1
    ],
    "username": "yavasca"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Nisa DÖKMECİOĞLU",
    "id": "usr_ehem_11_dokmecioglu",
    "lastActive": "2026-09-29T20:34:15.726Z",
    "notes": "",
    "password": "05",
    "phone": "5462909205",
    "unlockedModuleIds": [
      1
    ],
    "username": "dokmecioglu"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Nursu GÜNSAN",
    "id": "usr_ehem_12_gunsan",
    "lastActive": "2026-09-28T12:25:03.831Z",
    "notes": "",
    "password": "12",
    "phone": "",
    "unlockedModuleIds": [
      1
    ],
    "username": "gunsan"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Orhan Buğra TURCAN",
    "id": "usr_ehem_13_turcan",
    "lastActive": "2026-09-29T20:35:00.829Z",
    "notes": "",
    "password": "66",
    "phone": "5414273266",
    "unlockedModuleIds": [
      1
    ],
    "username": "turcan"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Özge KARAARSLAN",
    "id": "usr_ehem_14_karaarslan",
    "lastActive": "2026-09-29T20:35:40.602Z",
    "notes": "",
    "password": "26",
    "phone": "5386471426",
    "unlockedModuleIds": [
      1
    ],
    "username": "karaarslan"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Sabri Can EVYAPAN",
    "id": "usr_ehem_15_evyapan",
    "lastActive": "2026-09-29T20:36:17.672Z",
    "notes": "",
    "password": "49",
    "phone": "5318801949",
    "unlockedModuleIds": [
      1
    ],
    "username": "evyapan"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Sema UÇAR",
    "id": "usr_ehem_16_ucar",
    "lastActive": "2026-09-29T20:36:39.848Z",
    "notes": "",
    "password": "37",
    "phone": "5011797737",
    "unlockedModuleIds": [
      1
    ],
    "username": "ucar"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Sena BÜYÜKÖZER",
    "id": "usr_ehem_17_buyukozer",
    "lastActive": "2026-09-29T20:37:10.847Z",
    "notes": "",
    "password": "93",
    "phone": "5385150193",
    "unlockedModuleIds": [
      1
    ],
    "username": "buyukozer"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Sinan KOŞAR",
    "id": "usr_ehem_18_kosar",
    "lastActive": "2026-09-29T20:37:32.029Z",
    "notes": "",
    "password": "90",
    "phone": "5511681890",
    "unlockedModuleIds": [
      1
    ],
    "username": "kosar"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Şifanur AFACAN",
    "id": "usr_ehem_19_afacan",
    "lastActive": "2026-09-28T12:25:03.831Z",
    "notes": "",
    "password": "75",
    "phone": "5353271375",
    "unlockedModuleIds": [
      1
    ],
    "username": "afacan"
  },
  {
    "avatar": "",
    "classId": "cls_1790672541394_294",
    "createdAt": "2026-09-28T12:25:03.831Z",
    "currentModuleId": 1,
    "email": "",
    "fullName": "Zehra ÇELİK",
    "id": "usr_ehem_20_celik",
    "lastActive": "2026-09-29T20:38:24.973Z",
    "notes": "",
    "password": "04",
    "phone": "5305137004",
    "unlockedModuleIds": [
      1
    ],
    "username": "celik"
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
            this.startRealtimeSync();
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
            const list = raw ? JSON.parse(raw) : [];
            return list.map(u => this.normalizeUserProgress(u));
        } catch (e) {
            console.error("Kullanıcılar okunamadı:", e);
            return [];
        }
    }

    saveAllUsers(users) {
        const normalized = (users || []).map(u => this.normalizeUserProgress(u));
        const clean = this.deduplicateUserList(normalized);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(clean));
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
        this.syncUserToFirebase(newUser);
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
        this.syncUserToFirebase(users[idx]);
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
        this.deleteUserFromFirebase(userId);
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
        this.patchUserInFirebase(userId, {
            completedModuleIds: user.completedModuleIds,
            unlockedModuleIds: user.unlockedModuleIds,
            currentModuleId: user.currentModuleId,
            lastActive: user.lastActive
        });
        return {
            success: true,
            user,
            unlockedNext: nextModuleId || null,
            isAllCompleted: user.completedModuleIds.length >= totalModules
        };
    }

    normalizeUserProgress(user) {
        if (!user) return user;
        const customMods = this.getCustomModules();
        const allModuleIds = customMods
            ? customMods.map(m => m.id)
            : Array.from({ length: 26 }, (_, i) => i + 1);

        const unlocked = new Set(user.unlockedModuleIds || [allModuleIds[0] || 1]);
        const completed = new Set(user.completedModuleIds || []);

        const maxUnlocked = Math.max(...unlocked, 1);
        const targetIdx = allModuleIds.indexOf(maxUnlocked);

        // En yüksek açık bölüme kadar olan tüm önceki bölümleri tamamlanmış say
        if (targetIdx > 0) {
            for (let i = 0; i < targetIdx; i++) {
                completed.add(allModuleIds[i]);
                unlocked.add(allModuleIds[i]);
            }
        }

        user.completedModuleIds = Array.from(completed).sort((a, b) => a - b);
        user.unlockedModuleIds = Array.from(unlocked).sort((a, b) => a - b);

        // Sıradaki tamamlanmamış açık bölüm, yoksa en yüksek açık bölüm
        const nextIncomplete = allModuleIds.find(id => unlocked.has(id) && !completed.has(id));
        user.currentModuleId = nextIncomplete || maxUnlocked || 1;

        return user;
    }

    toggleModuleLock(userId, moduleId) {
        const user = this.getUserById(userId);
        if (!user) return { success: false };

        const customMods = this.getCustomModules();
        const allModuleIds = customMods
            ? customMods.map(m => m.id)
            : Array.from({ length: 26 }, (_, i) => i + 1);

        moduleId = parseInt(moduleId);
        const unlocked = new Set(user.unlockedModuleIds || [1]);
        const completed = new Set(user.completedModuleIds || []);

        const isCompleted = completed.has(moduleId);
        const isUnlocked = unlocked.has(moduleId);

        if (!isUnlocked && !isCompleted) {
            // 1. Durum: Kilitliydi -> Bu bölüme kadar olanları tamamla, bu bölümü açık (aktif) yap
            const targetIdx = allModuleIds.indexOf(moduleId);
            if (targetIdx !== -1) {
                for (let i = 0; i < targetIdx; i++) {
                    completed.add(allModuleIds[i]);
                    unlocked.add(allModuleIds[i]);
                }
            }
            unlocked.add(moduleId);
            user.currentModuleId = moduleId;
        } else if (isUnlocked && !isCompleted) {
            // 2. Durum: Açıktı -> Bu bölümü tamamla ve bir sonraki bölümü aç
            completed.add(moduleId);
            unlocked.add(moduleId);
            const currentIdx = allModuleIds.indexOf(moduleId);
            const nextModuleId = (currentIdx >= 0 && currentIdx < allModuleIds.length - 1)
                ? allModuleIds[currentIdx + 1]
                : null;
            if (nextModuleId) {
                unlocked.add(nextModuleId);
                user.currentModuleId = nextModuleId;
            } else {
                user.currentModuleId = moduleId;
            }
        } else if (isCompleted) {
            // 3. Durum: Tamamlanmıştı -> Tamamlamayı kaldır, açık (aktif) yap ve sonrakileri kilitle
            completed.delete(moduleId);
            unlocked.add(moduleId);
            user.currentModuleId = moduleId;
            const currentIdx = allModuleIds.indexOf(moduleId);
            if (currentIdx !== -1) {
                for (let i = currentIdx + 1; i < allModuleIds.length; i++) {
                    completed.delete(allModuleIds[i]);
                    unlocked.delete(allModuleIds[i]);
                }
            }
        }

        user.unlockedModuleIds = Array.from(unlocked).sort((a, b) => a - b);
        user.completedModuleIds = Array.from(completed).sort((a, b) => a - b);
        user.lastActive = new Date().toISOString();
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
        user.completedModuleIds = allIds;
        user.currentModuleId = allIds[allIds.length - 1];
        user.lastActive = new Date().toISOString();
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
                    if (parsed.enabled === undefined) parsed.enabled = true;
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
        if (cfg && cfg.enabled) {
            this.startRealtimeSync();
        }
    }

    /**
     * Firebase REST API çağrıları için önbellek kırma (cache-busting),
     * no-store başlıkları ve otomatik yeniden deneme (retry) desteği
     */
    async fetchFirebase(endpoint, options = {}, retries = 3) {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) {
            return { ok: false, status: 0, error: 'Firebase aktif değil.' };
        }

        const baseUrl = cfg.databaseURL.replace(/\/$/, '');
        const cleanPath = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
        const separator = cleanPath.includes('?') ? '&' : '?';
        const auth = cfg.apiKey ? `auth=${encodeURIComponent(cfg.apiKey)}&` : '';
        const cacheBuster = `_ts=${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const url = `${baseUrl}${cleanPath}${separator}${auth}${cacheBuster}`;

        const fetchOptions = {
            ...options,
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                ...(options.headers || {})
            }
        };

        for (let attempt = 1; attempt <= retries; attempt++) {
            const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
            const timeoutId = controller ? setTimeout(() => controller.abort(), 8000) : null;
            try {
                const res = await fetch(url, {
                    ...fetchOptions,
                    signal: controller ? controller.signal : undefined
                });
                if (timeoutId) clearTimeout(timeoutId);
                return res;
            } catch (err) {
                if (timeoutId) clearTimeout(timeoutId);
                if (attempt === retries) {
                    console.warn(`[Firebase] İstek başarısız (${attempt}/${retries}): ${endpoint}`, err);
                    return { ok: false, status: 0, error: err.message };
                }
                await new Promise(r => setTimeout(r, attempt * 600));
            }
        }
    }

    /**
     * İki kullanıcı kaydının ilerleme ve bilgilerini gerilemeyecek şekilde birleştirir (Monotonic Merge)
     */
    mergeUserProgress(existing, incoming) {
        if (!existing) return incoming ? { ...incoming } : null;
        if (!incoming) return existing ? { ...existing } : null;

        const merged = { ...existing, ...incoming };

        // 1. İsim kontrolü: Dolu ve uzun olanı tercih et
        if ((existing.fullName || '').trim().length > (incoming.fullName || '').trim().length) {
            merged.fullName = existing.fullName.trim();
        }

        // 2. Sınıf kontrolü: Geçerli sınıfı koru
        if (!merged.classId && existing.classId) {
            merged.classId = existing.classId;
        }

        // 3. Tamamlanan bölümler (UNION): Asla geriye gitmez
        const compSet = new Set([
            ...(existing.completedModuleIds || []),
            ...(incoming.completedModuleIds || [])
        ].map(Number).filter(n => !isNaN(n) && n > 0));
        merged.completedModuleIds = Array.from(compSet).sort((a, b) => a - b);

        // 4. Açık bölümler (UNION)
        const unlSet = new Set([
            1,
            ...(existing.unlockedModuleIds || []),
            ...(incoming.unlockedModuleIds || []),
            ...(merged.completedModuleIds || [])
        ].map(Number).filter(n => !isNaN(n) && n > 0));
        merged.unlockedModuleIds = Array.from(unlSet).sort((a, b) => a - b);

        // 5. Mevcut bölüm: En ileri olan
        const maxCur = Math.max(existing.currentModuleId || 1, incoming.currentModuleId || 1);
        merged.currentModuleId = maxCur;

        // 6. Son aktiflik: En güncel zaman damgası
        const exTime = new Date(existing.lastActive || 0).getTime();
        const inTime = new Date(incoming.lastActive || 0).getTime();
        merged.lastActive = inTime >= exTime ? incoming.lastActive : existing.lastActive;

        return this.normalizeUserProgress(merged);
    }

    /**
     * Tek bir kursiyeri Firebase bulutuna atomik olarak yazar
     */
    async syncUserToFirebase(user) {
        if (!user || !user.id) return { success: false };
        try {
            const res = await this.fetchFirebase(`/kursiyerler/${user.id}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            return { success: res && res.ok };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    /**
     * Tek bir kursiyerin belirli alanlarını atomik olarak günceller
     */
    async patchUserInFirebase(userId, patchData) {
        if (!userId || !patchData) return { success: false };
        try {
            const res = await this.fetchFirebase(`/kursiyerler/${userId}.json`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(patchData)
            });
            return { success: res && res.ok };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    /**
     * Bir kursiyeri Firebase'den siler ve silinmişler kaydına ekler
     */
    async deleteUserFromFirebase(userId) {
        if (!userId) return { success: false };
        try {
            await this.fetchFirebase(`/kursiyerler/${userId}.json`, { method: 'DELETE' });
            await this.fetchFirebase(`/deleted_users/${userId}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, deletedAt: new Date().toISOString() })
            });
            return { success: true };
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    async syncCollectionToFirebase(collectionKey, data) {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return { success: false, message: 'Firebase aktif değil.' };

        try {
            let uploadData = data;
            // Kursiyerler ve sınıfları Firebase'de atomik anahtarlı (keyed map) sakla
            if (collectionKey === 'kursiyerler' && Array.isArray(data)) {
                const userMap = {};
                data.forEach(u => { if (u && u.id) userMap[u.id] = u; });
                uploadData = userMap;
            } else if (collectionKey === 'classes' && Array.isArray(data)) {
                const classMap = {};
                data.forEach(c => { if (c && c.id) classMap[c.id] = c; });
                uploadData = classMap;
            }

            const res = await this.fetchFirebase(`/${collectionKey}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(uploadData)
            });

            if (res && res.ok) {
                return { success: true };
            } else {
                return { success: false, message: res ? res.error : 'İstek başarısız' };
            }
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    async syncToFirebase(users) {
        return await this.syncCollectionToFirebase('kursiyerler', users);
    }

    /**
     * Buluttan en son verileri çeker ve yerel depolama ile hatasız birleştirir
     */
    async pullFromFirebase() {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return { success: false, message: 'Firebase aktif değil.' };

        try {
            // 1. Sınıflar (Önce sınıfları çek ki kursiyer doğrulaması doğru olsun)
            let validClassIds = new Set();
            try {
                const classesRes = await this.fetchFirebase('/classes.json');
                if (classesRes && classesRes.ok) {
                    const classesRaw = await classesRes.json();
                    const cloudClasses = Array.isArray(classesRaw) ? classesRaw.filter(Boolean) : (classesRaw && typeof classesRaw === 'object' ? Object.values(classesRaw).filter(Boolean) : []);
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
            } catch (e) {
                console.warn('[Firebase] Sınıf çekme hatası:', e);
            }
            if (validClassIds.size === 0) {
                validClassIds = new Set(this.getAllClasses().map(c => c.id));
            }

            // 2. Silinmiş kullanıcılar listesi
            let cloudDeletedSet = new Set();
            try {
                const delRes = await this.fetchFirebase('/deleted_users.json');
                if (delRes && delRes.ok) {
                    const delRaw = await delRes.json();
                    if (delRaw && typeof delRaw === 'object') {
                        Object.keys(delRaw).forEach(id => cloudDeletedSet.add(id));
                    }
                }
            } catch (e) {}

            // 3. Kursiyerler
            let count = 0;
            let hasChanges = false;
            try {
                const usersRes = await this.fetchFirebase('/kursiyerler.json');
                if (usersRes && usersRes.ok) {
                    const usersData = await usersRes.json();
                    const cloudUsers = Array.isArray(usersData) ? usersData.filter(Boolean) : (usersData && typeof usersData === 'object' ? Object.values(usersData).filter(Boolean) : []);

                    if (cloudUsers.length > 0) {
                        const localUsers = this.getAllUsers();
                        const localMap = new Map();
                        localUsers.forEach(u => { if (u && u.id) localMap.set(u.id, u); });

                        const mergedMap = new Map();

                        cloudUsers.forEach(cu => {
                            if (!cu || !cu.id) return;
                            if (cu.username === 'aysefatma' || cu.classId === 'cls_other_123') return;
                            if (cloudDeletedSet.has(cu.id)) return;

                            const lu = localMap.get(cu.id);
                            if (!lu) {
                                const copy = { ...cu };
                                if (copy.classId && !validClassIds.has(copy.classId)) copy.classId = null;
                                mergedMap.set(cu.id, this.normalizeUserProgress(copy));
                                hasChanges = true;
                            } else {
                                const merged = this.mergeUserProgress(lu, cu);
                                if (merged.classId && !validClassIds.has(merged.classId)) merged.classId = null;
                                mergedMap.set(cu.id, merged);
                                if (JSON.stringify(lu) !== JSON.stringify(merged)) {
                                    hasChanges = true;
                                }
                            }
                        });

                        // Yerelde olup henüz buluta gitmemiş yeni kullanıcılar varsa koru ve buluta yükle
                        localUsers.forEach(lu => {
                            if (lu && lu.id && !mergedMap.has(lu.id) && !cloudDeletedSet.has(lu.id)) {
                                mergedMap.set(lu.id, lu);
                                this.syncUserToFirebase(lu);
                                hasChanges = true;
                            }
                        });

                        const cleanUsers = this.deduplicateUserList(Array.from(mergedMap.values()));
                        count = cleanUsers.length;
                        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(cleanUsers));
                        localStorage.removeItem(STORAGE_KEYS.DELETED_USERS);
                    }
                }
            } catch (e) {
                console.warn('[Firebase] Kursiyer çekme hatası:', e);
            }

            // 4. Tema ve Menü Tasarım Ayarları (Anında uygula)
            try {
                const themeRes = await this.fetchFirebase('/theme_settings.json');
                if (themeRes && themeRes.ok) {
                    const themeData = await themeRes.json();
                    if (themeData && typeof themeData === 'object' && Object.keys(themeData).length > 0) {
                        localStorage.setItem('ehem_theme_settings', JSON.stringify(themeData));
                        if (themeData.theme) {
                            localStorage.setItem('ehem_theme', themeData.theme);
                        }
                        this.applyThemeSettings(themeData);
                    }
                }
            } catch (e) {}

            // 5. Duyurular
            try { await this.pullAnnouncementsFromFirebase(); } catch (e) {}

            // 6. Mesajlar
            try { await this.pullMessagesFromFirebase(); } catch (e) {}

            // 7. Özel Modüller (Menü yapısı ve sol/sağ dağılımı)
            try {
                const modulesRes = await this.fetchFirebase('/custom_modules.json');
                if (modulesRes && modulesRes.ok) {
                    const modulesData = await modulesRes.json();
                    if (modulesData && Array.isArray(modulesData) && modulesData.length > 0) {
                        localStorage.setItem(STORAGE_KEYS.CUSTOM_MODULES, JSON.stringify(modulesData));
                    }
                }
            } catch (e) {}

            return { success: true, count, hasChanges };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    /**
     * Tüm yerel verileri bulutla birleştirir ve Firebase'e aktarır (Buluta Aktar)
     */
    async pushAllToFirebase() {
        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return { success: false, message: 'Firebase aktif değil.' };

        try {
            // Önce buluttan en son verileri çek ve birleştir (Asla diğer bilgisayarların verisini ezme!)
            await this.pullFromFirebase();

            const cleanUsers = this.deduplicateUserList(this.getAllUsers());
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(cleanUsers));

            // Kursiyerleri anahtarlı nesne olarak aktar
            const userMap = {};
            cleanUsers.forEach(u => { if (u && u.id) userMap[u.id] = u; });
            await this.fetchFirebase('/kursiyerler.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userMap)
            });

            // Sınıflar
            const classMap = {};
            this.getAllClasses().forEach(c => { if (c && c.id) classMap[c.id] = c; });
            await this.fetchFirebase('/classes.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(classMap)
            });

            // Duyurular
            const annMap = {};
            this.getAllAnnouncements().forEach(a => { if (a && a.id) annMap[a.id] = a; });
            await this.fetchFirebase('/announcements.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(annMap)
            });

            // Mesajlar
            const msgMap = {};
            this.getAllMessages().forEach(m => { if (m && m.id) msgMap[m.id] = m; });
            await this.fetchFirebase('/messages.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msgMap)
            });

            // Özel Modüller
            const customMods = this.getCustomModules() || (typeof COURSE_MODULES !== 'undefined' ? COURSE_MODULES : null);
            if (customMods && customMods.length > 0) {
                await this.fetchFirebase('/custom_modules.json', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(customMods)
                });
            }

            // Tema ve Tasarım
            const themeSets = this.getThemeSettings();
            if (themeSets) {
                await this.fetchFirebase('/theme_settings.json', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(themeSets)
                });
            }

            return { success: true, count: cleanUsers.length };
        } catch (err) {
            return { success: false, message: err.message };
        }
    }

    /**
     * Firebase Realtime SSE ve Periyodik Senkronizasyon Başlatıcı
     */
    startRealtimeSync(onUpdateCallback) {
        if (typeof window === 'undefined') return;
        if (this._realtimeInitialized) return;
        this._realtimeInitialized = true;

        const cfg = this.getFirebaseConfig();
        if (!cfg || !cfg.enabled || !cfg.databaseURL) return;

        // 1. Firebase Server-Sent Events (SSE) Dinleyicisi
        try {
            const baseUrl = cfg.databaseURL.replace(/\/$/, '');
            const authParam = cfg.apiKey ? `?auth=${encodeURIComponent(cfg.apiKey)}` : '';
            const sseUrl = `${baseUrl}/kursiyerler.json${authParam}`;

            if (typeof EventSource !== 'undefined') {
                const es = new EventSource(sseUrl);
                this._eventSource = es;

                es.addEventListener('put', (e) => {
                    try {
                        const payload = JSON.parse(e.data);
                        if (!payload) return;
                        
                        if (payload.path === '/') {
                            // Kök düğüm güncellendi (tam liste)
                            if (payload.data) {
                                const raw = payload.data;
                                const incoming = Array.isArray(raw) ? raw.filter(Boolean) : (raw && typeof raw === 'object' ? Object.values(raw).filter(Boolean) : []);
                                if (incoming.length > 0) {
                                    this.pullFromFirebase().then(res => {
                                        if (res && res.success) {
                                            if (typeof onUpdateCallback === 'function') onUpdateCallback();
                                            window.dispatchEvent(new CustomEvent('ehem:data-synced', { detail: { source: 'sse-root', count: res.count } }));
                                        }
                                    });
                                }
                            }
                        } else {
                            // Alt düğüm güncellendi (/usr_123 veya /usr_123/completedModuleIds)
                            const match = (payload.path || '').match(/^\/([^\/]+)/);
                            if (match && match[1]) {
                                const targetId = match[1];
                                if (payload.data === null) {
                                    // Silindi
                                    let users = this.getAllUsers();
                                    const next = users.filter(u => u.id !== targetId);
                                    if (next.length !== users.length) {
                                        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(next));
                                    }
                                } else if (payload.path === `/${targetId}` && typeof payload.data === 'object') {
                                    // Tekil kullanıcı doğrudan güncellendi
                                    const users = this.getAllUsers();
                                    const idx = users.findIndex(u => u.id === targetId);
                                    if (idx >= 0) {
                                        users[idx] = this.mergeUserProgress(users[idx], payload.data);
                                    } else {
                                        users.push(this.normalizeUserProgress(payload.data));
                                    }
                                    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.deduplicateUserList(users)));
                                } else {
                                    // Alt alan (örn: completedModuleIds veya lastActive)
                                    this.pullFromFirebase();
                                }
                                if (typeof onUpdateCallback === 'function') onUpdateCallback();
                                window.dispatchEvent(new CustomEvent('ehem:data-synced', { detail: { source: 'sse-user', targetId } }));
                            }
                        }
                    } catch (err) {}
                });

                es.addEventListener('patch', (e) => {
                    try {
                        const payload = JSON.parse(e.data);
                        if (payload && payload.data) {
                            this.pullFromFirebase().then(res => {
                                if (res && res.success) {
                                    if (typeof onUpdateCallback === 'function') onUpdateCallback();
                                    window.dispatchEvent(new CustomEvent('ehem:data-synced', { detail: { source: 'sse-patch' } }));
                                }
                            });
                        }
                    } catch (err) {}
                });

                es.onerror = () => {
                    // EventSource bağlantıyı otomatik tekrar dener; bu sırada 5sn aralıklı yoklama devrede
                };
            }
        } catch (e) {
            console.warn('[SSE] EventSource başlatılamadı, yoklama modu devrede:', e);
        }

        // 2. Her 5 saniyede bir güvenli, önbelleksiz periyodik yoklama (Fallback Polling)
        if (!this._pollingInterval) {
            this._pollingInterval = setInterval(async () => {
                if (typeof document !== 'undefined') {
                    const active = document.activeElement;
                    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') && active.type !== 'button') {
                        return; // Kullanıcı yazı yazarken kesmeyelim
                    }
                    if (document.querySelector('.modal.show')) return;
                }
                const res = await this.pullFromFirebase();
                if (res && res.success && res.hasChanges) {
                    if (typeof onUpdateCallback === 'function') onUpdateCallback();
                    window.dispatchEvent(new CustomEvent('ehem:data-synced', { detail: { source: 'poll', count: res.count } }));
                }
            }, 5000);
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
