import React from 'react';
import { Add } from '@carbon/react/icons';
import styles from './launcher-with-intent.scss';
import { useTranslation } from 'react-i18next';
import { OHRIOverflowMenu } from '../overflow-menu-button/ohri-overflow-menu.component';

export const OHRIFormLauncherWithIntent: React.FC<{
  formJson?: any;
  launchForm: (formJson?: any, intent?: string) => void;
  title?: string;
  hideFormLauncher?: boolean;
  formsJson?: Array<any>;
}> = ({ formJson, launchForm, hideFormLauncher, formsJson, title }) => {
  const { t } = useTranslation();
  let overFlowItems = [];
  if (formsJson && formsJson.length > 1) {
    overFlowItems = formsJson.map((item) => {
      return { formJson: item, availableIntents: item.availableIntents };
    });
  } else {
    overFlowItems = [{ formJson: formJson, availableIntents: formJson.availableIntents }];
  }

  return (
    <div style={{ paddingTop: '.3rem' }}>
      {!hideFormLauncher && (
        <OHRIOverflowMenu
          menuTitle={
            <>
              <span className={styles.actionsButtonText}>{title || t('add', 'Add')}</span>{' '}
              <Add size={16} style={{ marginLeft: '0.5rem' }} />
            </>
          }
          overflowItems={overFlowItems}
          launchForm={launchForm}
          formJson={formJson}
        />
      )}
    </div>
  );
};
