const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://my-portfolio-zsvg.vercel.app/api";

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const res = await fetch(`${API_URL}${endpoint}`);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        return res.json();
    },

    post: async <T>(endpoint: string, data: any): Promise<T> => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error("Failed to send data");
        }
        return res.json();
    },

    put: async <T>(endpoint: string, data: any): Promise<T> => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error("Failed to update data");
        }
        return res.json();
    },

    patch: async <T>(endpoint: string, data: any): Promise<T> => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error("Failed to update data");
        }
        return res.json();
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error("Failed to delete data");
        }
        return res.json();
    },
};
