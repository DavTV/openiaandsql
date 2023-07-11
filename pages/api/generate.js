
import { Configuration, OpenAIApi } from "openai";
import { Pool } from "pg";

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const server = express();
server.use(bodyParser.json());

export default async function (req, res) {
  
  async function fetchData() {
    const url = 'https://m0apni1w2c.execute-api.us-east-2.amazonaws.com/lamdaHandler';
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  
  async function consultarEndpoint() {
    try {
      const apikeyopenia = await fetchData();
      
      
      const configuration = new Configuration({
        apiKey: apikeyopenia,
      });
      const openai = new OpenAIApi(configuration);
      if (!configuration.apiKey) {
        res.status(500).json({
      
          result: completion.data.choices[0].text, query, message: "Conexión con api fallada por apiKey.", exito: false
        });
        return;
      }
      
  
      const host = req.body.host,
        user = req.body.user,
        password = req.body.password,
        database = req.body.database;
      
    
      const query = req.body.query;
      const inputFrecuent = req.body.inputFrecuent;
      const typeDb = req.body.typeDb;
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: generatePrompt(query),
          temperature: 0.6,
          max_tokens: 200,
        });
        switch (typeDb) {
          case 0:
            const connection = mysql.createConnection({
              host: "tallerintegrador-do-user-14366356-0.b.db.ondiditalocean.com",
              user: "doadmin",
              password: "AVNS_R1-y-ymRxSb7trqEvVY",
              database: "aguavoce",
              port: 25060
            })
            connection.connect(function (error) {
              try {
                if (error) {
            

                  res.status(200).json({ result: inputFrecuent || completion.data.choices[0].text, query, message: "Error de conexión.", exito: false, details: [{ message: "Revisa los parametros de tu base de datos." }] })
    
                } else {
                
                  const sql = completion.data.choices[0].text;
                  const sqlQuery = `Insert INTO querys (input,query) values ("${inputFrecuent != "" ? inputFrecuent : query}","${completion.data.choices[0].text}")`
                  connection.query(sql, (error, details) => {
                   
                    if (details) {
                      res.status(200).json({ result: completion.data.choices[0].text, query: inputFrecuent || query, message: "Conexión exitoso", exito: true, details })
                    } else {
                      const QueryTraducido = async () => {
    
                        const queryTraducido = query + " traduce la tabla a inglés y si se usa alguna columna traducela también, pero no traduscas el valor que se manda en el where, muestrame solo la consulta final";
                        const completionTraducido = await openai.createCompletion({
                          model: "text-davinci-003",
                          prompt: generatePrompt(queryTraducido),
                          temperature: 0.6,
                          max_tokens: 200,
                        })
                        const sqlTraducido = completionTraducido.data.choices[0].text;
                        console.log(sqlTraducido, "sql traducido")
                        connection.query(sqlTraducido, (error, detailsTraducido) => {
                         
                          console.log("detalles traduciado", detailsTraducido)
                          
                          res.status(200).json({ result: completionTraducido.data.choices[0].text, queryTraducido: inputFrecuent || query, message: "Conexión exitoso", exito: true, details: detailsTraducido || [{ message: "No se encontro respuesta, intenta otra vez." }] })
                        })
                      }
                      QueryTraducido()
                    }
                    console.log("details con la traducción activda", details)
                    details = details || [{ message: "No se encontro respuesta, intenta otra vez." }]
                    details = details.affectedRows ? [{ message: "Query successfull." }] : details
    
                    console.log(details, "details")
                    if (details.length > 1) {
                      connection.query(sqlQuery, (error, details) => {
                        if (error) {
                          console.log(error)
                        } else {
                          console.log("entro")
                          console.log(details, "segunda consulta")
                        }
                      })
                    }
    
                  })
                }
    
              } catch (x) {
                console.log("Contacto.agregarUsuario.connect --Error-- " + x);
              }
    
            })
    
            break;
          case 1:
    
    
            try {
    
              const pgp = require('pg-promise')({
                noWarnings: true
              })
              const db = pgp(`postgres://${user}:${password}@${host}:5432/${database}`)
              //  const  result = pool.query("select NOW()","result").json()
              console.log(db.connect);
              const postGres = async () => {
    
                try {
                  const result = await db.many(completion.data.choices[0].text);
    
                  console.log(result)
                  res.status(200).json({ result: completion.data.choices[0].text, query: inputFrecuent || query, message: "Conection successfull", exito: true, details: result })
                  
                  if (result) {
    
                    const result2 = await db.one(`Insert INTO querys (input,query) values ('${inputFrecuent != "" ? inputFrecuent : query}','${completion.data.choices[0].text}')`)
                  }
                  //  console.log(result2)
    
                } catch (error) {
                  console.log(error)
                  let message = error.message;
                  if (message) {
                    res.status(200).json({ result: completion.data.choices[0].text, query: inputFrecuent || query, message, details: [{ message }] })
                  } else {
                    res.status(200).json({ result: completion.data.choices[0].text, query: inputFrecuent || query, message: "Revisa los parametros de tu base de datos.", details: [{ message: "No se encontro data, intenta otra vez." }] })
    
                  }
    
                }
    
    
            
              }
              postGres()
          
    
            } catch (error) {
              console.log(error, "postgrees")
    
            }
    
    
            break;
          default:
            console.log("ningún gestor fue selecionado")
            break;
        }
      } catch (err) {
        res.status(200).json({ result: completion.data.choices[0].text, query: inputFrecuent || query, message: "Revisa los parametros de su base de datos.", details: [{ message: "Error con la key." }] })
        res.status(200).json({ message: "Error en la conexión a la base de datos o apiKey." })
    
      }
     
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
  
  console.log(consultarEndpoint().then(resultado => {
  
  }))
  
  
 
}



function generatePrompt(query) {
  const capitalizedquery =
    query[0].toUpperCase() + query.slice(1).toLowerCase();
  return `Suggest three names for an query that is a superhero.

Query: agregar
Response: INSERT INTO Alumnos (IdAlumno, Nombres, Apellidos, Edad, Direccion_Residencia) VALUES 
('0101', 'Franklin1', 'Garcia', 25, 'avenida 01');  

Query: eliminar
Response: DELETE FROM cursos WHERE id =1; 
  
Query: mostrar
Response: SELECT * FROM cursos

Query: actualiza
Response: UPDATE cursos SET name ='david', slug ='dato', description ='esta es una descripción', categoria='libros' WHERE id =2

Query: verifica
Response: verifica si existe la tabla, estas tabla pueden ser nombradas en ingles o español, además considera de forma indistinta si es plural o singular;

Query: ${capitalizedquery}
Response:`;
}
