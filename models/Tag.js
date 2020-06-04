module.exports = function(Sequelize, DataTypes) {

  const Tag = Sequelize.define('Tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  })

  return Tag
}