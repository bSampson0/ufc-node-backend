import { Fighter } from 'data/models';
import { NotFound } from 'server/utils/errors';

export default class FighterRepository {
  static async create(createBody: {
    name: string;
    age: string;
    height?: string;
    nickname?: string;
    ufcRecord?: string;
    mmaRecord?: string;
  }) {
    const createdFighter: Fighter = new Fighter(createBody);

    return createdFighter.save();
  }

  static get(id: number) {
    return Fighter.findByPk(id, { include: [] });
  }

  static getAll(filters: any) {
    return Fighter.findAll({
      where: filters,
      include: [],
    });
  }

  static async update(updateBody: {
    id: number;
    name: string;
    age: string;
    height: string;
    nickname: string;
    ufcRecord: string;
    mmaRecord: string;
  }) {
    return this.partialUpdate(updateBody);
  }

  static async partialUpdate(updateBody: {
    id: number;
    name?: string;
    age?: string;
    height?: string;
    nickname?: string;
    ufcRecord?: string;
    mmaRecord?: string;
  }) {
    const foundFighter = await Fighter.findByPk(updateBody.id);
    if (!foundFighter) throw new NotFound(`Fighter with primary key ${updateBody.id} not found`);
    if (updateBody.name !== undefined) foundFighter.name = updateBody.name;
    if (updateBody.age !== undefined) foundFighter.age = updateBody.age;
    if (updateBody.height !== undefined) foundFighter.height = updateBody.height;
    if (updateBody.nickname !== undefined) foundFighter.nickname = updateBody.nickname;
    if (updateBody.ufcRecord !== undefined) foundFighter.ufcRecord = updateBody.ufcRecord;
    if (updateBody.mmaRecord !== undefined) foundFighter.mmaRecord = updateBody.mmaRecord;
    await foundFighter.save();
    return foundFighter.reload();
  }

  static async destroy(id: number) {
    const foundFighter = await Fighter.findByPk(id);
    if (!foundFighter) throw new NotFound(`Fighter with primary key ${id} not found`);
    await foundFighter.destroy();
    return foundFighter;
  }
}
