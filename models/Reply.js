module.exports = function (Sequelize, DataTypes) {
  const Reply = Sequelize.define('Reply', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },

  },
    { tableName: 'Reply' }
  )

  Reply.associate = models => {
    Reply.belongsTo(models.User, {
      foreignKey: 'writer',
      targetKey: 'id'
    });
  }

  return Reply
}