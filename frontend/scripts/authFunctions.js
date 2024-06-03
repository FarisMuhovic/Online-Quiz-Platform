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
        maxlength: 50,
      },
      lastName: {
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      email: {
        email: true,
        required: true,
        minlength: 5,
        maxlength: 320,
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
  const inputFields = $(form).find("input")
  const data = {
    id: crypto.randomUUID(),
    avatar: 1,
    role: "user",
  }
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].name) data[inputFields[i].name] = inputFields[i].value
  }
  const selectbox = document.getElementById("userType")
  data[selectbox.name] = selectbox.value
  $.post(`${constants.apiURL}/auth/register`, data)
    .done(function (response) {
      if (response.success == true) {
        statusModal("register", "success", response.message)
        delete data.password
        data["token"] = response.data.token
        localStorage.setItem("userInformation", JSON.stringify(data))
        // redirect user to dashboard
        setTimeout(() => {
          window.location.href = "index.html#dashboard"
        }, 500)
      } else {
        statusModal("register", "error", "Authentication failed!")
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
    $.post(`${constants.apiURL}/auth/login`, data)
      .done(function (response) {
        if (response.success) {
          statusModal("login", "success", response.message)
          localStorage.setItem("userInformation", JSON.stringify(response.data))
          // redirect user to dashboard
          setTimeout(() => {
            window.location.href = "index.html#dashboard"
          }, 500)
        } else {
          statusModal("login", "error", "Authentication failed!")
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
  $.ajax({
    url: `${constants.apiURL}/auth/logout`,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(localStorage.getItem("userInformation")),
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
      window.location.href = "index.html#login"
      localStorage.clear()
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Failed to destroy session
      if (
        errorThrown == "Unauthorized" ||
        errorThrown == "Expired token" ||
        textStatus == "error"
      ) {
        invalidSession()
      } else {
        statusModal(
          "dashboard",
          "error",
          "Failed to log out, Internal server error!"
        )
      }
    },
  })
}
