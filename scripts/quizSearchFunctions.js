export const fetchQuizzes = (name = "", catg = "none") => {
  const quizContainer = document.getElementById("quiz-search-container")
  $.get("../data/quizBanner.json", (data, status) => {
    quizContainer.innerHTML = ""
    data.forEach(quiz => {
      // ONLY name filled in
      if (
        quiz.title.toLowerCase().includes(name.toLowerCase()) &&
        catg == "none" &&
        name != ""
      ) {
        fillHTML(quizContainer, quiz)
      }
      // BOTH filled in
      else if (
        quiz.title.toLowerCase().includes(name.toLowerCase()) &&
        quiz.category.toLowerCase() == catg
      ) {
        fillHTML(quizContainer, quiz)
      }
      // category filled in ONLY
      else if (name == "" && quiz.category.toLowerCase() == catg) {
        fillHTML(quizContainer, quiz)
      }
      // nothing filled in
      else if (name == "" && catg == "none") {
        fillHTML(quizContainer, quiz)
      }
    })
    listenForClick()
  })
}
export const searchQuiz = () => {
  $("#search-form").on("submit", e => {
    e.preventDefault()
    const inputQuery = {
      title: $("#search-bar").val(),
      category: $("#category").val(),
    }
    fetchQuizzes(inputQuery.title, inputQuery.category)
  })
}

export const clearSearchFilters = () => {
  $("#clear-filters-btn").on("click", () => {
    $("#search-bar").val("")
    $("#category").val("none")
    fetchQuizzes()
  })
}

const fillHTML = (quizContainer, quiz) => {
  quizContainer.innerHTML += `
  <section class="quiz-banner">
    <img
      src="../images/quiz-type-banners/${quiz.imgSrc}"
      alt="${quiz.alt}"
      loading="lazy"
    />
    <div class="text-container">
      <h3>${quiz.title}</h3>
      <p>
        <span class="material-symbols-outlined">
          category
        </span>
        <span>${quiz.category}</span>        
      </p>
      <p class="quiz-time">
        <span class="material-symbols-outlined"> schedule </span>
        <span>${quiz.quizTime} minutes</span>
      </p>
      <p>Questions: <b>${quiz.questionsCount}</b> </p>
      <p>
        ${quiz.description}
      </p>
    </div>
    <a href="#quiz" data-quiz-id="${quiz.id}">Start quiz</a> 
  </section>
`
}
const listenForClick = () => {
  document.querySelectorAll(".quiz-banner a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault()
      localStorage.setItem("selectedQuizID", e.target.attributes[1].value)
      window.location.href = "#quiz"
    })
  })
}
