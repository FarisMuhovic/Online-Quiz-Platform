import {
  setNewFact,
  setCurrentDate,
  findUsername,
  checkUserRole,
} from "../../scripts/dashboardFunctions.js"

import {
  changeTitle,
  showNavFooter,
  updateListItemColor,
  logout,
} from "../../scripts/pageFunctions.js"

import {passwordFieldChange} from "../../scripts/authFunctions.js"

import {
  fetchQuizzes,
  searchQuiz,
  clearSearchFilters,
} from "../../scripts/quizSearchFunctions.js"

import {
  fetchQuizHistory,
  searchQuizHistory,
} from "../../scripts/historyFunctions.js"

var app = $.spapp({
  defaultView: "#dashboard",
  templateDir: "views/",
  // pageNotFound: "error_404",
})

app.route({
  view: "register",
  load: "register.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
    passwordFieldChange()
  },
})

app.route({
  view: "login",
  load: "login.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
    passwordFieldChange()
  },
})

app.route({
  view: "dashboard",
  load: "dashboard.html",
  onCreate: function () {
    setCurrentDate()
    findUsername()
    $("#logout-dash").on("click", () => {
      logout()
    })
    checkUserRole("dash")
  },
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
    setNewFact()
    // add or remove admin fields
  },
})

app.route({
  view: "quizSearch",
  load: "quizSearch.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
    fetchQuizzes()
    clearSearchFilters()
    searchQuiz()
  },
})

app.route({
  view: "profile",
  load: "profile.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
  },
})

app.route({
  view: "quizHistory",
  load: "quizHistory.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
    fetchQuizHistory()
    searchQuizHistory()
  },
})

app.route({
  view: "leaderboard",
  load: "leaderboard.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
  },
})

app.route({
  view: "analytics",
  load: "analytics.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
  },
})

app.route({
  view: "quizManagement",
  load: "quizManagement.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
  },
})

app.route({
  view: "userManagement",
  load: "userManagement.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
  },
})

app.route({
  view: "quiz",
  load: "quiz.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
  },
})

app.route({
  view: "quizReview",
  load: "quizReview.html",
  onCreate: function () {},
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
  },
})

// Navigation Bars functionality
// for nav add or remove admin fields
const headerList = document.getElementById("header-nav-list")
const hamburgerBtn = document.getElementById("hamburger-menu")
hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("open")
  headerList.classList.toggle("show")
})
//log out nav btn
$(".logout-btn").on("click", () => {
  logout()
})

const updateNav = hash => {
  changeTitle(hash)
  showNavFooter(hash)
  updateListItemColor(hash, "header-nav-list")
  updateListItemColor(hash, "footer-nav-list")
  window.scrollTo(0, 0) // remove scroll to section animation
}
checkUserRole()
// Run the app
app.run()
