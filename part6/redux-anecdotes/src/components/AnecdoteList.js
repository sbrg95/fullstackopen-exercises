import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { initializeAnecdotes, voteFor } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
);

const AnecdoteList = ({
  anecdotes,
  initializeAnecdotes,
  voteFor,
  setNotification,
}) => {
  useEffect(() => {
    initializeAnecdotes();
  }, [initializeAnecdotes]);

  const vote = ({ id, content }) => {
    voteFor(id);
    setNotification(`you voted '${content}'`, 10);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ filter, anecdotes }) => {
  return {
    anecdotes: anecdotes
      .filter((anecdote) => anecdote.content.includes(filter))
      .sort((a, b) => b.votes - a.votes),
  };
};

const mapDispatchToProps = { initializeAnecdotes, voteFor, setNotification };

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
