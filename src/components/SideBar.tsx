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
      label: 'Brand Asset',
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
        top: '56px', // NavBar 높이(48px) + 상단 마진(8px)
        left: 0,
        width: `${sidebarWidth}px`,
        height: 'calc(100vh - 56px)',
        backgroundColor: theme.colors.Primary.MidnightBlack,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        zIndex: theme.zIndex.drawer,
        overflow: 'hidden',
      }}
    >

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
                    py: 1.5,
                    my: 0.5,
                    backgroundColor: 'transparent', // 활성 상태에서도 불투명 배경 없음
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
                      color: active 
                        ? theme.colors.Primary.PolarWhite 
                        : theme.colors.Gray[600],
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
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: active ? 600 : 400,
                        color: active 
                          ? theme.colors.Primary.PolarWhite 
                          : theme.colors.Gray[600],
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

      {/* 하단 토글 버튼 - 빨간색 동그라미 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: isExpanded ? 16 : 16, // 메뉴 아이콘과 동일한 위치
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={onToggle}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#FF4444',
            color: 'white',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: '#FF3333',
            },
            '& .MuiTouchRipple-root': {
              borderRadius: '50%',
            },
          }}
        >
          {isExpanded ? (
            <ChevronLeftIcon sx={{ fontSize: '20px', fontWeight: 'bold' }} />
          ) : (
            <ChevronRightIcon sx={{ fontSize: '20px', fontWeight: 'bold' }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default SideBar;