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
      $("#user-avatar").attr("src", `./images/avatars/${clickedAvatar}.svg`)
      // post request to update in database image
      $("#modal-for-avatar").css("display", "none")
    } else {
      // selet img modal error
    }
  })
}
const removeImagesStyle = (images, clickedAvatar) => {
  images.forEach(imgs => {
    imgs.style.border = "none"
  })
  clickedAvatar = null
}
export const loadUserInfo = () => {}
export const changePersonalInfo = () => {
  $("#change-info-btn").on("click", () => {
    const formInputs = document.querySelectorAll(".personal-info form input")
    // get user info
    if ($("#save-changes-btn").css("display") == "none") {
      $("#save-changes-btn").css("display", "inline")
      $("#change-info-btn").text("Cancel")
      formInputs.forEach(input => (input.disabled = false))
      $("#details-form").on("submit", e => {
        e.preventDefault()
        $("#save-changes-btn").on("click", () => {
          formInputs.forEach(input => (input.disabled = true))
          // populate user info
          $("#save-changes-btn").css("display", "none")
          $("#change-info-btn").text("Change information")
        })
      })
    } else {
      $("#save-changes-btn").css("display", "none")
      $("#change-info-btn").text("Change information")
      formInputs.forEach(input => (input.disabled = true))
      // remove new user info but let old one in
    }
  })
}
export const fetchAchievements = () => {
  const achievementsContainer = document.getElementById("achivements-container")
  achievementsContainer.innerHTML = `<h1>Achievements</h1>`
  $.get("../data/achivements.json", (data, status) => {
    data.forEach(achievement => {
      achievementsContainer.innerHTML += `
      <div class="achievement">
        <h4>${achievement.name}</h4>
        <p>${achievement.description}</p>
      </div>
      `
    })
  })
}
