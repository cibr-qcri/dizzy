// React
import React from 'react';

// Hook Form
import { useForm, Controller } from 'react-hook-form';

// Schema
import { filterFormSchema } from './FilterForm-schema';

// Material
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

// Redux
import { useDispatch } from 'react-redux';

// Styles
import { useStyles } from './FilterForm-styles';

const FilterForm = (props) => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const { formRef } = props;
  const { register, handleSubmit, errors, control } = useForm({
    validationSchema: filterFormSchema,
  });

  const mirroring = [
    { type: 'any', label: 'Any' },
    { type: 'mirrored', label: 'Mirrored' },
    { type: 'unique', label: 'Not mirrored' },
  ];

  const status = [
    { type: 'any', label: 'Any' },
    { type: 'online', label: 'Online' },
    { type: 'offline', label: 'Offline' },
  ];

  const cryptos = [
    { type: 'any', label: 'Any' },
    { type: 'btc', label: 'Bitcoin' },
    { type: 'none', label: 'None' },
  ];

  const security = [
    { type: 'any', label: 'Any' },
    { type: 'benign', label: 'Benign' },
    { type: 'malicious', label: 'Malicious' },
  ];

  const privacy = [
    { type: 'any', label: 'Any' },
    { type: 'tracking', label: 'Tracking' },
    { type: 'no-tracking', label: 'No tracking' },
  ];

  const categories = [
    { type: 'any', label: 'Any' },
    { type: 'crypto-service', label: 'Cryptocurrency service' },
    { type: 'index', label: 'Index, link list, or similar' },
    { type: 'marketplace', label: 'Marketplace' },
    { type: 'pornography', label: 'Pornography' },
    { type: 'forum', label: 'Forum' },
    { type: 'other', label: 'Other' },
  ];

  const languages = [
    { type: 'any', label: 'Any' },
    { type: 'ar', label: 'Arabic' },
    { type: 'en', label: 'English' },
    { type: 'fr', label: 'French' },
    { type: 'de', label: 'German' },
    { type: 'es', label: 'Spanish' },
    { type: 'ru', label: 'Russian' },
  ];

  // Handlers
  const filterHandler = () => {
    console.log('filterHandler');
  };

  //JSX
  const getSelection = (data) => {
    return (
      <Select>
        {data.map((item, index) => {
          return (
            <MenuItem key={index} value={item.type}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  const view = (
    <form
      className={classes.root}
      ref={formRef}
      onSubmit={handleSubmit(filterHandler)}
    >
      <FormControl className={classes.select} error={!!errors.language}>
        <InputLabel>Language</InputLabel>
        <Controller
          as={getSelection(languages)}
          name="language"
          control={control}
          defaultValue=""
        />
        <FormHelperText>
          {errors.language && errors.language.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Controller
          as={getSelection(categories)}
          name="category"
          control={control}
          defaultValue=""
        />
        <FormHelperText>
          {errors.category && errors.category.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.security}>
        <InputLabel>Security</InputLabel>
        <Controller
          as={getSelection(security)}
          name="security"
          control={control}
          defaultValue=""
        />
        <FormHelperText>
          {errors.security && errors.security.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.privacy}>
        <InputLabel>Privacy</InputLabel>
        <Controller
          as={getSelection(privacy)}
          name="Privacy"
          control={control}
          defaultValue=""
        />
        <FormHelperText>
          {errors.privacy && errors.privacy.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.mirroring}>
        <InputLabel>Mirroring</InputLabel>
        <Controller
          as={getSelection(mirroring)}
          name="Mirroring"
          control={control}
          defaultValue=""
        />
        <FormHelperText>
          {errors.mirroring && errors.privacy.mirroring}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.status}>
        <InputLabel>Status</InputLabel>
        <Controller
          as={getSelection(status)}
          name="Status"
          control={control}
          defaultValue=""
        />
        <FormHelperText>
          {errors.status && errors.status.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.cryptos}>
        <InputLabel>Cryptos</InputLabel>
        <Controller
          as={getSelection(cryptos)}
          name="Cryptos"
          control={control}
          defaultValue=""
        />
        <FormHelperText>
          {errors.cryptos && errors.cryptos.message}
        </FormHelperText>
      </FormControl>
    </form>
  );

  return view;
};

export default FilterForm;
