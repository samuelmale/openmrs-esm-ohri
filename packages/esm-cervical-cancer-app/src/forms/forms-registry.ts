import cacx_registration_v_1_0 from './cacx-registration/1.0.json';
import cacx_treatment_v_1_0 from './cacx-treatment/1.0.json';
import triage_v_1_0 from './triage/1.0.json';
import fast_track_v_1_0 from './fast-track/1.0.json';
import defaulter_tracing_v_1_0 from './defaulter-tracing/1.0.json';
import art_preparation_v_1_0 from './art-preparation/1.0.json';
import hiv_discontinuation_v_1_0 from './hiv-discontinuation/1.0.json';
import hiv_green_card_v_1_0 from './hiv-green-card/1.0.json';
import hiv_enrollment_v_1_0 from './hiv-enrollment/1.0.json';

export default {
  cacx: {
    cacx_registration_form: {
      '1.0': cacx_registration_v_1_0,
    },
    cacx_treatment_form: {
      '1.0': cacx_treatment_v_1_0,
    },
  },
  kmrs: {
    triage: {
      '1.0': triage_v_1_0,
    },
    fast_track: {
      '1.0': fast_track_v_1_0,
    },
    defaulter_tracing: {
      '1.0': defaulter_tracing_v_1_0,
    },
    art_preparation: {
      '1.0': art_preparation_v_1_0,
    },
    hiv_discontinuation: {
      '1.0': hiv_discontinuation_v_1_0,
    },
    hiv_enrollment: {
      '1.0': hiv_discontinuation_v_1_0,
    },
    hiv_green_card: {
      '1.0': hiv_green_card_v_1_0,
    },
  },
};
