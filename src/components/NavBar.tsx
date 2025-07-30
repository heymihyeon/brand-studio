import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

const NavBar: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '48px',
        backgroundColor: theme.colors.Primary.MidnightBlack,
        color: theme.colors.Primary.PolarWhite,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        zIndex: theme.zIndex.appBar,
        borderBottom: `1px solid ${theme.colors.Gray[800]}`,
      }}
    >
      {/* 좌측: KIA 로고 + 브랜드명 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* KIA 로고 */}
        <Box
          component="img"
          src="/images/logos/logo_white.png"
          alt="KIA Logo"
          sx={{
            height: '24px',
            width: 'auto',
          }}
        />
        
        {/* 브랜드명 */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'KiaSignature',
            fontWeight: theme.kiaTypography.weights.regular,
            fontSize: theme.kiaTypography.S2.fontSize,
            lineHeight: theme.kiaTypography.S2.lineHeight,
            color: theme.colors.Primary.PolarWhite,
          }}
        >
          BRAND STUDIO
        </Typography>
      </Box>

      {/* 우측: 사용자 정보 + 로그아웃 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'KiaSignature',
            fontWeight: theme.kiaTypography.weights.regular,
            fontSize: theme.kiaTypography.B1.fontSize,
            color: theme.colors.Gray[300],
          }}
        >
          DEALER001
        </Typography>
        
        <Button
          variant="text"
          size="small"
          startIcon={<LogoutIcon sx={{ fontSize: '16px' }} />}
          sx={{
            color: theme.colors.Primary.PolarWhite,
            fontFamily: 'KiaSignature',
            fontWeight: theme.kiaTypography.weights.regular,
            fontSize: theme.kiaTypography.B2.fontSize,
            textTransform: 'none',
            minWidth: 'auto',
            padding: '4px 8px',
            '&:hover': {
              backgroundColor: theme.colors.OpacityWhite[15],
            },
          }}
        >
          로그아웃
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;