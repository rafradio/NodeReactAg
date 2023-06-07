const authors = require("./authors");

const connectDB = async function() {
    const modelAutor = require("./authors");
    const {Sequelize, DataTypes, Model} = require("sequelize");
    const sequelize = new Sequelize('nodemysql', 'root', '7783Rafraikk@', {
        host: 'localhost',
        dialect: 'mysql' 
    });

    try {
        await sequelize.authenticate();
        console.log('Connection to nodereact has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    let authors = modelAutor(sequelize, DataTypes, Model);
    const authorsData = await authors.findAll();
    // console.log("All users:", JSON.stringify(authorsData, null, 2));
    modelsData = JSON.stringify(authorsData, null, 2);
    console.log("All users:", modelsData);
    return modelsData;
    
}

module.exports = {
    connectDB: connectDB
}