export const fetchQuizzesManagement = (value = "") => {
  const quizManagementContainer = document.getElementById(
    "quiz-manage-container"
  )
  $.ajax({
    url: `${constants.apiURL}/quiz/all`,
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
      quizManagementContainer.innerHTML = ""
      if (data.length === 0) {
        quizManagementContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" id="errbner"/>`
      }
      data.forEach(quiz => {
        if (quiz.title.toLowerCase().includes(value.toLowerCase())) {
          fillHTMLManagement(quizManagementContainer, quiz)
        }
      })
      viewInDetail()
      removeQuiz(data)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (
        errorThrown == "Unauthorized" ||
        errorThrown == "Expired token" ||
        textStatus == "error"
      ) {
        invalidSession()
      } else {
        quizManagementContainer.innerHTML = constants.errorBanner(
          "Error loading quizzes, please try again later."
        )
      }
    },
  })
}
export const searchQuizManagement = () => {
  $("#search-form-quiz-management").on("submit", e => {
    e.preventDefault()
    fetchQuizzesManagement($("#search-bar-quiz-management").val())
  })
}

const fillHTMLManagement = (quizManagementContainer, quiz) => {
  quizManagementContainer.innerHTML += `
  <div class="quiz" data-quizID="${quiz.id}">
  <div class="quiz-info">
    <p>Quiz ID: ${quiz.id}</p>
    <p>Title: ${quiz.title}</p>
    <p>Date created: ${quiz.dateCreated}</p>
  </div>
  <div class="btns-wrapper">
    <button id="detail-quiz-btn-modal" class="edit-quiz-btn" data-id="${quiz.id}" >View in detail</button>
    <button id="delete-quiz-btn-modal" class="remove-quiz-btn" data-id="${quiz.id}">Delete</button>
  </div>
</div>`
}

export const createANewQuiz = () => {
  $("#new-quiz-btn").on("click", () => {
    const modal = document.getElementById("modal")
    if (window.getComputedStyle(modal).display == "none") {
      emptyForm()
      modal.style.display = "flex"
    } else {
      modal.style.display = "none"
    }
  })
  $("#close-btn-head").on("click", () => {
    $("#modal").css("display", "none")
  })
  $("#close-btn-footer").on("click", () => {
    $("#modal").css("display", "none")
  })
  $("#add-question-btn").on("click", () => {
    $("#questions-container").append(`        
    <div class="question">
      <div class="question-header">
        <input
          type="text"
          name="questionName"
          id="questionName"
          min="5"
          max="99"
          placeholder="Enter question"
          required
        />
        <input
          type="number"
          min="1"
          max="5"
          name="quizAnswersCount"
          id="quizAnswersCount"
          class="quizAnswersCount"
          required
          placeholder="Number of answers"
        />
        <select
          class="selectpicker form-control border rounded-0 border-bottom border-dark border-2 px-2 py-2"
          name="typeOfQuestion"
          id="typeOfQuestion"
          required
        >
          <option value="" selected>Type</option>
          <option value="multipleChoice">Multiple Choice</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>
        <div class="question-body" id="each-question-body">
      </div>
      <div class="question-footer">
        <button type="button" id="delete-question-btn" class="delete-qstn-btn">
          <span class="material-symbols-outlined"> delete </span>
        </button>
      </div>
    </div>`)

    const questionsDivs = document.querySelectorAll(".question")
    questionsDivs.forEach(question => {
      const answersCountInput = question.querySelector("#quizAnswersCount")
      answersCountInput.addEventListener("input", e => {
        if (e.target.value <= 5 && e.target.value > 0) {
          const questionBody = question.querySelector(".question-body")
          questionBody.innerHTML = ""
          for (let i = 0; i < e.target.value; i++) {
            questionBody.innerHTML += `<div class="question-answer">
              <input type="text" name="questionAnswer"
               placeholder="Answer" required />
              <label>
                <input type="checkbox" name="correctQuestionAnswer"/>
                <span>Correct Answer</span>
              </label>
            </div>`
          }
        }
      })
    })

    $(".delete-qstn-btn").one("click", function () {
      $(this)[0].parentNode.parentNode.remove()
    })
  })
  submitFormQuiz()
}
const submitFormQuiz = () => {
  const modalForm = document.getElementById("create-quiz-form-head")
  modalForm.addEventListener("submit", e => {
    const quizCreatedData = {
      title: null,
      description: null,
      quizLength: null,
      category: null,
      questions: [],
      id: generateRandomId(),
    }
    e.preventDefault()
    quizCreatedData.title = modalForm.querySelector("#form-title").value
    quizCreatedData.quizLength = modalForm.querySelector(
      "#quiz-length-modal-form"
    ).value
    quizCreatedData.description =
      modalForm.querySelector("#form-desc-modal").value
    quizCreatedData.category = modalForm.querySelector("#select-category").value

    let questionCounter = 0
    const questionsDivs = document.querySelectorAll(".question")
    questionsDivs.forEach(qstn => {
      const questionData = {
        questionName: null,
        typeOfQuestion: null,
        question_id: generateRandomId(),
        id: quizCreatedData.id,
        fields: [],
      }
      questionCounter++
      questionData.questionName = qstn.querySelector("#questionName").value
      let typeOfQuestion = qstn.querySelector("#typeOfQuestion").value
      questionData.typeOfQuestion =
        typeOfQuestion == "multipleChoice" ? "MCQ" : "MRQ"
      const inputsAnswers = qstn.querySelectorAll(".question-answer > input")
      const isCorrectFields = qstn.querySelectorAll(
        ".question-answer > label input"
      )
      for (let i = 0; i < inputsAnswers.length; i++) {
        const fieldData = {
          text: null,
          isCorrect: null,
          field_id: generateRandomId(),
          question_id: questionData.question_id,
        }
        fieldData.text = inputsAnswers[i].value
        fieldData.isCorrect = isCorrectFields[i].checked ? 1 : 0
        questionData.fields.push(fieldData)
      }
      quizCreatedData.questions.push(questionData)
    })
    if (questionCounter < 1) {
      statusModal("quizManagement", "warning", "Please enter more questions")
    } else {
      quizCreatedData.altText = quizCreatedData.category + "banner"
      quizCreatedData.bannerImage = quizCreatedData.category
      $.ajax({
        url: `${constants.apiURL}/quiz/new`,
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
        data: JSON.stringify({quiz: quizCreatedData}),
        success: function (response) {
          statusModal("quizManagement", "success", "Quiz created")
          $("#modal").css("display", "none")
          $("#questions-container").html("")
        },
        error: function (jqXHR, textStatus, errorThrown) {
          if (
            errorThrown == "Unauthorized" ||
            errorThrown == "Expired token" ||
            textStatus == "error"
          ) {
            invalidSession()
          } else {
            statusModal("quizManagement", "error", "Internal server error!")
          }
        },
      })
    }
  })
}
const emptyForm = () => {
  document.querySelectorAll("#create-quiz-form-head input").forEach(input => {
    input.value = ""
  })
  document.querySelectorAll("#create-quiz-form-head select").forEach(select => {
    select.value = ""
  })
  document
    .querySelectorAll("#create-quiz-form-head textarea")
    .forEach(textarea => {
      textarea.value = ""
    })
}
const viewInDetail = () => {
  document.querySelectorAll(".edit-quiz-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const modal = document.getElementById("details-modal-quiz")
      if (window.getComputedStyle(modal).display == "none") {
        modal.style.display = "flex"
      } else {
        modal.style.display = "none"
      }
      $("#close-btn-head-2").on("click", () => {
        $("#details-modal-quiz").css("display", "none")
      })
      $("#close-btn-footer-2").on("click", () => {
        $("#details-modal-quiz").css("display", "none")
      })
      const quizID = e.target.attributes[2].value
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
          const quizDataHtml = `
            <div>
              <h4>${data.title}</h4>
              <p>${data.description}</p>
              <p>Quiz Length: ${data.duration} minutes</p>
              <p>Category: ${data.category}</p>
            </div>
            <div class="quiz-view-details-modal">
              <h5>Questions:</h5>
              ${quizDetailsQuestion(data)}
            </div>`
          $("#details-body").html(quizDataHtml)
        },
      })
    })
  })
}
const quizDetailsQuestion = data => {
  let questions = ``
  let counter = 0
  data.questions.forEach(question => {
    counter++
    questions += `<p>
    ${counter}.${question.title}
    </p>
    <ul>
      ${answersDetails(question)}
    </ul>
    `
  })
  return questions
}
const answersDetails = question => {
  let listitems = ``
  const fields = question.fields.split("|")
  question.fields = fields.map(field => {
    let fieldData = field.split("<.>")
    return {
      title: fieldData[0],
      isCorrect: fieldData[1] == 1,
    }
  })
  question.fields.forEach(field => {
    listitems += `<li style="color: ${field.isCorrect == "1" ? "green" : ""}">${
      field.title
    }</li>`
  })
  return listitems
}
const removeQuiz = data => {
  const sureModal = document.getElementById("sure-modal")
  document.querySelectorAll(".remove-quiz-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      sureModal.classList.remove("trigger")
      setTimeout(() => {
        sureModal.classList.add("trigger")
      }, 1)
      document.getElementById("cancel-btn").addEventListener("click", () => {
        sureModal.classList.remove("trigger")
      })
      document.getElementById("confirm-btn").addEventListener("click", () => {
        const quizID = e.target.attributes[2].value
        data.forEach(quiz => {
          if (quiz.id == quizID) {
            document.querySelectorAll(".quiz").forEach(quizDiv => {
              if (quizDiv.attributes[1].value == quizID) {
                sureModal.classList.remove("trigger")
                $.ajax({
                  url: `${constants.apiURL}/quiz/remove?quizID=${quizID}`,
                  type: "DELETE",
                  beforeSend: function (xhr) {
                    if (localStorage.getItem("userInformation")) {
                      if (
                        JSON.parse(localStorage.getItem("userInformation"))
                          .token
                      ) {
                        xhr.setRequestHeader(
                          "Authorization",
                          JSON.parse(localStorage.getItem("userInformation"))
                            .token
                        )
                      }
                    }
                  },
                  success: function (response) {
                    quizDiv.remove()
                    statusModal(
                      "quizManagement",
                      "success",
                      "Quiz successfully removed"
                    )
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
                        "quizManagement",
                        "error",
                        "Internal server error!"
                      )
                    }
                  },
                })
              }
            })
          }
        })
        sureModal.classList.remove("trigger")
      })
    })
  })
}
function generateRandomId() {
  const randomNumber = Math.floor(Math.random() * 10000000)
  return randomNumber
}
