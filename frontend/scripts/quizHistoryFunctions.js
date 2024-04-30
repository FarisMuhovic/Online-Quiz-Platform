export const fetchQuizHistory = (value = "") => {
  const quizHistoryContainer = document.getElementById("quiz-history-container")
  let id = null
  if (localStorage.getItem("userInformation")) {
    id = JSON.parse(localStorage.getItem("userInformation")).id
  }

  $.get(`${constants.apiURL}/getQuizHistory.php?id=${id}`)
    .done(function (data) {
      quizHistoryContainer.innerHTML = ""
      if (data.length === 0) {
        quizHistoryContainer.innerHTML = constants.noDataBanner
      } else {
        data.forEach(function (quiz) {
          if (quiz.title.toLowerCase().includes(value.toLowerCase())) {
            fillHTMLHistory(quizHistoryContainer, quiz)
          }
        })
        listenForAClick()
      }
    })
    .fail(function (xhr, status, error) {
      quizHistoryContainer.innerHTML = constants.errorBanner(
        "Error loading quiz history. Please try again later."
      )
    })
}

export const searchQuizHistory = () => {
  $("#search-form").on("submit", e => {
    e.preventDefault()
    fetchQuizHistory($("#search-bar").val())
  })
}

const fillHTMLHistory = (quizHistoryContainer, quiz) => {
  const scorePercentage = (quiz.correctAnswers / quiz.numberOfQuestions) * 100
  quizHistoryContainer.innerHTML += `
  <section class="history-item">
    <h3>${quiz.title}</h3>
    <p>
      <span class="material-symbols-outlined"> category </span>
      <span>${quiz.category}</span>
    </p>
    <p >
      <span class="material-symbols-outlined"> calendar_month </span>
      <span>${quiz.dateTaken}</span>
    </p>
    <p >
      <span class="material-symbols-outlined"> schedule </span>
      <span>${quiz.timeTaken} minutes taken</span>
    </p>
    <p>Score: ${quiz.correctAnswers}/${
    quiz.numberOfQuestions
  } <span style="color:${scorePercentage < 55 ? "red" : "green"}">(${Math.round(
    scorePercentage
  )}%)</span></p>
    <div class="links">
    <a href="#quizReview" style="background-color: white" class="review-quiz-btn" data-quiz-id="${
      quiz.quiz_history_id
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
      localStorage.setItem("selectedReviewQuizID", e.target.attributes[3].value)
      window.location.href = "#quizReview"
    })
  })
}
