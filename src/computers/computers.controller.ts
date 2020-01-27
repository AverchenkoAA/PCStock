import * as express from "express";
import Computer from "./computers.interface";
import DB from "../firebase";

class ComputersController{
    public path = "/comp";
    public router = express.Router();
    private db: DB;
    private collectionName = "computers";

    private pc: Computer[] = [{
        serialNumber: 12345678,
        model: "Leysan",
        cpu: "Intel",
        ram: 8,
        hdd: 1000,
        ssd: 240,
        title: "Test computer.",
    }];

    constructor(firebase: DB){
        this.db = firebase;
        this.initRoutes();
    }

    public initRoutes(){
        this.router.get(this.path, this.getAllComputers);
        this.router.get(this.path +"/:id", this.getOneComputer);
        this.router.post(this.path, this.createComputer);
        this.router.put(this.path +"/:id", this.updateComputer);
        this.router.delete(this.path +"/:id", this.deleteComputer);
    }

    getAllComputers = async (req: express.Request, res: express.Response) => {
        let snapshot = await this.db.getAll(this.collectionName);
        let docs: any[] = [];
        snapshot.forEach((doc) => {
            docs.push(doc.data());
         });
        res.send(docs);
    }

    getOneComputer = async (req: express.Request, res: express.Response) => {
             let doc = await this.db.getOne(this.collectionName, req.params.id);
             if (!doc.exists) {
                console.log('No such document!');
                res.send('No such document!');
            } else {
                res.send(doc.data());
            }
    }

    createComputer = async (req: express.Request, res: express.Response) => {
        const pc: Computer = req.body;
        let ref = await this.db.addOne(this.collectionName, pc);
        res.send('Added document with ID: '+ ref.id);
    }

    updateComputer = async (req: express.Request, res: express.Response) => {
        const pc: Computer = req.body;
        let ref = await this.db.updateOne(this.collectionName, req.params.id, pc);
        res.send('Updated: '+ pc.serialNumber);
    }

    deleteComputer = async (req: express.Request, res: express.Response) => {
        const pc: Computer = req.body;
        let ref = await this.db.deleteOne(this.collectionName, req.params.id);
        res.send('Delete document with ID: '+ req.params.id);
    }
}

export default ComputersController;