export const fetchQuizReview = () => {
  const quizReviewContainer = document.getElementById("quiz-review-container")
  quizReviewContainer.innerHTML = ""
  const selectedQuizID = localStorage.getItem("selectedReviewQuizID")
  const userEmail = JSON.parse(localStorage.getItem("userInformation")).email
  $.post("http://localhost/quiz-app/rest/routes/getSpecificQuizHistory.php", {
    quizID: selectedQuizID,
    email: userEmail,
  })
    .done(function (data) {
      const parsedData = JSON.parse(data)
      console.log(parsedData)
      // Executed when the request is successful
      quizReviewContainer.innerHTML = `
    <section class="heading">
      <h1>${parsedData.title}</h1>
      <h3>${parsedData.category}</h3>
      <p>Your score: ${parsedData.correctAnswers}/${parsedData.amountOfQuestions}</p>
      <h3>Color info:</h3>
      <div class="info-div">
        <p>Red: your answer (wrong)</p>
        <p>Green: right answer, and your answer.</p>
        <p>Note: if every answer is red (except the right one), that means you didn't answer at all.</p>
      </div>
      </section>
    `
      parsedData.responses.forEach(answer => {
        quizReviewContainer.innerHTML += `
        <section class="question">
          <h4 class="question-title">${answer.questionName}</h4>
          <div class="question-answers">
            ${insertAnswersHTML(answer)}
          </div>
        </section>
        `
      })
    })
    .fail(function () {
      // console.error("Request failed.")
      quizReviewContainer.innerHTML = `<h3 style="background-color: white; grid-column: 1 / -1; height: 75px; display:flex; justify-content: flex-start; padding:1rem; align-items: center; color: #f65656;   box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px">Error loading quiz history. Please try again later.</h3>`
    })
}
const insertAnswersHTML = answer => {
  let answersHTML = ""

  // checks if array of answers contains not answered text
  // means that the user didnt answer this question
  if (answer.answers.some(item => item.text.includes("Not answered"))) {
    answer.answerFields.forEach(field => {
      answersHTML += `<p class="answer
       ${field.isCorrect == "true" ? "correct" : "wrong"}
      ">${field.title}</p>`
    })
  } else {
    // if answered
    for (let i = 0; i < answer.answerFields.length; i++) {
      answersHTML += `<p class="answer
      ${
        answer.answers[i].text == answer.answerFields[i].title
          ? answer.answerFields[i].isCorrect == "true"
            ? "correct"
            : "wrong"
          : ""
      } ${answer.answerFields[i].isCorrect == "true" ? "correct" : ""}
      ">${answer.answerFields[i].title}</p>
      `
    }
  }
  return answersHTML
}
