import { createTheme } from '@mui/material/styles';

// idcx-admin 색상 팔레트
const colors = {
  // Primary 색상
  Primary: {
    PolarWhite: '#FFF',
    MidnightBlack: '#05141F',
  },
  // Secondary 색상
  Secondary: {
    AfternoonYellow: '#F3C300',
    ForestGreen: '#5D7D2B',
    LiveRed: '#EA0029',
    RedHover: '#FF4A6A',
  },
  // Gray 스케일 (10단계)
  Gray: {
    50: '#F8F9FA',
    100: '#E6E7E9',
    200: '#CBCED2',
    300: '#B1B5BB',
    400: '#969CA4',
    500: '#7C838D',
    600: '#636A76',
    700: '#49515F',
    800: '#2F3848',
    900: '#1E2C35',
  },
  // 투명도 색상 - Black
  OpacityBlack: {
    3: '#0000000D',
    5: '#0000000F',
    15: '#00000026',
    20: '#00000033',
    30: '#0000004D',
    40: '#00000066',
    60: '#00000099',
    80: '#000000CC',
  },
  // 투명도 색상 - White
  OpacityWhite: {
    3: '#FFFFFF0D',
    5: '#FFFFFF0F',
    15: '#FFFFFF26',
    20: '#FFFFFF33',
    30: '#FFFFFF4D',
    40: '#FFFFFF66',
    60: '#FFFFFF99',
  },
  // KIA Visual Studio 다크 테마 색상
  VisualStudio: {
    MainBackground: '#2a3f4f',
    SidebarBackground: '#1e2a33',
    SelectedBorder: '#ff4444',
    TextPrimary: '#ffffff',
    TextSecondary: '#b8c5d1',
    PanelBackground: '#243540',
    HoverBackground: '#334a5a',
  },
};

// KiaSignature 폰트 시스템
const typography = {
  // 폰트 웨이트
  weights: {
    regular: 400,
    bold: 600,
  },
  // 타이포그래피 스케일
  H1: {
    fontSize: '32px',
    lineHeight: '40px',
  },
  H2: {
    fontSize: '24px',
    lineHeight: '32px',
  },
  H3: {
    fontSize: '20px',
    lineHeight: '28px',
  },
  S1: {
    fontSize: '18px',
    lineHeight: '24px',
  },
  S2: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  B1: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  B2: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  B3: {
    fontSize: '10px',
    lineHeight: '12px',
  },
};

declare module '@mui/material/styles' {
  interface Theme {
    colors: typeof colors;
    kiaTypography: typeof typography;
  }
  interface ThemeOptions {
    colors?: typeof colors;
    kiaTypography?: typeof typography;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: colors.Primary.MidnightBlack,
      light: colors.Gray[500],
      dark: colors.Primary.MidnightBlack,
      contrastText: colors.Primary.PolarWhite,
    },
    secondary: {
      main: colors.Secondary.AfternoonYellow,
      light: colors.Secondary.ForestGreen,
      dark: colors.Secondary.LiveRed,
      contrastText: colors.Primary.MidnightBlack,
    },
    background: {
      default: colors.Primary.PolarWhite,
      paper: colors.Primary.PolarWhite,
    },
    text: {
      primary: colors.Primary.MidnightBlack,
      secondary: colors.Gray[600],
    },
    error: {
      main: colors.Secondary.LiveRed,
      light: colors.Secondary.RedHover,
      dark: colors.Secondary.LiveRed,
      contrastText: colors.Primary.PolarWhite,
    },
    success: {
      main: colors.Secondary.ForestGreen,
      light: colors.Secondary.ForestGreen,
      dark: colors.Secondary.ForestGreen,
      contrastText: colors.Primary.PolarWhite,
    },
    warning: {
      main: colors.Secondary.AfternoonYellow,
      light: colors.Secondary.AfternoonYellow,
      dark: colors.Secondary.AfternoonYellow,
      contrastText: colors.Primary.MidnightBlack,
    },
    grey: colors.Gray,
  },
  typography: {
    fontFamily: [
      'KiaSignature',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: typography.H1.fontSize,
      lineHeight: typography.H1.lineHeight,
      fontWeight: typography.weights.bold,
    },
    h2: {
      fontSize: typography.H2.fontSize,
      lineHeight: typography.H2.lineHeight,
      fontWeight: typography.weights.bold,
    },
    h3: {
      fontSize: typography.H3.fontSize,
      lineHeight: typography.H3.lineHeight,
      fontWeight: typography.weights.bold,
    },
    h4: {
      fontSize: typography.S1.fontSize,
      lineHeight: typography.S1.lineHeight,
      fontWeight: typography.weights.bold,
    },
    h5: {
      fontSize: typography.S2.fontSize,
      lineHeight: typography.S2.lineHeight,
      fontWeight: typography.weights.bold,
    },
    h6: {
      fontSize: typography.B1.fontSize,
      lineHeight: typography.B1.lineHeight,
      fontWeight: typography.weights.bold,
    },
    body1: {
      fontSize: typography.B1.fontSize,
      lineHeight: typography.B1.lineHeight,
      fontWeight: typography.weights.regular,
    },
    body2: {
      fontSize: typography.B2.fontSize,
      lineHeight: typography.B2.lineHeight,
      fontWeight: typography.weights.regular,
    },
    subtitle1: {
      fontSize: typography.S1.fontSize,
      lineHeight: typography.S1.lineHeight,
      fontWeight: typography.weights.regular,
    },
    subtitle2: {
      fontSize: typography.S2.fontSize,
      lineHeight: typography.S2.lineHeight,
      fontWeight: typography.weights.regular,
    },
    caption: {
      fontSize: typography.B3.fontSize,
      lineHeight: typography.B3.lineHeight,
      fontWeight: typography.weights.regular,
    },
  },
  shape: {
    borderRadius: 0, // idcx-admin 특징: 모든 컴포넌트 borderRadius 0 (모달 제외)
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: typography.weights.regular,
          borderRadius: 0,
          fontFamily: 'KiaSignature',
          '&:hover': {
            backgroundColor: colors.OpacityBlack[15],
          },
        },
        contained: {
          backgroundColor: colors.Primary.MidnightBlack,
          color: colors.Primary.PolarWhite,
          '&:hover': {
            backgroundColor: colors.Gray[800],
          },
          '&:disabled': {
            backgroundColor: colors.Gray[300],
            color: colors.Gray[500],
          },
        },
        outlined: {
          borderColor: colors.Gray[400],
          color: colors.Primary.MidnightBlack,
          '&:hover': {
            borderColor: colors.Primary.MidnightBlack,
            backgroundColor: colors.OpacityBlack[5],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: `1px solid ${colors.Gray[200]}`,
          '&:hover': {
            boxShadow: `0 2px 10px ${colors.OpacityBlack[15]}`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            fontFamily: 'KiaSignature',
            '& fieldset': {
              borderColor: colors.Gray[300],
            },
            '&:hover fieldset': {
              borderColor: colors.Gray[400],
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.Primary.MidnightBlack,
              borderWidth: '1px',
            },
            '&.Mui-error fieldset': {
              borderColor: colors.Secondary.LiveRed,
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'KiaSignature',
            color: colors.Gray[600],
            '&.Mui-focused': {
              color: colors.Primary.MidnightBlack,
            },
            '&.Mui-error': {
              color: colors.Secondary.LiveRed,
            },
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.Gray[400],
          '&.Mui-checked': {
            color: colors.Primary.MidnightBlack,
          },
          '&:hover': {
            backgroundColor: colors.OpacityBlack[5],
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.Primary.MidnightBlack,
          color: colors.Primary.PolarWhite,
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.Gray[800]}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.Gray[900],
          color: colors.Primary.PolarWhite,
          borderRight: `1px solid ${colors.Gray[700]}`,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            borderRadius: '10px', // 모달만 예외적으로 borderRadius 적용
            boxShadow: `0px 2px 10px ${colors.OpacityBlack[15]}`,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '10px',
          boxShadow: `0px 2px 10px ${colors.OpacityBlack[15]}`,
        },
      },
    },
  },
  colors,
  kiaTypography: typography,
});

export default theme;