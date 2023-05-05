import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import styles from '../common.scss';

import { useTranslation } from 'react-i18next';
import TriageEncounterList from './tabs/triage.component';
import FastTrackEncounterList from './tabs/first-track.component';
import DefaulterTracingEncounterList from './tabs/defaulter-tracing';

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
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default FormsPanel;
