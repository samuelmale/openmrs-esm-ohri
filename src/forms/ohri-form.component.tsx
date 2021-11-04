import React, { useEffect, useMemo, useState } from 'react';
import styles from './ohri-form.component.scss';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  useCurrentPatient,
  useSessionUser,
  showToast,
  attach,
  getAsyncLifecycle,
  registerExtension,
  detach,
} from '@openmrs/esm-framework';
import { useTranslation } from 'react-i18next';
import LoadingIcon from '../components/loading/loading.component';
import { OHRIFormSchema, OHRIFormField, SessionMode } from './types';
import OHRIFormSidebar from './components/sidebar/ohri-form-sidebar.component';
import OHRIFormPage from './components/page/ohri-form-page';
import { ConceptFalse, ConceptTrue, HTSEncounterType } from './constants';
import { isEmpty, isEmpty as isValueEmpty, OHRIFieldValidator } from './validators/ohri-form-validator';
import { encounterRepresentation } from '../constants';
import { cascadeVisibityToChildFields } from './utils/ohri-form-helper';
import { OHRIEncounterForm } from './components/encounter/ohri-encounter-form';

interface OHRIFormProps {
  formJson: OHRIFormSchema;
  onSubmit?: any;
  onCancel?: any;
  encounterUuid?: string;
  mode?: SessionMode;
  handleClose?: any;
  patientUUID?: string;
}

const OHRIForm: React.FC<OHRIFormProps> = ({
  formJson,
  encounterUuid,
  mode,
  onSubmit,
  onCancel,
  handleClose,
  patientUUID,
}) => {
  const [currentProvider, setCurrentProvider] = useState(null);
  const [location, setEncounterLocation] = useState(null);
  const [, patient] = useCurrentPatient(patientUUID);
  const session = useSessionUser();
  const [initialValues, setInitialValues] = useState({});
  const encDate = new Date();
  const [scrollAblePages, setScrollablePages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const { t } = useTranslation();
  const form = useMemo(() => JSON.parse(JSON.stringify(formJson)), []);

  useEffect(() => {
    const extDetails = {
      id: 'ohri-form-header-toggle-ext',
      moduleName: '@openmrs/esm-ohri-app',
      slot: 'patient-chart-workspace-header-slot',
      load: getAsyncLifecycle(
        () => import('./components/section-collapsible-toggle/ohri-section-collapsible-toggle.component'),
        {
          featureName: 'ohri-form-header-toggle',
          moduleName: '@openmrs/esm-ohri-app',
        },
      ),
      meta: {
        handleCollapse: (value: boolean) => {
          setCollapsed(value);
        },
      },
    };
    registerExtension(extDetails.id, extDetails);
    attach('patient-chart-workspace-header-slot', extDetails.id);

    return () => {
      detach('patient-chart-workspace-header-slot', extDetails.id);
    };
  }, []);

  useEffect(() => {
    if (session) {
      if (!encounterUuid) {
        setEncounterLocation(session.sessionLocation);
      }
      setCurrentProvider(session.currentProvider.uuid);
    }
  }, [session]);

  const handleFormSubmit = (values: Record<string, any>) => {};

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object({})}
      onSubmit={(values, { setSubmitting }) => {
        handleFormSubmit(values);
        setSubmitting(false);
      }}>
      {props => (
        <Form style={{ height: '100%' }}>
          {!patient ? (
            <LoadingIcon />
          ) : (
            <>
              <div className={styles.mainContainer}>
                <OHRIFormSidebar
                  scrollAblePages={scrollAblePages}
                  selectedPage={selectedPage}
                  mode={mode}
                  onCancel={onCancel}
                  handleClose={handleClose}
                  values={props.values}
                  setValues={props.setValues}
                  allowUnspecifiedAll={formJson.allowUnspecifiedAll}
                  defaultPage={formJson.defaultPage}
                />
                <OHRIEncounterForm
                  formJson={form}
                  patient={patient}
                  encounterDate={encDate}
                  provider={currentProvider}
                  location={location}
                  values={props.values}
                  isCollapsed={collapsed}
                  sessionMode={mode}
                  scrollablePages={scrollAblePages}
                  setInitialValues={setInitialValues}
                  setSrollablePages={setScrollablePages}
                  setFieldValue={props.setFieldValue}
                  setSelectedPage={setSelectedPage}
                />
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default OHRIForm;
