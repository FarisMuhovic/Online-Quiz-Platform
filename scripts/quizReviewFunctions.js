export const fetchQuizReview = () => {
  const quizReviewContainer = document.getElementById("quiz-review-container")
  quizReviewContainer.innerHTML = ""
  // fetch quiz by selected quiz in localstorage
  $.get("./data/quiztaken.json", (data, status) => {
    quizReviewContainer.innerHTML = `
    <section class="heading">
      <h1>${data.title}</h1>
      <h3>${data.category}</h3>
      <p>Your score: ${data.correctAnswers}/${data.questionCount}</p>
      <h3>Color info:</h3>
      <div class="info-div">
        <p>Red: your answer (wrong)</p>
        <p>Green: right answer, and your answer.</p>
        <p>Note: if every answer is red(except right one), that means you didnt answer at all.</p>
      </div>
      </section>
    `
    data.answers.forEach(answer => {
      quizReviewContainer.innerHTML += `
      <section class="question">
        <h4 class="question-title">${answer.questionName}</h4>
        <div class="question-answers">
          ${insertAnswersHTML(answer)}
        </div>
      </section>
    `
    })
  })
}
const insertAnswersHTML = answer => {
  let answersHTML = ""

  if (answer.userAnswer === "") {
    answer.fields.forEach(field => {
      answersHTML += `<p class="answer ${
        field.correct ? "correct" : ""
      } user-answer">${field.text}</p>`
    })
  } else {
    answer.fields.forEach(field => {
      answersHTML += `<p class="answer ${field.correct ? "correct" : ""} ${
        answer.userAnswer == field.text ? "user-answer" : ""
      }">${field.text}</p>`
    })
  }
  return answersHTML
}
