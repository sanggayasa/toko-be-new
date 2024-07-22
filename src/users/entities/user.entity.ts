import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GlobalEntity } from '../../global.entity';

@Entity('users')
export class User extends GlobalEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @Column({ type: 'varchar', length: 15 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  provinsi: string;

  @Column({ type: 'varchar', length: 50 })
  kota: string;

  @Column({ type: 'varchar', length: 50 })
  kecamatan: string;

  @Column({ type: 'varchar', length: 50 })
  kelurahan: string;

  @Column({ type: 'varchar', length: 50 })
  rt: string;

  @Column({ type: 'varchar', length: 50 })
  rw: string;

  @Column({ type: 'varchar', length: 50 })
  kode_pos: string;

  @Column({ type: 'varchar', length: 50 })
  alamat: string;

  @Column({ type: 'varchar', length: 50 })
  role_id: string;
}
