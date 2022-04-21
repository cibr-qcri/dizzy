// Utils
import { makeStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      padding: theme.spacing(2),
      paddingBottom: 0,
    },
    card: {
      padding: theme.spacing(2),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
