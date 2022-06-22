// React
import React, { useEffect } from 'react';

// Router
import { useParams, Redirect } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Store
import { activateAccount } from '../../store/actions';

export const Activate = () => {
  //Variables
  const { token } = useParams();
  const dispatch = useDispatch();
  const activated = useSelector((state) => state.user.activated);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(activateAccount(token));
  }, [dispatch, token]);

  //JSX
  let view = null;

  if (activated) {
    view = <Redirect to="/signin" />;
  }

  if (error) {
    view = <Redirect to="/" />;
  }

  return view;
};

export default Activate;
