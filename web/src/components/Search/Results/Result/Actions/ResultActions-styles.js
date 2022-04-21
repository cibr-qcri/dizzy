// Utils
import { makeStyles } from '../../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
