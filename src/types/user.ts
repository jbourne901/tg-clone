import firebase from "firebase";

export interface IUser {
    id: string;
    displayName: string;
    photo: string;
};

export const constructUser = (fbu: firebase.User) => {
   const user: IUser = {
       id: fbu.uid,
       displayName: fbu.displayName||"",
       photo: fbu.photoURL||""
   };
   return user;
};
