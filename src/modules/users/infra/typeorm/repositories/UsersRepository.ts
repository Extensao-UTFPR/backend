import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import PaginationDTO from '@shared/dtos/PaginationDTO';
import PaginatedUsersDTO from '@modules/users/dtos/PaginatedUsersDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async checkUserExists(
    email: string,
    cpf: string,
    cnpj: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: [{ email }, { cpf }, { cnpj }],
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
    });

    return user;
  }

  public async findByCNPJ(cnpj: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cnpj },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete({ id });
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findAllPaginated({
    limit,
    page,
  }: PaginationDTO): Promise<PaginatedUsersDTO> {
    const skippedItems = (page - 1) * limit;

    console.log({ skippedItems, page });

    const totalCount = await this.ormRepository.count();
    const users = await this.ormRepository
      .createQueryBuilder('user')
      .orderBy('created_at', 'DESC')
      .offset(skippedItems)
      .limit(limit)
      .getMany();

    return {
      totalCount,
      page,
      limit,
      data: users,
    };
  }
}

export default UsersRepository;
