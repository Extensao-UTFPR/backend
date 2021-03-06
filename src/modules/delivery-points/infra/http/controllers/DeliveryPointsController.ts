import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDeliveryPointService from '@modules/delivery-points/services/CreateDeliveryPointService';
import ListDeliveryPointsService from '@modules/delivery-points/services/ListDeliveryPointsService';
import ShowDeliveryPointService from '@modules/delivery-points/services/ShowDeliveryPointService';
import UpdateDeliveryPointService from '@modules/delivery-points/services/UpdateDeliveryPointService';
import DeleteDeliveryPointService from '@modules/delivery-points/services/DeleteDeliveryPointService';

class DeliveryPointsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      cep,
      city,
      latitude,
      longitude,
      number,
      state,
      street,
      suburb,
    } = request.body;

    const createDeliveryPoint = container.resolve(CreateDeliveryPointService);

    const point = await createDeliveryPoint.execute({
      cep,
      city,
      latitude,
      longitude,
      number,
      state,
      street,
      suburb,
    });

    return response.json(point);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const {
      state,
      page = 1,
      limit = 10,
      sort_by,
      order,
      ...filter
    } = request.query;

    const parsedOrder =
      typeof order === 'string' && order.match(/asc/gi) ? 'ASC' : 'DESC';

    const listDeliveryPoints = container.resolve(ListDeliveryPointsService);

    const data = await listDeliveryPoints.execute({
      state: state ? String(state) : undefined,
      page: Number(page),
      limit: Number(limit),
      sort_by: sort_by ? String(sort_by) : undefined,
      order: parsedOrder,
      ...filter,
    });

    return response.json(data);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { point_id } = request.params;

    const showDeliveryPoint = container.resolve(ShowDeliveryPointService);

    const point = await showDeliveryPoint.execute({ point_id });

    return response.json(point);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { point_id } = request.params;
    const {
      city,
      state,
      suburb,
      street,
      cep,
      number,
      latitude,
      longitude,
    } = request.body;

    const updateDeliveryPoint = container.resolve(UpdateDeliveryPointService);

    const point = await updateDeliveryPoint.execute({
      point_id,
      city,
      state,
      suburb,
      street,
      cep,
      number,
      latitude,
      longitude,
    });

    return response.json(point);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { point_id } = request.params;

    const deleteDeliveryPoint = container.resolve(DeleteDeliveryPointService);

    const point = await deleteDeliveryPoint.execute({
      point_id,
    });

    return response.json({ point });
  }
}

export default DeliveryPointsController;
