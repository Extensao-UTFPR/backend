import { injectable, inject } from 'tsyringe';

import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import IWeeklyOffersDetailsRepository from '../repositories/IWeeklyOffersDetailsRepository';
import IWeeklyOffersReposiroty from '../repositories/IWeeklyOffersRepository';
import PaginatedWeeklyOffersDTO from '../dtos/PaginatedWeeklyOffersDTO';

@injectable()
class OffersWeeklyOffersService {
  constructor(
    @inject('WeeklyOffersRepository')
    private weeklyOffersRepository: IWeeklyOffersReposiroty,

    @inject('WeeklyOffersDetailsRepository')
    private weeklyOffersDetailsRepository: IWeeklyOffersDetailsRepository,
  ) {}

  public async execute({
    limit,
    page,
  }: IPaginationDTO): Promise<PaginatedWeeklyOffersDTO> {
    const response = await this.weeklyOffersRepository.findAllPaginated({
      limit,
      page,
    });

    return response;
  }
}

export default OffersWeeklyOffersService;
