export const fetchQuizReview = () => {
  const quizReviewContainer = document.getElementById("quiz-review-container")
  quizReviewContainer.innerHTML = ""
  const selectedQuizID = localStorage.getItem("selectedReviewQuizID")
  const id = JSON.parse(localStorage.getItem("userInformation")).id
  $.post(`${constants.apiURL}/history/id`, {
    quizID: selectedQuizID,
    id: id,
  })
    .done(function (data) {
      quizReviewContainer.innerHTML = `
      <section class="heading">
        <h1>${data.title}</h1>
        <h3>${data.category}</h3>
        <p>Your score: ${data.correctAnswers}/${data.numberOfQuestions}</p>
        <h3>Color info:</h3>
        <div class="info-div">
          <p>Red: your answer (wrong)</p>
          <p>Green: right answer, and your answer.</p>
          <p>Note: if every answer is red (except the right one), that means you didn't answer at all.</p>
        </div>
      </section>`

      $.get(`${constants.apiURL}/quiz/id?quizID=${data.quiz_id}`).done(
        function (quizdata) {
          quizdata.questions.forEach(question => {
            const fields = question.fields.split("|")
            question.fields = fields.map(field => {
              let fieldData = field.split("<.>")
              return {
                title: fieldData[0],
                isCorrect: fieldData[1] == 1,
              }
            })
            quizReviewContainer.innerHTML += `
              <section class="question">
                <h4 class="question-title">${question.title}?</h4>
                <div class="question-answers">
                    ${insertFields(question.fields)}
                </div>
              </section>`
          })
          checkAnswers(data.answers)
        }
      )
    })
    .fail(function () {
      quizReviewContainer.innerHTML = constants.errorBanner(
        "Failed to load specific quiz history."
      )
    })
}
const insertFields = answers => {
  let answersHTML = ""
  answers.forEach(field => {
    answersHTML += `
    <p class="answer ${field.isCorrect ? "correct" : ""}">
      ${field.title}
    </p>`
  })
  return answersHTML
}
const checkAnswers = answers => {
  document.querySelectorAll(".question").forEach(question => {
    question.querySelectorAll("p").forEach(p => {
      answers.forEach(answ => {
        if (answ.title == p.innerText && answ.isCorrect == "1") {
          p.classList.add("correct")
          question.dataset.didAnswer = true
        } else if (answ.title == p.innerText && answ.isCorrect == "0") {
          p.classList.add("wrong")
          question.dataset.didAnswer = true
        }
      })
    })
  })
  document.querySelectorAll(".question").forEach(question => {
    if (!question.dataset.didAnswer) {
      question.querySelectorAll("p").forEach(p => {
        p.classList.add("wrong")
      })
    }
  })
}
