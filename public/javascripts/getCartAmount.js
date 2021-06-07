const chart = document.getElementById('myChart').getContext('2d')
const incomeAmount = document.getElementById('income-amount').innerText
const expenseAmount = document.getElementById('expense-amount').innerText

const totalAmountValue = [Number(incomeAmount), Number(expenseAmount)]

const myChart = new Chart(chart, {
  type: 'doughnut',
  data: {
    labels: ['收入', '支出'],
    datasets: [{
      label: '# of Votes',
      data: totalAmountValue,
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.5)'
      ],
      borderWidth: 0
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: '收支圓餅圖',
        font: {
          size: 25,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 15
        }
      }
    },
    yAxes: [{
      ticks: {
        beginAtZero: true,
        responsive: true
      }
    }]
  }
})
