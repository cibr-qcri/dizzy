// Components
import TorIconRaw from '../../../../TorIconRaw';

// Utils
import { makeStyles, withStyles } from '../../../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      paddingTop: theme.spacing(2.5),
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      marginBottom: theme.spacing(2),
      maxWidth: 286,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  TorIconRaw: {
    root: {
      verticalAlign: 'middle',
      display: 'inline',
      marginRight: theme.spacing(1),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const TorIcon = withStyles(stylesCreator, TorIconRaw);
