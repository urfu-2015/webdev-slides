function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
        loader.context.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
            }
        );
    };

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    };

    request.send();
};

BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
};

$(function () {
    var buffers, source, destination;
    var ctx = new AudioContext();
    var loader = new BufferLoader(ctx, [
        'voice.mp3',
        'telephone.wav',
        'muffler.wav',
        'echo.wav'
    ], onLoadEnd);

    loader.load();

    function onLoadEnd(data) {
        buffers = data;
        destination = ctx.destination;

        $('body').addClass('ready');
    }

    function simple() {
        source = ctx.createBufferSource();
        source.buffer = buffers[0];

        source.connect(destination);
        source.start(0);
    }

    function gain() {
        source = ctx.createBufferSource();
        source.buffer = buffers[0];

        var gain = ctx.createGain();
        gain.gain.value = Number($('.gain .gain-value').val());

        source.connect(gain);
        gain.connect(destination);

        source.start(0);
    }

    function delay() {
        source = ctx.createBufferSource();
        source.buffer = buffers[0];

        var delay = ctx.createDelay();
        delay.delayTime.value = Number($('.delay .delay-value').val());

        source.connect(delay);
        delay.connect(destination);

        source.start(0);
    }

    function convolution() {
        source = ctx.createBufferSource();
        source.buffer = buffers[0];

        var convolver = ctx.createConvolver();
        convolver.buffer = buffers[$('.convolution input[type=radio]:checked').val()];

        source.connect(convolver);
        convolver.connect(destination);

        $('.radio-group').on('change', function () {
            convolver.buffer = buffers[$('.convolution input[type=radio]:checked').val()];
        });

        source.start(0);
    }

    function filter() {
        source = ctx.createBufferSource();
        source.buffer = buffers[0];

        var filter = ctx.createBiquadFilter();
        filter.type = $('.filter input[type=radio]:checked').val();
        filter.frequency.value = Number($('.frequency-value').val());
        filter.Q.value = Number($('.q-value').val());
        filter.gain.value = Number($('.gain-value').val());

        source.connect(filter);
        filter.connect(destination);

        $('.radio-group').on('change', function () {
            filter.type = $('.filter input[type=radio]:checked').val();
        });

        $('.frequency-value').on('change', function () {
            filter.frequency.value = Number($('.filter .frequency-value').val());

        });
        $('.q-value').on('change', function () {
            filter.Q.value = Number($('.filter .q-value').val());

        });
        $('.gain-value').on('change', function () {
            filter.gain.value = Number($('.filter .gain-value').val());

        });

        source.start(0);
    }

    function echo() {
        source = ctx.createBufferSource();
        source.buffer = buffers[0];

        var gainNode = ctx.createGain();
        var delayNode = ctx.createDelay();

        gainNode.gain.value = Number($('.echo .gain-value').val());
        delayNode.delayTime.value = Number($('.echo .delay-value').val());

        source.connect(gainNode);
        gainNode.connect(delayNode);
        delayNode.connect(gainNode);
        gainNode.connect(destination);

        source.start(0);
    }

    function stop() {
        source.stop(0);
    }

    $('.simple-play .start-button').click(simple);
    $('.gain .start-button').click(gain);
    $('.delay .start-button').click(delay);
    $('.convolution .start-button').click(convolution);
    $('.filter .start-button').click(filter);
    $('.echo .start-button').click(echo);

    $('.stop-button').click(stop);
});
