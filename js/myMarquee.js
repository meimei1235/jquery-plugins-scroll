(function($) {
    $.fn.myMarquee = function(options) {
        var opts = $.extend(true, $.fn.myMarquee.defaults, options);
		return this.each(function() {
            var $marquee = $(this);
            var obj = $marquee.get(0);
            var w = $marquee.width();
            var h = $marquee.height();
            var element = $marquee.children();
            var childs = element.children();
            var size = 0;

            // 滚动类型：1：左右，0：上下
            var type = (opts.direction == "left" || opts.direction == "right") ? 1 : 0;
            element.css(type ? "width" : "height", 10000);
            if (!opts.isEqual) {
                childs.each(function() {
                    size += $marquee[type ? "outerWidth" : "outerHeight"]();
                });
            } else {
                size += childs[type ? "outerWidth" : "outerHeight"]() * childs.length;
            }
            if (size <= (type ? w : h)) {
                return;
            }

            element.append(childs.clone()).css(type ? "width" : "height", size * 2);

            var move = setInterval(scrollF, opts.delay);
            var moveNum = 0;

            function scrollF() {
                var dir = (opts.direction == "left" || 　opts.direction == "right") ? "scrollLeft" : "scrollTop";
                if (opts.loop > 0) {
                    moveNum += opts.scrollAmount;
                    if (moveNum > size * opts.loop) {
                        obj[dir] = 0;
                        return clearInterval(move);
                    }
                }
                if (opts.direction == "left" || opts.direction == "up") {
                    var pos = obj[dir] + opts.scrollAmount;
                    if (pos >= size) {
                        pos -= size;
                    }
                    obj[dir] = pos;
                } else {
                    var pos = obj[dir] - opts.scrollAmount;
                    if (pos <= 0) {
                        pos += size;
                    }
                    obj[dir] = pos;
                }
            }
            $marquee.hover(function() {
                clearInterval(move);
            }, function() {
                clearInterval(move);
                move = setInterval(scrollF, opts.delay);
                /* Stuff to do when the mouse leaves the element */
            });


        });
    };
    $.fn.myMarquee.defaults = {
        loop: 0,
        direction: "left",
        scrollAmount: 1,
        delay: 20,
        isEqual: true
    };
    $.fn.myMarquee.setDefaults = function(options) {
        $.$.extend($.fn.myMarquee.defaults, options);

    };
})(jQuery)