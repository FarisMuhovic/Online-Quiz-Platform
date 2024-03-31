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
  const data = {}
  const inputFields = $(form).find("input")
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].name) data[inputFields[i].name] = inputFields[i].value
  }
  const selectbox = document.getElementById("userType")
  data[selectbox.name] = selectbox.value
}
export const loginForm = () => {
  $("#login-form").on("submit", e => {
    const data = {}
    e.preventDefault()
    const inputs = document.querySelectorAll("#login-form input")
    inputs.forEach(inpt => {
      if (inpt.type != "checkbox") {
        data[inpt.name] = inpt.value
      } else {
        data[inpt.name] = inpt.checked
      }
    })
    console.log(data)
  })
}

export const logout = () => {
  console.log("logging out the user")
  window.location.href = "index.html#login"
}
