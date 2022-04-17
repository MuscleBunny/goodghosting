import Web3 from 'web3';
import * as fs from 'fs';
const GoodGhosting = JSON.parse(fs.readFileSync('./contract/GoodGhostingWhitelisted.json'));

// set provider for all later instances to use
const web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/0e91e829e35f4fb0b0f93974280f88c6"));
const GoodGhostingInstance = new web3.eth.Contract(GoodGhosting, "0xc69a569405EAE312Ca13C2eD85a256FbE4992A35");

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const API_PORT = 3001;
const app = express();
app.use(cors());

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.static('public')); 

app.get('/player/', (req, res) => {
    let address = req.query.address;
    GoodGhostingInstance.methods.players(address).call().then( (result) => {
        res.end(JSON.stringify(result));
    });
});

app.get('/currentSeg/', (req, res) => {
    GoodGhostingInstance.methods.getCurrentSegment().call().then( (result) => {
        res.end(JSON.stringify(result));
    });
});

app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
});



// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));