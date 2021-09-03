import React, {Fragment} from "react";
import "./styles.scss";
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"

export default function Appointment(props) {
  return (
    <Fragment>
    <article className="appointment"></article>
    <Header time={props.time}/>
    {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />}
    </Fragment>
  )
  
};