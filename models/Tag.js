const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

// Define the Tag model with its attributes
Tag.init(
  {
    // Unique identifier for the Tag
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Name of the tag
    tag_name: { 
      type: DataTypes.STRING,
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
    modelName: 'tag',
  }
);

module.exports = Tag;
