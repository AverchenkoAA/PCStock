import * as express from "express";
import Computer from "./computers.interface";

class ComputersController{
    public path = "/comp";
    public router = express.Router();

    private pc: Computer[] = [{
        serialNumber: 12345678,
        model: "Leysan",
        cpu: "Intel",
        ram: 8,
        hdd: 1000,
        ssd: 240,
        title: "Test computer.",
    }];

    constructor(){
        this.initRoutes();
    }

    public initRoutes(){
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createPost);
    }

    getAllPosts = (req: express.Request, res: express.Response) => {
        res.send(this.pc);
    }

    createPost = (req: express.Request, res: express.Response) => {
        const comp: Computer = req.body;
        this.pc.push(comp);
        res.send(comp);
    }
}

export default ComputersController;