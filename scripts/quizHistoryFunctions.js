export const fetchQuizHistory = (value = "") => {
  const quizHistoryContainer = document.getElementById("quiz-history-container")
  $.get("../data/quizHistory.json", (data, status) => {
    quizHistoryContainer.innerHTML = ""
    data.forEach(quiz => {
      if (quiz.title.toLowerCase().includes(value.toLowerCase())) {
        fillHTMLHistory(quizHistoryContainer, quiz)
      }
    })
    listenForAClick()
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
      <span class="material-symbols-outlined"> category </span>
      <span>${quiz.category}</span>
    </p>
    <p >
      <span class="material-symbols-outlined"> calendar_month </span>
      <span>${quiz.date}</span>
    </p>
    <p >
      <span class="material-symbols-outlined"> schedule </span>
      <span>${quiz.timeTaken} minutes taken</span>
    </p>
    <p>Score: ${quiz.correctAnswers}/${quiz.questionCount} <span style="color:${
    scorePercentage < 55 ? "red" : "green"
  }">(${Math.round(scorePercentage)}%)</span></p>
    <div class="links">
    <a href="#quizReview" style="background-color: white" class="review-quiz-btn" data-quiz-id="${
      quiz.id
    }">Review quiz</a>
    <a href="#quiz" data-quiz-id="${
      quiz.id
    }" class="retake-quiz-btn">Retake quiz</a> 
    </div>
  </section>`
}
const listenForAClick = () => {
  document.querySelectorAll(".retake-quiz-btn").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault()
      localStorage.setItem("selectedQuizID", e.target.attributes[1].value)
      window.location.href = "#quiz"
    })
  })
  document.querySelectorAll(".review-quiz-btn").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault()
      localStorage.setItem("selectedQuizID", e.target.attributes[3].value)
      window.location.href = "#quizReview"
    })
  })
}
