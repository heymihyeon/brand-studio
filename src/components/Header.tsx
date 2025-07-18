import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Home as HomeIcon,
  PhotoLibrary as LibraryIcon,
} from '@mui/icons-material';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't render sidebar on editor pages
  if (location.pathname.startsWith('/editor')) {
    return null;
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const menuItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: <HomeIcon />,
      exact: true
    },
    { 
      path: '/brand-hub', 
      label: 'Brand Hub', 
      icon: <LibraryIcon />,
      exact: false
    },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      {/* Logo/Brand Section */}
      <Box
        sx={{
          px: 3,
          py: 4,
          borderBottom: '1px solid #f3f4f6',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            color: '#111827',
            cursor: 'pointer',
            fontSize: '24px',
            lineHeight: '32px',
          }}
          onClick={() => navigate('/')}
        >
          Brand Studio
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const active = item.exact 
              ? location.pathname === item.path 
              : isActive(item.path);

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                    backgroundColor: active ? '#f3f4f6' : 'transparent',
                    color: active ? '#111827' : '#6b7280',
                    '&:hover': {
                      backgroundColor: active ? '#f3f4f6' : '#f9fafb',
                    },
                    '&:hover .MuiListItemIcon-root': {
                      color: '#111827',
                    },
                    '&:hover .MuiListItemText-primary': {
                      color: '#111827',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: active ? '#111827' : '#9ca3af',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 600 : 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          px: 3,
          py: 3,
          borderTop: '1px solid #f3f4f6',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#9ca3af',
            fontSize: '12px',
            display: 'block',
            textAlign: 'center',
          }}
        >
          Brand Studio v1.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;