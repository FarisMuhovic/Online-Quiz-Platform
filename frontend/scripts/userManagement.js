export const fetchUsers = (value = "") => {
  const userContainer = document.getElementById("user-container")
  $.ajax({
    url: `${constants.apiURL}/users`,
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
    success: function (data) {
      userContainer.innerHTML = ""
      if (data.length === 0) {
        userContainer.innerHTML = `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" id="errbner"/>`
      }
      data.forEach(function (user) {
        if (
          user.firstName.toLowerCase().includes(value.toLowerCase()) ||
          user.lastName.toLowerCase().includes(value.toLowerCase())
        ) {
          fillHTMLwithUsers(userContainer, user)
        }
      })
      setRole(data)
      removeUser(data)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (
        errorThrown == "Unauthorized" ||
        errorThrown == "Expired token" ||
        textStatus == "error"
      ) {
        invalidSession()
      } else {
        userContainer.innerHTML = constants.errorBanner("Failed to load users.")
      }
    },
  })
}
export const searchUser = () => {
  $("#search-form-user-management").on("submit", e => {
    e.preventDefault()
    fetchUsers($("#search-bar-user-management").val())
  })
}

const fillHTMLwithUsers = (userContainer, user) => {
  if (localStorage.getItem("userInformation")) {
    if (
      user.email == JSON.parse(localStorage.getItem("userInformation")).email
    ) {
      return
    }
  }
  userContainer.innerHTML += `    
  <div class="user" data-userID="${user.id}">
    <div class="user-info" id="user-info">
      <p>Age: ${user.age}</p>
      <p>Name: ${user.firstName} ${user.lastName}</p>
      <p>Type: ${user.role}</p>
      <p>Email: ${user.email}</p>
      <p>Date registered: ${user.joinDate}</p>
    </div>
    <div class="btns-wrapper">
      <button id="changeRoleBtn" class="change-role" data-id="${user.id}">${
    user.role == "admin" ? "Demote" : "Promote"
  }</button>
      <button id="removeUserBtn" class="remove-user" data-id="${
        user.id
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
          data.forEach(user => {
            if (user.id == userID) {
              document.querySelectorAll(".user").forEach(userDiv => {
                if (userDiv.attributes[1].value == userID) {
                  $.ajax({
                    url: `${constants.apiURL}/users/updateRole`,
                    type: "PUT",
                    beforeSend: function (xhr) {
                      if (
                        JSON.parse(localStorage.getItem("userInformation"))
                          .token
                      ) {
                        xhr.setRequestHeader(
                          "Authorization",
                          JSON.parse(localStorage.getItem("userInformation"))
                            .token
                        )
                      }
                    },
                    data: JSON.stringify({
                      userID: userID,
                      role: user.role == "user" ? "admin" : "user",
                    }),
                    contentType: "application/json",
                    success: function (response) {
                      if (user.role == "user") {
                        user.role = "admin"
                      } else {
                        user.role = "user"
                      }
                      userDiv.children[0].children[2].innerText = `Type: ${user.role}`
                      btn.innerHTML =
                        user.role == "admin" ? "Demote" : "Promote"
                      statusModal(
                        "userManagement",
                        "success",
                        "User role changed"
                      )
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      statusModal(
                        "userManagement",
                        "error",
                        "Internal server error!"
                      )
                    },
                    complete: function () {
                      sureModal.classList.remove("trigger")
                    },
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
              if (user.id == userID) {
                document.querySelectorAll(".user").forEach(userDiv => {
                  if (userDiv.attributes[1].value == userID) {
                    $.ajax({
                      url: `${constants.apiURL}/users/remove?userID=${userID}`,
                      type: "DELETE",
                      beforeSend: function (xhr) {
                        if (
                          JSON.parse(localStorage.getItem("userInformation"))
                            .token
                        ) {
                          xhr.setRequestHeader(
                            "Authorization",
                            JSON.parse(localStorage.getItem("userInformation"))
                              .token
                          )
                        }
                      },
                      success: function (response) {
                        userDiv.remove()
                        statusModal(
                          "userManagement",
                          "success",
                          "User successfully removed"
                        )
                      },
                      error: function (jqXHR, textStatus, errorThrown) {
                        statusModal(
                          "userManagement",
                          "error",
                          "Internal server error!"
                        )
                      },
                      complete: function () {
                        sureModal.classList.remove("trigger")
                      },
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
