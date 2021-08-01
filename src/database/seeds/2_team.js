
exports.seed = function(knex) {
  return knex('team').del()
    .then(function () {
      return knex('team').insert([
        {id: 1, player_one: 'José Maria', player_two: 'Carlos Santos'},
        {id: 2, player_one: 'Sofia Beiras', player_two: 'João Vitor'},
        {id: 3, player_one: 'Pedro Silvana', player_two: 'Vitor Oluveira'}
      ]);
    });
};
