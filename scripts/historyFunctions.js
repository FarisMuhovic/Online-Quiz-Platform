export const fetchQuizHistory = (value = "") => {
  const quizHistoryContainer = document.getElementById("quiz-history-container")
  fetch("../data/quizHistory.json")
    .then(response => response.json())
    .then(data => {
      quizHistoryContainer.innerHTML = `<h1 id="heading-of-page">Your recently taken quizes</h1>`
      data.forEach(quiz => {
        if (quiz.title.toLowerCase().includes(value.toLowerCase())) {
          fillHTMLHistory(quizHistoryContainer, quiz)
        }
      })
    })
}
export const searchQuizHistory = () => {
  $("#search-form").on("submit", e => {
    e.preventDefault()
    fetchQuizHistory($("#search-bar").val())
  })
}

const fillHTMLHistory = (quizHistoryContainer, quiz) => {
  const scorePercentage = (quiz.correctAnswers / quiz.questionCount) * 100
  quizHistoryContainer.innerHTML += `
  <section class="history-item">
    <h3>${quiz.title}</h3>
    <p>
      <span class="material-symbols-outlined"> calendar_month </span>
      <span>${quiz.date}</span>
    </p>
    <p>
      <span class="material-symbols-outlined">schedule</span>
      <span>${quiz.timeTaken} minutes</span>
    </p>
    <p>Score: ${quiz.correctAnswers}/${quiz.questionCount} <span style="color:${
    scorePercentage < 55 ? "red" : "green"
  }">(${Math.round(scorePercentage)}%)</span></p>
    <a href="#">Review Answers</a>
    <a href="#">Retake Quiz</a>
  </section>`
}
