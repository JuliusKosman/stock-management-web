module.exports = (sequelize, DataTypes) => {
  const StockOut = sequelize.define("StockOut", {
    freezeTableName: true,
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
  },{
    freezeTableName: true
  });

  StockOut.associate = (models) => {
    StockOut.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product"
    });
  };

  return StockOut;
};
