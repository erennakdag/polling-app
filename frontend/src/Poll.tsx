import React, {useState} from "react";
import { useParams } from "react-router-dom";

import API from '././API';

export default function Poll() {
  const {poll_id} = useParams();
  const [pollName, setPollName] = useState('');
  API.getPoll(Number(poll_id)).then(res => setPollName(res.name));

  return (<>
    <div className="App">
      <h1>
        Hello {pollName}
      </h1>
    </div>
  </>)
}
