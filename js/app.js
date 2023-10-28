let app = new Vue({
    el: '#app',
    data: {
        products: [
            {
                id: 1,
                title: 'Smart Watch GST 554',
                subtitle: 'GST Active Edition Space Black',
                old_price: 2999,
                price: 2499,
                image: 'image/smart-watch.png',
            },
            {
                id: 2,
                title: 'Игрушка «Лучшие друзья»',
                subtitle: 'Мягкая игрушка 3+',
                old_price: 1999,
                price: 1299,
                image: 'image/toys.png',
            },
            {
                id: 3,
                title: 'Билеты на Stand Up',
                subtitle: 'Comedy Show 20 июля',
                old_price: 0,
                price: 1499,
                image: 'image/stand-up.png',
            },
            {
                id: 4,
                title: 'Бургер Super King',
                subtitle: 'Говядина, помидор, сырный соус, сыр',
                old_price: 0,
                price: 299,
                image: 'image/burger.png',
            },
            {
                id: 5,
                title: 'Витамины BALANCEIN',
                subtitle: 'Мультивитаминный комплекс 90 табл',
                old_price: 0,
                price: 892,
                image: 'image/vitamin.png',
            },
            {
                id: 6,
                title: 'Курс «Как стать миллионером»',
                subtitle: 'Для тех, кто хочет прокачать мышление',
                old_price: 0,
                price: 2499,
                image: 'image/book.png',
            },
        ],
        cart: [],
        cartIsOpen: false,
        paymentIsOpen: false,
        productBuy: false,
        menuIsOpen: false,
    },
    methods: {
        isExistsInCart(product) {
            return this.cart.find(cartItem => cartItem.product.id === product.id)
        },
        addToCart(product) {
            if (!this.isExistsInCart(product)) {
                this.cart.push({
                    product: product,
                    count: 1
                });
            } else {
                this.removeFromCart(product)
            }
            this.updateCartStorage()
        },
        removeFromCart(product) {
            const index = this.cart.indexOf(this.cart.find(cartItem => cartItem.product.id === product.id));
            if (index > -1) {
                this.cart.splice(index, 1);
                this.updateCartStorage()
            }

            if (!this.cart.length) {
                this.closeCart()
            }
        },
        openCart() {
            if (this.cart.length) {
                this.cartIsOpen = true

                document.body.style.overflow = 'hidden'
            }
        },
        closeCart() {
            this.cartIsOpen = false

            document.body.style.overflow = 'inherit'
        },
        openPayment() {
            this.closeCart()

            if (this.cart.length) {
                this.paymentIsOpen = true
            }

            document.body.style.overflow = 'hidden'
        },
        closePayment() {
            this.paymentIsOpen = false
            this.productBuy = false

            document.body.style.overflow = 'inherit'
        },
        openMenu() {
            this.menuIsOpen = true

            document.body.style.overflow = 'hidden'
        },
        closeMenu() {
            this.menuIsOpen = false

            document.body.style.overflow = 'inherit'
        },
        updateCartStorage()
        {
            localStorage.setItem('app-shop-cart', JSON.stringify(this.cart))
        },
        buy(product) {
            this.productBuy = product
            this.openPayment()
        },
    },

    computed: {
        totalCartSum() {
            return this.cart.reduce(((accumulator, item) => accumulator + item.count * item.product.price), 0)
        },
    },

    created() {
        const cartString = localStorage.getItem('app-shop-cart')

        if (cartString) {
            this.cart = JSON.parse(cartString)
        }
    }
})