
exports.up = function (knex) {
  return knex.schema
    .createTable('team', function (table) {
      table.integer('id').primary();
      table.string('player_one', 255).notNullable();
      table.string('player_two', 255).notNullable();
    })
    .createTable('table', function (table) {
      table.integer('id').primary();
      table.integer('points_to_win').notNullable();
      table.string('prize', 1000).notNullable();
    })
    .createTable('team_table', function (table) {
      table.integer('id_team').references('id').inTable('team');
      table.integer('id_table').references('id').inTable('table');
      table.integer('points').defaultTo(0, { constraintName: 'df_points' });
    })
};

exports.down = function (knex) {
  knex.schema
    .dropTable("team_table")
    .dropTable("table")
    .dropTable("team");
};
