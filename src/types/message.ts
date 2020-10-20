import {IServerTS} from "../firebase";

export interface IMessage {
    id?: string;
    body: string;
    timestamp: IServerTS;
    from: String;
    fromId?: string;
    fromPhoto?: string;
};

export const constructMessage = (id: string, obj: any) => {
    const ms: IMessage = {
        body: obj.body,
        timestamp: obj.timestamp,
        from: obj.from,
        fromId: obj.fromId,
        fromPhoto: obj.fromPhoto||""
    };
    if(id) {
        ms.id=id;
    }
    return ms;
};