// plik: pages/api/stream.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = '"Expand your coding capabilities, embrace new challenges, and become a master of innovation."';
   
    const getRandomChatGPTSpeach = (): string => {
        let speaches = [
            '"Expand your coding capabilities, embrace new challenges, and become a master of innovation."',
            '"Level up your skills, unlock new opportunities, and stay ahead in the ever-evolving world of programming."'
        ];
        return speaches[0];
    }

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    let speach = getRandomChatGPTSpeach();
    for (let i = 0; i < speach.length; i++) {
        await new Promise((resolve) => {
            setTimeout(() => {
                res.write(speach[i]);
                resolve(null);
            }, Math.random() * 50);
        });
    }

    res.end();
}