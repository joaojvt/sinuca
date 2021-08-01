
exports.seed = function(knex) {
  return knex('team_table').del()
    .then(function () {
      return knex('team_table').insert([
        {id_team: 1, id_table: 1, points: 10},
        {id_team: 1, id_table: 2, points: 40},
        {id_team: 1, id_table: 3, points: 80},
        {id_team: 2, id_table: 1, points: 60},
        {id_team: 2, id_table: 2, points: 60},
        {id_team: 3, id_table: 1, points: 60},
      ]);
    });
};
