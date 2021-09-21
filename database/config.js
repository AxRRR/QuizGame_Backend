const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.DB_CNN);
        console.log('Database: Successful Connection');


    } catch (error) {
        console.log(error);
        throw new Error('Error: Database no connection');
    }


}


module.exports = {
    dbConnection
}