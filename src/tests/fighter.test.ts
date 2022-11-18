import request from 'supertest';
import { Fighter } from 'data/models';
import app from 'server/app';
import { buildFighter, createFighter } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/fighter';

describe('Fighter tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  test('/POST - Response with a new created fighter', async () => {
    const fakeFighter = await buildFighter({});

    const response = await request(app).post(ENDPOINT).send(fakeFighter);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseFighter = response.body.data;

    const fighter = await Fighter.findByPk(responseFighter.id);

    expect(fighter.name).toBe(fakeFighter.name);
    expect(fighter.age).toBe(fakeFighter.age);
    expect(fighter.height).toBe(fakeFighter.height);
    expect(fighter.nickname).toBe(fakeFighter.nickname);
    expect(fighter.ufcRecord).toBe(fakeFighter.ufcRecord);
    expect(fighter.mmaRecord).toBe(fakeFighter.mmaRecord);
  });

  test('/GET - Response with a fighter', async () => {
    const fighterDict = await buildFighter({});
    const fakeFighter = await createFighter(fighterDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeFighter.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeFighter.id);
    expect(data.name).toBe(fakeFighter.name);
    expect(data.age).toBe(fakeFighter.age);
    expect(data.height).toBe(fakeFighter.height);
    expect(data.nickname).toBe(fakeFighter.nickname);
    expect(data.ufcRecord).toBe(fakeFighter.ufcRecord);
    expect(data.mmaRecord).toBe(fakeFighter.mmaRecord);
  });

  test('/GET - Response with a fighter not found', async () => {
    const fighterDict = await buildFighter({});
    const fakeFighter = await createFighter(fighterDict);
    const { id } = fakeFighter;
    await fakeFighter.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a list of fighters', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allFighter = await Fighter.findAll();
    expect(data.length).toBe(allFighter.length);
  });

  test('/PUT - Response with an updated fighter', async () => {
    const fighterDict = await buildFighter({});
    const fakeFighter = await createFighter(fighterDict);

    const anotherFakeFighter = await buildFighter({});

    const response = await request(app).put(`${ENDPOINT}/${fakeFighter.id}`).send({
      name: anotherFakeFighter.name,
      age: anotherFakeFighter.age,
      height: anotherFakeFighter.height,
      nickname: anotherFakeFighter.nickname,
      ufcRecord: anotherFakeFighter.ufcRecord,
      mmaRecord: anotherFakeFighter.mmaRecord,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeFighter.name);
    expect(data.age).toBe(anotherFakeFighter.age);
    expect(data.height).toBe(anotherFakeFighter.height);
    expect(data.nickname).toBe(anotherFakeFighter.nickname);
    expect(data.ufcRecord).toBe(anotherFakeFighter.ufcRecord);
    expect(data.mmaRecord).toBe(anotherFakeFighter.mmaRecord);

    const updatedFighter = await Fighter.findByPk(fakeFighter.id);

    expect(updatedFighter.name).toBe(anotherFakeFighter.name);
    expect(updatedFighter.age).toBe(anotherFakeFighter.age);
    expect(updatedFighter.height).toBe(anotherFakeFighter.height);
    expect(updatedFighter.nickname).toBe(anotherFakeFighter.nickname);
    expect(updatedFighter.ufcRecord).toBe(anotherFakeFighter.ufcRecord);
    expect(updatedFighter.mmaRecord).toBe(anotherFakeFighter.mmaRecord);
  });

  test('/PUT - Fighter does not exists, fighter cant be updated', async () => {
    const fighterDict = await buildFighter({});
    const fakeFighter = await createFighter(fighterDict);
    const { id } = fakeFighter;
    await fakeFighter.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      name: fighterDict.name,
      age: fighterDict.age,
      height: fighterDict.height,
      nickname: fighterDict.nickname,
      ufcRecord: fighterDict.ufcRecord,
      mmaRecord: fighterDict.mmaRecord,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated fighter (no updates)', async () => {
    const fighterDict = await buildFighter({});
    const fakeFighter = await createFighter(fighterDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeFighter.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated fighter', async () => {
    const fighterDict = await buildFighter({});
    const fakeFighter = await createFighter(fighterDict);

    const anotherFakeFighter = await buildFighter({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeFighter.id}`)
      .send({ name: anotherFakeFighter.name });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(anotherFakeFighter.name);

    const updatedFighter = await Fighter.findByPk(fakeFighter.id);

    expect(updatedFighter.name).toBe(anotherFakeFighter.name);
  });

  test('/PATCH - Fighter does not exists, fighter cant be updated', async () => {
    const fighterDict = await buildFighter({});
    const fakeFighter = await createFighter(fighterDict);
    const { id } = fakeFighter;
    const { name } = fakeFighter;
    await fakeFighter.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ name });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/DELETE - Response with a deleted fighter', async () => {
    const fighterDict = await buildFighter({});
    const fakeFighter = await createFighter(fighterDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeFighter.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeFighter.id);

    const deletedFighter = await Fighter.findByPk(fakeFighter.id);
    expect(deletedFighter).toBe(null);
  });

  test('/DELETE - Fighter does not exists, fighter cant be deleted', async () => {
    const fighterDict = await buildFighter({});
    const fakeFighter = await createFighter(fighterDict);
    const { id } = fakeFighter;
    await fakeFighter.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
