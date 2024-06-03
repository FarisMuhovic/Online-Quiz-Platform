export const fetchQuestions = quizID => {
  $.ajax({
    url: `${constants.apiURL}/quiz/id?quizID=${quizID}`,
    type: "GET",
    beforeSend: function (xhr) {
      if (localStorage.getItem("userInformation")) {
        if (JSON.parse(localStorage.getItem("userInformation")).token) {
          xhr.setRequestHeader(
            "Authorization",
            JSON.parse(localStorage.getItem("userInformation")).token
          )
        }
      }
    },
    success: function (data) {
      $("#questions-container-form").html("")
      data.questions.forEach(question => {
        const fields = question.fields.split("|")
        question.fields = fields.map(field => {
          let fieldData = field.split("<.>")
          return {
            title: fieldData[0],
            isCorrect: fieldData[1] == 1,
          }
        })
      })
      setQuizIntro(data.title, data.category)
      setTimeLeft(data.duration)
      renderQuestions(data.questions)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (
        errorThrown == "Unauthorized" ||
        errorThrown == "Expired token" ||
        textStatus == "error"
      ) {
        invalidSession()
      } else {
        statusModal("quiz", "error", "Failed to load quiz")
        setTimeout(() => {
          window.location.href = "#quizSearch"
        }, 1500)
      }
    },
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
      fields: [],
    }

    const inputs = question.querySelectorAll("input")
    inputs.forEach(inp => {
      if (inp.checked) {
        answer.userAnswer.push(inp.value)
      }
      answer.fields.push({text: inp.value, correct: null})
    })
    if (answer.userAnswer.length === 0) {
      answer.userAnswer = ["Not answered"]
    }
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
    if (question.type == "MRQ") {
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
    <h4 class="question-title">${question.title}</h4>
    <div class="options">
        ${setChoicesMCQ(question)}
    </div>
  </section>`)
}
const questionDivHTMLRadio = question => {
  $("#questions-container-form").append(`
  <section class="question">
    <h4 class="question-title">${question.title}</h4>
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
      <input type="radio" name="${question.title}" value="${field.title}">
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
    quizID: JSON.parse(localStorage.getItem("selectedQuizID")),
    userID: JSON.parse(localStorage.getItem("userInformation")).id,
    timeTaken: null,
    correctAnswers: null,
    answers: null,
  }

  let time = $("#quiz-time-left")[0].innerText.split(":")
  let timeLeft = Number(time[1]) * 60 + Number(time[2])

  $.ajax({
    url: `${constants.apiURL}/quiz/id?quizID=${takenQuiz.quizID}`,
    type: "GET",
    beforeSend: function (xhr) {
      if (localStorage.getItem("userInformation")) {
        if (JSON.parse(localStorage.getItem("userInformation")).token) {
          xhr.setRequestHeader(
            "Authorization",
            JSON.parse(localStorage.getItem("userInformation")).token
          )
        }
      }
    },
    success: function (data, textStatus, jqXHR) {
      data.questions.forEach(question => {
        const fields = question.fields.split("|")
        question.fields = fields.map(field => {
          let fieldData = field.split("<.>")
          return {
            title: fieldData[0],
            isCorrect: fieldData[1] == 1,
          }
        })
      })

      let timeTaken = data.duration * 60 - timeLeft // in seconds
      takenQuiz.timeTaken = timeTaken

      const solvedQuestions = data.questions

      // adds the grading scheme for user quiz answers
      for (let i = 0; i < solvedQuestions.length; i++) {
        userQuizAnswers[i].fields = solvedQuestions[i].fields
      }

      takenQuiz.answers = userQuizAnswers
      takenQuiz.questionCount = data.numberOfQuestions

      takenQuiz.answers.forEach(ans => {
        const newUserAnswer = []
        ans.userAnswer.forEach(userAnswer => {
          ans.fields.forEach(field => {
            if (userAnswer == field.title && field.isCorrect) {
              newUserAnswer.push({title: userAnswer, isCorrect: true})
            } else if (userAnswer == field.title && !field.isCorrect) {
              newUserAnswer.push({title: userAnswer, isCorrect: false})
            }
          })
        })

        ans.userAnswer = newUserAnswer
        delete ans.fields
      })

      let correct = 0
      takenQuiz.answers.forEach(answer => {
        let correctAll = 0
        answer.userAnswer.forEach(ans => {
          if (ans.length !== 0) {
            if (ans.isCorrect) {
              correctAll++
            } else {
              correctAll--
            }
          }
        })

        if (correctAll > 0) {
          correctAll = 1
        } else {
          correctAll = 0
        }
        correct += correctAll
      })
      takenQuiz.correctAnswers = correct

      $.ajax({
        url: `${constants.apiURL}/history/new`,
        type: "POST",
        beforeSend: function (xhr) {
          if (localStorage.getItem("userInformation")) {
            if (JSON.parse(localStorage.getItem("userInformation")).token) {
              xhr.setRequestHeader(
                "Authorization",
                JSON.parse(localStorage.getItem("userInformation")).token
              )
            }
          }
        },
        contentType: "application/json",
        data: JSON.stringify({takenQuiz: takenQuiz}),
        success: function (response) {
          $("a").off("click", showAlert)
          statusModal("quiz", "success", "Quiz history successfully updated")
          showEndText(takenQuiz)
        },
        error: function (jqXHR, textStatus, errorThrown) {
          if (
            errorThrown == "Unauthorized" ||
            errorThrown == "Expired token" ||
            textStatus == "error"
          ) {
            invalidSession()
          } else {
            statusModal(
              "quiz",
              "error",
              "Failed to send the quiz to the database"
            )
          }
        },
      })

      $("a").off("click", showAlert)
      setTimeout(() => {
        showEndText(takenQuiz)
      }, 5000)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (
        errorThrown == "Unauthorized" ||
        errorThrown == "Expired token" ||
        textStatus == "error"
      ) {
        invalidSession()
      } else {
        statusModal("quiz", "error", "Failed to grade the quiz")
        setTimeout(() => {
          window.location.href = "#quizSearch"
        }, 2500)
      }
    },
  })
}
const showEndText = quizHistory => {
  const timeout = 15000
  const score = (quizHistory.correctAnswers / quizHistory.questionCount) * 100
  $("#questions-container-form").html(`<div class="result-text">
    <h3>Quiz finished</h3>
    <p>Time taken: ${
      quizHistory.timeTaken > 60
        ? Math.floor(quizHistory.timeTaken / 60) + " minutes"
        : quizHistory.timeTaken + " seconds"
    }</p>
    <p style="color: ${score < 55 ? "red" : "green"}">Score: ${
    quizHistory.correctAnswers
  }/${quizHistory.questionCount}(${score}%)</p>
  </div>`)
  $("#quiz-time-left").text("Time left: 00:00")
}
