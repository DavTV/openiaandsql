
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
                 console.log("Conexión exitosa"); 
                 const sql =`SELECT input, query, COUNT(*) AS num_repeticiones FROM querys GROUP BY input HAVING num_repeticiones >= 5 ORDER BY COUNT(*) DESC LIMIT 20`;
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
