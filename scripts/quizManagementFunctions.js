export const fetchQuizzesManagement = (value = "") => {
  const quizManagementContainer = document.getElementById(
    "quiz-manage-container"
  )
  $.get("../data/quizBanner.json", (data, status) => {
    quizManagementContainer.innerHTML = ""
    data.forEach(quiz => {
      if (quiz.title.toLowerCase().includes(value.toLowerCase())) {
        fillHTMLManagement(quizManagementContainer, quiz)
      }
    })
    viewInDetail()
    removeQuiz(data)
  })
}
export const searchQuizManagement = () => {
  $("#search-form").on("submit", e => {
    e.preventDefault()
    fetchQuizzesManagement($("#search-bar").val())
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
    // on click empty form values
  })
  $("#close-btn-footer").on("click", () => {
    $("#modal").css("display", "none")
    // on click empty form values ?
  })
  var questioncount = 0
  $("#add-question-btn").on("click", () => {
    questioncount++
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
          class="quizAnswersCount${String(questioncount)}"
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

    $(`.quizAnswersCount${questioncount}`).on("input", function (e) {
      if (e.target.value <= 5 && e.target.value > 0) {
        $(this)[0].parentNode.parentNode.children[1].innerHTML = ""
        for (let i = 0; i < e.target.value; i++) {
          $(
            this
          )[0].parentNode.parentNode.children[1].innerHTML += `<div class="question-answer">
            <input type="text" name="questionAnswer${
              i + 1
            }" id="" placeholder="Answer" required />
            <label>
              <input type="checkbox" name="correctQuestionAnswer${
                i + 1
              }" id="" />
              <span>Correct Answer</span>
            </label>
          </div>`
        }
      }
    })
    $(".delete-qstn-btn").one("click", function () {
      $(this)[0].parentNode.parentNode.remove()
      questioncount--
    })
  })
  submitFormQuiz()
}
const submitFormQuiz = () => {
  const modalForm = document.getElementById("create-quiz-form-head")
  const formObject = {}
  modalForm.addEventListener("submit", e => {
    e.preventDefault()
    let modalformelements = modalForm.children
    for (let i = 0; i < modalformelements.length; i++) {
      if (modalformelements[i].name) {
        formObject[modalformelements[i].name] = modalformelements[i].value
      }
    }
    let questioncount = 0
    formObject["questions"] = []
    document.querySelectorAll(".question").forEach(question => {
      const questionData = {}
      questioncount++

      const inputs = question.querySelectorAll("input")
      const selectboxes = question.querySelectorAll("select")
      inputs.forEach(input => {
        if (input.name.includes("correctQuestionAnswer")) {
          questionData[input.name] = input.checked
        } else {
          questionData[input.name] = input.value
        }
      })
      selectboxes.forEach(select => {
        questionData[select.name] = select.value
      })
      // formObject[`question${questioncount}`] = questionData
      formObject["questions"].push(questionData)
    })
    console.log(formObject)
    if (questioncount == 0) {
      // send error modal neeed to enter questions
    } else if ("fail") {
      // error modal
    } else {
      $("#modal").css("display", "none")
      // sucess modal
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
      $.get("../data/quizexample.json", (data, status) => {
        console.log(data)
        const quizDataHtml = `
            <div>
              <h2>${data.title}</h2>
              <p>${data.description}</p>
              <p>Quiz Length: ${data.quizLength} minutes</p>
              <p>Category: ${data.category}</p>
            </div>
            <div>
              <h3>Questions:</h3>
              ${data.questions
                .map(
                  (question, index) => `
                <div>
                  <h4>Question ${index + 1}: ${question.questionName}</h4>
                  <p>Type of Question: ${question.typeOfQuestion}</p>
                  <ul>
                    ${Object.keys(question)
                      .filter(key => key.startsWith("questionAnswer"))
                      .map(
                        answerKey => `
                      <li>${question[answerKey]}</li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              `
                )
                .join("")}
            </div>
          `
        $("#details-body").html(quizDataHtml)
      })
    })
  })
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
                quizDiv.remove()
                sureModal.classList.remove("trigger")
                // make a post request to update that users role
                // status modals
              }
            })
          }
        })
        sureModal.classList.remove("trigger")
      })
    })
  })
}
