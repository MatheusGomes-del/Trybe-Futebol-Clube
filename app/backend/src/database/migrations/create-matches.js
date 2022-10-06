module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('matches', {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        home_team: {
            allowNull: false,
            type: Sequelize.INTEGER,
            reference: {
              model: 'teams',
              key: 'id'
            }
        },
        home_team_goals: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },

        away_team: {
            allowNull: false,
            type: Sequelize.INTEGER,
            reference: {
              model:'teams',
              key: 'id'
            }
        },
        away_team_goals: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },

        in_progress: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
        }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('matches');
    },
};
