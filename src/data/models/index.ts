/* eslint import/no-cycle: "off" */
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import config from 'config';

import Fighter from './fighter.model';

const pg = require('pg');

// https://github.com/sequelize/sequelize/issues/4550
pg.defaults.parseInt8 = true;

dotenv.config();

const sequelize = new Sequelize({
  ...config,
  models: [Fighter],
});

if (process.env.NODE_ENV !== 'test' && !process.env.USE_MIGRATIONS) {
  sequelize.sync({ alter: true });
}

export { sequelize, Fighter };
