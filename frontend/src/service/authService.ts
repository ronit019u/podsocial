import api from "../api/axios";
import type { Login, Register, User } from "@/types";

export const register = async(data: Register) => {
    const res = await api.post("/auth/register", data)
    return res.data;
}

export const getMe = async(): Promise<User> => {
    const res = await api.get("/auth/me");
    return res.data;
}

export const login = async(data: Login) => {
    const res = await api.post("/auth/login", data);
    return res.data;
}

export const logout = async() => {
    const res = await api.post("/auth/logout");
    return res.data;
}