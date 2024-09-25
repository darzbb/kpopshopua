let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.querySelector('.next').addEventListener('click', () => {
    changeSlide(1);
});
document.querySelector('.prev').addEventListener('click', () => {
    changeSlide(-1);
});
function changeSlide(direction) {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    slides[currentIndex].classList.add('active');
    updateSlider();
}
function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}
function startAutoSlide() {
    setInterval(() => {
        changeSlide(1);
    }, 7000);
}
startAutoSlide();

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtonsMenu = document.querySelectorAll('.add-to-cart-btn-menu');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartAmount = document.querySelector('.cart-amount');
    let cartCount = 0;

    function incrementCart() {
        cartCount++;
        cartAmount.textContent = cartCount;
    }

    addToCartButtonsMenu.forEach(button => {
        const productId = button.getAttribute('alt');
        const menuPopup = document.querySelector(`.menu-popup[alt="${productId}"]`);

        if (menuPopup) {
            const menuItems = menuPopup.querySelectorAll('.menu-item-a');

            menuItems.forEach(item => {
                item.addEventListener('click', function() {
                    incrementCart();

                    menuPopup.classList.remove('show');
                    setTimeout(() => menuPopup.style.display = 'none', 300);
                });
            });

            button.addEventListener('click', function(event) {
                event.stopPropagation();

                if (menuPopup.classList.contains('show')) {
                    menuPopup.classList.remove('show');
                    setTimeout(() => menuPopup.style.display = 'none', 300);
                } else {
                    menuPopup.style.display = 'block';
                    setTimeout(() => menuPopup.classList.add('show'), 10);
                }
            });
        }
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            incrementCart();
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.add-to-cart-btn-menu') && !event.target.closest('.menu-popup')) {
            const openMenus = document.querySelectorAll('.menu-popup.show');
            openMenus.forEach(menu => {
                menu.classList.remove('show');
                setTimeout(() => menu.style.display = 'none', 300);
            });
        }
    });
});

document.querySelector('.show-all').addEventListener('click', () => {
    const hiddenProducts = document.querySelectorAll('.product.hidden');
    hiddenProducts.forEach(product => {
        product.classList.remove('hidden');
    });
    document.querySelector('.show-all').style.display = 'none'; // Сховати кнопку після показу всіх товарів
});

document.addEventListener('scroll', function() {
    const floatingNav = document.getElementById('floating-nav');
    const mainNav = document.querySelector('nav');
    const offsetTop = mainNav.offsetTop + mainNav.offsetHeight;

    if (window.pageYOffset > offsetTop && !floatingNav.classList.contains('manual-hide')) {
        floatingNav.classList.add('show');
    } else if (!floatingNav.classList.contains('manual-hide')) {
        floatingNav.classList.remove('show');
    }
});

document.getElementById('toggle-button').addEventListener('click', function() {
    const floatingNav = document.getElementById('floating-nav');

    if (floatingNav.classList.contains('show')) {
        floatingNav.classList.add('manual-hide');
        floatingNav.classList.remove('show');
        this.innerHTML = '&raquo;';
    } else {
        floatingNav.classList.remove('manual-hide');
        floatingNav.classList.add('show');
        this.innerHTML = '&laquo;';
    }
});

document.querySelectorAll('.nav-item').forEach(navitem => {
    navitem.addEventListener('click', () => {
        anime({
            targets: navitem,
            scale: [1, 0.3],
            duration: 100,
            easing: 'easeInQuad',
            direction: 'alternate'
        });
    });
});
document.querySelectorAll('.add-to-cart-btn').forEach(addtocartbuttons => {
    addtocartbuttons.addEventListener('click', () => {
        anime({
            targets: addtocartbuttons,
            scale: [1, 0.3],
            duration: 100,
            easing: 'easeInQuad',
            direction: 'alternate'
        });
    });
});
document.querySelectorAll('.add-to-cart-btn-menu').forEach(addtocartbuttons => {
    addtocartbuttons.addEventListener('click', () => {
        anime({
            targets: addtocartbuttons,
            scale: [1, 0.3],
            duration: 100,
            easing: 'easeInQuad',
            direction: 'alternate'
        });
    });
});
document.getElementById('floating-nav-btn').addEventListener('click', function() {
    anime({
        targets: '#floating-nav-btn',
        scale: [1, 0.3],
        duration: 100,
        easing: 'easeInQuad',
        direction: 'alternate'
    });
});

async function saveThemeToLocalStorage(theme) {
    localStorage.setItem('theme', theme);
}

async function loadThemeFromLocalStorage() {
    const theme = localStorage.getItem('theme');
    if (theme) {
        document.getElementById('theme-link').setAttribute('href', theme);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadThemeFromLocalStorage();
});

const themes = [
    'styleblue.css',
    'stylepurple.css',
    'stylepink.css',
    'stylered.css',
    'styleorange.css',
    'styleyellow.css',
    'stylegreen.css',
    'stylecyan.css',
    'styledark.css'
];

document.querySelectorAll('.switch-theme-button').forEach(button => {
    button.addEventListener('click', async () => {
        const themeLink = document.getElementById('theme-link');
        const currentTheme = themeLink.getAttribute('href');
        let currentIndex = themes.indexOf(currentTheme);
        let newIndex = (currentIndex + 1) % themes.length;
        let newTheme = themes[newIndex];

        themeLink.setAttribute('href', newTheme);
        await saveThemeToLocalStorage(newTheme);
    });
});

let activeMessages = [];

const cartButton = document.querySelectorAll('.add-to-cart-btn');
const menuPopups = document.querySelectorAll('.menu-popup');
const menuItems = document.querySelectorAll('.menu-item-a');

function showMessage(text) {
    const messagePopup = document.createElement('div');
    messagePopup.className = 'message-popup';
    messagePopup.innerHTML = `<h3>${text}</h3>`;
    document.body.appendChild(messagePopup);
    
    const offsetTop = 20 + (activeMessages.length * 70);
    messagePopup.style.top = `${offsetTop}px`;

    activeMessages.push(messagePopup);

    setTimeout(() => messagePopup.classList.add('show'), 10);

    setTimeout(() => {
        messagePopup.classList.remove('show');
        messagePopup.classList.add('hide');
        
        setTimeout(() => {
            messagePopup.remove();
            activeMessages.shift();
            let i = 0;
            while (i < activeMessages.length) {
                const newOffsetTop = 20 + (i * 70);
                activeMessages[i].style.top = `${newOffsetTop}px`;
                i++;
            }
        }, 500);
    }, 3000);
}

for (let i = 0; i < cartButton.length; i++) {
    cartButton[i].addEventListener('click', () => {
        showMessage('Товар додано у кошик');
    });
}

for (let i = 0; i < menuPopups.length; i++) {
    const items = menuPopups[i].querySelectorAll('.menu-item-a');
    for (let j = 0; j < items.length; j++) {
        items[j].addEventListener('click', () => {
            showMessage('Товар додано у кошик');
        });
    }
}