import { NextFunction, Request, Response } from 'express';

export interface HttpResponse {
  code: number;
  mess: string;
  data?: any | any[];
}

export default (error: HttpResponse, req: Request, res: Response, next: NextFunction) => {
  let status: number = 200;
  const code: number = (error.code || 10) > 20 ? 10 : +error.code;
  let message: string = error.mess || 'Something went wrong';
  let data: any | any[] = error.data || {};
  switch (code) {
    case -1:
      status = 400;
      break;
    case -2: // Not Auth
      status = 401;
      break;
    case -3: // Error recaptcha
      status = 406;
      break;
    case 10: // Error from server
      status = 500;
      break;
  }

  res.status(status).json({
    code: code,
    mess: message,
    data: data
  });
};
