function initApp() {

    const signUpLink = document.getElementById("sign-up-link");
    const loginLink = document.getElementById("login-link");
    const logoutButton = document.getElementById("logout-button");

    /*let activeUser = JSON.parse(localStorage.getItem('active_user'));

    if (activeUser) {
        signUpLink.style.display = 'none';
        loginLink.style.display = 'none';
        logoutButton.style.display = 'block';
    }*/

    const featured_sections_wrapper = document.getElementById('featured-sections-wrapper');

    const categories = ['Mathematics', 'Languages', 'Computer Science', 'Science', 'Arts', 'Health'];

    let html = "";

    categories.forEach(category => {

        const db_category = db.data.filter(test => test.category.toLowerCase() == category.toLowerCase()).slice(0, 4);

        html += `<div class="featured-section">
                 <div class="featured-section__header">
                    <div class="featured-section__title">
                        <span>${category}</span>
                    </div>
                    <a href="/app/tests.html?category=${category.toLowerCase()}" class="button-more">
                        <span>See more</span>
                        <svg class="button-more__icon">
                            <use xlink:href="images/sprite.svg#icon-chevron-thin-right"></use>
                        </svg>
                    </a> 
                 </div>
                 <div class="featured-section__list">`;

        db_category.forEach(test => {

            html += `<a href="/app/test.html?id=${test.id}" class="featured-card">
                    <div class="featured-card__header">
                        <div class="featured-card__stats">
                            <span>${test.tests.length} Qs</span>
                        </div>
                    </div>
                    <div class="featured-card__title">
                        <span>${test.title}</span>
                    </div>
                </a>`;

        });

        html += `</div>
        </div>`;
    });

    featured_sections_wrapper.innerHTML = html;
}

window.addEventListener("load", initApp);

