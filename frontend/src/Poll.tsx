import React from "react";
import { useParams } from "react-router-dom";

export default function Poll() {
  const {poll_id} = useParams();
  console.log(poll_id);
  return (<>
    <div className="App">
      <h1>
        Hello {poll_id}
      </h1>
    </div>
  </>)
}
