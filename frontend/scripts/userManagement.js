export const fetchUsers = (value = "") => {
  const userContainer = document.getElementById("user-container")
  $.get("http://127.0.0.1/quiz-app/rest/routes/getAllUsers.php")
    .done(function (data) {
      const parsedData = JSON.parse(data)
      userContainer.innerHTML = ""
      if (parsedData.length == 0) {
        userContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`
      }
      parsedData.forEach(function (user) {
        if (
          user.firstName.toLowerCase().includes(value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLowerCase())
        ) {
          fillHTMLwithUsers(userContainer, user)
        } else {
          userContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`
        }
      })
      setRole(parsedData)
      removeUser(parsedData)
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error fetching data:", textStatus, errorThrown)
      userContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`
    })
}
export const searchUser = () => {
  $("#search-form-user-management").on("submit", e => {
    e.preventDefault()
    fetchUsers($("#search-bar-user-management").val())
  })
}

const fillHTMLwithUsers = (userContainer, user) => {
  userContainer.innerHTML += `    
  <div class="user" data-userID="${user.user_id}">
    <div class="user-info" id="user-info">
      <p>User ID: ${user.user_id}</p>
      <p>Name: ${user.firstName} ${user.lastName}</p>
      <p>Type: ${user.role}</p>
      <p>Email: ${user.email}</p>
      <p>Date registered: ${user.joinDate}</p>
    </div>
    <div class="btns-wrapper">
      <button id="changeRoleBtn" class="change-role" data-id="${
        user.user_id
      }">${user.role == "admin" ? "Demote" : "Promote"}</button>
      <button id="removeUserBtn" class="remove-user" data-id="${
        user.user_id
      }">Remove</button>
    </div>
  </div>`
}

const setRole = data => {
  const sureModal = document.getElementById("sure-modal-2")
  let userID
  document.querySelectorAll(".change-role").forEach(btn => {
    btn.addEventListener("click", e => {
      userID = e.target.getAttribute("data-id")
      sureModal.classList.remove("trigger")
      setTimeout(() => {
        sureModal.classList.add("trigger")
      }, 1)
      document.getElementById("cancel-btn-2").addEventListener("click", () => {
        sureModal.classList.remove("trigger")
      })

      const confirmBtn = document.getElementById("confirm-btn-2")
      if (!confirmBtn.getAttribute("data-event-listener")) {
        confirmBtn.addEventListener("click", () => {
          confirmBtn.setAttribute("data-event-listener", true)
          // console.log(userID)
          data.forEach(user => {
            if (user.user_id == userID) {
              document.querySelectorAll(".user").forEach(userDiv => {
                if (userDiv.attributes[1].value == userID) {
                  $.post(
                    `http://127.0.0.1/quiz-app/rest/routes/changeRole.php`,
                    {
                      userID: userID,
                      role: user.role == "user" ? "admin" : "user",
                    }
                  )
                    .done(function (response) {
                      if (user.role == "user") {
                        user.role = "admin"
                      } else {
                        user.role = "user"
                      }
                      userDiv.children[0].children[2].innerText = `Type: ${user.role}`
                      statusModal("success", "User role changed")
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                      statusModal("error", "Internal server error!")
                    })
                    .always(function () {
                      sureModal.classList.remove("trigger")
                    })
                }
              })
            }
          })
        })
      }
    })
  })
}
const removeUser = data => {
  const sureModal = document.getElementById("sure-modal-3")
  let userID
  document.querySelectorAll(".remove-user").forEach(btn => {
    btn.addEventListener("click", e => {
      userID = e.target.getAttribute("data-id")
      sureModal.classList.remove("trigger")
      setTimeout(() => {
        sureModal.classList.add("trigger")
      }, 1)
      document.getElementById("cancel-btn-3").addEventListener("click", () => {
        sureModal.classList.remove("trigger")
      })
      const confirmBtn = document.getElementById("confirm-btn-3")
      if (!confirmBtn.getAttribute("data-event-listener")) {
        document
          .getElementById("confirm-btn-3")
          .addEventListener("click", () => {
            confirmBtn.setAttribute("data-event-listener", true)
            data.forEach(user => {
              if (user.user_id == userID) {
                document.querySelectorAll(".user").forEach(userDiv => {
                  if (userDiv.attributes[1].value == userID) {
                    $.get(
                      `http://127.0.0.1/quiz-app/rest/routes/removeUser.php?userID=${userID}`
                    )
                      .done(function (response) {
                        userDiv.remove()
                        statusModal("success", "User successfully removed")
                      })
                      .fail(function (jqXHR, textStatus, errorThrown) {
                        statusModal("error", "Internal server error!")
                      })
                      .always(function () {
                        sureModal.classList.remove("trigger")
                      })
                  }
                })
              }
            })
            sureModal.classList.remove("trigger")
          })
      }
    })
  })
}

const statusModal = (type, message) => {
  let modal
  if (type == "error") {
    modal = `
    <div class="status-modal error">
      <span class="material-symbols-outlined">error</span>
      <p><b>Error</b>: ${message}</p>
      <button class="exit-status-modal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    `
  } else if (type == "success") {
    modal = `
    <div class="status-modal success">
      <span class="material-symbols-outlined">check</span>
      <p><b>Success</b>: ${message}</p>
      <button class="exit-status-modal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    `
  } else if (type == "warning") {
    modal = `
    <div class="status-modal warning">
      <span class="material-symbols-outlined">warning</span>
      <p><b>Warning</b>: ${message}</p>
      <button class="exit-status-modal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    `
  }
  $("#userManagement").append(modal)
  const exitmodalbtns = document.querySelectorAll(".exit-status-modal")
  exitmodalbtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.target.parentElement.parentElement.remove()
    })
  })
  setTimeout(() => {
    exitmodalbtns.forEach(btn => {
      btn.parentNode.remove()
    })
  }, 4000)
}
