import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }

  if (
    !Array.isArray(daily_exercises) ||
    typeof target !== 'number' ||
    daily_exercises.some((ex) => typeof ex !== 'number')
  ) {
    return res.status(400).json({
      error: 'malformatted parameters',
    });
  }

  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
