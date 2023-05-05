import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';

interface FastTrackEncounterListProps {
  patientUuid: string;
}

const FastTrackEncounterList: React.FC<FastTrackEncounterListProps> = ({ patientUuid }) => {
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
        key: 'artFastTrack',
        header: 'ART Fast Track for Stable Patients',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '1758AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'supplyDuration',
        header: 'Duration',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '1444AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'fast_track', package: 'kmrs' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'fast_track', package: 'kmrs' },
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
      form={{ package: 'kmrs', name: 'fast_track' }}
      columns={columnsLab}
      description="Fast Track"
      headerTitle="Fast Track"
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default FastTrackEncounterList;
