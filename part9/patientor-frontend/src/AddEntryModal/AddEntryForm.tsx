import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import {
  TextField,
  SelectField,
  DiagnosisSelection,
  NumberField,
  Option,
} from '../Utils';
import { useStateValue } from '../state';
import { Entry, HealthCheckRating } from '../types';

/*
 * use type Entry, but omit id ,
 * because those are irrelevant for new entry object.
 */

export interface EntryFormValues extends Omit<Entry, 'id'> {
  healthCheckRating: HealthCheckRating;
  dischargeDate: string;
  dischargeCriteria: string;
  employerName: string;
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const entryOptions: Option[] = [
    { value: 'HealthCheck', label: 'Health Check' },
    { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
    { value: 'Hospital', label: 'Hospital' },
  ];
  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        type: 'HealthCheck',
        diagnosisCodes: [],
        healthCheckRating: 0,
        dischargeDate: '',
        dischargeCriteria: '',
        employerName: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        switch (values.type) {
          case 'HealthCheck':
            if (!values.healthCheckRating && values.healthCheckRating !== 0) {
              errors.healthCheckRating = requiredError;
            }
            break;
          case 'Hospital':
            if (!values.dischargeDate) {
              errors.dischargeDate = requiredError;
            }
            if (!values.dischargeCriteria) {
              errors.dischargeCriteria = requiredError;
            }
            break;
          case 'OccupationalHealthcare':
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            break;
          default:
            break;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <SelectField label="Type" name="type" options={entryOptions} />

            <DiagnosisSelection
              diagnoses={diagnoses}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            {values.type === 'OccupationalHealthcare' && (
              <Field
                label="Employer Name"
                placeholder="Employer Name"
                name="employerName"
                component={TextField}
              />
            )}

            {values.type === 'HealthCheck' && (
              <Field
                label="Dealth Check Rating"
                placeholder="Dealth Check Rating"
                name="healthCheckRating"
                min={0}
                max={3}
                component={NumberField}
              />
            )}

            {values.type === 'Hospital' && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge Criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            )}

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!isValid || !dirty}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
