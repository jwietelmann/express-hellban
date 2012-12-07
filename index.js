module.exports = function(fn, options) {;
  if(!options) options = {};
  var log = options.log ? function(x) { console.log(x); } : function() {};

  // configuration and defaults
  var failureRate = options.failureRate || 1; // default is 100% failure
  var minWaitTime = options.minWaitTime || 5000;
  var maxWaitTime = options.maxWaitTime || Math.max(minWaitTime, 10000);
  var onSuccess = options.onSuccess || function(req, res, next) { next(); }; // luser is banned but got lucky
  var onFailure = options.onFail || function(req, res, next) { res.send(500); }; // luser is banned and didn't get lucky

  return function(req, res, next) {

    if(fn(req)) return next(); // true means request is not banned, just go to the next route

    // let's start hell-banning
    var waitTime = Math.floor(Math.random() * (maxWaitTime - minWaitTime) + minWaitTime);
    var success = Math.random() > failureRate;

    log('HELLBAN: Will respond with ' + (success ? 'success' : 'failure') + ' in ' + waitTime + ' milliseconds...');

    var respond = function() {
      log('HELLBAN: Responded.');
      (success ? onSuccess : onFailure)(req, res, next);
    };

    setTimeout(respond, waitTime);
  }
};
