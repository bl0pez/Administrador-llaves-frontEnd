export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    uid: string | null;
    role: string | null;
    name: string | null;
    email: string | null;
    errorMsj: string | null;
}
