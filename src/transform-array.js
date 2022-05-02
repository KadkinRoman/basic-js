const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {

    if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!")

    let newArr = [...arr];

    let command = {
        '--double-next': function doubleNext(index) {
            if (index !== newArr.length - 1) {
                newArr[index] = newArr[index + 1];
            } else {
                newArr.splice(index, 1);
            }

        },
        '--double-prev': function doublePrev(index) {
            if (index !== 0) {
                newArr[index] = newArr[index - 1];
            } else {
                newArr.splice(index, 1);
            }

        },
        '--discard-prev': function discardPrev(index) {
            if (index !== 0) {
                newArr.splice(index - 1, 2);
            } else {
                newArr.splice(index, 1);
            }
        },
        '--discard-next': function discardNext(index) {
            if (index !== newArr.length - 1) {
                if (Object.keys(command).includes(newArr[index + 2])) {
                    newArr.splice(index, 3);
                } else {
                    newArr.splice(index, 2);
                }
            } else {
                newArr.splice(index, 1);
            }
        }
    }

    newArr.forEach((item, index) => {
        if (Object.keys(command).includes(item)) {
            command[item](index);
        }
    });


    return newArr;
}

module.exports = {
    transform
};