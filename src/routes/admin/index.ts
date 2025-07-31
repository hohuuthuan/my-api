import { Router } from 'express';
import { Route } from '../../app';

import AdminRequest from '@request/admin/admin';

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
    router.post('/', AdminRequest.Create, AdminController.Create);
    router.get('/', AdminController.List);
    router.get('/:id', AdminRequest.Detail, AdminController.Detail);
    router.put('/:id', AdminRequest.Update, AdminController.Update);
    router.put('/:id/lock', AdminRequest.Lock, AdminController.Lock);
    router.delete('/:id', AdminRequest.Delete, AdminController.Delete);
    return router;
  }
}
