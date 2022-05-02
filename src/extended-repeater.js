const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {

    str = `${str}`;

    let { repeatTimes = 1, separator = '+', addition = "", additionRepeatTimes = 0, additionSeparator = '|' } = options;
    addition = `${addition}`;

    let repeatStr = ""
    

    for (let i = 0; i < repeatTimes; i++) {
        repeatStr += `${str}`
        for (let j = 0; j < additionRepeatTimes - 1; j++) {
            repeatStr += `${addition}${additionSeparator}`
        }
        repeatStr += `${addition}${separator}`
    }

    let lastSeparator = str.lastIndexOf(separator)
    repeatStr = repeatStr.slice(0, lastSeparator - separator.length + 1)

    return repeatStr;
}

module.exports = {
    repeater
};