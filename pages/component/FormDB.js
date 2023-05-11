import { useState } from "react";

const FormDB = ({setDatabase,setHost,setUser,setPassword}) => {
  //   const [user, setUser] = useState('');
  //   const [host, setHost] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [database, setDatabase] = useState('');
  // const [reponse, setReponse] = useState('');

//  const conectionDatabase= async(event)=>{
//    event.preventDefault();
//     try {
//       const response = await fetch("/api/bd", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user,host,password,database }),
//       });

//       const data = await response.json();
//       setReponse(data.message)
//       if (response.status !== 200) {
//         throw data.error || new Error(`Request failed with status ${response.status}`);
//       }
//  }catch(error){

//  }}
    return ( 
    <>
        <form className="col-12 col-md-6 my-3" >
          <p >You must connect to your database first</p>  
          <input
            type="text"
            name="host"
            placeholder="Enter host"
            className="form-control mb-2"
            onBlur={(e)=>{ setHost(e.target.value)}}
           
          />
          <input
            type="text"
            name="password"
            placeholder="Enter password"
            className="form-control mb-2"
            onBlur={(e)=>{ setPassword(e.target.value)}}
           
          />
          <input
            type="text"
            name="user"
            placeholder="Enter user"
            className="form-control mb-2"
            onBlur={(e)=>{ setUser(e.target.value)}}
           
          />
          <input
            type="text"
            name="database"
            placeholder="Enter database"
            className="form-control mb-2"
            onBlur={(e)=>{setDatabase(e.target.value) }}
           
          />
          {/* <input type="submit" value="Generate conection" className="btn btn-primary" /> */}
          
          {/* <small className="d-block my-3">{reponse}</small> */}
        </form>
    
    
    </> );
}
 
export default FormDB;