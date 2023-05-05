import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';

interface TriageEncounterListProps {
  patientUuid: string;
}

const DefaulterTracingEncounterList: React.FC<TriageEncounterListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'triageDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return encounter.encounterDatetime;
        },
      },
      {
        key: 'typeOfTracing',
        header: 'Type of tracing',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, 'a55f9516-ddb6-47ec-b10d-cb99d1d0bd41');
        },
      },
      {
        key: 'tracingOutcome',
        header: 'Tracing Outcome',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '160721AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'defaulter_tracing', package: 'kmrs' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'defaulter_tracing', package: 'kmrs' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('editForm', 'Edit Form'),
              mode: 'edit',
            },
          ];
          return baseActions;
        },
      },
    ],
    [],
  );

  return (
    <EncounterList
      patientUuid={patientUuid}
      encounterUuid="1495edf8-2df2-11e9-b210-d663bd873d93"
      form={{ package: 'kmrs', name: 'defaulter_tracing' }}
      columns={columnsLab}
      description="CCC Defaulter Tracing"
      headerTitle="CCC Defaulter Tracing"
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default DefaulterTracingEncounterList;
