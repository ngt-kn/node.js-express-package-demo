
// Custom middleware function placehoder for authentication
function auth(req, res, next) {
    console.log('Authenticating...');
    next();
}

module.exports = auth;