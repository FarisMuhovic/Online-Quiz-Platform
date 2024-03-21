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
