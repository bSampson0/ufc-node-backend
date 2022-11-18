import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import AdminBroSequelize from '@admin-bro/sequelize';
import { sequelize } from '../../data/models';

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: sequelize.models.Fighter,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'name', 'age', 'height', 'nickname', 'ufcRecord', 'mmaRecord'],
      },
    },
  ],
  branding: {
    companyName: 'Database dashboard',
    softwareBrothers: false,
    logo: false,
    favicon: 'https://imagine.ai/img/favicon.ico',
  },
});
const adminbroRouter = AdminBroExpress.buildRouter(adminBro);

export default adminbroRouter;
