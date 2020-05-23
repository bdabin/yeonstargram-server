
module.exports = function (Sequelize, DataTypes) {

    var Board = Sequelize.define('Board', {

        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT },
        writer: { type: DataTypes.STRING },
        like: { type: DataTypes.INTEGER },
    });
    Board.associate = (models) => {
        Board.belongsTo(
            models.User,
            { as: 'Owner', foreignKey: 'user_id', targetKey: 'id' }
        );
    }
    return Board
}