import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';

interface HivDiscontinuationListProps {
  patientUuid: string;
}

const HivDiscontinuationEncounterList: React.FC<HivDiscontinuationListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'discontinuationDate',
        header: t('visitDate', 'Visit Date'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '164384AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'reason',
        header: 'Reason',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '161555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'deathDate',
        header: 'Date of Death',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '1543AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', true);
        },
      },
      {
        key: 'specificDateCause',
        header: t('specificDateCause', 'Specific cause of death'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '1748AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'hiv_discontinuation', package: 'kmrs' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'hiv_discontinuation', package: 'kmrs' },
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
      encounterUuid="2bdada65-4c72-4a48-8730-859890e25cee"
      form={{ package: 'kmrs', name: 'hiv_discontinuation' }}
      columns={columnsLab}
      description="HIV Discontinuation"
      headerTitle="HIV Discontinuation"
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default HivDiscontinuationEncounterList;
