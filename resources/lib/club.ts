import { JSDOM } from 'jsdom';
import fs from 'fs';
import type { DataController } from './interface.js';


type Club = {
    name: string;
    logo: string;
    prefecture: string;
    conference: string;
}

export default class ClubController implements DataController<Club[]> {
    private request;

    constructor(request: Function) {
        this.request = request;
    }

    parseFromHtml(html: string): Club[] {
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
    
    saveToFile(data: Club[]): void {
        fs.writeFileSync('./data/club.json', JSON.stringify(data, null, 2));
    }
    
    async fetch(): Promise<Club[]> {
        const clubTear1Response = await this.request('https://www.bleague.jp/club/?tab=1', { id: 'clus.tear1' });
        const clubTear2Response = await this.request('https://www.bleague.jp/club/?tab=2', { id: 'clus.tear2' });

        const allClubList = [];
        
        if (clubTear1Response.status === 'ok') {
            const clubTear1List = this.parseFromHtml(clubTear1Response.html);
            allClubList.push(...clubTear1List);
        }

        if (clubTear2Response.status === 'ok') {
            const clubTear2List = this.parseFromHtml(clubTear2Response.html);
            allClubList.push(...clubTear2List);
        }
        
        return allClubList;
    }
}