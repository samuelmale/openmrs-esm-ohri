import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';

import { useTranslation } from 'react-i18next';
import TriageEncounterList from './tabs/triage.component';
import FastTrackEncounterList from './tabs/first-track.component';
import DefaulterTracingEncounterList from './tabs/defaulter-tracing';
import ArtPreparationEncounterList from './tabs/art-preparation.component';
import HivDiscontinuationEncounterList from './tabs/hiv-discontinuation.component';
import HivEnrollmentEncounterList from './tabs/hiv-enrollment.component';
import HivGreenCardLEncounterList from './tabs/hiv-green-card.component';

interface OverviewListProps {
  patientUuid: string;
}

const FormsPanel: React.FC<OverviewListProps> = ({ patientUuid }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabContainer}>
      <Tabs>
        <TabList contained>
          <Tab className="tab-12rem">
            <span>Triage</span>
          </Tab>
          <Tab>
            <span>Fast Track</span>
          </Tab>
          <Tab>
            <span>Defaulter Tracing</span>
          </Tab>
          <Tab>
            <span>HIV Green Card</span>
          </Tab>
          <Tab>
            <span>ART Preparation</span>
          </Tab>
          <Tab>
            <span>HIV Enrollmemnt</span>
          </Tab>
          <Tab>
            <span>HIV Discontinuation</span>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TriageEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <FastTrackEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <DefaulterTracingEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <HivGreenCardLEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <ArtPreparationEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <HivEnrollmentEncounterList patientUuid={patientUuid} />
          </TabPanel>
          <TabPanel>
            <HivDiscontinuationEncounterList patientUuid={patientUuid} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default FormsPanel;
