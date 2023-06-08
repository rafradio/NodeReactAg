module.exports = (sequelize, DataTypes, Model) => {
    class Books extends Model {
      static associate(models) {
      }
    }
    
    Books.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        bookname: DataTypes.STRING,
        author: DataTypes.INTEGER,
        date_created: DataTypes.DATE,
        date_updated: DataTypes.DATE
      },
      {
        // options
        sequelize,
        modelName: 'Books',
        tableName: 'books',
        createdAt: 'date_created',
        updatedAt: 'date_updated',
        underscore: true,
      },
    );
    return Books;
  };
