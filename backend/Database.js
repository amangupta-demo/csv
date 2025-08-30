import { Sequelize } from "sequelize";

const sequelize = new Sequelize('csvProject', 'postgres', '@m@n373169', {
  host: 'localhost',
  dialect:'postgres',
  logging:false
  
});

export default sequelize