const headerList = document.getElementById("header-nav-list")
const hamburgerBtn = document.getElementById("hamburger-menu")
hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("open")
  headerList.classList.toggle("show")
})

const changeTitle = hash => {
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

const showNavFooter = hash => {
  if (hash === "#login" || hash === "#register" || hash === "#dashboard") {
    $("footer").css("display", "none")
    $("header").css("display", "none")
  } else {
    $("footer").css("display", "flex")
    $("header").css("display", "block")
  }
}

const updateListItemColor = (hash, elementID) => {
  $(`#${elementID}`)
    .find("a")
    .each((index, link) => {
      link.classList.remove("active-link")
      if (link.attributes[0].nodeValue === hash) {
        link.classList.add("active-link")
        window.scrollTo(0, 0)
        if (window.innerHeight <= 768) {
          console.log(window.innerHeight)
          hamburgerBtn.classList.remove("open")
          headerList.classList.remove("show")
        }
      }
    })
}

$(window).on("hashchange", () => {
  const hash = window.location.hash
  updateListItemColor(hash, "header-nav-list")
  updateListItemColor(hash, "footer-nav-list")
  showNavFooter(hash)
  changeTitle(hash)
})
