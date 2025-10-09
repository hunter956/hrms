import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import CryptoJS from "crypto-js";

const API_BASE_URL = import.meta.env.VITE_USER_SERVICE_URL || "";
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY || ""; 

// In-memory token cache to avoid localStorage timing issues
let cachedToken: string | null = null;

function getDecryptedToken(): string | null {
  // First check in-memory cache
  if (cachedToken) {
    return cachedToken;
  }

  // Then check localStorage
  const encrypted = localStorage.getItem("authToken");
  if (!encrypted) {
    console.warn("No encrypted token found in localStorage");
    return null;
  }
  
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const token = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!token) {
      console.warn("Token decryption resulted in empty string");
      return null;
    }
    
    // Cache the token in memory
    cachedToken = token;
    return token;
  } catch (err) {
    console.error("Token decrypt error:", err);
    return null;
  }
}

// Function to set token (call this after login)
export function setAuthToken(token: string): void {
  try {
    // Store in memory first
    cachedToken = token;
    
    // Then encrypt and store in localStorage
    const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    localStorage.setItem("authToken", encryptedToken);
    
    console.log("Token stored successfully");
  } catch (err) {
    console.error("Error storing token:", err);
  }
}

// Function to clear token (call this on logout)
export function clearAuthToken(): void {
  cachedToken = null;
  localStorage.removeItem("authToken");
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Endpoints to skip attaching token 
const SKIP_AUTH_URLS = ["api/auth/signin", "api/auth/signup"];

let isRefreshing = false;
let failedQueue: {
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (error?: any) => void;
  config: InternalAxiosRequestConfig;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      resolve(api(config));
    }
  });
  
  failedQueue = [];
};

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Check if this endpoint should skip authentication
    const shouldSkip = SKIP_AUTH_URLS.some((u) => config.url?.includes(u));
    
    if (shouldSkip) {
      console.log(`[API] Skipping auth for: ${config.url}`);
      return config;
    }

    // Get the decrypted token
    const token = getDecryptedToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`[API] Authorization header set for: ${config.url}`);
    } else {
      console.warn(`[API] No token available for request: ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error("[API] Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;

    // Handle 401 errors (except for skip URLs)
    if (status === 401 && !SKIP_AUTH_URLS.some((u) => originalRequest.url?.includes(u))) {
      console.log("[API] Received 401, attempting token refresh");
      
      // Prevent infinite retry loops
      if (originalRequest._retry) {
        console.error("[API] Refresh already attempted, clearing token and redirecting");
        clearAuthToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        console.log("[API] Token refresh in progress, queuing request");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("[API] Calling refresh token endpoint");
        const refreshResp = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const newToken = refreshResp.data?.token;
        
        if (newToken) {
          console.log("[API] Refresh successful, storing new token");
          
          // Use the setAuthToken function to store properly
          setAuthToken(newToken);
          
          // Process queued requests
          processQueue(null, newToken);
          
          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          throw new Error("Refresh failed: no token returned");
        }
      } catch (refreshError) {
        console.error("[API] Token refresh failed:", refreshError);
        processQueue(refreshError, null);
        clearAuthToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
