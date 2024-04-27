export const fetchQuizzes = (name = "", catg = "none") => {
  const quizContainer = document.getElementById("quiz-search-container")
  $.get("http://127.0.0.1/quiz-app/rest/routes/getListOfQuizzes.php")
    .done(function (data) {
      const parsedData = JSON.parse(data)
      quizContainer.innerHTML = ""
      if (parsedData.length == 0) {
        quizContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`
      }
      parsedData.forEach(quiz => {
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
    .fail(function (jqXHR, textStatus, errorThrown) {
      // console.error("Error fetching data:", textStatus, errorThrown)
      quizContainer.innerHTML = `<h3 style="background-color: white; grid-column: 1 / -1; height: 75px; display:flex; justify-content: flex-start; padding:1rem; align-items: center; color: #f65656;   box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px">Error loading quizzes. Please try again later.</h3>`
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
      src="./images/quiz-type-banners/${quiz.bannerImage}.svg"
      alt="${quiz.altText}"
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
        <span>${quiz.duration} minutes</span>
      </p>
      <p>Questions: <b>${quiz.numberOfQuestions}</b> </p>
      <p>
        ${quiz.description}
      </p>
    </div>
    <a href="#quiz" data-quiz-id="${quiz.quiz_id}">Start quiz</a> 
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
