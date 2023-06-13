class ObjConnect {
    constructor() {
        const {Sequelize, DataTypes, Model} = require("sequelize");
        // this.sequelize = new Sequelize('nodemysql', 'root', '7783Rafraikk@', {
        //     host: 'localhost',
        //     dialect: 'mysql' 
        // });
        this.sequelize = new Sequelize('first', 'postgres', '7783Rafraikk@', {
            host: 'localhost',
            dialect: 'postgres' 
        });
        this.Model = Model;
        this.DataTypes = DataTypes;
        
    }

    async checkConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection to obj has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    async findAllRecords(tableName) {
        const modelAutor = require("../models/" + tableName);
        let currentModel = modelAutor(this.sequelize, this.DataTypes, this.Model);
        const curentData = await currentModel.findAll();
        // console.log("All users:", JSON.stringify(authorsData, null, 2));
        let modelsData = JSON.stringify(curentData, null, 2);
        console.log("All users:", modelsData);
        return modelsData;

    }

    async joinRecords() {
        let queryString =   "SELECT U.id, U.bookname, CONCAT(A.last_name, ' ', A.first_name) AS writer " +
                            "FROM books as U " + 
                            "LEFT JOIN authors AS A ON U.author = A.id;";
        try {
            const [results, metadata] = await this.sequelize.query(queryString);
            console.log(results);
            return results;
        } catch(error) {
            console.log(error);
        }
    }

    async editRecords(q) {
        let queryString = `UPDATE ${q.tableName} SET ${q.column}='${q.newValue}' WHERE id = ${q.id};`
        try {
            const [results, metadata] = await this.sequelize.query(queryString);
        } catch(error) {
            console.log(error);
        }
        
        // console.log(results);
    }

    async deleteRecord(q) {
        const modelAutor = require("../models/" + q.tableName);
        let currentModel = modelAutor(this.sequelize, this.DataTypes, this.Model);
        const row = await currentModel.findOne({
            where: { id: q.id },
        });
        if (row) { await row.destroy();};

    }
}

const objConnect = new ObjConnect();
// objConnect.checkConnection();

module.exports = {
    objConnect: objConnect
}