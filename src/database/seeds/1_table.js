
exports.seed = function(knex) {
  return knex('table').del()
    .then(function () {
      return knex('table').insert([
        {id: 1, name: 'Tabela 1', points_to_win: 100, prize: 'Fusca azul.'},
        {id: 2, name: 'Tabela 2', points_to_win: 40, prize: 'Um ano de torresmo.'},
        {id: 3, name: 'Tabela 3', points_to_win: 80, prize: '20 coxinhas.'}
      ]);
    });
};
