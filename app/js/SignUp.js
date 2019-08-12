function initApp () {
    
    const signUp = document.getElementById("signUp");
    const message = document.getElementById("message");

    const inputLogin = document.getElementById("login");
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");


    if (!window.localStorage.users) {
        window.localStorage.setItem("users", JSON.stringify([]));
    } 

    let activeUser = '';

    if (localStorage["active_user"]) {
        activeUser = JSON.parse(localStorage["active_user"]);
    }

    console.log(activeUser);

    const users = JSON.parse(window.localStorage.users);
    

    function loginValidate(login) {
        return /^[a-z]{1}[a-z0-9]{3,10}$/.test(login);
    }

    function emailValidate(email) {
        return /^[a-z][a-z0-9.]{1,30}[a-z0-9]@[\w]{1,8}[.][\w]{1,6}$/.test(email);
    }

    function passwordValidate(password) {
        return /^[\w]{8,24}$/.test(password);
    }

    /*inputLogin.onchange = () => {
        if (!loginValidate(inputLogin.value)) {
            console.log(loginValidate(inputLogin.value));
            inputLogin.classList.add('form__input--invalid');
        } else {
            inputLogin.classList.remove('form__input--invalid');
            inputLogin.classList.add('form__input--valid');
        }
    }*/

    function checkUnique(username, email) {

        const usernames = users.map((item) => {
            return item.username;
        });
    
        const emails = users.map((item) => {
            return item.email;
        });

        if (usernames.includes(username)) {
            message.innerHTML = 'Account with this login already exists';
            return false;
        }

        if (emails.includes(email)) {
            message.innerHTML = 'Account with this email already exists';
            return false;
        }

        message.innerHTML = '';
        return true;
    }

    function checkValidity(username, email, password) {
        return loginValidate(username) && emailValidate(email) && passwordValidate(password);
    }

    signUp.onclick = () => {

        if (checkUnique(inputLogin.value, inputEmail.value) && checkValidity(inputLogin.value, inputEmail.value, inputPassword.value)) {

            const user = {
                "username": inputLogin.value,
                "email": inputEmail.value,
                "password": inputPassword.value
            };
    
            users.push(user);
    
            localStorage.setItem("users" , JSON.stringify([...users]));

            localStorage.setItem("active_user" , user.username);
    
            window.location.href = `/app/`;
        }
        
    }
}

window.addEventListener("load", initApp);