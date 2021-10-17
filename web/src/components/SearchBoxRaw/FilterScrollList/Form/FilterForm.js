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

// Constants
import { SEARCH_FILTER } from '../../../../constants/search';

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

  // Hooks
  React.useEffect(() => {
    if (_.isEmpty(watchAllFields) || _.isEqual(watchAllFields, filter)) {
      return;
    }
    dispatch(setSearchFilter(watchAllFields));
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
      <FormControl className={classes.select} error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Controller
          as={(props) => getSelection(props, SEARCH_FILTER.categories)}
          name="category"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.category && errors.category.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.cryptos}>
        <InputLabel>Cryptos</InputLabel>
        <Controller
          as={(props) => getSelection(props, SEARCH_FILTER.cryptos)}
          name="cryptos"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.cryptos && errors.cryptos.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.security}>
        <InputLabel>Security</InputLabel>
        <Controller
          as={(props) => getSelection(props, SEARCH_FILTER.security)}
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
          as={(props) => getSelection(props, SEARCH_FILTER.privacy)}
          name="privacy"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.privacy && errors.privacy.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.status}>
        <InputLabel>Status</InputLabel>
        <Controller
          as={(props) => getSelection(props, SEARCH_FILTER.status)}
          name="status"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.status && errors.status.message}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.mirroring}>
        <InputLabel>Mirroring</InputLabel>
        <Controller
          as={(props) => getSelection(props, SEARCH_FILTER.mirroring)}
          name="mirroring"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.mirroring && errors.privacy.mirroring}
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.select} error={!!errors.language}>
        <InputLabel>Language</InputLabel>
        <Controller
          as={(props) => getSelection(props, SEARCH_FILTER.language)}
          name="language"
          control={control}
          defaultValue="any"
        />
        <FormHelperText>
          {errors.language && errors.language.message}
        </FormHelperText>
      </FormControl>
    </form>
  );

  return view;
};

export default FilterForm;
