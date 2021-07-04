const mongoose = require('mongoose');

export const initMongo = async () => {
  const connect = async () => {
    mongoose.Promise = global.Promise;

    const options = {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      auth: {authdb: process.env.DB_NAME},
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    try {
      await mongoose.connect(
        `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
        options,
      );

      console.log('****************************');
      console.log('*    Starting Server');
      console.log(`*    Port: ${process.env.PORT || 3000}`);
      console.log(`*    MODE: ${process.env.MODE}`);
      console.log(`*    Database: MongoDB`);
      console.log(`*    DB Connection: OK\n****************************\n`);

      //mongoose.set('debug', true);
    } catch (e) {
      console.log(`*    DB Connection: ERROR\n****************************\n`);
      console.error(e);

      await connect();
    }

    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
  };
  await connect();

  mongoose.connection.on('error', console.error);
  mongoose.connection.on('disconnected', connect);
};
