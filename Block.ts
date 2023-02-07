import { SHA256 } from "crypto-js";

import Transaction from './Transaction';

class Block {
    timestamp: string;
    transactions: Transaction[];
    previousHash: string;
    hash: string;
    nonce: number;

    constructor(_timestamp: string, _transactions: Transaction[], _previousHash: string = "") {
        this.timestamp = _timestamp;
        this.transactions = _transactions;
        this.previousHash = _previousHash;
        this.hash = this.createHash();
        this.nonce = 0;
    }

    createHash(): string {
        return SHA256(this.timestamp + this.transactions.toString() + this.previousHash + this.nonce).toString();
    }

    mine(difficult: number) {
        try {
            while (this.hash.substring(0, difficult) !== Array(difficult + 1).join("0")) {
                this.nonce++;
                this.hash = this.createHash();
            }

            console.log("Block mined: " + this.hash);
        } catch (error) {
            console.log(error);
        }
    }

    hasAllValidTransactions(): boolean {
        this.transactions.forEach(tx => {
            if (!tx.isValid())
                return false;
        });
        return true;
    }
}

export default Block;