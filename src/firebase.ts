import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAh72TpfbQ6XgLXjd_XuC8PJmgaXbrhomM",
    authDomain: "tg-clone-465cd.firebaseapp.com",
    databaseURL: "https://tg-clone-465cd.firebaseio.com",
    projectId: "tg-clone-465cd",
    storageBucket: "tg-clone-465cd.appspot.com",
    messagingSenderId: "812249985612",
    appId: "1:812249985612:web:898120f9f6bc73b0cd3ae9"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
  export const auth = firebase.auth();
  export const provider = new firebase.auth.GoogleAuthProvider();

  type IDoc = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;

  export interface ILoadCollectionOptions<T> {
    collection: string;
    constructFun: (id: string, doc: firebase.firestore.DocumentData) => T;
    callbackFun: (arr: T[]) => void;
    parentCollection?: string;
    parentId?: string;
    orderBy?: string;
    orderByDesc?: boolean;
    limit?: number;
  }

  type ICollection = firebase.firestore.CollectionReference<firebase.firestore.DocumentData> | firebase.firestore.Query<firebase.firestore.DocumentData>;
  export const loadCollection = <T>(options: ILoadCollectionOptions<T>) => {

    let col: ICollection;
    if(options.parentCollection && options.parentId) {       
      col = db.collection(options.parentCollection)
              .doc(`/${options.parentId}`)
              .collection(options.collection);
              
    } else {
      col = db.collection(options.collection);
    }    
    if(options.orderBy) {
      let dir: firebase.firestore.OrderByDirection = "asc";
      if(options.orderByDesc) {
        dir="desc";
      }
      col = col.orderBy(options.orderBy, dir);
    }

    col.onSnapshot( (ss: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      console.log(`snapshot event ${options.collection}`)
      const arr: T[] = [];
      for(let doc of ss.docs) {
        const data = doc.data();
        console.log(`doc=`)
        console.dir(doc)
        console.log(`data=`)
        console.dir(data)
        const obj: T = options.constructFun(doc.id, data);
        arr.push(obj);
        if(options.limit && arr.length>=options.limit) {
          break;
        }
      }      
      options.callbackFun(arr);
    });

  };
  
export const addCollectionItem = async (collection: string, obj: any, parentCollection?: string, parentId?: string) => {
  try {
    let res: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
    const obj1: any = {...obj};
    delete obj1.id;
    if(parentCollection && parentId) {
      console.log(`db.collection(${parentCollection}).doc(${parentId}).collection(${collection}).add()`)
      console.dir(obj1)
      res = await db.collection(parentCollection).doc(`${parentId}`).collection(collection).add(obj1);
    } else {
      res = await db.collection(collection).add(obj1);
    }
  } catch(err) {
    console.error(err);
  }
};

export type IServerTS = firebase.firestore.FieldValue;

export const serverTs = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
}
 