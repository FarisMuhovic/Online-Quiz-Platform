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
  pageNotFound: "error",
})

app.route({
  view: "error",
  load: "error_404.html",
  onCreate: function () {
    const hash = window.location.hash
    showNavFooter(hash)
    // if not logged in redirect to login page ( will be null because logged out user wont have a role)
    if (window.localStorage.getItem("role") === null) {
      $("#return-to-dashboard-error")
        .text("Go back to login page")
        .attr("href", "#login")
    }
  },
  onReady: function () {
    showNavFooter(window.location.hash)
  },
})

import {
  passwordFieldChange,
  logout,
  registerForm,
  loginForm,
} from "../../scripts/authFunctions.js"

app.route({
  view: "register",
  load: "register.html",
  onCreate: function () {
    showNavFooter(window.location.hash)
    registerForm()
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
    loginForm()
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

import {
  fetchAchievements,
  changeAvatar,
  changePersonalInfo,
} from "../../scripts/profileFunctions.js"
app.route({
  view: "profile",
  load: "profile.html",
  onCreate: function () {},
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
    changeAvatar()
    changePersonalInfo()
    fetchAchievements()
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

import {
  fetchQuizzesManagement,
  searchQuizManagement,
  createANewQuiz,
} from "../../scripts/quizManagementFunctions.js"
app.route({
  view: "quizManagement",
  load: "quizManagement.html",
  onCreate: function () {
    fetchQuizzesManagement()
    createANewQuiz()
    searchQuizManagement()
  },
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
  },
})

import {fetchUsers, searchUser} from "../../scripts/userManagement.js"

app.route({
  view: "userManagement",
  load: "userManagement.html",
  onCreate: function () {
    fetchUsers()
  },
  onReady: function () {
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
    searchUser()
  },
})

import {
  fetchQuestions,
  submitQuizBtn,
  destroyQuiz,
  showAlert,
} from "../../scripts/quizRender.js"

app.route({
  view: "quiz",
  load: "quiz.html",
  onCreate: function () {},
  onReady: function () {
    submitQuizBtn()
    fetchQuestions(localStorage.getItem("selectedQuizID"))
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
    // warn user when leaving page
    $("a").click(showAlert)

    $(window).on("popstate", function (event) {
      $("a").off("click", showAlert)
      destroyQuiz()
    })
  },
})

import {fetchQuizReview} from "../../scripts/quizReviewFunctions.js"
app.route({
  view: "quizReview",
  load: "quizReview.html",
  onCreate: function () {},
  onReady: function () {
    fetchQuizReview()
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
