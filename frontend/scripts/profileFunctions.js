export const changeAvatar = () => {
  const images = document.querySelectorAll(".modal-body-def img")
  let clickedAvatar = null
  $("#change-avatar-btn").on("click", () => {
    if ($("#modal-for-avatar").css("display") == "none") {
      $("#modal-for-avatar").css("display", "block")
    } else {
      $("#modal-for-avatar").css("display", "none")
      removeImagesStyle(images, clickedAvatar)
    }
  })
  $("#close-btn-top").on("click", () => {
    $("#modal-for-avatar").css("display", "none")
    removeImagesStyle(images, clickedAvatar)
  })
  $("#close-btn-footer").on("click", () => {
    $("#modal-for-avatar").css("display", "none")
    removeImagesStyle(images, clickedAvatar)
  })
  images.forEach(img => {
    img.addEventListener("click", e => {
      removeImagesStyle(images, clickedAvatar)
      e.target.style.border = "3px solid black"
      clickedAvatar = e.target.alt
    })
  })

  $("#save-changes-for-avatar-change-btn").on("click", () => {
    if (clickedAvatar) {
      if (typeof clickedAvatar === "number") {
        statusModal("profile", "error", "Please select a different avatar.")
        return
      }
      clickedAvatar = Number(clickedAvatar.charAt(clickedAvatar.length - 1))
      $.ajax({
        url: `${constants.apiURL}/users/updateAvatar`,
        type: "PUT",
        contentType: "application/json",
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
        data: JSON.stringify({
          clickedAvatar: clickedAvatar,
          userID: JSON.parse(localStorage.getItem("userInformation")).id,
        }),
        success: function (response) {
          statusModal("profile", "success", "Avatar created")
          $("#user-avatar").attr(
            "src",
            `./images/avatars/avatar${clickedAvatar}.svg`
          )
          $("#modal-for-avatar").css("display", "none")
          const localdata = JSON.parse(localStorage.getItem("userInformation"))
          localdata.avatar = clickedAvatar
          localStorage.setItem("userInformation", JSON.stringify(localdata))
        },
        error: function (jqXHR, textStatus, errorThrown) {
          if (
            errorThrown == "Unauthorized" ||
            errorThrown == "Expired token" ||
            textStatus == "error"
          ) {
            invalidSession()
          } else {
            statusModal("profile", "error", "Internal server error!")
          }
        },
      })
    } else {
      statusModal("profile", "error", "Error changing avatar")
    }
  })
}
const removeImagesStyle = (images, clickedAvatar) => {
  images.forEach(imgs => {
    imgs.style.border = "none"
  })
  clickedAvatar = null
}
export const loadUserInfo = () => {
  let userInfo = null
  userInfo = JSON.parse(localStorage.getItem("userInformation"))
  if (userInfo) {
    $(".avatar").html(
      `
      <h1 id="greeting-h1">Hello,  ${userInfo.firstName}! 👋</h1>
      <img
        src="./images/avatars/avatar${userInfo.avatar}.svg"
        alt="avatar"
        loading="lazy"
        id="user-avatar"
      />
      <button id="change-avatar-btn">Change avatar</button>
      `
    )
    $("#firstname").val(userInfo.firstName)
    $("#lastname").val(userInfo.lastName)
    $("#email").val(userInfo.email)
    $("#age").val(userInfo.age)
    $("#dateofbirth").val(userInfo.dateOfBirth)
    $("#country").val(userInfo.country)
  } else {
    $(".avatar").html(
      `
      <h1 id="greeting-h1">Hello 👋</h1>
      <img
        src="./images/avatars/avatar1.svg"
        alt="avatar"
        loading="lazy"
        id="user-avatar"
      />
      <button id="change-avatar-btn">Change avatar</button>
      `
    )
  }
}

export const changePersonalInfo = () => {
  $("#change-info-btn").on("click", () => {
    const formInputs = document.querySelectorAll(".personal-info form input")
    if ($("#save-changes-btn").css("display") == "none") {
      $("#save-changes-btn").css("display", "inline")
      $("#change-info-btn").text("Cancel")
      formInputs.forEach(input => {
        if (input.name == "email") {
        } else {
          input.disabled = false
        }
      })
      $("#details-form").on("submit.myNamespace", e => {
        e.preventDefault()
        const data = {
          id: JSON.parse(localStorage.getItem("userInformation")).id,
        }
        formInputs.forEach(input => {
          if (input.name == "firstname") {
            data.firstName = input.value
          } else if (input.name == "lastname") {
            data.lastName = input.value
          } else if (input.name == "dateofbirth") {
            data.dateOfBirth = input.value
          } else {
            data[input.name] = input.value
          }
        })
        $.ajax({
          url: `${constants.apiURL}/users/updateInformation`,
          type: "POST",
          data: data,
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
            if (response !== "false") {
              formInputs.forEach(input => (data[input.name] = input.value))
              formInputs.forEach(input => (input.disabled = true))
              statusModal("profile", "success", "Details changed")

              const localdata = JSON.parse(
                localStorage.getItem("userInformation")
              )
              formInputs.forEach(input => {
                if (input.name === "firstname") {
                  localdata.firstName = input.value
                } else if (input.name === "lastname") {
                  localdata.lastName = input.value
                } else if (input.name === "dateofbirth") {
                  localdata.dateOfBirth = input.value
                } else {
                  localdata[input.name] = input.value
                }
              })
              localStorage.setItem("userInformation", JSON.stringify(localdata))
            } else {
              formInputs.forEach(input => (input.disabled = true))
              statusModal("profile", "error", "Internal server error!")
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            if (
              errorThrown == "Unauthorized" ||
              errorThrown == "Expired token" ||
              textStatus == "error"
            ) {
              invalidSession()
            } else {
              statusModal("profile", "error", "Internal server error!")
              formInputs.forEach(input => (input.disabled = true))
            }
          },
        })
        $("#save-changes-btn").css("display", "none")
        $("#change-info-btn").text("Change information")
        $("#details-form").off("submit.myNamespace")
      })
    } else {
      $("#save-changes-btn").css("display", "none")
      $("#change-info-btn").text("Change information")
      formInputs.forEach(input => (input.disabled = true))
      loadUserInfo()
    }
  })
}
export const fetchAchievements = () => {
  const achievementsContainer = document.getElementById("achivements-container")
  $.ajax({
    url: `${constants.apiURL}/users/achievements?id=${
      JSON.parse(localStorage.getItem("userInformation")).id
    }`,
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
    success: function (data, status) {
      achievementsContainer.innerHTML = `<h1>Achievements</h1>`
      data.forEach(achievement => {
        achievementsContainer.innerHTML += `
            <div class="achievement">
              <h4>${achievement.title}</h4>
              <p>${achievement.description}</p>
            </div>`
      })
    },
    error: function () {
      achievementsContainer.innerHTML = `<h1>Achievements</h1>`
    },
  })
}
