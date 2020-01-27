import * as express from "express";
import User from "./users.interface";
import DB from "../firebase";

class UsersController{
    public path = "/users";
    public router = express.Router();
    private db: DB;
    private collectionName = "users";

    constructor(firebase: DB){
        this.db = firebase;
        this.initRoutes();
    }

    public initRoutes(){
        this.router.get(this.path, this.getAllUsers);
        this.router.get(this.path +"/:id", this.getOneUser);
        this.router.post(this.path, this.createUser);
        this.router.put(this.path +"/:id", this.updateUser);
        this.router.delete(this.path +"/:id", this.deleteUser);
    }

    getAllUsers = async (req: express.Request, res: express.Response) => {
        let snapshot = await this.db.getAll(this.collectionName);
        let docs: any[] = [];
        snapshot.forEach((doc) => {
            docs.push(doc.data());
         });
        res.send(docs);
    }

    getOneUser = async (req: express.Request, res: express.Response) => {
             let doc = await this.db.getOne(this.collectionName, req.params.id);
             if (!doc.exists) {
                console.log('No such document!');
                res.send('No such document!');
            } else {
                res.send(doc.data());
            }
    }

    createUser = async (req: express.Request, res: express.Response) => {
        const usr: User = req.body;
        let ref = await this.db.addOne(this.collectionName, usr);
        res.send('Added document with ID: '+ ref.id);
    }

    updateUser = async (req: express.Request, res: express.Response) => {
        const usr: User = req.body;
        let ref = await this.db.updateOne(this.collectionName, req.params.id, usr);
        res.send('Updated: '+ usr.login);
    }

    deleteUser = async (req: express.Request, res: express.Response) => {
        const usr: User = req.body;
        let ref = await this.db.deleteOne(this.collectionName, req.params.id);
        res.send('Delete document with ID: '+ req.params.id);
    }
}

export default UsersController;