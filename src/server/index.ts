import { fstat } from "fs";

let express = require('express');
let cors = require('cors')
//import { faucet } from './faucet';
let {faucet} = require('./faucet')
let dotenv = require('dotenv')

let {faucet_config} = require('../common/config');
var favicon = require('serve-favicon')
var path = require('path')

dotenv.config()

const app = express();

export interface ReqData  {  
  FixedAmountRequest: {
      recipient: string
  }
};
app.use(cors());
app.use(express.json());
app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')))

app.post('/v1/gas', (req, res) => {
  if(req.header('Content-Type')  == 'application/json'){
    console.log('body:' + req.body as unknown as string);
    let data:ReqData = req.body;

    let ret = faucet(data.FixedAmountRequest.recipient)
    ret.then(function(result) {
      console.log(result);
      res.json(result);
    }, function(err) {
      console.log(err);
      res.json(err);
    });
    console.log(data);
  } else{
    console.log("error Content-Type,header:" + req.headers);
  }
    
});


app.get('/v1/gas', (req, res) => {
    let recipient = req.query['recipient'] as unknown as string
    console.log('recipient=',recipient);
    let ret = faucet(recipient)
    ret.then(function(result) {
      console.log(result);
      res.json(result);
    }, function(err) {
      console.log(err);
      res.json(err);
    });
    
});

const msg = `request faucet sui on testnet.

<html>
<body>
<p>
use json rpc to request faucet on test net 
your address  need  have ${faucet_config.mainnet_balance_limit/1e9} SUI @mainnet:
<div> 
 <code>
 https://faucet-rpc.vercel.app/v1/gas?recipient=0xafe36044ef56d22494bfe6231e78dd128f097693f2d974761ee4d649e61f5fa2 
  
</code>
</div>
</p>
</body>
</html>
`;

app.get('/',(req,res)=>{
  res.send(msg)
});

export default app;


if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}




/**
curl --location --request POST 'https://faucet.testnet.sui.io/v1/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0x5e23b1067c479185a2d6f3e358e4c82086032a171916f85dc9783226d7d504de"
    }
}'


curl --location --request POST 'http://localhost:3001/v1/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0xafe36044ef56d22494bfe6231e78dd128f097693f2d974761ee4d649e61f5fa2"
    }
}'

curl --location --request POST 'http://localhost:3001/v1/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "0x540105a7d2f5f54a812c630f2996f1790ed0e60d1f9a870ce397f03e4cec9b38"
    }
}'


 */
