export const fetchUsers = (value = "") => {
  const userContainer = document.getElementById("user-container")
  $.get("../data/otherusers.json", (data, status) => {
    userContainer.innerHTML = ""
    data.forEach(user => {
      if (user.name.toLowerCase().includes(value.toLowerCase())) {
        fillHTMLwithUsers(userContainer, user)
      }
    })
    setRole(data)
    removeUser(data)
  })
}
export const searchUser = () => {
  $("#search-form").on("submit", e => {
    e.preventDefault()
    fetchUsers($("#search-bar").val())
  })
}

const fillHTMLwithUsers = (userContainer, user) => {
  userContainer.innerHTML += `    
  <div class="user" data-userID="${user.id}">
    <div class="user-info" id="user-info">
      <p>User ID: ${user.id}</p>
      <p>Name: ${user.name}</p>
      <p>Type: ${user.role}</p>
      <p>Email: ${user.email}</p>
      <p>Date registered: ${user.join_date}</p>
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
          console.log(userID)
          data.forEach(user => {
            if (user.id == userID) {
              if (user.role == "user") {
                user.role = "admin"
              } else {
                user.role = "user"
              }
              document.querySelectorAll(".user").forEach(userDiv => {
                if (userDiv.attributes[1].value == userID) {
                  userDiv.children[0].children[2].innerText = `Type: ${user.role}`
                  // make a post request to change the userID role
                  // status modals
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
            console.log(userID)
            data.forEach(user => {
              if (user.id == userID) {
                console.log(user)
                document.querySelectorAll(".user").forEach(userDiv => {
                  if (userDiv.attributes[1].value == userID) {
                    userDiv.remove()
                    sureModal.classList.remove("trigger")
                    // make a post request to update that users role
                    // status modals
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