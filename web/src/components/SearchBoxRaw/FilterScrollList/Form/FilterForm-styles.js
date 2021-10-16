// Utils
import { makeStyles } from '../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'auto',
      whiteSpace: 'nowrap',
      '-ms-overflow-style': 'none',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    select: {
      minWidth: 120,
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);
