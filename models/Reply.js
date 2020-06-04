module.exports = function (Sequelize, DataTypes) {
  const Reply = Sequelize.define('Reply', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false }
  },
    { tableName: 'Reply' }
  )

  // Reply.associate = models => {

  //   // 글
  //   Reply.belongsTo( models.Board, {
  //     as:'board',
  //     foreignKey:'board_id',
  //     targetKey:'id'
  //   })

  //   // 댓글 작성자
  //   Reply.belongsTo( models.User, {
  //     as:'writer',
  //     foreignKey: 'wrtier_id',
  //     targetKey:'id'
  //   })

  // }

  return Reply
}