import { JSDOM } from 'jsdom';
import fs from 'fs';


type Club = {
    name: string;
    logo: string;
    prefecture: string;
    conference: string;
}

export function parseClubFromHtml(html: string): Club[] {
    const dom = new JSDOM(html);
    const conferenceSectionList = dom.window.document.querySelectorAll('.section-block');

    const clubList: Club[] = [];
    
    conferenceSectionList.forEach(conferenceSection => {
        const conference = conferenceSection.querySelector('.section-head')?.id ?? 'unknown';

        conferenceSection.querySelectorAll('div.section-content > ul.grid-row > li.grid-col > div.club-box')
            .forEach((club) => {
                const logo = club.querySelector('div > img')?.getAttribute('src') ?? 'unknown';
                const name = club.querySelector('div > div.club-box-name > div.club-box-team')?.textContent ?? 'unknown';
                const prefecture = club.querySelector('div > div.club-box-name > div.club-box-prefecture')?.textContent ?? 'unknown';
                clubList.push({ logo, name, prefecture, conference });
            });
    });
    
    return clubList;
}

export function saveClubToFile(clubList: Club[]): void {
    fs.writeFileSync('./data/club.json', JSON.stringify(clubList, null, 2));
}

export async function fetchClubList(request: Function): Promise<Club[]> {
    const clubTear1Response = await request('https://www.bleague.jp/club/?tab=1', { id: 'clus.tear1' });
    const clubTear2Response = await request('https://www.bleague.jp/club/?tab=2', { id: 'clus.tear2' });

    const allClubList = [];
    
    if (clubTear1Response.status === 'ok') {
        const clubTear1List = parseClubFromHtml(clubTear1Response.html);
        allClubList.push(...clubTear1List);
    }

    if (clubTear2Response.status === 'ok') {
        const clubTear2List = parseClubFromHtml(clubTear2Response.html);
        allClubList.push(...clubTear2List);
    }
    
    return allClubList;
}
