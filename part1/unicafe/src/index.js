import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {text === 'positive' && '%'}
    </td>
  </tr>
);

const Statistics = ({
  stats: { good, neutral, bad, all, average, positive },
}) => {
  if (all === 0) return <div>No feedback given</div>;

  return (
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={all} />
        <Statistic text='average' value={average} />
        <Statistic text='positive' value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = all && (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = all && (good * 100) / all;

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <h2>statistics</h2>
      <Statistics stats={{ good, neutral, bad, all, average, positive }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
