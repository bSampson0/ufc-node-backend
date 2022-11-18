import { FighterRepository } from 'data/repositories';

export default class FighterService {
  static create(createBody: {
    name: string;
    age: string;
    height?: string;
    nickname?: string;
    ufcRecord?: string;
    mmaRecord?: string;
  }) {
    return FighterRepository.create(createBody);
  }

  static get(id: number) {
    return FighterRepository.get(id);
  }

  static getAll(args: any) {
    return FighterRepository.getAll(args);
  }

  static update(updateBody: {
    id: number;
    name: string;
    age: string;
    height: string;
    nickname: string;
    ufcRecord: string;
    mmaRecord: string;
  }) {
    return FighterRepository.update(updateBody);
  }

  static partialUpdate(updateBody: {
    id: number;
    name?: string;
    age?: string;
    height?: string;
    nickname?: string;
    ufcRecord?: string;
    mmaRecord?: string;
  }) {
    return FighterRepository.partialUpdate(updateBody);
  }

  static destroy(id: number) {
    return FighterRepository.destroy(id);
  }
}
