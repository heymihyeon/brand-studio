import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';

const NavBar: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '8px',
        left: 0,
        right: 0,
        height: '48px',
        backgroundColor: theme.colors.Primary.MidnightBlack,
        color: theme.colors.Primary.PolarWhite,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '20px',
        pt: '14px',
        pb: '6px', // 14px - 8px
        zIndex: theme.zIndex.appBar,
      }}
    >
      {/* 좌측: KIA 로고 + 브랜드명 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* KIA 로고 */}
        <Box
          sx={{
            width: '70px',
            height: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Box
            component="img"
            src="/images/KiaLogoSmall.png"
            alt="KIA Logo"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
        
        {/* Divider */}
        <Box
          sx={{
            width: '1px',
            height: '16px',
            backgroundColor: theme.colors.OpacityWhite[30],
          }}
        />
        
        {/* 브랜드명 */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'KiaSignature',
            fontWeight: theme.kiaTypography.weights.bold,
            fontSize: theme.kiaTypography.B1.fontSize,
            lineHeight: theme.kiaTypography.B1.lineHeight,
            color: theme.colors.Primary.PolarWhite,
          }}
        >
          CONTENTS CREATOR
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
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;