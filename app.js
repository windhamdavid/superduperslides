var path = require('path'),
    flatiron = require('flatiron'),
    app = flatiron.app,
    plugins = flatiron.plugins,
    connect = require('connect'), 
    passport = require('passport');

app.use(plugins.http);

// configuration consists of key/value pairs, not of function blocks associated with
// certain "environments".
// Here's *a* way you can handle environment-based configs; there are others!
app.config.file(path.resolve(
  __dirname,
  'config',
  (process.env.NODE_ENV || 'config') + '.json'
));

// Use our config to set the secret
app.http.before.push(connect.session({
  secret: app.config.get('secret') || 'keyboard cat' //default
}))
app.http.before.push(passport.initialize());
app.http.before.push(passport.session());