require('babel-polyfill');

function timeout(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

async function legendarily() {
    console.log('Леген...');
    await timeout(1000);

    console.log('подожди-подожди');
    await timeout(1000);

    console.log('...дарно!');
}

// (async () => {
//     await legendarily();
//     console.log('done');
// })()

legendarily()
    .then(() => console.log('done'));
