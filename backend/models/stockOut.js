module.exports = (sequelize, DataTypes) => {
  const StockOut = sequelize.define("StockOut", {
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    tableName: 'stockouts'
  });

  StockOut.associate = (models) => {
    StockOut.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product"
    });
  };

  return StockOut;
};
