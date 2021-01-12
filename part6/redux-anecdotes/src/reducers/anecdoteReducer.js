import noteService from '../services/anecdotes';

const anecdoeReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'VOTE':
      const id = action.data.id;
      const rawAnecdote = state.find((a) => a.id === id);
      const votedAnecdote = { ...rawAnecdote, votes: rawAnecdote.votes + 1 };
      const newState = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
      return newState;
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await noteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const voteFor = (id) => {
  return async (dispatch) => {
    await noteService.vote(id);
    dispatch({
      type: 'VOTE',
      data: { id },
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await noteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export default anecdoeReducer;
