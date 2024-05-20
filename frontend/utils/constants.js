const constants = {
  apiURL:
    location.hostname == "localhost"
      ? "http://127.0.0.1/quiz-app/rest"
      : "https://shark-app-vkogd.ondigitalocean.app/",
  noDataBanner: `<img src="./images/emptybox.svg" alt="empty banner" class="empty-banner" />`,
  errorBanner: function (text) {
    return `<h3 class="error-banner" >${text}</h3>`
  },
}
