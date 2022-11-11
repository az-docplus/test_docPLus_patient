import axios from 'axios';
import { Host } from '../../utils/connection';

/**
 *  ====================== Reset Question =============================
 */

const RESET_QUESTINNAIRE_REDUCER = 'RESET_QUESTINNAIRE_REDUCER';

export const resetQuestinnaireReducer = () => ({
  type: RESET_QUESTINNAIRE_REDUCER,
});

/**
 *  ====================== Reset Question END=============================
 */

/**
 *  ====================== Adding Question =============================
 */
const ADDING_QUESTIONNAIRE = 'ADDING_QUESTIONNAIRE';
const QUESTIONNAIRE_ADDED = 'QUESTIONNAIRE_ADDED';
const ERROR_ADDING_QUESTIONNAIRE = 'ERROR_ADDING_QUESTIONNAIRE';

const startLoading = () => {
  return {
    type: ADDING_QUESTIONNAIRE,
  };
};
const questionnaireAdded = (data) => {
  return {
    type: QUESTIONNAIRE_ADDED,
    payload: data,
  };
};
const errorAddingQuestionnaire = (err) => {
  return {
    type: ERROR_ADDING_QUESTIONNAIRE,
    payload: err,
  };
};
export const AddQuestion = (question) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startLoading());
    const _data = question;
    axios
      .post(`${Host}/questionnaire/add`, _data, config)
      .then((res) => {
        console.log('#######mmmmmmmmmmmmmm###########mmmmmmmmm#######');
        console.log(_data);
        dispatch(questionnaireAdded(res.data));
        dispatch(GetQuestion(question.id));
      })
      .catch((e) => {
        console.log('!!!!!!!!!@@@@@@@@@@########$$$$$$$$$$');
        dispatch(errorAddingQuestionnaire(e));
        console.log(e);
      });
  };
};

/**
 *  ====================== Adding Question END =============================
 */

/**
 *  ====================== Getting Question =============================
 */
const GETTING_QUESTIONNAIRE = 'GETTING_QUESTIONNAIRE';
const GOT_QUESTIONNAIRE = 'GOT_QUESTIONNAIRE';
const ERROR_GETTING_QUESTIONNAIRE = 'ERROR_GETTING_QUESTIONNAIRE';

const starGettingQuestionnaire = () => {
  return {
    type: GETTING_QUESTIONNAIRE,
  };
};

const gotQuestionnaire = (questions) => {
  return {
    type: GOT_QUESTIONNAIRE,
    payload: questions,
  };
};

const errorGettingQuestionnaire = (err) => {
  return {
    type: ERROR_GETTING_QUESTIONNAIRE,
    payload: err,
  };
};

export const GetQuestion = (id) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(starGettingQuestionnaire());
    console.log('===========yyyyyyyyyyyyyy', id);
    const _data = { id };
    axios
      .post(`${Host}/questionnaire/get`, _data, config)
      .then((res) => {
        if (res.status) {
          const questions = res.data.question.filter((item) => item);

          console.log('============xxxxxxxxxxxxx', res.data.question);
          dispatch(gotQuestionnaire(questions));
        } else {
          console.log(res);
          dispatch(errorGettingQuestionnaire(res.data));
        }
      })
      .catch((err) => {
        console.log('============eeeeeeeeeeeeee', err);
        dispatch(errorGettingQuestionnaire(err));
      });
  };
};

/**
 *  ====================== Getting Question END =============================
 */

/**
 *  ====================== UPDATE Question =============================
 */
export const UpdateQuestion = (question) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startLoading());
    const _data = question;
    axios
      .post(`${Host}/questionnaire/update`, _data, config)
      .then((res) => {
        console.log('#######mmmmmmmmmmmmmm###########mmmmmmmmm#######');
        console.log(res.data);
        dispatch(questionnaireAdded(res.data));
      })
      .catch((e) => {
        console.log('!!!!!!!!!@@@@@@@@@@########$$$$$$$$$$');
        dispatch(errorAddingQuestionnaire(e));
        console.log(e);
      });
  };
};
/**
 *  ====================== UPDATE Question END =============================
 */

/**
 *  ====================== DELETE Question =============================
 */

const DELETING_QUESTION = 'DELETING_QUESTION';
const QUESTION_DELETED = 'QUESTION_DELETED';
const ERROR_DELETING_QUESTION = 'ERROR_DELETING_QUESTION';

const startDeleting = () => {
  return {
    type: DELETING_QUESTION,
  };
};

const questionDeleted = () => {
  return {
    type: QUESTION_DELETED,
  };
};
const errorDeletingQuestion = (err) => {
  return {
    type: ERROR_DELETING_QUESTION,
    payload: err,
  };
};

export const DeleteRootQuestion = (question) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    dispatch(startDeleting());
    const _data = question;
    axios
      .post(`${Host}/questionnaire/delete/root`, _data, config)
      .then((res) => {
        console.log('!!!!!!!!!@@@@@@@@@@#######', res.data);
        dispatch(questionDeleted());
      })
      .catch((e) => {
        console.log('!!!!!!!!!@@@@@@@@@@########$$$$$$$$$$', e);
        dispatch(errorDeletingQuestion(e));
        console.log(e);
      });
  };
};

/**
 *  ====================== DELETE Question END=============================
 */

//Category Actions

const SAVE_CATEGORIES = 'SAVE CATEGORIES';
const ADD_CATEGORY = 'ADD CATEGORY';

const SaveCategories = (data) => {
  return {
    type: SAVE_CATEGORIES,
    payload: data,
  };
};
const AddCategory = (data) => {
  return {
    type: ADD_CATEGORY,
    payload: data,
  };
};
export const AddCategories = (body) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    axios
      .post(`${Host}/questionnaire/category/add`, body, config)
      .then((res) => {
        console.log(res.data, '????????????????????????????????');
        dispatch(AddCategory(res.data.category));
      })
      .catch((e) => {
        console.log('!!!!!!!!!@@@@@@@@@@########$$$$$$$$$$');
        console.log(e.response, 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
      });
  };
};
export const GetCategories = (id) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    axios
      .get(`${Host}/questionnaire/category/getdocbyid/${id}`)
      .then((res) => {
        dispatch(SaveCategories(res.data.category));
        console.log('!!!!!!!!!@@@@@@@@@@########$$$$$$$$$$', res.data.category);
      })
      .catch((e) => {
        console.log('!!!!!!!!!@@@@@@@@@@########$$$$$$$$$$');
        console.log(e);
      });
  };
};

export const UpdateCategory = (body, success) => {
  return (dispatch) => {
    const config = {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    axios
      .post(`${Host}/questionnaire/category/edit`, body, config)
      .then((res) => {
        success();
        console.log('======================updateCategory', res.data);
      })
      .catch((e) => {
        console.log('error while updating the category =>', e);
      });
  };
};
