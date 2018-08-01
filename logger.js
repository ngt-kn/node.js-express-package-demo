
// Custom middleware function placeholder for logging
function log (req, res, next) {
    console.log('Logging...');
    next();
}

module.exports = log;