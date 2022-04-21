// Utils
import { makeStyles } from '../../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
    },
    content: {
      paddingTop: theme.spacing(1.5),
    },
    item: {
      paddingTop: theme.spacing(0.5),
    },
    divider: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
