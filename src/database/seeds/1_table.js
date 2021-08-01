
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table').del()
    .then(function () {
      // Inserts seed entries
      return knex('table').insert([
        {id: 1, points_to_win: 100, prize: 'Fusca azul.'},
        {id: 2, points_to_win: 40, prize: 'Um ano de torresmo.'},
        {id: 3, points_to_win: 80, prize: '20 coxinhas.'}
      ]);
    });
};
