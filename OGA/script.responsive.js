/* Created by Artisteer v4.1.0.59861 */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, curly:false, browser:true, jquery:false */
/*global jQuery */

var responsiveDesign = {
    breakpoints: {
        desktopMin: 1000,
        tabletMin: 768
    },
    isResponsive: false,
    isDesktop: false,
    isTablet: false,
    isPhone: false,
    windowWidth: 0,
    responsive: (function ($) {
        "use strict";
        return function () {
            var html = $("html");
            this.windowWidth = $(window).width();
            var nextResponsive = this.windowWidth < this.breakpoints.desktopMin;
            var nextTablet = nextResponsive && this.windowWidth >= this.breakpoints.tabletMin;
            var nextPhone = nextResponsive && !nextTablet;
            var triggerEvent = nextResponsive !== this.isResponsive ||
                nextTablet !== this.isTablet ||
                nextPhone !== this.isPhone;

            this.isResponsive = nextResponsive;
            this.isTablet = nextTablet;
            this.isPhone = nextPhone;
            this.isDesktop = !nextResponsive;

            html
                .toggleClass("responsive", this.isResponsive)
                .toggleClass("desktop", this.isDesktop)
                .toggleClass("responsive-tablet", this.isTablet)
                .toggleClass("responsive-phone", this.isPhone);

            if (triggerEvent) {
                $(window).trigger("responsive", this);
            }

            $(window).trigger("responsiveResize", this);
        };
    })(jQuery),
    initialize: (function ($) {
        "use strict";
        return function () {
            var resizeTimeout;
            $(window).on("resize orientationchange", function () {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function () { responsiveDesign.responsive(); }, 25);
            });
            $(window).trigger("resize");
        };
    })(jQuery)
};

function responsiveAbsBg(responsiveDesign, el, bg) {
    "use strict";
    if (bg.length === 0)
        return;

    var desktopBgTop = bg.attr("data-bg-top");
    var desktopBgHeight = bg.attr("data-bg-height");

    if (responsiveDesign.isResponsive) {
        if (typeof desktopBgTop === "undefined" || desktopBgTop === false) {
            bg.attr("data-bg-top", bg.css("top"));
            bg.attr("data-bg-height", bg.css("height"));
        }

        var elTop = el.offset().top;
        var elHeight = el.outerHeight();
        bg.css("top", elTop + "px");
        bg.css("height", elHeight + "px");
    } else if (typeof desktopBgTop !== "undefined" && desktopBgTop !== false) {
        bg.css("top", desktopBgTop);
        bg.css("height", desktopBgHeight);
        bg.removeAttr("data-bg-top");
        bg.removeAttr("data-bg-height");
    }
}

var responsiveImages = (function ($) {
    "use strict";
    return function (responsiveDesign) {
        $("img[width]").each(function () {
            var img = $(this), newWidth = "", newMaxWidth = "", newHeight = "";
            if (responsiveDesign.isResponsive) {
                newWidth = "auto";
                newHeight = "auto";
                newMaxWidth = "100%";

                var widthAttr = img.attr("width");
                if (widthAttr !== null && typeof (widthAttr) === "string" && widthAttr.indexOf("%") === -1) {
                    newWidth = "100%";
                    newMaxWidth = parseInt($.trim(widthAttr), 10) + "px";
                }
            }
            img.css("width", newWidth).css("max-width", newMaxWidth).css("height", newHeight);
        });
    };
})(jQuery);

var responsiveVideos = (function ($) {
    "use strict";
    return function (responsiveDesign) {
        $("iframe,object,embed").each(function () {
            var obj = $(this);
            var container = obj.parent(".oga-responsive-embed");
            if (responsiveDesign.isResponsive) {
                if (container.length !== 0)
                    return;
                container = $("<div class=\"oga-responsive-embed\">").insertBefore(obj);
                obj.appendTo(container);
            } else if (container.length > 0) {
                obj.insertBefore(container);
                container.remove();
            }
        });
    };
})(jQuery);

var responsiveTextblocks = (function ($) {
    "use strict";
    return function (slider, responsiveDesign) {
        slider.find(".oga-textblock").each(function () {
            if (parseInt(slider.attr("data-width"), 10) === 0) {
                return true;
            }
            var tb = $(this);
            var c = slider.width() / slider.attr("data-width");
            tb.css({
                "height": "",
                "width": "",
                "top": "",
                "margin-left": ""
            });
            if (responsiveDesign.isResponsive) {
                var tbHeight = parseInt(tb.css("height"), 10);
                var tbWidth = parseInt(tb.css("width"), 10);
                var tbTop = parseInt(tb.css("top"), 10);
                var tbMargin = parseInt(tb.css("margin-left"), 10);
                tb.add(tb.children()).css({
                    "height": tbHeight * c,
                    "width": tbWidth * c
                });
                tb.css("top", tbTop * c);
                tb.attr("style", function (i, s) { return s + "margin-left: " + (tbMargin * c) + "px !important"; });
            }
        });
    };
})(jQuery);

var responsiveSlider = (function ($) {
    "use strict";
    return function (responsiveDesign) {
        $(".oga-slider").each(function () {
            var s = $(this);

            responsiveTextblocks(s, responsiveDesign);

            if (!responsiveDesign.isResponsive) {
                s.removeAttr("style");
                return;
            }

            // set size
            var initialWidth = s.attr("data-width");
            var initialHeight = s.attr("data-height");
            var c = s.width() / initialWidth;
            var h = c * initialHeight;
            s.css("height", h + "px");

            // set slider
            var obj = s.data("slider");
            if (obj && obj.settings.helper) {
                var inner = s.find(".oga-slider-inner");
                obj.settings.helper.updateSize(inner, { width: initialWidth, height: initialHeight });
            }
        });
    };
})(jQuery);

var responsiveCollages = (function ($) {
    "use strict";
    return function (responsiveDesign) {
        $(".oga-collage").each(function () {
            var collage = $(this);
            var parent = collage.closest(":not(.image-caption-wrapper, .oga-collage)");
            var parentWidth = parent.width();
            var collageWidth = collage.width();
            var sliderOriginalWidth = collage.children(".oga-slider").attr("data-width");
            if (responsiveDesign.isResponsive && collageWidth > parentWidth) {
                collage
                    .add(collage.find(".oga-slider"))
                    .add(collage.closest(".image-caption-wrapper"))
                    .css("width", "100%");
            } else if (!responsiveDesign.isResponsive || collageWidth > sliderOriginalWidth) {
                collage
                    .add(collage.find(".oga-slider"))
                    .add(collage.closest(".image-caption-wrapper"))
                    .css("width", "");
            }
        });
    };
})(jQuery);

var responsiveNavigator = (function ($) {
    "use strict";
    return function (responsiveDesign) {
        $(".oga-slider").each(function () {
            var currentSlider = $(this);
            var currentSliderWidth = currentSlider.width();
            var sliderNavigator = currentSlider.siblings(".oga-slidenavigator");
            if (sliderNavigator.length) {
                if (responsiveDesign.isResponsive) {
                    // left offset
                    var left = sliderNavigator.attr("data-left");
                    var margin = currentSliderWidth - currentSliderWidth * parseFloat(left) / 100 - sliderNavigator.outerWidth(false);
                    if (margin < 0) {
                        sliderNavigator.css("margin-left", margin);
                    }
                    // top
                    var sliderHeight = currentSlider.css("height");
                    // reset top to original value
                    sliderNavigator.css("top", "");
                    // newTop = oldTop - (sliderOrinalHeight - sliderCurrentHeight)
                    var offset = parseInt(sliderNavigator.attr("data-offset") || 0, 10);
                    sliderNavigator.css("top", parseInt(sliderNavigator.css("top"), 10) - (currentSlider.attr("data-height") - parseInt(sliderHeight, 10)) + offset);
                } else {
                    sliderNavigator.removeAttr("data-offset");
                    sliderNavigator.removeAttr("style");
                }
            }
        });
    };
})(jQuery);

jQuery(window).bind("responsive", (function ($) {
    "use strict";
    return function (event, responsiveDesign) {
        responsiveImages(responsiveDesign);
        responsiveVideos(responsiveDesign);
    
        if ($.browser.msie && $.browser.version <= 8) return;
    
        if (responsiveDesign.isResponsive) {
            $(window).on("responsiveResize.slider", function () {
                responsiveSlideshow(responsiveDesign);
            });
        } else {
            $(window).trigger("responsiveResize.slider");
            $(window).off("responsiveResize.slider");
        }
    };
})(jQuery));

function responsiveSlideshow(responsiveDesign) {
    "use strict";
    responsiveCollages(responsiveDesign); // must be first
    responsiveSlider(responsiveDesign);
    responsiveNavigator(responsiveDesign);
}






var responsiveHeader = (function ($) {
    "use strict";
    return function(responsiveDesign) {
        var header = $("header.oga-header");
        var headerSlider = header.find(".oga-slider");

        if (headerSlider.length) {
            var firstSlide = headerSlider.find(".oga-slide-item").first();
            var slidebg = firstSlide.css("background-image").split(",");
            var previousSibling = headerSlider.prev();
            var sliderNav = headerSlider.siblings(".oga-slidenavigator");
            if (slidebg.length && responsiveDesign.isResponsive) {
                header.css("background-image", slidebg[slidebg.length - 1]);
                header.css("min-height", "0");
                // if prev is menu in header
                if (previousSibling.is("nav.oga-nav")) {
                    sliderNav.attr("data-offset", previousSibling.height());
                }
            } else {
                sliderNav.removeAttr("data-offset");
                header.removeAttr("style");
            }
        }
    };
})(jQuery);

jQuery(window).bind("responsiveResize", (function ($) {
    "use strict";
    return function (event, responsiveDesign) {
        responsiveAbsBg(responsiveDesign, $(".oga-header"), $("#oga-header-bg"));
    };
})(jQuery));

jQuery(window).bind("responsive", (function ($) {
    "use strict";
    return function (event, responsiveDesign) {
        if ($.browser.msie && $.browser.version <= 8) return;

        if (responsiveDesign.isResponsive) {
            $(window).on("responsiveResize.header", function () {
                responsiveHeader(responsiveDesign);
            });
        } else {
            $(window).trigger("responsiveResize.header");
            $(window).trigger("resize");
            $(window).off("responsiveResize.header");
        }
    };
})(jQuery));

jQuery(window).bind("responsiveResize", (function ($) {
    "use strict";
    return function (event, responsiveDesign) {
        responsiveAbsBg(responsiveDesign, $("nav.oga-nav"), $("#oga-hmenu-bg"));
    };
})(jQuery));


var responsiveNav = (function ($) {
    "use strict";
    return function (responsiveDesign) {
        var nav = $("nav.oga-nav"), header, headerMarginTop;
        if (responsiveDesign.isResponsive && nav.parents(".oga-header").length > 0) {
            header = $(".oga-header");
            var otherElement = header.children("*:not(nav.oga-nav):first");
            if (otherElement.length > 0)
                nav.appendTo(header);
        }
    };
})(jQuery);

jQuery(window).bind("responsive", function (event, responsiveDesign) {
    "use strict";
    responsiveNav(responsiveDesign);
});



jQuery(function($) {
    "use strict";
    var nav = $("nav.oga-nav");
    var button = nav.find(".oga-menu-btn");
    var menu = nav.find(".oga-hmenu").first();

    if (!button.length || !menu.length) {
        return;
    }

    var setExpanded = function (expanded) {
        button.attr("aria-expanded", expanded ? "true" : "false");
    };

    var closeMenu = function (animate) {
        setExpanded(false);
        if (animate) {
            menu.stop(true, true).slideUp("fast", function () {
                menu.removeClass("visible").css("display", "");
            });
            return;
        }
        menu.removeClass("visible").css("display", "");
    };

    var openMenu = function () {
        setExpanded(true);
        menu.stop(true, true).slideDown("fast", function () {
            menu.addClass("visible").css("display", "");
        });
    };

    button.on("click", function () {
        if (menu.hasClass("visible")) {
            closeMenu(true);
            return;
        }
        openMenu();
    });

    $(document).on("click", function (event) {
        if (!responsiveDesign.isResponsive || !menu.hasClass("visible")) {
            return;
        }
        if ($(event.target).closest("nav.oga-nav").length === 0) {
            closeMenu(true);
        }
    });

    $(document).on("keyup", function (event) {
        if (event.key === "Escape" && menu.hasClass("visible")) {
            closeMenu(true);
            button.trigger("focus");
        }
    });

    $(window).on("responsive", function (event, state) {
        if (!state.isResponsive) {
            closeMenu(false);
        }
    });
});

jQuery(window).bind("responsiveNav", (function ($) {
    /*global menuExtendedCreate */
    "use strict";
    return function (event, options) {
        if (options.isDesktopNav && $("li.ext").length > 0) {
            menuExtendedCreate();
        }
    };
})(jQuery));

/*global jQuery, responsiveDesign*/


var responsiveLayoutCell = (function ($) {
    "use strict";
    return function (responsiveDesign) {
        $(".oga-content .oga-content-layout-row,.oga-footer .oga-content-layout-row").each(function () {
            var row = $(this);
            var rowChildren = row.children(".oga-layout-cell");
            if (rowChildren.length > 1) {
                if (responsiveDesign.isTablet) {
                    rowChildren.addClass("responsive-tablet-layout-cell").each(function (i) {
                        if ((i + 1) % 2 === 0) {
                            $(this).after("<div class=\"cleared responsive-cleared\">");
                        }
                    });
                } else {
                    rowChildren.removeClass("responsive-tablet-layout-cell");
                    row.children(".responsive-cleared").remove();
                }
            }
        });
    };
})(jQuery);

jQuery(window).bind("responsive", function (event, responsiveDesign) {
    "use strict";
    responsiveLayoutCell(responsiveDesign);
});


var responsiveLayoutCell = (function ($) {
    "use strict";
    return function (responsiveDesign) {
        $(".oga-content .oga-content-layout-row,.oga-footer .oga-content-layout-row").each(function () {
            var row = $(this);
            var rowChildren = row.children(".oga-layout-cell");
            if (rowChildren.length > 1) {
                if (responsiveDesign.isTablet) {
                    rowChildren.addClass("responsive-tablet-layout-cell").each(function (i) {
                        if ((i + 1) % 2 === 0) {
                            $(this).after("<div class=\"cleared responsive-cleared\">");
                        }
                    });
                } else {
                    rowChildren.removeClass("responsive-tablet-layout-cell");
                    row.children(".responsive-cleared").remove();
                }
            }
        });
    };
})(jQuery);

jQuery(window).bind("responsive", function (event, responsiveDesign) {
    "use strict";
    responsiveLayoutCell(responsiveDesign);
});




if (!jQuery.browser.msie || jQuery.browser.version > 8) {
    jQuery(responsiveDesign.initialize);
}
