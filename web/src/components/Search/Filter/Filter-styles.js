// Utils
import { makeStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
