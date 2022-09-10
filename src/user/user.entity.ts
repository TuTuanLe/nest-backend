import { PasswordTransformer } from 'src/common/transformers/password.transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', length: 15, nullable: true, unique: true })
  userId: string;

  @Column({ length: 150, nullable: false, unique: true })
  email: string;

  @Column({
    name: 'password',
    length: 150,
    nullable: false,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @Column({ length: 50, nullable: false, unique: true })
  username: string;

  @Column({ name: 'first_name', nullable: true, length: 100 })
  firstName: string;

  @Column({ name: 'last_name', nullable: true, length: 100 })
  lastName: string;

  @Column({ length: 25, nullable: true, unique: true })
  phone: string;

  @Column({ length: 10, nullable: true, default: 'inactive' })
  status: string;

  @Column({ length: 10, nullable: true, default: 'user' })
  role: string;

  @Column({ name: 'active_code', length: 150, nullable: true })
  activeCode: string;

  @Column({ name: 'send_number', type: 'int', nullable: true })
  sendNumber: number;

  @Column({ name: 'chart_options', type: 'text', nullable: true })
  chartOptions: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
