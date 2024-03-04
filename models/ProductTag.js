const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

// Define the ProductTag model with its attributes
ProductTag.init(
  {
    // Unique identifier for the ProductTag
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Foreign key referencing the 'id' column in the 'product' table
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    // Foreign key referencing the 'id' column in the 'tag' table
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    // Define the sequelize instance to use
    sequelize,
    // Do not include timestamps in the model
    timestamps: false,
    // Ensure the table name is the same as the model name
    freezeTableName: true,
    // Use underscores instead of camelCase for column names
    underscored: true,
    // Set the model name for identification
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
