export const fetchQuizzesManagement = (value = "") => {
  const quizManagementContainer = document.getElementById(
    "quiz-manage-container"
  )
  $.get("http://127.0.0.1/quiz-app/rest/routes/getListOfQuizzes.php")
    .done(function (data) {
      const parsedData = JSON.parse(data)
      quizManagementContainer.innerHTML = ""
      if (parsedData.length == 0) {
        quizManagementContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`
      }
      parsedData.forEach(quiz => {
        if (quiz.title.toLowerCase().includes(value.toLowerCase())) {
          fillHTMLManagement(quizManagementContainer, quiz)
        } else {
          quizManagementContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`
        }
      })
      viewInDetail()
      removeQuiz(parsedData)
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      quizManagementContainer.innerHTML = `<h3 style="background-color: white; grid-column: 1 / -1; height: 75px; display:flex; justify-content: flex-start; padding:1rem; align-items: center; color: #f65656;   box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px">Error loading quizzes. Please try again later.</h3>`
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
  <div class="quiz" data-quizID="${quiz.quiz_id}">
  <div class="quiz-info">
    <p>Quiz ID: ${quiz.quiz_id}</p>
    <p>Title: ${quiz.title}</p>
    <p>Date created: ${quiz.dateCreated}</p>
  </div>
  <div class="btns-wrapper">
    <button id="detail-quiz-btn-modal" class="edit-quiz-btn" data-id="${quiz.quiz_id}" >View in detail</button>
    <button id="delete-quiz-btn-modal" class="remove-quiz-btn" data-id="${quiz.quiz_id}">Delete</button>
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
      quiz_id: generateRandomId(),
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
        quiz_id: quizCreatedData.quiz_id,
        fields: [],
      }
      questionCounter++
      questionData.questionName = qstn.querySelector("#questionName").value
      questionData.typeOfQuestion = qstn.querySelector("#typeOfQuestion").value
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
        fieldData.isCorrect = isCorrectFields[i].checked
        questionData.fields.push(fieldData)
      }
      quizCreatedData.questions.push(questionData)
    })
    if (questionCounter < 1) {
      statusModal("warning", "Please enter more questions")
    } else {
      quizCreatedData.altText = quizCreatedData.category + "banner"
      quizCreatedData.bannerImage = quizCreatedData.category
      $.post(`http://localhost/quiz-app/rest/routes/createQuiz.php?`, {
        quiz: quizCreatedData,
      })
        .done(function (response) {
          statusModal("success", "Quiz created")
          $("#modal").css("display", "none")
        })
        .fail(function (xhr, status, error) {
          statusModal("error", "Internal server error!")
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
      const url = `http://127.0.0.1/quiz-app/rest/routes/getQuizByID.php?quizID=${quizID}`
      $.get(url).done(function (data) {
        const parsedData = JSON.parse(data)
        const quizDataHtml = `
                      <div
                        <h4>${parsedData.title}</h4>
                        <p>${parsedData.description}</p>
                        <p>Quiz Length: ${parsedData.duration} minutes</p>
                        <p>Category: ${parsedData.category}</p>
                      </div>
                      <div  class="quiz-view-details-modal">
                        <h5>Questions:</h5>
                        ${quizDetailsQuestion(parsedData)}
                      </div>
                    `
        $("#details-body").html(quizDataHtml)
      })
    })
  })
}
const quizDetailsQuestion = data => {
  let questions = ``
  data.questions.forEach(question => {
    questions += `<p>
    ${question.title}
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
  const fieldNames = question.fieldNames.split(",")
  fieldNames.forEach(field => {
    listitems += `<li>${field}</li>`
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
          if (quiz.quiz_id == quizID) {
            document.querySelectorAll(".quiz").forEach(quizDiv => {
              if (quizDiv.attributes[1].value == quizID) {
                sureModal.classList.remove("trigger")
                $.get(
                  `http://127.0.0.1/quiz-app/rest/routes/removeQuiz.php?quizID=${quizID}`
                )
                  .done(function (response) {
                    quizDiv.remove()
                    statusModal("success", "Quiz successfuly removed")
                  })
                  .fail(function (jqXHR, textStatus, errorThrown) {
                    statusModal("error", "Internal server error!")
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
  } else if (type == "warning") {
    modal = `
    <div class="status-modal warning">
      <span class="material-symbols-outlined">warning</span>
      <p><b>Warning</b>: ${message}</p>
      <button class="exit-status-modal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    `
  }
  $("#quizManagement").append(modal)
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

function generateRandomId() {
  const randomNumber = Math.floor(Math.random() * 10000000)
  return randomNumber
}
