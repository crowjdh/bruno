import React, { useEffect } from 'react';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { refreshScreenWidth, refreshScreenHeight } from 'providers/ReduxStore/slices/app';
import ConfirmAppClose from './ConfirmAppClose';
import useIpcEvents from './useIpcEvents';
import StyledWrapper from './StyledWrapper';

export const AppContext = React.createContext();

export const AppProvider = (props) => {
  useIpcEvents();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshScreenWidth());
    dispatch(refreshScreenHeight());
  }, []);

  useEffect(() => {
    const platform = get(navigator, 'platform', '');
    if(platform && platform.toLowerCase().indexOf('mac') > -1) {
      document.body.classList.add('os-mac');
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      dispatch(refreshScreenWidth());
      dispatch(refreshScreenHeight());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppContext.Provider {...props} value="appProvider">
      <StyledWrapper>
        <ConfirmAppClose />
        {props.children}
      </StyledWrapper>
    </AppContext.Provider>
  );
};

export default AppProvider;
