import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IDeliveryPointsRepository from '@modules/delivery-points/repositories/IDeliveryPointsRepository';
import DeliveryPointsRepository from '@modules/delivery-points/infra/typeorm/repositories/DeliveryPointsRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IWeeklyListRepository from '@modules/weekly-list/repositories/IWeeklyListsReposiroty';
import WeeklyListRepository from '@modules/weekly-list/infra/typeorm/repositories/WeeklyListsRepository';

import IWeeklyListDetailsRepository from '@modules/weekly-list/repositories/IWeeklyListDetailsRepository';
import WeeklyListDetailsRepository from '@modules/weekly-list/infra/typeorm/repositories/WeeklyListDetailsRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IOrderDetailsRepository from '@modules/orders/repositories/IOrderDetailsRepository';
import OrderDetailsRepository from '@modules/orders/infra/typeorm/repositories/OrderDetailsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IDeliveryPointsRepository>(
  'DeliveryPointsRepository',
  DeliveryPointsRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IWeeklyListRepository>(
  'WeeklyListRepository',
  WeeklyListRepository,
);

container.registerSingleton<IWeeklyListDetailsRepository>(
  'WeeklyListDetailsRepository',
  WeeklyListDetailsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IOrderDetailsRepository>(
  'OrderDetailsRepository',
  OrderDetailsRepository,
);
