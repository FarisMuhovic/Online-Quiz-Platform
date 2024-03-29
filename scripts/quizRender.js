export const fetchQuestions = quizID => {
  console.log(quizID) // in database fetch by quizID
  $.get("../data/quizexample.json", (data, status) => {
    setQuizIntro(data.title, data.category)
    setTimeLeft(data.quizLength)
    renderQuestions(data.questions)
  })
}
export const submitQuizBtn = () => {
  $("#questions-container-form").on("submit", e => {
    e.preventDefault()
    submitQuiz()
  })
}

const submitQuiz = () => {
  const userAnswers = []
  const questions = document.querySelectorAll(
    "#questions-container-form .question"
  )

  questions.forEach(question => {
    const questionTitle = question.querySelector(".question-title").textContent
    const inputs = question.querySelectorAll("input")

    let answered = false // Flag to track if any input is checked in the question

    inputs.forEach(input => {
      if (input.checked) {
        userAnswers.push({questionName: questionTitle, answer: input.value})
        answered = true // Set the flag to true if any input is checked
      }
    })

    if (!answered) {
      userAnswers.push({questionName: questionTitle, answer: "not answered"})
    }
  })

  const formInputs = document.querySelectorAll(
    "#questions-container-form input"
  )
  formInputs.forEach(input => {
    input.disabled = true
  })
  // remove timer
  if (intervalId) clearInterval(intervalId)
  gradeAnswers(userAnswers)
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
  for (let i = 0; i < question.quizAnswersCount; i++) {
    questionsOptions += `
    <label>
    <input
      type="checkbox"
      name="${question.questionName}"
      value="${question["questionAnswer" + (i + 1)]}"
    />
    ${question["questionAnswer" + (i + 1)]}</label>
    `
  }
  return questionsOptions
}
const setChoices = question => {
  let questionsOptions = ""
  for (let i = 0; i < question.quizAnswersCount; i++) {
    questionsOptions += `
      <label>
        <input type="radio" name="${question.questionName}" value="${
      question["questionAnswer" + (i + 1)]
    }">
        ${question["questionAnswer" + (i + 1)]}
      </label>
    `
  }
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
const gradeAnswers = answers => {
  let correctQuestions = 0 // This needs to be let instead of const to update its value
  const quizID = localStorage.getItem("selectedQuizID")
  let time = $("#quiz-time-left")[0].innerText.split(":")
  let timeLeft = Number(time[1]) * 60 + Number(time[2])
  const history = {
    id: quizID,
    title: null,
    date: new Date().toString(),
    category: null,
    timeTaken: null,
    questionCount: answers.length,
    correctAnswers: 0,
    answers: answers,
  }

  $.get("../data/quizexample.json", (data, status) => {
    history.title = data.title
    history.category = data.category
    let timeTaken = data.quizLength * 60 - timeLeft // in seconds
    history.timeTaken =
      timeTaken < 60
        ? "less than a minute"
        : Math.round(timeTaken / 60) + " minutes"

    answers.forEach((userAnswer, index) => {
      const quizQuestion = data.questions[index]
      let answerCorrect = false
      for (let i = 1; i <= quizQuestion.quizAnswersCount; i++) {
        const answerKey = `questionAnswer${i}`
        const correctnessKey = `correctQuestionAnswer${i}`
        if (
          userAnswer.answer === quizQuestion[answerKey] &&
          quizQuestion[correctnessKey]
        ) {
          answerCorrect = true
          break
        }
      }

      if (answerCorrect) {
        correctQuestions++
        userAnswer.correct = true
      } else {
        userAnswer.correct = false
      }
    })

    history.correctAnswers = correctQuestions

    $.post("", history, function (response) {
      console.log(response)
    })
    showEndText(history)
  })
}
const showEndText = history => {
  let timer = 5
  $("#questions-container-form").html(`<div class="result-text">
    <h3>Quiz finished</h3>
    <p>Time taken: ${
      typeof history.timeTaken !== "string"
        ? history.timeTaken + " minutes"
        : history.timeTaken
    }</p>
    <p style="color: ${
      (history.correctAnswers / history.questionCount) * 100 < 55
        ? "red"
        : "green"
    }">Score: ${history.correctAnswers}/${history.questionCount}(${
    (history.correctAnswers / history.questionCount) * 100
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
