export const fetchQuizzesManagement = (value = "") => {
  const quizManagementContainer = document.getElementById(
    "quiz-manage-container"
  )
  $.get("./data/quizBanner.json", (data, status) => {
    quizManagementContainer.innerHTML = ""
    if (data.length == 0) {
      quizManagementContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`
    }
    data.forEach(quiz => {
      if (quiz.title.toLowerCase().includes(value.toLowerCase())) {
        fillHTMLManagement(quizManagementContainer, quiz)
      } else {
        quizManagementContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`
      }
    })
    viewInDetail()
    removeQuiz(data)
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
        }
        fieldData.text = inputsAnswers[i].value
        fieldData.isCorrect = isCorrectFields[i].checked
        questionData.fields.push(fieldData)
      }
      quizCreatedData.questions.push(questionData)
    })
    if (questionCounter == 0) {
      statusModal("warning", "Please enter more questions")
    } else {
      $.post("/restapi/addquiz", quizCreatedData)
        .done(function (response) {
          if (response.ok) statusModal("Success", "Quiz created")
          $("#modal").css("display", "none")
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          statusModal("error", "Internal server error!")
        })
    }
    console.log(quizCreatedData)
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
      $.post("/restapi/getQuizDetails", quizID).done(function (response) {})
      // get request is just demonstration purposes, but logic inside of get request goes into post
      $.get("./data/quizexample.json", (data, status) => {
        console.log(data)
        const quizDataHtml = `
            <div
              <h4>${data.title}</h4>
              <p>${data.description}</p>
              <p>Quiz Length: ${data.quizLength} minutes</p>
              <p>Category: ${data.category}</p>
            </div>
            <div  class="quiz-view-details-modal">
              <h5>Questions:</h5>
              ${quizDetailsQuestion(data)}
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
    ${question.questionName}
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
  question.fields.forEach(field => {
    listitems += `<li>${field.title}</li>`
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

                $.post("restapi/quiz/remove", quizID)
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
