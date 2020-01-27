import * as bcrpt from "bcrypt";
import * as express from "express";
import User from "../users/users.interface";
import DB from "../firebase";


class AuthentificationController{
    public path = "/auth";
    public router = express.Router();
    private db: DB;

    private collectionName = "users";

    constructor(firebase: DB){
        this.db = firebase;
        this.initRoutes();
    }

    public initRoutes(){
        this.router.post(this.path + "/register", this.rigistration);
        this.router.post(this.path + "/login", this.login);
    }

    private rigistration=async (req: express.Request, res: express.Response)=>{
        const user: User = req.body;
        const hashedPassword = await bcrpt.hash(user.password, 10);
        user.password= hashedPassword;
        this.db.addOne(this.collectionName, user);
        res.send(user.password);
    }

    private login=async (req: express.Request, res: express.Response)=>{
        const user: User = req.body;

        let userFromDB: User;
        let snapshot = await this.db.getOneByEmail(this.collectionName, user.email);
        if (!snapshot.exists){
            res.send("There is no such email!");
        }else{
        snapshot.forEach((doc) => {
            userFromDB = doc.data();
        });

        const doPasswordsMatch = await bcrpt.compare(user.password, userFromDB.password);
        if (doPasswordsMatch) {
            res.send("Welcome, " + userFromDB.firstName + "!");
        }else{
            res.send("Login failed");
        }
    }
   

    /*     const hashedPassword = await bcrpt.hash(user.password, 10);
        const doPasswordsMatch = await bcrpt.compare(user.password, hashedPassword);
        user.password= hashedPassword;
        this.db.addOne(this.collectionName, user);
        res.send(user.password); */
    }
}

export default AuthentificationController;
/* async function first(){
    const passwordInPlainText = '12345678';
    const hashedPassword = await bcrpt.hash(passwordInPlainText, 10);
    console.log(hashedPassword);
    const doPasswordsMatch = await bcrpt.compare(passwordInPlainText, hashedPassword);
    console.log(doPasswordsMatch); // true
}
first(); */