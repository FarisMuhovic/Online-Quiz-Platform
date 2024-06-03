export const fetchTopUsers = () => {
  $.ajax({
    url: `${constants.apiURL}/users/leaderboard`,
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
    success: function (data, status) {
      if (data.length === 0) {
        $(".leaderboard-page").html(
          `<h1 id="heading-of-page" style="text-align: center">Leaderboard</h1>
          <img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />
          `
        )
      }
      fillFirstThree(data)
      for (let i = 3; i < data.length; i++) {
        fillLowerLeaderboard(data, i)
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (
        errorThrown == "Unauthorized" ||
        errorThrown == "Expired token" ||
        textStatus == "error"
      ) {
        invalidSession()
      } else {
        statusModal("leaderboard", "error", "Failed to load the leaderboard.")
      }
    },
  })
}

const fillFirstThree = data => {
  $("#first").html(
    `
    <span class="material-symbols-outlined"> workspace_premium </span>
    <img src="./images/avatars/avatar${data[0].avatar}.svg" alt="avatar" />
    <p>${data[0].firstName + " " + data[0].lastName}</p>
    <p>${data[0].totalAttempts} quizzes taken</p>
    <p>${data[0].points} points</p>
    <p>Favourite category: ${findFavCategory(data[0])}</p>
    `
  )
  $("#second").html(
    `
    <span class="material-symbols-outlined"> workspace_premium </span>
    <img src="./images/avatars/avatar${data[1].avatar}.svg" alt="avatar" />
    <p>${data[1].firstName + " " + data[1].lastName}</p>
    <p>${data[1].totalAttempts} quizzes taken</p>
    <p>${data[1].points} points</p>
    <p>Favourite category: ${findFavCategory(data[1])}</p>
    `
  )
  $("#third").html(
    `
    <span class="material-symbols-outlined"> workspace_premium </span>
    <img src="./images/avatars/avatar${data[2].avatar}.svg" alt="avatar" />
    <p>${data[2].firstName + " " + data[2].lastName}</p>
    <p>${data[2].totalAttempts} quizzes taken</p>
    <p>${data[2].points} points</p>
    <p>Favourite category: ${findFavCategory(data[2])}</p>
    `
  )
}
const findFavCategory = attempt => {
  let maxCategory = ""
  let maxAttempts = 0
  for (const key in attempt) {
    if (key.includes("Attempts") && !key.includes("total")) {
      const currentAttempts = attempt[key]
      if (currentAttempts > maxAttempts) {
        maxAttempts = currentAttempts
        maxCategory = key.replace("Attempts", "")
      }
    }
  }
  return maxCategory.charAt(0).toUpperCase() + maxCategory.slice(1)
}
const fillLowerLeaderboard = (data, i) => {
  $("#rest-players").html("")
  $("#rest-players").append(
    `    
    <div class="user-container">
      <img src="./images/avatars/avatar${data[i].avatar}.svg" alt="avatar" />
      <p>Rank ${i + 1}</p>
      <p>${data[i].firstName + " " + data[i].lastName}</p>
      <p>${data[i].totalAttempts} quizzes taken</p>
      <p>${data[i].points} points</p>
      <p>Favourite category: ${
        findFavCategory(data[i]) == "Failed" ? "None" : findFavCategory(data[i])
      }</p>
    </div>
  `
  )
}
