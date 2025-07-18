import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material';
import {
  Description as DocumentIcon,
  CampaignOutlined as BannerIcon,
  PhotoCamera as SnsIcon,
} from '@mui/icons-material';
import { Category } from '../types';

const categories: Category[] = [
  {
    id: 'document',
    name: '문서',
    icon: 'description',
    description: '제안서, 계약서, 브로슈어 등의 문서를 제작합니다.',
    defaultTemplate: 'doc-template-1',
  },
  {
    id: 'banner',
    name: '프로모션 배너',
    icon: 'campaign',
    description: '웹 배너, 광고 배너 등을 제작합니다.',
    defaultTemplate: 'banner-template-1',
  },
  {
    id: 'sns',
    name: 'SNS',
    icon: 'camera',
    description: '인스타그램, 페이스북 등 SNS 콘텐츠를 제작합니다.',
    defaultTemplate: 'sns-template-1',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    navigate(`/editor/${category.id}`, { state: { category } });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'description':
        return <DocumentIcon sx={{ fontSize: 60, color: 'primary.main' }} />;
      case 'campaign':
        return <BannerIcon sx={{ fontSize: 60, color: 'primary.main' }} />;
      case 'camera':
        return <SnsIcon sx={{ fontSize: 60, color: 'primary.main' }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Brand Studio
          </Typography>
          <Typography variant="h5" color="text.secondary">
            제작하고 싶은 콘텐츠 카테고리를 선택해주세요
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleCategoryClick(category)}
                  sx={{ height: '100%', p: 2 }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>{getIcon(category.icon)}</Box>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;