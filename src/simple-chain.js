const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {

    chain: "",

    getLength() {
        return this.chain.length;
    },
    addLink(value = "") {
        this.chain += this.getLength() ? `~~( ${value} )` : `( ${value} )`;
        return this;
    },
    removeLink(position) {
        let target = "~~";
        let pos = -1;
        let countChain = 0;
        let count = 0;


        while ((pos = this.chain.indexOf(target, pos + 1)) != -1) {
            countChain++;
        }

        if (isNaN(position)  || position%1 != 0 || position < 1 || position > countChain + 1) {
          this.chain = "";
          throw new Error("You can't remove incorrect link!");
        }

        if (position == 1) {
            this.chain = this.chain.slice(this.chain.indexOf(target) + 2);
        } else {
            count = 0;
            while ((pos = this.chain.indexOf(target, pos + 1)) != -1) {
                count++;
                if (count == position - 1) break;
            }

            if (countChain == count) {
                this.chain = this.chain.slice(0) + this.chain.slice(this.chain.indexOf(target, pos + 2))
            } else {
                this.chain = this.chain.slice(0, pos) + this.chain.slice(this.chain.indexOf(target, pos + 2))
            }
        }


        return this;
    },
    reverseChain() {
        this.chain = this.chain.split("~~").reverse().join("~~");
        return this;
    },
    finishChain() {
        let finishChain = this.chain;
        this.chain = "";
        return finishChain;
    }

};

module.exports = {
    chainMaker
};