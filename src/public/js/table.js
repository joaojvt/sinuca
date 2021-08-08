import api from './service/api'
import { Alert } from 'bootstrap'

api.get('/tables')
  .then(result => {
    const { data } = result
    if (!data.length) {
      document.getElementById('table-table')
        .querySelector('tbody').innerHTML = `
      <div class="d-flex justify-content-center">
        Não há nenhum time cadastrado!
      </div>
      `
      return;
    }

    const tableBody = document.querySelector('#tables-table>tbody')
    if (!tableBody) return;
    tableBody.innerHTML = ''

    data.forEach(table => {
      tableBody.innerHTML += `
      <tr>
        <th scope="row">${table.id}</th>
        <td>${table.name}</td>
        <td>${table.prize}</td>
        <td>${table.points_to_win}</td>
        <td>É necessário ${table.points_to_win} pontos para ganhar a premiação</td>
        <td><button class="btn btn-primary btn-sm"  data-bs-toggle="modal" data-bs-target="#table-details" onclick="window.tableDeitails(${table.id})">Deltalhes</button></td>
      </tr>
      `
    })
  })


document.getElementById('form-create-table').addEventListener('submit', event => {
  event.preventDefault()

  const inputs = event.target.querySelectorAll('input')
  const table = {}

  inputs.forEach(el => {
    table[el.name] = el.value
  })
  api.post('/table', table)
    .then(() => location.reload(true))
})


window.tableDeitails = (id) => {
  api.get(`table/${id}`)
    .then(result => {
      const { data } = result
      const modal = document.getElementById('table-details')
      modal.querySelector('#table-details-title').innerHTML = data.name
      modal.querySelector('#table-prize-detail').innerHTML = data.prize
      modal.querySelector('#table-points-detail').innerHTML = data.points_to_win
      modal.querySelector('#tableId').value = data.id
    })

  api.get(`/table-teams/${id}`)
    .then(result => {
      const { data } = result
      const tableBody = document.querySelector('#teams-table-details>tbody')
      if (!data.length) {
        tableBody.innerHTML = `
        <tr>
          <th colspan="6" scope="row">Não há nenhum time cadastrado!</th>
        </tr>
        `
        return;
      }

      if (!tableBody) return;

      tableBody.innerHTML = ''
      data.forEach(team => {
        tableBody.innerHTML += `
        <tr>
          <th scope="row">${team.id}</th>
          <td id="team-name-${team.id}">${team.name}</td>
          <td>${team.player_one}</td>
          <td>${team.player_two}</td>
          <td id="team-points-${team.id}">${team.points}</td>
          <td><button class="btn btn-primary btn-sm" onclick="window.addPointsToTeam(${team.id}, ${id})">+10</button></td>
        </tr>`

      })
      tableBody.querySelector('#teamQuantity').value = team.length + 1
    })
}

window.addPointsToTeam = (teamId, tableId) => {
  const actualPoits = document.getElementById(`team-points-${teamId}`).innerHTML
  const newPonits = parseInt(actualPoits, 10) + 10
  const tableMaxPoints = parseInt(document.getElementById('table-points-detail').innerHTML, 10)

  if (actualPoits >= tableMaxPoints) {
    const teamName = document.getElementById(`team-name-${teamId}`).innerHTML
    const alert = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <p>
        Time ${teamName} já atingiu o máximo pontuação da tabela
      </p>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
    document.querySelector('#alert-winner').innerHTML = alert
    return
  }

  if (newPonits >= tableMaxPoints) {
    const teamName = document.getElementById(`team-name-${teamId}`).innerHTML
    const alert = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <p>
      <strong>Time vencedor!</strong> Parabéns ao time ${teamName}
      </p>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
    document.querySelector('#alert-winner').innerHTML = alert
  }

  document.getElementById(`team-points-${teamId}`).innerHTML = newPonits;
  api.put('/update-team-points', {
    tableId,
    teamId,
    points: 10
  })
}

api.get('/teams')
  .then(result => {
    const { data } = result
    if (!data.length) return

    const select = document.getElementById('select-team')

    data.forEach(team => {
      select.innerHTML += `<option value="${team.id}">${team.name}</option>`
    })
  })

document.getElementById('addTeamToTable').addEventListener('submit', event => {
  event.preventDefault()
  const inputs = event.target.querySelectorAll('input')
  const selects = event.target.querySelectorAll('select')

  const data = {}
  inputs.forEach(el => {
    data[el.name] = el.value
  })

  selects.forEach(el => {
    data[el.name] = el.value
  })

  api.post('/add-team-table', data)
    .then(() => location.reload(true))
    .catch(err => {
      if (!err.response) return
      if (err.response.status === 409) {
        const alert = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <p>
            Time já cadastrado ou tabela atingiu máximo de times possíveis
          </p>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `
        document.querySelector('#alert-winner').innerHTML = alert
      }
    })
})
