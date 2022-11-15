const Typography = (theme, borderRadius, fontFamily) => ({
  fontFamily,
  h6: {
    fontWeight: 500,
    color: theme.palette.grey[600],
    fontSize: '1.25rem',
    letterSpacing: '0.15px'
  },
  h5: {
    fontSize: '1.5rem',
    color: theme.palette.grey[600],
    fontWeight: 400
  },
  h4: {
    fontSize: '2.25rem',
    color: theme.palette.grey[600],
    fontWeight: 400,
    letterSpacing:'0.25px'
  },
  h3: {
    fontSize: '3rem',
    color: theme.palette.grey[600],
    fontWeight: 400
  },
  h2: {
    fontSize: '3.75rem',
    color: theme.palette.grey[600],
    fontWeight: 300,
    letterSpacing:'-0.5px'
  },
  h1: {
    fontSize: '6rem',
    color: theme.palette.grey[600],
    fontWeight: 300,
    letterSpacing:'-1.5px'
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.text.dark,
    letterSpacing:'0.15px'
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    letterSpacing:'0.1px'
  },
  caption: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    fontWeight: 400,
    letterSpacing:'0.4px',
    textTransform:'capitalize'
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing:'1px',
    textTransform:'uppercase'
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: '0.15px',
  },
  body2: {
    fontSize: '0.875rem',
    letterSpacing: '0.15px',
    fontWeight: 400,
    color: theme.palette.text.primary
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.4px',
    lineHeight:'24px',
    textTransform: 'capitalize'
  },
  customInput: {
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: '0.15px',
    marginTop: 1,
    marginBottom: 1,
    '& > label': {
      top: 20,
      left: 0,
      color: theme.palette.grey[600],
      '&[data-shrink="false"]': {
        top: 5
      }
    },
    '& > div > input': {
      padding: '30.5px 14px 11.5px !important'
    },
    '& legend': {
      display: 'none'
    },
    '& fieldset': {
      top: 0
    }
  },
  mainContent: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
    width: '100%',
    minHeight: 'calc(100vh - 88px)',
    flexGrow: 1,
    padding: '20px',
    marginTop: '88px',
    marginRight: '20px',
    borderRadius: `${borderRadius}px`
  },
  menuCaption: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.grey[600],
    padding: '6px',
    textTransform: 'capitalize',
    marginTop: '10px'
  },
  subMenuCaption: {
    fontSize: '0.625rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    textTransform: 'capitalize'
  },
  commonAvatar: {
    cursor: 'pointer',
    borderRadius: '8px'
  },
  smallAvatar: {
    width: '22px',
    height: '22px',
    fontSize: '1rem'
  },
  mediumAvatar: {
    width: '34px',
    height: '34px',
    fontSize: '1.2rem'
  },
  largeAvatar: {
    width: '44px',
    height: '44px',
    fontSize: '1.5rem'
  },
  tooltip: {
    fontSize: '0.625rem',
    fontWeight: 500,
  }
});

export default Typography;
