import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  PhotoLibrary as LibraryIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

interface SideBarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isExpanded, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // 메뉴 항목 정의
  const menuItems = [
    {
      path: '/',
      label: 'Home',
      icon: <HomeIcon sx={{ fontSize: '20px' }} />,
      exact: true,
    },
    {
      path: '/brand-hub',
      label: 'Brand Hub',
      icon: <LibraryIcon sx={{ fontSize: '20px' }} />,
      exact: false,
    },
  ];

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const sidebarWidth = isExpanded ? 216 : 56;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '48px', // NavBar 높이만큼 아래로
        left: 0,
        width: `${sidebarWidth}px`,
        height: 'calc(100vh - 48px)',
        backgroundColor: theme.colors.Gray[900],
        borderRight: `1px solid ${theme.colors.Gray[700]}`,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        zIndex: theme.zIndex.drawer,
        overflow: 'hidden',
      }}
    >
      {/* 토글 버튼 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: isExpanded ? 'flex-end' : 'center',
          p: 1,
          borderBottom: `1px solid ${theme.colors.Gray[700]}`,
        }}
      >
        <IconButton
          onClick={onToggle}
          sx={{
            color: theme.colors.Primary.PolarWhite,
            '&:hover': {
              backgroundColor: theme.colors.OpacityWhite[15],
            },
          }}
        >
          {isExpanded ? (
            <ChevronLeftIcon sx={{ fontSize: '20px' }} />
          ) : (
            <ChevronRightIcon sx={{ fontSize: '20px' }} />
          )}
        </IconButton>
      </Box>

      {/* 메뉴 리스트 */}
      <Box sx={{ flex: 1, py: 1 }}>
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => {
            const active = isActive(item.path, item.exact);
            
            const menuItem = (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    height: '48px',
                    borderRadius: 0,
                    px: isExpanded ? 2 : 1,
                    py: 1,
                    backgroundColor: active 
                      ? theme.colors.OpacityWhite[15] 
                      : 'transparent',
                    color: theme.colors.Primary.PolarWhite,
                    '&:hover': {
                      backgroundColor: theme.colors.OpacityWhite[15],
                    },
                    justifyContent: isExpanded ? 'flex-start' : 'center',
                    minHeight: '48px',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: isExpanded ? 40 : 'auto',
                      color: theme.colors.Primary.PolarWhite,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  
                  {isExpanded && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontFamily: 'KiaSignature',
                        fontWeight: active 
                          ? theme.kiaTypography.weights.bold 
                          : theme.kiaTypography.weights.regular,
                        fontSize: theme.kiaTypography.S2.fontSize,
                        lineHeight: theme.kiaTypography.S2.lineHeight,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );

            // 접힌 상태일 때 툴팁 추가
            if (!isExpanded) {
              return (
                <Tooltip
                  key={item.path}
                  title={item.label}
                  placement="right"
                  arrow
                >
                  {menuItem}
                </Tooltip>
              );
            }

            return menuItem;
          })}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;