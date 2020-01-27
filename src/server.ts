import App from "./app";
import DB from "./firebase";
import PostController from "./posts/posts.controller";
import ComputersController from "./computers/computers.controller";
import UsersController from "./users/users.controller";
import "dotenv/config";

const {PORT} = process.env;
const {GOOGLE_APPLICATION_CREDENTIALS} = process.env;

const db = new DB(GOOGLE_APPLICATION_CREDENTIALS);


const app = new App([
    new PostController(),
    new UsersController(db),
    new ComputersController(db)],
    PORT
    );

app.listen();
