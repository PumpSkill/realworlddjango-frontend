function readyMain() {
    const menuItems = document.getElementsByClassName('vertical-menu-item')
    let subMenuSelector = 'vertical-submenu'
    for (const menuItem of menuItems) {
        menuItem.onclick = function () {
            for (const menuItemChild of menuItem.children) {
                if (menuItemChild.classList.contains(subMenuSelector)) {
                    if (menuItemChild.classList.contains('d-none') || !menuItemChild.classList.contains('d-block')) {
                        menuItemChild.classList.remove('d-none')
                        menuItemChild.classList.add('d-block')
                    } else {
                        menuItemChild.classList.add('d-none')
                        menuItemChild.classList.remove('d-block')
                    }
                }
            }
        }
    }

    const menuHamburger = document.getElementById('menu-hamburger')
    if (menuHamburger) {
        menuHamburger.onclick = function (e) {
            document.body.classList.toggle('toggle-menu')
            e.preventDefault()
        }
    }
}

document.addEventListener("DOMContentLoaded", readyMain)