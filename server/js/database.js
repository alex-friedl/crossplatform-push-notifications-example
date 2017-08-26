const DuplicateKeyError = require('./errors.js').DuplicateKeyError;
const debug = require('debug')('push:database');
const mongoose = require('mongoose');

const mongoHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
mongoose.Promise = Promise;
mongoose.connect(`mongodb://${mongoHost}/push-demo`, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', err => debug('Database connection error:', err));
db.once('open', () => debug('Opened connection to MongoDB'));

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    unique: true,
  },
});
const DeviceToken = mongoose.model('DeviceToken', tokenSchema);

module.exports = {

  saveDeviceToken: async (token) => {
    debug('Trying to store new DeviceToken', token);
    const t = new DeviceToken({ token });
    try {
      const result = await t.save();
      return Promise.resolve(result);
    } catch (e) {
      if (e.code === 11000) {
        /* duplicate key error istotally acceptable for our use case 
         * where device tokens are being regularly sent by clients */
        debug(`Ignoring duplicate token ${token}`);
        return Promise.reject(new DuplicateKeyError(`Token ${token} already stored in DB`));
      }
      return Promise.reject(e);
    }
  },

  fetchDeviceTokens: async () => {
    const tokens = await DeviceToken.find().select('token').exec();
    return tokens.map(d => d.token);
  },
};
