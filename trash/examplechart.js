// Hamburger menu toggle
const ham = document.getElementById("hamburger-menu")
const list = document.getElementById("header-nav-list")
ham.addEventListener("click", e => {
  ham.classList.toggle("open")
  list.classList.toggle("show")
})
// NOTE FOR PROFESSOR
// The javascript code is only for pure demonstration as are these canvases, since we didnt do javascript yet, I just copied the code from Charts.js documentation and provided the example of how my data charts are going to look. Once we do javascript,database and backend milestone, I am going to implement the charts based on actual data, the charts will visualize real-time data based on user interactions and quiz statistics.
// Ive added these charts because this is the concept of how my analytics page is going to look.
// https://www.chartjs.org/

var ctxPie = document.getElementById("categoryPieChart").getContext("2d")
var categoryPieChart = new Chart(ctxPie, {
  type: "pie",
  data: {
    labels: [
      "Science",
      "Mathematics",
      "History",
      "Literature",
      "Geography",
      "Languages",
      "Sports",
      "Music",
      "Movies",
    ],
    datasets: [
      {
        label: "Quiz Categories",
        data: [20, 15, 10, 8, 12, 5, 18, 10, 7], // Dummy data
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    maintainAspectRation: false,
  },
})
var ctxBar = document.getElementById("categoryBarChart").getContext("2d")
var categoryBarChart = new Chart(ctxBar, {
  type: "bar",
  data: {
    labels: [
      "Science",
      "Mathematics",
      "History",
      "Literature",
      "Geography",
      "Languages",
      "Sports",
      "Music",
      "Movies",
    ],
    datasets: [
      {
        label: "Total Attempts",
        data: [100, 80, 70, 60, 90, 50, 120, 70, 65], // Dummy data
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Passed Attempts",
        data: [80, 60, 50, 45, 70, 40, 90, 55, 50], // Dummy data
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "Failed Attempts",
        data: [20, 20, 20, 15, 20, 10, 30, 15, 15], // Dummy data
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  },
  options: {
    indexAxis: "y",
    maintainAspectRation: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
})
var labels = ["January", "February", "March", "April", "May", "June"]
var userPoints = [10, 12, 15, 18, 20, 22]
var averagePoints = [8, 10, 12, 14, 16, 18]

var ctx = document.getElementById("pointsChart").getContext("2d")
var pointsChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "User Points",
        data: userPoints,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Average Points",
        data: averagePoints,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  },
  options: {
    maintainAspectRation: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
})
