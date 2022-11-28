import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';

import { SectorCategory } from '../sector-category/sector-category.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 255, nullable: false })
  name: string;

  @Index()
  @ManyToOne(() => SectorCategory, (sectorCategory) => sectorCategory.id, { nullable: false })
  @JoinColumn({ name: 'sector_category_id' })
  public sectorCategory: SectorCategory;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
