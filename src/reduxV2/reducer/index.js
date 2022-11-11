import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import DoctorReducer from './DoctorReducer';
import DoctorToPatientReducer from './DoctorToPatientReducer';
import PatientReducer from './PatientReducer';
import QuestionnaireReducer from './QuestionnaireReducer';

// doctorReducer ================== Now ==================== DoctorToPatientReducer
// MyDoctorReducer ================ Now ==================== DoctorReducer
const allReducer = combineReducers({
  AuthReducer,
  DoctorReducer,
  DoctorToPatientReducer,
  PatientReducer,
  QuestionnaireReducer,
});

export default allReducer;
