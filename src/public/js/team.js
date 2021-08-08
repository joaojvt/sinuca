import api from './service/api'

api.get('/teams')
  .then(result => {
    const { data } = result
    if (!data.length) {
      document.getElementById('teams-table')
        .querySelector('tbody').innerHTML = `
        <tr>
        <th colspan="5" scope="row">Não há nenhum time cadastrado!</th>
      </tr>
      `
      return;
    }

    const tableBody = document.querySelector('#teams-table>tbody')
    if(!tableBody) return;
    tableBody.innerHTML = ''

    data.forEach(team => {
      document.getElementById('teams-table')
        .querySelector('tbody').innerHTML += `
      <tr>
        <th scope="row">${team.id}</th>
        <td>${team.name}</td>
        <td>${team.player_one}</td>
        <td>${team.player_two}</td>
      </tr>
      `
    })

    document.getElementById('teams-table')
      .querySelector('tbody')
  })


document.getElementById('form-create-team').addEventListener('submit', event => {
  event.preventDefault()

  const inputs = event.target.querySelectorAll('input')
  
  const team = {}
  inputs.forEach(el => {
    team[el.name] = el.value
  })
  
  api.post('/team', team)
    .then(() => location.reload(true))
})