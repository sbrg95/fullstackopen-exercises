import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Loader, Header, List, Card, Button } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { Entry, Patient, HealthCheckRating, HospitalDischarge } from '../types';
import { useStateValue, savePatient, updatePatient } from '../state';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';

const PatientInfo: React.FC = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(savePatient(patientFromApi));
    };
    if (!patient || patient.id !== id) fetchPatient();
  }, [id, patient, dispatch]);

  if (!patient || patient.id !== id) {
    return <Loader active inline="centered" />;
  }

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      let cleanedValues: {
        [k: string]: string | string[] | HospitalDischarge | HealthCheckRating;
      } = {
        date: values.date,
        description: values.description,
        specialist: values.specialist,
        type: values.type,
        diagnosisCodes: values.diagnosisCodes,
      };
      switch (values.type) {
        case 'HealthCheck':
          cleanedValues = {
            ...cleanedValues,
            healthCheckRating: values.healthCheckRating,
          };
          break;
        case 'Hospital':
          cleanedValues = {
            ...cleanedValues,
            discharge: {
              date: values.dischargeDate,
              criteria: values.dischargeCriteria,
            },
          };
          break;
        case 'OccupationalHealthcare':
          cleanedValues = {
            ...cleanedValues,
            employerName: values.employerName,
          };
          break;
        default:
          break;
      }

      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        cleanedValues
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div>
      <Header as="h2">
        {patient.name}{' '}
        <Icon name={patient.gender === 'male' ? 'mars' : 'venus'} />
      </Header>
      <List>
        <List.Item>ssn: {patient.ssn}</List.Item>
        <List.Item>occupation: {patient.occupation}</List.Item>
        <List.Item>date of birth: {patient.dateOfBirth}</List.Item>
      </List>

      {patient.entries && (
        <>
          <Header as="h3">
            {patient.entries.length === 0 ? 'No entries.' : 'Entries :'}
          </Header>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
          {patient.entries.map((entry) => (
            <Card key={entry.id} fluid>
              <Card.Content>
                <EntryDetails entry={entry} />
                {entry.diagnosisCodes && (
                  <>
                    <Header as="h4">Diagnoses :</Header>
                    <List bulleted>
                      {entry.diagnosisCodes.map((code) => (
                        <List.Item key={code}>
                          <List.Header>{code}</List.Header>
                          {diagnoses &&
                            diagnoses.find(
                              (diagnosis) => diagnosis.code === code
                            )?.name}
                        </List.Item>
                      ))}
                    </List>
                  </>
                )}
              </Card.Content>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} discharge={entry.discharge} />;
    case 'HealthCheck':
      return (
        <HealthCheckEntry entry={entry} rating={entry.healthCheckRating} />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry
          entry={entry}
          employerName={entry.employerName}
        />
      );
    default:
      return assertNever(entry);
  }
};

const HealthCheckEntry: React.FC<{
  entry: Entry;
  rating: HealthCheckRating;
}> = ({ entry, rating }) => {
  let color = '';
  switch (rating) {
    case 1:
      color = 'yellow';
      break;
    case 2:
      color = 'orange';
      break;
    case 3:
      color = 'red';
      break;
    default:
      color = 'green';
      break;
  }
  return (
    <>
      <Card.Header>
        {entry.date} <Icon name="heart" style={{ color }} size="big" />
      </Card.Header>
      <Card.Description>{entry.description}</Card.Description>
    </>
  );
};

const OccupationalHealthcareEntry: React.FC<{
  entry: Entry;
  employerName: string;
}> = ({ entry, employerName }) => {
  return (
    <>
      <Card.Header>
        {entry.date} <Icon name="doctor" size="big" /> {employerName}
      </Card.Header>
      <Card.Description>{entry.description}</Card.Description>
    </>
  );
};

const HospitalEntry: React.FC<{
  entry: Entry;
  discharge: HospitalDischarge;
}> = ({ entry, discharge }) => {
  return (
    <>
      <Card.Header>
        {entry.date} <Icon name="hospital" size="big" />
      </Card.Header>
      <Card.Description>{entry.description}</Card.Description>
      <Card.Meta>
        Will discharge on {discharge.date} if {discharge.criteria}
      </Card.Meta>
    </>
  );
};

export default PatientInfo;
