window.S = {}
S.in = t => location.href.includes(t)
!function () {
    "use strict"
    let host = ""

    class a {
        constructor() {
            M.Bt(this, ['_'])
            this.el = M.Select('#alert')
        }

        _() {

        }
    }

    class c {
        constructor() {
            M.Bt(this, ['add', 'upd', 'rm', 's_qty'])
            this.n = new n
        }

        c() {

        }
        renderItems(r) {
        }

        numberFormat(n, e) {
            let a = n.toString(), m = a.length
            a = a.split("")
            n = ''
            for (let i = 0; i < m; i++) {
                if (i == m - 2) n += ","
                n += a[i]
            }
            n += e
            return n
        }

        add(e) {

        }

        upd(e) {
        }

        rm(e) {
        }
        s_qty(e) {
        }

        run() {
            this.e()
        }

        e() {
            M.E(".cta-atc", 'click', this.add, 'a')
            M.E(".cta-sq", 'click', this.s_qty, 'a')
        }

    }

    class f {
        constructor() {
            M.Bt(this, ['apply', 'set_limit', 'set_orderby', 'set_categories', 'set_page'])
            this.t = 0
            this.el = {
                cat: M.SelectAll(".setCategory"),
                t: M.G.id("x-wp-total"),
                ul_p: M.G.id("ul-pagination")
            }
            this.d = {
                pp: 12,
                p: 1,
                c: 'promos',
                cId: 96,
                o: 'asc',
                ob: 'title'
            }
            this.c = new c
        }

        _init() {
        }

        init() {
        }

        set_limit(e) {
        }

        set_page(e) {
        }

        set_categories(e) {
        }

        set_orderby(e) {
        }

        apply() {
        }
        run() {
            this.e()
        }

        e() {
            M.E(".opt-OrderBy", 'click', this.set_orderby, 'a')
            M.E(".opt-Limit", 'click', this.set_limit, 'a')
            M.E(".setCategory", 'click', this.set_categories, 'a')
            M.E(".cta-f", 'click', () => {
                M.O("#product_list", "0.5")
            }, 'a')
        }
    }

    class s {
        constructor() {
            M.Bt(this, ['open', 'close'])

        }

        run() {
            this.e()
        }

        close(e) {
            M.Cl('.opt_open', 'r', 'opt_open')
        }

        open(e) {
            e.stopPropagation()
            let a = M.SelectAll('.opt_open'),
                id = e.target.id,
                el = M.Select('#' + id + 'Options'),
                i = M.index(el, a),
                j = i == 0 ? 1 : 0
            M.Cl(a[j], 'r', 'opt_open')
            M.Cl(el, 't', 'opt_open')
        }

        e() {
            M.E('.c-select', 'click', this.open, 'a')
            M.E(document, 'click', this.close, 'a')
        }


    }

    class g {
        constructor() {
            M.Bt(this, ['cb'])
            this.a = M.SelectAll('._g')
            this.c = M.SelectAll(".product_image")
            this.curr = 0

        }
        init() {


        }

        run() {
            if (this.a.length === 0) return
            this.e('a')
        }


        cb(e) {
            e.stopPropagation()
            if(this.curr == M.index(e.target,this.a)) return
            this.e('r')
            let el = e.target,
                a = this.a,
                c = this.c,
                n = a.length,
                I = M.index(el,a)
            for(let i =0; i<n; i++) {
                M.O(a[i],1)
            }
            M.O(el,0.5)
            console.log(this.c)
            c[I].style.zIndex ="0"
            c[this.curr].style.transition ="all 1.5s var(--cb) , z-index 0s ease "

            M.Cl(c[this.curr],'a','is_inactive')
            new M.TL()
                .add({
                el:'',
                cb: ()=> {
                    c[I].style.zIndex ="1"
                    c[this.curr].style.transition ="0s"
                    c[this.curr].style.zIndex ="-1"
                    M.Cl(c[this.curr],'r','is_inactive')
                    this.e('a')
                    this.curr = I
                },
                delay:1500
            }).play()

        }

        e(a) {
            M.E('._g', 'click', this.cb, a)
        }

    }

    class b {
        constructor() {
            this.cart = new c
            this.filter = new f
            this.select = new s
            this.gallery = new g
            this.on()
        }

        init() {

        }

        run() {
        }

        on() {
            this.init()
            this.run()
        }
    }

    (new b)
}()
