'use strict';

const bodyParser = require('body-parser'),
      is = require('is');

module.exports = function($opts) {
    $opts = Object.assign({
        json: {
            enabled: false,
            inject: '$parser-json',
            options: {}
        },
        raw: {
            enabled: false,
            inject: '$parser-raw',
            options: {}
        },
        text: {
            enabled: false,
            inject: '$parser-text',
            options: {}
        },
        urlencoded: {
            enabled: false,
            inject: '$parser-urlencoded',
            options: {}
        }
    }, $opts);

    return function($$app, $$resolver) {
        Object.keys($opts)
            .forEach(function(name) {
                var cfg = $opts[name];

                if (cfg.enabled) {
                    var parser = bodyParser[name](cfg.options);
                    $$app.use(parser);

                    if (is.string(cfg.inject)) {
                        $$resolver.add(cfg.inject, parser);
                    }
                }
            });
    };
};
