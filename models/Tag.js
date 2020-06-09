module.exports = function(Sequelize, DataTypes) {

  const Tag = Sequelize.define('Tag', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  })


  Tag.associate = models => {
     // 태그 
      Tag.belongsToMany(models.Board, {
        through:{
            model:'hashTag',
            unique:false
        },
        as:'board',
        foreignKey: 'tag',
        sourceKey: 'id'
    })
  }
 

  return Tag
}