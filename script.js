const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'app',
        password: 'tQpRMCzHlAeu6kQIBk4U',
        database: 'sensorium'
    }
});

knex.on('query', (query) => {
    console.log(query.__knexTxId + ' ' + query.sql);
});

async function insert() {
    try {
        await knex.transaction(async (trx) => {
            await knex('geo').insert({ latitude: 0, longitude: 0 }).transacting(trx);
        });
    } catch (err) {
        console.log('err');
    }
}

async function select() {
    await knex('geo').select('*').limit(10);
}

async function run() {

    await insert();
    console.log('--inserted--');
    await select();
    console.log('--selected--');
}

run().then(() => console.log('==done=='));