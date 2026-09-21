
/* =================================
   MOBILE MENU
================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-open");

    });

}


/* =================================
   SMOOTH SCROLLING
================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =================================
   SCROLL REVEAL
================================= */

const revealElements = document.querySelectorAll(
    ".experience-card, .package-card, .about-content, .about-image"
);

if (revealElements.length) {

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


/* =================================
   PACKAGE AUTO-SELECTION
================================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const selectedPackage = urlParams.get("package");

const packageSelect = document.getElementById("package");

if (selectedPackage && packageSelect) {

    packageSelect.value = selectedPackage;

}


/* =================================
   BOOKING FORM
================================= */

const bookingForm = document.getElementById("bookingForm");

const formMessage = document.getElementById("formMessage");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const firstName =
            document.getElementById("firstName").value;

        const selectedExperience =
            document.getElementById("package").value;


        if (!selectedExperience) {

            formMessage.style.display = "block";

            formMessage.textContent =
                "Please select a meet & greet experience.";

            return;

        }


        formMessage.style.display = "block";

        formMessage.textContent =
            `Thank you, ${firstName}. Your ${selectedExperience} experience request has been received. Our team will review your request and contact you with the next steps.`;


        bookingForm.reset();

    });

}


/* =================================
   DONATION PAGE
================================= */

const amountButtons =
    document.querySelectorAll(".amount-button");

const customAmount =
    document.getElementById("customAmount");

const selectedAmount =
    document.getElementById("selectedAmount");


let donationAmount = 0;


/* PRESET AMOUNTS */

amountButtons.forEach(button => {

    button.addEventListener("click", () => {

        amountButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        donationAmount =
            Number(button.dataset.amount);

        if (customAmount) {
            customAmount.value = "";
        }

        updateDonationAmount();

    });

});


/* CUSTOM AMOUNT */

if (customAmount) {

    customAmount.addEventListener("input", () => {

        amountButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        donationAmount =
            Number(customAmount.value);

        updateDonationAmount();

    });

}


/* DISPLAY AMOUNT */

function updateDonationAmount() {

    if (selectedAmount) {

        selectedAmount.textContent =
            "$" + donationAmount.toLocaleString();

    }

}


/* CONTINUE TO PAYMENT */

const continueDonation = document.getElementById("continueDonation");
const directPaymentSection = document.getElementById("directPaymentSection");
const paymentAmount = document.getElementById("paymentAmount");

if (continueDonation) {

    continueDonation.addEventListener("click", () => {

        if (!donationAmount || donationAmount <= 0) {
            alert("Please select or enter a donation amount first.");
            return;
        }

        const formattedAmount =
            "$" + donationAmount.toLocaleString();

        if (paymentAmount) {
            paymentAmount.textContent = formattedAmount;
        }

        // Update Card, Crypto and Bank amounts
        updatePaymentMethodAmounts();

        if (directPaymentSection) {

            directPaymentSection.classList.add("show-payment");

            setTimeout(() => {

                directPaymentSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);
        }

    });

}


/* =================================
   COPY CRYPTO WALLET
================================= */

const copyWallet =
    document.getElementById("copyWallet");

const walletAddress =
    document.getElementById("walletAddress");


if (copyWallet && walletAddress) {

    copyWallet.addEventListener("click", async () => {

        const address =
            walletAddress.textContent.trim();

        try {

            await navigator.clipboard.writeText(address);

            copyWallet.textContent = "Copied!";

            setTimeout(() => {

                copyWallet.textContent = "Copy";

            }, 2000);

        } catch (error) {

            alert(
                "Please copy the wallet address manually."
            );

        }

    });

}


/* =================================
   CRYPTO TABS
================================= */

const cryptoTabs =
    document.querySelectorAll(".crypto-tab");

if (cryptoTabs.length) {

    cryptoTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            cryptoTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");


            const crypto =
                tab.dataset.crypto;


            const wallet =
                document.getElementById("walletAddress");


            const qr =
                document.getElementById("cryptoQR");


            /*
                Replace these placeholder values with
                the verified campaign wallet addresses
                and corresponding QR images.
            */

            const wallets = {

                btc:
                    "YOUR_VERIFIED_BTC_WALLET_ADDRESS",

                eth:
                    "YOUR_VERIFIED_ETH_WALLET_ADDRESS",

                usdt:
                    "YOUR_VERIFIED_USDT_WALLET_ADDRESS"

            };


            const labels = {

                btc:
                    "Bitcoin wallet address",

                eth:
                    "Ethereum wallet address",

                usdt:
                    "USDT wallet address"

            };


            if (wallet) {

                wallet.textContent =
                    wallets[crypto];

            }


            const walletLabel =
                document.querySelector(".wallet-label");

            if (walletLabel) {

                walletLabel.textContent =
                    labels[crypto];

            }


            if (qr) {

                qr.src =
                    `images/${crypto}-qr.png`;

            }

        });

    });

}


/* =================================
   CARD PAYMENT PLACEHOLDER
================================= */

const cardPaymentButton =
    document.getElementById("cardPaymentButton");

if (cardPaymentButton) {

    cardPaymentButton.addEventListener("click", () => {

        alert(
            "Connect this button to your authorized payment processor."
        );

    });

}

function updatePaymentMethodAmounts() {

    const formattedAmount =
        "$" + donationAmount.toLocaleString();

    const cardAmount =
        document.getElementById("cardPaymentAmount");

    const cryptoAmount =
        document.getElementById("cryptoPaymentAmount");

    const bankAmount =
        document.getElementById("bankPaymentAmount");

    if (cardAmount) {
        cardAmount.textContent = formattedAmount;
    }

    if (cryptoAmount) {
        cryptoAmount.textContent =
            "Contribution: " + formattedAmount;
    }

    if (bankAmount) {
        bankAmount.textContent =
            "Contribution: " + formattedAmount;
    }
}

const changeDonationAmount =
    document.getElementById("changeDonationAmount");

if (changeDonationAmount) {

    changeDonationAmount.addEventListener("click", () => {

        directPaymentSection.classList.remove("show-payment");

        window.scrollTo({
            top: document.querySelector(".donation-section").offsetTop - 80,
            behavior: "smooth"
        });

    });

}