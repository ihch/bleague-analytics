import MCache from "./cache.js";

export default function createRequest(cache?: MCache) {
    return async function request(url: string, options?: { id?: string }): Promise<{ status: 'ok', html: string} | { status: 'ng' }> {
        let html: string;

        // cache check
        if (options?.id && cache && cache.existsCache(options.id)) {
            console.log('using cache', options.id);
            html = cache.getCache(options.id)!;
        }
        else {
            const response = await fetch(url);
            html = await response.text();
        }

        if (!html) {
            return { status: 'ng' }
        }

        // response cache
        if (options?.id && cache) {
            cache.cache(options.id, html);
        }
        
        return { status: 'ok', html: html }
    }
}