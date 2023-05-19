const FormDB = ({setDatabase,setHost,setUser,setPassword,setSgbd}) => {
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
          <div>
          <input
            type="text"
            name="database"
            placeholder="Enter database"
            className="form-control mb-2"
            onBlur={(e)=>{setDatabase(e.target.value) }}
           
          />

           <select className="form-select" onChange={(e)=>{
             setSgbd(e.target.value)}} >
             <option value={0}>Mysql</option>
             <option value={1}>Postgres</option>
           </select>
          </div>
        </form>
    
    
    </> );
}
 
export default FormDB;