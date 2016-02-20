require('fs').watch('./', function (event, filename) {
    console.log(`Event is: ${event}`);
    console.log(`Filename: ${filename}`);
});
