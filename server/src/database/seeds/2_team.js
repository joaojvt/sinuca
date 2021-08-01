
exports.seed = function(knex) {
  return knex('team').del()
    .then(function () {
      return knex('team').insert([
        {id: 1, name: 'azul', player_one: 'José Maria', player_two: 'Carlos Santos'},
        {id: 2, name: 'verde', player_one: 'Sofia Beiras', player_two: 'João Vitor'},
        {id: 3, name: 'amarelo', player_one: 'Pedro Silvana', player_two: 'Vitor Oluveira'}
      ]);
    });
};
