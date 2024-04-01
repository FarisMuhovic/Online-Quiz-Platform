export const fetchQuestions = quizID => {
  console.log(quizID) // in database fetch by quizID
  $.get("./data/quizexample.json", (data, status) => {
    if (status == "success") {
      setQuizIntro(data.title, data.category)
      setTimeLeft(data.quizLength)
      renderQuestions(data.questions)
    } else {
      statusModal("error", "Failed to load quiz")
    }
  })
}
export const submitQuizBtn = () => {
  $("#questions-container-form").on("submit", e => {
    e.preventDefault()
    submitQuiz()
  })
}
export const showAlert = event => {
  if (
    confirm(
      "Are you sure you want to leave this page? The quiz will not be saved."
    )
  ) {
    $("a").off("click", showAlert)
    destroyQuiz()
  } else {
    event.preventDefault()
    return false
  }
}
export const destroyQuiz = () => {
  $(".quiz-page").html(`  <div class="time">
    <p id="quiz-time-left">Time left: 00:00</p>
  </div>
  <section class="heading">
    <h1 id="quiz-title-current"></h1>
    <h3 id="quiz-category-current"></h3>
  </section>
  <form id="questions-container-form"></form>`)
  clearInterval(intervalId)
}
const submitQuiz = () => {
  const answers = []
  const questions = document.querySelectorAll(
    "#questions-container-form .question"
  )

  questions.forEach(question => {
    const questionTitle = question.querySelector(".question-title").textContent
    const answer = {
      questionName: questionTitle,
      userAnswer: [],
      isUserCorrect: null,
      fields: [],
    }

    const inputs = question.querySelectorAll("input")
    inputs.forEach(inp => {
      if (inp.checked) {
        answer.userAnswer.push(inp.value)
      }
      answer.fields.push({text: inp.value, correct: null})
    })
    answers.push(answer)
  })

  const formInputs = document.querySelectorAll(
    "#questions-container-form input"
  )
  formInputs.forEach(input => {
    input.disabled = true
  })
  // remove timer
  if (intervalId) clearInterval(intervalId)
  gradeAnswers(answers)
}

const renderQuestions = questions => {
  questions.forEach(question => {
    if (question.typeOfQuestion == "multipleChoice") {
      questionDivHTMLMCQ(question)
    } else {
      questionDivHTMLRadio(question)
    }
  })
  $("#questions-container-form").append(`<button type="submit">Submit</button>`)
}
const questionDivHTMLMCQ = question => {
  $("#questions-container-form").append(`
  <section class="question">
    <h4 class="question-title">${question.questionName}</h4>
    <div class="options">
        ${setChoicesMCQ(question)}
    </div>
  </section>`)
}

const questionDivHTMLRadio = question => {
  $("#questions-container-form").append(`
  <section class="question">
    <h4 class="question-title">${question.questionName}</h4>
    <div class="options">
        ${setChoices(question)}
    </div>
  </section>
`)
}
const setQuizIntro = (title, category) => {
  $("#quiz-title-current").text(title).css("text-transform", "capitalize")
  $("#quiz-category-current").text(category).css("text-transform", "capitalize")
}
const setChoicesMCQ = question => {
  let questionsOptions = ""
  question.fields.forEach(field => {
    questionsOptions += `
    <label>
    <input
      type="checkbox"
      name="${field.title}"
      value="${field.title}"
    />
    ${field.title}</label>
    `
  })

  return questionsOptions
}
const setChoices = question => {
  let questionsOptions = ""
  question.fields.forEach(field => {
    questionsOptions += `
    <label>
      <input type="radio" name="${question.questionName}" value="${field.title}">
      ${field.title}
    </label>
  `
  })
  return questionsOptions
}

let intervalId
const setTimeLeft = time => {
  let minutes = parseInt(time) - 1
  let seconds = 59

  intervalId = setInterval(() => {
    $("#quiz-time-left").html(
      `Time left: ${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`
    )

    if (minutes === 0 && seconds === 0) {
      clearInterval(intervalId) // Stop the interval
      $(".time").css("border", "2px solid red")
      submitQuiz()
    } else {
      seconds--
      if (seconds < 0) {
        minutes--
        seconds = 59
      }
    }
  }, 1000)
}
const gradeAnswers = userQuizAnswers => {
  let correct = 0

  const takenQuiz = {
    id: localStorage.getItem("selectedQuizID"),
    title: null,
    date: new Date().toString(),
    category: null,
    timeTaken: null,
    timeTakenFormat: null,
    questionCount: userQuizAnswers.length,
    correctAnswers: null,
    answers: null,
  }

  let time = $("#quiz-time-left")[0].innerText.split(":")
  let timeLeft = Number(time[1]) * 60 + Number(time[2])

  $.get("./data/quizexample.json", (data, status) => {
    takenQuiz.title = data.title
    takenQuiz.category = data.category
    let timeTaken = data.quizLength * 60 - timeLeft // in seconds
    takenQuiz.timeTaken = timeTaken
    takenQuiz.timeTakenFormat = timeTaken < 60 ? "seconds" : "minutes"

    const questionsSolved = data.questions

    for (let i = 0; i < questionsSolved.length; i++) {
      userQuizAnswers[i].fields = questionsSolved[i].fields
    }
    userQuizAnswers.forEach(question => {
      const userAnswer = question.userAnswer
      question.isUserCorrect = null
      const questionFields = question.fields
      questionFields.forEach(field => {
        userAnswer.forEach(usranswr => {
          if (usranswr == field.title && field.correct) {
            question.isUserCorrect = true
            correct++
          }
        })
      })
      if (question.isUserCorrect == null) {
        question.isUserCorrect = false
      }
    })
    takenQuiz.answers = userQuizAnswers
    takenQuiz.correctAnswers = correct
    console.log(takenQuiz.correctAnswers)
    $.post("/restapi/submitquiz", takenQuiz, function (response) {
      console.log(response)
      // $("a").off("click", showAlert)
      // showEndText(takenQuiz)
      // console.log(takenQuiz)
    })
    $("a").off("click", showAlert)
    showEndText(takenQuiz)
    console.log(takenQuiz)
  })
}
const showEndText = quizHistory => {
  console.log(quizHistory)
  console.log(quizHistory.correctAnswers)

  let timer = 5
  $("#questions-container-form").html(`<div class="result-text">
    <h3>Quiz finished</h3>
    <p>Time taken: ${
      quizHistory.timeTakenFormat === "minutes"
        ? quizHistory.timeTaken + " minutes"
        : quizHistory.timeTaken + " seconds"
    }</p>
    <p style="color: ${
      (quizHistory.correctAnswers / quizHistory.questionCount) * 100 < 55
        ? "red"
        : "green"
    }">Score: ${quizHistory.correctAnswers}/${quizHistory.questionCount}(${
    (quizHistory.correctAnswers / quizHistory.questionCount) * 100
  }%)</p>
  <p id="redirect-text">Redirecting to dashboard in ${timer}...</p>
  </div>`)
  let intervalid = setInterval(() => {
    timer--
    $("#redirect-text").html(`Redirecting to dashboard in ${timer}...`)
  }, 1000)
  setTimeout(() => {
    $("#questions-container-form").html(``)
    clearInterval(intervalid)
    if (window.location.hash == "#quiz") {
      window.location.hash = "#dashboard"
    }
  }, 5000)
}

const statusModal = (type, message) => {
  let modal
  if (type == "error") {
    modal = `
    <div class="status-modal error">
      <span class="material-symbols-outlined">error</span>
      <p><b>Error</b>: ${message}</p>
      <button class="exit-status-modal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    `
  } else if (type == "success") {
    modal = `
    <div class="status-modal success">
      <span class="material-symbols-outlined">check</span>
      <p><b>Success</b>: ${message}</p>
      <button class="exit-status-modal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    `
  }
  $("#quiz").append(modal)

  const exitmodalbtns = document.querySelectorAll(".exit-status-modal")
  exitmodalbtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.target.parentElement.parentElement.remove()
    })
  })
  setTimeout(() => {
    exitmodalbtns.forEach(btn => {
      btn.parentNode.remove()
    })
  }, 4000)
}
