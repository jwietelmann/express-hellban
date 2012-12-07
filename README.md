express-hellban
===============

Express.js middleware for hellbanning lusers.

```javascript

// get the module loaded
var hellban = require('express-hellban');

// create a function to test whether or not a user is banned
var isBanned = function() {
  if(!req.user) {
    return true;
  else {
    return req.user.isBanned; // passport/everyauth middleware generally set req.user
  }
}

// Put this before the rest of your routes 
// The option values you see below are the defaults
app.post('*', hellban(isBanned, {
  log: false,
  failureRate: 1.0,
  minWaitTime: 5000,
  maxWaitTime: 10000,
  onSuccess: function(req, res, next) { next(); },
  onFailure: function(req, res, next) { res.send(500); }
}));
```
