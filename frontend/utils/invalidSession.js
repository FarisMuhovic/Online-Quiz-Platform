const invalidSession = () => {
  localStorage.clear()
  window.location.href = "index.html#login"
}
