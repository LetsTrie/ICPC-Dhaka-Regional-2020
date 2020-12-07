const mongoose = require('mongoose');

let dbAdress;
if (process.env.NODE_ENV === 'production') {
  dbAdress = process.env.mongoStringProd;
} else {
  dbAdress = process.env.mongoString;
}

const databaseSetup = () => {
  mongoose.connect(
    dbAdress,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log('Database connected');
    }
  );
};

module.exports = databaseSetup;
