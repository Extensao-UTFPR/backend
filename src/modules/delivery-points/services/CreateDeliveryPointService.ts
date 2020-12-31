import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import DeliveryPoint from '../infra/typeorm/entities/DeliveryPoints';
import IDeliveryPointsRepository from '../repositories/IDeliveryPointsRepository';

interface IRequest {
  city: string;
  state: string;
  suburb: string;
  street: string;
  number: number;
  cep: string;
  latitude: number;
  longitude: number;
  userRole: string;
}

@injectable()
class CreateDeliveryPointService {
  constructor(
    @inject('DeliveryPointsRepository')
    private deliveryPointRepository: IDeliveryPointsRepository,
  ) {}

  public async execute({
    cep,
    city,
    latitude,
    longitude,
    number,
    state,
    street,
    suburb,
    userRole,
  }: IRequest): Promise<DeliveryPoint> {
    if (!userRole.match(/r|a/g)) {
      throw new AppError('You dont have permission to do this action', 401);
    }

    const deliveryPoint = await this.deliveryPointRepository.create({
      cep,
      city,
      latitude,
      longitude,
      number,
      state,
      street,
      suburb,
    });

    return deliveryPoint;
  }
}

export default CreateDeliveryPointService;