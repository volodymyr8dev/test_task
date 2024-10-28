import api from "../utils/axiosInstance";

export async function login() {
  try {
    const res = await api.post("/auth", {});
    const { user, accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", user.id);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
export function logout() {
  localStorage.clear();
}
