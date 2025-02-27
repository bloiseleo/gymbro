import { Entity } from 'typeorm';

@Entity('users')
export class User {
  id: number;
  username: string;
  password: string;
}
