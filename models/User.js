const passwordHash = require('../helpers/passwordHash');


module.exports = function (Sequelize, DataTypes) {
    const User = Sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING }
    });

    // 비밀번호 암호화
    User.beforeCreate((user, _) => {
        user.password = passwordHash(user.password);
    });

    User.associate = models => {

        // 프로필 사진
        // User.belongsTo(models.Photo, {
        //     as: 'Profile',
        //     foreignKey: 'profile',
        //     targetKey: 'id'
        // })

        // ys 추가 프로필사진 유저 profile에 저장
        // User.hasMany(models.User, {
        //     as: 'Profile',
        //     foreignKey: 'profile',
        //     targetKey: 'id'
        // })

        User.hasMany(models.Board, {
            as: "BoardList",
            foreignKey: 'writer',
            targetKey: 'id'
        })

        // 게시글
        // User.hasMany(models.Board, {
        //     foreignKey: 'writer',
        //     sourceKey: 'id',
        //     onDelete: 'CASCADE'
        // })

        // 좋아요
        User.belongsToMany(models.Board, {
            through: {
                model: 'Like',
                unique: false
            },
            as: 'like',
            foreignKey: 'user',
            sourceKey: 'id',
            constraints: false
        })

        // 팔로워
        User.belongsToMany(models.User, {
            through: {
                model: "Follow"
            },
            as: "Follower",
            foreignKey: "to",
            sourceKey: 'id',
            otherKey: "from"
        });

        // 팔로잉
        User.belongsToMany(models.User, {
            through: {
                model: "Follow"
            },
            as: "Following",
            foreignKey: "from",
            sourceKey: 'id',
            otherKey: "to"
        });

    }


    return User
}