import { Request, Response, NextFunction } from 'express';
import { ICreateBody, IDetailParams, IUpdateParams, IUpdateBody, ILockParams, ILockBody, IDeleteParams } from '@request/admin/admin';
import { MAdmin } from '@model/admin';
import bcryptjs from 'bcryptjs';
import { Op } from 'sequelize';

const Create = async (req: Request<{}, {}, ICreateBody, {}>, res: Response, next: NextFunction) => {
  try {
    const existingUserName = await MAdmin.findOne({
      where: {
        username: req.body.username
      }
    });
    if (existingUserName) {
      next({
        code: 1,
        mess: 'Username already exists'
      });
      return;
    }

    const admin = await MAdmin.create({
      username: req.body.username,
      fullname: req.body.fullname,
      password: await bcryptjs.hashSync(req.body.password)
    });

    next({
      code: 0,
      mess: 'Success',
      data: admin.id
    });

  } catch (e) {
    console.log(e);
    next({
      code: 10,
      mess: "error from server"
    });
  }
}

const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admins = await MAdmin.findAll({
      order: [['username', 'ASC']]
    });

    next({
      code: 0,
      mess: 'Success',
      data: admins
    });
  } catch (e) {
    console.error(e);
    next({
      code: 10,
      mess: 'error from server'
    });
  }
}

const Detail = async (req: Request<IDetailParams, {}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const admin = await MAdmin.findByPk(req.params.id);
    if(!admin){
      next({
        code: 10,
        mess: 'Admin not exists'
      });
      return;
    }

    next({
      code: 0,
      mess: 'Success',
      data: admin
    });
  } catch (e) {
    console.log(e);
    next({
      code: 10,
      mess: 'error from server'
    });
  }
}

const Update = async (req: Request<IUpdateParams, {}, IUpdateBody, {}>, res: Response, next: NextFunction) => {
  try {
    const checkAdmin = await MAdmin.findByPk(req.params.id);
    if (!checkAdmin) {
      next({
        code: 10,
        mess: 'Admin not exists'
      });
      return;
    }

    const checkUsername = await MAdmin.findOne({
      where: {
        username: req.body.username,
        id: {
          [Op.ne]: req.params.id
        }
      }
    });
    if (checkUsername) {
      next({
        code: 1,
        mess: 'Username already exists'
      });
      return;
    }

    const dataUpdate: any = {
      username: req.body.username,
      fullname: req.body.fullname
    }
    if (req.body.password != '') {
      dataUpdate.password = await bcryptjs.hashSync(req.body.password);
    }

    const admin = await MAdmin.update(dataUpdate, {
      where: {
        id: req.params.id
      }
    });

    next({
      code: 0,
      mess: 'Update success'
    });
  } catch (e) {
    console.log(e);
    next({
      code: 10,
      mess: 'error from server'
    });
  }
}

const Lock = async (req: Request<ILockParams, {}, ILockBody, {}>, res: Response, next: NextFunction) => {
  try {
    const checkAdmin = await MAdmin.findByPk(req.params.id);
    if (!checkAdmin) {
      next({
        code: 10,
        mess: 'Admin not exists'
      });
      return;
    }

    await MAdmin.update({
      lock: req.body.status ? {
        status: true,
        at: new Date()
      } : null
    }, {
      where: {
        id: req.params.id
      }
    });

    next({
      code: 0,
      mess: 'Udpate success'
    });

  } catch (e) {
    console.log(e);
    next({
      code: 10,
      mess: 'error from server'
    });
  }
}

const Delete = async (req: Request<IDeleteParams, {}, {}, {}>, res: Response, next: NextFunction) => {
  try {
    const checkAdmin = await MAdmin.findByPk(req.params.id);
    if(!checkAdmin){
      next({
        code: 10,
        mess: 'Admin not exists'
      });
      return;
    }

    await MAdmin.destroy({
      where: {
        id: req.params.id
      }
    });

    next({
      code: 0,
      mess: 'Success'
    });
  } catch (e) {
    console.log(e);
    next({
      code: 10,
      mess: 'error from server'
    });
  }
}

export default {
  Create,
  List,
  Detail,
  Update,
  Lock,
  Delete
};
