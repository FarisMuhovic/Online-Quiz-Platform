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
      $.post("http://localhost/quiz-app/rest/routes/updateAvatar.php", {
        clickedAvatar: clickedAvatar,
        email: JSON.parse(localStorage.getItem("userInformation")).email,
      })
        .done(function (response) {
          statusModal("success", "Avatar created")
          $("#user-avatar").attr("src", `./images/avatars/${clickedAvatar}.svg`)
          $("#modal-for-avatar").css("display", "none")
          const localdata = JSON.parse(localStorage.getItem("userInformation"))
          localdata.avatar = clickedAvatar
          localStorage.setItem("userInformation", JSON.stringify(localdata))
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          statusModal("error", "Internal server error!")
        })
    } else {
      statusModal("error", "Error changing avatar")
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
        src="./images/avatars/${userInfo.avatar}.svg"
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
        src="./images/avatars/avatar_1.svg"
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
    // get user info
    if ($("#save-changes-btn").css("display") == "none") {
      $("#save-changes-btn").css("display", "inline")
      $("#change-info-btn").text("Cancel")
      formInputs.forEach(input => {
        if (input.name == "email") {
        } else {
          input.disabled = false
        }
      })
      $("#details-form").on("submit", e => {
        e.preventDefault()
        const data = {
          email: localStorage.getItem("userInformation").email,
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
        $.post("http://localhost/quiz-app/rest/routes/updateUserInfo.php", data)
          .done(function (response) {
            formInputs.forEach(input => (data[input.name] = input.value))
            formInputs.forEach(input => (input.disabled = true))
            statusModal("success", "Details changed")
            // change it into localstorage somehow idk !
            const localdata = JSON.parse(
              localStorage.getItem("userInformation")
            )
            formInputs.forEach(input => {
              if (input.name == "firstname") {
                localdata.firstName = input.value
              } else if (input.name == "lastname") {
                localdata.lastName = input.value
              } else if (input.name == "dateofbirth") {
                localdata.dateOfBirth = input.value
              } else {
                localdata[input.name] = input.value
              }
            })
            localStorage.setItem("userInformation", JSON.stringify(localdata))
            console.log(localdata)
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            statusModal("error", "Internal server error!")
            formInputs.forEach(input => (input.disabled = true))
          })
        $("#save-changes-btn").css("display", "none")
        $("#change-info-btn").text("Change information")
        // console.log(data)
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
  achievementsContainer.innerHTML = `<h1>Achievements</h1>`
  $.get(
    `http://127.0.0.1/quiz-app/rest/routes/getUserAchievements.php?email=${
      JSON.parse(localStorage.getItem("userInformation")).email
    }`,
    (data, status) => {
      const parsedData = JSON.parse(data)
      parsedData.forEach(achievement => {
        achievementsContainer.innerHTML += `
      <div class="achievement">
        <h4>${achievement.title}</h4>
        <p>${achievement.description}</p>
      </div>
      `
      })
    }
  )
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
  $("#profile").append(modal)
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
