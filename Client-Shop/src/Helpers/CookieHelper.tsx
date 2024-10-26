
export const setCookie = (name: string, value: string, days?: number) => {
    let cookieString = `${name}=${value}; path=/; secure; samesite=strict;`;
    if (days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        cookieString += `expires=${expires};`;
    }
    document.cookie = cookieString;
};

export const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};