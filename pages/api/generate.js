import { Configuration, OpenAIApi } from "openai";
const express = require('express');
const mysql = require('mysql');
const bodyParser= require('body-parser');
const server = express();
server.use(bodyParser.json());



const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      },
      result: completion.data.choices[0].text, query, message: "Conexión con api fallada por apiKey." , exito: false
    });
    return;
  }
  const host = req.body.host,
  user  = req.body.user,
  password = req.body.password,
  database = req.body.database;

const connection = mysql.createConnection({
    host:host,
    user: user,
    password:password,
    database: database      
  })
  const query = req.body.query;
  console.log(req.body)
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(query),
      temperature: 0.6,
      max_tokens: 200,
      maxDuration: 60
    });
   
    connection.connect(function(error){
      try{
        if(error){ 
  
         
          res.status(200).json({ result: completion.data.choices[0].text, query, message: "Conexión fallada." , exito: false}) 
          
        }else{  
          // const sql =`SHOW FULL TABLES FROM ${database}`;
          const sql = completion.data.choices[0].text;
          connection.query(sql,(error,details)=>{
            res.status(200).json({ result: completion.data.choices[0].text, query, message: "Conexión exitosa" , exito: true, details}) 
          
         })
     
      } 

      }catch(x){ 
        console.log("Contacto.agregarUsuario.connect --Error-- " + x); 
      } 

    })
   
    
  } catch (error) {
    console.log(error)
   
  }
}

function generatePrompt(query) {
  const capitalizedquery =
    query[0].toUpperCase() + query.slice(1).toLowerCase();
  return `Suggest three names for an query that is a superhero.

Query: agregar
Response: 
    const sql ='INSERT  INTO cursos SET ?';
    const cursoObjeto={
        name: req.body.name,
        slug : req.body.slug,
        description: req.body.description,
        categoria: req.body.categoria,
    };

Query: eliminar
Response: DELETE FROM cursos WHERE id =1; 
  
Query: mostrar
Response: SELECT * FROM cursos

Query: actualiza
Response: UPDATE cursos SET name ='david', slug ='dato', description ='esta es una descripción', categoria='libros' WHERE id =2

Query: ${capitalizedquery}
Response:`;
}
