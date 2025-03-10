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
  @Column({
    name: 'profile_photo',
    nullable: false,
    default: 'default_profile_photo.jpg',
  })
  profilePhoto: string;
}
