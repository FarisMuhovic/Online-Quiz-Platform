export const fetchTopUsers = () => {
  const leaderboardContainer = document.getElementById("leaderboard-container")
  // 2 fetches 1 for this user 1 for other 9
  fetch("../data/user.json")
    .then(response => response.json())
    .then(data => {
      fillHTMLusers(leaderboardContainer, data)
      fetch("../data/leaderboard.json")
        .then(response => response.json())
        .then(data =>
          data.forEach(user => fillHTMLusers(leaderboardContainer, user))
        )
    })
}

const fillHTMLusers = (leaderboardContainer, user) => {
  console.log(user)
  leaderboardContainer.innerHTML += `
  <section class="user-ranking">
    <p>
      <span class="user-ranking-label">Ranking: </span>
      <span>${user.ranking}</span>
    </p>
    <img src="./images/avatars/avatar_7.png" alt="avatar" loading="lazy" />
    <p>${user.name}</p>
    <p>${user.points} points</p>
    <p>${user.quizzesTaken} quizzes taken</p>
    <p>Favourite category: ${user.favoriteCategory}</p>
  </section>
`
}
