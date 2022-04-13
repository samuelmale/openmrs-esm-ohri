import React, { useState } from 'react';

import moment from 'moment';
import EncounterList, {
  EncounterListColumn,
  getObsFromEncounter,
} from '../../components/encounter-list/encounter-list.component';

export const cervicalCancerEncountertype = '580021f0-c913-4d88-8e10-4922e3270a59';

const columns: EncounterListColumn[] = [
  {
    key: 'date',
    header: 'Date of Encounter',
    getValue: encounter => {
      return moment(encounter.encounterDatetime).format('DD-MMM-YYYY');
    },
  },
  {
    key: 'entryPoint',
    header: 'Entry Point',
    getValue: encounter => {
      return getObsFromEncounter(encounter, '8ef61711-3036-4e29-ad0f-340bd18c1168');
    },
  },
  {
    key: 'inpatientDep',
    header: 'Inpatient department',
    getValue: encounter => {
      return getObsFromEncounter(encounter, '167050AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    },
  },
  {
    key: 'referralIn',
    header: 'Referral In',
    getValue: encounter => {
      return getObsFromEncounter(encounter, '7b734819-27fb-41bb-af95-f91182c242f2');
    },
  },
];

const CervicalCancerEncounterList = ({ patientUuid }) => {
  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid={cervicalCancerEncountertype}
      form={{ package: 'cancer', name: 'screening_and_treatment' }}
      forms={[{ package: 'cancer', name: 'screening_and_treatment', fixedIntent: '*', excludedIntents: [] }]}
      columns={columns}
      description="Screening sessions"
      headerTitle="Screening sessions"
      dropdownText="Add"
    />
  );
};

export default CervicalCancerEncounterList;

export const cervicalCancerMeta = {
  name: 'cervical-cancer',
  slot: 'cervical-cancer-dashboard-slot',
  config: { columns: 1, type: 'grid' },
  title: 'Cervical cancer',
};
