

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =========================================
           CURRENT CELEBRITY
        ========================================== */

        const merchParams =
            new URLSearchParams(
                window.location.search
            );

        const celebrityId =
            merchParams.get("celebrity") ||
            localStorage.getItem(
                "selectedCelebrity"
            ) ||
            "steve-perry";


        const celebrity =
            typeof celebrities !== "undefined"
                ? celebrities[celebrityId]
                : null;


        const celebrityName =
            celebrity
                ? celebrity.name
                : "Steve Perry";


        /* =========================================
           DOM ELEMENTS
        ========================================== */

        const productGrid =
            document.getElementById(
                "merchProductGrid"
            );

        const celebrityNameElement =
            document.getElementById(
                "merchCelebrityName"
            );

        const heroDescription =
            document.getElementById(
                "merchHeroDescription"
            );

        const merchandiseIntro =
            document.getElementById(
                "merchandiseIntro"
            );

        const cartCount =
            document.getElementById(
                "cartCount"
            );

        const cartDrawer =
            document.getElementById(
                "cartDrawer"
            );

        const cartOverlay =
            document.getElementById(
                "cartOverlay"
            );

        const cartItems =
            document.getElementById(
                "cartItems"
            );

        const cartTotal =
            document.getElementById(
                "cartTotal"
            );

        const productModal =
            document.getElementById(
                "productModal"
            );


        /* =========================================
           UPDATE CELEBRITY TEXT
        ========================================== */

        if (celebrityNameElement) {

            celebrityNameElement.textContent =
                celebrityName;

        }


        if (heroDescription) {

            heroDescription.textContent =
                `Discover exclusive ${celebrityName} merchandise created for fans who want to carry the experience with them.`;

        }


        if (merchandiseIntro) {

            merchandiseIntro.textContent =
                `Explore a curated collection inspired by ${celebrityName}'s world, style and unforgettable moments.`;

        }


        if (celebrity) {

            document.title =
                `${celebrityName} Merchandise | THE EXPERIENCE`;

        }


        /* =========================================
           PRODUCT DATA
        ========================================== */

        const merchandise = [

            {
                id: "signature-tee",
                name:
                    `${celebrityName} Street Talk Album T-Shirt`,
                category: "shirts",
                price: 85,
                image:
                    `images/${celebrityId}-merch-tee.jpg`,
                badge: "Bestseller",
                description:
                    `A premium fan collection T-shirt inspired by ${celebrityName}. Designed for everyday wear with a clean signature-inspired graphic.`,
                sizes: true
            },

            {
                id: "classic-hoodie",
                name:
                    `${celebrityName} Classic Hoodie`,
                category: "hoodies",
                price: 105,
                image:
                    `images/${celebrityId}-merch-hoodie.jpg`,
                badge: "",
                description:
                    `A premium heavyweight-style hoodie created for fans who want a comfortable statement piece.`,
                sizes: true
            },

            {
                id: "signature-cap",
                name:
                    `${celebrityName} Crewneck Sweatshirt`,
                category: "sweatshirt",
                price: 98,
                image:
                    `images/${celebrityId}-merch-cap.jpg`,
                badge: "",
                description:
                    `A classic structured cap featuring an elegant signature-inspired design.`,
                sizes: false
            },

            {
                id: "limited-tee",
                name:
                    `${celebrityName} Limited Edition Tee`,
                category: "limited",
                price: 98,
                image:
                    `images/${celebrityId}-limited-tee.jpg`,
                badge: "Limited",
                description:
                    `A limited collection T-shirt designed for collectors and dedicated fans.`,
                sizes: true
            },

            {
                id: "fan-hoodie",
                name:
                    `${celebrityName} Retro Crewneck Sweatshirt`,
                category: "sweatshirt",
                price: 100,
                image:
                    `images/${celebrityId}-fan-hoodie.jpg`,
                badge: "Exclusive",
                description:
                    `An elevated hoodie from the exclusive fan collection.`,
                sizes: true
            },

            {
                id: "collector-poster",
                name:
                    `${celebrityName} Season Holiday Ornament`,
                category: "accessories",
                price: 50,
                image:
                    `images/${celebrityId}-poster.jpg`,
                badge: "Collector",
                description:
                    `A premium collector poster created as a statement piece for your personal collection.`,
                sizes: false
            }

        ];


        /* =========================================
           CART
        ========================================== */

        let cart = [];


        /* =========================================
           RENDER PRODUCTS
        ========================================== */

        function renderProducts(
            category = "all"
        ) {

            if (!productGrid) {
                return;
            }


            const filteredProducts =
                category === "all"
                    ? merchandise
                    : merchandise.filter(
                        product =>
                            product.category ===
                            category
                    );


            productGrid.innerHTML = "";


            filteredProducts.forEach(
                product => {

                    const card =
                        document.createElement(
                            "article"
                        );

                    card.className =
                        "merch-product-card";


                    card.innerHTML = `

                        <div class="merch-product-image">

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                                loading="lazy"
                                onerror="this.style.opacity='0.15'"
                            >

                            ${
                                product.badge
                                    ? `
                                        <span class="merch-product-badge">
                                            ${product.badge}
                                        </span>
                                    `
                                    : ""
                            }

                        </div>


                        <div class="merch-product-info">

                            <div class="merch-product-category">
                                ${getCategoryName(product.category)}
                            </div>

                            <h3 class="merch-product-name">
                                ${product.name}
                            </h3>

                            <div class="merch-product-bottom">

                                <span class="merch-product-price">
                                    $${product.price.toLocaleString()}
                                </span>

                                <button
                                    type="button"
                                    class="view-product-button"
                                    data-product="${product.id}"
                                >
                                    View Product
                                </button>

                            </div>

                        </div>

                    `;


                    productGrid.appendChild(
                        card
                    );

                }
            );

        }


        /* =========================================
           CATEGORY NAME
        ========================================== */

        function getCategoryName(
            category
        ) {

            const names = {

                shirts:
                    "T-Shirts",

                hoodies:
                    "Hoodies",

                sweatshirt:
                    "sweatshirt",

                accessories:
                    "Accessories",

                limited:
                    "Limited Edition"

            };

            return (
                names[category] ||
                "Collection"
            );

        }


        renderProducts();


        /* =========================================
           FILTERS
        ========================================== */

        const filters =
            document.querySelectorAll(
                ".merch-filter"
            );


        filters.forEach(
            filter => {

                filter.addEventListener(
                    "click",
                    function () {

                        filters.forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                        this.classList.add(
                            "active"
                        );


                        renderProducts(
                            this.dataset.category
                        );

                    }
                );

            }
        );


        /* =========================================
           PRODUCT MODAL
        ========================================== */

        let selectedProduct =
            null;

        let selectedSize =
            "M";

        let selectedQuantity =
            1;


        const modalImage =
            document.getElementById(
                "modalProductImage"
            );

        const modalCategory =
            document.getElementById(
                "modalProductCategory"
            );

        const modalName =
            document.getElementById(
                "modalProductName"
            );

        const modalPrice =
            document.getElementById(
                "modalProductPrice"
            );

        const modalDescription =
            document.getElementById(
                "modalProductDescription"
            );

        const modalQuantity =
            document.getElementById(
                "modalQuantity"
            );


        function openProduct(
            product
        ) {

            selectedProduct =
                product;

            selectedQuantity =
                1;

            selectedSize =
                "M";


            if (modalImage) {

                modalImage.src =
                    product.image;

                modalImage.alt =
                    product.name;

            }


            if (modalCategory) {

                modalCategory.textContent =
                    getCategoryName(
                        product.category
                    );

            }


            if (modalName) {

                modalName.textContent =
                    product.name;

            }


            if (modalPrice) {

                modalPrice.textContent =
                    `$${product.price.toLocaleString()}`;

            }


            if (modalDescription) {

                modalDescription.textContent =
                    product.description;

            }


            if (modalQuantity) {

                modalQuantity.textContent =
                    selectedQuantity;

            }


            const sizeButtons =
                document.querySelectorAll(
                    ".size-options button"
                );


            sizeButtons.forEach(
                button => {

                    button.classList.remove(
                        "active"
                    );

                    if (
                        button.dataset.size ===
                        selectedSize
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }

                }
            );


            const sizeSelector =
                document.getElementById(
                    "sizeSelector"
                );


            if (sizeSelector) {

                sizeSelector.style.display =
                    product.sizes
                        ? "block"
                        : "none";

            }


            if (productModal) {

                productModal.classList.add(
                    "open"
                );

                document.body.style.overflow =
                    "hidden";

            }

        }


        /* =========================================
           PRODUCT BUTTONS
        ========================================== */

        if (productGrid) {

            productGrid.addEventListener(
                "click",
                function (event) {

                    const button =
                        event.target.closest(
                            ".view-product-button"
                        );


                    if (!button) {
                        return;
                    }


                    const product =
                        merchandise.find(
                            item =>
                                item.id ===
                                button.dataset.product
                        );


                    if (product) {

                        openProduct(
                            product
                        );

                    }

                }
            );

        }


        /* =========================================
           SIZE SELECTION
        ========================================== */

        document
            .querySelectorAll(
                ".size-options button"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        function () {

                            selectedSize =
                                this.dataset.size;


                            document
                                .querySelectorAll(
                                    ".size-options button"
                                )
                                .forEach(
                                    item =>
                                        item.classList.remove(
                                            "active"
                                        )
                                );


                            this.classList.add(
                                "active"
                            );

                        }
                    );

                }
            );


        /* =========================================
           QUANTITY
        ========================================== */

        const decreaseQuantity =
            document.getElementById(
                "decreaseQuantity"
            );

        const increaseQuantity =
            document.getElementById(
                "increaseQuantity"
            );


        if (decreaseQuantity) {

            decreaseQuantity.addEventListener(
                "click",
                function () {

                    if (
                        selectedQuantity >
                        1
                    ) {

                        selectedQuantity--;

                        if (modalQuantity) {

                            modalQuantity.textContent =
                                selectedQuantity;

                        }

                    }

                }
            );

        }


        if (increaseQuantity) {

            increaseQuantity.addEventListener(
                "click",
                function () {

                    selectedQuantity++;

                    if (modalQuantity) {

                        modalQuantity.textContent =
                            selectedQuantity;

                    }

                }
            );

        }


        /* =========================================
           ADD TO CART
        ========================================== */

        const modalAddToCart =
            document.getElementById(
                "modalAddToCart"
            );


        if (modalAddToCart) {

            modalAddToCart.addEventListener(
                "click",
                function () {

                    if (!selectedProduct) {
                        return;
                    }


                    const existingItem =
                        cart.find(
                            item =>
                                item.id ===
                                    selectedProduct.id &&
                                item.size ===
                                    selectedSize
                        );


                    if (existingItem) {

                        existingItem.quantity +=
                            selectedQuantity;

                    }

                    else {

                        cart.push({

                            id:
                                selectedProduct.id,

                            name:
                                selectedProduct.name,

                            price:
                                selectedProduct.price,

                            image:
                                selectedProduct.image,

                            size:
                                selectedProduct.sizes
                                    ? selectedSize
                                    : "One Size",

                            quantity:
                                selectedQuantity

                        });

                    }


                    updateCart();


                    closeProduct();


                    openCart();

                }
            );

        }


        /* =========================================
           UPDATE CART
        ========================================== */

        function updateCart() {

            const totalItems =
                cart.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        item.quantity,
                    0
                );


            const totalPrice =
                cart.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        (
                            item.price *
                            item.quantity
                        ),
                    0
                );


            if (cartCount) {

                cartCount.textContent =
                    totalItems;

            }


            if (cartTotal) {

                cartTotal.textContent =
                    `$${totalPrice.toLocaleString()}`;

            }


            if (!cartItems) {
                return;
            }


            if (cart.length === 0) {

                cartItems.innerHTML = `

                    <div class="empty-cart">

                        <p>
                            Your shopping bag is empty.
                        </p>

                    </div>

                `;

                return;

            }


            cartItems.innerHTML = "";


            cart.forEach(
                (
                    item,
                    index
                ) => {

                    const cartItem =
                        document.createElement(
                            "div"
                        );

                    cartItem.className =
                        "cart-item";


                    cartItem.innerHTML = `

                        <img
                            class="cart-item-image"
                            src="${item.image}"
                            alt="${item.name}"
                        >

                        <div>

                            <h3 class="cart-item-name">
                                ${item.name}
                            </h3>

                            <div class="cart-item-meta">
                                Size: ${item.size}
                                · Qty: ${item.quantity}
                            </div>

                            <button
                                type="button"
                                class="remove-cart-item"
                                data-index="${index}"
                            >
                                Remove
                            </button>

                        </div>

                        <span class="cart-item-price">
                            $${(
                                item.price *
                                item.quantity
                            ).toLocaleString()}
                        </span>

                    `;


                    cartItems.appendChild(
                        cartItem
                    );

                }
            );

        }


        updateCart();


        /* =========================================
           REMOVE CART ITEMS
        ========================================== */

        if (cartItems) {

            cartItems.addEventListener(
                "click",
                function (event) {

                    const button =
                        event.target.closest(
                            ".remove-cart-item"
                        );


                    if (!button) {
                        return;
                    }


                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart.splice(
                        index,
                        1
                    );


                    updateCart();

                }
            );

        }


        /* =========================================
           CART OPEN / CLOSE
        ========================================== */

        function openCart() {

            if (!cartDrawer) {
                return;
            }


            cartDrawer.classList.add(
                "open"
            );

            cartOverlay.classList.add(
                "open"
            );

            cartDrawer.setAttribute(
                "aria-hidden",
                "false"
            );

        }


        function closeCart() {

            if (!cartDrawer) {
                return;
            }


            cartDrawer.classList.remove(
                "open"
            );

            cartOverlay.classList.remove(
                "open"
            );

            cartDrawer.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        const openCartButton =
            document.getElementById(
                "openCart"
            );

        const closeCartButton =
            document.getElementById(
                "closeCart"
            );


        if (openCartButton) {

            openCartButton.addEventListener(
                "click",
                openCart
            );

        }


        if (closeCartButton) {

            closeCartButton.addEventListener(
                "click",
                closeCart
            );

        }


        if (cartOverlay) {

            cartOverlay.addEventListener(
                "click",
                closeCart
            );

        }


        /* =========================================
           CLOSE PRODUCT MODAL
        ========================================== */

        function closeProduct() {

            if (productModal) {

                productModal.classList.remove(
                    "open"
                );

                document.body.style.overflow =
                    "";

            }

        }


        const closeProductButton =
            document.getElementById(
                "closeProductModal"
            );

        const modalBackdrop =
            document.getElementById(
                "productModalBackdrop"
            );


        if (closeProductButton) {

            closeProductButton.addEventListener(
                "click",
                closeProduct
            );

        }


        if (modalBackdrop) {

            modalBackdrop.addEventListener(
                "click",
                closeProduct
            );

        }


        /* =========================================
           CHECKOUT
        ========================================== */

        // const checkoutButton =
        //     document.getElementById(
        //         "checkoutButton"
        //     );


        // if (checkoutButton) {

        //     checkoutButton.addEventListener(
        //         "click",
        //         function () {

        //             if (
        //                 cart.length === 0
        //             ) {

        //                 alert(
        //                     "Your shopping bag is empty."
        //                 );

        //                 return;

        //             }


        //             alert(
        //                 "Checkout is being prepared. Connect your preferred payment provider here."
        //             );

        //         }
        //     );

        // }


        /* =========================================
   MERCHANDISE CHECKOUT
   EMAIL + TAWK CUSTOMER SUPPORT
========================================= */

const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        async function () {

            /* -----------------------------------------
               CHECK CART
            ----------------------------------------- */

            if (cart.length === 0) {

                alert(
                    "Your shopping bag is empty."
                );

                return;

            }


            /* -----------------------------------------
               CALCULATE TOTAL
            ----------------------------------------- */

            const totalPrice =
                cart.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        (
                            item.price *
                            item.quantity
                        ),
                    0
                );


            /* -----------------------------------------
               CREATE PRODUCT DETAILS
            ----------------------------------------- */

            let merchandiseDetails = "";


            cart.forEach(
                (
                    item,
                    index
                ) => {

                    merchandiseDetails +=
                        `${index + 1}. ${item.name}\n` +
                        `   Size: ${item.size}\n` +
                        `   Quantity: ${item.quantity}\n` +
                        `   Unit Price: $${item.price.toLocaleString()}\n` +
                        `   Item Total: $${(
                            item.price *
                            item.quantity
                        ).toLocaleString()}\n\n`;

                }
            );


            /* -----------------------------------------
               EMAIL CONTENT
            ----------------------------------------- */

            const emailMessage = `

NEW MERCHANDISE CHECKOUT REQUEST

========================================

CELEBRITY
${celebrityName}

========================================

MERCHANDISE ORDER

${merchandiseDetails}

========================================

ORDER SUMMARY

Subtotal:
$${totalPrice.toLocaleString()}

Number of Products:
${cart.reduce(
    (total, item) =>
        total + item.quantity,
    0
)}

========================================

CUSTOMER SUPPORT

The customer has been directed to
Tawk.to customer support to continue
with their checkout and payment assistance.

========================================

This merchandise request was submitted
through THE EXPERIENCE website.

`;


            /* -----------------------------------------
               CHANGE BUTTON STATE
            ----------------------------------------- */

            const originalButtonText =
                checkoutButton.textContent;


            checkoutButton.disabled =
                true;


            checkoutButton.textContent =
                "Sending Order Details...";


            try {

                /* -----------------------------------------
                   WEB3FORMS
                ----------------------------------------- */

                const formData =
                    new FormData();


                formData.append(
                    "access_key",
                    "706b76aa-3212-4584-9b8a-b632feed9dc4"
                );


                formData.append(
                    "subject",
                    `New ${celebrityName} Merchandise Order`
                );


                formData.append(
                    "from_name",
                    "THE EXPERIENCE Merchandise"
                );


                formData.append(
                    "celebrity",
                    celebrityName
                );


                formData.append(
                    "order_subtotal",
                    `$${totalPrice.toLocaleString()}`
                );


                formData.append(
                    "product_count",
                    cart.reduce(
                        (
                            total,
                            item
                        ) =>
                            total +
                            item.quantity,
                        0
                    )
                );


                formData.append(
                    "merchandise_details",
                    merchandiseDetails
                );


                formData.append(
                    "message",
                    emailMessage
                );


                /* -----------------------------------------
                   SEND TO WEB3FORMS
                ----------------------------------------- */

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                if (
                    response.ok &&
                    result.success
                ) {

                    checkoutButton.textContent =
                        "Order Details Sent ✓";


                    /*
                     * Give Web3Forms a moment to finish
                     * before opening customer support.
                     */

                    setTimeout(
                        function () {

                            if (
                                typeof Tawk_API !==
                                    "undefined" &&
                                typeof Tawk_API.maximize ===
                                    "function"
                            ) {

                                Tawk_API.maximize();

                            } else {

                                alert(
                                    "Your order details have been sent. Customer support is currently loading."
                                );

                            }

                        },
                        500
                    );


                }

                /* -----------------------------------------
                   WEB3FORMS ERROR
                ----------------------------------------- */

                else {

                    console.error(
                        "Web3Forms error:",
                        result
                    );


                    alert(
                        "We couldn't send your order details right now. Please try again."
                    );


                    checkoutButton.disabled =
                        false;


                    checkoutButton.textContent =
                        originalButtonText;

                }


            }

            /* -----------------------------------------
               NETWORK ERROR
            ----------------------------------------- */

            catch (error) {

                console.error(
                    "Merchandise checkout error:",
                    error
                );


                alert(
                    "Something went wrong while sending your order. Please try again."
                );


                checkoutButton.disabled =
                    false;


                checkoutButton.textContent =
                    originalButtonText;

            }

        }
    );

}


        /* =========================================
           TAWK CONTACT
        ========================================== */

        const contactTawk =
            document.getElementById(
                "merchContactTawk"
            );


        if (contactTawk) {

            contactTawk.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    if (
                        typeof Tawk_API !==
                            "undefined" &&
                        typeof Tawk_API.maximize ===
                            "function"
                    ) {

                        Tawk_API.maximize();

                    }

                }
            );

        }


        /* =========================================
           MOBILE MENU
        ========================================== */

        // const menuToggle =
        //     document.getElementById(
        //         "menuToggle"
        //     );

        // const navLinks =
        //     document.querySelector(
        //         ".nav-links"
        //     );


        // if (
        //     menuToggle &&
        //     navLinks
        // ) {

        //     menuToggle.addEventListener(
        //         "click",
        //         function () {

        //             navLinks.classList.toggle(
        //                 "mobile-open"
        //             );

        //         }
        //     );

        // }


        /* =========================================
           UPDATE CELEBRITY LINKS
        ========================================== */

        const query =
            `?celebrity=${encodeURIComponent(
                celebrityId
            )}`;


        const profileLink =
            document.querySelector(
                ".merch-profile-link"
            );

        const packagesLink =
            document.querySelector(
                ".merch-packages-link"
            );

        const donateLink =
            document.querySelector(
                ".merch-donate-link"
            );


        if (profileLink) {

            profileLink.href =
                `profile.html${query}`;

        }


        if (packagesLink) {

            packagesLink.href =
                `packages.html${query}`;

        }


        if (donateLink) {

            donateLink.href =
                `donate.html${query}`;

        }

    }
);