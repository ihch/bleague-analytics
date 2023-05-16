import MCache from './lib/cache.js';
import ClubController from './lib/club.js';
import createRequest from './lib/request.js';


async function main(): Promise<void> {
    const cache = new MCache('./cache/cache.json');
    const request = createRequest(cache);

    const clubController = new ClubController(request);
    const clubList = await clubController.fetch();
    clubController.saveToFile(clubList);

    cache.saveCache();
}

main();
