import express, { Router, NextFunction, Response, Request } from 'express';
import cors from 'cors';
import ErrorHandle from '@middlewares/error-handle';
import AdminRouter from "@routes/index";

export interface Route {
  path: string;
  router: Router;
  middlewares: Function[];
}

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public cors: string;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.cors = process.env.CORS || '';
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({
      extended: true
    }));
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.locals.ip = req.headers['cf-connecting-ip'] || req.ip;
      next();
    });
    this.app.use(cors({
      origin: this.cors.split('|'),
      optionsSuccessStatus: 200
    }));
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route: Route) => {
      this.app.use(route.path, route.middlewares as express.NextFunction[], route.router);
    });

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      return next({
        code: 11,
        mess: 'Page not found'
      });
    });
    this.app.use(ErrorHandle);
  }
}

const app = new App([
  new AdminRouter()
]);

app.listen();
