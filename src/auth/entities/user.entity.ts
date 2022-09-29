import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
}
