function initApp() {

    const tests_wrapper = document.getElementById('tests-wrapper');

    const signUpLink = document.getElementById("sign-up-link");
    const loginLink = document.getElementById("login-link");
    const logoutButton = document.getElementById("logout-button");

    /*let activeUser = JSON.parse(localStorage.getItem('active_user'));

    if (activeUser) {
        signUpLink.style.display = 'none';
        loginLink.style.display = 'none';
        logoutButton.style.display = 'block';
    }*/

    let url_string = window.location.href;  //http://www.tests.html?category=mathematics
    let url = new URL(url_string);
    let category = url.searchParams.get("category");

    var li = document.getElementsByClassName("side-nav__item");
    
    switch (category) {
        case 'mathematics':
            li[0].classList.add("side-nav__item--active");
            break;
        case 'languages':
            li[1].classList.add("side-nav__item--active");
            break;
        case 'computer science':
            li[2].classList.add("side-nav__item--active");
            break;
        case 'science':
            li[3].classList.add("side-nav__item--active");
            break;
        case 'arts':
            li[4].classList.add("side-nav__item--active");
            break;
        case 'health':
            li[5].classList.add("side-nav__item--active");
            break;
    }

    let html = "";

    const db_category = db.data.filter(test => test.category.toLowerCase() === category.toLowerCase());

    db_category.forEach(test => {

        html += `<div class="test-card">
        <div class="test-card__main">
            <div class="test-card__view">
                <img src="images/slide-3.jpg" alt="card-image" class="test-card__image"> 
            </div>
            <div class="test-card__text">
                <div class="test-card__title">
                    <span>${test.title}</span>
                </div>
                <div class="test-card__description">${test.description}</div>
            </div>
        </div>
        <div class="test-card__actions">
            <div class="test-card__details meta-data">
                <div class="meta-data__item">
                    <svg class="meta-data__icon">
                        <use xlink:href="images/sprite.svg#icon-trophy"></use>
                    </svg>
                    <span>${test.complexity}</span>
                </div>
                <div class="meta-data__item">
                    <svg class="meta-data__icon">
                        <use xlink:href="images/sprite.svg#icon-open-book"></use>
                    </svg>
                    <span>${test.category}</span>
                </div>
                <div class="meta-data__item">
                    <svg class="meta-data__icon">
                        <use xlink:href="images/sprite.svg#icon-help"></use>
                    </svg>
                    <span>${test.tests.length}</span>
                </div>
            </div>
            <a href="/app/test.html?id=${test.id}" class="test-card__start button-primary">Start</a>
        </div>
    </div>`;

    });

    tests_wrapper.innerHTML = html;
}

window.addEventListener("load", initApp);