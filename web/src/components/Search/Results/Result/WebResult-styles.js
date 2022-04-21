// Utils
import { makeStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
