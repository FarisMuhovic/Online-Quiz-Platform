export const changeTitle = hash => {
  switch (hash) {
    case "#analytics":
      document.title = "Analysing charts"
      break
    case "#dashboard":
      document.title = "Viewing dashboard"
      break
    case "#leaderboard":
      document.title = "Leaderboard"
      break
    case "#login":
      document.title = "Login page"
      break
    case "#register":
      document.title = "Register page"
      break
    case "#profile":
      document.title = "Viewing profile"
      break
    case "#quiz":
      // document.title = "Doing a quiz" doing a quiz NAME / do not implement
      break
    case "#quizHistory":
      document.title = "Checking previous quizzes"
      break
    case "#quizReview":
      // document.title = "Login page" reviewing QUIZ NAME / do not implement
      break
    case "#quizSearch":
      document.title = "Searching for a quiz"
      break
    case "#quizManagement":
      document.title = "Managing quizzes"
      break
    case "#userManagement":
      document.title = "Managing users"
      break
    default:
      break
  }
}

export const showNavFooter = hash => {
  if (hash === "#login" || hash === "#register" || hash === "#dashboard") {
    $("footer").css("display", "none")
    $("header").css("display", "none")
  } else {
    $("footer").css("display", "flex")
    $("header").css("display", "block")
  }
}

export const updateListItemColor = (hash, elementID) => {
  $(`#${elementID}`)
    .find("a")
    .each((index, link) => {
      link.classList.remove("active-link")
      if (link.attributes[0].nodeValue === hash) {
        link.classList.add("active-link")
        if (window.innerHeight <= 768) {
          hamburgerBtn.classList.remove("open")
          headerList.classList.remove("show")
        }
      }
    })
}

export const logout = () => {
  console.log("logging out the user")
  window.location.href = "index.html#login"
}
