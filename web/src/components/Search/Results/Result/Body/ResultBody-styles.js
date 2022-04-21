// Utils
import { makeStyles } from '../../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
    },
    typography: {
      maxHeight: 118,
      overflow: 'hidden',
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
