// Utils
import { makeStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
    },
    list: {},
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
