import Head from "next/head";
import { useState } from "react";
import FormDB from "./component/FormDB";
import styles from "./index.module.css";
import 'bootswatch/dist/lux/bootstrap.min.css';
import FormOpenai from "./component/FormOpenai";
import View from "./component/View";
import Loading from "./component/Loading";
export default function Home() {
  const [queryResponse, setQueryResponse] = useState("");
  const [result, setResult] = useState("");
  const [user, setUser] = useState('');
  const [host, setHost] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('');
  const [dataQuery, setDataQuery] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Head>
        <title>OpenAI and SQL</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className="container py-3">
        <h1>OpenAI and SQL</h1>
        <div className="row">
          <FormDB setDatabase={setDatabase} setHost={setHost} setUser={setUser} setPassword={setPassword} />
          <FormOpenai setResult={setResult} setQueryResponse={setQueryResponse} user={user} host={host} password={password} database={database} setDataQuery={setDataQuery} setLoading={setLoading}  />
          {
            loading && <Loading/>
          }
         <View result={result} queryResponse={queryResponse} dataQuery={dataQuery} />
          </div> 
      </main>
    </div>
  );
}
