export const fetchTopUsers = () => {
  $.get("./data/leaderboard.json", (data, status) => {
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
  })
}

const fillFirstThree = data => {
  $("#first").html(
    `
    <span class="material-symbols-outlined"> workspace_premium </span>
    <img src="./images/avatars/${data[0].avatar}" alt="avatar" />
    <p>${data[0].name}</p>
    <p>${data[0].quizzesTaken} quizzes taken</p>
    <p>${data[0].points} points</p>
    <p>Favourite category: ${data[0].favoriteCategory}</p>
    `
  )
  $("#second").html(
    `
    <span class="material-symbols-outlined"> workspace_premium </span>
    <img src="./images/avatars/${data[1].avatar}" alt="avatar" />
    <p>${data[1].name}</p>
    <p>${data[1].quizzesTaken} quizzes taken</p>
    <p>${data[1].points} points</p>
    <p>Favourite category: ${data[1].favoriteCategory}</p>
    `
  )
  $("#third").html(
    `
    <span class="material-symbols-outlined"> workspace_premium </span>
    <img src="./images/avatars/${data[2].avatar}" alt="avatar" />
    <p>${data[2].name}</p>
    <p>${data[2].quizzesTaken} quizzes taken</p>
    <p>${data[2].points} points</p>
    <p>Favourite category: ${data[2].favoriteCategory}</p>
    `
  )
}
const fillLowerLeaderboard = (data, i) => {
  $("#rest-players").append(
    `    
    <div class="user-container">
      <img src="./images/avatars/${data[i].avatar}" alt="avatar" />
      <p>Rank ${data[i].ranking}</p>
      <p>${data[i].name}c</p>
      <p>${data[i].quizzesTaken} quizzes taken</p>
      <p>${data[i].points} points</p>
      <p>Favourite category: ${data[i].favoriteCategory}</p>
    </div>
  `
  )
}
