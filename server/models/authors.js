module.exports = (sequelize, DataTypes, Model) => {
    class Authors extends Model {
      static associate(models) {
      }
    }
    
    Authors.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
       first_name: DataTypes.STRING,
       last_name: DataTypes.STRING,
       email: DataTypes.STRING,
       date_created: DataTypes.DATE,
       date_updated: DataTypes.DATE
      },
      {
        // options
        sequelize,
        modelName: 'Authors',
        tableName: 'authors',
        createdAt: 'date_created',
        updatedAt: 'date_updated',
        underscore: true,
      },
    );
    return Authors;
  };
