import { Router } from 'express';
import { validate } from 'express-validation';
import { FighterController } from 'server/controllers';
import { fighterValidation, options } from 'server/validations';

const fighterRouter = Router();

fighterRouter.get('/', validate(fighterValidation.getAll, options), FighterController.getAll);

fighterRouter.get('/:id', FighterController.get);

fighterRouter.post('/', validate(fighterValidation.create, options), FighterController.create);

fighterRouter.put('/:id', validate(fighterValidation.update, options), FighterController.update);

fighterRouter.patch(
  '/:id',
  validate(fighterValidation.partialUpdate, options),
  FighterController.partialUpdate,
);

fighterRouter.delete(
  '/:id',
  validate(fighterValidation.destroy, options),
  FighterController.destroy,
);

export default fighterRouter;
