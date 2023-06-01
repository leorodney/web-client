import { Prompt } from "./prompt";

export interface AuthUser {
    isAuthenticated: boolean = false;
    name: string = "";
    email: string = "";
    username: string = "";
    uid: string = "";
    profilePicture: string = "";
    joined?: string = new Date().toDateString();
}

export interface UserPrompts {
    prompts: Prompt[],
    totalDownloads: number = 0;
    totalLikes: number = 0;
}

export interface UserProfile {
    updateable: boolean = false;
    user: AuthUser;
    prompts: UserPrompts;
}
