import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { addToBaseFormsRegistry } from '@openmrs/openmrs-form-engine-lib';
import cacxForms from './forms/forms-registry';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-cervical-cancer-app';

function setupOpenMRS() {
  const options = {
    featureName: 'ohri-cervical-cancer',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  addToBaseFormsRegistry(cacxForms);

  return {
    pages: [],
    extensions: [
      {
        id: 'kmrs-forms-db',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(
          createDashboardLink({
            title: 'Baseline forms',
          }),
          options,
        ),
        meta: {
          title: 'Baseline forms',
          slot: 'kmrs-forms-slot',
          isExpanded: false,
          columns: 1,
        },
        online: true,
        offline: true,
      },
      {
        id: 'kmrs-forms-widget',
        slot: 'kmrs-forms-slot',
        load: getAsyncLifecycle(() => import('./views/critical-kmrs-forms/critical-forms-landing.component'), {
          featureName: 'kmrs form entry',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
