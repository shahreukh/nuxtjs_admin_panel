const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://admin**%4D%4F@10.8.8.16:27019/admin?authSource=admin123';

MongoClient.connect(URL, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("MongoDB'ye başarıyla bağlandı");
});

async function getfindOne(table, query = {}) {
  return new Promise(function (resolve, reject) {
      MongoClient.connect(URL, (err, client) => {
          if (err) {
              resolve(err);
              console.log(err)
              return;
          }
          try {
              const db = client.db('robot');
              db.collection(table).findOne(query, (err, result) => {
                if (err) {
                    console.log('if icine düşsdü');
                    console.log(err)
                    resolve(err);
                }
              client.close();
              resolve(result);
          });
          } catch (error) {
            console.log('catch icine düşsdü');
              resolve(error);
          }
      })
  })
}

async function signupUser(name, email, password) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, client) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      const db = client.db('robot');
      db.collection('users').insertOne({ name, email, password }, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        client.close();
        console.log("Kullanıcı başarıyla eklendi");
        resolve();
      });
    });
  });
}

async function getflogs(userId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, client) => {
      if (err) {
        console.log('getFlogs','error', err);
        reject(err);
      }
 
      const db = client.db('robot');
      
      db.collection('flogs').find({userId: userId}).toArray((err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        client.close();
        resolve(result);
    
      });
    });
  });
}

async function gettlogs(userId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (err, client) => {
      if (err) {
        console.log('gettlogs','error', err);
        reject(err);
      }
      const db = client.db('robot'); 
      db.collection('tlogs').find({userId: userId}).toArray((err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        client.close();
        resolve(result);
      });
    });
  });
}

module.exports = {
    getfindOne,
    signupUser,
    getflogs,
    gettlogs
}
