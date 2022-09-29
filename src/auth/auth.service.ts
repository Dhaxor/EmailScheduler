import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserEntity) {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    return await this.userRepository.find();
  }
}
