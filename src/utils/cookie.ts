export default class CookieAPI {
    public static setCookie(key: string, value: Object) {
        console.log("存储 Cookie: ", key);
        if (localStorage.getItem(key) == null) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            console.log("本地已存在 Cookie");
        }
    }

    public static updateCookie(key: string, value: Object) {
        console.log("更新 Cookie: ", key);
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static getCookie(key: string) {
        console.log("获取 Cookie: ", key);
        const value: string | null = localStorage.getItem(key);
        if (value === null) {
            return value;
        }
        return JSON.parse(value);
    }
}