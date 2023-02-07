const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair(); // what is type of key in TypeScript and how can I import this type
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log('public: ' + publicKey);
console.log('private: ' + privateKey);

// generate key pair using elliptic library with secp256k1 algorithm in TS
// import * as elliptic from 'elliptic'; // Error: Cannot find module 'elliptic' in TypeScript although I installed @types/elliptic and I imported

// const secp256k1 = new elliptic.ec('secp256k1');
// const keyPair = secp256k1.genKeyPair();

// console.log(keyPair);

