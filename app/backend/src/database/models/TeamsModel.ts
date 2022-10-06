import { Model, INTEGER, STRING } from 'sequelize/types';
import db from '.';

export default class TeamsModel extends Model {
  id!: number;
  teamName: string;
}

TeamsModel.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },

  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
