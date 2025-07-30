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
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ViewCarousel,
} from '@mui/icons-material';
import { Category, RecentWork } from '../types';
import FormatSelector from '../components/FormatSelector';
import { getUniqueFormatsByCategory, UnifiedFormat } from '../data/unifiedFormats';

const categories: Category[] = [
  {
    id: 'banner',
    name: 'Google Ads',
    icon: 'campaign',
    description: 'Create web banners, advertising banners, and more.',
    defaultTemplate: 'banner-template-1',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>([]);
  const [formatSelectorOpen, setFormatSelectorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [availableFormats, setAvailableFormats] = useState<UnifiedFormat[]>([]);
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
          category: 'Google Ads',
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

  const handleCategoryClick = (category: Category) => {
    const categoryMap: Record<string, string> = {
      'banner': 'Google Ads',
    };
    const categoryName = categoryMap[category.id] || category.name;
    const categoryFormats = getUniqueFormatsByCategory(categoryName);
    
    setSelectedCategory(category);
    setAvailableFormats(categoryFormats);
    setFormatSelectorOpen(true);
  };

  const handleFormatSelect = (format: UnifiedFormat) => {
    if (selectedCategory) {
      navigate(`/editor/${selectedCategory.id}`, { 
        state: { 
          category: selectedCategory,
          selectedFormat: format 
        } 
      });
    }
    setFormatSelectorOpen(false);
    setSelectedCategory(null);
  };

  const handleFormatSelectorClose = () => {
    setFormatSelectorOpen(false);
    setSelectedCategory(null);
  };

  const handleEdit = (work: RecentWork) => {
    const categoryMap: Record<string, string> = {
      'Google Ads': 'banner',
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

  const getIcon = (iconName: string) => {
    const iconSize = 64;
    
    switch (iconName) {
      case 'campaign':
        // Carousel/Banner icon
        return (
          <Box sx={{ 
            position: 'relative', 
            width: iconSize, 
            height: iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ViewCarousel sx={{ fontSize: 48, color: '#FF70FA' }} />
          </Box>
        );
      default:
        return null;
    }
  };

  const getCategoryStyle = (categoryId: string) => {
    const styles = {
      'banner': {
        background: '#ffffff',
        iconBg: '#f8f9fa',
      },
    };
    return styles[categoryId as keyof typeof styles] || styles.banner;
  };

  return (
    <Box sx={{ 
      padding: '32px',
      minHeight: '100vh',
    }}>
        <Box sx={{ mb: 10 }}>
        <Typography variant="h2" component="h1" gutterBottom align="left"  sx={{ mb: 6 ,lineHeight:1.3,letterSpacing:"-1px"}}>
        Welcome to Content Maker. <br/> What content would you like to create?
        </Typography>
        

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
            justifyItems: 'center',
          }}
        >
          {categories.map((category) => {
            const categoryStyle = getCategoryStyle(category.id);
            return (
              <Box key={category.id} sx={{ width: '100%', maxWidth: 320 }}>
                <Card
                  sx={{
                    height: 240,
                    width: '100%',
                    maxWidth: 320,
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
                    onClick={() => handleCategoryClick(category)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent sx={{ 
                      p: 4,
                      height: '100%',
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      backgroundColor: categoryStyle.background
                    }}>
                      {/* Icon */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        {getIcon(category.icon)}
                      </Box>
                      
                      {/* Text */}
                      <Box sx={{ textAlign: 'left', width: '100%' }}>
                        <Typography 
                          variant="h5" 
                          component="h2" 
                          sx={{ 
                            mb: 1, 
                            fontWeight: 700,
                            color: '#111827',
                            fontSize: '24px'
                          }}
                        >
                          {category.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#6b7280',
                            lineHeight: 1.5,
                            fontSize: '14px'
                          }}
                        >
                          {category.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Recent Works Section */}
      {recentWorks.length > 0 && (
        <Box sx={{ mt: 12 }}>
        
          <Box sx={{ textAlign: 'left', mb: 6 }}>
            <Typography variant="h4" gutterBottom>
              Recent Works
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Check your recently worked content and continue editing.
            </Typography>
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
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', py: 1.5, borderBottom: '1px solid #e5e7eb' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', py: 1.5, borderBottom: '1px solid #e5e7eb' }}>Last modified</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151', fontSize: '13px', py: 1.5, borderBottom: '1px solid #e5e7eb' }}>Created</TableCell>
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
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937' }}>
                          {work.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280', fontSize: '13px' }}>
                      {formatDate(work.lastModified)}
                    </TableCell>
                    <TableCell sx={{ color: '#6b7280', fontSize: '13px' }}>
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
          >
            <MenuItem onClick={() => handleMenuAction('edit')}>Edit</MenuItem>
            <MenuItem onClick={() => handleMenuAction('duplicate')}>Duplicate</MenuItem>
            <MenuItem onClick={() => handleMenuAction('rename')}>Rename</MenuItem>
            <Divider />
            <MenuItem onClick={() => handleMenuAction('delete')}>Delete</MenuItem>
          </Menu>
        </Box>
      )}

      {/* Format Selection Modal */}
      <FormatSelector
        open={formatSelectorOpen}
        onClose={handleFormatSelectorClose}
        onSelect={handleFormatSelect}
        formats={availableFormats}
        category={selectedCategory ? selectedCategory.name : ''}
      />
    </Box>
  );
};

export default Home;