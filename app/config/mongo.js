const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    mongoose.Promise = global.Promise;

    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      auth: {authdb: process.env.DB_NAME},
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose.connect(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
      options,
      (err) => {
        let dbStatus = '';
        if (err) {
          dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`;
        } else {
          dbStatus = `*    DB Connection: OK\n****************************\n`;
        }
        if (process.env.NODE_ENV !== 'test') {
          console.log('****************************');
          console.log('*    Starting Server');
          console.log(`*    Port: ${process.env.PORT || 3000}`);
          console.log(`*    MODE: ${process.env.MODE}`);
          console.log(`*    Database: MongoDB`);
          console.log(dbStatus);
        }
      },
    );
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
  };
  connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);
};
