// Components
import PromptDialogRaw, { promptDialogStyler } from '../../PromptDialogRaw';
import ButtonRaw, { buttonStyler } from '../../ButtonRaw';

// Utils
import { makeStyles, withStyles } from '../../../utils';

export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      maxWidth: 460,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    button: {
      width: '100%',
      marginTop: theme.spacing(1),
      '&:nth-of-type(1)': {
        marginTop: theme.spacing(2),
      },
    },
  },
  PromptDialogRaw: promptDialogStyler(theme).Default,
  ButtonRaw: {
    ...buttonStyler(theme).Default,
    root: {
      margin: theme.spacing(1),
    },
  },
});

// Local
export const useStyles = makeStyles(stylesCreator);

// HOCs
export const PromptDialog = withStyles(stylesCreator, PromptDialogRaw);
export const Button = withStyles(stylesCreator, ButtonRaw);
