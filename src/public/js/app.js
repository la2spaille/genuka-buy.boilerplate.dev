window._M = {
    delay: 700,

    isMobile: matchMedia("(pointer: coarse)").matches,
    scroll: {
        y: 0
    },
    config: {
        serviceWorker: true
    },
    route: {
        "new": {
            "url": location.pathname,
            "page": null
        },
        "old": {
            "url": false,
            "page": false
        }
    },
    e: {
        s: null
    },

    was: []
}
window.M = {}
M.Mo = class {
    constructor(o) {
        M.Bt(this, ['run', 'rRaf', 'uProp'])
        this.r = new M.Raf(this.run)
        this.o = this.init(o)
    }

    init(o) {
        let i = {
            el: M.SelectAll(o.el),
            d: {
                origin: o.d || 0,
                curr: 0
            },
            delay: o.delay || 0,
            cb: o.cb || !1,
            r: o.r || 2,
            e: {
                curve: o.e || "linear"
            },
            prog: 0,
            progE: 0,
            elapsed: 0
        }
        i.el = M.Is.arr(i.el) ? i.el : [i.el]
        i.elL = i.el.length
        i.up = M.Has(o, 'update') ? t => o.update(i) : this.uProp
        let p = o.p || !1
        if (p) {
            i.prop = {}
            i.propLi = []
            let k = Object.keys(p)
            i.propL = k.length
            let n = i.propL
            for (; n--;) {
                const c = k[n]
                i.prop[n] = {
                    name: c,
                    origin: {
                        start: p[c][0],
                        end: p[c][1],
                    },
                    curr: p[c][0],
                    start: p[c][0],
                    end: p[c][1],
                    unit: p[c][2] || '%'
                }
                i.propLi[c.charAt(0)] = n
            }

        }
        return i
    }

    uProp() {
        const p = this.o.prop
        let li = this.o.propLi
        let n = this.o.propL
        for (; n--;) {
            let ob = p[n]


            ob.curr = this.lerp(ob.start, ob.end)

            let x = M.Has(li, 'x') ? p[li.x].curr + p[li.x].unit : 0,
                y = M.Has(li, 'y') ? p[li.y].curr + p[li.y].unit : 0,
                r = M.Has(li, 'r') ? p[li.r].name + '(' + p[li.r].curr + 'deg)' : 0,
                s = M.Has(li, 's') ? p[li.s].name + '(' + p[li.s].curr + ')' : 0,
                xy = x + y === 0 ? 0 : 'translate3d(' + x + ',' + y + ', 0)'
            var t = xy + r + s === 0 ? 0 : [xy, r, s].filter(t => t !== 0).join(" "),
                o = M.Has(li, 'o') ? p[li.o].curr : -1,
                g = M.Has(li, 'g') ? 'grayscale(' + p[li.g].curr + ')' : -1
        }
        n = this.o.elL
        for (; n-- && M.Is.def(this.o.el[n]);) {
            t !== 0 && (this.o.el[n].style.transform = t)
            o >= 0 && (this.o.el[n].style.opacity = o)
            g !== 0 && (this.o.el[n].style.filter = g)
        }
    }

    run(t) {
        if (this.o.prog === 1) {
            this.pause()
            this.o.up()
            this.o.cb && this.o.cb()
        } else {
            this.o.elapsed = M.Clamp(t, 0, this.o.d.curr)
            this.o.prog = M.Clamp(this.o.elapsed / this.o.d.curr, 0, 1)
            this.o.progE = this.o.e.calc(this.o.prog)
            this.o.up()
        }
    }

    update(o) {
        let t = o || {},
            s = M.Has(t, 'reverse') ? "start" : "end"
        if (M.Has(this.o, 'prop')) {
            let n = this.o.propL
            for (; n--;) {
                let p = this.o.prop[n]
                p.end = p.origin[s]
                p.start = p.curr
            }
        }
        this.o.d.curr = t.d ?? M.R(this.o.d.origin - this.o.d.curr + this.o.elapsed)
        this.o.e.curve = t.e || this.o.e.curve
        this.o.e.calc = M.Ease[this.o.e.curve]
        this.o.delay = (M.Has(t, 'delay') ? t : this.o).delay
        this.o.cb = (M.Has(t, 'cb') ? t : this.o).cb
        this.o.prog = this.progE = this.o.d.curr === 0 ? 1 : 0
        this.delay = new M.Delay(this.o.delay, this.rRaf)
    }

    rRaf() {
        this.r.run()
    }

    play(t) {
        this.pause()
        this.update(t)
        this.delay.run()
    }

    pause() {
        this.r.stop()
        this.delay && this.delay.stop()
    }

    lerp(s, e) {
        return M.R(M.Lerp(s, e, this.o.progE), this.o.r)
    }
}
M.TL = class {
    constructor() {
        this.arr = []
        this.delay = 0
    }

    add(o) {
        this.delay += M.Has(o, "delay") ? o.delay : 0
        o.delay = this.delay
        this.arr.push(new M.Mo(o))
        return this
    }

    play(t) {
        this.arr.forEach(el => {
            el.play()
        })
    }
}
M.Raf = class {
    constructor(loop) {
        this.loop = loop
        this.id = this.s = null
        this.on = !1
        M.Bt(this, ['t', 'run', 'stop'])
    }

    run() {
        this.on = !0
        this.s = performance.now()
        this.id = requestAnimationFrame(this.t)
    }

    stop() {
        this.on = !1
        cancelAnimationFrame(this.id)
    }

    t(t) {
        if (!this.on) return
        this.loop(t - this.s)
        this.id = requestAnimationFrame(this.t)
    }
}
M.Delay = class {
    constructor(d, cb) {
        this.d = d
        this.cb = cb
        M.Bt(this, ["loop"])
        this.r = new M.Raf(this.loop)
    }

    run() {
        this.d === 0 ? this.cb() : this.r.run()
    }

    stop() {
        this.r.stop()
    }

    loop(e) {
        let t = M.Clamp(e, 0, this.d)
        if (t === this.d) {
            this.stop()
            this.cb()
        }
    }
}
M.Scope = class {
    constructor(el, r, o) {
        M.Bt(this, ['cb'])
        this.el = M.Select(el)
        this.r = r
        this.o = o
    }

    observe() {
        M.E(document, 'vScroll', this.cb, 'a')
        M.E(document, 'scroll', this.cb, 'a')
        M.E(window, 'load', this.cb, 'a')
    }

    unobserve() {
        M.E(document, 'vScroll', this.cb, 'r')
        M.E(document, 'scroll', this.cb, 'r')
        M.E(window, 'load', this.cb, 'r')
    }

    visible() {
        const r = this.r, h = this.el.offsetHeight
        let t = this.el.getBoundingClientRect().top,
            b = this.el.getBoundingClientRect().bottom,
            vH = (innerHeight - t) / h

        return (vH > r) && (b > 0);

    }



    cb() {
        if (this.visible()) {
            this.o.css && this.cl()
            this.o.cb && this.o.cb()
            this.unobserve()
        }
    }

    cl() {
        this.o.css && M.Cl(this.el, 'r', this.o.css)
    }
}
M.Is = {
    def: t => t !== undefined,
    und: t => t === undefined,
    null: t => t === null,
    str: t => "string" == typeof t,
    obj: t => t === Object(t),
    arr: t => t.constructor === Array,
    img: t => t.tagName === "IMG",
    imgLoad: t => t.complete === true, // A gérer avec un RAF
    interval: (t, inf, sup) => t >= inf && t <= sup
}
M.Ease = {
    linear: t => t,
    cb: t => t ** 3 - 3 * t ** 2 + 3 * t,
    o3: t => (--t) * t * t + 1
}
M.XY = {
    accX: 0, accY: 0, offsetTop: function (el) {
        this.accY = 0
        if (el.offsetParent) {
            this.accY = this.offsetTop(el.offsetParent)
        }
        return el.offsetTop + this.accY
    }, offsetLeft: function (el) {
        this.accX = 0
        if (el.offsetParent) {
            this.accX = this.offsetLeft(el.offsetParent)
        }
        return el.offsetLeft + this.accX
    }
}
M.G = {
    root: r => M.Is.def(r) ? r : document,
    s: (r, t, el) => {
        let l = M.G.root(r)["getElement" + t](el)
        return t === "ById" ? l : Array.from(l)
    },
    id: (el, r) => M.G.s(r, "ById", el),
    class: (el, r) => M.G.s(r, "sByClassName", el),
    tag: (el, r) => M.G.s(r, "sByTagName", el),
    attr: el => document.querySelector(el)
}
M.Pe = {
    f: (t, r) => {
        t.style.pointerEvents = r
    }, all: t => {
        M.Pe.f(t, "all")
    }, none: t => {
        M.Pe.f(t, "none")
    }
}
M.index = (el, arr) => {
    let n = arr.length;
    for (let i = 0; i < n; i++)
        if (el === arr[i])
            return i;
    return -1
}
M.Clamp = (t, inf, sup) => Math.max(inf, Math.min(sup, t))
M.Lerp = (s, e, a) => s * (1 - a) + a * e
M.Has = (t, r) => t.hasOwnProperty(r)
M.Rand = (a, b) => Math.random() * (b - a) + a
M.Fetch = o => {
    let t = "json" === o.type;
    const s = t ? "json" : "text"
        , p = {
        method: t ? "POST" : "GET",
        headers: new Headers({
            "Content-type": t ? "application/x-www-form-urlencoded" : "text/html"
        }),
        mode: "same-origin"
    }
    t && (p.body = o.body)
    fetch(o.url, p)
        .then(r => {
            if (r.ok) return r[s]()
        })
        .then(r => {
            o.success(r)
        })
}
M.PD = t => {
    t.cancelable && t.preventDefault()
}
M.Bt = (t, f) => {
    for (let i = 0; i < f.length; i++) {
        t[f[i]] = t[f[i]].bind(t)
    }
}
M.Select = el => {
    if (!M.Is.str(el)) return el
    let s = el.substring(1),
        c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el)
    if (M.Is.null(c)) return
    c = M.Is.arr(c) ? c : [c]
    return c[0]
}
M.SelectAll = el => {
    if (!M.Is.str(el)) return [el]
    let s = el.substring(1),
        c = el.charAt(0) === "#" ? M.G.id(s) : el.charAt(0) === "." ? M.G.class(s) : M.G.tag(el)
    if (M.Is.null(c)) return
    return M.Is.arr(c) ? c : [c]
}
M.Ga = (t, r) => t.getAttribute(r)
M.T = (t, x, y, u) => {
    u = M.Is.und(u) ? "%" : u
    const xyz = "translate3d(" + x + u + "," + y + u + ",0)"
    let s = t.style
    s['transform'] = xyz
    s['mozTransform'] = xyz
    s['msTransform'] = xyz
}
M.O = (t, r) => {
    t = M.Select(t)
    t.style.opacity = r
}
M.D = (t, r) => {
    r = r === 'n' ? 'none' : 'flex'
    let s = M.Select(t).style
    s['display'] = r
}
M.R = (t, r) => {
    r = M.Is.und(r) ? 100 : 10 ** r
    return Math.round(t * r) / r
}
M.E = (el, e, cb, o) => {
    let s = M.SelectAll(el),
        n = s.length
    o = o === 'r' ? 'remove' : 'add'
    for (let i = 0; i < n; i++) {
        s[i][o + "EventListener"](e, cb)
    }
}
M.De = (from, to, nativeEvent, customEvent, fromEvent) => {
    let a = nativeEvent,
        s = M.Is.arr(a) ? a : [a],
        n = s.length,
        cE = new CustomEvent(customEvent)

    const dE = () => {
        to.dispatchEvent(cE)
    }
    if (fromEvent) {
        for (let i = 0; i < n; i++) {
            M.E(from, s[i], dE)
        }
    } else {
        dE()
    }


}
M.Cl = (el, action, css) => {
    if (M.Is.und(el)) return
    let s = M.SelectAll(el), n = s.length
    action = action === 'a' ? 'add' : action === 'r' ? 'remove' : 'toggle'
    for (let i = 0; i < n; i++) {
        s[i].classList[action](css)
    }
}
M.Cr = el => document.createElement(el)

!function () {
    "use strict"

    class i {
        constructor() {
            this.p = new p
        }

        intro(d = _M.delay) {
            new M.TL()
                .add({
                    el: 'main',
                    p: {o: [0, 1]},
                    e: 'o3',
                    d: 500,
                    delay: 200
                })
                .add({
                    el: '',
                    delay: d,
                    cb: () => M.Cl('.m-intro', 'r', 'm-intro')
                })
                .play()


        }

    }

    class d {
        constructor(o) {
            this.data = o
        }

        get() {
            let t = this.data[_M.route.new.url]
            return M.Is.und(t) ? false : t
        }
    }

    class t {
        constructor() {
            M.Bt(this, ["update", "removeOld", "insertNew", "vLoad","onPopstate"])
            this.l = new l
            this.cache = ''
            this.nL = M.SelectAll('.nav_link')
            this.r = new M.Raf(this.vLoad)
            this.init()
        }

        vLoad() {
            if (document.readyState == 'complete') {
                M.De('', document, '', 'vLoad', false)
                this.r.stop()
            }
        }

        init() {
            var t = _M
            M.Fetch({
                url: location + "?xhr=true",
                type: "html",
                success: r => {
                    r = JSON.parse(r)
                    const c = t.config
                    c.routes = r.routes
                    this.cache = new d(r.cache)
                    this.layer = M.Select('#main')
                }
            })
        }

        update(e) {
            M.PD(e)
            let p = e.target.pathname,
                t = _M,
                r = t.config.routes
            let tg = e.target
            for (let l of this.nL) {
                M.Cl(l.parentNode, 'r', 'active')
            }
            M.Cl(tg.parentNode, 'a', 'active')
            p !== t.route.new.url && this.switch(p)
        }

        c() {
            // l or c (c => CONTROLLER)
            /*
            old opacity remove
            bg let's go
            remove-old /call new with opacity 0
            bg choice then page indicator
            new => opacity 1
            mew => run intro then motion
            */
            this.insertNew()
            let _old = this.layer.children[0],
                _new = this.layer.children[1],
                _i = new i,
                t = _M.e.s
            t.stop()
            let tl = new M.TL()
            tl
                .add({
                    el: _old,
                    p: {o: [1, 0]},
                    d: 400,
                    delay: 400
                })
                .add({
                    el: _new,
                    p: {o: [0, 0]},
                })
                .add({
                    el: _old,
                    cb: () => {
                        this.l.outro()
                        this.removeOld()
                    },
                    delay: 800
                })
                .add({
                    el: _new,
                    cb: () => {
                        this.vLoad()
                        _M.e.b.on()
                        this.l.intro()
                    },
                    delay: 2000
                })
                .add({
                    el: _new,
                    p: {o: [0, 1]},
                    d: 400,
                    cb: () => {
                        t.init()
                        _i.intro()
                        t.run()
                    },
                    delay: 600
                })
                .play()
        }

        insertNew() {
            let N = this.cache.get()
            document.title = N.title
            this.add(N.html)
        }

        removeOld() {
            let O = this.layer.children
            O[0].parentNode.removeChild(O[0])
        }

        e() {
            M.E('a', 'click', this.update)
            M.E(window, 'popstate', this.onPopstate)
        }

        switch(u) {
            const t = _M
            let p = t.config.routes[u]
            t.route.old = t.route.new
            t.route.new = {
                url: u,
                page: p
            }
            history.pushState({path: u}, '', u)
            this.c()
        }

        onPopstate() {
            let p = location.pathname,
                t = _M
            p !== t.route.new.url && this.switch(p)

        }

        add(el) {
            this.layer.insertAdjacentHTML("beforeend", el)
        }

        run() {
            this.e()
            this.vLoad()
        }
    }

    class l {
        constructor() {
            M.Bt(this, ['loop', 'intro', 'outro'])
            this.bg = M.SelectAll('.bg')
            this.r = new M.Raf(this.loop)
            this.init()
            this.intro()
        }

        loop() {
        }

        init() {
        }

        outro() {
        }

        intro() {
        }

        update() {
        }

    }

    class p {
        constructor() {
            M.Bt(this, ['close'])
            this.el = M.Select('.pop_up')
        }

        show() {
            _M.e.s.stop()
            this.run()
        }

        close(e) {

        }

        run() {
            this.e('a')
        }

        e(o) {
        }
    }

    class n {
        constructor() {
            M.Bt(this, ["open", "close"])
        }

        e() {
            M.E(".open_nav", 'click', this.open)
            M.E(".close_nav", 'click', this.close)
        }

        run() {
            this.e()
        }

        open(e) {
            M.Cl(".w-nav_header", 'a', 'is-active')
            M.Cl(".open_nav", 'a', 'is-active')
            M.Cl(".close_nav", 'a', 'is-active')
            e.stopPropagation()
        }

        close(e) {
            M.Cl(".w-nav_header", 'r', 'is-active')
            M.Cl(".open_nav", 'r', 'is-active')
            M.Cl(".close_nav", 'r', 'is-active')
            e.stopPropagation()
        }
    }

    class _n {
        constructor(el) {
            this.id = el.id
            this.run()
        }

        static init() {
            return Array.from(M.SelectAll('._n')).map(
                (el) => {
                    return new _n(el)
                }
            )
        }

        run() {
            this.e('a')
        }

        e(a) {
            let t = _M,
                s = t.e.s,
                id = this.id
            M.E(M.Select("#" + id + "-open"), 'click', (e) => {
                e.stopPropagation()
                s.stop()

                M.Cl(M.Select("#" + id), 'a', "is-active")
                M.Cl(M.Select("#overlay"), 'a', "is-active")
                if (id === 'search') M.Select('#searchInput').focus()
            }, a)
            M.E("." + id + "-close", 'click', (e) => {
                e.stopPropagation()
                s.run()

                M.Cl(M.Select("#" + id), 'r', "is-active")
                M.Cl(M.Select("#overlay"), 'r', "is-active")
            }, a)
        }
    }

    class s {
        constructor() {
            const t = _M
            M.Bt(this, ["w", "key", "tS", "tM", "loop", "resize", "stop", "run"])
            M.De(window, document, ["wheel", "keydown", "touchmove", "mousemove"], "vScroll", true)
            t.scroll = {
                x: 0,
                y: 0,
                deltaX: 0,
                deltaY: 0,
                origin: null,
            }
            this.options = {
                mM: -1,
                tM: -4.5,
                fM: 15,
                kS: 120,
                speed: 0.5,
            }
            this.el = M.Select(".page")
            this.prog = M.Select('.progress')
            this.max = this.scrollY = 0
            this.r = new M.Raf(this.loop)
            this.isScrolling = (Math.abs(this.scrollY - _M.scroll.y) < 0.5)

        }

        update(e) {
            this.setMax()
            const t = _M.scroll
            t.y = M.R(M.Clamp(t.y + t.deltaY, 0, this.max), 0)
            t.originalEvent = e
        }

        loop() {
            const t = _M.scroll
            this.scrollY = M.R(M.Lerp(this.scrollY, t.y, 0.1), 2)
            M.T(this.prog, (this.scrollY / this.max - 1) * 100, 0, '%')
            M.T(this.el, 0, -1 * this.scrollY, 'px')
            this.r.on && (Math.abs(this.scrollY - t.y) < 0.5) && this.r.stop()
        }

        w(e) {
            const t = _M.scroll
            t.deltaX = e.deltaX * -1 * .556
            t.deltaY = e.deltaY * -1 * .556
            t.deltaX *= this.options.mM
            t.deltaY *= this.options.mM
            this.update(e)
        }

        key(e) {
            const t = _M.scroll
            t.deltaX = t.deltaY = 0
            let key = [
                    {c: 37, d: 'x', s: -1},
                    {c: 39, d: 'x', s: 1},
                    {c: 38, d: 'y', s: -1},
                    {c: 40, d: 'y', s: 1},
                    {c: 32, d: 'y', s: 2}
                ],
                n = key.length
            for (let i = 0; i < n; i++) {
                if (e.keyCode === key[i].c) {
                    t[key[i].d === "x" ? "deltaX" : "deltaY"] = this.options.kS * key[i].s
                }
            }
            (t.deltaX || t.deltaY) && this.update(e)
        }

        setMax() {
            let s = M.Select(".page")
            this.max = s.offsetHeight
            this.max -= innerHeight
        }

        resize(e) {
            this.setMax()
            const t = _M.scroll
            t.y = M.R(M.Clamp(t.y, 0, this.max), 0)
            t.originalEvent = e
            this.max || this.init()
            this.max || this.r.on || this.r.run()
            M.De('', document, '', "vScroll", false)

        }

        init() {
            M.T(this.prog, -100, 0, '%')
        }

        tS(e) {
            let T = (e.targetTouches) ? e.targetTouches[0] : e
            this.tsX = T.pageX
            this.tsY = T.pageY
        }

        tM(e) {
            const t = _M
            let T = (e.targetTouches) ? e.targetTouches[0] : e
            t.scroll.deltaX = (T.pageX - this.tsX) * this.options.tM
            t.scroll.deltaY = (T.pageY - this.tsY) * this.options.tM
            this.tsX = T.pageX
            this.tsY = T.pageY
            this.update(e)
        }

        e(o) {
            M.E(document, "wheel", this.w, o)
            M.E(document, "touchstart", this.tS, o)
            M.E(document, "touchmove", this.tM, o)
            M.E(window, "resize", this.resize, o)
            M.E(window, "orientationchange", this.resize, o)
            M.E(document, "vScroll", () => this.r.on || this.r.run(), o)
        }

        run() {
            let _ = _M
            _.isMobile || this.e('a')
            _.isMobile && (document.body.style.overflow = "scroll")
        }

        stop() {
            let _ = _M
            _.isMobile || this.e('r')
            _.isMobile && (document.body.style.overflow = "hidden")
        }

        scrollTo(y) {
            let _ = _M
            _.isMobile && scrollTo(0, y)
            _.isMobile || (_.scroll.y = y)
            _.isMobile || M.De('', document, '', "vScroll", false)

        }
    }

    class _s {
        constructor() {
        }

        run() {
            let b = M.G.class("_s--text"), m = b.length
            for (let i = 0; i < m; i++) {
                new M.Scope(
                    b[i], 1, {
                        cb: () => {
                            let mo = new M.Mo({
                                el: b[i],
                                p: {y: [105, 0, '%']},
                                d: .7 * 1000,
                                e: 'o3'
                            })
                            mo.play()
                        }
                    }).observe()

            }
            let c = M.G.class("_s--o"), o = c.length
            for (let i = 0; i < o; i++) {
                new M.Scope(c[i], 0.7, {
                    cb: () => {
                        let mo = new M.Mo({
                            el: c[i],
                            p: {o: [0, 1]},
                            d: .7 * 1000,
                            delay: .25 * 1000,
                            e: 'o3'
                        })
                        mo.play()
                    }
                }).observe()
            }
        }
    }

    class __s {
        // todo stickyyyy
        constructor(el) {
            M.Bt(this, ['loop','cb'])
            this.el = el
            this.scrollY = 0
            this.options = this.el.dataset.options
            this.r = new M.Raf(this.loop)
            this.s = new M.Scope(el,0.1)
            this.run()
        }

        static init() {
            return Array.from(M.SelectAll('.__s')).map(
                (el) => {
                    return new __s(el)
                }
            )
        }
        cb() {
            this.s.visible() && (this.r.on || this.r.run())
            this.s.visible() || (this.r.on && this.r.stop())
        }

        e(o) {
            this.r.on || this.r.run()
            M.E(document, "vScroll", this.cb, o)

        }

        run() {

            this.e('a')
        }
        stop() {
            this.e('r')
        }

        loop() {
            let s = _M.e.s.scrollY + innerHeight / 2,
                el = this.el,
                c = M.XY.offsetTop(el) + el.offsetHeight / 2,
                d = (c - s),
                o = JSON.parse(this.options)
            d = (d<0) ? d : o.c ? 0 :d
            M.T(el,0, -1 * o.s * d, 'px')
        }
    }

    class b {
        constructor() {
            M.Bt(this, ['on'])
            this.i = new i
            this.l = new l
            this.n = new n
            this._s = new _s
            this.t = new t
            this.on()
        }

        _init() {
            let _ = _M
            _.e.s = new s

        }

        init() {
            const _ = _M
            _.e.s.init()
            _n.init()
            !_M.isMobile && __s.init()
        }

        intro() {
            let _ = _M
            this.i.intro()

        }

        run() {
            const _ = _M
            _.e.s.run()
            this.n.run()
            this._s.run()
            this.t.run()

        }

        on() {
            this._init()
            this.init()
            this.intro()
            this.run()
        }

    }

    (_M.e.b = new b)

    console.log('\n %c Made with ❤️ by La2spaille  %c \n ', 'border: 1px solid #000;color: #fff; background: #000; padding:5px 0;', '')
}()