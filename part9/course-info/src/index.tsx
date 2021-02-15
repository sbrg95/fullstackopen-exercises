import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDesc {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDesc {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDesc {
  name: 'Advanced typescript';
  workingHours: number;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

const Header: React.FC<{ name: string }> = ({ name }) => <h1>{name}</h1>;

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  let output = `${part.name} ${part.exerciseCount}`;
  switch (part.name) {
    case 'Fundamentals':
      output += ` ${part.description}`;
      break;
    case 'Using props to pass data':
      output += ` ${part.groupProjectCount}`;
      break;
    case 'Deeper type usage':
      output += ` ${part.description} ${part.exerciseSubmissionLink}`;
      break;
    case 'Advanced typescript':
      output += ` ${part.description} ${part.workingHours}`;
      break;
    default:
      return assertNever(part);
  }

  return <p>{output}</p>;
};

const Content: React.FC<{
  parts: CoursePart[];
}> = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
);

const Total: React.FC<{ total: number }> = ({ total }) => (
  <p>Number of exercises {total}</p>
);

const App: React.FC = () => {
  const courseName = 'Half Stack application development';

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
    {
      name: 'Advanced typescript',
      exerciseCount: 20,
      description: 'Advanced typescript concepts',
      workingHours: 15,
    },
  ];

  const total = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={total} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
