// React
import React from 'react';

// Lodash
import _ from 'lodash';

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
} from '@material-ui/core';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Store
import { setSearchFilter } from '../../../../store/actions';

// Styles
import { useStyles } from './FilterForm-styles';

const FilterForm = () => {
  // Variables
  const classes = useStyles();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.search.data.filter);
  const { control, errors, watch } = useForm({
    validationSchema: filterFormSchema,
  });
  const watchAllFields = watch();

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

  // Hooks
  React.useEffect(() => {
    if (!_.isEmpty(watchAllFields) && !_.isEqual(watchAllFields, filter)) {
      dispatch(setSearchFilter(watchAllFields));
    }
  }, [dispatch, filter, watchAllFields]);

  //JSX
  const getSelection = (props, data) => {
    return (
      <Select
        value={props.value || ''}
        onChange={(event) => props.onChange(event.target.value)}
      >
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
    <form className={classes.root}>
      <FormControl className={classes.select} error={!!errors.language}>
        <InputLabel>Language</InputLabel>
        <Controller
          as={(props) => getSelection(props, languages)}
          name="language"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.language && errors.language.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Controller
          as={(props) => getSelection(props, categories)}
          name="category"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.category && errors.category.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.security}>
        <InputLabel>Security</InputLabel>
        <Controller
          as={(props) => getSelection(props, security)}
          name="security"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.security && errors.security.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.privacy}>
        <InputLabel>Privacy</InputLabel>
        <Controller
          as={(props) => getSelection(props, privacy)}
          name="privacy"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.privacy && errors.privacy.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.mirroring}>
        <InputLabel>Mirroring</InputLabel>
        <Controller
          as={(props) => getSelection(props, mirroring)}
          name="mirroring"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.mirroring && errors.privacy.mirroring}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.status}>
        <InputLabel>Status</InputLabel>
        <Controller
          as={(props) => getSelection(props, status)}
          name="status"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.status && errors.status.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.cryptos}>
        <InputLabel>Cryptos</InputLabel>
        <Controller
          as={(props) => getSelection(props, cryptos)}
          name="cryptos"
          control={control}
          defaultValue="any"
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
