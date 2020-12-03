export class LocalStorage {
    
    static testSessionStorage(key: string) {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            return sessionStorage.getItem(key);
        }
    }
    
    static getItem(key: string) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return localStorage.getItem(key);
        }
    }
    
    static setItem(key: string, value: string) {
        return localStorage.setItem(key, JSON.stringify(value));
    }

    static removeItem(key: string) {
        return localStorage.removeItem(key);
    }
}
