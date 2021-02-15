import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
  Entry,
} from '../types';

const getPatientEntries = (): PatientEntry[] => {
  return patients;
};

const getPatientEntry = (id: string): PatientEntry => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found!`);
  }
  return patient;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatientEntry = (patientEntry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...patientEntry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: Entry): PatientEntry => {
  const patientEntry = patients.find((patient) => patient.id === id);
  if (!patientEntry) {
    throw new Error(`Patient with id ${id} not found!`);
  }
  patientEntry.entries.push(entry);
  return patientEntry;
};

export default {
  getPatientEntries,
  getPatientEntry,
  getNonSensitivePatientEntries,
  addPatientEntry,
  addEntry,
};
