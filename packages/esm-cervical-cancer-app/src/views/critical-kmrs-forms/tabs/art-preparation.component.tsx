import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';

interface ArtPreparationListProps {
  patientUuid: string;
}

const ArtPreparationEncounterList: React.FC<ArtPreparationListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'enrollmentDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return encounter.encounterDatetime;
        },
      },
      {
        key: 'infectionNature',
        header: 'Understands the nature of HIV infection',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '1729AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'disclosure',
        header: 'Is willing to disclose/has disclosed HIV status',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '1048AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'caregiverDependency',
        header: t('caregiverDependency', 'For patients dependent on a caregiver'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '5619AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'art_preparation', package: 'kmrs' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'art_preparation', package: 'kmrs' },
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
      encounterUuid="e87aa2ad-6886-422e-9dfd-064e3bfe3aad"
      form={{ package: 'kmrs', name: 'art_preparation' }}
      columns={columnsLab}
      description="ART Preparation"
      headerTitle="ART Preparation"
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default ArtPreparationEncounterList;
