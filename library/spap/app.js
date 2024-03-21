import {
  setNewFact,
  setCurrentDate,
  findUsername,
} from "../../scripts/dashboardFunctions.js"

import {
  changeTitle,
  showNavFooter,
  updateListItemColor,
  logout,
} from "../../scripts/pageFunctions.js"

import {passwordFieldChange} from "../../scripts/authFunctions.js"
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
    setNewFact()
    setCurrentDate()
    findUsername()
    $("#logout-dash").on("click", () => {
      logout()
    })
  },
  onReady: function () {
    const hash = window.location.hash
    changeTitle(hash)
    updateNav(hash)
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

function updateNav(hash) {
  changeTitle(hash)
  showNavFooter(hash)
  updateListItemColor(hash, "header-nav-list")
  updateListItemColor(hash, "footer-nav-list")
  window.scrollTo(0, 0) // remove scroll to section animation
}

// Run the app
app.run()
