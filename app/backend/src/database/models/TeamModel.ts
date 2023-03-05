import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import MatchModel from './MatchModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

Teams.hasMany(MatchModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(MatchModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });

MatchModel.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchModel.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Teams;
