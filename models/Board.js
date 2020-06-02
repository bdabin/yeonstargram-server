
module.exports = function (Sequelize, DataTypes) {
    const Board = Sequelize.define('Board', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT },
        like: { type: DataTypes.INTEGER },
    });
    Board.associate = (models) => {
        Board.belongsTo(
            models.User,
            { as: 'Owner', foreignKey: 'writer', targetKey: 'id' }
        );
    }
    return Board
}