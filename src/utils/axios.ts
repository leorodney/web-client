import axios from "axios";

// creating a new axios instance with default configs
export const server = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_SERVER_PORT}`,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true,
});

export const endpoints = {
    auth: "/",
    login: "/login",
    register: "/register",
    logout: "/logout",
    promptify: "/promptify",
    production: "/production",
    prompts: "/prompts",
    newPrompt: "/prompts/new",
    promptlikes: "/prompt/likes",
    promptdownloads: "/prompt/downloads",
    userPrompts: (uid: string) => "/prompts/mine/" + uid,
};