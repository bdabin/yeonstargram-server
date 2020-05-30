const passwordHash = require('../helpers/passwordHash');

module.exports = function (Sequelize, DataTypes) {
    var User = Sequelize.define('User', {
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING }
    });

    User.beforeCreate((user, _) => {
        user.password = passwordHash(user.password);
    });
    return User
}