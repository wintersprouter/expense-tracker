const chart = document.getElementById('myChart').getContext('2d')

// const expenseAmount = document.getElementById('expense-amount').innerText

const home = document.querySelectorAll('.home')
let homeAmount = 0
for (let i = 0; i < home.length; i++) {
  homeAmount += Number(home[i].innerText.slice(1))
}
console.log('homeAmount', homeAmount)

const traffic = document.querySelectorAll('.traffic')
let trafficAmount = 0
for (let i = 0; i < traffic.length; i++) {
  trafficAmount += Number(traffic[i].innerText.slice(1))
}
console.log('trafficAmount', trafficAmount)

const entertainment = document.querySelectorAll('.entertainment')
let entertainmentAmount = 0
for (let i = 0; i < entertainment.length; i++) {
  entertainmentAmount += Number(entertainment[i].innerText.slice(1))
}
console.log('entertainmentAmount', entertainmentAmount)

const food = document.querySelectorAll('.food')
let foodAmount = 0
for (let i = 0; i < food.length; i++) {
  foodAmount += Number(food[i].innerText.slice(1))
}
console.log('foodAmount', foodAmount)

const other = document.querySelectorAll('.other')
let otherAmount = 0
for (let i = 0; i < other.length; i++) {
  otherAmount += Number(other[i].innerText.slice(1))
}
console.log('otherAmount', otherAmount)

const totalAmountValue = [entertainmentAmount, homeAmount, trafficAmount, foodAmount, otherAmount]
const labels = ['休閒娛樂', '家居物業', '交通出行', '餐飲食品', '其他']
const myChart = new Chart(chart, {
  type: 'doughnut',
  data: {
    labels: labels,
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