export const stylesCreator = (theme) => ({
  Default: {
    root: {
      margin: theme.spacing(2),
    },
    link: {
      display: 'flex',
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
});
