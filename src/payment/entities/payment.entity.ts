import {
  Column,
  Entity,
  PrimaryColumn,
  Timestamp,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  pay_id: string;

  @Column({ type: 'varchar', length: 50 })
  unique_code: string;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  signature: string;

  @Column({ type: 'varchar', length: 16 })
  created_at: Timestamp;
}

@Entity('v_chat_list')
export class PaymentList {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  sender_id: string;
}
