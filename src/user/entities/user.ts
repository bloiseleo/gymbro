import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: false,
    unique: true,
  })
  username: string;
  @Column({
    nullable: false,
  })
  password: string;
}
