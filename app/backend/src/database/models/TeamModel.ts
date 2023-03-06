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

Teams.hasMany(MatchModel, { foreignKey: 'home_team_id', as: 'home_team' });
Teams.hasMany(MatchModel, { foreignKey: 'away_team_id', as: 'away_team' });

MatchModel.belongsTo(Teams, { foreignKey: 'home_team_id', as: 'home_team' });
MatchModel.belongsTo(Teams, { foreignKey: 'away_team_id', as: 'away_team' });

export default Teams;
