interface exerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  target: number;
  exHours: Array<number>;
}

const parseExArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args.some((arg, index) => index > 1 && isNaN(Number(arg)))) {
    throw new Error('Provided values were not numbers!');
  }

  const target = Number(args[2]);

  let exHours: Array<number> = [];
  args.forEach(
    (arg, index) => index > 2 && (exHours = exHours.concat(Number(arg)))
  );

  return {
    target,
    exHours,
  };
};

export const calculateExercises = (
  exHours: Array<number>,
  target: number
): exerciseStats => {
  const periodLength = exHours.length;
  const trainingDays = exHours.reduce((days, currDay) => (currDay === 0 ? days : days + 1), 0);
  const average = exHours.reduce((prev, curr) => prev + curr) / exHours.length;
  const success = average >= target;

  let rating = 3;
  let ratingDescription = 'very good job you have reached the daily target.';
  if (!success) {
    if (target - average > 1) {
      rating = 1;
      ratingDescription =
        'unfortunatly, you are far away from expected target, be serious! you can do it!';
    } else {
      rating = 2;
      ratingDescription = 'not too bad but could be better.';
    }
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { target, exHours } = parseExArguments(process.argv);
  console.log(calculateExercises(exHours, target));
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  }
}
