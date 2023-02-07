// creating dependencies
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable =("console.table");

// create connection
const connection = mysql.createConnection({
    host: "localHost",
    user: "root",
    database: "employee_db"
});
