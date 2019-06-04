'use strict';

var hexmap = function hexmap() {

    //________________________________________________
    // GET/SET defaults
    //________________________________________________

    // private variables
    var svg = undefined;
    var dispatch = d3.dispatch('customHover');

    // getter setter defaults
    var opts = {
        width: 960,
        height: 500,
        margin: { top: 20, right: 10, bottom: 20, left: 10 }
    };

    var hexbin = d3.hexbin().size([opts.width, opts.height]).radius(5);

    var color = d3.scale.linear().domain([14, 15, 35, 132]).range(['#000', '#bae4b3', '#74c476', '#238b45']).interpolate(d3.interpolateHcl);

    //________________________________________________
    // RENDER
    //________________________________________________

    function exports(_selection) {

        var canvas = _selection.append('canvas').attr('width', opts.width).attr('height', opts.height).attr('id', 'mapCanvas');

        var context = canvas.node().getContext('2d');
        var points = [];
        var hexagons = [];

        var projection = d3.geo.wagner7().rotate([0, 0]).scale(180).center([0, 0]);

        context.fillStyle = 'tomato';
        context.strokeStyle = 'none';

        var path = d3.geo.path().projection(projection).context(context);

        d3.json('world-110m.json', function (error, world) {
            if (error) throw error;
            path(topojson.feature(world, world.objects.land));
            context.fill();

            // use the canvas as the image
            var image = document.getElementById('mapCanvas');;

            context.drawImage(image, 0, 0, opts.width, opts.height);
            image = context.getImageData(0, 0, opts.width, opts.height);

            // rescale the colors
            for (var c, i = 0, n = opts.width * opts.height * 4, d = image.data; i < n; i += 4) {
                points.push([i / 4 % opts.width, Math.floor(i / 4 / opts.width), d[i]]);
            }

            hexagons = hexbin(points);
            hexagons.forEach(function (d) {
                d.mean = d3.mean(d, function (p) {
                    return p[2];
                });
            });

            var svg = _selection.append('svg').attr('width', opts.width).attr('height', opts.height);

            var hexagon = svg.append('g').attr('class', 'hexagons').selectAll('path').data(hexagons).enter().append('path').attr('d', hexbin.hexagon(4.5)).attr('transform', function (d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            }).style('fill', function (d) {
                return color(d.mean);
            });
        });
    } // exports

    function getImage(path, callback) {
        var image = new Image();
        image.onload = function () {
            callback(image);
        };
        image.src = path;
    }

    //________________________________________________
    // GET/SET 
    //________________________________________________

    function getSet(option, component) {
        return function (_) {
            if (!arguments.length) {
                return this[option];
            }

            this[option] = _;

            return component;
        };
    }

    // api for chart, all items in `opts` object made into get-set
    for (var key in opts) {
        exports[key] = getSet(key, exports).bind(opts);
    }

    d3.rebind(exports, dispatch, 'on');
    return exports;
};