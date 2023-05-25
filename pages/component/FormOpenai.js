import { useFormIA } from "../../hooks/useOpenai";
const FormOpenai = ({setResult, setQueryResponse,user,password,host,database,setDataQuery,setLoading,loading,setHidden,hidden}) => {
      const {onSubmit,queryInput,setqueryInput,message} = useFormIA(setResult, setQueryResponse,user,password,host,database,setDataQuery,setLoading);
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
            <input type="submit" value="Generate query" className="btn btn-primary" disabled={loading} />
          <small className="d-block my-3"    >
              {message}
          </small>
          </form>
          <button  className="btn btn-primary" onClick={()=>{setHidden(!hidden)}} >Frecuent querys</button>
          </div>
   
  );
  
}
 
export default FormOpenai;