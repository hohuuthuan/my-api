import { Request, Response, NextFunction } from 'express';
import Joi from "joi";

export interface ICreateBody {
  username: string;
  password: string;
  fullname: string;
}

export interface IDetailParams {
  id: string;
}

export interface IUpdateBody {
  username: string;
  password?: string;
  fullname: string;
}

export interface IUpdateParams {
  id: string;
}

export interface IDeleteParams {
  id: string;
}

export interface ILockParams {
  id: string;
}

export interface ILockBody {
  status: boolean;
}

const Create = (req: Request<{}, {}, ICreateBody>, res: Response, next: NextFunction) => {
  const schema: Joi.ObjectSchema<ICreateBody> = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().min(6).trim().required(),
    fullname: Joi.string().trim().required()
  });
  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    next({
      code: -1,
      mess: validateBody.error.message
    });
    return;
  }

  req.body = validateBody.value;
  next();
}

const Detail = (req: Request<IDetailParams, {}, {}, {}>, res: Response, next: NextFunction) => {
  const schema: Joi.ObjectSchema<IDetailParams> = Joi.object({
    id: Joi.string().uuid().required(),
  });
  const params: Joi.ValidationResult<IDetailParams> = schema.validate(req.params);
  if (params.error) {
    next({
      code: -1,
      mess: params.error.message
    });
    return;
  }

  req.params = params.value;
  next();
}

const Update = (req: Request<IUpdateParams, {}, IUpdateBody, {}>, res: Response, next: NextFunction) => {
  const paramsSchema: Joi.ObjectSchema<IUpdateParams> = Joi.object({
    id: Joi.string().uuid().required()
  });
  const params: Joi.ValidationResult<IUpdateParams> = paramsSchema.validate(req.params);
  if (params.error) {
    next({
      code: -1,
      mess: params.error.message
    });
    return;
  }

  const schema: Joi.ObjectSchema<IUpdateBody> = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().min(6).trim().default('').optional(),
    fullname: Joi.string().trim().required()
  });
  const validateBody: Joi.ValidationResult<IUpdateBody> = schema.validate(req.body);
  if (validateBody.error) {
    next({
      code: -1,
      mess: validateBody.error.message
    });
    return;
  }

  req.params = params.value;
  req.body = validateBody.value;
  next();
}

const Delete = (req: Request<IDeleteParams, {}, {}, {}>, res: Response, next: NextFunction) => {
  const schema: Joi.ObjectSchema<IDeleteParams> = Joi.object({
    id: Joi.string().uuid().required()
  });
  const params: Joi.ValidationResult<IDeleteParams> = schema.validate(req.params);
  if (params.error) {
    next({
      code: -1,
      mess: params.error.message
    });
    return;
  }

  req.params = params.value;
  next();
}

const Lock = (req: Request<ILockParams, {}, {}, {}>, res: Response, next: NextFunction) => {
  const schemaParams: Joi.ObjectSchema<IDeleteParams> = Joi.object({
    id: Joi.string().uuid().required()
  });
  const params: Joi.ValidationResult<IDeleteParams> = schemaParams.validate(req.params);
  if (params.error) {
    next({
      code: -1,
      mess: params.error.message
    });
    return;
  }

  const schema: Joi.ObjectSchema<ILockBody> = Joi.object({
    status: Joi.boolean().required()
  });
  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    next({
      code: -1,
      mess: validateBody.error.message
    });
    return;
  }

  req.params = params.value;
  req.body = validateBody.value;
  next();
}

export default {
  Create,
  Detail,
  Update,
  Delete,
  Lock
}
