
module.exports = function (Sequelize, DataTypes) {

    var Board = Sequelize.define('Board', {

        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT },
        writer: { type: DataTypes.STRING },
        like: { type: DataTypes.INTEGER },
    });
    Board.associate = (models) => {

        // 메인 모델에 외부키를 검
        // onDelete 옵션의 경우 제품 하나가 삭제되면 외부키가 걸린 메모들도 싹다 삭제
        // as 가 없으면 나중에 인크루드로 가져올 시 models.BoardMemo로 가져옴
        // foreingKey : 해당DB에 생길 필드명 , sourceKey : Board의 필드명
        Board.hasMany(models.BoardMemo,
            { as: 'Memo', foreignKey: 'board_id', sourceKey: 'id', onDelete: 'CASCADE' });

        Board.belongsTo(
            models.User,
            // as -> Board.create"Owner"() as 이름으로 따라감
            { as: 'Owner', foreignKey: 'user_id', targetKey: 'id' }
        );
    }
    return Board
}