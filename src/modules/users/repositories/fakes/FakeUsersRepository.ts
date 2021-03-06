import { v4 as uuid } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import IPaginatedUsersDTO from '@modules/users/dtos/IPaginatedUsersDTO';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async checkUserExists(
    email: string,
    cpf: string,
    cnpj: string,
  ): Promise<User | undefined> {
    const findUser = this.users.find(
      user => user.email === email || user.cpf === cpf || user.cnpj === cnpj,
    );

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.cpf === cpf);

    return findUser;
  }

  public async findByCNPJ(cnpj: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.cnpj === cnpj);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findAllPaginated({
    page,
    limit,
  }: IPaginationDTO): Promise<IPaginatedUsersDTO> {
    const skipped_items = (page - 1) * limit;

    const total_count = this.users.length;
    const users: User[] = [];

    let i = skipped_items;

    const limitLoop =
      skipped_items + limit < total_count
        ? skipped_items + limit
        : total_count - 1;

    if (i === 0 && limitLoop === 0 && this.users[0]) {
      users.push(this.users[0]);
    }
    // eslint-disable-next-line no-plusplus
    for (i; i < limitLoop; i++) {
      users.push(this.users[i]);
    }

    return {
      total_count,
      page,
      limit,
      data: users,
    };
  }
}

export default FakeUsersRepository;
