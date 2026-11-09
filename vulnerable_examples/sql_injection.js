import mysql from 'mysql';
import crypto from 'crypto';
const express = require('express')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test',
});

connection.connect();

function vuln(req, res) {
    const name = req.query.name; // user-controlled input
    const password = crypto.createHash('sha256').update(req.query.password).digest('base64');

    const sql = "select * from user where name = '" + name + "' and password = '" + password + "'";

    connection.query(sql, function (err, result) { // Noncompliant
        if (err) {
            return res.status(500).send('Internal Server Error');
        }

        res.send(result);
    })
}

module.exports = function login() {
    return (req, res, next) => {
        sequelize.query(
            `SELECT * FROM Users WHERE email = '${req.body.email}' AND password = '${req.body.password}' AND deletedAt IS NULL`,
            { plain: true }
        )
            .then(() => {
                res.send("a")
            }).catch((error) => {
                next(error)
            })
    }
}

router.get("test112", function (req, res) {

    connection.connect();
    connection.resume();
    let userName = req.body.username;
    let password = req.body.password;

    connection.query(
        `SELECT * FROM users WHERE user_name='${userName}' AND password='${password}'`,
        function (error, results, fields) { res.json({ ok: results.length > 0 }); }
    );
});

export default router;

// mysql2 – promise-based, template literal with req.params
import mysql2 from 'mysql2/promise';
async function vulnMysql2(req, res) {
    const conn = await mysql2.createConnection({ host: 'localhost', user: 'root', database: 'shop' });
    const orderId = req.params.orderId;
    conn.query(`SELECT * FROM orders WHERE id = '${orderId}'`); // Noncompliant
}

// pg – string concatenation with req.body
import { Client } from 'pg';
async function vulnPg(req, res) {
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    const username = req.body.username;
    const query = "SELECT * FROM accounts WHERE username = '" + username + "'";
    client.query(query); // Noncompliant
}

// mariadb – string concatenation with req.query
import mariadb from 'mariadb';
async function vulnMariadb(req, res) {
    const conn = await mariadb.createConnection({ host: 'localhost', user: 'app', database: 'inventory' });
    const productId = req.query.productId;
    conn.query("SELECT * FROM products WHERE id = " + productId); // Noncompliant
}

// mssql – template literal inside request.query()
import sql from 'mssql';
async function vulnMssql(req, res) {
    const pool = await sql.connect({ server: 'localhost', database: 'hr' });
    const empId = req.query.empId;
    pool.request().query(`SELECT * FROM employees WHERE id = '${empId}'`); // Noncompliant
}
