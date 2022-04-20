// React
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Hook Form
import { useForm, Controller } from 'react-hook-form';

// Schema
import { accountFormSchema } from './AccountForm-schema';

// Material
import { Paper, TextField } from '@material-ui/core';

// Store
import { updateAccount } from '../../../store/actions';

// Styles
import { useStyles, Button } from './AccountForm-styles';

const AccountForm = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { firstName, lastName, organization } = props;
  const { handleSubmit, errors, control } = useForm({
    validationSchema: accountFormSchema,
  });
  const isBusy = useSelector((state) => state.user.isBusy);

  // Handlers
  const updateAccountHandler = (data) => {
    dispatch(updateAccount(data));
  };

  // JSX
  const view = (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        component="form"
        autoComplete="off"
        variant="outlined"
        onSubmit={handleSubmit(updateAccountHandler)}
        noValidate
      >
        <Controller
          className={classes.text}
          as={<TextField />}
          control={control}
          defaultValue={firstName}
          error={!!errors.firstName}
          helperText={errors.firstName && errors.firstName.message}
          label="First Name"
          name="firstName"
        />
        <Controller
          className={classes.text}
          as={<TextField />}
          control={control}
          defaultValue={lastName}
          error={!!errors.lastName}
          helperText={errors.lastName && errors.lastName.message}
          label="Last Name"
          name="lastName"
        />
        <Controller
          className={classes.text}
          as={<TextField />}
          control={control}
          defaultValue={organization}
          error={!!errors.organization}
          helperText={errors.organization && errors.organization.message}
          label="Organization"
          name="organization"
        />
        <Button title="Update" loading={isBusy} type="submit" />
      </Paper>
    </div>
  );

  return view;
};

export default AccountForm;
