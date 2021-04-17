import ICreateWeeklyOffersDTO from '@modules/weekly-offers/dtos/ICreateWeeklyOffersDTO';
import IFindAllOffersInPeriod from '@modules/weekly-offers/dtos/IFindAllOffersInPeriod';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import PaginatedWeeklyOffersDTO from '@modules/weekly-offers/dtos/PaginatedWeeklyOffersDTO';
import WeeklyOffers from '../infra/typeorm/entities/WeeklyOffers';

export default interface IWeeklyOffersReposiroty {
  findById(id: string): Promise<WeeklyOffers | undefined>;
  findByUserId(user_id: string): Promise<WeeklyOffers[] | undefined>;
  findBetweenStartAndEndDate(
    { page, limit }: IPaginationDTO,
    date: Date,
  ): Promise<PaginatedWeeklyOffersDTO>;
  findByPeriod(
    period: IFindAllOffersInPeriod,
  ): Promise<WeeklyOffers[] | undefined>;
  create(data: ICreateWeeklyOffersDTO): Promise<WeeklyOffers>;
  delete(id: string): Promise<void>;
  save(weeklyOffers: WeeklyOffers): Promise<WeeklyOffers>;
  findAllPaginated(
    { page, limit }: IPaginationDTO,
    user_id?: string,
  ): Promise<PaginatedWeeklyOffersDTO>;
}
