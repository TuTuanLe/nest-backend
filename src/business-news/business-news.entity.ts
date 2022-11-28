import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('business_news')
export class BusinessNewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 10, nullable: false })
  machungkhoan: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  link: string;

  @Column({ length: 150, nullable: false })
  source: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Index()
  @Column({ length: 24, nullable: false })
  date: string;

  @Column({ type: 'mediumtext', nullable: false })
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
