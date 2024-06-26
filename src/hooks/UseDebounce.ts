export default function debounce<T>(fn: T, wait: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (event: Event | any) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if (typeof fn === "function") {
                fn(event);
            }
        }, wait);
    };
}
