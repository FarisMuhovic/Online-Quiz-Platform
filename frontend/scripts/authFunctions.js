export const passwordFieldChange = () => {
  const visibilityButton = document.getElementById("visibilityButton")
  const passwordField = document.getElementById("password")
  const spanTag = document.getElementById("visibilityIcon")
  visibilityButton.addEventListener("click", () => {
    if (passwordField.type === "password") {
      passwordField.type = "text"
      spanTag.innerText = "visibility"
    } else {
      passwordField.type = "password"
      spanTag.innerText = "visibility_off"
    }
  })
}
export const registerForm = () => {
  $("#register-form").validate({
    rules: {
      firstName: {
        required: true,
        minlength: 2,
        maxlength: 20,
      },
      lastName: {
        required: true,
        minlength: 2,
        maxlength: 20,
      },
      email: {
        email: true,
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      password: {
        required: true,
        minlength: 5,
        maxlength: 50,
      },
      userType: {
        required: true,
      },
    },
    messages: {
      firstName: {
        required: "Please enter your first name",
        minlength: "Your name must be at least 2 characters long",
        maxlength: "Your name must not exceed 20 characters.",
      },
      lastName: {
        required: "Please enter your last name",
        minlength: "Your last name must be at least 2 characters long",
        maxlength: "Your last name must not exceed 20 characters.",
      },
      email: {
        required: "Please enter your email address",
        email: "Your email must be in format example@foo.bar",
        minlength: "Your email address must be at least 5 characters long",
        maxlength: "Your email address must not exceed 50 characters.",
      },
      password: {
        required: "Please enter your password",
        minlength: "Your password must be at least 5 characters long",
        maxlength: "Your password must not exceed 50 characters.",
      },
      userType: "Please select what describes you best",
    },

    submitHandler: function (form, event) {
      handleRegisterForm(form, event)
    },
  })
}
const handleRegisterForm = (form, event) => {
  event.preventDefault()
  document.querySelector(".loader").style.display = "inline-block"
  document.querySelector(".form-submit-btn").disabled = true
  const data = {}
  const inputFields = $(form).find("input")
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].name) data[inputFields[i].name] = inputFields[i].value
  }
  const selectbox = document.getElementById("userType")
  data[selectbox.name] = selectbox.value
  $.post("http://127.0.0.1/quiz-app/rest/routes/registerUser.php", data)
    .done(function (response) {
      let parsedResponse = JSON.parse(response)
      if (parsedResponse.success) {
        statusModal("register", "success", parsedResponse.message)
        const localStorageInfo = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          userType: data.userType,
          role: "user",
          avatar: "avatar1",
        }
        localStorage.setItem(
          "userInformation",
          JSON.stringify(localStorageInfo)
        )
        // redirect user to dashboard
        window.location.href = "index.html#dashboard"
      }
      document.querySelector(".loader").style.display = "none"
      setTimeout(() => {
        document.querySelector(".form-submit-btn").disabled = false
      }, 2000)
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      if (errorThrown == "Unauthorized") {
        statusModal("register", "error", "Authentication failed!")
      } else {
        statusModal("register", "error", "Internal server error")
      }
      document.querySelector(".loader").style.display = "none"
      setTimeout(() => {
        document.querySelector(".form-submit-btn").disabled = false
      }, 2000)
    })
}
const statusModal = (page, type, message) => {
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
  } else if (type == "info") {
    modal = `
    <div class="status-modal info">
      <span class="material-symbols-outlined">info</span>
      <p><b>Info</b>: ${message}</p>
      <button class="exit-status-modal">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    `
  }
  if (page == "register") {
    $("#register").append(modal)
  } else if (page == "login") {
    $("#login").append(modal)
  } else if (page == "dashboard") {
    $("#dashboard").append(modal)
  }
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
export const loginForm = () => {
  $("#login-form").on("submit", e => {
    const data = {}
    e.preventDefault()
    document.querySelector(".loader").style.display = "inline-block"
    document.querySelector(".form-submit-btn").disabled = true
    const inputs = document.querySelectorAll("#login-form input")
    inputs.forEach(inpt => {
      if (inpt.type != "checkbox") {
        data[inpt.name] = inpt.value
      } else {
        data[inpt.name] = inpt.checked
      }
    })
    $.post("http://127.0.0.1/quiz-app/rest/routes/loginUser.php", data)
      .done(function (response) {
        let parsedResponse = JSON.parse(response)
        if (parsedResponse.success) {
          statusModal("login", "success", parsedResponse.message)
          const localStorageInfo = {
            id: parsedResponse.data.id,
            email: parsedResponse.data.email,
            firstName: parsedResponse.data.firstName,
            lastName: parsedResponse.data.lastName,
            userType: parsedResponse.data.userType,
            role: parsedResponse.data.role,
            avatar: parsedResponse.data.avatar,
          }
          localStorage.setItem(
            "userInformation",
            JSON.stringify(localStorageInfo)
          )
          // redirect user to dashboard
          window.location.href = "index.html#dashboard"
        }
        document.querySelector(".loader").style.display = "none"
        setTimeout(() => {
          document.querySelector(".form-submit-btn").disabled = false
        }, 2000)
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        if (errorThrown == "Unauthorized") {
          statusModal("login", "error", "Authentication failed!")
        } else {
          statusModal("login", "error", "Internal server error")
        }
        document.querySelector(".loader").style.display = "none"
        setTimeout(() => {
          document.querySelector(".form-submit-btn").disabled = false
        }, 2000)
      })
  })
}

export const logout = () => {
  $.post("restapi/auth/logout", localStorage.getItem("userInformation"))
    .done(function (response) {
      window.location.href = "index.html#login"
      localStorage.clear()
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // failed to destroy session
      statusModal(
        "dashboard",
        "error",
        "Failed to log out, Internal server error!"
      )
    })
}
