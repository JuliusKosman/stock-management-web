const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    }
  }, {
    freezeTableName: true,
    tableName: 'users',
  });

  User.beforeCreate(async (user) => {
    if (user.password && !user.password.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.associate = (models) => {
    User.hasMany(models.ActivityLog, {
      foreignKey: 'user_id',
      as: 'activitylogs',
    });
  };

  return User;
};
