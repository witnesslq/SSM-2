/*
 Highcharts JS v5.0.2 (2016-10-26)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (M, a) {
    "object" === typeof module && module.exports ? module.exports = M.document ? a(M) : a : M.Highcharts = a(M)
})("undefined" !== typeof window ? window : this, function (M) {
    M = function () {
        var a = window,
            D = a.document,
            z = a.navigator && a.navigator.userAgent || "",
            F = D && D.createElementNS && !!D.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            J = /(edge|msie|trident)/i.test(z) && !window.opera,
            m = !F,
            f = /Firefox/.test(z),
            h = f && 4 > parseInt(z.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "5.0.2",
            deg2rad: 2 * Math.PI / 360,
            doc: D,
            hasBidiBug: h,
            hasTouch: D && void 0 !== D.documentElement.ontouchstart,
            isMS: J,
            isWebKit: /AppleWebKit/.test(z),
            isFirefox: f,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(z),
            SVG_NS: "http://www.w3.org/2000/svg",
            idCounter: 0,
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: F,
            vml: m,
            win: a,
            charts: [],
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {}
        }
    }();
    (function (a) {
        var D = [],
            z = a.charts,
            F = a.doc,
            J = a.win;
        a.error = function (a, f) {
            a = "Highcharts error #" +
                a + ": www.highcharts.com/errors/" + a;
            if (f) throw Error(a);
            J.console && console.log(a)
        };
        a.Fx = function (a, f, h) {
            this.options = f;
            this.elem = a;
            this.prop = h
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0],
                    f = this.paths[1],
                    h = [],
                    q = this.now,
                    n = a.length,
                    k;
                if (1 === q) h = this.toD;
                else if (n === f.length && 1 > q)
                    for (; n--;) k = parseFloat(a[n]), h[n] = isNaN(k) ? a[n] : q * parseFloat(f[n] - k) + k;
                else h = f;
                this.elem.attr("d", h)
            },
            update: function () {
                var a = this.elem,
                    f = this.prop,
                    h = this.now,
                    q = this.options.step;
                if (this[f + "Setter"]) this[f + "Setter"]();
                else a.attr ? a.element && a.attr(f, h) : a.style[f] = h + this.unit;
                q && q.call(a, h, this)
            },
            run: function (a, f, h) {
                var m = this,
                    n = function (a) {
                        return n.stopped ? !1 : m.step(a)
                    },
                    k;
                this.startTime = +new Date;
                this.start = a;
                this.end = f;
                this.unit = h;
                this.now = this.start;
                this.pos = 0;
                n.elem = this.elem;
                n() && 1 === D.push(n) && (n.timerId = setInterval(function () {
                    for (k = 0; k < D.length; k++) D[k]() || D.splice(k--, 1);
                    D.length || clearInterval(n.timerId)
                }, 13))
            },
            step: function (a) {
                var f = +new Date,
                    h, m = this.options;
                h = this.elem;
                var n = m.complete,
                    k = m.duration,
                    v = m.curAnim,
                    d;
                if (h.attr && !h.element) h = !1;
                else if (a || f >= k + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = v[this.prop] = !0;
                    for (d in v) !0 !== v[d] && (a = !1);
                    a && n && n.call(h);
                    h = !1
                } else this.pos = m.easing((f - this.startTime) / k), this.now = this.start + (this.end - this.start) * this.pos, this.update(), h = !0;
                return h
            },
            initPath: function (m, f, h) {
                function q(a) {
                    for (l = a.length; l--;) "M" !== a[l] && "L" !== a[l] || a.splice(l + 1, 0, a[l + 1], a[l + 2], a[l + 1], a[l + 2])
                }

                function n(a, b) {
                    for (; a.length < c;) {
                        a[0] = b[c - a.length];
                        var e = a.slice(0,
                            B);
                        [].splice.apply(a, [0, 0].concat(e));
                        u && (e = a.slice(a.length - B), [].splice.apply(a, [a.length, 0].concat(e)), l--)
                    }
                    a[0] = "M"
                }

                function k(a, b) {
                    for (var t = (c - a.length) / B; 0 < t && t--;) e = a.slice().splice(a.length / L - B, B * L), e[0] = b[c - B - t * B], w && (e[B - 6] = e[B - 2], e[B - 5] = e[B - 1]), [].splice.apply(a, [a.length / L, 0].concat(e)), u && t--
                }
                f = f || "";
                var v, d = m.startX,
                    g = m.endX,
                    w = -1 < f.indexOf("C"),
                    B = w ? 7 : 3,
                    c, e, l;
                f = f.split(" ");
                h = h.slice();
                var u = m.isArea,
                    L = u ? 2 : 1,
                    b;
                w && (q(f), q(h));
                if (d && g) {
                    for (l = 0; l < d.length; l++)
                        if (d[l] === g[0]) {
                            v = l;
                            break
                        } else if (d[0] ===
                        g[g.length - d.length + l]) {
                        v = l;
                        b = !0;
                        break
                    }
                    void 0 === v && (f = [])
                }
                f.length && a.isNumber(v) && (c = h.length + v * L * B, b ? (n(f, h), k(h, f)) : (n(h, f), k(f, h)));
                return [f, h]
            }
        };
        a.extend = function (a, f) {
            var h;
            a || (a = {});
            for (h in f) a[h] = f[h];
            return a
        };
        a.merge = function () {
            var m, f = arguments,
                h, q = {},
                n = function (k, f) {
                    var d, g;
                    "object" !== typeof k && (k = {});
                    for (g in f) f.hasOwnProperty(g) && (d = f[g], a.isObject(d, !0) && "renderTo" !== g && "number" !== typeof d.nodeType ? k[g] = n(k[g] || {}, d) : k[g] = f[g]);
                    return k
                };
            !0 === f[0] && (q = f[1], f = Array.prototype.slice.call(f,
                2));
            h = f.length;
            for (m = 0; m < h; m++) q = n(q, f[m]);
            return q
        };
        a.pInt = function (a, f) {
            return parseInt(a, f || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (m, f) {
            return m && "object" === typeof m && (!f || !a.isArray(m))
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function (a, f) {
            for (var h = a.length; h--;)
                if (a[h] === f) {
                    a.splice(h, 1);
                    break
                }
        };
        a.defined = function (a) {
            return void 0 !==
                a && null !== a
        };
        a.attr = function (m, f, h) {
            var q, n;
            if (a.isString(f)) a.defined(h) ? m.setAttribute(f, h) : m && m.getAttribute && (n = m.getAttribute(f));
            else if (a.defined(f) && a.isObject(f))
                for (q in f) m.setAttribute(q, f[q]);
            return n
        };
        a.splat = function (m) {
            return a.isArray(m) ? m : [m]
        };
        a.syncTimeout = function (a, f, h) {
            if (f) return setTimeout(a, f, h);
            a.call(0, h)
        };
        a.pick = function () {
            var a = arguments,
                f, h, q = a.length;
            for (f = 0; f < q; f++)
                if (h = a[f], void 0 !== h && null !== h) return h
        };
        a.css = function (m, f) {
            a.isMS && !a.svg && f && void 0 !== f.opacity && (f.filter =
                "alpha(opacity\x3d" + 100 * f.opacity + ")");
            a.extend(m.style, f)
        };
        a.createElement = function (m, f, h, q, n) {
            m = F.createElement(m);
            var k = a.css;
            f && a.extend(m, f);
            n && k(m, {
                padding: 0,
                border: "none",
                margin: 0
            });
            h && k(m, h);
            q && q.appendChild(m);
            return m
        };
        a.extendClass = function (m, f) {
            var h = function () {};
            h.prototype = new m;
            a.extend(h.prototype, f);
            return h
        };
        a.pad = function (a, f, h) {
            return Array((f || 2) + 1 - String(a).length).join(h || 0) + a
        };
        a.relativeLength = function (a, f) {
            return /%$/.test(a) ? f * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function (a,
            f, h) {
            var m = a[f];
            a[f] = function () {
                var a = Array.prototype.slice.call(arguments);
                a.unshift(m);
                return h.apply(this, a)
            }
        };
        a.getTZOffset = function (m) {
            var f = a.Date;
            return 6E4 * (f.hcGetTimezoneOffset && f.hcGetTimezoneOffset(m) || f.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (m, f, h) {
            if (!a.defined(f) || isNaN(f)) return a.defaultOptions.lang.invalidDate || "";
            m = a.pick(m, "%Y-%m-%d %H:%M:%S");
            var q = a.Date,
                n = new q(f - a.getTZOffset(f)),
                k, v = n[q.hcGetHours](),
                d = n[q.hcGetDay](),
                g = n[q.hcGetDate](),
                w = n[q.hcGetMonth](),
                B = n[q.hcGetFullYear](),
                c = a.defaultOptions.lang,
                e = c.weekdays,
                l = c.shortWeekdays,
                u = a.pad,
                q = a.extend({
                    a: l ? l[d] : e[d].substr(0, 3),
                    A: e[d],
                    d: u(g),
                    e: u(g, 2, " "),
                    w: d,
                    b: c.shortMonths[w],
                    B: c.months[w],
                    m: u(w + 1),
                    y: B.toString().substr(2, 2),
                    Y: B,
                    H: u(v),
                    k: v,
                    I: u(v % 12 || 12),
                    l: v % 12 || 12,
                    M: u(n[q.hcGetMinutes]()),
                    p: 12 > v ? "AM" : "PM",
                    P: 12 > v ? "am" : "pm",
                    S: u(n.getSeconds()),
                    L: u(Math.round(f % 1E3), 3)
                }, a.dateFormats);
            for (k in q)
                for (; - 1 !== m.indexOf("%" + k);) m = m.replace("%" + k, "function" === typeof q[k] ? q[k](f) : q[k]);
            return h ? m.substr(0, 1).toUpperCase() + m.substr(1) :
                m
        };
        a.formatSingle = function (m, f) {
            var h = /\.([0-9])/,
                q = a.defaultOptions.lang;
            /f$/.test(m) ? (h = (h = m.match(h)) ? h[1] : -1, null !== f && (f = a.numberFormat(f, h, q.decimalPoint, -1 < m.indexOf(",") ? q.thousandsSep : ""))) : f = a.dateFormat(m, f);
            return f
        };
        a.format = function (m, f) {
            for (var h = "{", q = !1, n, k, v, d, g = [], w; m;) {
                h = m.indexOf(h);
                if (-1 === h) break;
                n = m.slice(0, h);
                if (q) {
                    n = n.split(":");
                    k = n.shift().split(".");
                    d = k.length;
                    w = f;
                    for (v = 0; v < d; v++) w = w[k[v]];
                    n.length && (w = a.formatSingle(n.join(":"), w));
                    g.push(w)
                } else g.push(n);
                m = m.slice(h +
                    1);
                h = (q = !q) ? "}" : "{"
            }
            g.push(m);
            return g.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (m, f, h, q, n) {
            var k, v = m;
            h = a.pick(h, 1);
            k = m / h;
            f || (f = [1, 2, 2.5, 5, 10], !1 === q && (1 === h ? f = [1, 2, 5, 10] : .1 >= h && (f = [1 / h])));
            for (q = 0; q < f.length && !(v = f[q], n && v * h >= m || !n && k <= (f[q] + (f[q + 1] || f[q])) / 2); q++);
            return v * h
        };
        a.stableSort = function (a, f) {
            var h = a.length,
                m, n;
            for (n = 0; n < h; n++) a[n].safeI = n;
            a.sort(function (a, n) {
                m = f(a, n);
                return 0 === m ? a.safeI - n.safeI : m
            });
            for (n =
                0; n < h; n++) delete a[n].safeI
        };
        a.arrayMin = function (a) {
            for (var f = a.length, h = a[0]; f--;) a[f] < h && (h = a[f]);
            return h
        };
        a.arrayMax = function (a) {
            for (var f = a.length, h = a[0]; f--;) a[f] > h && (h = a[f]);
            return h
        };
        a.destroyObjectProperties = function (a, f) {
            for (var h in a) a[h] && a[h] !== f && a[h].destroy && a[h].destroy(), delete a[h]
        };
        a.discardElement = function (m) {
            var f = a.garbageBin;
            f || (f = a.createElement("div"));
            m && f.appendChild(m);
            f.innerHTML = ""
        };
        a.correctFloat = function (a, f) {
            return parseFloat(a.toPrecision(f || 14))
        };
        a.setAnimation =
            function (m, f) {
                f.renderer.globalAnimation = a.pick(m, f.options.chart.animation, !0)
            };
        a.animObject = function (m) {
            return a.isObject(m) ? a.merge(m) : {
                duration: m ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (m, f, h, q) {
            m = +m || 0;
            f = +f;
            var n = a.defaultOptions.lang,
                k = (m.toString().split(".")[1] || "").length,
                v, d, g = Math.abs(m); - 1 === f ? f = Math.min(k, 20) : a.isNumber(f) || (f = 2);
            v = String(a.pInt(g.toFixed(f)));
            d = 3 < v.length ? v.length % 3 :
                0;
            h = a.pick(h, n.decimalPoint);
            q = a.pick(q, n.thousandsSep);
            m = (0 > m ? "-" : "") + (d ? v.substr(0, d) + q : "");
            m += v.substr(d).replace(/(\d{3})(?=\d)/g, "$1" + q);
            f && (q = Math.abs(g - v + Math.pow(10, -Math.max(f, k) - 1)), m += h + q.toFixed(f).slice(2));
            return m
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (m, f) {
            return "width" === f ? Math.min(m.offsetWidth, m.scrollWidth) - a.getStyle(m, "padding-left") - a.getStyle(m, "padding-right") : "height" === f ? Math.min(m.offsetHeight, m.scrollHeight) - a.getStyle(m,
                "padding-top") - a.getStyle(m, "padding-bottom") : (m = J.getComputedStyle(m, void 0)) && a.pInt(m.getPropertyValue(f))
        };
        a.inArray = function (a, f) {
            return f.indexOf ? f.indexOf(a) : [].indexOf.call(f, a)
        };
        a.grep = function (a, f) {
            return [].filter.call(a, f)
        };
        a.map = function (a, f) {
            for (var h = [], q = 0, n = a.length; q < n; q++) h[q] = f.call(a[q], a[q], q, a);
            return h
        };
        a.offset = function (a) {
            var f = F.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (J.pageYOffset || f.scrollTop) - (f.clientTop || 0),
                left: a.left + (J.pageXOffset || f.scrollLeft) -
                    (f.clientLeft || 0)
            }
        };
        a.stop = function (a) {
            for (var f = D.length; f--;) D[f].elem === a && (D[f].stopped = !0)
        };
        a.each = function (a, f, h) {
            return Array.prototype.forEach.call(a, f, h)
        };
        a.addEvent = function (a, f, h) {
            function q(k) {
                k.target = k.srcElement || J;
                h.call(a, k)
            }
            var n = a.hcEvents = a.hcEvents || {};
            a.addEventListener ? a.addEventListener(f, h, !1) : a.attachEvent && (a.hcEventsIE || (a.hcEventsIE = {}), a.hcEventsIE[h.toString()] = q, a.attachEvent("on" + f, q));
            n[f] || (n[f] = []);
            n[f].push(h)
        };
        a.removeEvent = function (m, f, h) {
            function q(a, d) {
                m.removeEventListener ?
                    m.removeEventListener(a, d, !1) : m.attachEvent && (d = m.hcEventsIE[d.toString()], m.detachEvent("on" + a, d))
            }

            function n() {
                var a, d;
                if (m.nodeName)
                    for (d in f ? (a = {}, a[f] = !0) : a = v, a)
                        if (v[d])
                            for (a = v[d].length; a--;) q(d, v[d][a])
            }
            var k, v = m.hcEvents,
                d;
            v && (f ? (k = v[f] || [], h ? (d = a.inArray(h, k), -1 < d && (k.splice(d, 1), v[f] = k), q(f, h)) : (n(), v[f] = [])) : (n(), m.hcEvents = {}))
        };
        a.fireEvent = function (m, f, h, q) {
            var n;
            n = m.hcEvents;
            var k, v;
            h = h || {};
            if (F.createEvent && (m.dispatchEvent || m.fireEvent)) n = F.createEvent("Events"), n.initEvent(f, !0, !0), a.extend(n, h), m.dispatchEvent ? m.dispatchEvent(n) : m.fireEvent(f, n);
            else if (n)
                for (n = n[f] || [], k = n.length, h.target || a.extend(h, {
                        preventDefault: function () {
                            h.defaultPrevented = !0
                        },
                        target: m,
                        type: f
                    }), f = 0; f < k; f++)(v = n[f]) && !1 === v.call(m, h) && h.preventDefault();
            q && !h.defaultPrevented && q(h)
        };
        a.animate = function (m, f, h) {
            var q, n = "",
                k, v, d;
            a.isObject(h) || (q = arguments, h = {
                duration: q[2],
                easing: q[3],
                complete: q[4]
            });
            a.isNumber(h.duration) || (h.duration = 400);
            h.easing = "function" === typeof h.easing ? h.easing : Math[h.easing] ||
                Math.easeInOutSine;
            h.curAnim = a.merge(f);
            for (d in f) v = new a.Fx(m, h, d), k = null, "d" === d ? (v.paths = v.initPath(m, m.d, f.d), v.toD = f.d, q = 0, k = 1) : m.attr ? q = m.attr(d) : (q = parseFloat(a.getStyle(m, d)) || 0, "opacity" !== d && (n = "px")), k || (k = f[d]), k.match && k.match("px") && (k = k.replace(/px/g, "")), v.run(q, k, n)
        };
        a.seriesType = function (m, f, h, q, n) {
            var k = a.getOptions(),
                v = a.seriesTypes;
            k.plotOptions[m] = a.merge(k.plotOptions[f], h);
            v[m] = a.extendClass(v[f] || function () {}, q);
            v[m].prototype.type = m;
            n && (v[m].prototype.pointClass = a.extendClass(a.Point,
                n));
            return v[m]
        };
        J.jQuery && (J.jQuery.fn.highcharts = function () {
            var m = [].slice.call(arguments);
            if (this[0]) return m[0] ? (new(a[a.isString(m[0]) ? m.shift() : "Chart"])(this[0], m[0], m[1]), this) : z[a.attr(this[0], "data-highcharts-chart")]
        });
        F && !F.defaultView && (a.getStyle = function (m, f) {
            var h = {
                width: "clientWidth",
                height: "clientHeight"
            }[f];
            if (m.style[f]) return a.pInt(m.style[f]);
            "opacity" === f && (f = "filter");
            if (h) return m.style.zoom = 1, Math.max(m[h] - 2 * a.getStyle(m, "padding"), 0);
            m = m.currentStyle[f.replace(/\-(\w)/g,
                function (a, n) {
                    return n.toUpperCase()
                })];
            "filter" === f && (m = m.replace(/alpha\(opacity=([0-9]+)\)/, function (a, n) {
                return n / 100
            }));
            return "" === m ? 1 : a.pInt(m)
        });
        Array.prototype.forEach || (a.each = function (a, f, h) {
            for (var q = 0, n = a.length; q < n; q++)
                if (!1 === f.call(h, a[q], q, a)) return q
        });
        Array.prototype.indexOf || (a.inArray = function (a, f) {
            var h, q = 0;
            if (f)
                for (h = f.length; q < h; q++)
                    if (f[q] === a) return q;
            return -1
        });
        Array.prototype.filter || (a.grep = function (a, f) {
            for (var h = [], q = 0, n = a.length; q < n; q++) f(a[q], q) && h.push(a[q]);
            return h
        })
    })(M);
    (function (a) {
        var D = a.each,
            z = a.isNumber,
            F = a.map,
            J = a.merge,
            m = a.pInt;
        a.Color = function (f) {
            if (!(this instanceof a.Color)) return new a.Color(f);
            this.init(f)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [m(a[1]), m(a[2]), m(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                parse: function (a) {
                    return [m(a[1], 16), m(a[2], 16), m(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [m(a[1]), m(a[2]), m(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function (f) {
                var h, q, n, k;
                if ((this.input = f = this.names[f] || f) && f.stops) this.stops = F(f.stops, function (k) {
                    return new a.Color(k[1])
                });
                else
                    for (n = this.parsers.length; n-- && !q;) k = this.parsers[n], (h = k.regex.exec(f)) && (q = k.parse(h));
                this.rgba = q || []
            },
            get: function (a) {
                var h = this.input,
                    f = this.rgba,
                    n;
                this.stops ? (n = J(h), n.stops = [].concat(n.stops), D(this.stops, function (k, f) {
                        n.stops[f] = [n.stops[f][0], k.get(a)]
                    })) : n = f &&
                    z(f[0]) ? "rgb" === a || !a && 1 === f[3] ? "rgb(" + f[0] + "," + f[1] + "," + f[2] + ")" : "a" === a ? f[3] : "rgba(" + f.join(",") + ")" : h;
                return n
            },
            brighten: function (a) {
                var h, f = this.rgba;
                if (this.stops) D(this.stops, function (n) {
                    n.brighten(a)
                });
                else if (z(a) && 0 !== a)
                    for (h = 0; 3 > h; h++) f[h] += m(255 * a), 0 > f[h] && (f[h] = 0), 255 < f[h] && (f[h] = 255);
                return this
            },
            setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            }
        };
        a.color = function (f) {
            return new a.Color(f)
        }
    })(M);
    (function (a) {
        var D, z, F = a.addEvent,
            J = a.animate,
            m = a.attr,
            f = a.charts,
            h = a.color,
            q = a.css,
            n = a.createElement,
            k = a.defined,
            v = a.deg2rad,
            d = a.destroyObjectProperties,
            g = a.doc,
            w = a.each,
            B = a.extend,
            c = a.erase,
            e = a.grep,
            l = a.hasTouch,
            u = a.isArray,
            L = a.isFirefox,
            b = a.isMS,
            t = a.isObject,
            y = a.isString,
            K = a.isWebKit,
            x = a.merge,
            I = a.noop,
            r = a.pick,
            G = a.pInt,
            H = a.removeEvent,
            N = a.stop,
            p = a.svg,
            A = a.SVG_NS,
            P = a.symbolSizes,
            O = a.win;
        D = a.SVGElement = function () {
            return this
        };
        D.prototype = {
            opacity: 1,
            SVG_NS: A,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),
            init: function (a,
                b) {
                this.element = "span" === b ? n(b) : g.createElementNS(this.SVG_NS, b);
                this.renderer = a
            },
            animate: function (a, b, p) {
                b = r(b, this.renderer.globalAnimation, !0);
                N(this);
                b ? (p && (b.complete = p), J(this, a, b)) : this.attr(a, null, p);
                return this
            },
            colorGradient: function (b, E, p) {
                var C = this.renderer,
                    e, A, c, d, t, S, l, g, y, r, n, H = [],
                    G;
                b.linearGradient ? A = "linearGradient" : b.radialGradient && (A = "radialGradient");
                if (A) {
                    c = b[A];
                    t = C.gradients;
                    l = b.stops;
                    r = p.radialReference;
                    u(c) && (b[A] = c = {
                        x1: c[0],
                        y1: c[1],
                        x2: c[2],
                        y2: c[3],
                        gradientUnits: "userSpaceOnUse"
                    });
                    "radialGradient" === A && r && !k(c.gradientUnits) && (d = c, c = x(c, C.getRadialAttr(r, d), {
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (n in c) "id" !== n && H.push(n, c[n]);
                    for (n in l) H.push(l[n]);
                    H = H.join(",");
                    t[H] ? r = t[H].attr("id") : (c.id = r = "highcharts-" + a.idCounter++, t[H] = S = C.createElement(A).attr(c).add(C.defs), S.radAttr = d, S.stops = [], w(l, function (b) {
                        0 === b[1].indexOf("rgba") ? (e = a.color(b[1]), g = e.get("rgb"), y = e.get("a")) : (g = b[1], y = 1);
                        b = C.createElement("stop").attr({
                            offset: b[0],
                            "stop-color": g,
                            "stop-opacity": y
                        }).add(S);
                        S.stops.push(b)
                    }));
                    G = "url(" + C.url + "#" + r + ")";
                    p.setAttribute(E, G);
                    p.gradient = H;
                    b.toString = function () {
                        return G
                    }
                }
            },
            applyTextShadow: function (a) {
                var C = this.element,
                    p, e = -1 !== a.indexOf("contrast"),
                    c = {},
                    A = this.renderer.forExport,
                    d = this.renderer.forExport || void 0 !== C.style.textShadow && !b;
                e && (c.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(C.style.fill)));
                if (K || A) c.textRendering = "geometricPrecision";
                d ? this.css(c) : (this.fakeTS = !0, this.ySetter = this.xSetter, p = [].slice.call(C.getElementsByTagName("tspan")), w(a.split(/\s?,\s?/g),
                    function (a) {
                        var b = C.firstChild,
                            E, e;
                        a = a.split(" ");
                        E = a[a.length - 1];
                        (e = a[a.length - 2]) && w(p, function (a, p) {
                            0 === p && (a.setAttribute("x", C.getAttribute("x")), p = C.getAttribute("y"), a.setAttribute("y", p || 0), null === p && C.setAttribute("y", 0));
                            a = a.cloneNode(1);
                            m(a, {
                                "class": "highcharts-text-shadow",
                                fill: E,
                                stroke: E,
                                "stroke-opacity": 1 / Math.max(G(e), 3),
                                "stroke-width": e,
                                "stroke-linejoin": "round"
                            });
                            C.insertBefore(a, b)
                        })
                    }))
            },
            attr: function (a, b, p) {
                var C, E = this.element,
                    e, c = this,
                    A;
                "string" === typeof a && void 0 !== b && (C = a, a = {}, a[C] = b);
                if ("string" === typeof a) c = (this[a + "Getter"] || this._defaultGetter).call(this, a, E);
                else {
                    for (C in a) b = a[C], A = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(C) && (e || (this.symbolAttr(a), e = !0), A = !0), !this.rotation || "x" !== C && "y" !== C || (this.doTransform = !0), A || (A = this[C + "Setter"] || this._defaultSetter, A.call(this, b, C, E), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(C) && this.updateShadows(C, b, A));
                    this.doTransform && (this.updateTransform(),
                        this.doTransform = !1)
                }
                p && p();
                return c
            },
            updateShadows: function (a, b, p) {
                for (var C = this.shadows, E = C.length; E--;) p.call(C[E], "height" === a ? Math.max(b - (C[E].cutHeight || 0), 0) : "d" === a ? this.d : b, a, C[E])
            },
            addClass: function (a, b) {
                var C = this.attr("class") || ""; - 1 === C.indexOf(a) && (b || (a = (C + (C ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== m(this.element, "class").indexOf(a)
            },
            removeClass: function (a) {
                m(this.element, "class", (m(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function (a) {
                var b = this;
                w("x y r start end width height innerR anchorX anchorY".split(" "), function (C) {
                    b[C] = r(a[C], b[C])
                });
                b.attr({
                    d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
                })
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, b) {
                var C, p = {},
                    E;
                b = b || a.strokeWidth || 0;
                E = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + E;
                a.y = Math.floor(a.y || this.y || 0) + E;
                a.width = Math.floor((a.width || this.width || 0) - 2 *
                    E);
                a.height = Math.floor((a.height || this.height || 0) - 2 * E);
                k(a.strokeWidth) && (a.strokeWidth = b);
                for (C in a) this[C] !== a[C] && (this[C] = p[C] = a[C]);
                return p
            },
            css: function (a) {
                var C = this.styles,
                    e = {},
                    A = this.element,
                    c, d, t = "";
                c = !C;
                a && a.color && (a.fill = a.color);
                if (C)
                    for (d in a) a[d] !== C[d] && (e[d] = a[d], c = !0);
                if (c) {
                    c = this.textWidth = a && a.width && "text" === A.nodeName.toLowerCase() && G(a.width) || this.textWidth;
                    C && (a = B(C, e));
                    this.styles = a;
                    c && !p && this.renderer.forExport && delete a.width;
                    if (b && !p) q(this.element, a);
                    else {
                        C = function (a,
                            b) {
                            return "-" + b.toLowerCase()
                        };
                        for (d in a) t += d.replace(/([A-Z])/g, C) + ":" + a[d] + ";";
                        m(A, "style", t)
                    }
                    this.added && c && this.renderer.buildText(this)
                }
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, b) {
                var C = this,
                    p = C.element;
                l && "click" === a ? (p.ontouchstart = function (a) {
                    C.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(p, a)
                }, p.onclick = function (a) {
                    (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (C.touchEventFired || 0)) && b.call(p, a)
                }) : p["on" + a] = b;
                return this
            },
            setRadialReference: function (a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function (a, b) {
                return this.attr({
                    translateX: a,
                    translateY: b
                })
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0,
                    b = this.translateY || 0,
                    p = this.scaleX,
                    e = this.scaleY,
                    c = this.inverted,
                    A = this.rotation,
                    d = this.element;
                c && (a += this.attr("width"),
                    b += this.attr("height"));
                a = ["translate(" + a + "," + b + ")"];
                c ? a.push("rotate(90) scale(-1,1)") : A && a.push("rotate(" + A + " " + (d.getAttribute("x") || 0) + " " + (d.getAttribute("y") || 0) + ")");
                (k(p) || k(e)) && a.push("scale(" + r(p, 1) + " " + r(e, 1) + ")");
                a.length && d.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, b, p) {
                var C, E, e, A, d = {};
                E = this.renderer;
                e = E.alignedObjects;
                var t, l;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = b, !p || y(p)) this.alignTo =
                        C = p || "renderer", c(e, this), e.push(this), p = null
                } else a = this.alignOptions, b = this.alignByTranslate, C = this.alignTo;
                p = r(p, E[C], E);
                C = a.align;
                E = a.verticalAlign;
                e = (p.x || 0) + (a.x || 0);
                A = (p.y || 0) + (a.y || 0);
                "right" === C ? t = 1 : "center" === C && (t = 2);
                t && (e += (p.width - (a.width || 0)) / t);
                d[b ? "translateX" : "x"] = Math.round(e);
                "bottom" === E ? l = 1 : "middle" === E && (l = 2);
                l && (A += (p.height - (a.height || 0)) / l);
                d[b ? "translateY" : "y"] = Math.round(A);
                this[this.placed ? "animate" : "attr"](d);
                this.placed = !0;
                this.alignAttr = d;
                return this
            },
            getBBox: function (a,
                p) {
                var C, E = this.renderer,
                    e, A = this.element,
                    c = this.styles,
                    d, t = this.textStr,
                    l, g = A.style,
                    y, u = E.cache,
                    x = E.cacheKeys,
                    k;
                p = r(p, this.rotation);
                e = p * v;
                d = c && c.fontSize;
                void 0 !== t && (k = t.toString().replace(/[0-9]/g, "0") + ["", p || 0, d, A.style.width].join());
                k && !a && (C = u[k]);
                if (!C) {
                    if (A.namespaceURI === this.SVG_NS || E.forExport) {
                        try {
                            y = this.fakeTS && function (a) {
                                w(A.querySelectorAll(".highcharts-text-shadow"), function (b) {
                                    b.style.display = a
                                })
                            }, L && g.textShadow ? (l = g.textShadow, g.textShadow = "") : y && y("none"), C = A.getBBox ? B({}, A.getBBox()) : {
                                width: A.offsetWidth,
                                height: A.offsetHeight
                            }, l ? g.textShadow = l : y && y("")
                        } catch (V) {}
                        if (!C || 0 > C.width) C = {
                            width: 0,
                            height: 0
                        }
                    } else C = this.htmlGetBBox();
                    E.isSVG && (a = C.width, E = C.height, b && c && "11px" === c.fontSize && "16.9" === E.toPrecision(3) && (C.height = E = 14), p && (C.width = Math.abs(E * Math.sin(e)) + Math.abs(a * Math.cos(e)), C.height = Math.abs(E * Math.cos(e)) + Math.abs(a * Math.sin(e))));
                    if (k && 0 < C.height) {
                        for (; 250 < x.length;) delete u[x.shift()];
                        u[k] || x.push(k);
                        u[k] = C
                    }
                }
                return C
            },
            show: function (a) {
                return this.attr({
                    visibility: a ?
                        "inherit" : "visible"
                })
            },
            hide: function () {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function (a) {
                var b = this;
                b.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function () {
                        b.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function (a) {
                var b = this.renderer,
                    p = this.element,
                    C;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) C = this.zIndexSetter();
                C || (a ? a.element : b.box).appendChild(p);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var b =
                    a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function () {
                var a = this.element || {},
                    b = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup,
                    p, e;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                N(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (e = 0; e < this.stops.length; e++) this.stops[e] = this.stops[e].destroy();
                    this.stops = null
                }
                this.safeRemoveChild(a);
                for (this.destroyShadows(); b && b.div && 0 === b.div.childNodes.length;) a = b.parentGroup, this.safeRemoveChild(b.div),
                    delete b.div, b = a;
                this.alignTo && c(this.renderer.alignedObjects, this);
                for (p in this) delete this[p];
                return null
            },
            shadow: function (a, b, p) {
                var C = [],
                    e, E, A = this.element,
                    c, d, t, l;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    d = r(a.width, 3);
                    t = (a.opacity || .15) / d;
                    l = this.parentInverted ? "(-1,-1)" : "(" + r(a.offsetX, 1) + ", " + r(a.offsetY, 1) + ")";
                    for (e = 1; e <= d; e++) E = A.cloneNode(0), c = 2 * d + 1 - 2 * e, m(E, {
                            isShadow: "true",
                            stroke: a.color || "#000000",
                            "stroke-opacity": t * e,
                            "stroke-width": c,
                            transform: "translate" + l,
                            fill: "none"
                        }), p &&
                        (m(E, "height", Math.max(m(E, "height") - c, 0)), E.cutHeight = c), b ? b.element.appendChild(E) : A.parentNode.insertBefore(E, A), C.push(E);
                    this.shadows = C
                }
                return this
            },
            destroyShadows: function () {
                w(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = r(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, b, p) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                p.setAttribute(b, a);
                this[b] = a
            },
            dashstyleSetter: function (a) {
                var b, p = this["stroke-width"];
                "inherit" === p && (p = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] = G(a[b]) *
                        p;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function (a, b, p) {
                this[b] = a;
                p.setAttribute(b, a)
            },
            titleSetter: function (a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = g.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(g.createTextNode(String(r(a), "").replace(/<[^>]*>/g,
                    "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, b, p) {
                "string" === typeof a ? p.setAttribute(b, a) : a && this.colorGradient(a, b, p)
            },
            visibilitySetter: function (a, b, p) {
                "inherit" === a ? p.removeAttribute(b) : p.setAttribute(b, a)
            },
            zIndexSetter: function (a, b) {
                var p = this.renderer,
                    e = this.parentGroup,
                    C = (e || p).element || p.box,
                    E, A = this.element,
                    c;
                E = this.added;
                var d;
                k(a) && (A.zIndex = a, a = +a, this[b] === a && (E = !1), this[b] = a);
                if (E) {
                    (a =
                        this.zIndex) && e && (e.handleZ = !0);
                    b = C.childNodes;
                    for (d = 0; d < b.length && !c; d++) e = b[d], E = e.zIndex, e !== A && (G(E) > a || !k(a) && k(E) || 0 > a && !k(E) && C !== p.box) && (C.insertBefore(A, e), c = !0);
                    c || C.appendChild(A)
                }
                return c
            },
            _defaultSetter: function (a, b, p) {
                p.setAttribute(b, a)
            }
        };
        D.prototype.yGetter = D.prototype.xGetter;
        D.prototype.translateXSetter = D.prototype.translateYSetter = D.prototype.rotationSetter = D.prototype.verticalAlignSetter = D.prototype.scaleXSetter = D.prototype.scaleYSetter = function (a, b) {
            this[b] = a;
            this.doTransform = !0
        };
        D.prototype["stroke-widthSetter"] = D.prototype.strokeSetter = function (a, b, p) {
            this[b] = a;
            this.stroke && this["stroke-width"] ? (D.prototype.fillSetter.call(this, this.stroke, "stroke", p), p.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (p.removeAttribute("stroke"), this.hasStroke = !1)
        };
        z = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        z.prototype = {
            Element: D,
            SVG_NS: A,
            init: function (a, b, p, e, A, c) {
                var E;
                e = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(e));
                E = e.element;
                a.appendChild(E); - 1 === a.innerHTML.indexOf("xmlns") && m(E, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = E;
                this.boxWrapper = e;
                this.alignedObjects = [];
                this.url = (L || K) && g.getElementsByTagName("base").length ? O.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(g.createTextNode("Created with Highcharts 5.0.2"));
                this.defs = this.createElement("defs").add();
                this.allowHTML =
                    c;
                this.forExport = A;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, p, !1);
                var C;
                L && a.getBoundingClientRect && (this.subPixelFix = b = function () {
                    q(a, {
                        left: 0,
                        top: 0
                    });
                    C = a.getBoundingClientRect();
                    q(a, {
                        left: Math.ceil(C.left) - C.left + "px",
                        top: Math.ceil(C.top) - C.top + "px"
                    })
                }, b(), F(O, "resize", b))
            },
            getStyle: function (a) {
                return this.style = B({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                d(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.subPixelFix && H(O, "resize", this.subPixelFix);
                return this.alignedObjects = null
            },
            createElement: function (a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: I,
            getRadialAttr: function (a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            buildText: function (a) {
                for (var b =
                        a.element, c = this, d = c.forExport, C = r(a.textStr, "").toString(), t = -1 !== C.indexOf("\x3c"), l = b.childNodes, y, u, x, k, n = m(b, "x"), H = a.styles, f = a.textWidth, K = H && H.lineHeight, h = H && H.textShadow, v = H && "ellipsis" === H.textOverflow, O = l.length, B = f && !a.added && this.box, P = function (a) {
                            var b;
                            b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : H && H.fontSize || c.style.fontSize || 12;
                            return K ? G(K) : c.fontMetrics(b, a).h
                        }; O--;) b.removeChild(l[O]);
                t || h || v || f || -1 !== C.indexOf(" ") ? (y = /<.*class="([^"]+)".*>/, u = /<.*style="([^"]+)".*>/,
                    x = /<.*href="(http[^"]+)".*>/, B && B.appendChild(b), C = t ? C.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [C], C = e(C, function (a) {
                        return "" !== a
                    }), w(C, function (e, E) {
                        var C, t = 0;
                        e = e.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        C = e.split("|||");
                        w(C, function (e) {
                            if ("" !== e || 1 === C.length) {
                                var l = {},
                                    r = g.createElementNS(c.SVG_NS, "tspan"),
                                    w, S;
                                y.test(e) && (w = e.match(y)[1], m(r, "class", w));
                                u.test(e) && (S = e.match(u)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), m(r, "style", S));
                                x.test(e) && !d && (m(r, "onclick", 'location.href\x3d"' + e.match(x)[1] + '"'), q(r, {
                                    cursor: "pointer"
                                }));
                                e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                                if (" " !== e) {
                                    r.appendChild(g.createTextNode(e));
                                    t ? l.dx = 0 : E && null !== n && (l.x = n);
                                    m(r, l);
                                    b.appendChild(r);
                                    !t && E && (!p && d && q(r, {
                                        display: "block"
                                    }), m(r, "dy",
                                        P(r)));
                                    if (f) {
                                        l = e.replace(/([^\^])-/g, "$1- ").split(" ");
                                        w = "nowrap" === H.whiteSpace;
                                        for (var G = 1 < C.length || E || 1 < l.length && !w, K, h, O = [], B = P(r), R = a.rotation, I = e, Q = I.length;
                                            (G || v) && (l.length || O.length);) a.rotation = 0, K = a.getBBox(!0), h = K.width, !p && c.forExport && (h = c.measureSpanWidth(r.firstChild.data, a.styles)), K = h > f, void 0 === k && (k = K), v && k ? (Q /= 2, "" === I || !K && .5 > Q ? l = [] : (I = e.substring(0, I.length + (K ? -1 : 1) * Math.ceil(Q)), l = [I + (3 < f ? "\u2026" : "")], r.removeChild(r.firstChild))) : K && 1 !== l.length ? (r.removeChild(r.firstChild),
                                            O.unshift(l.pop())) : (l = O, O = [], l.length && !w && (r = g.createElementNS(A, "tspan"), m(r, {
                                            dy: B,
                                            x: n
                                        }), S && m(r, "style", S), b.appendChild(r)), h > f && (f = h)), l.length && r.appendChild(g.createTextNode(l.join(" ").replace(/- /g, "-")));
                                        a.rotation = R
                                    }
                                    t++
                                }
                            }
                        })
                    }), k && a.attr("title", a.textStr), B && B.removeChild(b), h && a.applyTextShadow && a.applyTextShadow(h)) : b.appendChild(g.createTextNode(C.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            getContrast: function (a) {
                a = h(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function (a,
                p, e, c, A, d, t, l, g) {
                var E = this.label(a, p, e, g, null, null, null, null, "button"),
                    C = 0;
                E.attr(x({
                    padding: 8,
                    r: 2
                }, A));
                var r, y, u, k;
                A = x({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, A);
                r = A.style;
                delete A.style;
                d = x(A, {
                    fill: "#e6e6e6"
                }, d);
                y = d.style;
                delete d.style;
                t = x(A, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, t);
                u = t.style;
                delete t.style;
                l = x(A, {
                    style: {
                        color: "#cccccc"
                    }
                }, l);
                k = l.style;
                delete l.style;
                F(E.element, b ? "mouseover" : "mouseenter",
                    function () {
                        3 !== C && E.setState(1)
                    });
                F(E.element, b ? "mouseout" : "mouseleave", function () {
                    3 !== C && E.setState(C)
                });
                E.setState = function (a) {
                    1 !== a && (E.state = C = a);
                    E.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    E.attr([A, d, t, l][a || 0]).css([r, y, u, k][a || 0])
                };
                E.attr(A).css(B({
                    cursor: "default"
                }, r));
                return E.on("click", function (a) {
                    3 !== C && c.call(E, a)
                })
            },
            crispLine: function (a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 /
                    2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            },
            path: function (a) {
                var b = {
                    fill: "none"
                };
                u(a) ? b.d = a : t(a) && B(b, a);
                return this.createElement("path").attr(b)
            },
            circle: function (a, b, p) {
                a = t(a) ? a : {
                    x: a,
                    y: b,
                    r: p
                };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function (a, b, p) {
                    p.setAttribute("c" + b, a)
                };
                return b.attr(a)
            },
            arc: function (a, b, p, e, A, c) {
                t(a) && (b = a.y, p = a.r, e = a.innerR, A = a.start, c = a.end, a = a.x);
                a = this.symbol("arc", a || 0, b || 0, p || 0, p || 0, {
                    innerR: e || 0,
                    start: A || 0,
                    end: c || 0
                });
                a.r = p;
                return a
            },
            rect: function (a,
                b, p, e, A, c) {
                A = t(a) ? a.r : A;
                var d = this.createElement("rect");
                a = t(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: b,
                    width: Math.max(p, 0),
                    height: Math.max(e, 0)
                };
                void 0 !== c && (a.strokeWidth = c, a = d.crisp(a));
                a.fill = "none";
                A && (a.r = A);
                d.rSetter = function (a, b, p) {
                    m(p, {
                        rx: a,
                        ry: a
                    })
                };
                return d.attr(a)
            },
            setSize: function (a, b, p) {
                var e = this.alignedObjects,
                    A = e.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                        width: a,
                        height: b
                    }, {
                        step: function () {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: r(p, !0) ?
                            void 0 : 0
                    }); A--;) e[A].align()
            },
            g: function (a) {
                var b = this.createElement("g");
                return a ? b.attr({
                    "class": "highcharts-" + a
                }) : b
            },
            image: function (a, b, p, e, A) {
                var c = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && B(c, {
                    x: b,
                    y: p,
                    width: e,
                    height: A
                });
                c = this.createElement("image").attr(c);
                c.element.setAttributeNS ? c.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : c.element.setAttribute("hc-svg-href", a);
                return c
            },
            symbol: function (a, b, p, e, A, c) {
                var d = this,
                    E, t = this.symbols[a],
                    l = k(b) && t && t(Math.round(b), Math.round(p),
                        e, A, c),
                    C = /^url\((.*?)\)$/,
                    y, u;
                t ? (E = this.path(l), E.attr("fill", "none"), B(E, {
                    symbolName: a,
                    x: b,
                    y: p,
                    width: e,
                    height: A
                }), c && B(E, c)) : C.test(a) && (y = a.match(C)[1], E = this.image(y), E.imgwidth = r(P[y] && P[y].width, c && c.width), E.imgheight = r(P[y] && P[y].height, c && c.height), u = function () {
                    E.attr({
                        width: E.width,
                        height: E.height
                    })
                }, w(["width", "height"], function (a) {
                    E[a + "Setter"] = function (a, b) {
                        var p = {},
                            e = this["img" + b],
                            c = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        k(e) && (this.element && this.element.setAttribute(b, e), this.alignByTranslate ||
                            (p[c] = ((this[b] || 0) - e) / 2, this.attr(p)))
                    }
                }), k(b) && E.attr({
                    x: b,
                    y: p
                }), E.isImg = !0, k(E.imgwidth) && k(E.imgheight) ? u() : (E.attr({
                    width: 0,
                    height: 0
                }), n("img", {
                    onload: function () {
                        var a = f[d.chartIndex];
                        0 === this.width && (q(this, {
                            position: "absolute",
                            top: "-999em"
                        }), g.body.appendChild(this));
                        P[y] = {
                            width: this.width,
                            height: this.height
                        };
                        E.imgwidth = this.width;
                        E.imgheight = this.height;
                        E.element && u();
                        this.parentNode && this.parentNode.removeChild(this);
                        d.imgCount--;
                        if (!d.imgCount && a && a.onload) a.onload()
                    },
                    src: y
                }), this.imgCount++));
                return E
            },
            symbols: {
                circle: function (a, b, p, e) {
                    var c = .166 * p;
                    return ["M", a + p / 2, b, "C", a + p + c, b, a + p + c, b + e, a + p / 2, b + e, "C", a - c, b + e, a - c, b, a + p / 2, b, "Z"]
                },
                square: function (a, b, p, e) {
                    return ["M", a, b, "L", a + p, b, a + p, b + e, a, b + e, "Z"]
                },
                triangle: function (a, b, p, e) {
                    return ["M", a + p / 2, b, "L", a + p, b + e, a, b + e, "Z"]
                },
                "triangle-down": function (a, b, p, e) {
                    return ["M", a, b, "L", a + p, b, a + p / 2, b + e, "Z"]
                },
                diamond: function (a, b, p, e) {
                    return ["M", a + p / 2, b, "L", a + p, b + e / 2, a + p / 2, b + e, a, b + e / 2, "Z"]
                },
                arc: function (a, b, p, e, c) {
                    var A = c.start;
                    p = c.r || p || e;
                    var d = c.end - .001;
                    e = c.innerR;
                    var t = c.open,
                        E = Math.cos(A),
                        l = Math.sin(A),
                        y = Math.cos(d),
                        d = Math.sin(d);
                    c = c.end - A < Math.PI ? 0 : 1;
                    return ["M", a + p * E, b + p * l, "A", p, p, 0, c, 1, a + p * y, b + p * d, t ? "M" : "L", a + e * y, b + e * d, "A", e, e, 0, c, 0, a + e * E, b + e * l, t ? "" : "Z"]
                },
                callout: function (a, b, p, e, c) {
                    var A = Math.min(c && c.r || 0, p, e),
                        d = A + 6,
                        t = c && c.anchorX;
                    c = c && c.anchorY;
                    var l;
                    l = ["M", a + A, b, "L", a + p - A, b, "C", a + p, b, a + p, b, a + p, b + A, "L", a + p, b + e - A, "C", a + p, b + e, a + p, b + e, a + p - A, b + e, "L", a + A, b + e, "C", a, b + e, a, b + e, a, b + e - A, "L", a, b + A, "C", a, b, a, b, a + A, b];
                    t && t > p && c > b + d && c < b + e - d ? l.splice(13,
                        3, "L", a + p, c - 6, a + p + 6, c, a + p, c + 6, a + p, b + e - A) : t && 0 > t && c > b + d && c < b + e - d ? l.splice(33, 3, "L", a, c + 6, a - 6, c, a, c - 6, a, b + A) : c && c > e && t > a + d && t < a + p - d ? l.splice(23, 3, "L", t + 6, b + e, t, b + e + 6, t - 6, b + e, a + A, b + e) : c && 0 > c && t > a + d && t < a + p - d && l.splice(3, 3, "L", t - 6, b, t, b - 6, t + 6, b, p - A, b);
                    return l
                }
            },
            clipRect: function (b, p, e, c) {
                var A = "highcharts-" + a.idCounter++,
                    d = this.createElement("clipPath").attr({
                        id: A
                    }).add(this.defs);
                b = this.rect(b, p, e, c, 0).add(d);
                b.id = A;
                b.clipPath = d;
                b.count = 0;
                return b
            },
            text: function (a, b, e, c) {
                var A = !p && this.forExport,
                    d = {};
                if (c && (this.allowHTML || !this.forExport)) return this.html(a, b, e);
                d.x = Math.round(b || 0);
                e && (d.y = Math.round(e));
                if (a || 0 === a) d.text = a;
                a = this.createElement("text").attr(d);
                A && a.css({
                    position: "absolute"
                });
                c || (a.xSetter = function (a, b, p) {
                    var e = p.getElementsByTagName("tspan"),
                        c, A = p.getAttribute(b),
                        d;
                    for (d = 0; d < e.length; d++) c = e[d], c.getAttribute(b) === A && c.setAttribute(b, a);
                    p.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function (a, b) {
                a = a || this.style && this.style.fontSize;
                a = /px/.test(a) ? G(a) : /em/.test(a) ? 12 * parseFloat(a) :
                    12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: b,
                    b: Math.round(.8 * b),
                    f: a
                }
            },
            rotCorr: function (a, b, p) {
                var e = a;
                b && p && (e = Math.max(e * Math.cos(b * v), 4));
                return {
                    x: -a / 3 * Math.sin(b * v),
                    y: e
                }
            },
            label: function (a, b, p, e, c, A, d, t, l) {
                var y = this,
                    r = y.g("button" !== l && "label"),
                    g = r.text = y.text("", 0, 0, d).attr({
                        zIndex: 1
                    }),
                    E, u, n = 0,
                    K = 3,
                    G = 0,
                    C, f, h, O, v, I = {},
                    P, S, q = /^url\((.*?)\)$/.test(e),
                    N = q,
                    L, m, R, Q;
                l && r.addClass("highcharts-" + l);
                N = q;
                L = function () {
                    return (P || 0) % 2 / 2
                };
                m = function () {
                    var a = g.element.style,
                        b = {};
                    u = (void 0 === C || void 0 === f || v) && k(g.textStr) &&
                        g.getBBox();
                    r.width = (C || u.width || 0) + 2 * K + G;
                    r.height = (f || u.height || 0) + 2 * K;
                    S = K + y.fontMetrics(a && a.fontSize, g).b;
                    N && (E || (r.box = E = y.symbols[e] || q ? y.symbol(e) : y.rect(), E.addClass(("button" === l ? "" : "highcharts-label-box") + (l ? " highcharts-" + l + "-box" : "")), E.add(r), a = L(), b.x = a, b.y = (t ? -S : 0) + a), b.width = Math.round(r.width), b.height = Math.round(r.height), E.attr(B(b, I)), I = {})
                };
                R = function () {
                    var a = G + K,
                        b;
                    b = t ? 0 : S;
                    k(C) && u && ("center" === v || "right" === v) && (a += {
                        center: .5,
                        right: 1
                    }[v] * (C - u.width));
                    if (a !== g.x || b !== g.y) g.attr("x",
                        a), void 0 !== b && g.attr("y", b);
                    g.x = a;
                    g.y = b
                };
                Q = function (a, b) {
                    E ? E.attr(a, b) : I[a] = b
                };
                r.onAdd = function () {
                    g.add(r);
                    r.attr({
                        text: a || 0 === a ? a : "",
                        x: b,
                        y: p
                    });
                    E && k(c) && r.attr({
                        anchorX: c,
                        anchorY: A
                    })
                };
                r.widthSetter = function (a) {
                    C = a
                };
                r.heightSetter = function (a) {
                    f = a
                };
                r["text-alignSetter"] = function (a) {
                    v = a
                };
                r.paddingSetter = function (a) {
                    k(a) && a !== K && (K = r.padding = a, R())
                };
                r.paddingLeftSetter = function (a) {
                    k(a) && a !== G && (G = a, R())
                };
                r.alignSetter = function (a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== n && (n = a, u && r.attr({
                        x: h
                    }))
                };
                r.textSetter =
                    function (a) {
                        void 0 !== a && g.textSetter(a);
                        m();
                        R()
                    };
                r["stroke-widthSetter"] = function (a, b) {
                    a && (N = !0);
                    P = this["stroke-width"] = a;
                    Q(b, a)
                };
                r.strokeSetter = r.fillSetter = r.rSetter = function (a, b) {
                    "fill" === b && a && (N = !0);
                    Q(b, a)
                };
                r.anchorXSetter = function (a, b) {
                    c = a;
                    Q(b, Math.round(a) - L() - h)
                };
                r.anchorYSetter = function (a, b) {
                    A = a;
                    Q(b, a - O)
                };
                r.xSetter = function (a) {
                    r.x = a;
                    n && (a -= n * ((C || u.width) + 2 * K));
                    h = Math.round(a);
                    r.attr("translateX", h)
                };
                r.ySetter = function (a) {
                    O = r.y = Math.round(a);
                    r.attr("translateY", O)
                };
                var T = r.css;
                return B(r, {
                    css: function (a) {
                        if (a) {
                            var b = {};
                            a = x(a);
                            w(r.textProps, function (p) {
                                void 0 !== a[p] && (b[p] = a[p], delete a[p])
                            });
                            g.css(b)
                        }
                        return T.call(r, a)
                    },
                    getBBox: function () {
                        return {
                            width: u.width + 2 * K,
                            height: u.height + 2 * K,
                            x: u.x - K,
                            y: u.y - K
                        }
                    },
                    shadow: function (a) {
                        a && (m(), E && E.shadow(a));
                        return r
                    },
                    destroy: function () {
                        H(r.element, "mouseenter");
                        H(r.element, "mouseleave");
                        g && (g = g.destroy());
                        E && (E = E.destroy());
                        D.prototype.destroy.call(r);
                        r = y = m = R = Q = null
                    }
                })
            }
        };
        a.Renderer = z
    })(M);
    (function (a) {
        var D = a.attr,
            z = a.createElement,
            F = a.css,
            J = a.defined,
            m = a.each,
            f = a.extend,
            h = a.isFirefox,
            q = a.isMS,
            n = a.isWebKit,
            k = a.pInt,
            v = a.SVGRenderer,
            d = a.win,
            g = a.wrap;
        f(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var d = this.element;
                if (d = a && "SPAN" === d.tagName && a.width) delete a.width, this.textWidth = d, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = f(this.styles, a);
                F(this.element, a);
                return this
            },
            htmlGetBBox: function () {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer,
                        d = this.element,
                        c = this.translateX || 0,
                        e = this.translateY || 0,
                        l = this.x || 0,
                        g = this.y || 0,
                        f = this.textAlign || "left",
                        b = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[f],
                        t = this.styles;
                    F(d, {
                        marginLeft: c,
                        marginTop: e
                    });
                    this.shadows && m(this.shadows, function (a) {
                        F(a, {
                            marginLeft: c + 1,
                            marginTop: e + 1
                        })
                    });
                    this.inverted && m(d.childNodes, function (b) {
                        a.invertChild(b, d)
                    });
                    if ("SPAN" === d.tagName) {
                        var y = this.rotation,
                            K = k(this.textWidth),
                            x = t && t.whiteSpace,
                            h = [y, f, d.innerHTML, this.textWidth, this.textAlign].join();
                        h !== this.cTT && (t = a.fontMetrics(d.style.fontSize).b, J(y) && this.setSpanRotation(y, b, t), F(d, {
                            width: "",
                            whiteSpace: x || "nowrap"
                        }), d.offsetWidth > K && /[ \-]/.test(d.textContent || d.innerText) && F(d, {
                            width: K + "px",
                            display: "block",
                            whiteSpace: x || "normal"
                        }), this.getSpanCorrection(d.offsetWidth, t, b, y, f));
                        F(d, {
                            left: l + (this.xCorr || 0) + "px",
                            top: g + (this.yCorr || 0) + "px"
                        });
                        n && (t = d.offsetHeight);
                        this.cTT = h
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (a,
                g, c) {
                var e = {},
                    l = q ? "-ms-transform" : n ? "-webkit-transform" : h ? "MozTransform" : d.opera ? "-o-transform" : "";
                e[l] = e.transform = "rotate(" + a + "deg)";
                e[l + (h ? "Origin" : "-origin")] = e.transformOrigin = 100 * g + "% " + c + "px";
                F(this.element, e)
            },
            getSpanCorrection: function (a, d, c) {
                this.xCorr = -a * c;
                this.yCorr = -d
            }
        });
        f(v.prototype, {
            html: function (a, d, c) {
                var e = this.createElement("span"),
                    l = e.element,
                    u = e.renderer,
                    k = u.isSVG,
                    b = function (a, b) {
                        m(["opacity", "visibility"], function (e) {
                            g(a, e + "Setter", function (a, e, c, d) {
                                a.call(this, e, c, d);
                                b[c] =
                                    e
                            })
                        })
                    };
                e.textSetter = function (a) {
                    a !== l.innerHTML && delete this.bBox;
                    l.innerHTML = this.textStr = a;
                    e.htmlUpdateTransform()
                };
                k && b(e, e.element.style);
                e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter = function (a, b) {
                    "align" === b && (b = "textAlign");
                    e[b] = a;
                    e.htmlUpdateTransform()
                };
                e.attr({
                    text: a,
                    x: Math.round(d),
                    y: Math.round(c)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                l.style.whiteSpace = "nowrap";
                e.css = e.htmlCss;
                k && (e.add = function (a) {
                    var c, d = u.box.parentNode,
                        t = [];
                    if (this.parentGroup = a) {
                        if (c = a.div, !c) {
                            for (; a;) t.push(a), a = a.parentGroup;
                            m(t.reverse(), function (a) {
                                var e, t = D(a.element, "class");
                                t && (t = {
                                    className: t
                                });
                                c = a.div = a.div || z("div", t, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, c || d);
                                e = c.style;
                                f(a, {
                                    translateXSetter: function (b, c) {
                                        e.left = b + "px";
                                        a[c] = b;
                                        a.doTransform = !0
                                    },
                                    translateYSetter: function (b, c) {
                                        e.top = b + "px";
                                        a[c] = b;
                                        a.doTransform = !0
                                    }
                                });
                                b(a, e)
                            })
                        }
                    } else c =
                        d;
                    c.appendChild(l);
                    e.added = !0;
                    e.alignOnAdd && e.htmlUpdateTransform();
                    return e
                });
                return e
            }
        })
    })(M);
    (function (a) {
        var D, z, F = a.createElement,
            J = a.css,
            m = a.defined,
            f = a.deg2rad,
            h = a.discardElement,
            q = a.doc,
            n = a.each,
            k = a.erase,
            v = a.extend;
        D = a.extendClass;
        var d = a.isArray,
            g = a.isNumber,
            w = a.isObject,
            B = a.merge;
        z = a.noop;
        var c = a.pick,
            e = a.pInt,
            l = a.SVGElement,
            u = a.SVGRenderer,
            L = a.win;
        a.svg || (z = {
                docMode8: q && 8 === q.documentMode,
                init: function (a, e) {
                    var b = ["\x3c", e, ' filled\x3d"f" stroked\x3d"f"'],
                        c = ["position: ", "absolute", ";"],
                        d = "div" === e;
                    ("shape" === e || d) && c.push("left:0;top:0;width:1px;height:1px;");
                    c.push("visibility: ", d ? "hidden" : "visible");
                    b.push(' style\x3d"', c.join(""), '"/\x3e');
                    e && (b = d || "span" === e || "img" === e ? b.join("") : a.prepVML(b), this.element = F(b));
                    this.renderer = a
                },
                add: function (a) {
                    var b = this.renderer,
                        e = this.element,
                        c = b.box,
                        d = a && a.inverted,
                        c = a ? a.element || a : c;
                    a && (this.parentGroup = a);
                    d && b.invertChild(e, c);
                    c.appendChild(e);
                    this.added = !0;
                    this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                    if (this.onAdd) this.onAdd();
                    this.className && this.attr("class", this.className);
                    return this
                },
                updateTransform: l.prototype.htmlUpdateTransform,
                setSpanRotation: function () {
                    var a = this.rotation,
                        e = Math.cos(a * f),
                        c = Math.sin(a * f);
                    J(this.element, {
                        filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", e, ", M12\x3d", -c, ", M21\x3d", c, ", M22\x3d", e, ", sizingMethod\x3d'auto expand')"].join("") : "none"
                    })
                },
                getSpanCorrection: function (a, e, d, l, g) {
                    var b = l ? Math.cos(l * f) : 1,
                        t = l ? Math.sin(l * f) : 0,
                        y = c(this.elemHeight, this.element.offsetHeight),
                        u;
                    this.xCorr =
                        0 > b && -a;
                    this.yCorr = 0 > t && -y;
                    u = 0 > b * t;
                    this.xCorr += t * e * (u ? 1 - d : d);
                    this.yCorr -= b * e * (l ? u ? d : 1 - d : 1);
                    g && "left" !== g && (this.xCorr -= a * d * (0 > b ? -1 : 1), l && (this.yCorr -= y * d * (0 > t ? -1 : 1)), J(this.element, {
                        textAlign: g
                    }))
                },
                pathToVML: function (a) {
                    for (var b = a.length, e = []; b--;) g(a[b]) ? e[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? e[b] = "x" : (e[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (e[b + 5] === e[b + 7] && (e[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), e[b + 6] === e[b + 8] && (e[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                    return e.join(" ") || "x"
                },
                clip: function (a) {
                    var b = this,
                        e;
                    a ? (e = a.members, k(e, b), e.push(b), b.destroyClip = function () {
                        k(e, b)
                    }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                        clip: b.docMode8 ? "inherit" : "rect(auto)"
                    });
                    return b.css(a)
                },
                css: l.prototype.htmlCss,
                safeRemoveChild: function (a) {
                    a.parentNode && h(a)
                },
                destroy: function () {
                    this.destroyClip && this.destroyClip();
                    return l.prototype.destroy.apply(this)
                },
                on: function (a, e) {
                    this.element["on" + a] = function () {
                        var a = L.event;
                        a.target = a.srcElement;
                        e(a)
                    };
                    return this
                },
                cutOffPath: function (a, c) {
                    var b;
                    a = a.split(/[ ,]/);
                    b = a.length;
                    if (9 === b || 11 === b) a[b - 4] = a[b - 2] = e(a[b - 2]) - 10 * c;
                    return a.join(" ")
                },
                shadow: function (a, d, l) {
                    var b = [],
                        g, t = this.element,
                        r = this.renderer,
                        u, y = t.style,
                        k, p = t.path,
                        A, n, f, C;
                    p && "string" !== typeof p.value && (p = "x");
                    n = p;
                    if (a) {
                        f = c(a.width, 3);
                        C = (a.opacity || .15) / f;
                        for (g = 1; 3 >= g; g++) A = 2 * f + 1 - 2 * g, l && (n = this.cutOffPath(p.value, A + .5)), k = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', A, '" filled\x3d"false" path\x3d"', n, '" coordsize\x3d"10 10" style\x3d"', t.style.cssText, '" /\x3e'], u = F(r.prepVML(k), null, {
                            left: e(y.left) +
                                c(a.offsetX, 1),
                            top: e(y.top) + c(a.offsetY, 1)
                        }), l && (u.cutOff = A + 1), k = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"', C * g, '"/\x3e'], F(r.prepVML(k), null, null, u), d ? d.element.appendChild(u) : t.parentNode.insertBefore(u, t), b.push(u);
                        this.shadows = b
                    }
                    return this
                },
                updateShadows: z,
                setAttr: function (a, e) {
                    this.docMode8 ? this.element[a] = e : this.element.setAttribute(a, e)
                },
                classSetter: function (a) {
                    (this.added ? this.element : this).className = a
                },
                dashstyleSetter: function (a, e, c) {
                    (c.getElementsByTagName("stroke")[0] ||
                        F(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[e] = a || "solid";
                    this[e] = a
                },
                dSetter: function (a, e, c) {
                    var b = this.shadows;
                    a = a || [];
                    this.d = a.join && a.join(" ");
                    c.path = a = this.pathToVML(a);
                    if (b)
                        for (c = b.length; c--;) b[c].path = b[c].cutOff ? this.cutOffPath(a, b[c].cutOff) : a;
                    this.setAttr(e, a)
                },
                fillSetter: function (a, e, c) {
                    var b = c.nodeName;
                    "SPAN" === b ? c.style.color = a : "IMG" !== b && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, e, this)))
                },
                "fill-opacitySetter": function (a, e, c) {
                    F(this.renderer.prepVML(["\x3c",
e.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, c)
                },
                opacitySetter: z,
                rotationSetter: function (a, e, c) {
                    c = c.style;
                    this[e] = c[e] = a;
                    c.left = -Math.round(Math.sin(a * f) + 1) + "px";
                    c.top = Math.round(Math.cos(a * f)) + "px"
                },
                strokeSetter: function (a, e, c) {
                    this.setAttr("strokecolor", this.renderer.color(a, c, e, this))
                },
                "stroke-widthSetter": function (a, e, c) {
                    c.stroked = !!a;
                    this[e] = a;
                    g(a) && (a += "px");
                    this.setAttr("strokeweight", a)
                },
                titleSetter: function (a, e) {
                    this.setAttr(e, a)
                },
                visibilitySetter: function (a, e, c) {
                    "inherit" === a &&
                        (a = "visible");
                    this.shadows && n(this.shadows, function (b) {
                        b.style[e] = a
                    });
                    "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (c.style[e] = a ? "visible" : "hidden"), e = "top");
                    c.style[e] = a
                },
                xSetter: function (a, e, c) {
                    this[e] = a;
                    "x" === e ? e = "left" : "y" === e && (e = "top");
                    this.updateClipping ? (this[e] = a, this.updateClipping()) : c.style[e] = a
                },
                zIndexSetter: function (a, e, c) {
                    c.style[e] = a
                }
            }, z["stroke-opacitySetter"] = z["fill-opacitySetter"], a.VMLElement = z = D(l, z), z.prototype.ySetter = z.prototype.widthSetter = z.prototype.heightSetter =
            z.prototype.xSetter, z = {
                Element: z,
                isIE8: -1 < L.navigator.userAgent.indexOf("MSIE 8.0"),
                init: function (a, e, c) {
                    var b, d;
                    this.alignedObjects = [];
                    b = this.createElement("div").css({
                        position: "relative"
                    });
                    d = b.element;
                    a.appendChild(b.element);
                    this.isVML = !0;
                    this.box = d;
                    this.boxWrapper = b;
                    this.gradients = {};
                    this.cache = {};
                    this.cacheKeys = [];
                    this.imgCount = 0;
                    this.setSize(e, c, !1);
                    if (!q.namespaces.hcv) {
                        q.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                        try {
                            q.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        } catch (I) {
                            q.styleSheets[0].cssText +=
                                "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        }
                    }
                },
                isHidden: function () {
                    return !this.box.offsetWidth
                },
                clipRect: function (a, e, c, d) {
                    var b = this.createElement(),
                        l = w(a);
                    return v(b, {
                        members: [],
                        count: 0,
                        left: (l ? a.x : a) + 1,
                        top: (l ? a.y : e) + 1,
                        width: (l ? a.width : c) - 1,
                        height: (l ? a.height : d) - 1,
                        getCSS: function (a) {
                            var b = a.element,
                                e = b.nodeName,
                                c = a.inverted,
                                p = this.top - ("shape" === e ? b.offsetTop : 0),
                                d = this.left,
                                b = d + this.width,
                                l = p + this.height,
                                p = {
                                    clip: "rect(" + Math.round(c ?
                                        d : p) + "px," + Math.round(c ? l : b) + "px," + Math.round(c ? b : l) + "px," + Math.round(c ? p : d) + "px)"
                                };
                            !c && a.docMode8 && "DIV" === e && v(p, {
                                width: b + "px",
                                height: l + "px"
                            });
                            return p
                        },
                        updateClipping: function () {
                            n(b.members, function (a) {
                                a.element && a.css(b.getCSS(a))
                            })
                        }
                    })
                },
                color: function (b, e, c, d) {
                    var l = this,
                        g, r = /^rgba/,
                        u, t, k = "none";
                    b && b.linearGradient ? t = "gradient" : b && b.radialGradient && (t = "pattern");
                    if (t) {
                        var p, A, f = b.linearGradient || b.radialGradient,
                            h, C, E, y, w, v = "";
                        b = b.stops;
                        var K, B = [],
                            q = function () {
                                u = ['\x3cfill colors\x3d"' + B.join(",") +
'" opacity\x3d"', E, '" o:opacity2\x3d"', C, '" type\x3d"', t, '" ', v, 'focus\x3d"100%" method\x3d"any" /\x3e'];
                                F(l.prepVML(u), null, null, e)
                            };
                        h = b[0];
                        K = b[b.length - 1];
                        0 < h[0] && b.unshift([0, h[1]]);
                        1 > K[0] && b.push([1, K[1]]);
                        n(b, function (b, e) {
                            r.test(b[1]) ? (g = a.color(b[1]), p = g.get("rgb"), A = g.get("a")) : (p = b[1], A = 1);
                            B.push(100 * b[0] + "% " + p);
                            e ? (E = A, y = p) : (C = A, w = p)
                        });
                        if ("fill" === c)
                            if ("gradient" === t) c = f.x1 || f[0] || 0, b = f.y1 || f[1] || 0, h = f.x2 || f[2] || 0, f = f.y2 || f[3] || 0, v = 'angle\x3d"' + (90 - 180 * Math.atan((f - b) / (h - c)) / Math.PI) + '"',
                                q();
                            else {
                                var k = f.r,
                                    L = 2 * k,
                                    m = 2 * k,
                                    z = f.cx,
                                    D = f.cy,
                                    J = e.radialReference,
                                    U, k = function () {
                                        J && (U = d.getBBox(), z += (J[0] - U.x) / U.width - .5, D += (J[1] - U.y) / U.height - .5, L *= J[2] / U.width, m *= J[2] / U.height);
                                        v = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + L + "," + m + '" origin\x3d"0.5,0.5" position\x3d"' + z + "," + D + '" color2\x3d"' + w + '" ';
                                        q()
                                    };
                                d.added ? k() : d.onAdd = k;
                                k = y
                            } else k = p
                    } else r.test(b) && "IMG" !== e.tagName ? (g = a.color(b), d[c + "-opacitySetter"](g.get("a"), c, e), k = g.get("rgb")) : (k = e.getElementsByTagName(c),
                        k.length && (k[0].opacity = 1, k[0].type = "solid"), k = b);
                    return k
                },
                prepVML: function (a) {
                    var b = this.isIE8;
                    a = a.join("");
                    b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");
                    return a
                },
                text: u.prototype.html,
                path: function (a) {
                    var b = {
                        coordsize: "10 10"
                    };
                    d(a) ? b.d =
                        a : w(a) && v(b, a);
                    return this.createElement("shape").attr(b)
                },
                circle: function (a, e, c) {
                    var b = this.symbol("circle");
                    w(a) && (c = a.r, e = a.y, a = a.x);
                    b.isCircle = !0;
                    b.r = c;
                    return b.attr({
                        x: a,
                        y: e
                    })
                },
                g: function (a) {
                    var b;
                    a && (b = {
                        className: "highcharts-" + a,
                        "class": "highcharts-" + a
                    });
                    return this.createElement("div").attr(b)
                },
                image: function (a, e, c, d, l) {
                    var b = this.createElement("img").attr({
                        src: a
                    });
                    1 < arguments.length && b.attr({
                        x: e,
                        y: c,
                        width: d,
                        height: l
                    });
                    return b
                },
                createElement: function (a) {
                    return "rect" === a ? this.symbol(a) : u.prototype.createElement.call(this,
                        a)
                },
                invertChild: function (a, c) {
                    var b = this;
                    c = c.style;
                    var d = "IMG" === a.tagName && a.style;
                    J(a, {
                        flip: "x",
                        left: e(c.width) - (d ? e(d.top) : 1),
                        top: e(c.height) - (d ? e(d.left) : 1),
                        rotation: -90
                    });
                    n(a.childNodes, function (e) {
                        b.invertChild(e, a)
                    })
                },
                symbols: {
                    arc: function (a, e, c, d, l) {
                        var b = l.start,
                            g = l.end,
                            u = l.r || c || d;
                        c = l.innerR;
                        d = Math.cos(b);
                        var k = Math.sin(b),
                            t = Math.cos(g),
                            p = Math.sin(g);
                        if (0 === g - b) return ["x"];
                        b = ["wa", a - u, e - u, a + u, e + u, a + u * d, e + u * k, a + u * t, e + u * p];
                        l.open && !c && b.push("e", "M", a, e);
                        b.push("at", a - c, e - c, a + c, e + c, a + c * t,
                            e + c * p, a + c * d, e + c * k, "x", "e");
                        b.isArc = !0;
                        return b
                    },
                    circle: function (a, e, c, d, l) {
                        l && m(l.r) && (c = d = 2 * l.r);
                        l && l.isCircle && (a -= c / 2, e -= d / 2);
                        return ["wa", a, e, a + c, e + d, a + c, e + d / 2, a + c, e + d / 2, "e"]
                    },
                    rect: function (a, e, c, d, l) {
                        return u.prototype.symbols[m(l) && l.r ? "callout" : "square"].call(0, a, e, c, d, l)
                    }
                }
            }, a.VMLRenderer = D = function () {
                this.init.apply(this, arguments)
            }, D.prototype = B(u.prototype, z), a.Renderer = D);
        u.prototype.measureSpanWidth = function (a, e) {
            var b = q.createElement("span");
            a = q.createTextNode(a);
            b.appendChild(a);
            J(b,
                e);
            this.box.appendChild(b);
            e = b.offsetWidth;
            h(b);
            return e
        }
    })(M);
    (function (a) {
        function D() {
            var q = a.defaultOptions.global,
                n, k = q.useUTC,
                v = k ? "getUTC" : "get",
                d = k ? "setUTC" : "set";
            a.Date = n = q.Date || h.Date;
            n.hcTimezoneOffset = k && q.timezoneOffset;
            n.hcGetTimezoneOffset = k && q.getTimezoneOffset;
            n.hcMakeTime = function (a, d, h, c, e, l) {
                var g;
                k ? (g = n.UTC.apply(0, arguments), g += J(g)) : g = (new n(a, d, f(h, 1), f(c, 0), f(e, 0), f(l, 0))).getTime();
                return g
            };
            F("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
                n["hcGet" + a] = v +
                    a
            });
            F("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
                n["hcSet" + a] = d + a
            })
        }
        var z = a.color,
            F = a.each,
            J = a.getTZOffset,
            m = a.merge,
            f = a.pick,
            h = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                VMLRadialGradientURL: "http://code.highcharts.com/5.0.2/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                style: {
                    color: "#333333",
                    fontSize: "18px"
                },
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                style: {
                    color: "#666666"
                },
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: z("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (f) {
            a.defaultOptions = m(!0, a.defaultOptions, f);
            D();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        D()
    })(M);
    (function (a) {
        var D =
            a.arrayMax,
            z = a.arrayMin,
            F = a.defined,
            J = a.destroyObjectProperties,
            m = a.each,
            f = a.erase,
            h = a.merge,
            q = a.pick;
        a.PlotLineOrBand = function (a, k) {
            this.axis = a;
            k && (this.options = k, this.id = k.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var a = this,
                    k = a.axis,
                    f = k.horiz,
                    d = a.options,
                    g = d.label,
                    w = a.label,
                    B = d.to,
                    c = d.from,
                    e = d.value,
                    l = F(c) && F(B),
                    u = F(e),
                    L = a.svgElem,
                    b = !L,
                    t = [],
                    y, K = d.color,
                    x = q(d.zIndex, 0),
                    m = d.events,
                    t = {
                        "class": "highcharts-plot-" + (l ? "band " : "line ") + (d.className || "")
                    },
                    r = {},
                    G = k.chart.renderer,
                    H = l ? "bands" : "lines",
                    N = k.log2lin;
                k.isLog && (c = N(c), B = N(B), e = N(e));
                u ? (t = {
                    stroke: K,
                    "stroke-width": d.width
                }, d.dashStyle && (t.dashstyle = d.dashStyle)) : l && (K && (t.fill = K), d.borderWidth && (t.stroke = d.borderColor, t["stroke-width"] = d.borderWidth));
                r.zIndex = x;
                H += "-" + x;
                (K = k[H]) || (k[H] = K = G.g("plot-" + H).attr(r).add());
                b && (a.svgElem = L = G.path().attr(t).add(K));
                if (u) t = k.getPlotLinePath(e, L.strokeWidth());
                else if (l) t = k.getPlotBandPath(c, B, d);
                else return;
                if (b && t && t.length) {
                    if (L.attr({
                            d: t
                        }), m)
                        for (y in d = function (b) {
                                L.on(b, function (e) {
                                    m[b].apply(a, [e])
                                })
                            }, m) d(y)
                } else L && (t ? (L.show(), L.animate({
                    d: t
                })) : (L.hide(), w && (a.label = w = w.destroy())));
                g && F(g.text) && t && t.length && 0 < k.width && 0 < k.height && !t.flat ? (g = h({
                    align: f && l && "center",
                    x: f ? !l && 4 : 10,
                    verticalAlign: !f && l && "middle",
                    y: f ? l ? 16 : 10 : l ? 6 : -4,
                    rotation: f && !l && 90
                }, g), this.renderLabel(g, t, l, x)) : w && w.hide();
                return a
            },
            renderLabel: function (a, k, f, d) {
                var g = this.label,
                    h = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (a.className ||
                        "")
                }, g.zIndex = d, this.label = g = h.text(a.text, 0, 0, a.useHTML).attr(g).add(), g.css(a.style));
                d = [k[1], k[4], f ? k[6] : k[1]];
                k = [k[2], k[5], f ? k[7] : k[2]];
                f = z(d);
                h = z(k);
                g.align(a, !1, {
                    x: f,
                    y: h,
                    width: D(d) - f,
                    height: D(k) - h
                });
                g.show()
            },
            destroy: function () {
                f(this.axis.plotLinesAndBands, this);
                delete this.axis;
                J(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function (a, k) {
                k = this.getPlotLinePath(k, null, null, !0);
                (a = this.getPlotLinePath(a, null, null, !0)) && k ? (a.flat = a.toString() === k.toString(), a.push(k[4], k[5], k[1], k[2])) :
                    a = null;
                return a
            },
            addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function (f, k) {
                var h = (new a.PlotLineOrBand(this, f)).render(),
                    d = this.userOptions;
                h && (k && (d[k] = d[k] || [], d[k].push(f)), this.plotLinesAndBands.push(h));
                return h
            },
            removePlotBandOrLine: function (a) {
                for (var k = this.plotLinesAndBands, h = this.options, d = this.userOptions, g = k.length; g--;) k[g].id === a && k[g].destroy();
                m([h.plotLines || [], d.plotLines ||
[], h.plotBands || [], d.plotBands || []], function (d) {
                    for (g = d.length; g--;) d[g].id === a && f(d, d[g])
                })
            }
        }
    })(M);
    (function (a) {
        var D = a.correctFloat,
            z = a.defined,
            F = a.destroyObjectProperties,
            J = a.isNumber,
            m = a.merge,
            f = a.pick,
            h = a.stop,
            q = a.deg2rad;
        a.Tick = function (a, k, f, d) {
            this.axis = a;
            this.pos = k;
            this.type = f || "";
            this.isNew = !0;
            f || d || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis,
                    k = a.options,
                    h = a.chart,
                    d = a.categories,
                    g = a.names,
                    w = this.pos,
                    B = k.labels,
                    c = a.tickPositions,
                    e = w === c[0],
                    l = w === c[c.length - 1],
                    g =
                    d ? f(d[w], g[w], w) : w,
                    d = this.label,
                    c = c.info,
                    u;
                a.isDatetimeAxis && c && (u = k.dateTimeLabelFormats[c.higherRanks[w] || c.unitName]);
                this.isFirst = e;
                this.isLast = l;
                k = a.labelFormatter.call({
                    axis: a,
                    chart: h,
                    isFirst: e,
                    isLast: l,
                    dateTimeLabelFormat: u,
                    value: a.isLog ? D(a.lin2log(g)) : g
                });
                z(d) ? d && d.attr({
                    text: k
                }) : (this.labelLength = (this.label = d = z(k) && B.enabled ? h.renderer.text(k, 0, 0, B.useHTML).css(m(B.style)).add(a.labelGroup) : null) && d.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ?
                    "height" : "width"] : 0
            },
            handleOverflow: function (a) {
                var k = this.axis,
                    h = a.x,
                    d = k.chart.chartWidth,
                    g = k.chart.spacing,
                    w = f(k.labelLeft, Math.min(k.pos, g[3])),
                    g = f(k.labelRight, Math.max(k.pos + k.len, d - g[1])),
                    n = this.label,
                    c = this.rotation,
                    e = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[k.labelAlign],
                    l = n.getBBox().width,
                    u = k.getSlotWidth(),
                    m = u,
                    b = 1,
                    t, y = {};
                if (c) 0 > c && h - e * l < w ? t = Math.round(h / Math.cos(c * q) - w) : 0 < c && h + e * l > g && (t = Math.round((d - h) / Math.cos(c * q)));
                else if (d = h + (1 - e) * l, h - e * l < w ? m = a.x + m * (1 - e) - w : d > g && (m = g - a.x + m * e, b = -1), m = Math.min(u,
                        m), m < u && "center" === k.labelAlign && (a.x += b * (u - m - e * (u - Math.min(l, m)))), l > m || k.autoRotation && (n.styles || {}).width) t = m;
                t && (y.width = t, (k.options.labels.style || {}).textOverflow || (y.textOverflow = "ellipsis"), n.css(y))
            },
            getPosition: function (a, k, f, d) {
                var g = this.axis,
                    h = g.chart,
                    n = d && h.oldChartHeight || h.chartHeight;
                return {
                    x: a ? g.translate(k + f, null, null, d) + g.transB : g.left + g.offset + (g.opposite ? (d && h.oldChartWidth || h.chartWidth) - g.right - g.left : 0),
                    y: a ? n - g.bottom + g.offset - (g.opposite ? g.height : 0) : n - g.translate(k + f, null,
                        null, d) - g.transB
                }
            },
            getLabelPosition: function (a, k, f, d, g, h, B, c) {
                var e = this.axis,
                    l = e.transA,
                    u = e.reversed,
                    w = e.staggerLines,
                    b = e.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    t = g.y;
                z(t) || (t = 0 === e.side ? f.rotation ? -8 : -f.getBBox().height : 2 === e.side ? b.y + 8 : Math.cos(f.rotation * q) * (b.y - f.getBBox(!1, 0).height / 2));
                a = a + g.x + b.x - (h && d ? h * l * (u ? -1 : 1) : 0);
                k = k + t - (h && !d ? h * l * (u ? 1 : -1) : 0);
                w && (f = B / (c || 1) % w, e.opposite && (f = w - f - 1), k += e.labelOffset / w * f);
                return {
                    x: a,
                    y: Math.round(k)
                }
            },
            getMarkPath: function (a, f, h, d, g, w) {
                return w.crispLine(["M", a, f, "L", a + (g ?
                    0 : -h), f + (g ? h : 0)], d)
            },
            render: function (a, k, v) {
                var d = this.axis,
                    g = d.options,
                    w = d.chart.renderer,
                    n = d.horiz,
                    c = this.type,
                    e = this.label,
                    l = this.pos,
                    u = g.labels,
                    q = this.gridLine,
                    b = c ? c + "Tick" : "tick",
                    t = d.tickSize(b),
                    y = this.mark,
                    K = !y,
                    x = u.step,
                    m = {},
                    r = !0,
                    G = d.tickmarkOffset,
                    H = this.getPosition(n, l, G, k),
                    N = H.x,
                    H = H.y,
                    p = n && N === d.pos + d.len || !n && H === d.pos ? -1 : 1,
                    A = c ? c + "Grid" : "grid",
                    P = g[A + "LineWidth"],
                    O = g[A + "LineColor"],
                    C = g[A + "LineDashStyle"],
                    A = f(g[b + "Width"], !c && d.isXAxis ? 1 : 0),
                    b = g[b + "Color"];
                v = f(v, 1);
                this.isActive = !0;
                q || (m.stroke =
                    O, m["stroke-width"] = P, C && (m.dashstyle = C), c || (m.zIndex = 1), k && (m.opacity = 0), this.gridLine = q = w.path().attr(m).addClass("highcharts-" + (c ? c + "-" : "") + "grid-line").add(d.gridGroup));
                if (!k && q && (l = d.getPlotLinePath(l + G, q.strokeWidth() * p, k, !0))) q[this.isNew ? "attr" : "animate"]({
                    d: l,
                    opacity: v
                });
                t && (d.opposite && (t[0] = -t[0]), K && (this.mark = y = w.path().addClass("highcharts-" + (c ? c + "-" : "") + "tick").add(d.axisGroup), y.attr({
                    stroke: b,
                    "stroke-width": A
                })), y[K ? "attr" : "animate"]({
                    d: this.getMarkPath(N, H, t[0], y.strokeWidth() *
                        p, n, w),
                    opacity: v
                }));
                e && J(N) && (e.xy = H = this.getLabelPosition(N, H, e, n, u, G, a, x), this.isFirst && !this.isLast && !f(g.showFirstLabel, 1) || this.isLast && !this.isFirst && !f(g.showLastLabel, 1) ? r = !1 : !n || d.isRadial || u.step || u.rotation || k || 0 === v || this.handleOverflow(H), x && a % x && (r = !1), r && J(H.y) ? (H.opacity = v, e[this.isNew ? "attr" : "animate"](H)) : (h(e), e.attr("y", -9999)), this.isNew = !1)
            },
            destroy: function () {
                F(this, this.axis)
            }
        }
    })(M);
    (function (a) {
        var D = a.addEvent,
            z = a.animObject,
            F = a.arrayMax,
            J = a.arrayMin,
            m = a.AxisPlotLineOrBandExtension,
            f = a.color,
            h = a.correctFloat,
            q = a.defaultOptions,
            n = a.defined,
            k = a.deg2rad,
            v = a.destroyObjectProperties,
            d = a.each,
            g = a.error,
            w = a.extend,
            B = a.fireEvent,
            c = a.format,
            e = a.getMagnitude,
            l = a.grep,
            u = a.inArray,
            L = a.isArray,
            b = a.isNumber,
            t = a.isString,
            y = a.merge,
            K = a.normalizeTickInterval,
            x = a.pick,
            I = a.PlotLineOrBand,
            r = a.removeEvent,
            G = a.splat,
            H = a.syncTimeout,
            N = a.Tick;
        a.Axis = function () {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function () {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function (a, b) {
                var e = b.isX;
                this.chart = a;
                this.horiz = a.inverted ? !e : e;
                this.isXAxis = e;
                this.coll = this.coll || (e ? "xAxis" : "yAxis");
                this.opposite = b.opposite;
                this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(b);
                var c = this.options,
                    p = c.type;
                this.labelFormatter = c.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = b;
                this.minPixelPadding = 0;
                this.reversed = c.reversed;
                this.visible = !1 !== c.visible;
                this.zoomEnabled = !1 !== c.zoomEnabled;
                this.hasNames = "category" === p || !0 === c.categories;
                this.categories = c.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === p;
                this.isDatetimeAxis = "datetime" === p;
                this.isLinked = n(c.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = c.minRange || c.maxZoom;
                this.range = c.range;
                this.offset = c.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = x(c.crosshair, G(a.options.tooltip.crosshairs)[e ? 0 : 1], !1);
                var d;
                b = this.options.events; - 1 === u(this, a.axes) && (e ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && e && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand =
                    this.removePlotBandOrLine;
                for (d in b) D(this, d, b[d]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function (a) {
                this.options = y(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], y(q[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var b = this.axis,
                    e = this.value,
                    d = b.categories,
                    l = this.dateTimeLabelFormat,
                    g = q.lang.numericSymbols,
                    r = g &&
                    g.length,
                    u, f = b.options.labels.format,
                    b = b.isLog ? e : b.tickInterval;
                if (f) u = c(f, this);
                else if (d) u = e;
                else if (l) u = a.dateFormat(l, e);
                else if (r && 1E3 <= b)
                    for (; r-- && void 0 === u;) d = Math.pow(1E3, r + 1), b >= d && 0 === 10 * e % d && null !== g[r] && 0 !== e && (u = a.numberFormat(e / d, -1) + g[r]);
                void 0 === u && (u = 1E4 <= Math.abs(e) ? a.numberFormat(e, -1) : a.numberFormat(e, -1, void 0, ""));
                return u
            },
            getSeriesExtremes: function () {
                var a = this,
                    e = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks &&
                    a.buildStacks();
                d(a.series, function (c) {
                    if (c.visible || !e.options.chart.ignoreHiddenSeries) {
                        var p = c.options,
                            d = p.threshold,
                            A;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= d && (d = null);
                        if (a.isXAxis) p = c.xData, p.length && (c = J(p), b(c) || c instanceof Date || (p = l(p, function (a) {
                            return b(a)
                        }), c = J(p)), a.dataMin = Math.min(x(a.dataMin, p[0]), c), a.dataMax = Math.max(x(a.dataMax, p[0]), F(p)));
                        else if (c.getExtremes(), A = c.dataMax, c = c.dataMin, n(c) && n(A) && (a.dataMin = Math.min(x(a.dataMin, c), c), a.dataMax = Math.max(x(a.dataMax, A), A)), n(d) &&
                            (a.threshold = d), !p.softThreshold || a.isLog) a.softThreshold = !1
                    }
                })
            },
            translate: function (a, e, c, d, l, g) {
                var p = this.linkedParent || this,
                    A = 1,
                    r = 0,
                    u = d ? p.oldTransA : p.transA;
                d = d ? p.oldMin : p.min;
                var E = p.minPixelPadding;
                l = (p.isOrdinal || p.isBroken || p.isLog && l) && p.lin2val;
                u || (u = p.transA);
                c && (A *= -1, r = p.len);
                p.reversed && (A *= -1, r -= A * (p.sector || p.len));
                e ? (a = (a * A + r - E) / u + d, l && (a = p.lin2val(a))) : (l && (a = p.val2lin(a)), "between" === g && (g = .5), a = A * (a - d) * u + r + A * E + (b(g) ? u * g * p.pointRange : 0));
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, e, c, d, l) {
                var p = this.chart,
                    A = this.left,
                    g = this.top,
                    r, u, f = c && p.oldChartHeight || p.chartHeight,
                    k = c && p.oldChartWidth || p.chartWidth,
                    h;
                r = this.transB;
                var t = function (a, b, e) {
                    if (a < b || a > e) d ? a = Math.min(Math.max(b, a), e) : h = !0;
                    return a
                };
                l = x(l, this.translate(a, null, null, c));
                a = c = Math.round(l + r);
                r = u = Math.round(f - l - r);
                b(l) ? this.horiz ? (r = g, u = f - this.bottom, a = c = t(a, A, A +
                    this.width)) : (a = A, c = k - this.right, r = u = t(r, g, g + this.height)) : h = !0;
                return h && !d ? null : p.renderer.crispLine(["M", a, r, "L", c, u], e || 1)
            },
            getLinearTickPositions: function (a, e, c) {
                var p, d = h(Math.floor(e / a) * a),
                    A = h(Math.ceil(c / a) * a),
                    l = [];
                if (e === c && b(e)) return [e];
                for (e = d; e <= A;) {
                    l.push(e);
                    e = h(e + a);
                    if (e === p) break;
                    p = e
                }
                return l
            },
            getMinorTickPositions: function () {
                var a = this.options,
                    b = this.tickPositions,
                    e = this.minorTickInterval,
                    c = [],
                    d, l = this.pointRangePadding || 0;
                d = this.min - l;
                var l = this.max + l,
                    g = l - d;
                if (g && g / e < this.len / 3)
                    if (this.isLog)
                        for (l =
                            b.length, d = 1; d < l; d++) c = c.concat(this.getLogTickPositions(e, b[d - 1], b[d], !0));
                    else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) c = c.concat(this.getTimeTicks(this.normalizeTimeTickInterval(e), d, l, a.startOfWeek));
                else
                    for (b = d + (b[0] - d) % e; b <= l; b += e) c.push(b);
                0 !== c.length && this.trimTicks(c, a.startOnTick, a.endOnTick);
                return c
            },
            adjustForMinRange: function () {
                var a = this.options,
                    b = this.min,
                    e = this.max,
                    c, l = this.dataMax - this.dataMin >= this.minRange,
                    g, r, u, f, k, h;
                this.isXAxis && void 0 === this.minRange && !this.isLog &&
                    (n(a.min) || n(a.max) ? this.minRange = null : (d(this.series, function (a) {
                        f = a.xData;
                        for (r = k = a.xIncrement ? 1 : f.length - 1; 0 < r; r--)
                            if (u = f[r] - f[r - 1], void 0 === g || u < g) g = u
                    }), this.minRange = Math.min(5 * g, this.dataMax - this.dataMin)));
                e - b < this.minRange && (h = this.minRange, c = (h - e + b) / 2, c = [b - c, x(a.min, b - c)], l && (c[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = F(c), e = [b + h, x(a.max, b + h)], l && (e[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), e = J(e), e - b < h && (c[0] = e - h, c[1] = x(a.min, e - h), b = F(c)));
                this.min = b;
                this.max =
                    e
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : d(this.series, function (b) {
                    var e = b.closestPointRange;
                    !b.noSharedTooltip && n(e) && (a = n(a) ? Math.min(a, e) : e)
                });
                return a
            },
            nameToX: function (a) {
                var b = L(this.categories),
                    e = b ? this.categories : this.names,
                    c = a.options.x,
                    p;
                a.series.requireSorting = !1;
                n(c) || (c = !1 === this.options.uniqueNames ? a.series.autoIncrement() : u(a.name, e)); - 1 === c ? b || (p = e.length) : p = c;
                this.names[p] = a.name;
                return p
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange =
                    void 0, d(this.series || [], function (b) {
                        if (!b.points || b.isDirtyData) b.processData(), b.generatePoints();
                        d(b.points, function (e, c) {
                            var p;
                            e.options && void 0 === e.options.x && (p = a.nameToX(e), p !== e.x && (e.x = p, b.xData[c] = p))
                        })
                    }))
            },
            setAxisTranslation: function (a) {
                var b = this,
                    e = b.max - b.min,
                    c = b.axisPointRange || 0,
                    p, l = 0,
                    g = 0,
                    r = b.linkedParent,
                    u = !!b.categories,
                    f = b.transA,
                    h = b.isXAxis;
                if (h || u || c) r ? (l = r.minPointOffset, g = r.pointRangePadding) : (p = b.getClosest(), d(b.series, function (a) {
                    var e = u ? 1 : h ? x(a.options.pointRange, p, 0) : b.axisPointRange ||
                        0;
                    a = a.options.pointPlacement;
                    c = Math.max(c, e);
                    b.single || (l = Math.max(l, t(a) ? 0 : e / 2), g = Math.max(g, "on" === a ? 0 : e))
                })), r = b.ordinalSlope && p ? b.ordinalSlope / p : 1, b.minPointOffset = l *= r, b.pointRangePadding = g *= r, b.pointRange = Math.min(c, e), h && (b.closestPointRange = p);
                a && (b.oldTransA = f);
                b.translationSlope = b.transA = f = b.len / (e + g || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = f * l
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (a) {
                var c = this,
                    p = c.chart,
                    l = c.options,
                    r = c.isLog,
                    u = c.log2lin,
                    f = c.isDatetimeAxis,
                    k = c.isXAxis,
                    t = c.isLinked,
                    H = l.maxPadding,
                    w = l.minPadding,
                    y = l.tickInterval,
                    G = l.tickPixelInterval,
                    v = c.categories,
                    q = c.threshold,
                    m = c.softThreshold,
                    I, L, N, z;
                f || v || t || this.getTickAmount();
                N = x(c.userMin, l.min);
                z = x(c.userMax, l.max);
                t ? (c.linkedParent = p[c.coll][l.linkedTo], p = c.linkedParent.getExtremes(), c.min = x(p.min, p.dataMin), c.max = x(p.max, p.dataMax), l.type !== c.linkedParent.options.type && g(11, 1)) : (!m && n(q) && (c.dataMin >= q ? (I = q, w = 0) : c.dataMax <= q && (L = q, H = 0)), c.min = x(N, I, c.dataMin), c.max = x(z,
                    L, c.dataMax));
                r && (!a && 0 >= Math.min(c.min, x(c.dataMin, c.min)) && g(10, 1), c.min = h(u(c.min), 15), c.max = h(u(c.max), 15));
                c.range && n(c.max) && (c.userMin = c.min = N = Math.max(c.min, c.minFromRange()), c.userMax = z = c.max, c.range = null);
                B(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(v || c.axisPointRange || c.usePercentage || t) && n(c.min) && n(c.max) && (u = c.max - c.min) && (!n(N) && w && (c.min -= u * w), !n(z) && H && (c.max += u * H));
                b(l.floor) ? c.min = Math.max(c.min, l.floor) : b(l.softMin) && (c.min = Math.min(c.min, l.softMin));
                b(l.ceiling) ? c.max = Math.min(c.max, l.ceiling) : b(l.softMax) && (c.max = Math.max(c.max, l.softMax));
                m && n(c.dataMin) && (q = q || 0, !n(N) && c.min < q && c.dataMin >= q ? c.min = q : !n(z) && c.max > q && c.dataMax <= q && (c.max = q));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : t && !y && G === c.linkedParent.options.tickPixelInterval ? y = c.linkedParent.tickInterval : x(y, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, v ? 1 : (c.max - c.min) * G / Math.max(c.len, G));
                k && !a && d(c.series, function (a) {
                    a.processData(c.min !==
                        c.oldMin || c.max !== c.oldMax)
                });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !y && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                a = x(l.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !y && c.tickInterval < a && (c.tickInterval = a);
                f || r || y || (c.tickInterval = K(c.tickInterval, null, e(c.tickInterval), x(l.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max &&
                    9999 > c.max)), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options,
                    b, c = a.tickPositions,
                    e = a.tickPositioner,
                    d = a.startOnTick,
                    l = a.endOnTick,
                    g;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
                    a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);
                this.isLinked || (this.trimTicks(b, d, l), this.min === this.max && n(this.min) && !this.tickAmount && (g = !0, this.min -= .5, this.max += .5), this.single = g, c || e || this.adjustTickAmount())
            },
            trimTicks: function (a, b, c) {
                var e = a[0],
                    d = a[a.length - 1],
                    p = this.minPointOffset || 0;
                if (b) this.min = e;
                else
                    for (; this.min - p > a[0];) a.shift();
                if (c) this.max = d;
                else
                    for (; this.max + p < a[a.length - 1];) a.pop();
                0 === a.length && n(e) && a.push((d + e) / 2)
            },
            alignToOthers: function () {
                var a = {},
                    b, c = this.options;
                !1 !== this.chart.options.chart.alignTicks && !1 !== c.alignTicks && d(this.chart[this.coll], function (c) {
                    var e = c.options,
                        e = [c.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    c.series.length && (a[e] ? b = !0 : a[e] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a =
                    this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !n(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval,
                    b = this.tickPositions,
                    c = this.tickAmount,
                    e = this.finalTickAmt,
                    d = b && b.length;
                if (d < c) {
                    for (; b.length < c;) b.push(h(b[b.length - 1] + a));
                    this.transA *= (d - 1) / (c - 1);
                    this.max = b[b.length - 1]
                } else d > c && (this.tickInterval *=
                    2, this.setTickPositions());
                if (n(e)) {
                    for (a = c = b.length; a--;)(3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < c - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                d(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks &&
                    this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, b, c, e, l) {
                var p = this,
                    g = p.chart;
                c = x(c, !0);
                d(p.series, function (a) {
                    delete a.kdTree
                });
                l = w(l, {
                    min: a,
                    max: b
                });
                B(p, "setExtremes", l, function () {
                    p.userMin = a;
                    p.userMax = b;
                    p.eventArgs = l;
                    c && g.redraw(e)
                })
            },
            zoom: function (a, b) {
                var c = this.dataMin,
                    e = this.dataMax,
                    d = this.options,
                    p = Math.min(c, x(d.min, c)),
                    d = Math.max(e, x(d.max, e));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (n(c) && a <= p && (a = p), n(e) && b >= d && (b = d)), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function () {
                var a = this.chart,
                    b = this.options,
                    c = b.offsetLeft || 0,
                    e = this.horiz,
                    d = x(b.width, a.plotWidth - c + (b.offsetRight || 0)),
                    l = x(b.height, a.plotHeight),
                    g = x(b.top, a.plotTop),
                    b = x(b.left, a.plotLeft + c),
                    c = /%$/;
                c.test(l) && (l = Math.round(parseFloat(l) /
                    100 * a.plotHeight));
                c.test(g) && (g = Math.round(parseFloat(g) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = g;
                this.width = d;
                this.height = l;
                this.bottom = a.chartHeight - l - g;
                this.right = a.chartWidth - d - b;
                this.len = Math.max(e ? d : l, 0);
                this.pos = e ? b : g
            },
            getExtremes: function () {
                var a = this.isLog,
                    b = this.lin2log;
                return {
                    min: a ? h(b(this.min)) : this.min,
                    max: a ? h(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog,
                    c = this.lin2log,
                    e = b ? c(this.min) : this.min,
                    b = b ? c(this.max) : this.max;
                null === a ? a = e : e > a ? a = e : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (x(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options,
                    c = b[a + "Length"],
                    e = x(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (e && c) return "inside" === b[a + "Position"] && (c = -c), [c, e]
            },
            labelMetrics: function () {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize,
                    this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function () {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    e = c,
                    l = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    g, r = a.rotation,
                    u = this.labelMetrics(),
                    f, h = Number.MAX_VALUE,
                    t, H = function (a) {
                        a /= l || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return a * c
                    };
                b ? (t = !a.staggerLines && !a.step && (n(r) ? [r] : l < x(a.autoRotationLimit, 80) && a.autoRotation)) && d(t, function (a) {
                        var b;
                        if (a === r || a && -90 <= a && 90 >= a) f = H(Math.abs(u.h / Math.sin(k * a))), b = f + Math.abs(a / 360), b < h && (h = b, g = a, e = f)
                    }) :
                    a.step || (e = H(u.h));
                this.autoRotation = t;
                this.labelRotation = x(g, r);
                return e
            },
            getSlotWidth: function () {
                var a = this.chart,
                    b = this.horiz,
                    c = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    d = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * a.plotWidth / e || !b && (d && d - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart,
                    b = a.renderer,
                    c = this.tickPositions,
                    e = this.ticks,
                    l = this.options.labels,
                    g = this.horiz,
                    r = this.getSlotWidth(),
                    u = Math.max(1,
                        Math.round(r - 2 * (l.padding || 5))),
                    f = {},
                    h = this.labelMetrics(),
                    k = l.style && l.style.textOverflow,
                    H, w = 0,
                    x, G;
                t(l.rotation) || (f.rotation = l.rotation || 0);
                d(c, function (a) {
                    (a = e[a]) && a.labelLength > w && (w = a.labelLength)
                });
                this.maxLabelLength = w;
                if (this.autoRotation) w > u && w > h.h ? f.rotation = this.labelRotation : this.labelRotation = 0;
                else if (r && (H = {
                        width: u + "px"
                    }, !k))
                    for (H.textOverflow = "clip", x = c.length; !g && x--;)
                        if (G = c[x], u = e[G].label) u.styles && "ellipsis" === u.styles.textOverflow ? u.css({
                                textOverflow: "clip"
                            }) : e[G].labelLength >
                            r && u.css({
                                width: r + "px"
                            }), u.getBBox().height > this.len / c.length - (h.h - h.f) && (u.specCss = {
                                textOverflow: "ellipsis"
                            });
                f.rotation && (H = {
                    width: (w > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, k || (H.textOverflow = "ellipsis"));
                if (this.labelAlign = l.align || this.autoLabelAlign(this.labelRotation)) f.align = this.labelAlign;
                d(c, function (a) {
                    var b = (a = e[a]) && a.label;
                    b && (b.attr(f), H && b.css(y(H, b.specCss)), delete b.specCss, a.rotation = f.rotation)
                });
                this.tickRotCorr = b.rotCorr(h.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || n(this.min) && n(this.max) && !!this.tickPositions
            },
            getOffset: function () {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    e = a.options,
                    l = a.tickPositions,
                    g = a.ticks,
                    r = a.horiz,
                    u = a.side,
                    f = b.inverted ? [1, 0, 3, 2][u] : u,
                    h, k, t = 0,
                    H, w = 0,
                    y = e.title,
                    G = e.labels,
                    K = 0,
                    v = a.opposite,
                    q = b.axisOffset,
                    b = b.clipOffset,
                    m = [-1, 1, 1, -1][u],
                    B, I = e.className,
                    L = a.axisParent,
                    z = this.tickSize("tick");
                h = a.hasData();
                a.showAxis = k = h || x(e.showEmpty, !0);
                a.staggerLines = a.horiz && G.staggerLines;
                a.axisGroup || (a.gridGroup =
                    c.g("grid").attr({
                        zIndex: e.gridZIndex || 1
                    }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (I || "")).add(L), a.axisGroup = c.g("axis").attr({
                        zIndex: e.zIndex || 2
                    }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (I || "")).add(L), a.labelGroup = c.g("axis-labels").attr({
                        zIndex: G.zIndex || 7
                    }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (I || "")).add(L));
                if (h || a.isLinked) d(l, function (b) {
                        g[b] ? g[b].addLabel() : g[b] = new N(a, b)
                    }), a.renderUnsquish(), !1 === G.reserveSpace || 0 !== u && 2 !== u && {
                        1: "left",
                        3: "right"
                    }[u] !==
                    a.labelAlign && "center" !== a.labelAlign || d(l, function (a) {
                        K = Math.max(g[a].getLabelSize(), K)
                    }), a.staggerLines && (K *= a.staggerLines, a.labelOffset = K * (a.opposite ? -1 : 1));
                else
                    for (B in g) g[B].destroy(), delete g[B];
                y && y.text && !1 !== y.enabled && (a.axisTitle || ((B = y.textAlign) || (B = (r ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: v ? "right" : "left",
                        middle: "center",
                        high: v ? "left" : "right"
                    })[y.align]), a.axisTitle = c.text(y.text, 0, 0, y.useHTML).attr({
                        zIndex: 7,
                        rotation: y.rotation || 0,
                        align: B
                    }).addClass("highcharts-axis-title").css(y.style).add(a.axisGroup),
                    a.axisTitle.isNew = !0), k && (t = a.axisTitle.getBBox()[r ? "height" : "width"], H = y.offset, w = n(H) ? 0 : x(y.margin, r ? 5 : 10)), a.axisTitle[k ? "show" : "hide"](!0));
                a.renderLine();
                a.offset = m * x(e.offset, q[u]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                c = 0 === u ? -a.labelMetrics().h : 2 === u ? a.tickRotCorr.y : 0;
                w = Math.abs(K) + w;
                K && (w = w - c + m * (r ? x(G.y, a.tickRotCorr.y + 8 * m) : G.x));
                a.axisTitleMargin = x(H, w);
                q[u] = Math.max(q[u], a.axisTitleMargin + t + m * a.offset, w, h && l.length && z ? z[0] : 0);
                e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[f] =
                    Math.max(b[f], e)
            },
            getLinePath: function (a) {
                var b = this.chart,
                    c = this.opposite,
                    e = this.offset,
                    d = this.horiz,
                    l = this.left + (c ? this.width : 0) + e,
                    e = b.chartHeight - this.bottom - (c ? this.height : 0) + e;
                c && (a *= -1);
                return b.renderer.crispLine(["M", d ? this.left : l, d ? e : this.top, "L", d ? b.chartWidth - this.right : l, d ? e : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    e = this.len,
                    d = this.options.title,
                    l = a ? b : c,
                    g = this.opposite,
                    r = this.offset,
                    u = d.x || 0,
                    f = d.y || 0,
                    h = this.chart.renderer.fontMetrics(d.style && d.style.fontSize, this.axisTitle).f,
                    e = {
                        low: l + (a ? 0 : e),
                        middle: l + e / 2,
                        high: l + (a ? e : 0)
                    }[d.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? h : 0);
                return {
                    x: a ? e + u : b + (g ? this.width : 0) + r + u,
                    y: a ? b + f - (g ? this.height : 0) + r : e + f
                }
            },
            render: function () {
                var a =
                    this,
                    c = a.chart,
                    e = c.renderer,
                    l = a.options,
                    g = a.isLog,
                    r = a.lin2log,
                    u = a.isLinked,
                    f = a.tickPositions,
                    h = a.axisTitle,
                    k = a.ticks,
                    t = a.minorTicks,
                    w = a.alternateBands,
                    y = l.stackLabels,
                    x = l.alternateGridColor,
                    G = a.tickmarkOffset,
                    n = a.axisLine,
                    K = c.hasRendered && b(a.oldMin),
                    v = a.showAxis,
                    q = z(e.globalAnimation),
                    m, B;
                a.labelEdge.length = 0;
                a.overlap = !1;
                d([k, t, w], function (a) {
                    for (var b in a) a[b].isActive = !1
                });
                if (a.hasData() || u) a.minorTickInterval && !a.categories && d(a.getMinorTickPositions(), function (b) {
                        t[b] || (t[b] = new N(a, b, "minor"));
                        K && t[b].isNew && t[b].render(null, !0);
                        t[b].render(null, !1, 1)
                    }), f.length && (d(f, function (b, c) {
                        if (!u || b >= a.min && b <= a.max) k[b] || (k[b] = new N(a, b)), K && k[b].isNew && k[b].render(c, !0, .1), k[b].render(c)
                    }), G && (0 === a.min || a.single) && (k[-1] || (k[-1] = new N(a, -1, null, !0)), k[-1].render(-1))), x && d(f, function (b, e) {
                        B = void 0 !== f[e + 1] ? f[e + 1] + G : a.max - G;
                        0 === e % 2 && b < a.max && B <= a.max + (c.polar ? -G : G) && (w[b] || (w[b] = new I(a)), m = b + G, w[b].options = {
                            from: g ? r(m) : m,
                            to: g ? r(B) : B,
                            color: x
                        }, w[b].render(), w[b].isActive = !0)
                    }), a._addedPlotLB ||
                    (d((l.plotLines || []).concat(l.plotBands || []), function (b) {
                        a.addPlotBandOrLine(b)
                    }), a._addedPlotLB = !0);
                d([k, t, w], function (a) {
                    var b, e, d = [],
                        l = q.duration;
                    for (b in a) a[b].isActive || (a[b].render(b, !1, 0), a[b].isActive = !1, d.push(b));
                    H(function () {
                        for (e = d.length; e--;) a[d[e]] && !a[d[e]].isActive && (a[d[e]].destroy(), delete a[d[e]])
                    }, a !== w && c.hasRendered && l ? l : 0)
                });
                n && (n[n.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(n.strokeWidth())
                }), n.isPlaced = !0, n[v ? "show" : "hide"](!0));
                h && v && (h[h.isNew ? "attr" : "animate"](a.getTitlePosition()),
                    h.isNew = !1);
                y && y.enabled && a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), d(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                d(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            destroy: function (a) {
                var b = this,
                    c = b.stacks,
                    e, l = b.plotLinesAndBands,
                    g;
                a || r(b);
                for (e in c) v(c[e]), c[e] = null;
                d([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    v(a)
                });
                if (l)
                    for (a = l.length; a--;) l[a].destroy();
                d("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
                    b[a] &&
                        (b[a] = b[a].destroy())
                });
                l = "extKey hcEvents names series userMax userMin".split(" ");
                for (g in b) b.hasOwnProperty(g) && -1 === u(g, l) && delete b[g]
            },
            drawCrosshair: function (a, b) {
                var c, e = this.crosshair,
                    d = x(e.snap, !0),
                    l, g = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (n(b) || !d) ? (d ? n(b) && (l = this.isXAxis ? b.plotX : this.len - b.plotY) : l = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), n(l) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : x(b.stackY, b.y)), null, null, null, l) || null), n(c) ? (b =
                    this.categories && !this.isRadial, g || (this.cross = g = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + e.className).attr({
                        zIndex: x(e.zIndex, 2)
                    }).add(), g.attr({
                        stroke: e.color || (b ? f("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": x(e.width, 1)
                    }), e.dashStyle && g.attr({
                        dashstyle: e.dashStyle
                    })), g.show().attr({
                        d: c
                    }), b && !e.width && g.attr({
                        "stroke-width": this.transA
                    }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross &&
                    this.cross.hide()
            }
        };
        w(a.Axis.prototype, m)
    })(M);
    (function (a) {
        var D = a.Axis,
            z = a.Date,
            F = a.dateFormat,
            J = a.defaultOptions,
            m = a.defined,
            f = a.each,
            h = a.extend,
            q = a.getMagnitude,
            n = a.getTZOffset,
            k = a.normalizeTickInterval,
            v = a.pick,
            d = a.timeUnits;
        D.prototype.getTimeTicks = function (a, k, q, c) {
            var e = [],
                l = {},
                g = J.global.useUTC,
                w, b = new z(k - n(k)),
                t, y = z.hcMakeTime,
                K = a.unitRange,
                x = a.count,
                B;
            if (m(k)) {
                b[z.hcSetMilliseconds](K >= d.second ? 0 : x * Math.floor(b.getMilliseconds() / x));
                if (K >= d.second) b[z.hcSetSeconds](K >= d.minute ? 0 : x * Math.floor(b.getSeconds() /
                    x));
                if (K >= d.minute) b[z.hcSetMinutes](K >= d.hour ? 0 : x * Math.floor(b[z.hcGetMinutes]() / x));
                K >= d.hour && (b[z.hcSetHours](K >= d.day ? 0 : x * Math.floor(b[z.hcGetHours]() / x)), t = b[z.hcGetHours]());
                if (K >= d.day) b[z.hcSetDate](K >= d.month ? 1 : x * Math.floor(b[z.hcGetDate]() / x));
                K >= d.month && (b[z.hcSetMonth](K >= d.year ? 0 : x * Math.floor(b[z.hcGetMonth]() / x)), w = b[z.hcGetFullYear]());
                if (K >= d.year) b[z.hcSetFullYear](w - w % x);
                if (K === d.week) b[z.hcSetDate](b[z.hcGetDate]() - b[z.hcGetDay]() + v(c, 1));
                c = 1;
                if (z.hcTimezoneOffset || z.hcGetTimezoneOffset) B =
                    (!g || !!z.hcGetTimezoneOffset) && (q - k > 4 * d.month || n(k) !== n(q)), b = b.getTime(), b = new z(b + n(b));
                w = b[z.hcGetFullYear]();
                k = b.getTime();
                g = b[z.hcGetMonth]();
                for (b = b[z.hcGetDate](); k < q;) e.push(k), k = K === d.year ? y(w + c * x, 0) : K === d.month ? y(w, g + c * x) : !B || K !== d.day && K !== d.week ? B && K === d.hour ? y(w, g, b, t + c * x) : k + K * x : y(w, g, b + c * x * (K === d.day ? 1 : 7)), c++;
                e.push(k);
                K <= d.hour && f(e, function (a) {
                    "000000000" === F("%H%M%S%L", a) && (l[a] = "day")
                })
            }
            e.info = h(a, {
                higherRanks: l,
                totalRange: K * x
            });
            return e
        };
        D.prototype.normalizeTimeTickInterval = function (a,
            f) {
            var g = f || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            f = g[g.length - 1];
            var c = d[f[0]],
                e = f[1],
                l;
            for (l = 0; l < g.length && !(f = g[l], c = d[f[0]], e = f[1], g[l + 1] && a <= (c * e[e.length - 1] + d[g[l + 1][0]]) / 2); l++);
            c === d.year && a < 5 * c && (e = [1, 2, 5]);
            a = k(a / c, e, "year" === f[0] ? Math.max(q(a / c), 1) : 1);
            return {
                unitRange: c,
                count: a,
                unitName: f[0]
            }
        }
    })(M);
    (function (a) {
        var D = a.Axis,
            z = a.getMagnitude,
            F = a.map,
            J = a.normalizeTickInterval,
            m = a.pick;
        D.prototype.getLogTickPositions = function (a, h, q, n) {
            var f = this.options,
                v = this.len,
                d = this.lin2log,
                g = this.log2lin,
                w = [];
            n || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), w = this.getLinearTickPositions(a, h, q);
            else if (.08 <= a)
                for (var v = Math.floor(h), B, c, e, l, u, f = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; v < q + 1 && !u; v++)
                    for (c = f.length, B = 0; B < c && !u; B++) e = g(d(v) * f[B]), e > h && (!n || l <= q) && void 0 !== l && w.push(l), l > q && (u = !0), l = e;
            else h = d(h), q = d(q), a = f[n ? "minorTickInterval" :
                "tickInterval"], a = m("auto" === a ? null : a, this._minorAutoInterval, f.tickPixelInterval / (n ? 5 : 1) * (q - h) / ((n ? v / this.tickPositions.length : v) || 1)), a = J(a, null, z(a)), w = F(this.getLinearTickPositions(a, h, q), g), n || (this._minorAutoInterval = a / 5);
            n || (this.tickInterval = a);
            return w
        };
        D.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        D.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(M);
    (function (a) {
        var D = a.dateFormat,
            z = a.each,
            F = a.extend,
            J = a.format,
            m = a.isNumber,
            f = a.map,
            h = a.merge,
            q = a.pick,
            n = a.splat,
            k = a.stop,
            v = a.syncTimeout,
            d = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split
            },
            cleanSplit: function (a) {
                z(this.chart.series, function (d) {
                    var g = d && d.tt;
                    g && (!g.isActive || a ? d.tt = g.destroy() : g.isActive = !1)
                })
            },
            getLabel: function () {
                var a = this.chart.renderer,
                    d = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") :
                    (this.label = a.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({
                        padding: d.padding,
                        r: d.borderRadius
                    }), this.label.attr({
                        fill: d.backgroundColor,
                        "stroke-width": d.borderWidth
                    }).css(d.style).shadow(d.shadow)), this.label.attr({
                        zIndex: 8
                    }).add());
                return this.label
            },
            update: function (a) {
                this.destroy();
                this.init(this.chart, h(!0, this.options, a))
            },
            destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function (a, d, f, c) {
                var e = this,
                    l = e.now,
                    g = !1 !== e.options.animation && !e.isHidden && (1 < Math.abs(a - l.x) || 1 < Math.abs(d - l.y)),
                    h = e.followPointer || 1 < e.len;
                F(l, {
                    x: g ? (2 * l.x + a) / 3 : a,
                    y: g ? (l.y + d) / 2 : d,
                    anchorX: h ? void 0 : g ? (2 * l.anchorX + f) / 3 : f,
                    anchorY: h ? void 0 : g ? (l.anchorY + c) / 2 : c
                });
                e.getLabel().attr(l);
                g && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    e && e.move(a, d, f, c)
                }, 32))
            },
            hide: function (a) {
                var d = this;
                clearTimeout(this.hideTimer);
                a = q(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = v(function () {
                    d.getLabel()[a ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, a))
            },
            getAnchor: function (a, d) {
                var g, c = this.chart,
                    e = c.inverted,
                    l = c.plotTop,
                    u = c.plotLeft,
                    h = 0,
                    b = 0,
                    k, y;
                a = n(a);
                g = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = c.pointer.normalize(d)), g = [d.chartX - c.plotLeft, d.chartY - l]);
                g || (z(a, function (a) {
                    k = a.series.yAxis;
                    y = a.series.xAxis;
                    h += a.plotX + (!e && y ? y.left - u : 0);
                    b += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && k ? k.top -
                        l : 0)
                }), h /= a.length, b /= a.length, g = [e ? c.plotWidth - b : h, this.shared && !e && 1 < a.length && d ? d.chartY - l : e ? c.plotHeight - h : b]);
                return f(g, Math.round)
            },
            getPosition: function (a, d, f) {
                var c = this.chart,
                    e = this.distance,
                    l = {},
                    g = f.h || 0,
                    h, b = ["y", c.chartHeight, d, f.plotY + c.plotTop, c.plotTop, c.plotTop + c.plotHeight],
                    k = ["x", c.chartWidth, a, f.plotX + c.plotLeft, c.plotLeft, c.plotLeft + c.plotWidth],
                    y = !this.followPointer && q(f.ttBelow, !c.inverted === !!f.negative),
                    n = function (a, b, c, d, r, u) {
                        var p = c < d - e,
                            f = d + e + c < b,
                            h = d - e - c;
                        d += e;
                        if (y && f) l[a] =
                            d;
                        else if (!y && p) l[a] = h;
                        else if (p) l[a] = Math.min(u - c, 0 > h - g ? h : h - g);
                        else if (f) l[a] = Math.max(r, d + g + c > b ? d : d + g);
                        else return !1
                    },
                    x = function (a, b, c, d) {
                        var g;
                        d < e || d > b - e ? g = !1 : l[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2;
                        return g
                    },
                    w = function (a) {
                        var c = b;
                        b = k;
                        k = c;
                        h = a
                    },
                    r = function () {
                        !1 !== n.apply(0, b) ? !1 !== x.apply(0, k) || h || (w(!0), r()) : h ? l.x = l.y = 0 : (w(!0), r())
                    };
                (c.inverted || 1 < this.len) && w();
                r();
                return l
            },
            defaultFormatter: function (a) {
                var d = this.points || n(this),
                    g;
                g = [a.tooltipFooterHeaderFormatter(d[0])];
                g = g.concat(a.bodyFormatter(d));
                g.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return g
            },
            refresh: function (a, d) {
                var g = this.chart,
                    c = this.getLabel(),
                    e = this.options,
                    l, u, f = {},
                    b, h = [];
                b = e.formatter || this.defaultFormatter;
                var f = g.hoverPoints,
                    y = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = n(a)[0].series.tooltipOptions.followPointer;
                u = this.getAnchor(a, d);
                d = u[0];
                l = u[1];
                !y || a.series && a.series.noSharedTooltip ? f = a.getLabelConfig() : (g.hoverPoints = a, f && z(f, function (a) {
                        a.setState()
                    }), z(a, function (a) {
                        a.setState("hover");
                        h.push(a.getLabelConfig())
                    }),
                    f = {
                        x: a[0].category,
                        y: a[0].y
                    }, f.points = h, this.len = h.length, a = a[0]);
                b = b.call(f, this);
                f = a.series;
                this.distance = q(f.tooltipOptions.distance, 16);
                !1 === b ? this.hide() : (this.isHidden && (k(c), c.attr({
                    opacity: 1
                }).show()), this.split ? this.renderSplit(b, g.hoverPoints) : (c.attr({
                    text: b.join ? b.join("") : b
                }), c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + q(a.colorIndex, f.colorIndex)), c.attr({
                    stroke: e.borderColor || a.color || f.color || "#666666"
                }), this.updatePosition({
                    plotX: d,
                    plotY: l,
                    negative: a.negative,
                    ttBelow: a.ttBelow,
                    h: u[2] || 0
                })), this.isHidden = !1)
            },
            renderSplit: function (d, f) {
                var g = this,
                    c = [],
                    e = this.chart,
                    l = e.renderer,
                    u = !0,
                    h = this.options,
                    b, k = this.getLabel();
                z(d.slice(0, d.length - 1), function (a, d) {
                    d = f[d - 1] || {
                        isHeader: !0,
                        plotX: f[0].plotX
                    };
                    var t = d.series || g,
                        y = t.tt,
                        r = d.series || {},
                        G = "highcharts-color-" + q(d.colorIndex, r.colorIndex, "none");
                    y || (t.tt = y = l.label(null, null, null, d.isHeader && "callout").addClass("highcharts-tooltip-box " + G).attr({
                        padding: h.padding,
                        r: h.borderRadius,
                        fill: h.backgroundColor,
                        stroke: d.color ||
                            r.color || "#333333",
                        "stroke-width": h.borderWidth
                    }).add(k), d.series && (y.connector = l.path().addClass("highcharts-tooltip-connector " + G).attr({
                        "stroke-width": r.options.lineWidth || 2,
                        stroke: d.color || r.color || "#666666"
                    }).add(y)));
                    y.isActive = !0;
                    y.attr({
                        text: a
                    });
                    a = y.getBBox();
                    r = a.width + y.strokeWidth();
                    d.isHeader ? (b = a.height, r = Math.max(0, Math.min(d.plotX + e.plotLeft - r / 2, e.chartWidth - r))) : r = d.plotX + e.plotLeft - q(h.distance, 16) - r;
                    0 > r && (u = !1);
                    a = (d.series && d.series.yAxis && d.series.yAxis.pos) + (d.plotY || 0);
                    a -= e.plotTop;
                    c.push({
                        target: d.isHeader ? e.plotHeight + b : a,
                        rank: d.isHeader ? 1 : 0,
                        size: t.tt.getBBox().height + 1,
                        point: d,
                        x: r,
                        tt: y
                    })
                });
                this.cleanSplit();
                a.distribute(c, e.plotHeight + b);
                z(c, function (a) {
                    var b = a.point,
                        c = a.tt,
                        d;
                    d = {
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: u || b.isHeader ? a.x : b.plotX + e.plotLeft + q(h.distance, 16),
                        y: a.pos + e.plotTop
                    };
                    b.isHeader && (d.anchorX = b.plotX + e.plotLeft, d.anchorY = d.y - 100);
                    c.attr(d);
                    b.isHeader || c.connector.attr({
                        d: ["M", b.plotX + e.plotLeft - d.x, b.plotY + b.series.yAxis.pos - d.y, "L", (u ? -1 : 1) * q(h.distance,
                            16) + b.plotX + e.plotLeft - d.x, a.pos + e.plotTop + c.getBBox().height / 2 - d.y]
                    })
                })
            },
            updatePosition: function (a) {
                var d = this.chart,
                    g = this.getLabel(),
                    g = (this.options.positioner || this.getPosition).call(this, g.width, g.height, a);
                this.move(Math.round(g.x), Math.round(g.y || 0), a.plotX + d.plotLeft, a.plotY + d.plotTop)
            },
            getXDateFormat: function (a, f, h) {
                var c;
                f = f.dateTimeLabelFormats;
                var e = h && h.closestPointRange,
                    l, g = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    k, b = "millisecond";
                if (e) {
                    k = D("%m-%d %H:%M:%S.%L", a.x);
                    for (l in d) {
                        if (e ===
                            d.week && +D("%w", a.x) === h.options.startOfWeek && "00:00:00.000" === k.substr(6)) {
                            l = "week";
                            break
                        }
                        if (d[l] > e) {
                            l = b;
                            break
                        }
                        if (g[l] && k.substr(g[l]) !== "01-01 00:00:00.000".substr(g[l])) break;
                        "week" !== l && (b = l)
                    }
                    l && (c = f[l])
                } else c = f.day;
                return c || f.year
            },
            tooltipFooterHeaderFormatter: function (a, d) {
                var g = d ? "footer" : "header";
                d = a.series;
                var c = d.tooltipOptions,
                    e = c.xDateFormat,
                    l = d.xAxis,
                    u = l && "datetime" === l.options.type && m(a.key),
                    g = c[g + "Format"];
                u && !e && (e = this.getXDateFormat(a, c, l));
                u && e && (g = g.replace("{point.key}", "{point.key:" +
                    e + "}"));
                return J(g, {
                    point: a,
                    series: d
                })
            },
            bodyFormatter: function (a) {
                return f(a, function (a) {
                    var d = a.series.tooltipOptions;
                    return (d.pointFormatter || a.point.tooltipFormatter).call(a.point, d.pointFormat)
                })
            }
        }
    })(M);
    (function (a) {
        var D = a.addEvent,
            z = a.attr,
            F = a.charts,
            J = a.color,
            m = a.css,
            f = a.defined,
            h = a.doc,
            q = a.each,
            n = a.extend,
            k = a.fireEvent,
            v = a.offset,
            d = a.pick,
            g = a.removeEvent,
            w = a.splat,
            B = a.Tooltip,
            c = a.win;
        a.Pointer = function (a, c) {
            this.init(a, c)
        };
        a.Pointer.prototype = {
            init: function (a, c) {
                this.options = c;
                this.chart =
                    a;
                this.runChartClick = c.chart.events && !!c.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                B && c.tooltip.enabled && (a.tooltip = new B(a, c.tooltip), this.followTouchMove = d(c.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function () {
                var a = this.chart,
                    c = a.options.chart.zoomType,
                    d = /x/.test(c),
                    c = /y/.test(c),
                    a = a.inverted;
                this.zoomX = d;
                this.zoomY = c;
                this.zoomHor = d && !a || c && a;
                this.zoomVert = c && !a || d && a;
                this.hasZoom = d || c
            },
            normalize: function (a, d) {
                var e, l;
                a = a || c.event;
                a.target || (a.target = a.srcElement);
                l = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                d || (this.chartPosition = d = v(this.chart.container));
                void 0 === l.pageX ? (e = Math.max(a.x, a.clientX - d.left), d = a.y) : (e = l.pageX - d.left, d = l.pageY - d.top);
                return n(a, {
                    chartX: Math.round(e),
                    chartY: Math.round(d)
                })
            },
            getCoordinates: function (a) {
                var c = {
                    xAxis: [],
                    yAxis: []
                };
                q(this.chart.axes, function (e) {
                    c[e.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: e,
                        value: e.toValue(a[e.horiz ? "chartX" : "chartY"])
                    })
                });
                return c
            },
            runPointActions: function (c) {
                var e = this.chart,
                    g =
                    e.series,
                    f = e.tooltip,
                    b = f ? f.shared : !1,
                    k = !0,
                    y = e.hoverPoint,
                    n = e.hoverSeries,
                    x, v, r, G = [],
                    H;
                if (!b && !n)
                    for (x = 0; x < g.length; x++)
                        if (g[x].directTouch || !g[x].options.stickyTracking) g = [];
                n && (b ? n.noSharedTooltip : n.directTouch) && y ? G = [y] : (b || !n || n.options.stickyTracking || (g = [n]), q(g, function (a) {
                    v = a.noSharedTooltip && b;
                    r = !b && a.directTouch;
                    a.visible && !v && !r && d(a.options.enableMouseTracking, !0) && (H = a.searchPoint(c, !v && 1 === a.kdDimensions)) && H.series && G.push(H)
                }), G.sort(function (a, c) {
                    var e = a.distX - c.distX,
                        d = a.dist - c.dist;
                    return 0 !== e && b ? e : 0 !== d ? d : a.series.group.zIndex > c.series.group.zIndex ? -1 : 1
                }));
                if (b)
                    for (x = G.length; x--;)(G[x].x !== G[0].x || G[x].series.noSharedTooltip) && G.splice(x, 1);
                if (G[0] && (G[0] !== this.prevKDPoint || f && f.isHidden)) {
                    if (b && !G[0].series.noSharedTooltip) {
                        for (x = 0; x < G.length; x++) G[x].onMouseOver(c, G[x] !== (n && n.directTouch && y || G[0]));
                        G.length && f && f.refresh(G.sort(function (a, b) {
                            return a.series.index - b.series.index
                        }), c)
                    } else if (f && f.refresh(G[0], c), !n || !n.directTouch) G[0].onMouseOver(c);
                    this.prevKDPoint =
                        G[0];
                    k = !1
                }
                k && (g = n && n.tooltipOptions.followPointer, f && g && !f.isHidden && (g = f.getAnchor([{}], c), f.updatePosition({
                    plotX: g[0],
                    plotY: g[1]
                })));
                this._onDocumentMouseMove || (this._onDocumentMouseMove = function (b) {
                    if (F[a.hoverChartIndex]) F[a.hoverChartIndex].pointer.onDocumentMouseMove(b)
                }, D(h, "mousemove", this._onDocumentMouseMove));
                q(b ? G : [d(y, G[0])], function (a) {
                    q(e.axes, function (b) {
                        (!a || a.series && a.series[b.coll] === b) && b.drawCrosshair(c, a)
                    })
                })
            },
            reset: function (a, c) {
                var e = this.chart,
                    d = e.hoverSeries,
                    b = e.hoverPoint,
                    l = e.hoverPoints,
                    f = e.tooltip,
                    k = f && f.shared ? l : b;
                a && k && q(w(k), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) f && k && (f.refresh(k), b && (b.setState(b.state, !0), q(e.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, b)
                })));
                else {
                    if (b) b.onMouseOut();
                    l && q(l, function (a) {
                        a.setState()
                    });
                    if (d) d.onMouseOut();
                    f && f.hide(c);
                    this._onDocumentMouseMove && (g(h, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null);
                    q(e.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = this.prevKDPoint = e.hoverPoints =
                        e.hoverPoint = null
                }
            },
            scaleGroups: function (a, c) {
                var e = this.chart,
                    d;
                q(e.series, function (b) {
                    d = a || b.getPlotBox();
                    b.xAxis && b.xAxis.zoomEnabled && b.group && (b.group.attr(d), b.markerGroup && (b.markerGroup.attr(d), b.markerGroup.clip(c ? e.clipRect : null)), b.dataLabelsGroup && b.dataLabelsGroup.attr(d))
                });
                e.clipRect.attr(c || e.clipBox)
            },
            dragStart: function (a) {
                var c = this.chart;
                c.mouseIsDown = a.type;
                c.cancelClick = !1;
                c.mouseDownX = this.mouseDownX = a.chartX;
                c.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function (a) {
                var c = this.chart,
                    e = c.options.chart,
                    d = a.chartX,
                    b = a.chartY,
                    g = this.zoomHor,
                    f = this.zoomVert,
                    h = c.plotLeft,
                    k = c.plotTop,
                    n = c.plotWidth,
                    r = c.plotHeight,
                    G, H = this.selectionMarker,
                    v = this.mouseDownX,
                    p = this.mouseDownY,
                    q = e.panKey && a[e.panKey + "Key"];
                H && H.touch || (d < h ? d = h : d > h + n && (d = h + n), b < k ? b = k : b > k + r && (b = k + r), this.hasDragged = Math.sqrt(Math.pow(v - d, 2) + Math.pow(p - b, 2)), 10 < this.hasDragged && (G = c.isInsidePlot(v - h, p - k), c.hasCartesianSeries && (this.zoomX || this.zoomY) && G && !q && !H && (this.selectionMarker = H = c.renderer.rect(h, k, g ? 1 : n, f ? 1 : r, 0).attr({
                    fill: e.selectionMarkerFill ||
                        J("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), H && g && (d -= v, H.attr({
                    width: Math.abs(d),
                    x: (0 < d ? 0 : d) + v
                })), H && f && (d = b - p, H.attr({
                    height: Math.abs(d),
                    y: (0 < d ? 0 : d) + p
                })), G && !H && e.panning && c.pan(a, e.panning)))
            },
            drop: function (a) {
                var c = this,
                    e = this.chart,
                    d = this.hasPinched;
                if (this.selectionMarker) {
                    var b = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        g = this.selectionMarker,
                        h = g.attr ? g.attr("x") : g.x,
                        v = g.attr ? g.attr("y") : g.y,
                        x = g.attr ? g.attr("width") : g.width,
                        w = g.attr ? g.attr("height") :
                        g.height,
                        r;
                    if (this.hasDragged || d) q(e.axes, function (e) {
                        if (e.zoomEnabled && f(e.min) && (d || c[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[e.coll]])) {
                            var l = e.horiz,
                                g = "touchend" === a.type ? e.minPixelPadding : 0,
                                p = e.toValue((l ? h : v) + g),
                                l = e.toValue((l ? h + x : v + w) - g);
                            b[e.coll].push({
                                axis: e,
                                min: Math.min(p, l),
                                max: Math.max(p, l)
                            });
                            r = !0
                        }
                    }), r && k(e, "selection", b, function (a) {
                        e.zoom(n(a, d ? {
                            animation: !1
                        } : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    d && this.scaleGroups()
                }
                e && (m(e.container, {
                        cursor: e._cursor
                    }), e.cancelClick = 10 <
                    this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption();
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            },
            onDocumentMouseUp: function (c) {
                F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(c)
            },
            onDocumentMouseMove: function (a) {
                var c = this.chart,
                    e = this.chartPosition;
                a = this.normalize(a, e);
                !e || this.inClass(a.target, "highcharts-tracker") || c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop) || this.reset()
            },
            onContainerMouseLeave: function (c) {
                var e = F[a.hoverChartIndex];
                e && (c.relatedTarget || c.toElement) && (e.pointer.reset(), e.pointer.chartPosition = null)
            },
            onContainerMouseMove: function (c) {
                var e = this.chart;
                f(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = e.index);
                c = this.normalize(c);
                c.returnValue = !1;
                "mousedown" === e.mouseIsDown && this.drag(c);
                !this.inClass(c.target, "highcharts-tracker") && !e.isInsidePlot(c.chartX - e.plotLeft, c.chartY - e.plotTop) || e.openMenu || this.runPointActions(c)
            },
            inClass: function (a, c) {
                for (var e; a;) {
                    if (e = z(a, "class")) {
                        if (-1 !== e.indexOf(c)) return !0;
                        if (-1 !== e.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function (a) {
                var c = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (!(!c || !a || c.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + c.index) && this.inClass(a, "highcharts-tracker"))) c.onMouseOut()
            },
            onContainerClick: function (a) {
                var c = this.chart,
                    e = c.hoverPoint,
                    d = c.plotLeft,
                    b = c.plotTop;
                a = this.normalize(a);
                c.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (k(e.series, "click", n(a, {
                    point: e
                })), c.hoverPoint && e.firePointEvent("click", a)) : (n(a, this.getCoordinates(a)), c.isInsidePlot(a.chartX - d, a.chartY - b) && k(c, "click", a)))
            },
            setDOMEvents: function () {
                var c = this,
                    d = c.chart.container;
                d.onmousedown = function (a) {
                    c.onContainerMouseDown(a)
                };
                d.onmousemove = function (a) {
                    c.onContainerMouseMove(a)
                };
                d.onclick = function (a) {
                    c.onContainerClick(a)
                };
                D(d, "mouseleave", c.onContainerMouseLeave);
                1 === a.chartCount &&
                    D(h, "mouseup", c.onDocumentMouseUp);
                a.hasTouch && (d.ontouchstart = function (a) {
                    c.onContainerTouchStart(a)
                }, d.ontouchmove = function (a) {
                    c.onContainerTouchMove(a)
                }, 1 === a.chartCount && D(h, "touchend", c.onDocumentTouchEnd))
            },
            destroy: function () {
                var c;
                g(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                a.chartCount || (g(h, "mouseup", this.onDocumentMouseUp), g(h, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (c in this) this[c] = null
            }
        }
    })(M);
    (function (a) {
        var D = a.charts,
            z = a.each,
            F = a.extend,
            J = a.map,
            m = a.noop,
            f = a.pick;
        F(a.Pointer.prototype, {
            pinchTranslate: function (a, f, n, k, v, d) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, f, n, k, v, d);
                (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, f, n, k, v, d)
            },
            pinchTranslateDirection: function (a, f, n, k, v, d, g, w) {
                var h = this.chart,
                    c = a ? "x" : "y",
                    e = a ? "X" : "Y",
                    l = "chart" + e,
                    u = a ? "width" : "height",
                    q = h["plot" + (a ? "Left" : "Top")],
                    b, t, y = w || 1,
                    m = h.inverted,
                    x = h.bounds[a ? "h" : "v"],
                    I = 1 === f.length,
                    r = f[0][l],
                    G = n[0][l],
                    H = !I && f[1][l],
                    N = !I && n[1][l],
                    p;
                n = function () {
                    !I && 20 < Math.abs(r - H) && (y = w || Math.abs(G - N) / Math.abs(r - H));
                    t = (q - G) / y + r;
                    b = h["plot" + (a ? "Width" : "Height")] / y
                };
                n();
                f = t;
                f < x.min ? (f = x.min, p = !0) : f + b > x.max && (f = x.max - b, p = !0);
                p ? (G -= .8 * (G - g[c][0]), I || (N -= .8 * (N - g[c][1])), n()) : g[c] = [G, N];
                m || (d[c] = t - q, d[u] = b);
                d = m ? 1 / y : y;
                v[u] = b;
                v[c] = f;
                k[m ? a ? "scaleY" : "scaleX" : "scale" + e] = y;
                k["translate" + e] = d * q + (G - d * r)
            },
            pinch: function (a) {
                var h = this,
                    n = h.chart,
                    k = h.pinchDown,
                    v = a.touches,
                    d = v.length,
                    g = h.lastValidTouch,
                    w = h.hasZoom,
                    B = h.selectionMarker,
                    c = {},
                    e = 1 ===
                    d && (h.inClass(a.target, "highcharts-tracker") && n.runTrackerClick || h.runChartClick),
                    l = {};
                1 < d && (h.initiated = !0);
                w && h.initiated && !e && a.preventDefault();
                J(v, function (a) {
                    return h.normalize(a)
                });
                "touchstart" === a.type ? (z(v, function (a, c) {
                    k[c] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), g.x = [k[0].chartX, k[1] && k[1].chartX], g.y = [k[0].chartY, k[1] && k[1].chartY], z(n.axes, function (a) {
                    if (a.zoomEnabled) {
                        var c = n.bounds[a.horiz ? "h" : "v"],
                            b = a.minPixelPadding,
                            e = a.toPixels(f(a.options.min, a.dataMin)),
                            d = a.toPixels(f(a.options.max,
                                a.dataMax)),
                            g = Math.max(e, d);
                        c.min = Math.min(a.pos, Math.min(e, d) - b);
                        c.max = Math.max(a.pos + a.len, g + b)
                    }
                }), h.res = !0) : k.length && (B || (h.selectionMarker = B = F({
                    destroy: m,
                    touch: !0
                }, n.plotBox)), h.pinchTranslate(k, v, c, B, l, g), h.hasPinched = w, h.scaleGroups(c, l), !w && h.followTouchMove && 1 === d ? this.runPointActions(h.normalize(a)) : h.res && (h.res = !1, this.reset(!1, 0)))
            },
            touch: function (h, m) {
                var n = this.chart,
                    k;
                a.hoverChartIndex = n.index;
                1 === h.touches.length ? (h = this.normalize(h), n.isInsidePlot(h.chartX - n.plotLeft, h.chartY - n.plotTop) &&
                    !n.openMenu ? (m && this.runPointActions(h), "touchmove" === h.type && (m = this.pinchDown, k = m[0] ? 4 <= Math.sqrt(Math.pow(m[0].chartX - h.chartX, 2) + Math.pow(m[0].chartY - h.chartY, 2)) : !1), f(k, !0) && this.pinch(h)) : m && this.reset()) : 2 === h.touches.length && this.pinch(h)
            },
            onContainerTouchStart: function (a) {
                this.zoomOption();
                this.touch(a, !0)
            },
            onContainerTouchMove: function (a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function (f) {
                D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(f)
            }
        })
    })(M);
    (function (a) {
        var D = a.addEvent,
            z = a.charts,
            F = a.css,
            J = a.doc,
            m = a.extend,
            f = a.noop,
            h = a.Pointer,
            q = a.removeEvent,
            n = a.win,
            k = a.wrap;
        if (n.PointerEvent || n.MSPointerEvent) {
            var v = {},
                d = !!n.PointerEvent,
                g = function () {
                    var a, c = [];
                    c.item = function (a) {
                        return this[a]
                    };
                    for (a in v) v.hasOwnProperty(a) && c.push({
                        pageX: v[a].pageX,
                        pageY: v[a].pageY,
                        target: v[a].target
                    });
                    return c
                },
                w = function (d, c, e, l) {
                    "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !z[a.hoverChartIndex] || (l(d), l = z[a.hoverChartIndex].pointer, l[c]({
                        type: e,
                        target: d.currentTarget,
                        preventDefault: f,
                        touches: g()
                    }))
                };
            m(h.prototype, {
                onContainerPointerDown: function (a) {
                    w(a, "onContainerTouchStart", "touchstart", function (a) {
                        v[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function (a) {
                    w(a, "onContainerTouchMove", "touchmove", function (a) {
                        v[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        v[a.pointerId].target || (v[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function (a) {
                    w(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete v[a.pointerId]
                    })
                },
                batchMSEvents: function (a) {
                    a(this.chart.container,
                        d ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, d ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(J, d ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            k(h.prototype, "init", function (a, c, e) {
                a.call(this, c, e);
                this.hasZoom && F(c.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            k(h.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(D)
            });
            k(h.prototype, "destroy", function (a) {
                this.batchMSEvents(q);
                a.call(this)
            })
        }
    })(M);
    (function (a) {
        var D, z = a.addEvent,
            F = a.css,
            J = a.discardElement,
            m = a.defined,
            f = a.each,
            h = a.extend,
            q = a.isFirefox,
            n = a.marginNames,
            k = a.merge,
            v = a.pick,
            d = a.setAnimation,
            g = a.stableSort,
            w = a.win,
            B = a.wrap;
        D = a.Legend = function (a, e) {
            this.init(a, e)
        };
        D.prototype = {
            init: function (a, e) {
                this.chart = a;
                this.setOptions(e);
                e.enabled && (this.render(), z(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function (a) {
                var c = v(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle =
                    k(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.initialItemX = this.padding = c;
                this.initialItemY = c - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = v(a.symbolWidth, 16);
                this.pages = []
            },
            update: function (a, e) {
                var c = this.chart;
                this.setOptions(k(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                v(e, !0) && c.redraw()
            },
            colorizeItem: function (a, e) {
                a.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var c = this.options,
                    d = a.legendItem,
                    g = a.legendLine,
                    b = a.legendSymbol,
                    f = this.itemHiddenStyle.color,
                    c = e ? c.itemStyle.color : f,
                    h = e ? a.color || f : f,
                    k = a.options && a.options.marker,
                    n = {
                        fill: h
                    },
                    v;
                d && d.css({
                    fill: c,
                    color: c
                });
                g && g.attr({
                    stroke: h
                });
                if (b) {
                    if (k && b.isMarker && (n = a.pointAttribs(), !e))
                        for (v in n) n[v] = f;
                    b.attr(n)
                }
            },
            positionItem: function (a) {
                var c = this.options,
                    d = c.symbolPadding,
                    c = !c.rtl,
                    g = a._legendItemPos,
                    f = g[0],
                    g = g[1],
                    b = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(c ? f : this.legendWidth - f - 2 * d - 4, g);
                b && (b.x = f, b.y = g)
            },
            destroyItem: function (a) {
                var c = a.checkbox;
                f(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (c) {
                    a[c] && (a[c] = a[c].destroy())
                });
                c && J(a.checkbox)
            },
            destroy: function () {
                var a = this.group,
                    e = this.box;
                e && (this.box = e.destroy());
                f(this.getAllItems(), function (a) {
                    f(["legendItem", "legendGroup"], function (c) {
                        a[c] && (a[c] = a[c].destroy())
                    })
                });
                a && (this.group = a.destroy())
            },
            positionCheckboxes: function (a) {
                var c = this.group.alignAttr,
                    d, g = this.clipHeight || this.legendHeight,
                    h = this.titleHeight;
                c && (d = c.translateY, f(this.allItems, function (b) {
                    var e = b.checkbox,
                        l;
                    e && (l = d + h + e.y + (a || 0) + 3, F(e, {
                        left: c.translateX + b.checkboxOffset + e.x - 20 + "px",
                        top: l + "px",
                        display: l > d - 6 && l < d + g - 6 ? "" : "none"
                    }))
                }))
            },
            renderTitle: function () {
                var a = this.padding,
                    e = this.options.title,
                    d = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(e.style).add(this.group)), a = this.title.getBBox(), d = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: d
                }));
                this.titleHeight = d
            },
            setText: function (c) {
                var e =
                    this.options;
                c.legendItem.attr({
                    text: e.labelFormat ? a.format(e.labelFormat, c) : e.labelFormatter.call(c)
                })
            },
            renderItem: function (a) {
                var c = this.chart,
                    d = c.renderer,
                    g = this.options,
                    f = "horizontal" === g.layout,
                    b = this.symbolWidth,
                    h = g.symbolPadding,
                    n = this.itemStyle,
                    m = this.itemHiddenStyle,
                    x = this.padding,
                    w = f ? v(g.itemDistance, 20) : 0,
                    r = !g.rtl,
                    G = g.width,
                    H = g.itemMarginBottom || 0,
                    q = this.itemMarginTop,
                    p = this.initialItemX,
                    A = a.legendItem,
                    B = !a.series,
                    O = !B && a.series.drawLegendSymbol ? a.series : a,
                    C = O.options,
                    C = this.createCheckboxForItem &&
                    C && C.showCheckbox,
                    E = g.useHTML;
                A || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + O.type + "-series highcharts-color-" + a.colorIndex + " " + (a.options.className || "") + (B ? "highcharts-series-" + a.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup), a.legendItem = A = d.text("", r ? b + h : -h, this.baseline || 0, E).css(k(a.visible ? n : m)).attr({
                        align: r ? "left" : "right",
                        zIndex: 2
                    }).add(a.legendGroup), this.baseline || (n = n.fontSize, this.fontMetrics = d.fontMetrics(n, A), this.baseline = this.fontMetrics.f + 3 + q, A.attr("y", this.baseline)),
                    O.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, A, E), C && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                d = A.getBBox();
                b = a.checkboxOffset = g.itemWidth || a.legendItemWidth || b + h + d.width + w + (C ? 20 : 0);
                this.itemHeight = h = Math.round(a.legendItemHeight || d.height);
                f && this.itemX - p + b > (G || c.chartWidth - 2 * x - p - g.x) && (this.itemX = p, this.itemY += q + this.lastLineHeight + H, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, b);
                this.lastItemY = q + this.itemY + H;
                this.lastLineHeight =
                    Math.max(h, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                f ? this.itemX += b : (this.itemY += q + h + H, this.lastLineHeight = h);
                this.offsetWidth = G || Math.max((f ? this.itemX - p - w : b) + x, this.offsetWidth)
            },
            getAllItems: function () {
                var a = [];
                f(this.chart.series, function (c) {
                    var e = c && c.options;
                    c && v(e.showInLegend, m(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === e.legendType ? c.data : c)))
                });
                return a
            },
            adjustMargins: function (a, e) {
                var c = this.chart,
                    d = this.options,
                    g = d.align.charAt(0) + d.verticalAlign.charAt(0) +
                    d.layout.charAt(0);
                d.floating || f([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (b, f) {
                    b.test(g) && !m(a[f]) && (c[n[f]] = Math.max(c[n[f]], c.legend[(f + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][f] * d[f % 2 ? "x" : "y"] + v(d.margin, 12) + e[f]))
                })
            },
            render: function () {
                var a = this,
                    e = a.chart,
                    d = e.renderer,
                    k = a.group,
                    n, b, t, v, m = a.box,
                    x = a.options,
                    w = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                k || (a.group = k = d.g("legend").attr({
                        zIndex: 7
                    }).add(), a.contentGroup =
                    d.g().attr({
                        zIndex: 1
                    }).add(k), a.scrollGroup = d.g().add(a.contentGroup));
                a.renderTitle();
                n = a.getAllItems();
                g(n, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                x.reversed && n.reverse();
                a.allItems = n;
                a.display = b = !!n.length;
                a.lastLineHeight = 0;
                f(n, function (b) {
                    a.renderItem(b)
                });
                t = (x.width || a.offsetWidth) + w;
                v = a.lastItemY + a.lastLineHeight + a.titleHeight;
                v = a.handleOverflow(v);
                v += w;
                m || (a.box = m = d.rect().addClass("highcharts-legend-box").attr({
                        r: x.borderRadius
                    }).add(k),
                    m.isNew = !0);
                m.attr({
                    stroke: x.borderColor,
                    "stroke-width": x.borderWidth || 0,
                    fill: x.backgroundColor || "none"
                }).shadow(x.shadow);
                0 < t && 0 < v && (m[m.isNew ? "attr" : "animate"](m.crisp({
                    x: 0,
                    y: 0,
                    width: t,
                    height: v
                }, m.strokeWidth())), m.isNew = !1);
                m[b ? "show" : "hide"]();
                a.legendWidth = t;
                a.legendHeight = v;
                f(n, function (b) {
                    a.positionItem(b)
                });
                b && k.align(h({
                    width: t,
                    height: v
                }, x), !0, "spacingBox");
                e.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function (a) {
                var c = this,
                    d = this.chart,
                    g = d.renderer,
                    h = this.options,
                    b = h.y,
                    b = d.spacingBox.height +
                    ("top" === h.verticalAlign ? -b : b) - this.padding,
                    k = h.maxHeight,
                    n, m = this.clipRect,
                    x = h.navigation,
                    w = v(x.animation, !0),
                    r = x.arrowSize || 12,
                    G = this.nav,
                    H = this.pages,
                    q = this.padding,
                    p, A = this.allItems,
                    B = function (a) {
                        m.attr({
                            height: a
                        });
                        c.contentGroup.div && (c.contentGroup.div.style.clip = "rect(" + q + "px,9999px," + (q + a) + "px,0)")
                    };
                "horizontal" === h.layout && (b /= 2);
                k && (b = Math.min(b, k));
                H.length = 0;
                a > b && !1 !== x.enabled ? (this.clipHeight = n = Math.max(b - 20 - this.titleHeight - q, 0), this.currentPage = v(this.currentPage, 1), this.fullHeight =
                    a, f(A, function (a, b) {
                        var c = a._legendItemPos[1];
                        a = Math.round(a.legendItem.getBBox().height);
                        var d = H.length;
                        if (!d || c - H[d - 1] > n && (p || c) !== H[d - 1]) H.push(p || c), d++;
                        b === A.length - 1 && c + a - H[d - 1] > n && H.push(c);
                        c !== p && (p = c)
                    }), m || (m = c.clipRect = g.clipRect(0, q, 9999, 0), c.contentGroup.clip(m)), B(n), G || (this.nav = G = g.g().attr({
                            zIndex: 1
                        }).add(this.group), this.up = g.symbol("triangle", 0, 0, r, r).on("click", function () {
                            c.scroll(-1, w)
                        }).add(G), this.pager = g.text("", 15, 10).addClass("highcharts-legend-navigation").css(x.style).add(G),
                        this.down = g.symbol("triangle-down", 0, 0, r, r).on("click", function () {
                            c.scroll(1, w)
                        }).add(G)), c.scroll(0), a = b) : G && (B(d.chartHeight), G.hide(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function (a, e) {
                var c = this.pages,
                    g = c.length;
                a = this.currentPage + a;
                var f = this.clipHeight,
                    b = this.options.navigation,
                    h = this.pager,
                    k = this.padding;
                a > g && (a = g);
                0 < a && (void 0 !== e && d(e, this.chart), this.nav.attr({
                        translateX: k,
                        translateY: f + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 ===
                            a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), h.attr({
                        text: a + "/" + g
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 === a ? b.inactiveColor : b.activeColor
                    }).css({
                        cursor: 1 === a ? "default" : "pointer"
                    }), this.down.attr({
                        fill: a === g ? b.inactiveColor : b.activeColor
                    }).css({
                        cursor: a === g ? "default" : "pointer"
                    }), e = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: e
                    }), this.currentPage =
                    a, this.positionCheckboxes(e))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, d) {
                var c = a.options,
                    e = c.symbolHeight || a.fontMetrics.f,
                    c = c.squareSymbol;
                d.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, c ? e : a.symbolWidth, e, v(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(d.legendGroup)
            },
            drawLineMarker: function (a) {
                var c = this.options,
                    d = c.marker,
                    g = a.symbolWidth,
                    f = this.chart.renderer,
                    b = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var h;
                h = {
                    "stroke-width": c.lineWidth || 0
                };
                c.dashStyle && (h.dashstyle = c.dashStyle);
                this.legendLine = f.path(["M", 0, a, "L", g, a]).addClass("highcharts-graph").attr(h).add(b);
                d && !1 !== d.enabled && (c = 0 === this.symbol.indexOf("url") ? 0 : d.radius, this.legendSymbol = d = f.symbol(this.symbol, g / 2 - c, a - c, 2 * c, 2 * c, d).addClass("highcharts-point").add(b), d.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(w.navigator.userAgent) || q) && B(D.prototype, "positionItem", function (a, d) {
            var c = this,
                e = function () {
                    d._legendItemPos && a.call(c, d)
                };
            e();
            setTimeout(e)
        })
    })(M);
    (function (a) {
        var D = a.addEvent,
            z = a.animate,
            F = a.animObject,
            J = a.attr,
            m = a.doc,
            f = a.Axis,
            h = a.createElement,
            q = a.defaultOptions,
            n = a.discardElement,
            k = a.charts,
            v = a.css,
            d = a.defined,
            g = a.each,
            w = a.error,
            B = a.extend,
            c = a.fireEvent,
            e = a.getStyle,
            l = a.grep,
            u = a.isNumber,
            L = a.isObject,
            b = a.isString,
            t = a.Legend,
            y = a.marginNames,
            K = a.merge,
            x = a.Pointer,
            I = a.pick,
            r = a.pInt,
            G = a.removeEvent,
            H = a.seriesTypes,
            N = a.splat,
            p = a.svg,
            A = a.syncTimeout,
            P = a.win,
            O = a.Renderer,
            C = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a,
            b, c) {
            return new C(a, b, c)
        };
        C.prototype = {
            callbacks: [],
            getArgs: function () {
                var a = [].slice.call(arguments);
                if (b(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function (b, c) {
                var d, e = b.series;
                b.series = null;
                d = K(q, b);
                d.series = b.series = e;
                this.userOptions = b;
                this.respRules = [];
                b = d.chart;
                e = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.callback = c;
                this.isResizing = 0;
                this.options = d;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var g;
                this.index = k.length;
                k.push(this);
                a.chartCount++;
                if (e)
                    for (g in e) D(this, g, e[g]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            },
            initSeries: function (a) {
                var b = this.options.chart;
                (b = H[a.type || b.type || b.defaultSeriesType]) || w(17, !0);
                b = new b;
                b.init(this, a);
                return b
            },
            isInsidePlot: function (a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function (b) {
                var d = this.axes,
                    e = this.series,
                    f = this.pointer,
                    r = this.legend,
                    h = this.isDirtyLegend,
                    l, p, k = this.hasCartesianSeries,
                    n = this.isDirtyBox,
                    H = e.length,
                    t = H,
                    u = this.renderer,
                    v = u.isHidden(),
                    G = [];
                a.setAnimation(b, this);
                v && this.cloneRenderTo();
                for (this.layOutTitles(); t--;)
                    if (b = e[t], b.options.stacking && (l = !0, b.isDirty)) {
                        p = !0;
                        break
                    }
                if (p)
                    for (t = H; t--;) b = e[t], b.options.stacking && (b.isDirty = !0);
                g(e, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), h = !0);
                    a.isDirtyData && c(a, "updatedData")
                });
                h && r.options.enabled && (r.render(), this.isDirtyLegend = !1);
                l && this.getStacks();
                k && g(d, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                k && (g(d, function (a) {
                    a.isDirty && (n = !0)
                }), g(d, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, G.push(function () {
                        c(a, "afterSetExtremes", B(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (n || l) && a.redraw()
                }));
                n && this.drawChartBox();
                g(e, function (a) {
                    (n || a.isDirty) && a.visible && a.redraw()
                });
                f && f.reset(!0);
                u.draw();
                c(this, "redraw");
                v && this.cloneRenderTo(!0);
                g(G, function (a) {
                    a.call()
                })
            },
            get: function (a) {
                var b = this.axes,
                    c = this.series,
                    d, e;
                for (d = 0; d < b.length; d++)
                    if (b[d].options.id === a) return b[d];
                for (d = 0; d < c.length; d++)
                    if (c[d].options.id === a) return c[d];
                for (d = 0; d < c.length; d++)
                    for (e = c[d].points || [], b = 0; b < e.length; b++)
                        if (e[b].id === a) return e[b];
                return null
            },
            getAxes: function () {
                var a = this,
                    b = this.options,
                    c = b.xAxis = N(b.xAxis || {}),
                    b = b.yAxis = N(b.yAxis || {});
                g(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                g(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                g(c, function (b) {
                    new f(a, b)
                })
            },
            getSelectedPoints: function () {
                var a = [];
                g(this.series, function (b) {
                    a = a.concat(l(b.points || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function () {
                return l(this.series, function (a) {
                    return a.selected
                })
            },
            setTitle: function (a, b, c) {
                var d = this,
                    e = d.options,
                    f;
                f = e.title = K(e.title, a);
                e = e.subtitle = K(e.subtitle, b);
                g([["title", a, f], ["subtitle", b, e]], function (a, b) {
                    var c = a[0],
                        e = d[c],
                        g = a[1];
                    a = a[2];
                    e && g && (d[c] = e = e.destroy());
                    a && a.text && !e && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function (a) {
                        d.setTitle(!b &&
                            a, b && a)
                    }, d[c].css(a.style))
                });
                d.layOutTitles(c)
            },
            layOutTitles: function (a) {
                var b = 0,
                    c, d = this.renderer,
                    e = this.spacingBox;
                g(["title", "subtitle"], function (a) {
                    var c = this[a],
                        g = this.options[a],
                        f;
                    c && (f = g.style.fontSize, f = d.fontMetrics(f, c).b, c.css({
                        width: (g.width || e.width + g.widthAdjust) + "px"
                    }).align(B({
                        y: b + f + ("title" === a ? -3 : 2)
                    }, g), !1, "spacingBox"), g.floating || g.verticalAlign || (b = Math.ceil(b + c.getBBox().height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered &&
                    I(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function () {
                var a = this.options.chart,
                    b = a.width,
                    a = a.height,
                    c = this.renderToClone || this.renderTo;
                d(b) || (this.containerWidth = e(c, "width"));
                d(a) || (this.containerHeight = e(c, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, I(a, 19 < this.containerHeight ? this.containerHeight : 400))
            },
            cloneRenderTo: function (a) {
                var b = this.renderToClone,
                    c = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;) this.renderTo.appendChild(b.firstChild);
                        n(b);
                        delete this.renderToClone
                    }
                } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), v(b, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), b.style.setProperty && b.style.setProperty("display", "block", "important"), m.body.appendChild(b), c && b.appendChild(c)
            },
            setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function () {
                var c, d = this.options,
                    e = d.chart,
                    g, f;
                c = this.renderTo;
                var l = "highcharts-" + a.idCounter++,
                    p;
                c || (this.renderTo = c = e.renderTo);
                b(c) && (this.renderTo = c = m.getElementById(c));
                c || w(13, !0);
                g = r(J(c, "data-highcharts-chart"));
                u(g) && k[g] && k[g].hasRendered && k[g].destroy();
                J(c, "data-highcharts-chart", this.index);
                c.innerHTML = "";
                e.skipClone || c.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                g = this.chartWidth;
                f = this.chartHeight;
                p = B({
                    position: "relative",
                    overflow: "hidden",
                    width: g + "px",
                    height: f + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, e.style);
                this.container = c = h("div", {
                    id: l
                }, p, this.renderToClone || c);
                this._cursor = c.style.cursor;
                this.renderer = new(a[e.renderer] || O)(c, g, f, null, e.forExport, d.exporting && d.exporting.allowHTML);
                this.setClassName(e.className);
                this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function (a) {
                var b = this.spacing,
                    c = this.margin,
                    e = this.titleOffset;
                this.resetMargins();
                e && !d(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(c,
                    b);
                this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            },
            getAxisMargins: function () {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && g(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                g(y, function (e, g) {
                    d(c[g]) || (a[e] += b[g])
                });
                a.setChartSize()
            },
            reflow: function (a) {
                var b = this,
                    c = b.options.chart,
                    g = b.renderTo,
                    f = d(c.width),
                    r = c.width || e(g, "width"),
                    c = c.height || e(g, "height"),
                    g = a ? a.target : P;
                if (!f &&
                    !b.isPrinting && r && c && (g === P || g === m)) {
                    if (r !== b.containerWidth || c !== b.containerHeight) clearTimeout(b.reflowTimeout), b.reflowTimeout = A(function () {
                        b.container && b.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    b.containerWidth = r;
                    b.containerHeight = c
                }
            },
            initReflow: function () {
                var a = this,
                    b = function (b) {
                        a.reflow(b)
                    };
                D(P, "resize", b);
                D(a, "destroy", function () {
                    G(P, "resize", b)
                })
            },
            setSize: function (b, d, e) {
                var f = this,
                    r = f.renderer;
                f.isResizing += 1;
                a.setAnimation(e, f);
                f.oldChartHeight = f.chartHeight;
                f.oldChartWidth = f.chartWidth;
                void 0 !==
                    b && (f.options.chart.width = b);
                void 0 !== d && (f.options.chart.height = d);
                f.getChartSize();
                b = r.globalAnimation;
                (b ? z : v)(f.container, {
                    width: f.chartWidth + "px",
                    height: f.chartHeight + "px"
                }, b);
                f.setChartSize(!0);
                r.setSize(f.chartWidth, f.chartHeight, e);
                g(f.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                f.isDirtyLegend = !0;
                f.isDirtyBox = !0;
                f.layOutTitles();
                f.getMargins();
                f.setResponsive && f.setResponsive(!1);
                f.redraw(e);
                f.oldChartHeight = null;
                c(f, "resize");
                A(function () {
                        f && c(f, "endResize", null, function () {
                            --f.isResizing
                        })
                    },
                    F(b).duration)
            },
            setChartSize: function (a) {
                var b = this.inverted,
                    c = this.renderer,
                    d = this.chartWidth,
                    e = this.chartHeight,
                    f = this.options.chart,
                    r = this.spacing,
                    h = this.clipOffset,
                    l, p, k, n;
                this.plotLeft = l = Math.round(this.plotLeft);
                this.plotTop = p = Math.round(this.plotTop);
                this.plotWidth = k = Math.max(0, Math.round(d - l - this.marginRight));
                this.plotHeight = n = Math.max(0, Math.round(e - p - this.marginBottom));
                this.plotSizeX = b ? n : k;
                this.plotSizeY = b ? k : n;
                this.plotBorderWidth = f.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: r[3],
                    y: r[0],
                    width: d - r[3] - r[1],
                    height: e - r[0] - r[2]
                };
                this.plotBox = c.plotBox = {
                    x: l,
                    y: p,
                    width: k,
                    height: n
                };
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d, h[3]) / 2);
                c = Math.ceil(Math.max(d, h[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(d, h[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, h[2]) / 2 - c))
                };
                a || g(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function () {
                var a = this,
                    b = a.options.chart;
                g(["margin", "spacing"], function (c) {
                    var d =
                        b[c],
                        e = L(d) ? d : [d, d, d, d];
                    g(["Top", "Right", "Bottom", "Left"], function (d, g) {
                        a[c][g] = I(b[c + d], e[g])
                    })
                });
                g(y, function (b, c) {
                    a[b] = I(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function () {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    d = this.chartHeight,
                    e = this.chartBackground,
                    g = this.plotBackground,
                    f = this.plotBorder,
                    r, h = this.plotBGImage,
                    l = a.backgroundColor,
                    p = a.plotBackgroundColor,
                    k = a.plotBackgroundImage,
                    n, t = this.plotLeft,
                    H = this.plotTop,
                    u = this.plotWidth,
                    v = this.plotHeight,
                    G = this.plotBox,
                    m = this.clipRect,
                    x = this.clipBox,
                    y = "animate";
                e || (this.chartBackground = e = b.rect().addClass("highcharts-background").add(), y = "attr");
                r = a.borderWidth || 0;
                n = r + (a.shadow ? 8 : 0);
                l = {
                    fill: l || "none"
                };
                if (r || e["stroke-width"]) l.stroke = a.borderColor, l["stroke-width"] = r;
                e.attr(l).shadow(a.shadow);
                e[y]({
                    x: n / 2,
                    y: n / 2,
                    width: c - n - r % 2,
                    height: d - n - r % 2,
                    r: a.borderRadius
                });
                y = "animate";
                g || (y = "attr", this.plotBackground = g = b.rect().addClass("highcharts-plot-background").add());
                g[y](G);
                g.attr({
                    fill: p ||
                        "none"
                }).shadow(a.plotShadow);
                k && (h ? h.animate(G) : this.plotBGImage = b.image(k, t, H, u, v).add());
                m ? m.animate({
                    width: x.width,
                    height: x.height
                }) : this.clipRect = b.clipRect(x);
                y = "animate";
                f || (y = "attr", this.plotBorder = f = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                f.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                f[y](f.crisp({
                    x: t,
                    y: H,
                    width: u,
                    height: v
                }, -f.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function () {
                var a = this,
                    b = a.options.chart,
                    c, d = a.options.series,
                    e, f;
                g(["inverted", "angular", "polar"], function (g) {
                    c = H[b.type || b.defaultSeriesType];
                    f = b[g] || c && c.prototype[g];
                    for (e = d && d.length; !f && e--;)(c = H[d[e].type]) && c.prototype[g] && (f = !0);
                    a[g] = f
                })
            },
            linkSeries: function () {
                var a = this,
                    c = a.series;
                g(c, function (a) {
                    a.linkedSeries.length = 0
                });
                g(c, function (c) {
                    var d = c.options.linkedTo;
                    b(d) && (d = ":previous" === d ? a.series[c.index - 1] : a.get(d)) && d.linkedParent !== c && (d.linkedSeries.push(c), c.linkedParent = d, c.visible = I(c.options.visible, d.options.visible, c.visible))
                })
            },
            renderSeries: function () {
                g(this.series,
                    function (a) {
                        a.translate();
                        a.render()
                    })
            },
            renderLabels: function () {
                var a = this,
                    b = a.options.labels;
                b.items && g(b.items, function (c) {
                    var d = B(b.style, c.style),
                        e = r(d.left) + a.plotLeft,
                        g = r(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(c.html, e, g).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            },
            render: function () {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    d, e, f;
                this.setTitle();
                this.legend = new t(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight -=
                    21;
                g(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                e = 1.1 < c / this.plotWidth;
                f = 1.05 < d / this.plotHeight;
                if (e || f) g(a, function (a) {
                    (a.horiz && e || !a.horiz && f) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && g(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function (a) {
                var b =
                    this;
                a = K(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (P.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function () {
                var b = this,
                    d = b.axes,
                    e = b.series,
                    f = b.container,
                    r, h = f && f.parentNode;
                c(b, "destroy");
                k[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                G(b);
                for (r = d.length; r--;) d[r] = d[r].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (r = e.length; r--;) e[r] = e[r].destroy();
                g("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                f && (f.innerHTML = "", G(f), h && n(f));
                for (r in b) delete b[r]
            },
            isReadyToRender: function () {
                var a =
                    this;
                return p || P != P.top || "complete" === m.readyState ? !0 : (m.attachEvent("onreadystatechange", function () {
                    m.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === m.readyState && a.firstRender()
                }), !1)
            },
            firstRender: function () {
                var a = this,
                    b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    c(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    g(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    c(a, "beforeRender");
                    x && (a.pointer = new x(a, b));
                    a.render();
                    a.renderer.draw();
                    if (!a.renderer.imgCount &&
                        a.onload) a.onload();
                    a.cloneRenderTo(!0)
                }
            },
            onload: function () {
                g([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                c(this, "load");
                !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        }
    })(M);
    (function (a) {
        var D, z = a.each,
            F = a.extend,
            J = a.erase,
            m = a.fireEvent,
            f = a.format,
            h = a.isArray,
            q = a.isNumber,
            n = a.pick,
            k = a.removeEvent;
        D = a.Point = function () {};
        D.prototype = {
            init: function (a, d, g) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(d, g);
                a.options.colorByPoint ?
                    (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter], d = d.length, g = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : g = a.colorIndex;
                this.colorIndex = n(this.colorIndex, g);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function (a, d) {
                var g = this.series,
                    f = g.options.pointValKey || g.pointValKey;
                a = D.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                f && (this.y = this[f]);
                this.isNull = n(this.isValid &&
                    !this.isValid(), null === this.x || !q(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === d && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));
                void 0 === this.x && g && (this.x = void 0 === d ? g.autoIncrement(this) : d);
                return this
            },
            optionsToObject: function (a) {
                var d = {},
                    g = this.series,
                    f = g.options.keys,
                    k = f || g.pointArrayMap || ["y"],
                    c = k.length,
                    e = 0,
                    l = 0;
                if (q(a) || null === a) d[k[0]] = a;
                else if (h(a))
                    for (!f && a.length > c && (g = typeof a[0], "string" === g ? d.name = a[0] : "number" === g && (d.x = a[0]), e++); l < c;) f && void 0 ===
                        a[e] || (d[k[l]] = a[e]), e++, l++;
                else "object" === typeof a && (d = a, a.dataLabels && (g._hasPointLabels = !0), a.marker && (g._hasPointMarkers = !0));
                return d
            },
            getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "")
            },
            getZone: function () {
                var a = this.series,
                    d = a.zones,
                    a = a.zoneAxis ||
                    "y",
                    g = 0,
                    f;
                for (f = d[g]; this[a] >= f.value;) f = d[++g];
                f && f.color && !this.options.color && (this.color = f.color);
                return f
            },
            destroy: function () {
                var a = this.series.chart,
                    d = a.hoverPoints,
                    g;
                a.pointCount--;
                d && (this.setState(), J(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) k(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (g in this) this[g] = null
            },
            destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper",
"connector", "shadowGroup"], d, g = 6; g--;) d = a[g], this[d] && (this[d] = this[d].destroy())
            },
            getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function (a) {
                var d = this.series,
                    g = d.tooltipOptions,
                    h = n(g.valueDecimals, ""),
                    k = g.valuePrefix || "",
                    c = g.valueSuffix || "";
                z(d.pointArrayMap || ["y"], function (d) {
                    d = "{point." + d;
                    if (k || c) a = a.replace(d + "}", k + d + "}" + c);
                    a = a.replace(d +
                        "}", d + ":,." + h + "f}")
                });
                return f(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function (a, d, g) {
                var f = this,
                    h = this.series.options;
                (h.point.events[a] || f.options && f.options.events && f.options.events[a]) && this.importEvents();
                "click" === a && h.allowPointSelect && (g = function (a) {
                    f.select && f.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                m(this, a, d, g)
            },
            visible: !0
        }
    })(M);
    (function (a) {
        var D = a.addEvent,
            z = a.animObject,
            F = a.arrayMax,
            J = a.arrayMin,
            m = a.correctFloat,
            f = a.Date,
            h = a.defaultOptions,
            q = a.defaultPlotOptions,
            n = a.defined,
            k = a.each,
            v = a.erase,
            d = a.error,
            g = a.extend,
            w = a.fireEvent,
            B = a.grep,
            c = a.isArray,
            e = a.isNumber,
            l = a.isString,
            u = a.merge,
            L = a.pick,
            b = a.removeEvent,
            t = a.splat,
            y = a.stableSort,
            K = a.SVGElement,
            x = a.syncTimeout,
            I = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                radius: 4,
                states: {
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var c = this,
                    d, e, f = a.series,
                    r = function (a, b) {
                        return L(a.options.index, a._i) - L(b.options.index, b._i)
                    };
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                g(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                e = b.events;
                for (d in e) D(c, d, e[d]);
                if (e && e.click || b.point && b.point.events && b.point.events.click ||
                    b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                k(c.parallelArrays, function (a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                f.push(c);
                c._i = f.length - 1;
                y(f, r);
                this.yAxis && y(this.yAxis.series, r);
                k(f, function (a, b) {
                    a.index = b;
                    a.name = a.name || "Series " + (b + 1)
                })
            },
            bindAxes: function () {
                var a = this,
                    b = a.options,
                    c = a.chart,
                    e;
                k(a.axisTypes || [], function (g) {
                    k(c[g], function (c) {
                        e = c.options;
                        if (b[g] === e.index || void 0 !== b[g] && b[g] === e.id || void 0 === b[g] && 0 === e.index) c.series.push(a),
                            a[g] = c, c.isDirty = !0
                    });
                    a[g] || a.optionalAxis === g || d(18, !0)
                })
            },
            updateParallelArrays: function (a, b) {
                var c = a.series,
                    d = arguments,
                    g = e(b) ? function (d) {
                        var e = "y" === d && c.toYData ? c.toYData(a) : a[d];
                        c[d + "Data"][b] = e
                    } : function (a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                k(c.parallelArrays, g)
            },
            autoIncrement: function () {
                var a = this.options,
                    b = this.xIncrement,
                    c, d = a.pointIntervalUnit,
                    b = L(b, a.pointStart, 0);
                this.pointInterval = c = L(this.pointInterval, a.pointInterval, 1);
                d && (a = new f(b), "day" === d ?
                    a = +a[f.hcSetDate](a[f.hcGetDate]() + c) : "month" === d ? a = +a[f.hcSetMonth](a[f.hcGetMonth]() + c) : "year" === d && (a = +a[f.hcSetFullYear](a[f.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var b = this.chart,
                    c = b.options.plotOptions,
                    b = b.userOptions || {},
                    d = b.plotOptions || {},
                    e = c[this.type];
                this.userOptions = a;
                c = u(e, c.series, a);
                this.tooltipOptions = u(h.tooltip, h.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
                null === e.marker &&
                    delete c.marker;
                this.zoneAxis = c.zoneAxis;
                a = this.zones = (c.zones || []).slice();
                !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                    value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                    className: "highcharts-negative",
                    color: c.negativeColor,
                    fillColor: c.negativeFillColor
                });
                a.length && n(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return c
            },
            getCyclic: function (a, b, c) {
                var d, e = this.userOptions,
                    g = a + "Index",
                    f = a + "Counter",
                    h = c ? c.length : L(this.chart.options.chart[a + "Count"], this.chart[a +
                        "Count"]);
                b || (d = L(e[g], e["_" + g]), n(d) || (e["_" + g] = d = this.chart[f] % h, this.chart[f] += 1), c && (b = c[d]));
                void 0 !== d && (this[g] = d);
                this[a] = b
            },
            getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || q[this.type].color, this.chart.options.colors)
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function (a, b, g, f) {
                var h = this,
                    r = h.points,
                    n = r && r.length ||
                    0,
                    t, u = h.options,
                    x = h.chart,
                    m = null,
                    y = h.xAxis,
                    G = u.turboThreshold,
                    q = this.xData,
                    w = this.yData,
                    v = (t = h.pointArrayMap) && t.length;
                a = a || [];
                t = a.length;
                b = L(b, !0);
                if (!1 !== f && t && n === t && !h.cropped && !h.hasGroupedData && h.visible) k(a, function (a, b) {
                    r[b].update && a !== u.data[b] && r[b].update(a, !1, null, !1)
                });
                else {
                    h.xIncrement = null;
                    h.colorCounter = 0;
                    k(this.parallelArrays, function (a) {
                        h[a + "Data"].length = 0
                    });
                    if (G && t > G) {
                        for (g = 0; null === m && g < t;) m = a[g], g++;
                        if (e(m))
                            for (g = 0; g < t; g++) q[g] = this.autoIncrement(), w[g] = a[g];
                        else if (c(m))
                            if (v)
                                for (g =
                                    0; g < t; g++) m = a[g], q[g] = m[0], w[g] = m.slice(1, v + 1);
                            else
                                for (g = 0; g < t; g++) m = a[g], q[g] = m[0], w[g] = m[1];
                        else d(12)
                    } else
                        for (g = 0; g < t; g++) void 0 !== a[g] && (m = {
                            series: h
                        }, h.pointClass.prototype.applyOptions.apply(m, [a[g]]), h.updateParallelArrays(m, g));
                    l(w[0]) && d(14, !0);
                    h.data = [];
                    h.options.data = h.userOptions.data = a;
                    for (g = n; g--;) r[g] && r[g].destroy && r[g].destroy();
                    y && (y.minRange = y.userMinRange);
                    h.isDirty = x.isDirtyBox = !0;
                    h.isDirtyData = !!r;
                    g = !1
                }
                "point" === u.legendType && (this.processData(), this.generatePoints());
                b && x.redraw(g)
            },
            processData: function (a) {
                var b = this.xData,
                    c = this.yData,
                    e = b.length,
                    g;
                g = 0;
                var f, h, l = this.xAxis,
                    k, r = this.options;
                k = r.cropThreshold;
                var n = this.getExtremesFromAll || r.getExtremesFromAll,
                    t = this.isCartesian,
                    r = l && l.val2lin,
                    u = l && l.isLog,
                    m, x;
                if (t && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !a) return !1;
                l && (a = l.getExtremes(), m = a.min, x = a.max);
                if (t && this.sorted && !n && (!k || e > k || this.forceCrop))
                    if (b[e - 1] < m || b[0] > x) b = [], c = [];
                    else if (b[0] < m || b[e - 1] > x) g = this.cropData(this.xData, this.yData, m, x), b = g.xData, c = g.yData,
                    g = g.start, f = !0;
                for (k = b.length || 1; --k;) e = u ? r(b[k]) - r(b[k - 1]) : b[k] - b[k - 1], 0 < e && (void 0 === h || e < h) ? h = e : 0 > e && this.requireSorting && d(15);
                this.cropped = f;
                this.cropStart = g;
                this.processedXData = b;
                this.processedYData = c;
                this.closestPointRange = h
            },
            cropData: function (a, b, c, d) {
                var e = a.length,
                    g = 0,
                    f = e,
                    h = L(this.cropShoulder, 1),
                    l;
                for (l = 0; l < e; l++)
                    if (a[l] >= c) {
                        g = Math.max(0, l - h);
                        break
                    }
                for (c = l; c < e; c++)
                    if (a[c] > d) {
                        f = c + h;
                        break
                    }
                return {
                    xData: a.slice(g, f),
                    yData: b.slice(g, f),
                    start: g,
                    end: f
                }
            },
            generatePoints: function () {
                var a = this.options.data,
                    b = this.data,
                    c, d = this.processedXData,
                    e = this.processedYData,
                    g = this.pointClass,
                    f = d.length,
                    h = this.cropStart || 0,
                    l, k = this.hasGroupedData,
                    n, u = [],
                    m;
                b || k || (b = [], b.length = a.length, b = this.data = b);
                for (m = 0; m < f; m++) l = h + m, k ? (u[m] = (new g).init(this, [d[m]].concat(t(e[m]))), u[m].dataGroup = this.groupMap[m]) : (b[l] ? n = b[l] : void 0 !== a[l] && (b[l] = n = (new g).init(this, a[l], d[m])), u[m] = n), u[m].index = l;
                if (b && (f !== (c = b.length) || k))
                    for (m = 0; m < c; m++) m !== h || k || (m += f), b[m] && (b[m].destroyElements(), b[m].plotX = void 0);
                this.data = b;
                this.points =
                    u
            },
            getExtremes: function (a) {
                var b = this.yAxis,
                    d = this.processedXData,
                    g, f = [],
                    h = 0;
                g = this.xAxis.getExtremes();
                var l = g.min,
                    k = g.max,
                    r, n, t, m;
                a = a || this.stackedYData || this.processedYData || [];
                g = a.length;
                for (m = 0; m < g; m++)
                    if (n = d[m], t = a[m], r = (e(t, !0) || c(t)) && (!b.isLog || t.length || 0 < t), n = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[m + 1] || n) >= l && (d[m - 1] || n) <= k, r && n)
                        if (r = t.length)
                            for (; r--;) null !== t[r] && (f[h++] = t[r]);
                        else f[h++] = t;
                this.dataMin = J(f);
                this.dataMax = F(f)
            },
            translate: function () {
                this.processedXData ||
                    this.processData();
                this.generatePoints();
                for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, g = this.yAxis, f = this.points, h = f.length, l = !!this.modifyValue, k = a.pointPlacement, t = "between" === k || e(k), u = a.threshold, x = a.startFromThreshold ? u : 0, y, q, w, v, K = Number.MAX_VALUE, a = 0; a < h; a++) {
                    var I = f[a],
                        B = I.x,
                        z = I.y;
                    q = I.low;
                    var D = b && g.stacks[(this.negStacks && z < (x ? 0 : u) ? "-" : "") + this.stackKey],
                        F;
                    g.isLog && null !== z && 0 >= z && (I.isNull = !0);
                    I.plotX = y = m(Math.min(Math.max(-1E5, c.translate(B, 0, 0, 0, 1, k, "flags" === this.type)),
                        1E5));
                    b && this.visible && !I.isNull && D && D[B] && (v = this.getStackIndicator(v, B, this.index), F = D[B], z = F.points[v.key], q = z[0], z = z[1], q === x && v.key === D[B].base && (q = L(u, g.min)), g.isLog && 0 >= q && (q = null), I.total = I.stackTotal = F.total, I.percentage = F.total && I.y / F.total * 100, I.stackY = z, F.setOffset(this.pointXOffset || 0, this.barW || 0));
                    I.yBottom = n(q) ? g.translate(q, 0, 1, 0, 1) : null;
                    l && (z = this.modifyValue(z, I));
                    I.plotY = q = "number" === typeof z && Infinity !== z ? Math.min(Math.max(-1E5, g.translate(z, 0, 1, 0, 1)), 1E5) : void 0;
                    I.isInside =
                        void 0 !== q && 0 <= q && q <= g.len && 0 <= y && y <= c.len;
                    I.clientX = t ? m(c.translate(B, 0, 0, 0, 1, k)) : y;
                    I.negative = I.y < (u || 0);
                    I.category = d && void 0 !== d[I.x] ? d[I.x] : I.x;
                    I.isNull || (void 0 !== w && (K = Math.min(K, Math.abs(y - w))), w = y)
                }
                this.closestPointRangePx = K
            },
            getValidPoints: function (a, b) {
                var c = this.chart;
                return B(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    e = b.inverted,
                    g = this.clipBox,
                    f = g || b.clipBox,
                    h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, f.height, c.xAxis, c.yAxis].join(),
                    l = b[h],
                    k = b[h + "m"];
                l || (a && (f.width = 0, b[h + "m"] = k = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[h] = l = d.clipRect(f), l.count = {
                    length: 0
                });
                a && !l.count[this.index] && (l.count[this.index] = !0, l.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || g ? l : b.clipRect), this.markerGroup.clip(k), this.sharedClipKey = h);
                a || (l.count[this.index] && (delete l.count[this.index], --l.count.length), 0 === l.count.length && h && b[h] && (g ||
                    (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart,
                    c = z(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99
                }, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                w(this, "afterAnimate")
            },
            drawPoints: function () {
                var a = this.points,
                    b = this.chart,
                    c, d, g, f, h = this.options.marker,
                    l, k, n, t, m = this.markerGroup,
                    u = L(h.enabled, this.xAxis.isRadial ? !0 : null,
                        this.closestPointRangePx > 2 * h.radius);
                if (!1 !== h.enabled || this._hasPointMarkers)
                    for (d = a.length; d--;) g = a[d], c = g.plotY, f = g.graphic, l = g.marker || {}, k = !!g.marker, n = u && void 0 === l.enabled || l.enabled, t = g.isInside, n && e(c) && null !== g.y ? (c = L(l.symbol, this.symbol), g.hasImage = 0 === c.indexOf("url"), n = this.markerAttribs(g, g.selected && "select"), f ? f[t ? "show" : "hide"](!0).animate(n) : t && (0 < n.width || g.hasImage) && (g.graphic = f = b.renderer.symbol(c, n.x, n.y, n.width, n.height, k ? l : h).add(m)), f && f.attr(this.pointAttribs(g, g.selected &&
                        "select")), f && f.addClass(g.getClassName(), !0)) : f && (g.graphic = f.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    e = d && d.marker || {},
                    d = L(e.radius, c.radius);
                b && (c = c.states[b], b = e.states && e.states[b], d = L(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));
                a.hasImage && (d = 0);
                a = {
                    x: Math.floor(a.plotX) - d,
                    y: a.plotY - d
                };
                d && (a.width = a.height = 2 * d);
                return a
            },
            pointAttribs: function (a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    e = d && d.marker || {},
                    g = c.lineWidth,
                    f = this.color,
                    d = d && d.color,
                    h =
                    a && a.color,
                    l;
                a && this.zones.length && (a = a.getZone()) && a.color && (l = a.color);
                f = d || l || h || f;
                l = e.fillColor || c.fillColor || f;
                f = e.lineColor || c.lineColor || f;
                b && (c = c.states[b], b = e.states && e.states[b] || {}, g = c.lineWidth || g + c.lineWidthPlus, l = b.fillColor || c.fillColor || l, f = b.lineColor || c.lineColor || f);
                return {
                    stroke: f,
                    "stroke-width": g,
                    fill: l
                }
            },
            destroy: function () {
                var a = this,
                    c = a.chart,
                    d = /AppleWebKit\/533/.test(I.navigator.userAgent),
                    e, g = a.data || [],
                    f, h, l;
                w(a, "destroy");
                b(a);
                k(a.axisTypes || [], function (b) {
                    (l = a[b]) && l.series &&
                        (v(l.series, a), l.isDirty = l.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (e = g.length; e--;)(f = g[e]) && f.destroy && f.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (h in a) a[h] instanceof K && !a[h].survive && (e = d && "group" === h ? "hide" : "destroy", a[h][e]());
                c.hoverSeries === a && (c.hoverSeries = null);
                v(c.series, a);
                for (h in a) delete a[h]
            },
            getGraphPath: function (a, b, c) {
                var d = this,
                    e = d.options,
                    g = e.step,
                    f, h = [],
                    l = [],
                    r;
                a = a || d.points;
                (f = a.reversed) && a.reverse();
                (g = {
                        right: 1,
                        center: 2
                    }[g] || g &&
                    3) && f && (g = 4 - g);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                k(a, function (f, k) {
                    var t = f.plotX,
                        p = f.plotY,
                        m = a[k - 1];
                    (f.leftCliff || m && m.rightCliff) && !c && (r = !0);
                    f.isNull && !n(b) && 0 < k ? r = !e.connectNulls : f.isNull && !b ? r = !0 : (0 === k || r ? k = ["M", f.plotX, f.plotY] : d.getPointSpline ? k = d.getPointSpline(a, f, k) : g ? (k = 1 === g ? ["L", m.plotX, p] : 2 === g ? ["L", (m.plotX + t) / 2, m.plotY, "L", (m.plotX + t) / 2, p] : ["L", t, m.plotY], k.push("L", t, p)) : k = ["L", t, p], l.push(f.x), g && l.push(f.x), h.push.apply(h, k), r = !1)
                });
                h.xMap = l;
                return d.graphPath = h
            },
            drawGraph: function () {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    d = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];
                k(this.zones, function (c, e) {
                    d.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
                });
                k(d, function (d, e) {
                    var g = d[0],
                        f = a[g];
                    f ? (f.endX = c.xMap, f.animate({
                        d: c
                    })) : c.length && (a[g] = a.chart.renderer.path(c).addClass(d[1]).attr({
                        zIndex: 1
                    }).add(a.group), f = {
                        stroke: d[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, d[3] ? f.dashstyle = d[3] : "square" !== b.linecap && (f["stroke-linecap"] = f["stroke-linejoin"] = "round"), f = a[g].attr(f).shadow(2 > e && b.shadow));
                    f && (f.startX = c.xMap, f.isArea = c.isArea)
                })
            },
            applyZones: function () {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    d = this.zones,
                    e, g, f = this.clips || [],
                    h, l = this.graph,
                    n = this.area,
                    t = Math.max(b.chartWidth, b.chartHeight),
                    m = this[(this.zoneAxis || "y") + "Axis"],
                    u, x, y = b.inverted,
                    q, w, v, K, I = !1;
                d.length && (l || n) && m && void 0 !== m.min && (x =
                    m.reversed, q = m.horiz, l && l.hide(), n && n.hide(), u = m.getExtremes(), k(d, function (d, k) {
                        e = x ? q ? b.plotWidth : 0 : q ? 0 : m.toPixels(u.min);
                        e = Math.min(Math.max(L(g, e), 0), t);
                        g = Math.min(Math.max(Math.round(m.toPixels(L(d.value, u.max), !0)), 0), t);
                        I && (e = g = m.toPixels(u.max));
                        w = Math.abs(e - g);
                        v = Math.min(e, g);
                        K = Math.max(e, g);
                        m.isXAxis ? (h = {
                            x: y ? K : v,
                            y: 0,
                            width: w,
                            height: t
                        }, q || (h.x = b.plotHeight - h.x)) : (h = {
                            x: 0,
                            y: y ? K : v,
                            width: t,
                            height: w
                        }, q && (h.y = b.plotWidth - h.y));
                        y && c.isVML && (h = m.isXAxis ? {
                            x: 0,
                            y: x ? v : K,
                            height: h.width,
                            width: b.chartWidth
                        } : {
                            x: h.y - b.plotLeft - b.spacingBox.x,
                            y: 0,
                            width: h.height,
                            height: b.chartHeight
                        });
                        f[k] ? f[k].animate(h) : (f[k] = c.clipRect(h), l && a["zone-graph-" + k].clip(f[k]), n && a["zone-area-" + k].clip(f[k]));
                        I = d.value > u.max
                    }), this.clips = f)
            },
            invertGroups: function (a) {
                function c() {
                    var b = {
                        width: d.yAxis.len,
                        height: d.xAxis.len
                    };
                    k(["group", "markerGroup"], function (c) {
                        d[c] && d[c].attr(b).invert(a)
                    })
                }
                var d = this,
                    e = d.chart;
                d.xAxis && (D(e, "resize", c), D(d, "destroy", function () {
                    b(e, "resize", c)
                }), c(a), d.invertGroups = c)
            },
            plotGroup: function (a,
                b, c, d, e) {
                var g = this[a],
                    f = !g;
                f && (this[a] = g = this.chart.renderer.g(b).attr({
                    zIndex: d || .1
                }).add(e), g.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                g.attr({
                    visibility: c
                })[f ? "attr" : "animate"](this.getPlotBox());
                return g
            },
            getPlotBox: function () {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function () {
                var a =
                    this,
                    b = a.chart,
                    c, d = a.options,
                    e = !!a.animate && b.renderer.isSVG && z(d.animation).duration,
                    g = a.visible ? "inherit" : "hidden",
                    f = d.zIndex,
                    h = a.hasRendered,
                    l = b.seriesGroup,
                    k = b.inverted;
                c = a.plotGroup("group", "series", g, f, l);
                a.markerGroup = a.plotGroup("markerGroup", "markers", g, f, l);
                e && a.animate(!0);
                c.inverted = a.isCartesian ? k : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(k);
                !1 === d.clip || a.sharedClipKey || h || c.clip(b.clipRect);
                e && a.animate();
                h || (a.animationTimeout = x(function () {
                    a.afterAnimate()
                }, e));
                a.isDirty = a.isDirtyData = !1;
                a.hasRendered = !0
            },
            redraw: function () {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    e = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: L(d && d.left, a.plotLeft),
                    translateY: L(e && e.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX",
"plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, d, e) {
                    var g, f;
                    if (f = c && c.length) return g = b.kdAxisArray[d % e], c.sort(function (a, b) {
                        return a[g] - b[g]
                    }), f = Math.floor(f / 2), {
                        point: c[f],
                        left: a(c.slice(0, f), d + 1, e),
                        right: a(c.slice(f + 1), d + 1, e)
                    }
                }
                var b = this,
                    c = b.kdDimensions;
                delete b.kdTree;
                x(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c)
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, h, l) {
                    var k = b.point,
                        t = d.kdAxisArray[h % l],
                        m, u, r = k;
                    u = n(a[e]) && n(k[e]) ? Math.pow(a[e] - k[e], 2) : null;
                    m = n(a[g]) && n(k[g]) ? Math.pow(a[g] - k[g], 2) : null;
                    m = (u || 0) + (m || 0);
                    k.dist = n(m) ? Math.sqrt(m) : Number.MAX_VALUE;
                    k.distX = n(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                    t = a[t] - k[t];
                    m = 0 > t ? "left" : "right";
                    u = 0 > t ? "right" : "left";
                    b[m] && (m = c(a, b[m], h + 1, l), r = m[f] < r[f] ? m : k);
                    b[u] && Math.sqrt(t * t) < r[f] && (a = c(a, b[u], h + 1, l), r = a[f] < r[f] ? a : r);
                    return r
                }
                var d =
                    this,
                    e = this.kdAxisArray[0],
                    g = this.kdAxisArray[1],
                    f = b ? "distX" : "dist";
                this.kdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, this.kdDimensions, this.kdDimensions)
            }
        })
    })(M);
    (function (a) {
        function D(a, f, d, g, h) {
            var k = a.chart.inverted;
            this.axis = a;
            this.isNegative = d;
            this.options = f;
            this.x = g;
            this.total = null;
            this.points = {};
            this.stack = h;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: f.align || (k ? d ? "left" : "right" : "center"),
                verticalAlign: f.verticalAlign || (k ? "middle" : d ? "bottom" : "top"),
                y: n(f.y,
                    k ? 4 : d ? 14 : -6),
                x: n(f.x, k ? d ? -6 : 6 : 0)
            };
            this.textAlign = f.textAlign || (k ? d ? "right" : "left" : "center")
        }
        var z = a.Axis,
            F = a.Chart,
            J = a.correctFloat,
            m = a.defined,
            f = a.destroyObjectProperties,
            h = a.each,
            q = a.format,
            n = a.pick;
        a = a.Series;
        D.prototype = {
            destroy: function () {
                f(this, this.axis)
            },
            render: function (a) {
                var f = this.options,
                    d = f.format,
                    d = d ? q(d, this) : f.formatter.call(this);
                this.label ? this.label.attr({
                    text: d,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(d, null, null, f.useHTML).css(f.style).attr({
                    align: this.textAlign,
                    rotation: f.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function (a, f) {
                var d = this.axis,
                    g = d.chart,
                    h = g.inverted,
                    k = d.reversed,
                    k = this.isNegative && !k || !this.isNegative && k,
                    c = d.translate(d.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    d = d.translate(0),
                    d = Math.abs(c - d);
                a = g.xAxis[0].translate(this.x) + a;
                var e = g.plotHeight,
                    h = {
                        x: h ? k ? c : c - d : a,
                        y: h ? e - a - f : k ? e - c - d : e - c,
                        width: h ? d : f,
                        height: h ? f : d
                    };
                if (f = this.label) f.align(this.alignOptions, null, h), h = f.alignAttr, f[!1 === this.options.crop || g.isInsidePlot(h.x, h.y) ? "show" : "hide"](!0)
            }
        };
        F.prototype.getStacks = function () {
            var a = this;
            h(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            h(a.series, function (f) {
                !f.options.stacking || !0 !== f.visible && !1 !== a.options.chart.ignoreHiddenSeries || (f.stackKey = f.type + n(f.options.stack, ""))
            })
        };
        z.prototype.buildStacks = function () {
            var a = this.series,
                f, d = n(this.options.reversedStacks, !0),
                g = a.length,
                h;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (h = g; h--;) a[d ? h : g - h - 1].setStackedPoints();
                for (h = g; h--;) f = a[d ? h : g - h - 1], f.setStackCliffs &&
                    f.setStackCliffs();
                if (this.usePercentage)
                    for (h = 0; h < g; h++) a[h].setPercentStacks()
            }
        };
        z.prototype.renderStackTotals = function () {
            var a = this.chart,
                f = a.renderer,
                d = this.stacks,
                g, h, n = this.stackTotalGroup;
            n || (this.stackTotalGroup = n = f.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            n.translate(a.plotLeft, a.plotTop);
            for (g in d)
                for (h in a = d[g], a) a[h].render(n)
        };
        z.prototype.resetStacks = function () {
            var a = this.stacks,
                f, d;
            if (!this.isXAxis)
                for (f in a)
                    for (d in a[f]) a[f][d].touched < this.stacksTouched ? (a[f][d].destroy(),
                        delete a[f][d]) : (a[f][d].total = null, a[f][d].cum = 0)
        };
        z.prototype.cleanStacks = function () {
            var a, f, d;
            if (!this.isXAxis)
                for (f in this.oldStacks && (a = this.stacks = this.oldStacks), a)
                    for (d in a[f]) a[f][d].cum = a[f][d].total
        };
        a.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var a = this.processedXData,
                    f = this.processedYData,
                    d = [],
                    g = f.length,
                    h = this.options,
                    q = h.threshold,
                    c = h.startFromThreshold ? q : 0,
                    e = h.stack,
                    h = h.stacking,
                    l = this.stackKey,
                    u = "-" + l,
                    z = this.negStacks,
                    b = this.yAxis,
                    t = b.stacks,
                    y = b.oldStacks,
                    K, x, I, r, G, H, F;
                b.stacksTouched += 1;
                for (G = 0; G < g; G++) H = a[G], F = f[G], K = this.getStackIndicator(K, H, this.index), r = K.key, I = (x = z && F < (c ? 0 : q)) ? u : l, t[I] || (t[I] = {}), t[I][H] || (y[I] && y[I][H] ? (t[I][H] = y[I][H], t[I][H].total = null) : t[I][H] = new D(b, b.options.stackLabels, x, H, e)), I = t[I][H], null !== F && (I.points[r] = I.points[this.index] = [n(I.cum, c)], m(I.cum) || (I.base = r), I.touched = b.stacksTouched, 0 < K.index && !1 === this.singleStacks && (I.points[r][0] = I.points[this.index +
                    "," + H + ",0"][0])), "percent" === h ? (x = x ? l : u, z && t[x] && t[x][H] ? (x = t[x][H], I.total = x.total = Math.max(x.total, I.total) + Math.abs(F) || 0) : I.total = J(I.total + (Math.abs(F) || 0))) : I.total = J(I.total + (F || 0)), I.cum = n(I.cum, c) + (F || 0), null !== F && (I.points[r].push(I.cum), d[G] = I.cum);
                "percent" === h && (b.usePercentage = !0);
                this.stackedYData = d;
                b.oldStacks = {}
            }
        };
        a.prototype.setPercentStacks = function () {
            var a = this,
                f = a.stackKey,
                d = a.yAxis.stacks,
                g = a.processedXData,
                n;
            h([f, "-" + f], function (f) {
                for (var c = g.length, e, h; c--;)
                    if (e = g[c], n = a.getStackIndicator(n,
                            e, a.index, f), e = (h = d[f] && d[f][e]) && h.points[n.key]) h = h.total ? 100 / h.total : 0, e[0] = J(e[0] * h), e[1] = J(e[1] * h), a.stackedYData[c] = e[1]
            })
        };
        a.prototype.getStackIndicator = function (a, f, d, g) {
            !m(a) || a.x !== f || g && a.key !== g ? a = {
                x: f,
                index: 0,
                key: g
            } : a.index++;
            a.key = [d, f, a.index].join();
            return a
        }
    })(M);
    (function (a) {
        var D = a.addEvent,
            z = a.animate,
            F = a.Axis,
            J = a.createElement,
            m = a.css,
            f = a.defined,
            h = a.each,
            q = a.erase,
            n = a.extend,
            k = a.fireEvent,
            v = a.inArray,
            d = a.isNumber,
            g = a.isObject,
            w = a.merge,
            B = a.pick,
            c = a.Point,
            e = a.Series,
            l = a.seriesTypes,
            u = a.setAnimation,
            L = a.splat;
        n(a.Chart.prototype, {
            addSeries: function (a, c, d) {
                var b, e = this;
                a && (c = B(c, !0), k(e, "addSeries", {
                    options: a
                }, function () {
                    b = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    c && e.redraw(d)
                }));
                return b
            },
            addAxis: function (a, c, d, e) {
                var b = c ? "xAxis" : "yAxis",
                    f = this.options;
                a = w(a, {
                    index: this[b].length,
                    isX: c
                });
                new F(this, a);
                f[b] = L(f[b] || {});
                f[b].push(a);
                B(d, !0) && this.redraw(e)
            },
            showLoading: function (a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    e = c.loading,
                    f = function () {
                        d && m(d, {
                            left: b.plotLeft +
                                "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = J("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = J("span", {
                    className: "highcharts-loading-inner"
                }, null, d), D(b, "redraw", f));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                m(d, n(e.style, {
                    zIndex: 10
                }));
                m(b.loadingSpan, e.labelStyle);
                b.loadingShown || (m(d, {
                    opacity: 0,
                    display: ""
                }), z(d, {
                    opacity: e.style.opacity || .5
                }, {
                    duration: e.showDuration ||
                        0
                }));
                b.loadingShown = !0;
                f()
            },
            hideLoading: function () {
                var a = this.options,
                    c = this.loadingDiv;
                c && (c.className = "highcharts-loading highcharts-loading-hidden", z(c, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        m(c, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: ["chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions"],
            update: function (a, c) {
                var b, e = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    g = a.chart,
                    l, k;
                if (g) {
                    w(!0, this.options.chart, g);
                    "className" in g && this.setClassName(g.className);
                    if ("inverted" in g || "polar" in g) this.propFromSeries(), l = !0;
                    for (b in g) g.hasOwnProperty(b) && (-1 !== v("chart." + b, this.propsRequireUpdateSeries) && (k = !0), -1 !== v(b, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                    "style" in
                    g && this.renderer.setStyle(g.style)
                }
                for (b in a) {
                    if (this[b] && "function" === typeof this[b].update) this[b].update(a[b], !1);
                    else if ("function" === typeof this[e[b]]) this[e[b]](a[b]);
                    "chart" !== b && -1 !== v(b, this.propsRequireUpdateSeries) && (k = !0)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && w(!0, this.options.plotOptions, a.plotOptions);
                h(["xAxis", "yAxis", "series"], function (b) {
                    a[b] && h(L(a[b]), function (a) {
                        var c = f(a.id) && this.get(a.id) || this[b][0];
                        c && c.coll === b && c.update(a, !1)
                    }, this)
                }, this);
                l && h(this.axes,
                    function (a) {
                        a.update({}, !1)
                    });
                k && h(this.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && w(!0, this.options.loading, a.loading);
                b = g && g.width;
                g = g && g.height;
                d(b) && b !== this.chartWidth || d(g) && g !== this.chartHeight ? this.setSize(b, g) : B(c, !0) && this.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        n(c.prototype, {
            update: function (a, c, d, e) {
                function b() {
                    f.applyOptions(a);
                    null === f.y && l && (f.graphic = l.destroy());
                    g(a, !0) && (l && l.element && a && a.marker && a.marker.symbol && (f.graphic = l.destroy()), a && a.dataLabels &&
                        f.dataLabel && (f.dataLabel = f.dataLabel.destroy()));
                    k = f.index;
                    h.updateParallelArrays(f, k);
                    m.data[k] = g(m.data[k], !0) ? f.options : a;
                    h.isDirty = h.isDirtyData = !0;
                    !h.fixedBox && h.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === m.legendType && (n.isDirtyLegend = !0);
                    c && n.redraw(d)
                }
                var f = this,
                    h = f.series,
                    l = f.graphic,
                    k, n = h.chart,
                    m = h.options;
                c = B(c, !0);
                !1 === e ? b() : f.firePointEvent("update", {
                    options: a
                }, b)
            },
            remove: function (a, c) {
                this.series.removePoint(v(this, this.series.data), a, c)
            }
        });
        n(e.prototype, {
            addPoint: function (a, c,
                d, e) {
                var b = this.options,
                    f = this.data,
                    g = this.chart,
                    h = this.xAxis && this.xAxis.names,
                    l = b.data,
                    k, n, m = this.xData,
                    u, t;
                c = B(c, !0);
                k = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(k, [a]);
                t = k.x;
                u = m.length;
                if (this.requireSorting && t < m[u - 1])
                    for (n = !0; u && m[u - 1] > t;) u--;
                this.updateParallelArrays(k, "splice", u, 0, 0);
                this.updateParallelArrays(k, u);
                h && k.name && (h[t] = k.name);
                l.splice(u, 0, a);
                n && (this.data.splice(u, 0, null), this.processData());
                "point" === b.legendType && this.generatePoints();
                d && (f[0] && f[0].remove ? f[0].remove(!1) :
                    (f.shift(), this.updateParallelArrays(k, "shift"), l.shift()));
                this.isDirtyData = this.isDirty = !0;
                c && g.redraw(e)
            },
            removePoint: function (a, c, d) {
                var b = this,
                    e = b.data,
                    f = e[a],
                    g = b.points,
                    h = b.chart,
                    l = function () {
                        g && g.length === e.length && g.splice(a, 1);
                        e.splice(a, 1);
                        b.options.data.splice(a, 1);
                        b.updateParallelArrays(f || {
                            series: b
                        }, "splice", a, 1);
                        f && f.destroy();
                        b.isDirty = !0;
                        b.isDirtyData = !0;
                        c && h.redraw()
                    };
                u(d, h);
                c = B(c, !0);
                f ? f.firePointEvent("remove", null, l) : l()
            },
            remove: function (a, c, d) {
                function b() {
                    e.destroy();
                    f.isDirtyLegend =
                        f.isDirtyBox = !0;
                    f.linkSeries();
                    B(a, !0) && f.redraw(c)
                }
                var e = this,
                    f = e.chart;
                !1 !== d ? k(e, "remove", null, b) : b()
            },
            update: function (a, c) {
                var b = this,
                    d = this.chart,
                    e = this.userOptions,
                    f = this.type,
                    g = a.type || e.type || d.options.chart.type,
                    k = l[f].prototype,
                    m = ["group", "markerGroup", "dataLabelsGroup"],
                    u;
                if (g && g !== f || void 0 !== a.zIndex) m.length = 0;
                h(m, function (a) {
                    m[a] = b[a];
                    delete b[a]
                });
                a = w(e, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, a);
                this.remove(!1, null, !1);
                for (u in k) this[u] = void 0;
                n(this, l[g || f].prototype);
                h(m, function (a) {
                    b[a] = m[a]
                });
                this.init(d, a);
                d.linkSeries();
                B(c, !0) && d.redraw(!1)
            }
        });
        n(F.prototype, {
            update: function (a, c) {
                var b = this.chart;
                a = b.options[this.coll][this.options.index] = w(this.userOptions, a);
                this.destroy(!0);
                this.init(b, n(a, {
                    events: void 0
                }));
                b.isDirtyBox = !0;
                B(c, !0) && b.redraw()
            },
            remove: function (a) {
                for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;) d[e] && d[e].remove(!1);
                q(b.axes, this);
                q(b[c], this);
                b.options[c].splice(this.options.index, 1);
                h(b[c], function (a,
                    b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                B(a, !0) && b.redraw()
            },
            setTitle: function (a, c) {
                this.update({
                    title: a
                }, c)
            },
            setCategories: function (a, c) {
                this.update({
                    categories: a
                }, c)
            }
        })
    })(M);
    (function (a) {
        var D = a.color,
            z = a.each,
            F = a.map,
            J = a.pick,
            m = a.Series,
            f = a.seriesType;
        f("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function () {
                var a = [],
                    f = [],
                    n = this.xAxis,
                    k = this.yAxis,
                    m = k.stacks[this.stackKey],
                    d = {},
                    g = this.points,
                    w = this.index,
                    B = k.series,
                    c = B.length,
                    e, l = J(k.options.reversedStacks, !0) ? 1 : -1,
                    u, L;
                if (this.options.stacking) {
                    for (u = 0; u < g.length; u++) d[g[u].x] = g[u];
                    for (L in m) null !== m[L].total && f.push(L);
                    f.sort(function (a, c) {
                        return a - c
                    });
                    e = F(B, function () {
                        return this.visible
                    });
                    z(f, function (b, g) {
                        var h = 0,
                            t, q;
                        if (d[b] && !d[b].isNull) a.push(d[b]), z([-1, 1], function (a) {
                            var h = 1 === a ? "rightNull" : "leftNull",
                                k = 0,
                                n = m[f[g + a]];
                            if (n)
                                for (u = w; 0 <= u && u < c;) t = n.points[u], t || (u === w ? d[b][h] = !0 : e[u] && (q = m[b].points[u]) && (k -= q[1] - q[0])), u += l;
                            d[b][1 === a ? "rightCliff" : "leftCliff"] = k
                        });
                        else {
                            for (u = w; 0 <= u && u < c;) {
                                if (t =
                                    m[b].points[u]) {
                                    h = t[1];
                                    break
                                }
                                u += l
                            }
                            h = k.toPixels(h, !0);
                            a.push({
                                isNull: !0,
                                plotX: n.toPixels(b, !0),
                                plotY: h,
                                yBottom: h
                            })
                        }
                    })
                }
                return a
            },
            getGraphPath: function (a) {
                var f = m.prototype.getGraphPath,
                    h = this.options,
                    k = h.stacking,
                    v = this.yAxis,
                    d, g, w = [],
                    B = [],
                    c = this.index,
                    e, l = v.stacks[this.stackKey],
                    u = h.threshold,
                    z = v.getThreshold(h.threshold),
                    b, h = h.connectNulls || "percent" === k,
                    t = function (b, d, f) {
                        var g = a[b];
                        b = k && l[g.x].points[c];
                        var h = g[f + "Null"] || 0;
                        f = g[f + "Cliff"] || 0;
                        var n, m, g = !0;
                        f || h ? (n = (h ? b[0] : b[1]) + f, m = b[0] + f, g = !!h) : !k &&
                            a[d] && a[d].isNull && (n = m = u);
                        void 0 !== n && (B.push({
                            plotX: e,
                            plotY: null === n ? z : v.getThreshold(n),
                            isNull: g
                        }), w.push({
                            plotX: e,
                            plotY: null === m ? z : v.getThreshold(m),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                k && (a = this.getStackPoints());
                for (d = 0; d < a.length; d++)
                    if (g = a[d].isNull, e = J(a[d].rectPlotX, a[d].plotX), b = J(a[d].yBottom, z), !g || h) h || t(d, d - 1, "left"), g && !k && h || (B.push(a[d]), w.push({
                        x: d,
                        plotX: e,
                        plotY: b
                    })), h || t(d, d + 1, "right");
                d = f.call(this, B, !0, !0);
                w.reversed = !0;
                g = f.call(this, w, !0, !0);
                g.length && (g[0] = "L");
                g = d.concat(g);
                f =
                    f.call(this, B, !1, h);
                g.xMap = d.xMap;
                this.areaPath = g;
                return f
            },
            drawGraph: function () {
                this.areaPath = [];
                m.prototype.drawGraph.apply(this);
                var a = this,
                    f = this.areaPath,
                    n = this.options,
                    k = [["area", "highcharts-area", this.color, n.fillColor]];
                z(this.zones, function (f, d) {
                    k.push(["zone-area-" + d, "highcharts-area highcharts-zone-area-" + d + " " + f.className, f.color || a.color, f.fillColor || n.fillColor])
                });
                z(k, function (h) {
                    var d = h[0],
                        g = a[d];
                    g ? (g.endX = f.xMap, g.animate({
                        d: f
                    })) : (g = a[d] = a.chart.renderer.path(f).addClass(h[1]).attr({
                        fill: J(h[3],
                            D(h[2]).setOpacity(J(n.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), g.isArea = !0);
                    g.startX = f.xMap;
                    g.shiftUnit = n.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(M);
    (function (a) {
        var D = a.extendClass,
            z = a.merge,
            F = a.pick,
            J = a.Series,
            m = a.seriesTypes;
        a.defaultPlotOptions.spline = z(a.defaultPlotOptions.line);
        m.spline = D(J, {
            type: "spline",
            getPointSpline: function (a, h, m) {
                var f = h.plotX,
                    k = h.plotY,
                    q = a[m - 1];
                m = a[m + 1];
                var d, g, w, B;
                if (q && !q.isNull && !1 !== q.doCurve && m && !m.isNull && !1 !== m.doCurve) {
                    a = q.plotY;
                    w = m.plotX;
                    m = m.plotY;
                    var c = 0;
                    d = (1.5 * f + q.plotX) / 2.5;
                    g = (1.5 * k + a) / 2.5;
                    w = (1.5 * f + w) / 2.5;
                    B = (1.5 * k + m) / 2.5;
                    w !== d && (c = (B - g) * (w - f) / (w - d) + k - B);
                    g += c;
                    B += c;
                    g > a && g > k ? (g = Math.max(a, k), B = 2 * k - g) : g < a && g < k && (g = Math.min(a, k), B = 2 * k - g);
                    B > m && B > k ? (B = Math.max(m, k), g = 2 * k - B) : B < m && B < k && (B = Math.min(m, k), g = 2 * k - B);
                    h.rightContX = w;
                    h.rightContY = B
                }
                h = ["C", F(q.rightContX, q.plotX), F(q.rightContY, q.plotY), F(d, f), F(g, k), f, k];
                q.rightContX = q.rightContY = null;
                return h
            }
        })
    })(M);
    (function (a) {
        var D = a.seriesTypes.area.prototype,
            z = a.seriesType;
        z("areaspline",
            "spline", a.defaultPlotOptions.area, {
                getStackPoints: D.getStackPoints,
                getGraphPath: D.getGraphPath,
                setStackCliffs: D.setStackCliffs,
                drawGraph: D.drawGraph,
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
            })
    })(M);
    (function (a) {
        var D = a.animObject,
            z = a.color,
            F = a.each,
            J = a.extend,
            m = a.isNumber,
            f = a.merge,
            h = a.pick,
            q = a.Series,
            n = a.seriesType,
            k = a.stop,
            v = a.svg;
        n("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1,
                    shadow: !1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                q.prototype.init.apply(this, arguments);
                var a = this,
                    f = a.chart;
                f.hasRendered && F(f.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a =
                    this,
                    f = a.options,
                    k = a.xAxis,
                    m = a.yAxis,
                    c = k.reversed,
                    e, l = {},
                    n = 0;
                !1 === f.grouping ? n = 1 : F(a.chart.series, function (b) {
                    var c = b.options,
                        d = b.yAxis,
                        f;
                    b.type === a.type && b.visible && m.len === d.len && m.pos === d.pos && (c.stacking ? (e = b.stackKey, void 0 === l[e] && (l[e] = n++), f = l[e]) : !1 !== c.grouping && (f = n++), b.columnIndex = f)
                });
                var q = Math.min(Math.abs(k.transA) * (k.ordinalSlope || f.pointRange || k.closestPointRange || k.tickInterval || 1), k.len),
                    b = q * f.groupPadding,
                    t = (q - 2 * b) / n,
                    f = Math.min(f.maxPointWidth || k.len, h(f.pointWidth, t * (1 - 2 * f.pointPadding)));
                a.columnMetrics = {
                    width: f,
                    offset: (t - f) / 2 + (b + ((a.columnIndex || 0) + (c ? 1 : 0)) * t - q / 2) * (c ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, f, h, k) {
                var c = this.chart,
                    d = this.borderWidth,
                    g = -(d % 2 ? .5 : 0),
                    d = d % 2 ? .5 : 1;
                c.inverted && c.renderer.isVML && (d += 1);
                h = Math.round(a + h) + g;
                a = Math.round(a) + g;
                k = Math.round(f + k) + d;
                g = .5 >= Math.abs(f) && .5 < k;
                f = Math.round(f) + d;
                k -= f;
                g && k && (--f, k += 1);
                return {
                    x: a,
                    y: f,
                    width: h - a,
                    height: k
                }
            },
            translate: function () {
                var a = this,
                    f = a.chart,
                    k = a.options,
                    m = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    m = a.borderWidth =
                    h(k.borderWidth, m ? 0 : 1),
                    c = a.yAxis,
                    e = a.translatedThreshold = c.getThreshold(k.threshold),
                    l = h(k.minPointLength, 5),
                    n = a.getColumnMetrics(),
                    v = n.width,
                    b = a.barW = Math.max(v, 1 + 2 * m),
                    t = a.pointXOffset = n.offset;
                f.inverted && (e -= .5);
                k.pointPadding && (b = Math.ceil(b));
                q.prototype.translate.apply(a);
                F(a.points, function (d) {
                    var g = h(d.yBottom, e),
                        k = 999 + Math.abs(g),
                        k = Math.min(Math.max(-k, d.plotY), c.len + k),
                        m = d.plotX + t,
                        n = b,
                        u = Math.min(k, g),
                        q, y = Math.max(k, g) - u;
                    Math.abs(y) < l && l && (y = l, q = !c.reversed && !d.negative || c.reversed && d.negative,
                        u = Math.abs(u - e) > l ? g - l : e - (q ? l : 0));
                    d.barX = m;
                    d.pointWidth = v;
                    d.tooltipPos = f.inverted ? [c.len + c.pos - f.plotLeft - k, a.xAxis.len - m - n / 2, y] : [m + n / 2, k + c.pos - f.plotTop, y];
                    d.shapeType = "rect";
                    d.shapeArgs = a.crispCol.apply(a, d.isNull ? [d.plotX, c.len / 2, 0, 0] : [m, u, n, y])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (a, f) {
                var d = this.options,
                    g = this.pointAttrToOptions || {},
                    c = g.stroke ||
                    "borderColor",
                    e = g["stroke-width"] || "borderWidth",
                    h = a && a.color || this.color,
                    k = a[c] || d[c] || this.color || h,
                    g = d.dashStyle,
                    m;
                a && this.zones.length && (h = (h = a.getZone()) && h.color || a.options.color || this.color);
                f && (f = d.states[f], m = f.brightness, h = f.color || void 0 !== m && z(h).brighten(f.brightness).get() || h, k = f[c] || k, g = f.dashStyle || g);
                a = {
                    fill: h,
                    stroke: k,
                    "stroke-width": a[e] || d[e] || this[e] || 0
                };
                d.borderRadius && (a.r = d.borderRadius);
                g && (a.dashstyle = g);
                return a
            },
            drawPoints: function () {
                var a = this,
                    g = this.chart,
                    h = a.options,
                    n = g.renderer,
                    c = h.animationLimit || 250,
                    e;
                F(a.points, function (d) {
                    var l = d.graphic;
                    m(d.plotY) && null !== d.y ? (e = d.shapeArgs, l ? (k(l), l[g.pointCount < c ? "animate" : "attr"](f(e))) : d.graphic = l = n[d.shapeType](e).attr({
                        "class": d.getClassName()
                    }).add(d.group || a.group), l.attr(a.pointAttribs(d, d.selected && "select")).shadow(h.shadow, null, h.stacking && !h.borderRadius)) : l && (d.graphic = l.destroy())
                })
            },
            animate: function (a) {
                var d = this,
                    f = this.yAxis,
                    h = d.options,
                    c = this.chart.inverted,
                    e = {};
                v && (a ? (e.scaleY = .001, a = Math.min(f.pos + f.len,
                    Math.max(f.pos, f.toPixels(h.threshold))), c ? e.translateX = a - f.len : e.translateY = a, d.group.attr(e)) : (e[c ? "translateX" : "translateY"] = f.pos, d.group.animate(e, J(D(d.options.animation), {
                    step: function (a, c) {
                        d.group.attr({
                            scaleY: Math.max(.001, c.pos)
                        })
                    }
                })), d.animate = null))
            },
            remove: function () {
                var a = this,
                    f = a.chart;
                f.hasRendered && F(f.series, function (d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                q.prototype.remove.apply(a, arguments)
            }
        })
    })(M);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(M);
    (function (a) {
        var D =
            a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function () {
                this.options.lineWidth &&
                    D.prototype.drawGraph.call(this)
            }
        })
    })(M);
    (function (a) {
        var D = a.pick,
            z = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options,
                    J = this.chart,
                    m = 2 * (a.slicedOffset || 0),
                    f = J.plotWidth - 2 * m,
                    J = J.plotHeight - 2 * m,
                    h = a.center,
                    h = [D(h[0], "50%"), D(h[1], "50%"), a.size || "100%", a.innerSize || 0],
                    q = Math.min(f, J),
                    n, k;
                for (n = 0; 4 > n; ++n) k = h[n], a = 2 > n || 2 === n && /%$/.test(k), h[n] = z(k, [f, J, q, h[2]][n]) + (a ? m : 0);
                h[3] > h[2] && (h[3] = h[2]);
                return h
            }
        }
    })(M);
    (function (a) {
        var D = a.addEvent,
            z = a.defined,
            F = a.each,
            J = a.extend,
            m = a.inArray,
            f = a.noop,
            h = a.pick,
            q = a.Point,
            n = a.Series,
            k = a.seriesType,
            v = a.setAnimation;
        k("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function () {
                    return null === this.y ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1,
                    shadow: !1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var d = this,
                    f = d.points,
                    h = d.startAngleRad;
                a || (F(f, function (a) {
                    var c = a.graphic,
                        f = a.shapeArgs;
                    c && (c.attr({
                        r: a.startR || d.center[3] / 2,
                        start: h,
                        end: h
                    }), c.animate({
                        r: f.r,
                        start: f.start,
                        end: f.end
                    }, d.options.animation))
                }), d.animate = null)
            },
            updateTotals: function () {
                var a, f = 0,
                    h = this.points,
                    k = h.length,
                    c, e = this.options.ignoreHiddenPoint;
                for (a = 0; a < k; a++) c = h[a], 0 > c.y &&
                    (c.y = null), f += e && !c.visible ? 0 : c.y;
                this.total = f;
                for (a = 0; a < k; a++) c = h[a], c.percentage = 0 < f && (c.visible || !e) ? c.y / f * 100 : 0, c.total = f
            },
            generatePoints: function () {
                n.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var d = 0,
                    f = this.options,
                    k = f.slicedOffset,
                    c = k + (f.borderWidth || 0),
                    e, l, m, n = f.startAngle || 0,
                    b = this.startAngleRad = Math.PI / 180 * (n - 90),
                    n = (this.endAngleRad = Math.PI / 180 * (h(f.endAngle, n + 360) - 90)) - b,
                    t = this.points,
                    q = f.dataLabels.distance,
                    f = f.ignoreHiddenPoint,
                    v, x = t.length,
                    I;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, c) {
                    m = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + q), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(m) * (a[2] / 2 + q)
                };
                for (v = 0; v < x; v++) {
                    I = t[v];
                    e = b + d * n;
                    if (!f || I.visible) d += I.percentage / 100;
                    l = b + d * n;
                    I.shapeType = "arc";
                    I.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * e) / 1E3,
                        end: Math.round(1E3 * l) / 1E3
                    };
                    m = (l + e) / 2;
                    m > 1.5 * Math.PI ? m -= 2 * Math.PI : m < -Math.PI / 2 && (m += 2 * Math.PI);
                    I.slicedTranslation = {
                        translateX: Math.round(Math.cos(m) * k),
                        translateY: Math.round(Math.sin(m) *
                            k)
                    };
                    e = Math.cos(m) * a[2] / 2;
                    l = Math.sin(m) * a[2] / 2;
                    I.tooltipPos = [a[0] + .7 * e, a[1] + .7 * l];
                    I.half = m < -Math.PI / 2 || m > Math.PI / 2 ? 1 : 0;
                    I.angle = m;
                    c = Math.min(c, q / 5);
                    I.labelPos = [a[0] + e + Math.cos(m) * q, a[1] + l + Math.sin(m) * q, a[0] + e + Math.cos(m) * c, a[1] + l + Math.sin(m) * c, a[0] + e, a[1] + l, 0 > q ? "center" : I.half ? "right" : "left", m]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this,
                    f = a.chart.renderer,
                    h, k, c, e, l = a.options.shadow;
                l && !a.shadowGroup && (a.shadowGroup = f.g("shadow").add(a.group));
                F(a.points, function (d) {
                    if (null !== d.y) {
                        k = d.graphic;
                        e = d.shapeArgs;
                        h = d.sliced ? d.slicedTranslation : {};
                        var g = d.shadowGroup;
                        l && !g && (g = d.shadowGroup = f.g("shadow").add(a.shadowGroup));
                        g && g.attr(h);
                        c = a.pointAttribs(d, d.selected && "select");
                        k ? k.setRadialReference(a.center).attr(c).animate(J(e, h)) : (d.graphic = k = f[d.shapeType](e).addClass(d.getClassName()).setRadialReference(a.center).attr(h).add(a.group), d.visible || k.attr({
                            visibility: "hidden"
                        }), k.attr(c).attr({
                            "stroke-linejoin": "round"
                        }).shadow(l, g))
                    }
                })
            },
            searchPoint: f,
            sortByAngle: function (a, f) {
                a.sort(function (a,
                    d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * f
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: a.CenteredSeriesMixin.getCenter,
            getSymbol: f
        }, {
            init: function () {
                q.prototype.init.apply(this, arguments);
                var a = this,
                    f;
                a.name = h(a.name, "Slice");
                f = function (d) {
                    a.slice("select" === d.type)
                };
                D(a, "select", f);
                D(a, "unselect", f);
                return a
            },
            setVisible: function (a, f) {
                var d = this,
                    g = d.series,
                    c = g.chart,
                    e = g.options.ignoreHiddenPoint;
                f = h(f, e);
                a !== d.visible && (d.visible = d.options.visible = a = void 0 === a ? !d.visible :
                    a, g.options.data[m(d, g.data)] = d.options, F(["graphic", "dataLabel", "connector", "shadowGroup"], function (c) {
                        if (d[c]) d[c][a ? "show" : "hide"](!0)
                    }), d.legendItem && c.legend.colorizeItem(d, a), a || "hover" !== d.state || d.setState(""), e && (g.isDirty = !0), f && c.redraw())
            },
            slice: function (a, f, k) {
                var d = this.series;
                v(k, d.chart);
                h(f, !0);
                this.sliced = this.options.sliced = a = z(a) ? a : !this.sliced;
                d.options.data[m(this, d.data)] = this.options;
                a = a ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                };
                this.graphic.animate(a);
                this.shadowGroup &&
                    this.shadowGroup.animate(a)
            },
            haloPath: function (a) {
                var d = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d.x, d.y, d.r + a, d.r + a, {
                    innerR: this.shapeArgs.r,
                    start: d.start,
                    end: d.end
                })
            }
        })
    })(M);
    (function (a) {
        var D = a.addEvent,
            z = a.arrayMax,
            F = a.defined,
            J = a.each,
            m = a.extend,
            f = a.format,
            h = a.map,
            q = a.merge,
            n = a.noop,
            k = a.pick,
            v = a.relativeLength,
            d = a.Series,
            g = a.seriesTypes,
            w = a.stableSort,
            B = a.stop;
        a.distribute = function (a, d) {
            function c(a, b) {
                return a.target - b.target
            }
            var e, f = !0,
                b = a,
                g = [],
                k;
            k = 0;
            for (e = a.length; e--;) k += a[e].size;
            if (k > d) {
                w(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (k = e = 0; k <= d;) k += a[e].size, e++;
                g = a.splice(e - 1, a.length)
            }
            w(a, c);
            for (a = h(a, function (a) {
                    return {
                        size: a.size,
                        targets: [a.target]
                    }
                }); f;) {
                for (e = a.length; e--;) f = a[e], k = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2, f.pos = Math.min(Math.max(0, k - f.size / 2), d - f.size);
                e = a.length;
                for (f = !1; e--;) 0 < e && a[e - 1].pos + a[e - 1].size > a[e].pos && (a[e - 1].size += a[e].size, a[e - 1].targets = a[e - 1].targets.concat(a[e].targets),
                    a[e - 1].pos + a[e - 1].size > d && (a[e - 1].pos = d - a[e - 1].size), a.splice(e, 1), f = !0)
            }
            e = 0;
            J(a, function (a) {
                var c = 0;
                J(a.targets, function () {
                    b[e].pos = a.pos + c;
                    c += b[e].size;
                    e++
                })
            });
            b.push.apply(b, g);
            w(b, c)
        };
        d.prototype.drawDataLabels = function () {
            var a = this,
                d = a.options,
                g = d.dataLabels,
                h = a.points,
                n, b, t = a.hasRendered || 0,
                y, v, x = k(g.defer, !0),
                w = a.chart.renderer;
            if (g.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(g), v = a.plotGroup("dataLabelsGroup", "data-labels", x && !t ? "hidden" : "visible", g.zIndex || 6), x && (v.attr({
                    opacity: +t
                }),
                t || D(a, "afterAnimate", function () {
                    a.visible && v.show(!0);
                    v[d.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: 200
                    })
                })), b = g, J(h, function (c) {
                var e, h = c.dataLabel,
                    l, t, r = c.connector,
                    u = !0,
                    x, I = {};
                n = c.dlOptions || c.options && c.options.dataLabels;
                e = k(n && n.enabled, b.enabled) && null !== c.y;
                if (h && !e) c.dataLabel = h.destroy();
                else if (e) {
                    g = q(b, n);
                    x = g.style;
                    e = g.rotation;
                    l = c.getLabelConfig();
                    y = g.format ? f(g.format, l) : g.formatter.call(l, g);
                    x.color = k(g.color, x.color, a.color, "#000000");
                    if (h) F(y) ? (h.attr({
                        text: y
                    }), u = !1) : (c.dataLabel =
                        h = h.destroy(), r && (c.connector = r.destroy()));
                    else if (F(y)) {
                        h = {
                            fill: g.backgroundColor,
                            stroke: g.borderColor,
                            "stroke-width": g.borderWidth,
                            r: g.borderRadius || 0,
                            rotation: e,
                            padding: g.padding,
                            zIndex: 1
                        };
                        "contrast" === x.color && (I.color = g.inside || 0 > g.distance || d.stacking ? w.getContrast(c.color || a.color) : "#000000");
                        d.cursor && (I.cursor = d.cursor);
                        for (t in h) void 0 === h[t] && delete h[t];
                        h = c.dataLabel = w[e ? "text" : "label"](y, 0, -9999, g.shape, null, null, g.useHTML, null, "data-label").attr(h);
                        h.addClass("highcharts-data-label-color-" +
                            c.colorIndex + " " + (g.className || ""));
                        h.css(m(x, I));
                        h.add(v);
                        h.shadow(g.shadow)
                    }
                    h && a.alignDataLabel(c, h, g, null, u)
                }
            })
        };
        d.prototype.alignDataLabel = function (a, d, f, g, h) {
            var b = this.chart,
                c = b.inverted,
                e = k(a.plotX, -9999),
                l = k(a.plotY, -9999),
                n = d.getBBox(),
                q, r = f.rotation,
                u = f.align,
                v = this.visible && (a.series.forceDL || b.isInsidePlot(e, Math.round(l), c) || g && b.isInsidePlot(e, c ? g.x + 1 : g.y + g.height - 1, c)),
                w = "justify" === k(f.overflow, "justify");
            v && (q = f.style.fontSize, q = b.renderer.fontMetrics(q, d).b, g = m({
                x: c ? b.plotWidth -
                    l : e,
                y: Math.round(c ? b.plotHeight - e : l),
                width: 0,
                height: 0
            }, g), m(f, {
                width: n.width,
                height: n.height
            }), r ? (w = !1, c = b.renderer.rotCorr(q, r), c = {
                x: g.x + f.x + g.width / 2 + c.x,
                y: g.y + f.y + {
                    top: 0,
                    middle: .5,
                    bottom: 1
                }[f.verticalAlign] * g.height
            }, d[h ? "attr" : "animate"](c).attr({
                align: u
            }), e = (r + 720) % 360, e = 180 < e && 360 > e, "left" === u ? c.y -= e ? n.height : 0 : "center" === u ? (c.x -= n.width / 2, c.y -= n.height / 2) : "right" === u && (c.x -= n.width, c.y -= e ? 0 : n.height)) : (d.align(f, null, g), c = d.alignAttr), w ? this.justifyDataLabel(d, f, c, n, g, h) : k(f.crop, !0) && (v = b.isInsidePlot(c.x,
                c.y) && b.isInsidePlot(c.x + n.width, c.y + n.height)), f.shape && !r && d.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            v || (B(d), d.attr({
                y: -9999
            }), d.placed = !1)
        };
        d.prototype.justifyDataLabel = function (a, d, f, g, h, b) {
            var c = this.chart,
                e = d.align,
                k = d.verticalAlign,
                l, m, n = a.box ? 0 : a.padding || 0;
            l = f.x + n;
            0 > l && ("right" === e ? d.align = "left" : d.x = -l, m = !0);
            l = f.x + g.width - n;
            l > c.plotWidth && ("left" === e ? d.align = "right" : d.x = c.plotWidth - l, m = !0);
            l = f.y + n;
            0 > l && ("bottom" === k ? d.verticalAlign = "top" : d.y = -l, m = !0);
            l = f.y + g.height - n;
            l > c.plotHeight && ("top" ===
                k ? d.verticalAlign = "bottom" : d.y = c.plotHeight - l, m = !0);
            m && (a.placed = !b, a.align(d, null, h))
        };
        g.pie && (g.pie.prototype.drawDataLabels = function () {
            var c = this,
                e = c.data,
                f, g = c.chart,
                m = c.options.dataLabels,
                b = k(m.connectorPadding, 10),
                n = k(m.connectorWidth, 1),
                q = g.plotWidth,
                v = g.plotHeight,
                x, w = m.distance,
                r = c.center,
                B = r[2] / 2,
                H = r[1],
                D = 0 < w,
                p, A, F, O, C = [[], []],
                E, M, Q, R, T = [0, 0, 0, 0];
            c.visible && (m.enabled || c._hasPointLabels) && (d.prototype.drawDataLabels.apply(c), J(e, function (a) {
                a.dataLabel && a.visible && (C[a.half].push(a), a.dataLabel._pos =
                    null)
            }), J(C, function (d, e) {
                var k, l, n = d.length,
                    t, u, x;
                if (n)
                    for (c.sortByAngle(d, e - .5), 0 < w && (k = Math.max(0, H - B - w), l = Math.min(H + B + w, g.plotHeight), t = h(d, function (a) {
                            if (a.dataLabel) return x = a.dataLabel.getBBox().height || 21, {
                                target: a.labelPos[1] - k + x / 2,
                                size: x,
                                rank: a.y
                            }
                        }), a.distribute(t, l + x - k)), R = 0; R < n; R++) f = d[R], F = f.labelPos, p = f.dataLabel, Q = !1 === f.visible ? "hidden" : "inherit", u = F[1], t ? void 0 === t[R].pos ? Q = "hidden" : (O = t[R].size, M = k + t[R].pos) : M = u, E = m.justify ? r[0] + (e ? -1 : 1) * (B + w) : c.getX(M < k + 2 || M > l - 2 ? u : M, e), p._attr = {
                        visibility: Q,
                        align: F[6]
                    }, p._pos = {
                        x: E + m.x + ({
                            left: b,
                            right: -b
                        }[F[6]] || 0),
                        y: M + m.y - 10
                    }, F.x = E, F.y = M, null === c.options.size && (A = p.width, E - A < b ? T[3] = Math.max(Math.round(A - E + b), T[3]) : E + A > q - b && (T[1] = Math.max(Math.round(E + A - q + b), T[1])), 0 > M - O / 2 ? T[0] = Math.max(Math.round(-M + O / 2), T[0]) : M + O / 2 > v && (T[2] = Math.max(Math.round(M + O / 2 - v), T[2])))
            }), 0 === z(T) || this.verifyDataLabelOverflow(T)) && (this.placeDataLabels(), D && n && J(this.points, function (a) {
                var b;
                x = a.connector;
                if ((p = a.dataLabel) && p._pos && a.visible) {
                    Q = p._attr.visibility;
                    if (b = !x) a.connector = x = g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(c.dataLabelsGroup), x.attr({
                        "stroke-width": n,
                        stroke: m.connectorColor || a.color || "#666666"
                    });
                    x[b ? "attr" : "animate"]({
                        d: c.connectorPath(a.labelPos)
                    });
                    x.attr("visibility", Q)
                } else x && (a.connector = x.destroy())
            }))
        }, g.pie.prototype.connectorPath = function (a) {
            var c = a.x,
                d = a.y;
            return k(this.options.softConnector, !0) ? ["M", c + ("left" === a[6] ? 5 : -5), d, "C", c, d, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4],
a[5]] : ["M", c + ("left" === a[6] ? 5 : -5), d, "L", a[2], a[3], "L", a[4], a[5]]
        }, g.pie.prototype.placeDataLabels = function () {
            J(this.points, function (a) {
                var c = a.dataLabel;
                c && a.visible && ((a = c._pos) ? (c.attr(c._attr), c[c.moved ? "animate" : "attr"](a), c.moved = !0) : c && c.attr({
                    y: -9999
                }))
            })
        }, g.pie.prototype.alignDataLabel = n, g.pie.prototype.verifyDataLabelOverflow = function (a) {
            var c = this.center,
                d = this.options,
                f = d.center,
                g = d.minSize || 80,
                b, h;
            null !== f[0] ? b = Math.max(c[2] - Math.max(a[1], a[3]), g) : (b = Math.max(c[2] - a[1] - a[3], g), c[0] += (a[3] -
                a[1]) / 2);
            null !== f[1] ? b = Math.max(Math.min(b, c[2] - Math.max(a[0], a[2])), g) : (b = Math.max(Math.min(b, c[2] - a[0] - a[2]), g), c[1] += (a[0] - a[2]) / 2);
            b < c[2] ? (c[2] = b, c[3] = Math.min(v(d.innerSize || 0, b), b), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : h = !0;
            return h
        });
        g.column && (g.column.prototype.alignDataLabel = function (a, e, f, g, h) {
            var b = this.chart.inverted,
                c = a.series,
                l = a.dlBox || a.shapeArgs,
                m = k(a.below, a.plotY > k(this.translatedThreshold, c.yAxis.len)),
                n = k(f.inside, !!this.options.stacking);
            l && (g = q(l), 0 >
                g.y && (g.height += g.y, g.y = 0), l = g.y + g.height - c.yAxis.len, 0 < l && (g.height -= l), b && (g = {
                    x: c.yAxis.len - g.y - g.height,
                    y: c.xAxis.len - g.x - g.width,
                    width: g.height,
                    height: g.width
                }), n || (b ? (g.x += m ? 0 : g.width, g.width = 0) : (g.y += m ? g.height : 0, g.height = 0)));
            f.align = k(f.align, !b || n ? "center" : m ? "right" : "left");
            f.verticalAlign = k(f.verticalAlign, b || n ? "middle" : m ? "top" : "bottom");
            d.prototype.alignDataLabel.call(this, a, e, f, g, h)
        })
    })(M);
    (function (a) {
        var D = a.Chart,
            z = a.each,
            F = a.pick,
            J = a.addEvent;
        D.prototype.callbacks.push(function (a) {
            function f() {
                var f = [];
                z(a.series, function (a) {
                    var h = a.options.dataLabels,
                        k = a.dataLabelCollections || ["dataLabel"];
                    (h.enabled || a._hasPointLabels) && !h.allowOverlap && a.visible && z(k, function (h) {
                        z(a.points, function (a) {
                            a[h] && (a[h].labelrank = F(a.labelrank, a.shapeArgs && a.shapeArgs.height), f.push(a[h]))
                        })
                    })
                });
                a.hideOverlappingLabels(f)
            }
            f();
            J(a, "redraw", f)
        });
        D.prototype.hideOverlappingLabels = function (a) {
            var f = a.length,
                h, m, n, k, v, d, g, w, B, c = function (a, c, d, f, b, g, h, k) {
                    return !(b > a + d || b + h < a || g > c + f || g + k < c)
                };
            for (m = 0; m < f; m++)
                if (h = a[m]) h.oldOpacity =
                    h.opacity, h.newOpacity = 1;
            a.sort(function (a, c) {
                return (c.labelrank || 0) - (a.labelrank || 0)
            });
            for (m = 0; m < f; m++)
                for (n = a[m], h = m + 1; h < f; ++h)
                    if (k = a[h], n && k && n.placed && k.placed && 0 !== n.newOpacity && 0 !== k.newOpacity && (v = n.alignAttr, d = k.alignAttr, g = n.parentGroup, w = k.parentGroup, B = 2 * (n.box ? 0 : n.padding), v = c(v.x + g.translateX, v.y + g.translateY, n.width - B, n.height - B, d.x + w.translateX, d.y + w.translateY, k.width - B, k.height - B)))(n.labelrank < k.labelrank ? n : k).newOpacity = 0;
            z(a, function (a) {
                var c, d;
                a && (d = a.newOpacity, a.oldOpacity !==
                    d && a.placed && (d ? a.show(!0) : c = function () {
                        a.hide()
                    }, a.alignAttr.opacity = d, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, c)), a.isOld = !0)
            })
        }
    })(M);
    (function (a) {
        var D = a.addEvent,
            z = a.Chart,
            F = a.createElement,
            J = a.css,
            m = a.defaultOptions,
            f = a.defaultPlotOptions,
            h = a.each,
            q = a.extend,
            n = a.fireEvent,
            k = a.hasTouch,
            v = a.inArray,
            d = a.isObject,
            g = a.Legend,
            w = a.merge,
            B = a.pick,
            c = a.Point,
            e = a.Series,
            l = a.seriesTypes,
            u = a.svg,
            L;
        L = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    c = a.chart,
                    d = c.pointer,
                    e = function (a) {
                        for (var b =
                                a.target, d; b && !d;) d = b.point, b = b.parentNode;
                        if (void 0 !== d && d !== c.hoverPoint) d.onMouseOver(a)
                    };
                h(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.element.point = a)
                });
                a._hasTracking || (h(a.trackerGroups, function (b) {
                    if (a[b]) {
                        a[b].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function (a) {
                            d.onTrackerMouseOut(a)
                        });
                        if (k) a[b].on("touchstart", e);
                        a.options.cursor && a[b].css(J).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function () {
                var a =
                    this,
                    c = a.options,
                    d = c.trackByArea,
                    e = [].concat(d ? a.areaPath : a.graphPath),
                    f = e.length,
                    g = a.chart,
                    l = g.pointer,
                    m = g.renderer,
                    n = g.options.tooltip.snap,
                    q = a.tracker,
                    p, v = function () {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    },
                    w = "rgba(192,192,192," + (u ? .0001 : .002) + ")";
                if (f && !d)
                    for (p = f + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - n, e[p + 2], "L"), (p && "M" === e[p] || p === f) && e.splice(p, 0, "L", e[p - 2] + n, e[p - 1]);
                q ? q.attr({
                    d: e
                }) : a.graph && (a.tracker = m.path(e).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: w,
                    fill: d ? w : "none",
                    "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * n),
                    zIndex: 2
                }).add(a.group), h([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", v).on("mouseout", function (a) {
                        l.onTrackerMouseOut(a)
                    });
                    c.cursor && a.css({
                        cursor: c.cursor
                    });
                    if (k) a.on("touchstart", v)
                }))
            }
        };
        l.column && (l.column.prototype.drawTracker = L.drawTrackerPoint);
        l.pie && (l.pie.prototype.drawTracker = L.drawTrackerPoint);
        l.scatter && (l.scatter.prototype.drawTracker = L.drawTrackerPoint);
        q(g.prototype, {
            setItemEvents: function (a,
                c, d) {
                var b = this,
                    e = b.chart,
                    f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (d ? c : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    e.seriesGroup.addClass(f);
                    c.css(b.options.itemHoverStyle)
                }).on("mouseout", function () {
                    c.css(a.visible ? b.itemStyle : b.itemHiddenStyle);
                    e.seriesGroup.removeClass(f);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : n(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = F("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                D(a.checkbox, "click", function (b) {
                    n(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        m.legend.itemStyle.cursor = "pointer";
        q(z.prototype, {
            showResetZoom: function () {
                var a = this,
                    c = m.lang,
                    d = a.options.chart.resetZoomButton,
                    e = d.theme,
                    f = e.states,
                    g = "chart" === d.relativeTo ? null : "plotBox";
                this.resetZoomButton =
                    a.renderer.button(c.resetZoom, null, null, function () {
                        a.zoomOut()
                    }, e, f && f.hover).attr({
                        align: d.position.align,
                        title: c.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(d.position, !1, g)
            },
            zoomOut: function () {
                var a = this;
                n(a, "selection", {
                    resetSelection: !0
                }, function () {
                    a.zoom()
                })
            },
            zoom: function (a) {
                var b, c = this.pointer,
                    e = !1,
                    f;
                !a || a.resetSelection ? h(this.axes, function (a) {
                    b = a.zoom()
                }) : h(a.xAxis.concat(a.yAxis), function (a) {
                    var d = a.axis,
                        f = d.isXAxis;
                    if (c[f ? "zoomX" : "zoomY"] || c[f ? "pinchX" : "pinchY"]) b =
                        d.zoom(a.min, a.max), d.displayBtn && (e = !0)
                });
                f = this.resetZoomButton;
                e && !f ? this.showResetZoom() : !e && d(f) && (this.resetZoomButton = f.destroy());
                b && this.redraw(B(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function (a, c) {
                var b = this,
                    d = b.hoverPoints,
                    e;
                d && h(d, function (a) {
                    a.setState()
                });
                h("xy" === c ? [1, 0] : [1], function (c) {
                    c = b[c ? "xAxis" : "yAxis"][0];
                    var d = c.horiz,
                        f = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        g = b[d],
                        h = (c.pointRange || 0) / 2,
                        k = c.getExtremes(),
                        l = c.toValue(g - f, !0) + h,
                        h =
                        c.toValue(g + c.len - f, !0) - h,
                        g = g > f;
                    c.series.length && (g || l > Math.min(k.dataMin, k.min)) && (!g || h < Math.max(k.dataMax, k.max)) && (c.setExtremes(l, h, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    b[d] = f
                });
                e && b.redraw(!1);
                J(b.container, {
                    cursor: "move"
                })
            }
        });
        q(c.prototype, {
            select: function (a, c) {
                var b = this,
                    d = b.series,
                    e = d.chart;
                a = B(a, !b.selected);
                b.firePointEvent(a ? "select" : "unselect", {
                    accumulate: c
                }, function () {
                    b.selected = b.options.selected = a;
                    d.options.data[v(b, d.data)] = b.options;
                    b.setState(a && "select");
                    c || h(e.getSelectedPoints(), function (a) {
                        a.selected &&
                            a !== b && (a.selected = a.options.selected = !1, d.options.data[v(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function (a, c) {
                var b = this.series,
                    d = b.chart,
                    e = d.tooltip,
                    f = d.hoverPoint;
                if (this.series) {
                    if (!c) {
                        if (f && f !== this) f.onMouseOut();
                        if (d.hoverSeries !== b) b.onMouseOver();
                        d.hoverPoint = this
                    }!e || e.shared && !b.noSharedTooltip ? e || this.setState("hover") : (this.setState("hover"), e.refresh(this, a));
                    this.firePointEvent("mouseOver")
                }
            },
            onMouseOut: function () {
                var a = this.series.chart,
                    c = a.hoverPoints;
                this.firePointEvent("mouseOut");
                c && -1 !== v(this, c) || (this.setState(), a.hoverPoint = null)
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a = w(this.series.options.point, this.options).events,
                        c;
                    this.events = a;
                    for (c in a) D(this, c, a[c]);
                    this.hasImportedEvents = !0
                }
            },
            setState: function (b, c) {
                var d = Math.floor(this.plotX),
                    e = this.plotY,
                    g = this.series,
                    h = g.options.states[b] || {},
                    k = f[g.type].marker && g.options.marker,
                    l = k && !1 === k.enabled,
                    m = k && k.states && k.states[b] || {},
                    n = !1 === m.enabled,
                    p = g.stateMarkerGraphic,
                    t = this.marker || {},
                    u = g.chart,
                    v = g.halo,
                    w;
                b = b || "";
                if (!(b === this.state && !c || this.selected && "select" !== b || !1 === h.enabled || b && (n || l && !1 === m.enabled) || b && t.states && t.states[b] && !1 === t.states[b].enabled)) {
                    k && g.markerAttribs && (w = g.markerAttribs(this, b));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), b && this.graphic.addClass("highcharts-point-" + b), this.graphic.attr(g.pointAttribs(this, b)), w && this.graphic.animate(w, B(u.options.chart.animation, m.animation, k.animation)), p &&
                        p.hide();
                    else {
                        if (b && m) {
                            k = t.symbol || g.symbol;
                            p && p.currentSymbol !== k && (p = p.destroy());
                            if (p) p[c ? "animate" : "attr"]({
                                x: w.x,
                                y: w.y
                            });
                            else k && (g.stateMarkerGraphic = p = u.renderer.symbol(k, w.x, w.y, w.width, w.height).add(g.markerGroup), p.currentSymbol = k);
                            p && p.attr(g.pointAttribs(this, b))
                        }
                        p && (p[b && u.isInsidePlot(d, e, u.inverted) ? "show" : "hide"](), p.element.point = this)
                    }(d = h.halo) && d.size ? (v || (g.halo = v = u.renderer.path().add(g.markerGroup || g.group)), a.stop(v), v[c ? "animate" : "attr"]({
                        d: this.haloPath(d.size)
                    }), v.attr({
                        "class": "highcharts-halo highcharts-color-" +
                            B(this.colorIndex, g.colorIndex)
                    }), v.attr(q({
                        fill: this.color || g.color,
                        "fill-opacity": d.opacity,
                        zIndex: -1
                    }, d.attributes))) : v && v.animate({
                        d: this.haloPath(0)
                    });
                    this.state = b
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        q(e.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    c = a.hoverSeries;
                if (c && c !== this) c.onMouseOut();
                this.options.events.mouseOver && n(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a =
                    this.options,
                    c = this.chart,
                    d = c.tooltip,
                    e = c.hoverPoint;
                c.hoverSeries = null;
                if (e) e.onMouseOut();
                this && a.events.mouseOut && n(this, "mouseOut");
                !d || a.stickyTracking || d.shared && !this.noSharedTooltip || d.hide();
                this.setState()
            },
            setState: function (a) {
                var b = this,
                    c = b.options,
                    d = b.graph,
                    e = c.states,
                    f = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && (h([b.group, b.markerGroup], function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a &&
                        (f = e[a].lineWidth || f + (e[a].lineWidthPlus || 0)), d && !d.dashstyle))
                    for (e = {
                            "stroke-width": f
                        }, d.attr(e); b["zone-graph-" + c];) b["zone-graph-" + c].attr(e), c += 1
            },
            setVisible: function (a, c) {
                var b = this,
                    d = b.chart,
                    e = b.legendItem,
                    f, g = d.options.chart.ignoreHiddenSeries,
                    k = b.visible;
                f = (b.visible = a = b.options.visible = b.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                h(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (b[a]) b[a][f]()
                });
                if (d.hoverSeries === b || (d.hoverPoint && d.hoverPoint.series) === b) b.onMouseOut();
                e && d.legend.colorizeItem(b, a);
                b.isDirty = !0;
                b.options.stacking && h(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                h(b.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                g && (d.isDirtyBox = !0);
                !1 !== c && d.redraw();
                n(b, f)
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                n(this, a ? "select" : "unselect")
            },
            drawTracker: L.drawTrackerGraph
        })
    })(M);
    (function (a) {
        var D = a.Chart,
            z = a.each,
            F = a.inArray,
            J = a.isObject,
            m = a.pick,
            f = a.splat;
        D.prototype.setResponsive = function (a) {
            var f = this.options.responsive;
            f && f.rules && z(f.rules, function (f) {
                this.matchResponsiveRule(f, a)
            }, this)
        };
        D.prototype.matchResponsiveRule = function (f, q) {
            var h = this.respRules,
                k = f.condition,
                v;
            v = f.callback || function () {
                return this.chartWidth <= m(k.maxWidth, Number.MAX_VALUE) && this.chartHeight <= m(k.maxHeight, Number.MAX_VALUE) && this.chartWidth >= m(k.minWidth, 0) && this.chartHeight >= m(k.minHeight, 0)
            };
            void 0 === f._id && (f._id =
                a.idCounter++);
            v = v.call(this);
            !h[f._id] && v ? f.chartOptions && (h[f._id] = this.currentOptions(f.chartOptions), this.update(f.chartOptions, q)) : h[f._id] && !v && (this.update(h[f._id], q), delete h[f._id])
        };
        D.prototype.currentOptions = function (a) {
            function h(a, m, d) {
                var g, k;
                for (g in a)
                    if (-1 < F(g, ["series", "xAxis", "yAxis"]))
                        for (a[g] = f(a[g]), d[g] = [], k = 0; k < a[g].length; k++) d[g][k] = {}, h(a[g][k], m[g][k], d[g][k]);
                    else J(a[g]) ? (d[g] = {}, h(a[g], m[g] || {}, d[g])) : d[g] = m[g] || null
            }
            var m = {};
            h(a, this.options, m);
            return m
        }
    })(M);
    return M
});