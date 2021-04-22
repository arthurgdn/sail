export interface User{
    tag: string;
    username: string;
    token: string;
}

export interface AuthData {
    isAuthenticated : boolean;
    user: User | null;
  }