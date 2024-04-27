export const fetchQuizHistory = (value = "") => {
  const quizHistoryContainer = document.getElementById("quiz-history-container")
  let userEmail = null
  if (localStorage.getItem("userInformation")) {
    userEmail = JSON.parse(localStorage.getItem("userInformation")).email
  }

  $.get(
    `http://localhost/quiz-app/rest/routes/getQuizHistory.php?email=${userEmail}`
  )
    .done(function (data) {
      const parsedData = JSON.parse(data)
      quizHistoryContainer.innerHTML = ""
      if (parsedData.length === 0) {
        quizHistoryContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`
      } else {
        parsedData.forEach(function (quiz) {
          if (quiz.title.toLowerCase().includes(value.toLowerCase())) {
            fillHTMLHistory(quizHistoryContainer, quiz)
          }
        })
        listenForAClick()
      }
    })
    .fail(function (xhr, status, error) {
      // console.error("Error fetching quiz history:", error)
      quizHistoryContainer.innerHTML = `<h3 style="background-color: white; grid-column: 1 / -1; height: 75px; display:flex; justify-content: flex-start; padding:1rem; align-items: center; color: #f65656;   box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px">Error loading quiz history. Please try again later.</h3>`
    })
}

export const searchQuizHistory = () => {
  $("#search-form").on("submit", e => {
    e.preventDefault()
    fetchQuizHistory($("#search-bar").val())
  })
}

const fillHTMLHistory = (quizHistoryContainer, quiz) => {
  const scorePercentage = (quiz.correctAnswers / quiz.amountOfQuestions) * 100
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
    quiz.amountOfQuestions
  } <span style="color:${scorePercentage < 55 ? "red" : "green"}">(${Math.round(
    scorePercentage
  )}%)</span></p>
    <div class="links">
    <a href="#quizReview" style="background-color: white" class="review-quiz-btn" data-quiz-id="${
      quiz.quiz_id
    }">Review quiz</a>
    <a href="#quiz" data-quiz-id="${
      quiz.quiz_id
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
