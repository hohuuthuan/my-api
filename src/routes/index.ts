import { Router } from 'express';
import { Route } from '../app';

import AdminController from '@controller/admin/admin';

export default class AdminRoute implements Route {
  public path = '/admin';
  public router = Router();
  public middlewares = [];

  constructor() {
    this.router.use('/', this.Admin());
  }

  private Admin() {
    const router = Router();
    router.get('/', AdminController.List);
    return router;
  }
}
