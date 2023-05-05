import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { EncounterList, EncounterListColumn, getObsFromEncounter } from '@ohri/openmrs-esm-ohri-commons-lib';
import { moduleName } from '../../../index';

interface HivGreenCardListProps {
  patientUuid: string;
}

const HivGreenCardLEncounterList: React.FC<HivGreenCardListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  const columnsLab: EncounterListColumn[] = useMemo(
    () => [
      {
        key: 'visitScheduled',
        header: t('visitScheduled', 'Visit Scheduled'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '1246AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'visitReason',
        header: 'Visit Reason',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '160638AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'parity',
        header: 'Parity',
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '160080AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },
      {
        key: 'gravida',
        header: t('gravida', 'Gravida'),
        getValue: (encounter) => {
          return getObsFromEncounter(encounter, '5624AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        },
      },

      {
        key: 'actions',
        header: t('actions', 'Actions'),
        getValue: (encounter) => {
          const baseActions = [
            {
              form: { name: 'hiv_green_card', package: 'kmrs' },
              encounterUuid: encounter.uuid,
              intent: '*',
              label: t('viewDetails', 'View Details'),
              mode: 'view',
            },
            {
              form: { name: 'hiv_green_card', package: 'kmrs' },
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
      encounterUuid="a0034eee-1940-4e35-847f-97537a35d05e"
      form={{ package: 'kmrs', name: 'hiv_green_card' }}
      columns={columnsLab}
      description="HIV Green Card"
      headerTitle="HIV Green Card"
      launchOptions={{
        displayText: 'Add',
        moduleName: moduleName,
      }}
    />
  );
};

export default HivGreenCardLEncounterList;
