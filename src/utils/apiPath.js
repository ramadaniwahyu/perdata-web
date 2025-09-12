// export const BASE_URL = "http://27.124.88.70:8010/api";
// export const BASE_URL = import.meta.env.VITE_API_URL;
export const BASE_URL = "http://pnkabkediri.kieraha.my.id/";

export const API_PATHS ={
    AUTH: {
        REGISTER: "api/register",
        LOGIN: "api/login",
        LOGOUT: "api/logout",
        PROFILE: "api/profile",
        REFRESH_TOKEN: "api/refresh_token"
    },
    USERS: {
        ALL: (search) => `api/users${search}`,
        ONE: (userId) => `api/users/${userId}`,
        ACTIVATE: (userId) => `api/users/${userId}/activate`,
        DELETE: (userId) => `api/users/${userId}/delete`,
    },
    PERKARA: {
        ALL: "api/perkara",
        NOMOR: "api/perkara/nomor",
        ONE: (perkaraId) => `api/perkara/${perkaraId}`,
        DELETE: (perkaraId) => `api/perkara/${perkaraId}/delete`,
        RIWAYAT: (perkaraId) => `api/perkara/${perkaraId}/riwayat`,
    },
    JURUSITA: {
        GET: "api/jurusita-all",
        ALL: "api/jurusita",
        ONE: (jurusitaId) => `api/jurusita/${jurusitaId}`,
        DELETE: (jurusitaId) => `api/jurusita/${jurusitaId}/delete`,
    },
    RELAAS: {
        ALL: `api/panggilan`,
        ALL_SEARCH: (search) => `api/panggilan${search}`,
        ONE: (panggilanId) => `api/panggilan/${panggilanId}`,
        DELETE: (panggilanId) => `api/panggilan/${panggilanId}/delete`,
        CANCEL_KIRIM: (panggilanId) => `api/panggilan/${panggilanId}/pengiriman`,
        CANCEL_PELAKSANAAN: (panggilanId) => `api/panggilan/${panggilanId}/pelaksanaan`,
    },
    JENIS_PANGGILAN: {
        ALL: "api/jenis-panggilan",
        ONE: (panggilanId) => `api/jenis-panggilan/${panggilanId}`,
        DELETE: (panggilanId) => `api/jenis-panggilan/${panggilanId}/delete`,
    },
    IMAGE: {
        UPLOAD: "api/upload-image",
    },
    UPLOAD: {
        FILE: "api/upload-file"
    }
}