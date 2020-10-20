import * as timeago from "timeago.js";
import { IServerTS } from "./firebase";

export const formatTimeAgo = (dt: Date|IServerTS) => {
    let dt1 = dt as any;
    if(dt1?.toDate) {
        dt1 = dt1.toDate();
    }
    return dt1 ? timeago.format(new Date( dt1 )) : "now";
};



