import { PrismaClient } from "@prisma/client";
import zod from 'zod';
import { TeamCreateInputSchema } from "./generated/zod";

const prisma = new PrismaClient();

type TeamCreateInput = zod.infer<typeof TeamCreateInputSchema>;

const TEAMS: TeamCreateInput[] = [
    { name: 'レバンガ北海道', prefecture: '北海道', conference: 'east' },
    { name: '仙台89ERS', prefecture: '宮城県', conference: 'east' },
    { name: '秋田ノーザンハピネッツ', prefecture: '秋田県', conference: 'east' },
    { name: '茨城ロボッツ', prefecture: '茨城県', conference: 'east' },
    { name: '宇都宮ブレックス', prefecture: '栃木県', conference: 'east' },
    { name: '群馬クレインサンダース', prefecture: '群馬県', conference: 'east' },
    { name: '千葉ジェッツ', prefecture: '千葉県', conference: 'east' },
    { name: 'アルバルク東京', prefecture: '東京都', conference: 'east' },
    { name: 'サンロッカーズ渋谷', prefecture: '東京都', conference: 'center' },
    { name: '川崎ブレイブサンダース', prefecture: '神奈川県', conference: 'center' },
    { name: '横浜ビー・コルセアーズ', prefecture: '神奈川県', conference: 'center' },
    { name: '新潟アルビレックスBB', prefecture: '新潟県', conference: 'center' },
    { name: '富山グラウジーズ', prefecture: '富山県', conference: 'center' },
    { name: '信州ブレイブウォリアーズ', prefecture: '長野県', conference: 'center' },
    { name: '三遠ネオフェニックス', prefecture: '愛知県', conference: 'center' },
    { name: 'シーホース三河', prefecture: '愛知県', conference: 'center' },
    { name: 'ファイティングイーグルス名古屋', prefecture: '愛知県', conference: 'west' },
    { name: '名古屋ダイヤモンドドルフィンズ', prefecture: '愛知県', conference: 'west' },
    { name: '滋賀レイクス', prefecture: '滋賀県', conference: 'west' },
    { name: '京都ハンナリーズ', prefecture: '京都府', conference: 'west' },
    { name: '大阪エヴェッサ', prefecture: '大阪府', conference: 'west' },
    { name: '島根スサノオマジック', prefecture: '島根県', conference: 'west' },
    { name: '広島ドラゴンフライズ', prefecture: '広島県', conference: 'west' },
    { name: '琉球ゴールデンキングス', prefecture: '沖縄県', conference: 'west' },
];

const main = async () => {
    for (const team of TEAMS) {
        await prisma.team.create({ data: team });
    }
}

main().finally(() => {
    prisma.$disconnect();
})