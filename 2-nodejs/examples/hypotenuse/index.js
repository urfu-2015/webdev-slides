const mathjs = require('mathjs');

module.exports = function calculateHypo(a, b) {
    return mathjs.sqrt(mathjs.pow(a, 2) + mathjs.pow(b, 2));
}
