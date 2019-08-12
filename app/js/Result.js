let answersObj;

function initApp() {

    /*const signUpLink = document.getElementById("sign-up-link");
    const loginLink = document.getElementById("login-link");
    const logoutButton = document.getElementById("logout-button");

    let activeUser = JSON.parse(localStorage.getItem('active_user'));

    console.log(activeUser);

    if (activeUser) {
        signUpLink.style.display = 'none';
        loginLink.style.display = 'none';
        logoutButton.style.display = 'block';
    }*/

    const result_wrapper = document.getElementById('result-wrapper');

    let url_string = window.location.href;  
    let url = new URL(url_string);
    answersId = url.searchParams.get("answers_id");

    answersObj = JSON.parse(localStorage.getItem(answersId));

    let html = "";

    const db_test = db.data.filter(test => test.id == answersObj.test_id)[0];

    const right_answers = db.answers.filter(test => test.id == answersObj.test_id)[0].answers;

    const user_answers = answersObj.user_answers;

    html += `<div class="test-header">
                <div class="test-header__title">${db_test.title}</div>
                <div class="test-header__description">${db_test.description}</div>
            </div>` 

    db_test.tests.forEach( (test, i) => {

        html += `<div class="question-card">
                    <div class="question-card__header">
                        <div class="question-card__number">
                            <span>Question ${i + 1}</span>
                        </div>
                        <div class="question-card__question">
                            <span>${test.question}</span>
                        </div>
                    </div>
                    <div class="question-card__answers">`;

        db_test.tests[i].answers.forEach( (answer, j) => {
            let answer_status_class = '';
            let answer_status_icon = ``;

            if (right_answers[i] == j) {
                answer_status_class = ' question-card__answer--right';
                answer_status_icon = `<svg class="question-card__icon question-card__icon--right">
                                        <use xlink:href="images/sprite.svg#icon-check-mark1"></use>
                                      </svg>`;
            } else {
                if (user_answers[i] == j) {
                    answer_status_class = ' question-card__answer--wrong';
                    answer_status_icon = `<svg class="question-card__icon question-card__icon--wrong">
                                            <use xlink:href="images/sprite.svg#icon-x-mark1"></use>
                                          </svg>`;
                }
            }

            html += `<div class="question-card__answer${answer_status_class}">
                        <span>${answer}</span>
                        ${answer_status_icon}
                     </div>`;
        });

        html += `</div>
            </div>`;   
    });

    html += `<div>
                <div id="message"></div>
            </div>`;

    result_wrapper.innerHTML = html;
    
}

window.addEventListener("load", initApp);