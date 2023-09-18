export const asyncLocalStorage = {
    async setItem(key: string, value: string) {
        await null;
        return localStorage.setItem(key, value);
    },
    async getItem(key: string) {
        await null;
        return localStorage.getItem(key);
    },
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const month =
        date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();

    return `${day}.${month}.${year}.`;
};
