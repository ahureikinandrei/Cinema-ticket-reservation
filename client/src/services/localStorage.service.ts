import { LocalStorageKey } from '../constants/localStorageKeys';

export default class LocalStorageService {
    static setTokenToLocalStorage(token: string): void {
        if (!token) {
            return;
        }
        localStorage.setItem(LocalStorageKey, token);
    }

    static getTokenFromLocalStorage(): string | null {
        return localStorage.getItem(LocalStorageKey);
    }

    static removeTokenFromLocalStorage(): void {
        localStorage.removeItem(LocalStorageKey);
    }
}
