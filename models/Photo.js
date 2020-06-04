module.exports = function(Sequelize, DataTypes) {

  const Photo = Sequelize.define('Photo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING }
  })

  Photo.associate = models => {

    // 유저 프로필
    // Photo.hasOne(models.User, {
    //   as:'profile',
    //   foreignKey:'profile_id',
    //   sourceKey:'id'
    // })

    // 게시글
    // Photo.hasMany(models.Board, {
    //   as: 'photo',
    //   foreignKey:'photo_id',
    //   sourceKey:'id'
    // })
  }

  return Photo 
}