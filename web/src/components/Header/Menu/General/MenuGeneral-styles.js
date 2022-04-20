// Utils
import { makeStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    header: {
      textTransform: 'uppercase',
    },
    list: {
      width: 240,
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
