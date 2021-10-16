// Utils
import { makeStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      paddingTop: theme.spacing(2),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
