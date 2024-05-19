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
      document.title = "Doing a quiz"
      break
    case "#quizHistory":
      document.title = "Checking previous quizzes"
      break
    case "#quizReview":
      document.title = "Reviewing a quiz"
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
export const hamburgerMenu = () => {
  const headerList = document.getElementById("header-nav-list")
  const hamburgerBtn = document.getElementById("hamburger-menu")
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("open")
    headerList.classList.toggle("show")
  })
}
export const exitAfterAnchorClick = () => {
  const headerlistAnchors = document.querySelectorAll("#header-nav-list li a")
  const headerList = document.getElementById("header-nav-list")
  const hamburgerBtn = document.getElementById("hamburger-menu")
  headerlistAnchors.forEach(anchor => {
    anchor.addEventListener("click", () => {
      hamburgerBtn.classList.remove("open")
      headerList.classList.remove("show")
    })
  })
}
export const showNavFooter = hash => {
  if (
    hash === "#login" ||
    hash === "#register" ||
    hash === "#dashboard" ||
    hash === "#error"
  ) {
    $("footer").css("display", "none")
    $("header").css("display", "none")
  } else {
    $("footer").css("display", "flex")
    $("header").css("display", "block")
  }
}
export const updateListItemColor = (hash, elementID) => {
  const headerList = document.getElementById("header-nav-list")
  const hamburgerBtn = document.getElementById("hamburger-menu")
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
export const giveAdminAccess = () => {
  $.ajax({
    url: `${constants.apiURL}/users/role`,
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
    success: function (response) {
      if (response.message == "Admin access granted") {
      } else {
        window.location.href = "index.html#dashboard"
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      window.location.href = "index.html#dashboard"
    },
  })
}
