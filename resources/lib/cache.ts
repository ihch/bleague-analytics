import fs from 'fs';


export default class MCache {
    private cacheMap = new Map<string, string>();
    private cachePath;
    
    constructor(cachePath: string) {
        this.cachePath = cachePath;

        let cacheFile;
        try {
            cacheFile = fs.readFileSync(this.cachePath, 'utf-8');
        } catch (e) {
            console.error(e);
        }

        if (!cacheFile) {
            return;
        }

        const json: { [id: string]: string} = JSON.parse(cacheFile || '{}')
        Object.entries(json).forEach(([id, value]) => {
            this.cacheMap.set(id, value);
        });
    }
    

    cache(id: string, data: string): void {
        this.cacheMap.set(id, data);
    }

    existsCache(id: string): boolean {
        return this.cacheMap.has(id);
    }
    
    getCache(id: string): string | undefined {
        return this.cacheMap.get(id);
    }
    
    toJSON(): string {
        return JSON.stringify(Object.fromEntries(this.cacheMap));
    }
    
    saveCache(): void {
        fs.writeFileSync(this.cachePath, this.toJSON());
    }
}
