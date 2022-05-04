import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';

export default function menu() {
    const burger = document.querySelector('.page-header__burger');
    const menu = document.querySelector('.page-header__burger-menu');

    let menuOpen = false;

    if (!burger || !menu) return;

    const openMenu = () => {
        if (menuOpen) return;
        document.body.classList.add('mobile-menu-open');
        disableBodyScroll(menu);
        menuOpen = true;
    };
    const closeMenu = () => {
        if (!menuOpen) return;
        document.body.classList.remove('mobile-menu-open');
        clearAllBodyScrollLocks();
        menuOpen = false;
    };

    window.openMenu = openMenu;
    window.closeMenu = closeMenu;

    burger.addEventListener('click', event => {
        event.preventDefault();
        if (!menuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    });

}