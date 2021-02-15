import diagnoses from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};
