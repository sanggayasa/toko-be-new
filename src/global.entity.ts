import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class GlobalEntity {
  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 50 })
  created_by: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'NOW()',
  })
  created_at: Date;

  @Column({ type: 'varchar', length: 50 })
  updated_by: string;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'NOW()',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  delete_date: Date;
}
