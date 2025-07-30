import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Category, RecentWork } from '../types';
import { getUniqueFormatsByCategory, UnifiedFormat } from '../data/unifiedFormats';
import { CarIcon } from '../components/icons/CarIcon';

// Format 포맷들을 직접 가져오기
const formatFormats = getUniqueFormatsByCategory('Format');

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWork, setSelectedWork] = useState<RecentWork | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 최근 작업 불러오기
    const savedWorks = localStorage.getItem('recentWorks');
    if (savedWorks) {
      const works = JSON.parse(savedWorks);
      setRecentWorks(works.sort((a: RecentWork, b: RecentWork) => 
        new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
      ).slice(0, 6)); // Show only recent 6
    } else {
      // Add sample data (on first run)
      const sampleWorks: RecentWork[] = [
        {
          id: 'sample-2',
          name: 'Promotion Banner',
          thumbnail: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#FF3939;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="200" height="150" fill="url(#gradient)"/>
              <circle cx="30" cy="30" r="30" fill="#ffffff" fill-opacity="0.2"/>
              <circle cx="170" cy="120" r="20" fill="#ffffff" fill-opacity="0.15"/>
              <text x="100" y="60" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="24" font-weight="bold">Special Sale</text>
              <text x="100" y="85" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="14">50% OFF Event</text>
              <rect x="70" y="100" width="60" height="25" fill="#ffffff" rx="5"/>
              <text x="100" y="116" fill="#FF6B35" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold">Check Now</text>
            </svg>
          `)}`,
          category: 'Format',
          templateId: 'banner-web-1',
          lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          canEdit: true,
          canDuplicate: true,
          canDelete: true,
          canRename: true,
          data: { title: 'Special Sale Event', cta: 'Check Now' }
        }
      ];
      setRecentWorks(sampleWorks);
      localStorage.setItem('recentWorks', JSON.stringify(sampleWorks));
    }
  }, []);

  const handleFormatSelect = (format: UnifiedFormat) => {
    // Format 포맷 선택 시 직접 에디터로 이동
    const mockCategory: Category = {
      id: 'banner',
      name: 'Format',
      icon: 'campaign',
      description: 'Create web banners, advertising banners, and more.',
      defaultTemplate: 'banner-template-1',
    };
    
    navigate(`/editor/banner`, { 
      state: { 
        category: mockCategory,
        selectedFormat: format 
      } 
    });
  };

  const handleEdit = (work: RecentWork) => {
    const categoryMap: Record<string, string> = {
      'Format': 'banner',
      'Google Ads': 'banner', // 이전 데이터 호환성을 위해 유지
      'Promotion Banner': 'banner', // 이전 데이터 호환성을 위해 유지
    };
    const categoryId = categoryMap[work.category] || 'banner';
    navigate(`/editor/${categoryId}`, { state: { work } });
  };

  const handleDuplicate = (work: RecentWork) => {
    const duplicatedWork: RecentWork = {
      ...work,
      id: Date.now().toString(),
      name: `${work.name} (Copy)`,
      lastModified: new Date(),
    };
    
    const updatedWorks = [duplicatedWork, ...recentWorks];
    setRecentWorks(updatedWorks.slice(0, 6));
    
    // 로컬 스토리지 업데이트
    const allWorks = JSON.parse(localStorage.getItem('recentWorks') || '[]');
    allWorks.unshift(duplicatedWork);
    localStorage.setItem('recentWorks', JSON.stringify(allWorks));
  };

  const handleDelete = (work: RecentWork) => {
    if (confirm(`Delete "${work.name}"?`)) {
      const updatedWorks = recentWorks.filter(w => w.id !== work.id);
      setRecentWorks(updatedWorks);
      
      // 로컬 스토리지 업데이트
      const allWorks = JSON.parse(localStorage.getItem('recentWorks') || '[]');
      const filteredWorks = allWorks.filter((w: RecentWork) => w.id !== work.id);
      localStorage.setItem('recentWorks', JSON.stringify(filteredWorks));
    }
  };

  const handleRename = (work: RecentWork, newName: string) => {
    const updatedWorks = recentWorks.map(w => 
      w.id === work.id ? { ...w, name: newName } : w
    );
    setRecentWorks(updatedWorks);
    
    // 로컬 스토리지 업데이트
    const allWorks = JSON.parse(localStorage.getItem('recentWorks') || '[]');
    const updatedAllWorks = allWorks.map((w: RecentWork) => 
      w.id === work.id ? { ...w, name: newName } : w
    );
    localStorage.setItem('recentWorks', JSON.stringify(updatedAllWorks));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, work: RecentWork) => {
    setAnchorEl(event.currentTarget);
    setSelectedWork(work);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedWork(null);
  };

  const handleMenuAction = (action: 'edit' | 'duplicate' | 'delete' | 'rename') => {
    if (!selectedWork) return;

    switch (action) {
      case 'edit':
        handleEdit(selectedWork);
        break;
      case 'duplicate':
        handleDuplicate(selectedWork);
        break;
      case 'delete':
        handleDelete(selectedWork);
        break;
      case 'rename': {
        const newName = prompt('Enter new name:', selectedWork.name);
        if (newName) {
          handleRename(selectedWork, newName);
        }
        break;
      }
    }
    handleMenuClose();
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    } else {
      const diffInYears = Math.floor(diffInMonths / 12);
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    }
  };


  return (
    <Box sx={{ 
      padding: '32px',
      minHeight: '100vh',
    }}>
        <Box sx={{ mb: 10 }}>
        <Typography variant="h2" component="h1" gutterBottom align="left"  sx={{ mb: 4 ,lineHeight:1.3,letterSpacing:"-1px"}}>
        What content would you like to create?
        </Typography>
        

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(auto-fit, minmax(200px, 1fr))',
              md: 'repeat(auto-fit, minmax(250px, 1fr))',
            },
            gap: 2,
          }}
        >
          {formatFormats.map((format) => (
            <Box key={format.id} sx={{ width: '100%' }}>
              <Card
                sx={{
                  height: 270,
                  width: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid #e5e7eb',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleFormatSelect(format)}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ 
                    p: 4,
                    height: '100%',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    backgroundColor: '#ffffff'
                  }}>
                    {/* Format Preview */}
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box
                        sx={{
                          width: (() => {
                            const ratio = format.dimensions.width / format.dimensions.height;
                            const maxWidth = 160;
                            const maxHeight = 120;
                            const minHeight = 60;
                            
                            if (ratio > 1) {
                              const calculatedHeight = Math.round(maxWidth / ratio);
                              return calculatedHeight < minHeight ? Math.round(minHeight * ratio) : maxWidth;
                            } else {
                              return Math.round(maxHeight * ratio);
                            }
                          })(),
                          height: (() => {
                            const ratio = format.dimensions.width / format.dimensions.height;
                            const maxWidth = 160;
                            const maxHeight = 120;
                            const minHeight = 60;
                            
                            if (ratio > 1) {
                              const calculatedHeight = Math.round(maxWidth / ratio);
                              return calculatedHeight < minHeight ? minHeight : calculatedHeight;
                            } else {
                              return maxHeight;
                            }
                          })(),
                          border: `1.3px solid`,
                          borderColor: 'primary.main',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: '#F1F2F4',
                        }}
                      >
                        <CarIcon sx={{ fontSize: 24, color: 'primary.main' }} />
                      </Box>
                    </Box>
                    
                    {/* Text */}
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        sx={{ 
                          mb: 1, 
                          fontWeight: 700,
                          color: '#111827',
                          fontSize: '18px'
                        }}
                      >
                        {format.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#6b7280',
                          lineHeight: 1.5,
                          fontSize: '14px'
                        }}
                      >
                        {format.dimensions.width} × {format.dimensions.height}px
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Recent Works Section */}
      {recentWorks.length > 0 && (
        <Box sx={{ mt: 8 }}>
        
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Stack>
              <Typography variant="h4">
                Recent Works
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: '4px' }}>
                Check your recently worked content and continue editing.
              </Typography>
            </Stack>
          </Box>

          <TableContainer component={Paper} sx={{ 
            boxShadow: 'none', 
            border: '1px solid #e5e7eb',
            borderRadius: 2,
            bgcolor: '#ffffff'
          }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f3f4f6' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 1.5, borderBottom: '1px solid #e5e7eb' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 1.5, borderBottom: '1px solid #e5e7eb' }}>Last modified</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '14px', py: 1.5, borderBottom: '1px solid #e5e7eb' }}>Created</TableCell>
                  <TableCell width={50} sx={{ borderBottom: '1px solid #e5e7eb' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentWorks.map((work) => (
                  <TableRow 
                    key={work.id}
                    hover
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: '#f5f5f5'
                      }
                    }}
                  >
                    <TableCell 
                      onClick={() => handleEdit(work)}
                      sx={{ py: 1.5 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          component="img"
                          src={work.thumbnail}
                          alt={work.name}
                          sx={{
                            width: 60,
                            height: 45,
                            objectFit: 'cover',
                            borderRadius: 1,
                            border: '1px solid #e5e7eb',
                            bgcolor: '#fff'
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937', fontSize: '14px' }}>
                          {work.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280', fontSize: '14px' }}>
                      {formatDate(work.lastModified)}
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280', fontSize: '14px' }}>
                      {formatDate(work.lastModified)}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMenuOpen(e, work);
                        }}
                        sx={{ padding: '4px' }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Context Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleMenuAction('edit')}>Edit</MenuItem>
            <MenuItem onClick={() => handleMenuAction('duplicate')}>Duplicate</MenuItem>
            <MenuItem onClick={() => handleMenuAction('rename')}>Rename</MenuItem>
            <Divider />
            <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
          </Menu>
        </Box>
      )}

    </Box>
  );
};

export default Home;