import {useEffect,useState} from 'react';
const View = ({result, queryResponse,dataQuery}) => {
  const [theads, setTheads] = useState([]);
  // ver si se soluciona sisn hacer esto
  const [dataRender, setDataRender] = useState(dataQuery||[]);
  const ConvertionArray=()=>{
  let ths = [];
   const item = dataQuery[0];
    for (const key in item) {
      ths.push(key);
    }
    setTheads(ths)    
}
  
  

useEffect(() => {
  ConvertionArray();
}, [dataQuery]);
    return ( 
        <div>
        <center style={{border: "4px solid gray", borderRadius:"5px", padding: "5rem"}}>
          <p>{queryResponse}</p>
          <hr/>
        <code >
          {result}
          
        </code>
        <div className='table-responsive'>

        
        <table className='table'>
          <thead>
            {
              theads.map((th,index)=>{
                  return <th key={index} >{th}</th>
              })
            }

          </thead>
          <tbody>
            {
              dataRender.length >0 && dataRender.map((item,index)=>{
                // let claves = Object.keys(item); // claves = ["nombre", "color", "macho", "edad"]
                
                   return <tr key={index+"tr"}>{
                    
                    Object.values(item).map((i,index)=>{      
                          return <td key={index+i}>{i}</td>
                       })
                    }</tr>
                })
              
            }
          </tbody>
        </table>
        </div>
        </center>
        </div>
     );
}

 
export default View;