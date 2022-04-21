// Utils
import { makeStyles } from '../../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    list: {
      margin: 0,
      paddingLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
