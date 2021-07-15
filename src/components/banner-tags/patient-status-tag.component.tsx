import React from 'react';
import Tag from 'carbon-components-react/es/components/Tag';
import TooltipDefinition from 'carbon-components-react/es/components/TooltipDefinition';
import { useVisit } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import styles from './active-visit-tag.scss';

function PatientStatusBannerTag({ patientUuid }) {
  const { currentVisit } = useVisit(patientUuid);
  const { t } = useTranslation();
  return (
    currentVisit && (
      <TooltipDefinition
        align="end"
        tooltipText={
          <div className={styles.tooltipPadding}>
            <h6 style={{ marginBottom: '0.5rem' }}> </h6>
            <span>
              <span className={styles.tooltipSmallText}>Started: </span>
              <span>{dayjs(currentVisit && currentVisit.startDatetime).format('DD - MMM - YYYY @ HH:mm')}</span>
            </span>
          </div>
        }>
        <Tag type="red">{t('hivPositive', 'HIV Positive 2')}</Tag>
      </TooltipDefinition>
    )
  );
}

export default PatientStatusBannerTag;
