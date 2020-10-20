import {IMessage} from "./message";

export interface IThread {
    id?: string;
    name: string;
    desc: string;
    timestamp: number;
    owner: string;
}

export const constructThread = (id: string, doc: any) => {
    const th: IThread = {
        id,
        name: doc.name,
        desc: doc.desc,
        timestamp: doc.timestamp,
        owner: doc.owner
    };
    return th;
};


