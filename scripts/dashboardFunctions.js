export const setNewFact = () => {
  fetch("./data/facts.json")
    .then(response => {
      return response.json()
    })
    .then(data => {
      const factsNumber = Number(data.factCount)
      const randomNumber = Math.round(Math.random() * factsNumber)
      $("#fun-fact-p").text(data.facts[randomNumber])
    })
}

export const setCurrentDate = () => {
  const currentDate = new Date()
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayOfTheWeek = weekdays[currentDate.getDay()]
  const currentMonth = months[currentDate.getMonth()]
  $("#time-p").text(
    `Today is ${dayOfTheWeek}, ${currentMonth} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
  )
}

const setUsername = name => {
  $("#username-h").text(`Welcome back, ${name} 👋`)
}

export const findUsername = () => {
  let name = localStorage.getItem("name")
  if (name) {
    setUsername(name)
  } else {
    setUsername("")
  }
}
// ajax
export const checkUserRole = type => {
  let userInfo = null
  userInfo = JSON.parse(localStorage.getItem("userInformation"))

  if (userInfo) {
    if (userInfo.role == "admin") {
      type == "dash" ? addAdminSection() : addAdminListItem()
    } else if (!userInfo.role) {
      $.post("restapi/getRole", userInfo.id)
        .done(function (response) {
          userInfo.role = response.data.role
          localStorage.setItem("userInformation", userInfo)
          if (data.role == "admin") {
            type == "dash" ? addAdminSection() : addAdminListItem()
          }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {})
    }
  }
}

const addAdminSection = () => {
  const dashboard = document.querySelector(".dashboard")
  const lastSection = dashboard.lastElementChild

  const quizManagement = document.createElement("section")
  quizManagement.className = "dashboard-item"
  quizManagement.innerHTML = `
    <a href="#quizManagement">
      <img
        src="./images/dashboard-banners/settings.png"
        alt="Quiz management banner"
        loading="lazy"
      />
      <h3>Manage quizes</h3>
    </a>
    <p>Create, edit or delete quizzes.</p>`

  const userManagement = document.createElement("section")
  userManagement.className = "dashboard-item"
  userManagement.innerHTML = `
  <a href="#userManagement">
      <img
        src="./images/dashboard-banners/manageusers.png"
        alt="User management banner"
        loading="lazy"
      />
      <h3>Manage users</h3>
  </a>
  <p>See a list of users, and create them or update their information.</p>
`

  dashboard.insertBefore(quizManagement, lastSection)
  dashboard.insertBefore(userManagement, lastSection)
}

const addAdminListItem = () => {
  const headerList = document.getElementById("header-nav-list")
  const footerList = document.getElementById("footer-nav-list")

  const lastListItemHeader = headerList.lastElementChild

  const quizManagementHeader = document.createElement("li")
  quizManagementHeader.innerHTML = `
    <a href="#quizManagement">
      <span class="material-symbols-outlined"> border_color </span>
      <span>Quiz management</span>
    </a>`
  headerList.insertBefore(quizManagementHeader, lastListItemHeader)

  const userManagementHeader = document.createElement("li")
  userManagementHeader.innerHTML = `
    <a href="#userManagement">
      <span class="material-symbols-outlined"> manage_accounts </span>
      <span>User management</span>
    </a>`
  headerList.insertBefore(userManagementHeader, lastListItemHeader)

  const quizManagementFooter = document.createElement("li")
  quizManagementFooter.innerHTML = `
    <a href="#quizManagement">
      <span>Quiz management</span>
    </a>`

  const userManagementFooter = document.createElement("li")
  userManagementFooter.innerHTML = `
    <a href="#userManagement">
      <span>User management</span>
    </a>`

  footerList.append(quizManagementFooter, userManagementFooter)
}
