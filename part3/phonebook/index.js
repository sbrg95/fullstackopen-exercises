require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person.js');
const app = express();

app.use(express.json());
app.use(express.static('build'));
app.use(cors());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

// GET all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

// GET one person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// POST (create) a new person
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name) return res.status(400).json({ error: 'The name is missing' });
  if (!number) return res.status(400).json({ error: 'The number is missing' });

  const person = new Person({ name, number });
  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

// PUT (modify) a person
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  const person = { name, number };
  // Person.findById(req.params.id).then((person) => console.log(person));

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res
          .status(404)
          .json({ error: 'person not found or already removed' });
      }
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// DELETE a person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(202).end())
    .catch((error) => next(error));
});

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    const output = `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date().toString()}</p>
  `;
    res.send(output);
  });
});

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformated id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
