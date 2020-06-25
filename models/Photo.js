module.exports = function (Sequelize, DataTypes) {

  const Photo = Sequelize.define('Photo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING },
    filter: { type: DataTypes.STRING}
  })

  return Photo
}