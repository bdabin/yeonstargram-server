const passwordHash = require('../helpers/passwordHash');

module.exports = function (Sequelize, DataTypes) {
    var User = Sequelize.define('User', {
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING }
    });

    User.beforeCreate((user, _) => {
        user.password = passwordHash(user.password);
    });
    
    return User
}