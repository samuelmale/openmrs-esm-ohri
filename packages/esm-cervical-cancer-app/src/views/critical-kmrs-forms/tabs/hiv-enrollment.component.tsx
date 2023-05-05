import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';

interface HivEnrollmentListProps {
  patientUuid: string;
}

const HivEnrollmentEncounterList: React.FC<HivEnrollmentListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'patientSource',
        header: t('patientSource', 'Patient Source'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '423c034e-14ac-4243-ae75-80d1daddce55');
        },
      },
      {
        key: 'dateConfirmedPositive',
        header: 'Date patient was confirmed HIV+',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '160554AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', true);
        },
      },
      {
        key: 'facility',
        header: 'Facility',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '162724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'cd4Count',
        header: t('cd4Count', 'CD4 Count'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '5497AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'hiv_enrollment', package: 'kmrs' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'hiv_enrollment', package: 'kmrs' },
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
      encounterUuid="de78a6be-bfc5-4634-adc3-5f1a280455cc"
      form={{ package: 'kmrs', name: 'hiv_enrollment' }}
      columns={columnsLab}
      description="HIV Enrollment"
      headerTitle="HIV Enrollment"
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default HivEnrollmentEncounterList;
