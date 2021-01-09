import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsController = new ProductsController();

const productsRouter = Router();

productsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().min(1),
      limit: Joi.number().min(1),
    },
  }),
  productsController.list,
);

productsRouter.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

productsRouter.use(ensureAuthenticated);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cost_price: Joi.number().required(),
      sale_price: Joi.number().required(),
      unit: Joi.string().valid('kg', 'g', 'l', 'ml', 'un', 'ton').required(),
      wholesale_price: Joi.number(),
    },
  }),
  productsController.create,
);

productsRouter.put(
  ':/product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  ':product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
