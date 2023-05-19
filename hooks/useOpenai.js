import { useState } from "react";
export const useFormIA=(setResult, setQueryResponse,user,password,host,database,setDataQuery,setLoading,sgbd)=>{
    const [queryInput, setqueryInput] = useState("");
    const [message, setMessage] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if(queryInput==""){
     
      setMessage("Ingrese el query primero.")
      return ;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: queryInput, user, database,host,password,sgbd }),
      });

      const data = await response.json();
  
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setQueryResponse(data.query)
      setMessage(data.message)
      console.log(data.details)
      setDataQuery(data.details)
      setqueryInput("");
      setLoading(false);
    } catch(error) {
      console.error(error);

    }
  }
  return {
      onSubmit, queryInput, setqueryInput, message, 
  }

}