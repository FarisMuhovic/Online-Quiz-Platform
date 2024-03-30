export const fetchQuizReview = () => {
  const quizReviewContainer = document.getElementById("quiz-review-container")
  quizReviewContainer.innerHTML = ""
  $.get("../data/quiztaken.json", (data, status) => {
    quizReviewContainer.innerHTML = `
    <section class="heading">
      <h1>${data.title}</h1>
      <h3>${data.category}</h3>
      <p>Your score: ${data.correctAnswers}/${data.questionCount}</p>
      <h3>Color info:</h3>
      <p>Red: your answer (wrong)</p>
      <p>Green: right answer, and your answer.</p>
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
  answer.fields.forEach(field => {
    answersHTML += `<p class="answer ${field.correct ? "correct" : ""} ${
      answer.userAnswer == field.text ? "user-answer" : ""
    }">${field.text}</p>`
  })
  return answersHTML
}
