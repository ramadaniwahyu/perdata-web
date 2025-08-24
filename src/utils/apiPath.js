export const BASE_URL =  "http://localhost:8030/api";

export const API_PATHS ={
    AUTH: {
        REGISTER: "/register",
        LOGIN: "/login",
        LOGOUT: "/logout",
        PROFILE: "/profile",
        REFRESH_TOKEN: "/refresh_token"
    },
    USERS: {
        ALL: "/users",
        ONE: (userId) => `/users/${userId}`,
        ACTIVATE: (userId) => `/users/${userId}/activate`,
        DELETE: (userId) => `/users/${userId}/delete`,
    },
    PERKARA: {
        ALL: "/perkara",
        NOMOR: "/perkara/nomor",
        ONE: (perkaraId) => `/perkara/${perkaraId}`,
        DELETE: (perkaraId) => `/perkara/${perkaraId}/delete`,
        RIWAYAT: (perkaraId) => `/perkara/${perkaraId}/riwayat`,
    },
    JURUSITA: {
        GET: "/jurusita-all",
        ALL: "/jurusita",
        ONE: (jurusitaId) => `/jurusita/${jurusitaId}`,
        DELETE: (jurusitaId) => `/jurusita/${jurusitaId}/delete`,
    },
    RELAAS: {
        ALL: "/panggilan",
        ONE: (panggilanId) => `/panggilan/${panggilanId}`,
        DELETE: (panggilanId) => `/panggilan/${panggilanId}/delete`,
    },
    JENIS_PANGGILAN: {
        ALL: "/jenis-panggilan",
        ONE: (panggilanId) => `/jenis-panggilan/${panggilanId}`,
        DELETE: (panggilanId) => `/jenis-panggilan/${panggilanId}/delete`,
    },
    IMAGE: {
        UPLOAD: "/upload-image",
    },
    UPLOAD: {
        FILE: "/upload-file"
    }
}