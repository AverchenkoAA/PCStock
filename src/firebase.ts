import * as admin from "firebase-admin";
import * as express from "express";

class FireBase{

    public db: any;

    constructor(credentialPath: string){
        this.initAccount(credentialPath);
        this.initDB();
    }

    private initAccount(credentialPath: string){
        const serviceAccount = require(credentialPath);
        admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
        });
    }

    private initDB(){
       this.db = admin.firestore();
    }

    public getAll(collection: string){
      return this.db.collection(collection).get();
    }

    public getOne(collection: string, document: string){
       let cityRef = this.db.collection(collection).doc(document);
        return cityRef.get();
    }

    public getOneByEmail(collection: string, email: string){
        let cityRef = this.db.collection(collection).where('email', '==', email);
         return cityRef.get();
     }

    public addOne(collection: string, input: any){
        return this.db.collection(collection).add(input);
    }

    public updateOne(collection: string, document: string, input: any){
        return this.db.collection(collection).doc(document).update(input);
    }

    public deleteOne(collection: string, document: string){
        return this.db.collection(collection).doc(document).delete();
    }
}
export default FireBase;
