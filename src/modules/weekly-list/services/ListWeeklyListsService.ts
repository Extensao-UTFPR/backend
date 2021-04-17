import { injectable, inject } from 'tsyringe';

import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import IWeeklyListDetailsRepository from '../repositories/IWeeklyListDetailsRepository';
import IWeeklyListsReposiroty from '../repositories/IWeeklyListsReposiroty';
import PaginatedWeeklyListsDTO from '../dtos/PaginatedWeeklyListsDTO';

interface IRequest extends IPaginationDTO {
  user_id?: string;
}

@injectable()
class ListWeeklyListsService {
  constructor(
    @inject('WeeklyListsRepository')
    private weeklyListsRepository: IWeeklyListsReposiroty,

    @inject('WeeklyListDetailsRepository')
    private weeklyListDetailsRepository: IWeeklyListDetailsRepository,
  ) {}

  public async execute({
    user_id,
    limit,
    page,
  }: IRequest): Promise<PaginatedWeeklyListsDTO> {
    const response = await this.weeklyListsRepository.findAllPaginated(
      { limit, page },
      user_id,
    );

    return response;
  }
}

export default ListWeeklyListsService;
