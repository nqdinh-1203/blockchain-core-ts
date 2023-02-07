import * as dotenv from 'dotenv'
dotenv.config()

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

import Blockchain from "./Blockchain";
import Transaction from "./Transaction";

const alice = ec.keyFromPrivate(`${process.env.ALICE_PRIVATE_KEY}`);
const aliceWalletAddress = alice.getPublic('hex');

const bob = ec.keyFromPrivate(`${process.env.BOB_PRIVATE_KEY}`);
const bobWalletAddress = bob.getPublic('hex');

let dinhChain = new Blockchain;

const tx1 = new Transaction(aliceWalletAddress, bobWalletAddress, 10);
tx1.sign(alice);
const tx2 = new Transaction(bobWalletAddress, aliceWalletAddress, 50);
tx2.sign(bob);

dinhChain.addTransaction(tx1);
dinhChain.addTransaction(tx2);

console.log('Start mining...');
dinhChain.minePendingTransactions(aliceWalletAddress);

console.log("Alice balance: " + dinhChain.getBalanceOfAddress(aliceWalletAddress));

console.log(dinhChain.isValidChain());

console.log("Bob balance: " + dinhChain.getBalanceOfAddress(bobWalletAddress));
