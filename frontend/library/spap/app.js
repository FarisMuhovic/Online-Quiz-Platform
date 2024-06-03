import {
  changeTitle,
  hamburgerMenu,
  exitAfterAnchorClick,
  showNavFooter,
  updateListItemColor,
  giveAdminAccess,
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
  },
  onReady: function () {
    if (!JSON.parse(localStorage.getItem("userInformation"))) {
      $("#return-to-dashboard-error")
        .text("Go back to login page")
        .attr("href", "#login")
    }
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
    passwordFieldChange()
  },
  onReady: function () {
    localStorage.clear() // whenever an user goes to login or register, his old credentials are deleted.
    changeTitle(window.location.hash)
  },
})

app.route({
  view: "login",
  load: "login.html",
  onCreate: function () {
    showNavFooter(window.location.hash)
    loginForm()
    passwordFieldChange()
  },

  onReady: function () {
    localStorage.clear()
    changeTitle(window.location.hash)
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
    $("#logout-dash").on("click", () => {
      logout()
    })
  },
  onReady: function () {
    if (!localStorage.getItem("userInformation"))
      window.location.href = "index.html#login"
    findUsername()
    checkUserRole("dash")
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
  onCreate: function () {
    navRender()
  },
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
  loadUserInfo,
} from "../../scripts/profileFunctions.js"
app.route({
  view: "profile",
  load: "profile.html",
  onCreate: function () {
    navRender()
    changePersonalInfo()
    fetchAchievements()
  },
  onReady: function () {
    loadUserInfo()
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
    changeAvatar()
  },
})

import {
  fetchQuizHistory,
  searchQuizHistory,
} from "../../scripts/quizHistoryFunctions.js"

app.route({
  view: "quizHistory",
  load: "quizHistory.html",
  onCreate: function () {
    navRender()
  },
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
    navRender()
  },
  onReady: function () {
    fetchTopUsers()
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
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
  onCreate: function () {
    navRender()
    fetchTopUsers()
  },
  onReady: function () {
    if (!localStorage.getItem("userInformation"))
      window.location.href = "index.html#login"
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
    fetchTopUsers()
    navRender()
  },
  onReady: function () {
    giveAdminAccess()
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
    fetchTopUsers()
    navRender()
  },
  onReady: function () {
    giveAdminAccess()
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
  onCreate: function () {
    fetchTopUsers()
  },
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
  onCreate: function () {
    fetchTopUsers()
    navRender()
  },
  onReady: function () {
    fetchQuizReview()
    changeTitle(window.location.hash)
    navSettings(window.location.hash)
  },
})

$(".logout-btn").on("click", () => {
  logout()
})

const navRender = () => {
  checkUserRole()
}

hamburgerMenu()
navRender()

const navSettings = hash => {
  exitAfterAnchorClick()
  window.scrollTo(0, 0)
  showNavFooter(hash)
  updateListItemColor(hash, "header-nav-list")
  updateListItemColor(hash, "footer-nav-list")
}
app.run()
