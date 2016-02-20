process.stdin
     .on('data', function(chunk) {
         process.stdout.write('Hello, ' + chunk.toString());
     });
