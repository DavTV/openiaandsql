import { Configuration, OpenAIApi } from "openai";
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const server = express();
server.use(bodyParser.json());



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
      result: completion.data.choices[0].text, query, message: "Conexión con api fallada por apiKey.", exito: false
    });
    return;
  }
  const host = req.body.host,
    user = req.body.user,
    password = req.body.password,
    database = req.body.database;

  const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
  })
  const query = req.body.query;
  // const sgbd = req.body.sgbd;
  // console.log(sgbd)
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(query),
      temperature: 0.6,
      max_tokens: 200,
    });
    console.log (completion.data.choices[0].text);

connection.connect(function (error) {
  try {
    if (error) {
          // console.log(sql)


          res.status(200).json({ result: completion.data.choices[0].text, query, message: "Conection Error.", exito: false, details: [{ message: "Review your database parameters." }] })

        } else {
          // const sql =`SHOW FULL TABLES FROM ${database}`;
          const sql = completion.data.choices[0].text;
          connection.query(sql, (error, details) => {
            
            res.status(200).json({ result: completion.data.choices[0].text, query, message: "Conection Successfull", exito: true, details: details || [{ message: "No data found, try another query." }]})



          })
        }

      } catch (x) {
        console.log("Contacto.agregarUsuario.connect --Error-- " + x);
      }

    })


  } catch (err) {

    res.status(200).json({ message: "Error in the connection to the database or the call to the api." })

  }
}

function generatePrompt(query) {
  const capitalizedquery =
    query[0].toUpperCase() + query.slice(1).toLowerCase();
  return `Suggest three names for an query that is a superhero.

Query: agregar
Response: INSERT INTO Alumnos (IdAlumno, Nombres, Apellidos, Edad, Direccion_Residencia) VALUES 
('0101', 'Franklin1', 'Garcia', '25', 'avenida 01');  

Query: eliminar
Response: DELETE FROM cursos WHERE id =1; 
  
Query: mostrar
Response: SELECT * FROM cursos

Query: actualiza
Response: UPDATE cursos SET name ='david', slug ='dato', description ='esta es una descripción', categoria='libros' WHERE id =2

Query: ${capitalizedquery}
Response:`;
}
