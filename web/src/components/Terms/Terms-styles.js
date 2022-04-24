// Utils
import { makeStyles } from '../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    section: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2.5),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
