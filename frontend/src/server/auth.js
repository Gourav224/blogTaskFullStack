import axios from "axios";

class AuthService {
    constructor() {
        this.accessToken = localStorage.getItem("accessToken") || null;

        // Set up Axios interceptor to attach Authorization headers automatically
        axios.interceptors.request.use(
            (config) => {
                const token = this.accessToken || localStorage.getItem("accessToken");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Set the base URL from environment variables
        axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    }

    async createAccount({ email, password, fullName }) {
        try {
            const response = await axios.post("/api/v1/users/register", { email, password, fullName });
            if (response.status >= 200 && response.status < 300) {
                return await this.login({ email, password });
            }
            return response;
        } catch (error) {
            console.error("Error during user registration:", error.message);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const response = await axios.post("/api/v1/users/login", { email, password });
            if (response.status >= 200 && response.status < 300) {
                const { accessToken, refreshToken } = response.data;
                this.accessToken = accessToken;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                return response.data;
            }
            throw new Error("Login failed");
        } catch (error) {
            console.error("Error during login:", error.message);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const response = await axios.get("/api/v1/users/get-current-user", { withCredentials: true });
            if (response.status >= 200 && response.status < 300) {
                return response.data.user;
            } else {
                console.error("Server error:", response.statusText);
                return null;
            }
        } catch (error) {
            console.error("Error fetching current user:", error.message);
            return null;
        }
    }

    async logout() {
        try {
            await axios.post("/api/v1/users/logout", {}, { withCredentials: true });
            this.accessToken = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        } catch (error) {
            console.error("Error during logout:", error.message);
            throw error;
        }
    }
}

export default new AuthService();
