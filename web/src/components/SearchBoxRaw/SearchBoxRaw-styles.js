export const stylesCreator = (theme) => ({
  Default: {
    root: {
      width: '100%',
      maxWidth: 460,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    paper: {
      display: 'flex',
      padding: theme.spacing(0.5),
    },
    input: {
      flex: 1,
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
    divider: {
      height: 40,
      margin: theme.spacing(0.5),
    },
  },
});
