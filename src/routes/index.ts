import { Router } from 'express';

export default class AdminRoute {
  public path = '/admin';
  public router = Router();
  public middlewares = [];

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', (req, res) => {
      res.json({ message: 'Welcome to panel' });
    });

    this.router.get('/about', (req, res) => {
      res.json({ message: 'About Panel' });
    });
  }
}
