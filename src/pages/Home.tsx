import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
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
  Description as DocumentIcon,
  CampaignOutlined as BannerIcon,
  PhotoCamera as SnsIcon,
  MoreVert as MoreVertIcon,
  Article,
  Campaign,
  MenuBook,
  ViewCarousel,
} from '@mui/icons-material';
import { Category, RecentWork } from '../types';
import FormatSelector from '../components/FormatSelector';
import { getUniqueFormatsByCategory, UnifiedFormat } from '../data/unifiedFormats';

const categories: Category[] = [
  {
    id: 'document',
    name: 'Document',
    icon: 'description',
    description: 'Create contract, quotation, purchase order, and more.',
    defaultTemplate: 'doc-template-1',
  },
  {
    id: 'banner',
    name: 'Promotion Banner',
    icon: 'campaign',
    description: 'Create web banners, advertising banners, and more.',
    defaultTemplate: 'banner-template-1',
  },
  {
    id: 'brochure',
    name: 'Brochure',
    icon: 'camera',
    description: 'Create A3 brochure, A4 brochure, 2-fold brochure, and more.',
    defaultTemplate: 'brochure-template-1',
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
          id: 'sample-1',
          name: 'Product Introduction',
          thumbnail: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="150" fill="#ffffff" stroke="#eeeeee" stroke-width="2"/>
              <circle cx="40" cy="40" r="15" fill="#1F7AFC"/>
              <text x="100" y="25" fill="#333333" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Product Introduction</text>
              <rect x="20" y="55" width="160" height="3" fill="#dddddd"/>
              <rect x="20" y="65" width="120" height="3" fill="#dddddd"/>
              <rect x="20" y="75" width="140" height="3" fill="#dddddd"/>
              <rect x="20" y="95" width="80" height="30" fill="#1F7AFC" rx="5"/>
              <text x="60" y="113" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="10">Learn More</text>
            </svg>
          `)}`,
          category: 'Document',
          templateId: 'doc-proposal-1',
          lastModified: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          canEdit: true,
          canDuplicate: true,
          canDelete: true,
          canRename: true,
          data: { title: 'Product Introduction', content: 'Introducing the features and benefits of our product.' }
        },
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
          category: 'Promotion Banner',
          templateId: 'banner-web-1',
          lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          canEdit: true,
          canDuplicate: true,
          canDelete: true,
          canRename: true,
          data: { title: 'Special Sale Event', cta: 'Check Now' }
        },
        {
          id: 'sample-3',
          name: 'Instagram Post',
          thumbnail: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="instagradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#E1306C;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#FBF040;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#F79314;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect width="200" height="150" fill="url(#instagradient)"/>
              <rect x="30" y="30" width="140" height="90" fill="#ffffff" fill-opacity="0.1" rx="10"/>
              <circle cx="50" cy="50" r="10" fill="#ffffff"/>
              <text x="100" y="55" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">New Updates</text>
              <rect x="40" y="70" width="50" height="3" fill="#ffffff"/>
              <rect x="40" y="80" width="70" height="3" fill="#ffffff"/>
              <rect x="40" y="90" width="60" height="3" fill="#ffffff"/>
              <rect x="40" y="100" width="40" height="3" fill="#ffffff"/>
              <rect x="140" y="40" width="20" height="20" fill="#ffffff" fill-opacity="0.3" rx="3"/>
              <rect x="140" y="70" width="20" height="20" fill="#ffffff" fill-opacity="0.3" rx="3"/>
              <rect x="140" y="100" width="20" height="20" fill="#ffffff" fill-opacity="0.3" rx="3"/>
            </svg>
          `)}`,
          category: 'Brochure',
          templateId: 'sns-instagram-1',
          lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          canEdit: true,
          canDuplicate: true,
          canDelete: true,
          canRename: true,
          data: { title: 'New Updates', content: 'Follow us!' }
        }
      ];
      setRecentWorks(sampleWorks);
      localStorage.setItem('recentWorks', JSON.stringify(sampleWorks));
    }
  }, []);

  const handleCategoryClick = (category: Category) => {
    // Check if brochure category is clicked
    if (category.id === 'brochure') {
      alert('Feature is under development.');
      return;
    }
    
    const categoryMap: Record<string, string> = {
      'document': 'Document',
      'banner': 'Promotion Banner',
      'brochure': 'Brochure',
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
      'Document': 'document',
      'Promotion Banner': 'banner',
      'Brochure': 'brochure',
    };
    const categoryId = categoryMap[work.category] || 'document';
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
      case 'rename':
        const newName = prompt('Enter new name:', selectedWork.name);
        if (newName) {
          handleRename(selectedWork, newName);
        }
        break;
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
      case 'description':
        // Document icon
        return (
          <Box sx={{ 
            position: 'relative', 
            width: iconSize, 
            height: iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Article sx={{ fontSize: 48, color: '#1F7AFC' }} />
          </Box>
        );
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
      case 'camera':
        // Brochure/Book icon
        return (
          <Box sx={{ 
            position: 'relative', 
            width: iconSize, 
            height: iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MenuBook sx={{ fontSize: 48, color: '#FF8C00' }} />
          </Box>
        );
      default:
        return null;
    }
  };

  const getCategoryStyle = (categoryId: string) => {
    const styles = {
      'document': {
        background: '#ffffff',
        iconBg: '#f8f9fa',
      },
      'banner': {
        background: '#ffffff',
        iconBg: '#f8f9fa',
      },
      'brochure': {
        background: '#ffffff',
        iconBg: '#f8f9fa',
      },
    };
    return styles[categoryId as keyof typeof styles] || styles.document;
  };

  return (
    <Box sx={{ 
      paddingBottom: 6,
      paddingTop:14, 
      maxWidth: '1200px',
      margin: '0 auto',
      paddingLeft: '280px'
    }}>
        <Box sx={{ mb: 10 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center"  sx={{ mb: 6 ,lineHeight:1.3,letterSpacing:"-1px"}}>
        Welcome to Brand Studio. <br/> What content would you like to create?
        </Typography>
        

        <Grid container  justifyContent="center" spacing={4}>
          {categories.map((category) => {
            const categoryStyle = getCategoryStyle(category.id);
            return (
              <Grid item  size={{xs:12,sm:6,md:4,lg:4}} key={category.id}>
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
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Recent Works Section */}
      {recentWorks.length > 0 && (
        <Box sx={{ mt: 12 }}>
        
          <Box sx={{ textAlign: 'center', mb: 6 }}>
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