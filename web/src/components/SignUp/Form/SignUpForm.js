// React
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Hook Form
import { useForm } from 'react-hook-form';

// Schema
import { signUpFormSchema } from './SignUpForm-schema';

// Material
import { Paper, TextField } from '@material-ui/core';

// Store
import { createAccount } from '../../../store/actions';

// Styles
import { useStyles, Button } from './SignUpForm-styles';

const SignUpForm = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    validationSchema: signUpFormSchema,
  });
  const isBusy = useSelector((state) => state.user.isBusy);

  // Handlers
  const signUpHandler = (data) => {
    dispatch(createAccount(data));
  };

  // JSX
  const view = (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        component="form"
        autoComplete="off"
        variant="outlined"
        onSubmit={handleSubmit(signUpHandler)}
        noValidate
      >
        <TextField
          className={classes.text}
          inputRef={register}
          error={!!errors.firstName}
          helperText={errors.firstName && errors.firstName.message}
          label="First Name"
          name="firstName"
        />
        <TextField
          className={classes.text}
          inputRef={register}
          error={!!errors.lastName}
          helperText={errors.lastName && errors.lastName.message}
          label="Last Name"
          name="lastName"
        />
        <TextField
          className={classes.text}
          inputRef={register}
          error={!!errors.organization}
          helperText={errors.organization && errors.organization.message}
          label="Organization"
          name="organization"
        />
        <TextField
          className={classes.text}
          inputRef={register}
          error={!!errors.email}
          helperText={errors.email && errors.email.message}
          label="Email"
          name="email"
          type="email"
        />
        <TextField
          className={classes.text}
          inputRef={register}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          label="Password"
          name="password"
          type="password"
        />
        <Button title={'Sign up'} loading={isBusy} />
      </Paper>
    </div>
  );

  return view;
};

export default SignUpForm;
