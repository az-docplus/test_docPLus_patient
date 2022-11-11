const initialState = {
  isAddingQuestion: false,
  questionDetails: [],
  questionnaireAdded: false,
  error: '',
  gettingQuestionnaire: false,
  questions: [],
  errorGettingQuestionnaire: false,
  categories: [],
};

const QuestionnaireReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD CATEGORY':
      const cats = state.categories;
      cats.push(action.payload);
      return {
        ...state,
        categories: cats,
      };
    case 'SAVE CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    case 'ADDING_QUESTIONNAIRE':
      return {
        ...state,
        isAddingQuestion: true,
        questionnaireAdded: false,
      };
    case 'QUESTIONNAIRE_ADDED':
      return {
        ...state,
        isAddingQuestion: false,
        questionDetails: action.payload,
        questionnaireAdded: true,
      };
    case 'ERROR_ADDING_QUESTIONNAIRE':
      return {
        ...state,
        isAddingQuestion: false,
        error: action.payload,
      };
    case 'GETTING_QUESTIONNAIRE':
      return {
        ...state,
        gettingQuestionnaire: true,
      };
    case 'GOT_QUESTIONNAIRE':
      return {
        ...state,
        gettingQuestionnaire: false,
        questions: action.payload,
      };
    case 'ERROR_GETTING_QUESTIONNAIRE':
      return {
        ...state,
        gettingQuestionnaire: false,
        errorGettingQuestionnaire: action.payload,
      };
    case 'RESET_QUESTINNAIRE_REDUCER':
      return {
        ...state,
        isAddingQuestion: false,
        questionDetails: [],
        questionnaireAdded: false,
        error: '',
        gettingQuestionnaire: false,
        questions: [],
        errorGettingQuestionnaire: false,
      };
    default:
      return state;
  }
};

export default QuestionnaireReducer;
