import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem.js";
import PropTypes from 'prop-types';

function InterviewerList(props) {
  const parsedInterviewers = props.interviewers.map(interviewer => ( <InterviewerListItem
    key={interviewer.id} 
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={interviewer.id === props.interviewer}
    setInterviewer={(event) => props.setInterviewer(interviewer.id)} 
    />
    ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
