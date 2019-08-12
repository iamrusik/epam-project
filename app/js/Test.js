let answers;
let id;

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

    const test_wrapper = document.getElementById('test-wrapper');

    let url_string = window.location.href;  //http://www.test.html?id=1
    let url = new URL(url_string);
    id= url.searchParams.get("id");

    let html = "";

    const db_test = db.data.filter(test => test.id == id)[0];

    answers = new Array(db_test.tests.length).fill(-1);

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

            html += `<div class="question-card__answer">
                        <input type="radio" class="question-card__radio-input" id="${i}_${j}" name="question-${i}">
                        <label for="${i}_${j}" class="question-card__radio-label" onclick="checkedAnswer(${i}, ${j})">
                            <span class="question-card__radio-button"></span>
                            <span>${answer}</span>
                        </label>
                    </div>`;
        });

        html += `</div>
            </div>`;   
    });

    html += `<div id="test-complete">
                <div id="test-message"></div>
                <button class="button-primary" onclick="completeTest()">Complete</button>
            </div>`;

    test_wrapper.innerHTML = html;
    
}

function checkedAnswer(i, j) {
    answers[i] = j;
}

function completeTest() {

    let random_id = Math.round(Math.random() * 1000);

    if (!answers.every(answer => {
        return answer != -1
    })) {
        let message = document.getElementById('test-message');
        message.innerHTML = 'Please answer all questions!';
    } else {

        let answer_obj = {
            "test_id": id,
            "user_answers": answers
            //time
        };
          
        localStorage.setItem(random_id , JSON.stringify(answer_obj));
    
        window.location.href = `/app/result.html?answers_id=${random_id}`;

    }

}

window.addEventListener("load", initApp);