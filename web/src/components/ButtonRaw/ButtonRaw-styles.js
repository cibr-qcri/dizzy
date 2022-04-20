export const stylesCreator = (theme) => ({
  Default: {
    root: {},
    buttonPrimary: {
      width: '100%',
      boxShadow: '0px 0px 0px',
      '&:disabled': {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.info.contrastText,
      },
      '&:hover': {
        boxShadow: '0px 0px 0px',
      },
    },
    buttonSecondary: {
      width: '100%',
      boxShadow: '0px 0px 0px',
      '&:disabled': {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.info.contrastText,
      },
      '&:hover': {
        boxShadow: '0px 0px 0px',
      },
    },
  },
});
