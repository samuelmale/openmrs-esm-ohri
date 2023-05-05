import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';

interface TriageEncounterListProps {
  patientUuid: string;
}

const TriageEncounterList: React.FC<TriageEncounterListProps> = ({ patientUuid }) => {
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
        key: 'height',
        header: 'Height',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'weight',
        header: 'Weight',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'bmi',
        header: t('bmi', 'BMI'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '1342AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'triage', package: 'kmrs' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'triage', package: 'kmrs' },
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
      encounterUuid="d1059fb9-a079-4feb-a749-eedd709ae542"
      form={{ package: 'kmrs', name: 'triage' }}
      columns={columnsLab}
      description="Triage"
      headerTitle="Triage"
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default TriageEncounterList;
