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
        },
        home_team_goals: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },

        away_team: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        away_team_goals: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },

        in_progress: {
            allowNull: false,
            type: Sequelize.INTEGER,
        }
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Matches');
    },
};
