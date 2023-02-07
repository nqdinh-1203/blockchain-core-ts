import Block from "./Block";
import Transaction from "./Transaction";

class Blockchain {
    chain: Block[];
    pendingTransactions: Transaction[];
    difficult: number;
    miningReward: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.difficult = 3;
        this.miningReward = 100;
    }

    private createGenesisBlock(): Block {
        return new Block("01/01/2023", [], 'null');
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningAddress: string) {
        let block = new Block(Date.now.toString(), this.pendingTransactions);
        block.previousHash = this.getLatestBlock().hash;
        block.mine(this.difficult);

        console.log("Block mined: " + block.hash);
        this.chain.push(block);

        this.pendingTransactions = [new Transaction('', miningAddress, this.miningReward)];
    }

    getBalanceOfAddress(address: string): number {
        let balance = 0;

        this.chain.forEach(block => {
            block.transactions.forEach(trans => {
                if (address === trans.fromAddress)
                    balance -= trans.amount;
                if (address === trans.toAddress) {
                    balance += trans.amount;
                }
            });
        });

        return balance;
    }

    addTransaction(trans: Transaction) {
        if (!trans.fromAddress || !trans.toAddress) {
            throw new Error("Transaction must have from and to address");
        }

        if (!trans.isValid()) {
            throw new Error("Cannot add invalid transaction");
        }

        this.pendingTransactions.push(trans);
    }

    isValidChain(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasAllValidTransactions()) {
                return false;
            }

            // kiểm tra lại hash
            if (currentBlock.hash !== currentBlock.hash) {
                return false;
            }

            // previous hash block hiện tại === hash block trước
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

export default Blockchain