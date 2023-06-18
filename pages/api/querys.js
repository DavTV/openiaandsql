
const express = require('express');
const mysql = require('mysql');
const bodyParser= require('body-parser');
const server = express();
server.use(bodyParser.json());

export default function handler(req, res){
        const host = req.body.host,
        user  = req.body.user,
        password = req.body.password,
        database = req.body.database;
    
    console.log(req.body)
      const connection = mysql.createConnection({
          host:host,
          user: user,
          password:password,
          database: database      
        })
        connection.connect(function(error){                                                                                                 
          try{ 
             if(error){ 

                 console.log("Error al establecer la conexión a la BD -- " + error); 
                 res.status(200).json({message: "Error de conexión", exito:false})
             }else{  
                 console.log("Conexión exitosa querys"); 
                 const sql =`SELECT query, input, TRIM(REPLACE(query, ';', '')) AS query_sin_espacios, COUNT(*) AS num_repeticiones
                 FROM querys
                 GROUP BY TRIM(REPLACE(query, ';', ''))
                 HAVING COUNT(*) >= 4
                 ORDER BY num_repeticiones DESC
                 LIMIT 10;`;
                 connection.query(sql,(error,results)=>{
                    console.log(results)
                     res.status(200).json(results)
                })
                    
                // cunsulta aquí
             } 
         }
         catch(x){ 
             console.log("Contacto.agregarUsuario.connect --Error-- " + x); 
         } 
});

        
};
