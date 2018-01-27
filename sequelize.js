var Sequelize = require('sequelize');
var Promise = require('bluebird');

var poolCfg = require('./connection.json');
var env = process.env;

var db = env.CLEARDB_DB_NAME || poolCfg.database;
var username = env.CLEARDB_USERNAME || poolCfg.user;
var pass = env.CLEARDB_PASSWORD || poolCfg.password;
var host = env.CLEARDB_HOST || poolCfg.host;

var sequelize = new Sequelize(db, username, pass, {
  host: host,
  dialect: 'mysql',
 
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  timestamps: true,
  freezeTableName: true
});

var LogEntry = sequelize.define('LogEntry', {
   score: {
      type: Sequelize.INTEGER,
      default: -1
   },
   chromosome: {
      type: Sequelize.STRING
   },
   generation: {
      type: Sequelize.INTEGER
   },
   botId: {
      type: Sequelize.STRING,
      default: ""
   },
}, {
   freezeTableName: true
});

var DeathEntry = sequelize.define('DeathEntry', {
    username: {
        type: Sequelize.STRING,
        default: "larry"
    },
    xPos: {
        type: Sequelize.INTEGER
    },
    yPos: {
        type: Sequelize.INTEGER
    },
    message: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});


sequelize.sync().then(function() {
   return DeathEntry.findAll();
})
.then(function(entries) {
    // Just for funzies
   var premade_entries = [];
   if (entries.length === 0) {
      // Put in some funni death message for the lulz      
     premade_entries.push({username: "dat_dead_boi", xPos: 1, yPos: 10, message: "I DIED LOL"});
     premade_entries.push({username: "dat_dead_boi", xPos: 1, yPos: 5, message: "I DIED AGAIN LOL"});
     premade_entries.push({username: "old_man", xPos: -1, yPos: -100, message: "excuse me i am lost and alone."});
     premade_entries.push({username: "old_man", xPos: -1, yPos: -101, message: "have you seen my son?"});
   }
   return DeathEntry.bulkCreate(premade_entries);
})
.catch(function(err) {
   console.error("EXTREMELY UNLIKELY ERROR DETECTED " + JSON.stringify(err.message), err.stack);
});

module.exports = {
   DeathEntry: DeathEntry,
   LogEntry: LogEntry,
   do: sequelize
};
