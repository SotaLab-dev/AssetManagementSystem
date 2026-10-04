import api from "./axios";

export const apiClient = {
    get:  async <T>(url: string) => {
        const res = await api.get<T>(url);
        return res.data;
    },

    post: async <T>(url: string, body?: any) => {
        const res = await api.post<T>(url, body);
        return res.data;
    },

    put: async <T>(url: string, body?: any) => {
        const res = await api.put<T>(url, body);
        return res.data;
    },

    patch: async <T>(url: string, body?: any) => {
        const res = await api.patch<T>(url, body);
        return res.data;
    },

    delete: async <T>(url: string) => {
        const res = await api.delete<T>(url);
        return res.data;
    },
}