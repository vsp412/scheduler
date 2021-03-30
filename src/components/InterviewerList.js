import React from "react"
import PropTypes from 'prop-types';
import "components/interviewerList.scss";
import InterviewerListItem from './interviewerListItem';
export default function InterviewerList (props) {
  const ints = props.interviewers.map(int => {
    return (
            <InterviewerListItem
              selected = {int.id === props.value}
              key = {int.id}
              name = {int.name}
              avatar = {int.avatar}
              setInterviewer = {e => props.onChange(int.id)}  
            />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ints}</ul>
    </section>
  )
}
InterviewerList.propTypes = {
  interviewers : PropTypes.array.isRequired
}