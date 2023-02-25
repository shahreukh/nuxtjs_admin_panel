const mysql = require("mysql2");
var con = mysql.createPool({
    host: "10.8.8.18",
    user: "admin",
    password: "password",
    database: "admin_g",
    connectionLimit: 10000,
  }
);

con.getConnection((err, connection) => {
    if (err) {
        console.log("MySQL Veritabanına bağlanırken hata oluştu:" + err);
    } else {
        console.log("MySQL veritabanına başarıyla bağlanıldı!");
        connection.release();
    }
});


function getUsersList() {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM users WHERE robot = 1 OR oldrobot = 1', function (err, rows, f) {
      if (err) {
        resolve([]);
        return;
      }
      resolve(rows);
    })
  });
}

function getPaymentsBot(userid) {
  return new Promise((resolve, reject) => {
    
    con.query(`select * from PBot where user_id=${userid}`, function (err, rows, f) {
      if (err) {
        console.log('getPBot', 'error', err);
        resolve([]);
        return;
      }
      resolve(rows);
    })
  });
}

function getPayments(userid) {
  return new Promise((resolve, reject) => {
    
    con.query(`select * from paymnts where user_id=${userid}`, function (err, rows, f) {
      if (err) {
        console.log('getPayments', 'error', err);
        resolve([]);
        return;
      }
      resolve(rows);
    })
  });
}


module.exports = {
    getUsersList,
    getPayments,
    getPaymentsBot
}


