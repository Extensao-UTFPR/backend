import ICreateListDTO from '@modules/lists/dtos/ICreateListDTO';
import IFindAllListsInPeriod from '@modules/lists/dtos/IFindAllListsInPeriod';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import IPaginatedListsDTO from '@modules/lists/dtos/IPaginatedListsDTO';
import List from '../infra/typeorm/entities/List';

export default interface IListsReposiroty {
  findById(id: string): Promise<List | undefined>;
  findByUserId(user_id: string): Promise<List[] | undefined>;
  findByPeriod(period: IFindAllListsInPeriod): Promise<List[] | undefined>;
  findBetweenStartAndEndDate(
    { page, limit }: IPaginationDTO,
    date: Date,
  ): Promise<IPaginatedListsDTO>;
  create(data: ICreateListDTO): Promise<List>;
  delete(id: string): Promise<void>;
  save(list: List): Promise<List>;
  findAllPaginated(
    { page, limit }: IPaginationDTO,
    user_id?: string,
  ): Promise<IPaginatedListsDTO>;
}