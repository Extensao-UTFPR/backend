import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import checkRole from '@modules/users/infra/http/middlewares/checkRole';
import DeliveryPointsController from '../controllers/DeliveryPointsController';

const deliveryPointsRoutes = Router();
const deliveryPointsController = new DeliveryPointsController();

deliveryPointsRoutes.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      state: Joi.string(),
      limit: Joi.number().min(1),
      page: Joi.number().min(1),
      sort_by: Joi.string(),
      city: Joi.string(),
      suburb: Joi.string(),
      street: Joi.string(),
      email: Joi.string(),
      order: Joi.string(),
    },
  }),
  deliveryPointsController.list,
);

deliveryPointsRoutes.get(
  '/:point_id',
  celebrate({
    [Segments.PARAMS]: {
      point_id: Joi.string().uuid().required(),
    },
  }),
  deliveryPointsController.show,
);

deliveryPointsRoutes.use(ensureAuthenticated);

deliveryPointsRoutes.post(
  '/',
  [checkRole(['r'])],
  celebrate({
    [Segments.BODY]: {
      city: Joi.string().required(),
      state: Joi.string().required(),
      suburb: Joi.string().required(),
      street: Joi.string().required(),
      cep: Joi.number().required(),
      number: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  deliveryPointsController.create,
);

deliveryPointsRoutes.put(
  '/:point_id',
  [checkRole(['r'])],
  celebrate({
    [Segments.PARAMS]: {
      point_id: Joi.string().uuid().required(),
    },
  }),
  deliveryPointsController.update,
);

deliveryPointsRoutes.delete(
  '/:point_id',
  [checkRole(['r'])],
  celebrate({
    [Segments.PARAMS]: {
      point_id: Joi.string().uuid().required(),
    },
  }),
  deliveryPointsController.delete,
);

export default deliveryPointsRoutes;
