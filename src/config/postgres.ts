import * as Sequelize from 'sequelize';
import Modals from '@model/postgres';
import process from 'process';
import console from 'console';

const databaseUrl = process.env.POSTGRES;

if (!databaseUrl) {
  throw new Error('POSTGRES environment variable is not defined');
}

const sequelize: Sequelize.Sequelize = new Sequelize.Sequelize(databaseUrl, {
  dialect: 'postgres',
  timezone: '+07:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true
  },
  logging: process.env.NODE_ENV === 'production' ? false : console.log
});

sequelize.authenticate().then(() => {
  console.info(`---------------------------------`);
  console.info(`🚀 Connect to Postgres success`);
  console.info(`---------------------------------`);
});

Modals(sequelize);

// sequelize
// 	.sync({
// 		force: false,
// 		alter: true
// 	})
// 	.then(function() {
// 		console.log('=-=- Sync DB Success -=-=');
// 	});

export default {
  sequelize,
  Sequelize
};
