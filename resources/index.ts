import MCache from './lib/cache.js';
import { fetchClubList, saveClubToFile } from './lib/club.js';
import createRequest from './lib/request.js';


async function main(): Promise<void> {
    const cache = new MCache('./cache/cache.json');
    const request = createRequest(cache);

    const allClubList = await fetchClubList(request);
    saveClubToFile(allClubList);

    cache.saveCache();
}

main();
