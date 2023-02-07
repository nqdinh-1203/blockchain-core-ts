import { SHA256 } from "crypto-js";
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    fromAddress: string | null;
    toAddress: string;
    amount: number;
    signature: any;

    constructor(_from: string, _to: string, _amount: number) {
        this.fromAddress = _from;
        this.toAddress = _to;
        this.amount = _amount;
    }

    createHash(): string {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    sign(signingKey: any) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets!");
        }

        const hashTx = this.createHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if (this.fromAddress === null) {
            return true;
        }
        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.createHash(), this.signature);
    }
}

export default Transaction