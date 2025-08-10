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
        ONE: (perkaraId) => `/perkara/${perkaraId}`,
        DELETE: (perkaraId) => `/perkara/${perkaraId}/delete`,
        RIWAYAT: (perkaraId) => `/perkara/${perkaraId}/riwayat`,
    },
    JURUSITA: {
        ALL: "/jurusita",
        ONE: (jurusitaId) => `/jurusita/${jurusitaId}`,
        DELETE: (jurusitaId) => `/jurusita/${jurusitaId}/delete`,
    },
    IMAGE: {
        UPLOAD: "/upload-image",
    }
}