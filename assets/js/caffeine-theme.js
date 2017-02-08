/**
 * caffeine-theme - Minimalist and Elegant theme for Ghost
 * @version 2.8.2
 * @link    https://github.com/kelyvin/caffeine-theme
 * @author  Kelyvin (https://github.com/kelyvin)
 * @license MIT
 */
"use strict";
! function($) {
    $.fn.subbscribe = function(options) {
        function isError(data) {
            return console.log(data), "MailChimp" === settings.list ? "success" !== data.result : "CampaignMonitor" === settings.list ? 400 === data.Status : !0
        }

        function resetFormFields() {
            $("#subbscribe input").each(function() {
                $(this).val("")
            })
        }

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email)
        }

        function formValidation() {
            var valid = !0,
                name = $("#subb-NAME"),
                email = $("#subb-EMAIL");
            return settings.emailonly || (name.val().length < 2 ? (valid = !1, name.addClass("error")) : name.removeClass("error")), validateEmail(email.val()) ? email.removeClass("error") : (valid = !1, email.addClass("error")), valid
        }

        function getCookie(cname) {
            for (var name = cname + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
                for (var c = ca[i];
                    " " === c.charAt(0);) c = c.substring(1);
                if (0 === c.indexOf(name)) return c.substring(name.length, c.length)
            }
            return ""
        }
        var settings = $.extend({
            list: "MailChimp",
            url: "",
            title: "Never miss a post!",
            text: "Get our latest posts and announcements in your inbox. You won't regret it!",
            name: "Subbscribe",
            color: "#ee6262",
            thumbnail: "https://s3-ap-southeast-2.amazonaws.com/subbscribe/img/avatar.png",
            emailonly: !1,
            cm_mail_field: "",
            delay: 0
        }, options);
        if ("" === settings.url) return void console.log("Subbscribe Error: You must provide a valid MailChimp form URL.");
        if ("CampaignMonitor" === settings.list && !settings.cm_mail_field.length) return void console.log("You must provide the mail input name. Found in the form code from Campaign Monitor");
        var _name = "",
            _email = "",
            _action = "";
        if ("MailChimp" === settings.list) _name = "NAME", _email = "EMAIL", _action = settings.url.replace("/post?", "/post-json?").concat("&c=?");
        else {
            if ("CampaignMonitor" !== settings.list) return void console.log("Subbscribe Error: list value must be set to MailChimp or CampaignMonitor");
            _name = "cm-name", _email = settings.cm_mail_field, _action = settings.url + "?callback=?"
        }
        var nameInput = "",
            emailInput = '<input type="email" name="' + _email + '" id="subb-EMAIL" placeholder="Email Address" />';
        settings.emailonly || (nameInput = ' <input type="text" name="' + _name + '" id="subb-NAME" placeholder="Name" />');
        var html = '<div id="subbscribe" style="display: none"><div class="subb-title">' + settings.title + ' <img class="close-x" src="https://s3-ap-southeast-2.amazonaws.com/subbscribe/img/close.svg" />  </div> <div class="subb-body"> <div class="subb-hidden"> <div class="subb-thumbnail"> <img style="width: 40px; height: 40px;" src="' + settings.thumbnail + '" /> </div> <div class="subb-hidden"> <div class="subb-site"> &nbsp;' + settings.name + ' </div> <button class="subb-button show-form">Subscribe</button> </div> </div> <div class="subb-form" style="display: none"> <p>' + settings.text + '</p> <form id="mc-embedded-subbscribe-form" method="post" action="' + settings.url + '"> <div class="subbscribe-alert subbscribe-error" style="display: none">Oops! Check your details and try again.</div> <div class="subbscribe-alert subbscribe-success" style="display: none">Thanks! Check your email for confirmation.</div> <div class="text-input"> ' + nameInput + ' </div> <div class="text-input"> ' + emailInput + ' </div> <button class="subb-button submit-form" type="submit" style="width: 100%; margin-bottom: 10px;">Subscribe</button></form></div> </div> </div>';
        1 !== getCookie("subbscribe-hidden") && 0 === $(this).find("#subbscribe").length && (this.append(html), setTimeout(function() {
            $("#subbscribe").css("display", "block"), $("#subbscribe").css("width", $(".subb-site").width() + 200), $("#subbscribe").addClass("animated slideInRight")
        }, 1e3 * settings.delay)), $("#subbscribe .subb-button").css("background-color", settings.color), $("#subbscribe .close-x").click(function() {
            $("#subbscribe").toggleClass("slideInRight fadeOut"), $("#subbscribe").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                $("#subbscribe").remove()
            }), "function" == typeof settings.onClose && settings.onClose.call()
        }), $("#subbscribe .show-form").click(function() {
            $("#subbscribe .subb-hidden").hide(), $("#subbscribe .subb-form").show()
        }), $("#mc-embedded-subbscribe-form").submit(function(e) {
            e.preventDefault(), formValidation() ? ($("#subbscribe .subbscribe-error").slideUp(), $("#subbscribe .submit-form").attr("disabled", "disabled"), $.ajax({
                url: _action,
                type: "post",
                data: $(this).serialize(),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(data) {
                    isError(data) ? console.log("Subbscribe Error: submission failed.") : (resetFormFields(), $(".subbscribe-success").slideDown(), setTimeout(function() {
                        $("#subbscribe").addClass("animated fadeOut")
                    }, 2e3), $("#subbscribe").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $("#subbscribe").remove(), "function" == typeof settings.onSubbscribe && settings.onSubbscribe.call()
                    }))
                }
            })) : $("#subbscribe .subbscribe-error").slideDown()
        })
    }
}(jQuery),
function() {
    function l(a) {
        g.push(a), 1 == g.length && f()
    }

    function m() {
        for (; g.length;) g[0](), g.shift()
    }

    function n(a) {
        this.a = p, this.b = void 0, this.f = [];
        var b = this;
        try {
            a(function(a) {
                q(b, a)
            }, function(a) {
                r(b, a)
            })
        } catch (c) {
            r(b, c)
        }
    }

    function t(a) {
        return new n(function(b, c) {
            c(a)
        })
    }

    function u(a) {
        return new n(function(b) {
            b(a)
        })
    }

    function q(a, b) {
        if (a.a == p) {
            if (b == a) throw new TypeError;
            var c = !1;
            try {
                var d = b && b.then;
                if (null != b && "object" == typeof b && "function" == typeof d) return void d.call(b, function(b) {
                    c || q(a, b), c = !0
                }, function(b) {
                    c || r(a, b), c = !0
                })
            } catch (e) {
                return void(c || r(a, e))
            }
            a.a = 0, a.b = b, v(a)
        }
    }

    function r(a, b) {
        if (a.a == p) {
            if (b == a) throw new TypeError;
            a.a = 1, a.b = b, v(a)
        }
    }

    function v(a) {
        l(function() {
            if (a.a != p)
                for (; a.f.length;) {
                    var b = a.f.shift(),
                        c = b[0],
                        d = b[1],
                        e = b[2],
                        b = b[3];
                    try {
                        0 == a.a ? e("function" == typeof c ? c.call(void 0, a.b) : a.b) : 1 == a.a && ("function" == typeof d ? e(d.call(void 0, a.b)) : b(a.b))
                    } catch (h) {
                        b(h)
                    }
                }
        })
    }

    function w(a) {
        return new n(function(b, c) {
            function d(c) {
                return function(d) {
                    h[c] = d, e += 1, e == a.length && b(h)
                }
            }
            var e = 0,
                h = [];
            0 == a.length && b(h);
            for (var k = 0; k < a.length; k += 1) u(a[k]).c(d(k), c)
        })
    }

    function x(a) {
        return new n(function(b, c) {
            for (var d = 0; d < a.length; d += 1) u(a[d]).c(b, c)
        })
    }
    var f, g = [];
    f = function() {
        setTimeout(m)
    };
    var p = 2;
    n.prototype.g = function(a) {
        return this.c(void 0, a)
    }, n.prototype.c = function(a, b) {
        var c = this;
        return new n(function(d, e) {
            c.f.push([a, b, d, e]), v(c)
        })
    }, window.Promise || (window.Promise = n, window.Promise.resolve = u, window.Promise.reject = t, window.Promise.race = x, window.Promise.all = w, window.Promise.prototype.then = n.prototype.c, window.Promise.prototype["catch"] = n.prototype.g)
}(),
function() {
    function l(a, b) {
        k ? a.addEventListener("scroll", b, !1) : a.attachEvent("scroll", b)
    }

    function v(a) {
        document.body ? a() : k ? document.addEventListener("DOMContentLoaded", a) : document.attachEvent("onreadystatechange", function() {
            "interactive" != document.readyState && "complete" != document.readyState || a()
        })
    }

    function w(a) {
        this.a = document.createElement("div"), this.a.setAttribute("aria-hidden", "true"), this.a.appendChild(document.createTextNode(a)), this.b = document.createElement("span"), this.c = document.createElement("span"), this.h = document.createElement("span"), this.f = document.createElement("span"), this.g = -1, this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;", this.b.appendChild(this.h), this.c.appendChild(this.f), this.a.appendChild(this.b), this.a.appendChild(this.c)
    }

    function y(a, b) {
        a.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:" + b + ";"
    }

    function z(a) {
        var b = a.a.offsetWidth,
            c = b + 100;
        return a.f.style.width = c + "px", a.c.scrollLeft = c, a.b.scrollLeft = a.b.scrollWidth + 100, a.g !== b ? (a.g = b, !0) : !1
    }

    function A(a, b) {
        function c() {
            var a = m;
            z(a) && null !== a.a.parentNode && b(a.g)
        }
        var m = a;
        l(a.b, c), l(a.c, c), z(a)
    }

    function B(a, b) {
        var c = b || {};
        this.family = a, this.style = c.style || "normal", this.weight = c.weight || "normal", this.stretch = c.stretch || "normal"
    }

    function I() {
        if (null === D) {
            var a = document.createElement("div");
            try {
                a.style.font = "condensed 100px sans-serif"
            } catch (b) {}
            D = "" !== a.style.font
        }
        return D
    }

    function J(a, b) {
        return [a.style, a.weight, I() ? a.stretch : "", "100px", b].join(" ")
    }
    var k = !!document.addEventListener,
        C = null,
        D = null,
        H = !!window.FontFace;
    B.prototype.load = function(a, b) {
        var c = this,
            m = a || "BESbswy",
            x = b || 3e3,
            E = (new Date).getTime();
        return new Promise(function(a, b) {
            if (H) {
                var K = new Promise(function(a, b) {
                        function e() {
                            (new Date).getTime() - E >= x ? b() : document.fonts.load(J(c, c.family), m).then(function(c) {
                                1 <= c.length ? a() : setTimeout(e, 25)
                            }, function() {
                                b()
                            })
                        }
                        e()
                    }),
                    L = new Promise(function(a, c) {
                        setTimeout(c, x)
                    });
                Promise.race([L, K]).then(function() {
                    a(c)
                }, function() {
                    b(c)
                })
            } else v(function() {
                function q() {
                    var b;
                    (b = -1 != f && -1 != g || -1 != f && -1 != h || -1 != g && -1 != h) && ((b = f != g && f != h && g != h) || (null === C && (b = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), C = !!b && (536 > parseInt(b[1], 10) || 536 === parseInt(b[1], 10) && 11 >= parseInt(b[2], 10))), b = C && (f == r && g == r && h == r || f == t && g == t && h == t || f == u && g == u && h == u)), b = !b), b && (null !== d.parentNode && d.parentNode.removeChild(d), clearTimeout(G), a(c))
                }

                function F() {
                    if ((new Date).getTime() - E >= x) null !== d.parentNode && d.parentNode.removeChild(d), b(c);
                    else {
                        var a = document.hidden;
                        !0 !== a && void 0 !== a || (f = e.a.offsetWidth, g = n.a.offsetWidth, h = p.a.offsetWidth, q()), G = setTimeout(F, 50)
                    }
                }
                var e = new w(m),
                    n = new w(m),
                    p = new w(m),
                    f = -1,
                    g = -1,
                    h = -1,
                    r = -1,
                    t = -1,
                    u = -1,
                    d = document.createElement("div"),
                    G = 0;
                d.dir = "ltr", y(e, J(c, "sans-serif")), y(n, J(c, "serif")), y(p, J(c, "monospace")), d.appendChild(e.a), d.appendChild(n.a), d.appendChild(p.a), document.body.appendChild(d), r = e.a.offsetWidth, t = n.a.offsetWidth, u = p.a.offsetWidth, F(), A(e, function(a) {
                    f = a, q()
                }), y(e, J(c, '"' + c.family + '",sans-serif')), A(n, function(a) {
                    g = a, q()
                }), y(n, J(c, '"' + c.family + '",serif')), A(p, function(a) {
                    h = a, q()
                }), y(p, J(c, '"' + c.family + '",monospace'))
            })
        })
    }, window.FontFaceObserver = B, window.FontFaceObserver.prototype.check = window.FontFaceObserver.prototype.load = B.prototype.load, "undefined" != typeof module && (module.exports = window.FontFaceObserver)
}(), $(function() {
        var CaffeineTheme, openHash = "#open";
        window.CaffeineTheme = CaffeineTheme = {
            version: "2.8.2",
            search: {
                container: function() {
                    return $("#results")
                },
                form: function(action) {
                    return $("#search-container")[action]()
                }
            },
            context: function() {
                var className;
                return className = document.body.className.split(" ")[0].split("-")[0], "" === className ? "error" : className
            },
            app: function() {
                return document.body
            }(),
            is: function(property, value) {
                return this.app.dataset ? this.app.dataset[property] === value : this.app.getAttribute("data-" + property) === value
            },
            redirect: function(pageNum) {
                var redirectUrl = "";
                redirectUrl += pageNum > 1 ? "/page/" + pageNum + "/#open" : "/#open", window.location.href = redirectUrl
            },
            isOpen: function() {
                return location.hash === openHash
            },
            getOpenHashFragment: function() {
                return openHash
            },
            open: function() {
                window.history.replaceState(null, null, openHash)
            },
            close: function() {
                window.history.replaceState(null, null, "#")
            },
            getLastPageNum: function() {
                var pageNum = "";
                return window.store && window.store.enabled && (pageNum = window.store.get("pageNum") || ""), pageNum
            },
            setLastPageNum: function() {
                var pageNum = $("#pageNum").text() || "";
                pageNum.length > 0 && window.store && window.store.enabled && window.store.set("pageNum", pageNum)
            },
            readTime: function() {
                var DateInDays;
                return new(DateInDays = function(selector) {
                    return $(selector).each(function() {
                        var publishDate, timeAgo;
                        return publishDate = $(this).attr("datetime"), timeAgo = $(this).html(), $(this).mouseover(function() {
                            return $(this).html(publishDate)
                        }), $(this).mouseout(function() {
                            return $(this).html(timeAgo)
                        })
                    })
                })(".meta > time")
            },
            device: function() {
                var h, w;
                return w = window.innerWidth, h = window.innerHeight, 480 >= w ? "mobile" : 1024 >= w ? "tablet" : "desktop"
            },
            hideIndexPage: function() {
                $("#default-nav-header, .blog-header, .material-cover, .page-index").addClass("transparent")
            },
            showIndexPage: function() {
                $("#default-nav-header, .blog-header, .material-cover, .page-index").removeClass("transparent")
            },
            showNotification: function() {
                if (window.notificationOptions && window.toastr) {
                    var setNotificationStore, message = window.notificationOptions.message || "",
                        type = window.notificationOptions.type || "info",
                        isShownOnce = window.notificationOptions.isShownOnce || !0,
                        notificationStore = "notification",
                        storeValue = "";
                    setNotificationStore = function() {
                        window.store && window.store.enabled && (storeValue && window.store.remove(notificationStore), isShownOnce && window.store.set(notificationStore, message))
                    }, window.toastr.options = {
                        closeButton: !0,
                        debug: !1,
                        newestOnTop: !1,
                        progressBar: !0,
                        positionClass: "toast-bottom-right",
                        preventDuplicates: !0,
                        onclick: null,
                        escapeHtml: window.notificationOptions.escapeHtml || !1,
                        timeOut: window.notificationOptions.timeOut || "25000",
                        extendedTimeOut: window.notificationOptions.extendedTimeOut || "10000",
                        onHidden: setNotificationStore
                    }, window.store && window.store.enabled && (storeValue = window.store.get(notificationStore) || ""), void 0 !== storeValue && storeValue === message || window.toastr[type](message)
                }
            },
            getGridWidth: function(numColumns) {
                var width = null;
                return !isNaN(numColumns) && numColumns > 0 && 2 !== numColumns && (width = Math.floor((100 - 2 * numColumns) / numColumns), width += "%"), width
            },
            mediaQueryListener: function(mediaQuery, onMatch, onNoMatch) {
                var mq = window.matchMedia(mediaQuery);
                mq.matches ? onMatch.call(this) : onNoMatch.call(this), mq.addListener(function(changed) {
                    changed.matches ? onMatch.call(this) : onNoMatch.call(this)
                })
            }
        }
    }),
    function($) {
        var lunr = function(t) {
            var e = new lunr.Index;
            return e.pipeline.add(lunr.stopWordFilter, lunr.stemmer), t && t.call(e, e), e
        };
        lunr.version = "0.4.3", "undefined" != typeof module && (module.exports = lunr), lunr.utils = {}, lunr.utils.warn = function(t) {
            return function(e) {
                t.console && console.warn && console.warn(e)
            }
        }(this), lunr.utils.zeroFillArray = function() {
            var t = [0];
            return function(e) {
                for (; e > t.length;) t = t.concat(t);
                return t.slice(0, e)
            }
        }(), lunr.EventEmitter = function() {
            this.events = {}
        }, lunr.EventEmitter.prototype.addListener = function() {
            var t = Array.prototype.slice.call(arguments),
                e = t.pop(),
                n = t;
            if ("function" != typeof e) throw new TypeError("last argument must be a function");
            n.forEach(function(t) {
                this.hasHandler(t) || (this.events[t] = []), this.events[t].push(e)
            }, this)
        }, lunr.EventEmitter.prototype.removeListener = function(t, e) {
            if (this.hasHandler(t)) {
                var n = this.events[t].indexOf(e);
                this.events[t].splice(n, 1), this.events[t].length || delete this.events[t]
            }
        }, lunr.EventEmitter.prototype.emit = function(t) {
            if (this.hasHandler(t)) {
                var e = Array.prototype.slice.call(arguments, 1);
                this.events[t].forEach(function(t) {
                    t.apply(void 0, e)
                })
            }
        }, lunr.EventEmitter.prototype.hasHandler = function(t) {
            return t in this.events
        }, lunr.tokenizer = function(t) {
            if (!arguments.length || null == t || void 0 == t) return [];
            if (Array.isArray(t)) return t.map(function(t) {
                return t.toLowerCase()
            });
            for (var e = ("" + t).replace(/^\s+/, ""), n = e.length - 1; n >= 0; n--)
                if (/\S/.test(e.charAt(n))) {
                    e = e.substring(0, n + 1);
                    break
                }
            return e.split(/\s+/).map(function(t) {
                return t.replace(/^\W+/, "").replace(/\W+$/, "").toLowerCase()
            })
        }, lunr.Pipeline = function() {
            this._stack = []
        }, lunr.Pipeline.registeredFunctions = {}, lunr.Pipeline.registerFunction = function(t, e) {
            e in this.registeredFunctions && lunr.utils.warn("Overwriting existing registered function: " + e), t.label = e, lunr.Pipeline.registeredFunctions[t.label] = t
        }, lunr.Pipeline.warnIfFunctionNotRegistered = function(t) {
            var e = t.label && t.label in this.registeredFunctions;
            e || lunr.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", t)
        }, lunr.Pipeline.load = function(t) {
            var e = new lunr.Pipeline;
            return t.forEach(function(t) {
                var n = lunr.Pipeline.registeredFunctions[t];
                if (!n) throw Error("Cannot load un-registered function: " + t);
                e.add(n)
            }), e
        }, lunr.Pipeline.prototype.add = function() {
            var t = Array.prototype.slice.call(arguments);
            t.forEach(function(t) {
                lunr.Pipeline.warnIfFunctionNotRegistered(t), this._stack.push(t)
            }, this)
        }, lunr.Pipeline.prototype.after = function(t, e) {
            lunr.Pipeline.warnIfFunctionNotRegistered(e);
            var n = this._stack.indexOf(t) + 1;
            this._stack.splice(n, 0, e)
        }, lunr.Pipeline.prototype.before = function(t, e) {
            lunr.Pipeline.warnIfFunctionNotRegistered(e);
            var n = this._stack.indexOf(t);
            this._stack.splice(n, 0, e)
        }, lunr.Pipeline.prototype.remove = function(t) {
            var e = this._stack.indexOf(t);
            this._stack.splice(e, 1)
        }, lunr.Pipeline.prototype.run = function(t) {
            for (var e = [], n = t.length, r = this._stack.length, o = 0; n > o; o++) {
                for (var i = t[o], s = 0; r > s && (i = this._stack[s](i, o, t), void 0 !== i); s++);
                void 0 !== i && e.push(i)
            }
            return e
        }, lunr.Pipeline.prototype.toJSON = function() {
            return this._stack.map(function(t) {
                return lunr.Pipeline.warnIfFunctionNotRegistered(t), t.label
            })
        }, lunr.Vector = function(t) {
            this.elements = t
        }, lunr.Vector.prototype.magnitude = function() {
            if (this._magnitude) return this._magnitude;
            for (var t, e = 0, n = this.elements, r = n.length, o = 0; r > o; o++) t = n[o], e += t * t;
            return this._magnitude = Math.sqrt(e)
        }, lunr.Vector.prototype.dot = function(t) {
            for (var e = this.elements, n = t.elements, r = e.length, o = 0, i = 0; r > i; i++) o += e[i] * n[i];
            return o
        }, lunr.Vector.prototype.similarity = function(t) {
            return this.dot(t) / (this.magnitude() * t.magnitude())
        }, lunr.Vector.prototype.toArray = function() {
            return this.elements
        }, lunr.SortedSet = function() {
            this.length = 0, this.elements = []
        }, lunr.SortedSet.load = function(t) {
            var e = new this;
            return e.elements = t, e.length = t.length, e
        }, lunr.SortedSet.prototype.add = function() {
            Array.prototype.slice.call(arguments).forEach(function(t) {
                ~this.indexOf(t) || this.elements.splice(this.locationFor(t), 0, t)
            }, this), this.length = this.elements.length
        }, lunr.SortedSet.prototype.toArray = function() {
            return this.elements.slice()
        }, lunr.SortedSet.prototype.map = function(t, e) {
            return this.elements.map(t, e)
        }, lunr.SortedSet.prototype.forEach = function(t, e) {
            return this.elements.forEach(t, e)
        }, lunr.SortedSet.prototype.indexOf = function(t, e, n) {
            var e = e || 0,
                n = n || this.elements.length,
                r = n - e,
                o = e + Math.floor(r / 2),
                i = this.elements[o];
            return 1 >= r ? i === t ? o : -1 : t > i ? this.indexOf(t, o, n) : i > t ? this.indexOf(t, e, o) : i === t ? o : void 0
        }, lunr.SortedSet.prototype.locationFor = function(t, e, n) {
            var e = e || 0,
                n = n || this.elements.length,
                r = n - e,
                o = e + Math.floor(r / 2),
                i = this.elements[o];
            if (1 >= r) {
                if (i > t) return o;
                if (t > i) return o + 1
            }
            return t > i ? this.locationFor(t, o, n) : i > t ? this.locationFor(t, e, o) : void 0
        }, lunr.SortedSet.prototype.intersect = function(t) {
            for (var e = new lunr.SortedSet, n = 0, r = 0, o = this.length, i = t.length, s = this.elements, l = t.elements; !(n > o - 1 || r > i - 1);) s[n] !== l[r] ? s[n] < l[r] ? n++ : s[n] > l[r] && r++ : (e.add(s[n]), n++, r++);
            return e
        }, lunr.SortedSet.prototype.clone = function() {
            var t = new lunr.SortedSet;
            return t.elements = this.toArray(), t.length = t.elements.length, t
        }, lunr.SortedSet.prototype.union = function(t) {
            var e, n, r;
            return this.length >= t.length ? (e = this, n = t) : (e = t, n = this), r = e.clone(), r.add.apply(r, n.toArray()), r
        }, lunr.SortedSet.prototype.toJSON = function() {
            return this.toArray()
        }, lunr.Index = function() {
            this._fields = [], this._ref = "id", this.pipeline = new lunr.Pipeline, this.documentStore = new lunr.Store, this.tokenStore = new lunr.TokenStore, this.corpusTokens = new lunr.SortedSet, this.eventEmitter = new lunr.EventEmitter, this._idfCache = {}, this.on("add", "remove", "update", function() {
                this._idfCache = {}
            }.bind(this))
        }, lunr.Index.prototype.on = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.eventEmitter.addListener.apply(this.eventEmitter, t)
        }, lunr.Index.prototype.off = function(t, e) {
            return this.eventEmitter.removeListener(t, e)
        }, lunr.Index.load = function(t) {
            t.version !== lunr.version && lunr.utils.warn("version mismatch: current " + lunr.version + " importing " + t.version);
            var e = new this;
            return e._fields = t.fields, e._ref = t.ref, e.documentStore = lunr.Store.load(t.documentStore), e.tokenStore = lunr.TokenStore.load(t.tokenStore), e.corpusTokens = lunr.SortedSet.load(t.corpusTokens), e.pipeline = lunr.Pipeline.load(t.pipeline), e
        }, lunr.Index.prototype.field = function(t, e) {
            var e = e || {},
                n = {
                    name: t,
                    boost: e.boost || 1
                };
            return this._fields.push(n), this
        }, lunr.Index.prototype.ref = function(t) {
            return this._ref = t, this
        }, lunr.Index.prototype.add = function(t, e) {
            var n = {},
                r = new lunr.SortedSet,
                o = t[this._ref],
                e = void 0 === e ? !0 : e;
            this._fields.forEach(function(e) {
                var o = this.pipeline.run(lunr.tokenizer(t[e.name]));
                n[e.name] = o, lunr.SortedSet.prototype.add.apply(r, o)
            }, this), this.documentStore.set(o, r), lunr.SortedSet.prototype.add.apply(this.corpusTokens, r.toArray());
            for (var i = 0; r.length > i; i++) {
                var s = r.elements[i],
                    l = this._fields.reduce(function(t, e) {
                        var r = n[e.name].length;
                        if (!r) return t;
                        var o = n[e.name].filter(function(t) {
                            return t === s
                        }).length;
                        return t + o / r * e.boost
                    }, 0);
                this.tokenStore.add(s, {
                    ref: o,
                    tf: l
                })
            }
            e && this.eventEmitter.emit("add", t, this)
        }, lunr.Index.prototype.remove = function(t, e) {
            var n = t[this._ref],
                e = void 0 === e ? !0 : e;
            if (this.documentStore.has(n)) {
                var r = this.documentStore.get(n);
                this.documentStore.remove(n), r.forEach(function(t) {
                    this.tokenStore.remove(t, n)
                }, this), e && this.eventEmitter.emit("remove", t, this)
            }
        }, lunr.Index.prototype.update = function(t, e) {
            var e = void 0 === e ? !0 : e;
            this.remove(t, !1), this.add(t, !1), e && this.eventEmitter.emit("update", t, this)
        }, lunr.Index.prototype.idf = function(t) {
            if (this._idfCache[t]) return this._idfCache[t];
            var e = this.tokenStore.count(t),
                n = 1;
            return e > 0 && (n = 1 + Math.log(this.tokenStore.length / e)), this._idfCache[t] = n
        }, lunr.Index.prototype.search = function(t) {
            var e = this.pipeline.run(lunr.tokenizer(t)),
                n = lunr.utils.zeroFillArray(this.corpusTokens.length),
                r = [],
                o = this._fields.reduce(function(t, e) {
                    return t + e.boost
                }, 0),
                i = e.some(function(t) {
                    return this.tokenStore.has(t)
                }, this);
            if (!i) return [];
            e.forEach(function(t, e, i) {
                var s = 1 / i.length * this._fields.length * o,
                    l = this,
                    u = this.tokenStore.expand(t).reduce(function(e, r) {
                        var o = l.corpusTokens.indexOf(r),
                            i = l.idf(r),
                            u = 1,
                            a = new lunr.SortedSet;
                        if (r !== t) {
                            var h = Math.max(3, r.length - t.length);
                            u = 1 / Math.log(h)
                        }
                        return o > -1 && (n[o] = s * i * u), Object.keys(l.tokenStore.get(r)).forEach(function(t) {
                            a.add(t)
                        }), e.union(a)
                    }, new lunr.SortedSet);
                r.push(u)
            }, this);
            var s = r.reduce(function(t, e) {
                    return t.intersect(e)
                }),
                l = new lunr.Vector(n);
            return s.map(function(t) {
                return {
                    ref: t,
                    score: l.similarity(this.documentVector(t))
                }
            }, this).sort(function(t, e) {
                return e.score - t.score
            })
        }, lunr.Index.prototype.documentVector = function(t) {
            for (var e = this.documentStore.get(t), n = e.length, r = lunr.utils.zeroFillArray(this.corpusTokens.length), o = 0; n > o; o++) {
                var i = e.elements[o],
                    s = this.tokenStore.get(i)[t].tf,
                    l = this.idf(i);
                r[this.corpusTokens.indexOf(i)] = s * l
            }
            return new lunr.Vector(r)
        }, lunr.Index.prototype.toJSON = function() {
            return {
                version: lunr.version,
                fields: this._fields,
                ref: this._ref,
                documentStore: this.documentStore.toJSON(),
                tokenStore: this.tokenStore.toJSON(),
                corpusTokens: this.corpusTokens.toJSON(),
                pipeline: this.pipeline.toJSON()
            }
        }, lunr.Store = function() {
            this.store = {}, this.length = 0
        }, lunr.Store.load = function(t) {
            var e = new this;
            return e.length = t.length, e.store = Object.keys(t.store).reduce(function(e, n) {
                return e[n] = lunr.SortedSet.load(t.store[n]), e
            }, {}), e
        }, lunr.Store.prototype.set = function(t, e) {
            this.store[t] = e, this.length = Object.keys(this.store).length
        }, lunr.Store.prototype.get = function(t) {
            return this.store[t]
        }, lunr.Store.prototype.has = function(t) {
            return t in this.store
        }, lunr.Store.prototype.remove = function(t) {
            this.has(t) && (delete this.store[t], this.length--)
        }, lunr.Store.prototype.toJSON = function() {
            return {
                store: this.store,
                length: this.length
            }
        }, lunr.stemmer = function() {
            var t = {
                    ational: "ate",
                    tional: "tion",
                    enci: "ence",
                    anci: "ance",
                    izer: "ize",
                    bli: "ble",
                    alli: "al",
                    entli: "ent",
                    eli: "e",
                    ousli: "ous",
                    ization: "ize",
                    ation: "ate",
                    ator: "ate",
                    alism: "al",
                    iveness: "ive",
                    fulness: "ful",
                    ousness: "ous",
                    aliti: "al",
                    iviti: "ive",
                    biliti: "ble",
                    logi: "log"
                },
                e = {
                    icate: "ic",
                    ative: "",
                    alize: "al",
                    iciti: "ic",
                    ical: "ic",
                    ful: "",
                    ness: ""
                },
                n = "[^aeiou]",
                r = "[aeiouy]",
                o = n + "[^aeiouy]*",
                i = r + "[aeiou]*",
                s = "^(" + o + ")?" + i + o,
                l = "^(" + o + ")?" + i + o + "(" + i + ")?$",
                u = "^(" + o + ")?" + i + o + i + o,
                a = "^(" + o + ")?" + r;
            return function(n) {
                var i, h, c, p, f, d, v;
                if (3 > n.length) return n;
                if (c = n.substr(0, 1), "y" == c && (n = c.toUpperCase() + n.substr(1)), p = /^(.+?)(ss|i)es$/, f = /^(.+?)([^s])s$/, p.test(n) ? n = n.replace(p, "$1$2") : f.test(n) && (n = n.replace(f, "$1$2")), p = /^(.+?)eed$/, f = /^(.+?)(ed|ing)$/, p.test(n)) {
                    var m = p.exec(n);
                    p = RegExp(s), p.test(m[1]) && (p = /.$/, n = n.replace(p, ""))
                } else if (f.test(n)) {
                    var m = f.exec(n);
                    i = m[1], f = RegExp(a), f.test(i) && (n = i, f = /(at|bl|iz)$/, d = RegExp("([^aeiouylsz])\\1$"), v = RegExp("^" + o + r + "[^aeiouwxy]$"), f.test(n) ? n += "e" : d.test(n) ? (p = /.$/, n = n.replace(p, "")) : v.test(n) && (n += "e"))
                }
                if (p = /^(.+?)y$/, p.test(n)) {
                    var m = p.exec(n);
                    i = m[1], p = RegExp(a), p.test(i) && (n = i + "i")
                }
                if (p = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/, p.test(n)) {
                    var m = p.exec(n);
                    i = m[1], h = m[2], p = RegExp(s), p.test(i) && (n = i + t[h])
                }
                if (p = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/, p.test(n)) {
                    var m = p.exec(n);
                    i = m[1], h = m[2], p = RegExp(s), p.test(i) && (n = i + e[h])
                }
                if (p = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/, f = /^(.+?)(s|t)(ion)$/, p.test(n)) {
                    var m = p.exec(n);
                    i = m[1], p = RegExp(u), p.test(i) && (n = i)
                } else if (f.test(n)) {
                    var m = f.exec(n);
                    i = m[1] + m[2], f = RegExp(u), f.test(i) && (n = i)
                }
                if (p = /^(.+?)e$/, p.test(n)) {
                    var m = p.exec(n);
                    i = m[1], p = RegExp(u), f = RegExp(l), d = RegExp("^" + o + r + "[^aeiouwxy]$"), (p.test(i) || f.test(i) && !d.test(i)) && (n = i)
                }
                return p = /ll$/, f = RegExp(u), p.test(n) && f.test(n) && (p = /.$/, n = n.replace(p, "")), "y" == c && (n = c.toLowerCase() + n.substr(1)), n
            }
        }(), lunr.Pipeline.registerFunction(lunr.stemmer, "stemmer"), lunr.stopWordFilter = function(t) {
            return -1 === lunr.stopWordFilter.stopWords.indexOf(t) ? t : void 0
        }, lunr.stopWordFilter.stopWords = new lunr.SortedSet, lunr.stopWordFilter.stopWords.length = 119, lunr.stopWordFilter.stopWords.elements = ["", "a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your"], lunr.Pipeline.registerFunction(lunr.stopWordFilter, "stopWordFilter"), lunr.TokenStore = function() {
            this.root = {
                docs: {}
            }, this.length = 0
        }, lunr.TokenStore.load = function(t) {
            var e = new this;
            return e.root = t.root, e.length = t.length, e
        }, lunr.TokenStore.prototype.add = function(t, e, n) {
            var n = n || this.root,
                r = t[0],
                o = t.slice(1);
            return r in n || (n[r] = {
                docs: {}
            }), 0 === o.length ? (n[r].docs[e.ref] = e, void(this.length += 1)) : this.add(o, e, n[r])
        }, lunr.TokenStore.prototype.has = function(t) {
            if (!t) return !1;
            for (var e = this.root, n = 0; t.length > n; n++) {
                if (!e[t[n]]) return !1;
                e = e[t[n]]
            }
            return !0
        }, lunr.TokenStore.prototype.getNode = function(t) {
            if (!t) return {};
            for (var e = this.root, n = 0; t.length > n; n++) {
                if (!e[t[n]]) return {};
                e = e[t[n]]
            }
            return e
        }, lunr.TokenStore.prototype.get = function(t, e) {
            return this.getNode(t, e).docs || {}
        }, lunr.TokenStore.prototype.count = function(t, e) {
            return Object.keys(this.get(t, e)).length
        }, lunr.TokenStore.prototype.remove = function(t, e) {
            if (t) {
                for (var n = this.root, r = 0; t.length > r; r++) {
                    if (!(t[r] in n)) return;
                    n = n[t[r]]
                }
                delete n.docs[e]
            }
        }, lunr.TokenStore.prototype.expand = function(t, e) {
            var n = this.getNode(t),
                r = n.docs || {},
                e = e || [];
            return Object.keys(r).length && e.push(t), Object.keys(n).forEach(function(n) {
                "docs" !== n && e.concat(this.expand(t + n, e))
            }, this), e
        }, lunr.TokenStore.prototype.toJSON = function() {
            return {
                root: this.root,
                length: this.length
            }
        }, $.fn.ghostHunter = function(options) {
            var opts = $.extend({}, $.fn.ghostHunter.defaults, options);
            return opts.results ? (pluginMethods.init(this, opts), pluginMethods) : void 0
        }, $.fn.ghostHunter.defaults = {
            results: !1,
            rss: "/rss",
            onKeyUp: !1,
            result_template: "<a href='{{link}}'><p><h2>{{title}}</h2><h4>{{pubDate}}</h4></p></a>",
            info_template: "<p>Number of posts found: {{amount}}</p>",
            displaySearchInfo: !0,
            zeroResultsInfo: !0,
            before: !1,
            onComplete: !1
        };
        var pluginMethods = {
            isInit: !1,
            init: function(target, opts) {
                var that = this;
                this.target = target, this.rss = opts.rss, this.results = opts.results, this.blogData = [], this.result_template = opts.result_template, this.info_template = opts.info_template, this.zeroResultsInfo = opts.zeroResultsInfo, this.displaySearchInfo = opts.displaySearchInfo, this.before = opts.before, this.onComplete = opts.onComplete, this.index = lunr(function() {
                    this.field("title", {
                        boost: 10
                    }), this.field("description"), this.field("link"), this.field("category"), this.field("pubDate"), this.ref("id")
                }), target.focus(function() {
                    that.loadRSS()
                }), target.closest("form").submit(function(e) {
                    e.preventDefault(), that.find(target.val())
                }), opts.onKeyUp && (that.loadRSS(), target.keyup(function() {
                    that.find(target.val())
                }))
            },
            loadRSS: function() {
                if (this.isInit) return !1;
                var index = this.index,
                    rssURL = this.rss,
                    blogData = this.blogData;
                $.get(rssURL, function(data) {
                    for (var posts = $(data).find("item"), i = 0; posts && i < posts.length; i++) {
                        var post = posts.eq(i),
                            parsedData = {
                                id: i + 1,
                                title: post.find("title").text(),
                                description: post.find("description").text(),
                                category: post.find("category").text(),
                                pubDate: post.find("pubDate").text(),
                                link: post.find("link").text()
                            };
                        index.add(parsedData), blogData.push(parsedData)
                    }
                }), this.isInit = !0
            },
            find: function(value) {
                var searchResult = this.index.search(value),
                    results = $(this.results),
                    resultsData = [];
                results.empty(), this.before && this.before(), (this.zeroResultsInfo || searchResult.length > 0) && this.displaySearchInfo && results.append(this.format(this.info_template, {
                    amount: searchResult.length
                }));
                for (var i = 0; i < searchResult.length; i++) {
                    var postData = this.blogData[searchResult[i].ref - 1];
                    results.append(this.format(this.result_template, postData)), resultsData.push(postData)
                }
                this.onComplete && this.onComplete(resultsData)
            },
            clear: function() {
                $(this.results).empty(), this.target.val("")
            },
            format: function(t, d) {
                return t.replace(/{{([^{}]*)}}/g, function(a, b) {
                    var r = d[b];
                    return "string" == typeof r || "number" == typeof r ? r : a
                })
            }
        }
    }(jQuery),
    function(w) {
        var font1 = new w.FontFaceObserver("Raleway", {
                weight: 400
            }),
            font2 = new w.FontFaceObserver("Raleway", {
                weight: 700
            }),
            font3 = new w.FontFaceObserver("Roboto Slab", {
                weight: 300
            }),
            font4 = new w.FontFaceObserver("Roboto Slab", {
                weight: 400
            });
        w.Promise.all([font1.check(), font2.check(), font3.check(), font4.check()]).then(function() {
            -1 == w.document.documentElement.className.indexOf("fonts-loaded") && (w.document.documentElement.className += " fonts-loaded");
            try {
                var storage = window.sessionStorage;
                storage && storage.setItem("fonts-loaded", "1")
            } catch (e) {}
        })["catch"](function() {
            w.document.documentElement.className += " fonts-unavailable"
        })
    }(this), $(function() {
        var $postsGrid, el, $posts = $("ol.posts"),
            cardName = ".card";
        if (el = CaffeineTheme.app, el.dataset ? (el.dataset.page = CaffeineTheme.context(), el.dataset.device = CaffeineTheme.device()) : $(el).attr("data-page", CaffeineTheme.context()).attr("data-device", CaffeineTheme.device()), CaffeineTheme.readTime(), window.profile_title && $(".profile-title").text(window.profile_title), window.profile_resume && $("#profile-resume").text(window.profile_resume), window.tag_names)
            for (var i = 0; i < window.tag_names.length; i++) {
                var tag = window.tag_names[i],
                    link = "/tag/" + tag + "/" + CaffeineTheme.getOpenHashFragment();
                $("<a>", {
                    href: link,
                    text: tag
                }).appendTo("#popular-tags .tags")
            }
        if (window.mailchimpOptions && window.mailchimpOptions.url && $(".subscribe-button").removeClass("hide"), CaffeineTheme.is("page", "post") && ($("main").readingTime({
                readingTimeTarget: ".reading-time > span"
            }), $(".content").fitVids(), $("#back-button").on("click", function(event) {
                var lastPageNum = CaffeineTheme.getLastPageNum();
                event.preventDefault(), lastPageNum.length > 0 ? CaffeineTheme.redirect(lastPageNum) : window.history.back()
            })), $posts && $posts.masonry) {
            if ($postsGrid = $posts.masonry({
                    itemSelector: cardName,
                    percentPosition: !0
                }), window.gridOptions) {
                var gridOptions = window.gridOptions,
                    width = CaffeineTheme.getGridWidth(gridOptions.columns),
                    fullColumnWidth = function() {
                        $posts.find(cardName).css("width", "100%")
                    },
                    gridColumnWidth = function() {
                        $posts.find(cardName).css("width", width)
                    };
                width && CaffeineTheme.mediaQueryListener("all and (max-width: 700px)", fullColumnWidth, gridColumnWidth)
            }
            $postsGrid.imagesLoaded && $postsGrid.imagesLoaded().done(function() {
                $postsGrid.masonry("layout")
            }).progress(function() {
                $postsGrid.masonry("layout")
            })
        } else $posts.find(cardName).css("width", CaffeineTheme.getGridWidth(1));
        $(window).load(function() {
            CaffeineTheme.is("page", "home") && ($(".blog-header").addClass("animated fade-in"), CaffeineTheme.isOpen() && CaffeineTheme.showNotification()), $posts.addClass("animated fade-in"), window.ScrollReveal && $(cardName).length > 0 ? window.sr = window.ScrollReveal().reveal(cardName, {
                afterReveal: function() {
                    $postsGrid && $postsGrid.masonry("layout")
                }
            }) : $posts.css("visibility", "visible"), CaffeineTheme.setLastPageNum()
        })
    }),
    function($) {
        $.fn.fitVids = function(options) {
            var settings = {
                customSelector: null
            };
            if (!document.getElementById("fit-vids-style")) {
                var head = document.head || document.getElementsByTagName("head")[0],
                    css = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                    div = document.createElement("div");
                div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + "</style>", head.appendChild(div.childNodes[1])
            }
            return options && $.extend(settings, options), this.each(function() {
                var selectors = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
                settings.customSelector && selectors.push(settings.customSelector);
                var $allVideos = $(this).find(selectors.join(","));
                $allVideos = $allVideos.not("object object"), $allVideos.each(function() {
                    var $this = $(this);
                    if (!("embed" === this.tagName.toLowerCase() && $this.parent("object").length || $this.parent(".fluid-width-video-wrapper").length)) {
                        var height = "object" === this.tagName.toLowerCase() || $this.attr("height") && !isNaN(parseInt($this.attr("height"), 10)) ? parseInt($this.attr("height"), 10) : $this.height(),
                            width = isNaN(parseInt($this.attr("width"), 10)) ? $this.width() : parseInt($this.attr("width"), 10),
                            aspectRatio = height / width;
                        if (!$this.attr("id")) {
                            var videoID = "fitvid" + Math.floor(999999 * Math.random());
                            $this.attr("id", videoID)
                        }
                        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * aspectRatio + "%"), $this.removeAttr("height").removeAttr("width")
                    }
                })
            })
        }
    }(window.jQuery || window.Zepto), $(function() {
        var _expandCover, _isTagsOverlayOpen, _toggleTagsOverlay, _defaultLogoNavEvent, $navHeader, $tagsButton, $homeButton, $cover, $tagsOverlay, $searchField;
        if ($cover = $(".cover"), $navHeader = $("#default-nav-header"), $tagsButton = $(".tags-button"), $homeButton = $navHeader.find("#home-button"), $tagsOverlay = $(".tags-overlay"), $searchField = $("#search-field"), _expandCover = function() {
                $cover.toggleClass("expanded"), $cover.hasClass("expanded") ? CaffeineTheme.close() : CaffeineTheme.open()
            }, _toggleTagsOverlay = function() {
                $tagsOverlay.toggleClass("show"), $tagsButton.find("i").toggleClass("fa-search fa-close"), $searchField.focus()
            }, _isTagsOverlayOpen = function() {
                return $tagsOverlay.hasClass("show")
            }, _defaultLogoNavEvent = function(event) {
                return event.preventDefault(), CaffeineTheme.showIndexPage(), _isTagsOverlayOpen() && _toggleTagsOverlay(), CaffeineTheme.is("page", "home") && CaffeineTheme.showNotification(), _expandCover()
            }, $tagsButton.click(function() {
                _toggleTagsOverlay()
            }), $(".home-link").click(function(event) {
                return CaffeineTheme.is("page", "home") && (event.preventDefault(), CaffeineTheme.showIndexPage(), CaffeineTheme.showNotification(), !CaffeineTheme.isOpen()) ? _expandCover() : void 0
            }), $(".subscribe-link").click(function(event) {
                if (event.preventDefault(), window.toastr && window.toastr.remove(), window.mailchimpOptions && window.mailchimpOptions.url) {
                    var options = window.mailchimpOptions;
                    $("body").subbscribe({
                        title: options.title || "Never miss a post!",
                        text: options.text || "Stay up to the date with the latest posts!",
                        name: options.name || "<a href='https://www.facebook.com/caffeinecoding' target='_blank'>@caffeinecoding</a>",
                        color: options.color || "#282C34",
                        thumbnail: options.thumbnail || "http://i.imgur.com/39erIwp.png",
                        list: "MailChimp",
                        url: options.url
                    })
                }
            }), $homeButton.click(_defaultLogoNavEvent), $(".open-link").click(_defaultLogoNavEvent), CaffeineTheme.is("page", "home") && !CaffeineTheme.isOpen()) {
            if (!window.disableCover) return CaffeineTheme.hideIndexPage(), _expandCover();
            CaffeineTheme.open()
        }
    }),
    function(a) {
        a.fn.readingTime = function(o) {
            if (!this.length) return this;
            var g = {
                    readingTimeTarget: ".eta",
                    wordCountTarget: null,
                    wordsPerMinute: 270,
                    round: !0,
                    lang: "en",
                    remotePath: null,
                    remoteTarget: null
                },
                h = this,
                c = a(this);
            h.settings = a.extend({}, g, o);
            var e = h.settings.readingTimeTarget,
                d = h.settings.wordCountTarget,
                j = h.settings.wordsPerMinute,
                m = h.settings.round,
                b = h.settings.lang,
                f = h.settings.remotePath,
                l = h.settings.remoteTarget;
            if ("fr" == b) var k = "Moins d'une minute",
                n = "min";
            else if ("de" == b) var k = "Weniger als eine Minute",
                n = "min";
            else if ("es" == b) var k = "Menos de un minuto",
                n = "min";
            else var k = "Less than a minute",
                n = "min";
            var i = function(v) {
                var s = v.split(" ").length,
                    r = j / 60,
                    p = s / r,
                    u = Math.round(p / 60),
                    t = Math.round(p - 60 * u);
                if (m === !0) u > 0 ? c.find(e).text(u + " " + n) : c.find(e).text(k);
                else {
                    var q = u + ":" + t;
                    c.find(e).text(q)
                }
                "" !== d && void 0 !== d && c.find(d).text(s)
            };
            c.each(function() {
                null != f && null != l ? a.get(f, function(p) {
                    i(a(p).children().text())
                }) : i(c.text())
            })
        }
    }(jQuery), $(function() {
        var showTags, hideTags, $searchField = $("#search-field"),
            $popularTags = $("#popular-tags");
        return showTags = function() {
            return $popularTags.show()
        }, hideTags = function() {
            return $popularTags.hide()
        }, $searchField.ghostHunter({
            results: "#search-results",
            zeroResultsInfo: !1,
            onKeyUp: !0,
            displaySearchInfo: !0,
            result_template: "<a class=\"result\" href='{{link}}'>\n  <h2>{{title}}</h2>\n  <h4>{{pubDate}}</h4>\n</a>",
            onComplete: function(query) {
                return query.length > 0 ? hideTags() : showTags()
            }
        })
    });
