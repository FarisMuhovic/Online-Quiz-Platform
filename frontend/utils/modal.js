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
      </div>`
  } else if (type == "success") {
    modal = `
      <div class="status-modal success">
        <span class="material-symbols-outlined">check</span>
        <p><b>Success</b>: ${message}</p>
        <button class="exit-status-modal">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>`
  } else if (type == "warning") {
    modal = `
      <div class="status-modal warning">
        <span class="material-symbols-outlined">warning</span>
        <p><b>Warning</b>: ${message}</p>
        <button class="exit-status-modal">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>`
  } else if (type == "info") {
    modal = `
      <div class="status-modal info">
        <span class="material-symbols-outlined">info</span>
        <p><b>Info</b>: ${message}</p>
        <button class="exit-status-modal">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>`
  }
  // if modal exists remove it then append new one
  if ($(".status-modal").length > 0) {
    $(".status-modal").remove()
    $(`#${page}`).append(modal)
  } else {
    $(`#${page}`).append(modal)
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
