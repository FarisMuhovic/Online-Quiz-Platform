export const generatePieChart = () => {
  Highcharts.chart("pie-chart-container", {
    chart: {
      type: "pie",
    },
    title: {
      text: "Quiz category participation",
    },
    tooltip: {
      valueSuffix: "",
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.0f}%",
            style: {
              fontSize: "0.75em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Attempts",
        colorByPoint: true,
        data: [
          {
            name: "Science",
            y: 4,
          },
          {
            name: "Mathematics",
            y: 14,
          },
          {
            name: "History",
            y: 34,
          },
          {
            name: "Literature",
            y: 54,
          },
          {
            name: "Geography",
            y: 14,
          },
          {
            name: "Languages",
            y: 44,
          },
          {
            name: "Sports",
            y: 34,
          },
          {
            name: "Music",
            y: 33,
          },
          {
            name: "Movies",
            y: 44,
          },
        ],
      },
    ],
  })
}
export const generateBarChart = () => {
  Highcharts.chart("bar-chart-container", {
    chart: {
      type: "bar",
    },
    title: {
      text: "Quiz successful/failed attempts via category",
    },
    xAxis: {
      categories: [
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
      accessibility: {
        description: "Category",
      },
    },
    yAxis: {
      min: 0,
      max: 130000,
      title: {
        text: null,
      },
      accessibility: {
        description: "Attempt rate distribution ",
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.options.contrastColor}">{series.name}</span>: <b>{point.y}</b><br/>',
      shared: true,
    },
    plotOptions: {
      bar: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        contrastColor: "#8a8ad6",
        borderColor: "#8294C9",
        name: "Total attempts",
        data: [3100, 11200, 3400, 9500, 5000, 5000, 5600, 16800, 16400],
      },
      {
        contrastColor: "#22bb33",
        borderColor: "black",
        name: "Passed Attempts",
        data: [67500, 125300, 33700, 79100, 41200, 34000, 20400, 61300, 59000],
      },
      {
        contrastColor: "#bb2124",
        borderColor: "black",
        name: "Failed Attempts",
        data: [67500, 125300, 33700, 79100, 41200, 34000, 20400, 61300, 59000],
      },
    ],
  })
}
export const generateLineChart = () => {
  Highcharts.chart("line-chart-container", {
    title: {
      text: "Average User distribution vs you",
      align: "center",
    },

    yAxis: {
      title: {
        text: "Points",
      },
    },

    xAxis: {
      type: "datetime",
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        pointStart: Date.UTC(new Date().getFullYear(), 0, 1),
        pointIntervalUnit: "month",
      },
    },

    series: [
      {
        name: "Your points",
        data: [25, 36, 77, 124, 155, 214, 326, 432, 532, 666, 777],
      },
      {
        name: "Average points",
        data: [13, 66, 24, 36, 25, 63, 24, 33, 52, 244, 35],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  })
}
