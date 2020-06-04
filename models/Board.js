module.exports = function (Sequelize, DataTypes) {

    const Board = Sequelize.define('Board', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        description: { type: DataTypes.TEXT },
    });

    Board.associate = models => {

        // 글 작성자
        Board.belongsTo(models.User, {
            foreignKey: 'writer',
            targetKey: 'id'
        });

        // 좋아요
        Board.belongsToMany(models.User, {
            through: {
                model: 'Like',
                unique: false
            },
            as: 'like',
            foreignKey: 'board',
            sourceKey: 'id',
            constraints: false
        })

        // 댓글
        Board.hasMany(models.Reply, {
            as: 'Reply',
            foreignKey: 'board_id',
            sourceKey: 'id',
            onDelete: 'CASCADE'
        });

        // 태그 
        Board.belongsTo(models.Tag, {
            foreignKey: 'tag',
            targetKey: 'id'
        })

        // 업로드 사진
        Board.belongsTo(models.Photo, {
            foreignKey: 'photo',
            targetKey: 'id'
        })
    }

    return Board
}