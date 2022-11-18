import { Request, Response, NextFunction } from 'express';
import { CREATED } from 'http-status';
import { FighterService } from 'server/services';
import { NotFound } from 'server/utils/errors';

export default class FighterController {
  static async runServiceAction(req: Request, serviceAction: Function) {
    const id = req.params.id !== undefined ? Number(req.params.id) : undefined;
    const { name, age, height, nickname, ufcRecord, mmaRecord } = req.body;

    if (id !== undefined) {
      return serviceAction({
        id,
        name,
        age,
        height,
        nickname,
        ufcRecord,
        mmaRecord,
      });
    }
    return serviceAction({
      name,
      age,
      height,
      nickname,
      ufcRecord,
      mmaRecord,
    });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newFighter = await FighterController.runServiceAction(req, FighterService.create);
      res.locals.status = CREATED;
      res.locals.data = newFighter;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const fighterObject = await FighterService.get(id);
      if (!fighterObject) {
        throw new NotFound(`Fighter with primary key ${id} not found`);
      }

      res.locals.data = fighterObject;

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = { ...req.query };
      const allFighters = await FighterService.getAll(filters);
      res.locals.data = allFighters;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedFighter = await FighterController.runServiceAction(req, FighterService.update);
      res.locals.data = updatedFighter;

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedFighter = await FighterController.runServiceAction(
        req,
        FighterService.partialUpdate,
      );
      res.locals.data = updatedFighter;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const fighterDelete = await FighterService.destroy(id);
      res.locals.data = fighterDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
