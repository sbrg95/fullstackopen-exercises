import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

import toNewPatientEntry from '../utils/patients';
import toValidNewEntry from '../utils/entries';

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
  try {
    res.send(patientService.getPatientEntry(req.params.id));
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatientEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toValidNewEntry(req.body);
    const updatedPatientEntry = patientService.addEntry(id, newEntry);
    res.json(updatedPatientEntry);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;
