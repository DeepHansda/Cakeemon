const mongoose = require('mongoose');

const connectDatabase = () =>{
const mongoURI = process.env.MONGOURI || 'mongodb://localhost:27017/cakeemon'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}

mongoose.connect(mongoURI, options).then((res) => {
    console.log('mongodb connected!')
}).catch(err => console.log(err));
}

module.exports = connectDatabase;