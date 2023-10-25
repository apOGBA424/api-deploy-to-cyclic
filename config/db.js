
const mongoose = require('mongoose');


// connect to mongodb atlas
const dbUrl = process.env.MONGODB_URI;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
let connection = mongoose.connection;
connection.on('connected', () => console.log(`Mongoose connected App to ${dbUrl}`));
connection.once('error', (err) => { throw err });


module.exports = connection;
