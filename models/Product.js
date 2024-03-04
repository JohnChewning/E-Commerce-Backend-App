// Import important parts of the sequelize library
const { Model, DataTypes } = require('sequelize');
// Import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Set up fields and rules for the Product model
Product.init(
  {
    // Unique identifier for the Product
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Name of the product
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Price of the product
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true, 
      }
    },
    // Stock quantity of the product
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true, 
      }
    },
    // Foreign key referencing the 'id' column in the 'category' table
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
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
    modelName: 'product',
  }
);

module.exports = Product;
