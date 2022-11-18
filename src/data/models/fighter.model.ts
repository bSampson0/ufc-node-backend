/* eslint import/no-cycle: "off" */
import {
  Model,
  PrimaryKey,
  Column,
  Table,
  Length,
  AllowNull,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  freezeTableName: true,
})
export default class Fighter extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Length({ min: 0, max: 255 })
  @Column
  name: string;

  @AllowNull(false)
  @Length({ min: 0, max: 255 })
  @Column
  age: string;

  @Length({ min: 0, max: 255 })
  @Column
  height: string;

  @Length({ min: 0, max: 255 })
  @Column
  nickname: string;

  @Length({ min: 0, max: 255 })
  @Column
  ufcRecord: string;

  @Length({ min: 0, max: 255 })
  @Column
  mmaRecord: string;
}
