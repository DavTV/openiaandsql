import { useState } from "react";
import Loading from "./Loading";

const FormOpenai = ({setResult, setQueryResponse,user,password,host,database,setDataQuery,setLoading}) => {
    const [queryInput, setqueryInput] = useState("");
    const [message, setMessage] = useState('');
   

  async function onSubmit(event) {
    event.preventDefault();
    if(queryInput==""){
      // setQueryVoid('Ingrese el query primero');
      setMessage("Ingrese el query primero.")
      return ;
    }
      // setQueryVoid('');

    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: queryInput, user, database,host,password }),
      });

      const data = await response.json();
      console.log(data)
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data)
      setResult(data.result);
      setQueryResponse(data.query)
      setMessage(data.message)
      if(!data.details){
        setDataQuery([{respuesta:"No se encontro la consulta, ingrese un nuevo texto."}])
      }else{
        setDataQuery(data.details)
      }
      setqueryInput("");
      setLoading(false);
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="col-12 col-md-6 my-3">       
          <form  onSubmit={onSubmit}>
          <p >Write your query</p>  
            <textarea
              type="text"
              name="query"
              placeholder="Enter query"
              value={queryInput}
              className="form-control mb-3"
              onChange={(e) => setqueryInput(e.target.value)}
            ></textarea>
            <input type="submit" value="Generate query" className="btn btn-primary" />
          <small className="d-block my-3"   >
              {message}
          </small>
          </form>

          </div>
   
  );
  
}
 
export default FormOpenai;