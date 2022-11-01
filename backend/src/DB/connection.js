const mongoose = require('mongoose');

const connectDatabase = () =>{
const mongoURI = process.env.MONGOUR || 'mongodb://localhost:27017/tapajyoti_db'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}

mongoose.connect(mongoURI, options).then(() => {
    console.log('mongodb connected!')
}).catch(err => console.log(err));
}

module.exports = connectDatabase;