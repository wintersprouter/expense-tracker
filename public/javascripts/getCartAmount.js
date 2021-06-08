const chart = document.getElementById('myChart').getContext('2d')
const incomeAmount = document.getElementById('income-amount').innerText
const expenseAmount = document.getElementById('expense-amount').innerText
const categoryAmount = document.getElementById('expense-amount').innerText
const totalAmountValue = [Number(incomeAmount), Number(expenseAmount)]
const dataPanel = document.querySelector('#data-panel')

function renderCategoryAmount(data) {
  let rawHTML = ''
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${POSTER_URL + item.image
      }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id
      }">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${item.id
      }">+</button>
        </div>
      </div>
    </div>
  </div>`
  
  dataPanel.innerHTML = rawHTML
}

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
