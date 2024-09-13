export interface User {
    username: string; 
    email: string;
    role: string; 
    password: string;
}

export interface LoggedUser {
    token: string;
    user: User;
}