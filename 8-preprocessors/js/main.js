// запуск мохова
(function() {
    var $section = $('#postcss-bem'),
        $mokhov = $('#mokhov'),
        $body = $('body');

    $mokhov.appendTo($body);

    $section.attrchange({
        trackValues: true,
        callback: function(event) {
            if (event.attributeName !== 'class') {
                return;
            }

            if (!/present/.test(event.newValue)) {
                $mokhov.hide();
                $mokhov.css('animation-name', 'null');
                return;
            }

            $mokhov.show();
            $mokhov.css('animation-name', 'move_mokhov');
        }
    });
}());