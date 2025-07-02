// netlify/functions/hello.js
const dotenv = require("dotenv");

dotenv.config();

exports.handler = async function (event, context) {
    hola = process.env.HOLA
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `${hola} desde Netlify Functions` }),
    };
};
