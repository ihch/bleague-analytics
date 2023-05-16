export interface DataController<T> {
    parseFromHtml(html: string): T;
    saveToFile(data: T): void;
    fetch(): Promise<T>;
}
