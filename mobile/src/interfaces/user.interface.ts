export interface User{
    _id: number;
    tag: string;
    username: string;
}

export interface AuthData {
    isAuthenticated : boolean;
    user: User | null;
  }