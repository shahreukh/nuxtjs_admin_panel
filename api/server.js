const express = require('express');
const app = express();
app.use(express.json()); 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());
const jwt = require('jsonwebtoken');
const mysql = require('../db/mysql_db');
const mongo = require('../db/mongoClient');
const fileGetContents = require('file-get-contents');


// Futures Sat
app.post('/sellfutures', async (req, res) => {
  const body = req.body;
  const userId = parseInt(body['userid']);
  let robot = await mongoClient.getfind('robots', {
    'userId': userId
  });
  robot = robot[0];
  const tradeId = req.query.tradeId;
  
  let adres = `http://${robot.serverIp}:3554/futuebuysell?traderId=${tradeId}`;
  await axios.get(adres)
    .then(r => console.log("FA DEL", r))
    .catch(e => console.log("FA DEL" + e))

  res.send('OK')

});
// Spot Sat
app.post('/sellspot', async (req, res) => {
  const body = req.body;
  const userId = parseInt(body['userid']);
  let robot = await mongoClient.getfind('robots', {
    'userId': userId
  });
  robot = robot[0];
  const serverIp = robot.serverIp;
  const tradeId = req.query.tradeId;

  const uri = `http://${serverIp}:3554/manualsell?tradeId=${tradeId}`;

  await axios.get(uri)
    .then(r => res.send(res))
    .catch(e => res.send('error:' + e))

  return;
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await mongo.getfindOne('users',{ email: email, password: password });
    if (!users) {
      throw new Error('Yanlis e-posta veya sifre');
    }
    const role = users.role;
    const token = jwt.sign({ email: email, role: users.role  }, 'secretKey', { expiresIn: '1h' });
    
    res.status(200).send({ message: 'Login successful', token: token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});


app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(!email || !password) {
      res.status(400).send({ message: 'E-posta ve şifre gerekli' });
      return;
    }
    // check if user already exists
    const existingUser = await mongo.getfindOne('users', { email: email });
    if(existingUser) {
      res.status(400).send({ message: 'Bu e-posta zaten kayıtlı' });
      return;
    }
    // create new user
    await mongo.signupUser(name, email, password);
    res.status(200).send({ message: 'Signup successful' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});


app.post('/futures', async (req, res) => {
  const body = req.body;
  const userId = parseInt(body['userid']);
  const futurelogs = await mongo.getFuturelogs(userId);
  res.json(futurelogs);
});


app.post('/spot', async (req, res) => {
  const body = req.body;
  const userId = parseInt(body['userid']);
  const tradelogs = await mongo.getTradelogs(userId);
  res.json(tradelogs);
});


app.get('/users', async (req, res) => {
  const users = await mysql.getUsersList();
  res.send(users);
});

app.post('/payments', async (req, res) => {
  const body = req.body;
  const userid = parseInt(body['userid']);
  const users = await mysql.getPayments(userid);
  res.send(users);
});

app.post('/paymentsbot', async (req, res) => {
  const body = req.body;
  const userid = parseInt(body['userid']);
  const users = await mysql.getPaymentsBot(userid);
  res.send(users);
});

app.post('/robots', async (req, res) => {
  const body = req.body;
  const userId = parseInt(body['userid']);
  const robot = await mongo.getfindOne('robots', { userId });
  if(robot){
    res.send(robot.serverIp); 
  }else{
    res.send("userId not found");
  }
});

app.post('/errorlogs', async (req, res) => {
  const body = req.body;
  const userId = parseInt(body['userid']);
  const robot = await mongo.getfindOne('errorLogs', { userId });
  res.status(200).send([robot]);
});


app.get('/userinfo', async (req, res) => {
  try {
    const users = await mongo.getfindOne('users');
    res.status(200).send([users]);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post('/servercheck', async (req, res) => {
  try {
    const body = req.body;
    const userId =  parseInt(body['userid']);
  
    const rbt = await mongo.getfindOne('robots', {
      userId: userId
    });
    let uri = '';
    try {
      uri = "http://" + rbt.serverIp + `:3554/servercheck`;    
    } catch {    }
    
    fileGetContents(uri).then(json => {
      const rtn = json;
      return res.send(rtn)

    }).catch(err => {
      console.log(`Unable to get content from. Reason: ${err.message}`);
      return res.send('error')
    });
    
  } catch (error) {
    res.send({error});
  }
});

app.post('/spotbnb', async (req, res) => {
  try {
    const body = req.body;
    const userId =  parseInt(body['userid']);
  
    const rbt = await mongo.getfindOne('robots', {
      userId: userId
    });
    let uri = '';
    try {
      uri = "http://" + rbt.serverIp + `:3554/getbalance?market=BNB`    
    } catch {    }
    
    fileGetContents(uri).then(json => {
      const rtn = json;
      console.log(rtn)  
      return res.send(rtn)

    }).catch(err => {
      console.log(`Unable to get content from. Reason: ${err.message}`);
      return res.send('error')
    });
    
  } catch (error) {
    res.send({error});
  }
});

app.post('/futuresbnb', async (req, res) => {
  try {
    const body = req.body;
    const userId =  parseInt(body['userid']);
  
    const rbt = await mongo.getfindOne('robots', {
      userId: userId
    });
    let uri = '';
    try {
      uri = "http://" + rbt.serverIp + `:3554/getbalancefuture?market=BNB`    
    } catch {    }
    
    fileGetContents(uri).then(json => {
      const rtn = json;
      console.log(rtn)  
      return res.send(rtn)

    }).catch(err => {
      console.log(`Unable to get content from. Reason: ${err.message}`);
      return res.send('error')
    });
    
  } catch (error) {
    res.send({error});
  }
});

app.post('/futuresusdt', async (req, res) => {
  try {
    const body = req.body;
    const userId =  parseInt(body['userid']);
  
    const rbt = await mongo.getfindOne('robots', {
      userId: userId
    });
    let uri = '';
    try {
      uri =  "http://" + rbt.serverIp + `:3554/getbalancefuture?market=USDT`    
    } catch {    }
    
    fileGetContents(uri).then(json => {
      const rtn = json;
      console.log(rtn)  
      return res.send(rtn)

    }).catch(err => {
      console.log(`Unable to get content from. Reason: ${err.message}`);
      return res.send('error')
    });
    
  } catch (error) {
    res.send({error});
  }
});

app.post('/spotusdt', async (req, res) => {
  try {
    const body = req.body;
    const userId =  parseInt(body['userid']);
  
    const rbt = await mongo.getfindOne('robots', {
      userId: userId
    });
    let uri = '';
    try {
      uri =  "http://" + rbt.serverIp + `:3554/getbalance?market=USDT`  
    } catch {    }
    
    fileGetContents(uri).then(json => {
      const rtn = json;
      console.log(rtn)  
      return res.send(rtn)

    }).catch(err => {
      console.log(`Unable to get content from. Reason: ${err.message}`);
      return res.send('error')
    });
    
  } catch (error) {
    res.send({error});
  }
});


app.get('/test', async (req, res) => {
  res.status(200).send({ message: 'Login successful' });
});

app.listen(7016, () => {
  console.log('Server started on port 7016');
});

