var forever = require('forever-monitor');
var child = new (forever.Monitor)('app.js', {
  max: 999,
  silent: false,
  args: [process.argv[2]]
});

child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});
child.on('exit:code', function (code) {
  console.log(code);
});
child.on('exit', function () {
  console.log('App has exited after 999 restarts');
});
child.start();