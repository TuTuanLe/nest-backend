import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('sector_categories')
export class SectorCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 150, nullable: false })
  url: string;

  @Column({ length: 10, nullable: false, default: 'sector' })
  type: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
