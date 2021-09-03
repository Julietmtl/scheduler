import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem.js";


export default function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map(interviewer => ( <InterviewerListItem
    key={interviewer.id} 
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={interviewer.id === props.interviewer}
    setInterviewer={(event) => props.setInterviewer(interviewer.id)} 
    />
    ));
  // console.log("parsed Interviewer --- ", parsedInterviewers)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}


// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id