let activeUser = '';

if (localStorage["active_user"]) {
    activeUser = JSON.parse(localStorage["active_user"]);
}

function initNav() {
    
    let html = "";
    let links = "";

    const nav_wrapper = document.getElementById('nav-wrapper');
    /*if (!window.localStorage.users) {
        window.localStorage.setItem("users", JSON.stringify([]));
    } */

    if (activeUser) {

        links +=  `<li class="top-nav__item" id="logout-button">
                    <button class="top-nav__link button-primary" onclick="logout()">Logout</button>
                  </li>`;
    } else {

        links += `<li class="top-nav__item">
                    <a href="/app/login.html" class="top-nav__link button-primary">Login</a>
                  </li>
                  <li class="top-nav__item">
                    <a href="/app/signup.html" class="top-nav__link button-primary">Sign up</a>
                  </li>`;
    }

    html += `<ul class="top-nav">
                <li class="top-nav__item">
                    <a href="/app/" class="top-nav__link button-primary">Home</a>
                </li>
                <li class="top-nav__item">
                    <a href="#" class="top-nav__link button-primary">Contacts</a>
                </li>
                ${links}
            </ul>`;

    nav_wrapper.innerHTML = html;        

}

function logout() {
    localStorage.setItem('active_user' , '');
    window.location.href = `/app/`;

}

window.addEventListener("load", initNav);
