import Head from "next/head";
import { useState } from "react";
import FormDB from "./component/FormDB";
import styles from "./index.module.css";
import 'bootswatch/dist/lux/bootstrap.min.css';
import FormOpenai from "./component/FormOpenai";
import View from "./component/View";
import Loading from "./component/Loading";
import Querys from "./component/Querys";


export default function Home() {
  const [queryResponse, setQueryResponse] = useState("");
  const [result, setResult] = useState("");
  const [user, setUser] = useState('');
  const [host, setHost] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('');
  const [dataQuery, setDataQuery] = useState([]);
  // const [sgbd, setSgbd] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [querys, setQuerys] = useState([]);
  return (
    <div className="position-relative">
      <Head>
        <title>OpenAI and SQL</title>
        <link rel="icon" href="/dog.png" />
        {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script> */}
      </Head>

      <main className="container py-3">
        <h1>OpenAI and SQL</h1>
        <div className="row">
          <FormDB setDatabase={setDatabase} setHost={setHost} setUser={setUser} setPassword={setPassword}   />
          <FormOpenai setResult={setResult} setQueryResponse={setQueryResponse} user={user} host={host} password={password} database={database} setDataQuery={setDataQuery} setLoading={setLoading} loading={loading} setHidden={setHidden} hidden={hidden}  />
          {
            loading && <Loading/>
          }
          {
            hidden &&
            <Querys  hidden={hidden} setHidden={setHidden} setQuerys={setQuerys} querys={querys} user={user} host={host} password={password} database={database} dataQuery={dataQuery} setDataQuery={setDataQuery} setLoading={setLoading} setResult={setResult} setQueryResponse={setQueryResponse}  />
          }

         <View result={result} queryResponse={queryResponse} dataQuery={dataQuery} />
          </div> 
      </main>
    </div>
  );
}
