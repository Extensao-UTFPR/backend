import Order from '../infra/typeorm/entities/Order';

export default interface PaginatedDeliveryPointsDTO {
  data: Order[];
  page: number;
  limit: number;
  totalCount: number;
}