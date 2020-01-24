import App from "./app";
import PostController from "./posts/posts.controller";
import ComputersController from "./computers/computers.controller";

const app = new App([
    new PostController(),
    new ComputersController()],
    5000
    );

app.listen();
