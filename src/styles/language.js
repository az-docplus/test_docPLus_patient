import {useDispatch, useSelector} from 'react-redux';
import {languageChanged} from '../reduxV2/action/AuthAction';
const useLanguage = function () {
  const dispatch = useDispatch();
  const setLanguage = (language) => {
    // dispatch(changingTheme());
    dispatch(languageChanged(language));
  };
  return setLanguage;
};

export default useLanguage;
