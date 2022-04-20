// Components
import LogoRaw, { logoStyler } from '../LogoRaw';

// Utils
import { makeStyles, withStyles } from '../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: theme.spacing(7),
    },
    toolbar: {
      position: 'absolute',
      left: 0,
    },
    link: {
      textDecoration: 'none',
    },
  },
  LogoRaw: logoStyler(theme).Default,
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const Logo = withStyles(stylesCreator, LogoRaw);
