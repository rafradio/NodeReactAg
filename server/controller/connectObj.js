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
        let authors = modelAutor(this.sequelize, this.DataTypes, this.Model);
        const authorsData = await authors.findAll();
        // console.log("All users:", JSON.stringify(authorsData, null, 2));
        let modelsData = JSON.stringify(authorsData, null, 2);
        console.log("All users:", modelsData);
        return modelsData;

    }
}

const objConnect = new ObjConnect();
// objConnect.checkConnection();

module.exports = {
    objConnect: objConnect
}