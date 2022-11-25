import { random } from 'faker';
import { Fighter } from 'data/models';

interface FighterDict {
  name?: string;
  age?: string;
  height?: string;
  nickname?: string;
  ufcRecord?: string;
  mmaRecord?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const buildFighter = async (fighterFks: any) => {
  const resFighter: FighterDict = {};

  resFighter.name = random.word().slice(0, 255);
  resFighter.age = random.word().slice(0, 255);
  resFighter.height = random.word().slice(0, 255);
  resFighter.nickname = random.word().slice(0, 255);
  resFighter.ufcRecord = random.word().slice(0, 255);
  resFighter.mmaRecord = random.word().slice(0, 255);

  return resFighter;
};

const createFighter = async (fakeFighter) => {
  const fighter = await Fighter.create(fakeFighter);
  return fighter;
};

export { buildFighter, createFighter };
