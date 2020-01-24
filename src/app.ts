import * as express from "express";
import * as bodyParser from 'body-parser';

class App{
  public app: express.Application;
  public port:number;

  constructor(controllers, port){
    this.app = express();
    this.port = port;

    this.initMiddlewares();
    this.initControllers(controllers);
  }

  private initMiddlewares(){
    this.app.use(bodyParser.json());
  }

  private initControllers(controllers){
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen(){
    this.app.listen(this.port, () => {
      console.log("Serve on port "+ this.port);
    });
  }

}

export default App;