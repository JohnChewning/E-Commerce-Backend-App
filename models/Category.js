const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

// Define the Category model with its attributes
Category.init(
  {
    // Unique identifier for the Category
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Name of the category
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'category',
  }
);

module.exports = Category;
