import { Column, Entity, PrimaryColumn, Timestamp } from 'typeorm';
@Entity('chat')
export class Chat {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  sender_id: string;

  @Column({ type: 'varchar', length: 255 })
  recipient_id: string;

  @Column({ type: 'varchar', length: 50 })
  content: string;

  @Column({ type: 'varchar', length: 255 })
  url_image: string;

  @Column({ type: 'varchar', length: 16 })
  created_at: Timestamp;
}

@Entity('v_chat_list')
export class ChatList {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  sender_id: string;
}
