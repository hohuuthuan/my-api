import { Request, Response, NextFunction } from 'express';

const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    next({
      code: 0,
      mess: 'Success'
    });
  } catch (e) {
    console.error(e);
    next({
      code: 10,
      mess: 'error from server'
    });
  }
}

export default {
  List,
};
