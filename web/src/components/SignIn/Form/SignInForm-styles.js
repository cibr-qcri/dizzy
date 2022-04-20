// Components
import ButtonRaw, { buttonStyler } from '../../ButtonRaw';

// Utils
import { makeStyles, withStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      maxWidth: 460,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
    },
    text: {
      margin: theme.spacing(1),
    },
  },
  ButtonRaw: {
    ...buttonStyler(theme).Default,
    root: {
      margin: theme.spacing(1),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOC
export const Button = withStyles(stylesCreator, ButtonRaw);
