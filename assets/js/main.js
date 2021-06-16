let timerId = ''

function getSubscribers(url) {

    let subscribers = []

    if (url && url.trim().length > 0) {

        // Создаем JavaScript объект для отправки HTTP запроса
        let xhr = new XMLHttpRequest()

        // Открываем GET запрос
        xhr.open("GET", url)

        // Отправляем запрос
        xhr.send()

        // Ждем ответа от сервера. Метод onloadend срабатывает когда придет ответ
        xhr.onloadend = function () {

            // Если статус ответа = 200, значит все OK. Отправленный HTTP успешно вернул ответ
            if (xhr.status === 200) {

                let subscribers = []

                try {
                    // Строка формата JSON содержится в реквизите xhr.response - парсим ее
                    let response = JSON.parse(xhr.response)
                    updateSubscribers(response.subscribers)
                    if (response.all_emails_sent === true) {
                        let alertElement = document.getElementById('alertSendingProcess')
                        if (alertElement) {
                            alertElement.classList.add('d-none')
                        }
                        alertElement = document.getElementById('alertSendingDone')
                        if (alertElement) {
                            alertElement.classList.remove('d-none')
                        }
                        if (timerId != '') {
                            clearInterval(timerId)
                        }
                    }
                } catch (err) {
                    // Если не удалось распарсить строку ответа, то выводим ошибку
                    alert(err)
                }

            } else {
                // Если статус ответа не 200, значит при обработке HTTP возникли какие-то ошибки
                // Ситуации могут быть разные. Выводим ошибку со статусом ответа
                alert("Ошибка " + xhr.status)
            }

        }

    }

    return subscribers

}

function updateSubscribers(subscribers) {

    for (const subscriber of subscribers) {
        let trArray = document.querySelectorAll("[data-tr-email='" + subscriber.email + "']")
        for (const tr of trArray ) {
            let td = tr.querySelector("[data-td-name='letterCount']")
            if (td) {
                td.innerText = subscriber.letter_count
            }
            td = tr.querySelector("[data-td-name='sentLetterCount']")
            if (td) {
                td.innerText = subscriber.sent_letter_count
            }
        }
    }

}

function createLetters(url) {

    let formLetter = document.getElementById('formLetter')
    if (url && url.trim().length > 0 && formLetter) {

        // Создаем JavaScript объект formData - в этом объекте хранятся данные для HTTP запроса
        // Это данные из формы добавления письма - поля Тема и Текст письма
        let formData = new FormData(formLetter)

        // Создаем JavaScript объект для отправки HTTP запроса
        let xhr = new XMLHttpRequest()

        // Открываем запрос с методом POST на URL адрес создания писем
        xhr.open("POST", url)

        // Добавляем в запрос данные формы и отправляем его
        xhr.send(formData)

        // Ждем ответа от сервера. Метод onloadend срабатывает когда придет ответ
        xhr.onloadend = function () {

            // Если статус ответа = 200, значит все OK. Отправленный HTTP успешно вернул ответ
            if (xhr.status === 200) {

                let subscribers = []

                try {
                    // Строка формата JSON содержится в реквизите xhr.response - парсим ее
                    let response = JSON.parse(xhr.response)
                    updateSubscribers(response.subscribers)
                } catch (err) {
                    // Если не удалось распарсить строку ответа, то выводим ошибку
                    alert(err)
                }

            } else {
                // Если статус ответа не 200, значит при обработке HTTP возникли какие-то ошибки
                // Ситуации могут быть разные. Выводим ошибку со статусом ответа
                alert("Ошибка " + xhr.status)
            }

        }

    }

}

function sendLetters(urlSendLetters, urlGetSubscribers) {

    let formLetter = document.getElementById('formLetter')
    if (urlSendLetters && urlSendLetters.trim().length > 0 && formLetter) {

        let alertElement = document.getElementById('alertSendingDone')
        if (alertElement) {
            alertElement.classList.add('d-none')
        }
        alertElement = document.getElementById('alertSendingProcess')
        if (alertElement) {
            alertElement.classList.remove('d-none')
        }

        // Создаем JavaScript объект formData - в этом объекте хранятся данные для HTTP запроса
        // Это данные из формы добавления письма - поля Тема и Текст письма
        let formData = new FormData(formLetter)

        // Создаем JavaScript объект для отправки HTTP запроса
        let xhr = new XMLHttpRequest()

        // Открываем запрос с методом POST на URL адрес отправки писем
        xhr.open("POST", urlSendLetters)

        // Добавляем в запрос данные формы и отправляем его
        xhr.send(formData)

        // Ждем ответа от сервера. Метод onloadend срабатывает когда придет ответ
        xhr.onloadend = function () {

            // Если статус ответа = 200, значит все OK. Отправленный HTTP успешно вернул ответ
            if (xhr.status === 200) {

                console.log('Запущена отправка писем')

            } else {
                // Если статус ответа не 200, значит при обработке HTTP возникли какие-то ошибки
                // Ситуации могут быть разные. Выводим ошибку со статусом ответа
                alert("Ошибка " + xhr.status)
            }

        }

        if (urlGetSubscribers && urlGetSubscribers.trim().length > 0) {
            timerId = setInterval(getSubscribers, 1000, urlGetSubscribers)
        }
    }

}

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