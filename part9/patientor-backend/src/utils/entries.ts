/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Entry, HospitalDischarge } from '../types';
import { isString } from './testers';
import { v1 as uuid } from 'uuid';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isDischarge = (discharge: HospitalDischarge): boolean => {
  if (!discharge.date || !discharge.criteria) return false;
  if (!isString(discharge.date) || !isString(discharge.criteria)) return false;
  return true;
};

const isValidFields = (entry: Entry): boolean => {
  if (!entry.date || !entry.description || !entry.specialist || !entry.type) {
    return false;
  }

  if (
    !isString(entry.date) ||
    !isString(entry.description) ||
    !isString(entry.specialist) ||
    !isString(entry.type)
  ) {
    return false;
  }

  if (entry.diagnosisCodes && !Array.isArray(entry.diagnosisCodes)) {
    return false;
  }

  switch (entry.type) {
    case 'HealthCheck':
      if (
        !entry.healthCheckRating ||
        ![0, 1, 2, 3].includes(entry.healthCheckRating)
      ) {
        return false;
      }
      break;
    case 'Hospital':
      if (!entry.discharge || !isDischarge(entry.discharge)) {
        return false;
      }
      break;
    case 'OccupationalHealthcare':
      if (!entry.employerName || !isString(entry.employerName)) {
        return false;
      }
      break;
    default:
      assertNever(entry);
      break;
  }

  return true;
};

const parseEntry = (entry: any): Entry => {
  if (!entry || !isValidFields(entry)) {
    throw new Error('Incorrect or missing entry');
  }

  return entry;
};

const toValidNewEntry = (object: any): Entry => {
  object.id = uuid();
  return parseEntry(object);
};

export default toValidNewEntry;
