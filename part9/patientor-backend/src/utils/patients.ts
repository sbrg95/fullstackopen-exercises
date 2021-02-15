/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NewPatientEntry, Gender, Entry } from '../types';
import { isString, isDate } from './testers';

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing dateOfBirth: ${dateOfBirth}`);
  }

  return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }

  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }

  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error(`Incorrect or missing entries: ${entries}`);
  }

  return entries;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: parseEntries(object.entries),
  };

  return newEntry;
};

export default toNewPatientEntry;
