import {
  changeTitle,
  hamburgerMenu,
  exitAfterAnchorClick,
  showNavFooter,
  updateListItemColor,
} from "../../scripts/pageFunctions.js"

var app = $.spapp({
  defaultView: "#dashboard",
  templateDir: "views/",
  // pageNotFound: "error_404",
})

import {passwordFieldChange, logout} from "../../scripts/authFunctions.js"

app.route({
  view: "register",
  load: "register.html",
  onCreate: function () {
    showNavFooter(window.location.hash)
  },
  onReady: function () {
    changeTitle(window.location.hash)
    passwordFieldChange()
  },
})

app.route({
  view: "login",
  load: "login.html",
  onCreate: function () {
    showNavFooter(window.location.hash)
  },

  onReady: function () {
    changeTitle(window.location.hash)
    passwordFieldChange()
  },
})

import {
  setNewFact,
  setCurrentDate,
  findUsername,
  checkUserRole,
} from "../../scripts/dashboardFunctions.js"

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
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
    setNewFact()
  },
})

import {
  fetchQuizzes,
  searchQuiz,
  clearSearchFilters,
} from "../../scripts/quizSearchFunctions.js"

app.route({
  view: "quizSearch",
  load: "quizSearch.html",
  onCreate: function () {},
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
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
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
  },
})

import {
  fetchQuizHistory,
  searchQuizHistory,
} from "../../scripts/quizHistoryFunctions.js"

app.route({
  view: "quizHistory",
  load: "quizHistory.html",
  onCreate: function () {},
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
    fetchQuizHistory()
    searchQuizHistory()
  },
})

import {fetchTopUsers} from "../../scripts/leaderboardFunctions.js"

app.route({
  view: "leaderboard",
  load: "leaderboard.html",
  onCreate: function () {
    fetchTopUsers()
  },
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
    // fetchTopUsers()
  },
})

import {
  generateBarChart,
  generatePieChart,
  generateLineChart,
} from "../../scripts/analyticsFunctions.js"

app.route({
  view: "analytics",
  load: "analytics.html",
  onCreate: function () {},
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
    generatePieChart()
    generateBarChart()
    generateLineChart()
  },
})

app.route({
  view: "quizManagement",
  load: "quizManagement.html",
  onCreate: function () {},
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
  },
})

app.route({
  view: "userManagement",
  load: "userManagement.html",
  onCreate: function () {},
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
  },
})

app.route({
  view: "quiz",
  load: "quiz.html",
  onCreate: function () {},
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
  },
})

app.route({
  view: "quizReview",
  load: "quizReview.html",
  onCreate: function () {},
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
  },
})

$(".logout-btn").on("click", () => {
  logout()
})

hamburgerMenu()
checkUserRole()

const navSettings = hash => {
  window.scrollTo(0, 0)
  showNavFooter(hash)
  updateListItemColor(hash, "header-nav-list")
  updateListItemColor(hash, "footer-nav-list")
  exitAfterAnchorClick() // for mobile only
}

app.run()
