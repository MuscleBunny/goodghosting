import Web3 from 'web3';
import * as fs from 'fs';
const GoodGhosting = JSON.parse(fs.readFileSync('./contract/GoodGhostingWhitelisted.json'));

// set provider for all later instances to use

const web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/v3/"));
const GoodGhostingInstance = new web3.eth.Contract(GoodGhosting, "0xc69a569405EAE312Ca13C2eD85a256FbE4992A35");

const res = await GoodGhostingInstance.methods.getNumberOfPlayers().call();
console.log('aaaaaaaaaaaaaaaaaaaa',res);
/*
let address = '0x0069E76F71e866Ad9e35f44267f5b52F43df4F66';
GoodGhostingInstance.methods.players('0x0069E76F71e866Ad9e35f44267f5b52F43df4F66').call().then( (result) => {
    console.log('1', result);
    res.end(result);
});

GoodGhostingInstance.methods.getCurrentSegment().call().then( (result) => {
    console.log('1', result);
    res.end(result);
});*/

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const API_PORT = 3001;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); 

app.get('/player/', (req, res) => {
    let address = '0x0069E76F71e866Ad9e35f44267f5b52F43df4F66';
    console.log("resut");
    GoodGhostingInstance.methods.players().call().then( (result) => {
        console.log('1', result);
        res.end(result);
    });
});

app.get('/currentSeg/', (req, res) => {
    console.log("resut");
    GoodGhostingInstance.methods.getCurrentSegment().call().then( (result) => {
        console.log('2', result);
        res.end(result);
    });
});

app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
});



// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));