export interface AuthUser {
    isAuthenticated: boolean = false;
    email: string = "";
    username: string = "";
    uid: string = "";
    profilePicture: string = "";
    joined?: Date = new Date();
}

export interface UserProfile{
    updateable: boolean = false;
    user: AuthUser;
    
}
