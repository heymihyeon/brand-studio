import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from '@mui/material';
import { 
  Download as DownloadIcon, 
  Edit as EditIcon, 
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon 
} from '@mui/icons-material';
import Canvas, { CanvasRef } from '../components/Canvas';
import AssetSelector from '../components/AssetSelector';
import FormatSelector from '../components/FormatSelector';
import ExportDialog from '../components/ExportDialog';
import { Template, FormatOption, BrandAsset, Category, RecentWork } from '../types';
import { templates, getTemplatesByCategory } from '../data/templates';
import { getFormatsByCategory } from '../data/formats';
import { 
  UnifiedFormat, 
  convertToTemplate, 
  getFormatsByCategory as getUnifiedFormatsByCategory,
  getTemplatesByFormatGroup,
  getUniqueFormatsByCategory 
} from '../data/unifiedFormats';
import { getDefaultLogo, getDefaultVehicle, getDefaultBackground } from '../data/brandPresets';

const categoryMap: Record<string, string> = {
  'document': 'Document',
  'banner': 'Promotion Banner',
  'sns': 'SNS',
};

// Template Preview Component
const TemplatePreview: React.FC<{ variant: UnifiedFormat }> = ({ variant }) => {
  // Get actual layout from variant
  const vehicleImage = variant.editableElements.images.find(img => img.id === 'vehicle');
  const titleText = variant.editableElements.texts.find(txt => txt.id === 'title');
  
  // Find overlay object for positioning
  const overlayObj = variant.canvas.objects?.find((obj: any) => obj.id === 'overlay') as any;
  const vehicleObj = variant.canvas.objects?.find((obj: any) => obj.id === 'vehicle') as any;
  const titleObj = variant.canvas.objects?.find((obj: any) => obj.id === 'title') as any;
  
  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      backgroundColor: '#f1f1f1',
      overflow: 'hidden',
    }}>
      
      {/* Text Preview */}
      {titleObj && (
        <Box
          sx={{
            position: 'absolute',
            left: titleObj.textAlign === 'center' && titleObj.originX === 'center' 
              ? '50%' 
              : `${(titleObj.left / variant.canvas.width) * 100}%`,
            top: `${(titleObj.top / variant.canvas.height) * 100}%`,
            transform: titleObj.textAlign === 'center' && titleObj.originX === 'center' 
              ? 'translateX(-50%)' 
              : 'none',
            color: 'black',
            fontSize: '8px',
            fontWeight: 'bold',
            whiteSpace: 'pre-line',
            textAlign: titleObj.textAlign || 'left',
          }}
        >
          Hyundai EV
        </Box>
      )}
      
      {/* Vehicle Image */}
      {vehicleImage && vehicleObj && variant.templateVariant !== 'center' && (
        <Box
          component="img"
          src="/images/cars/ioniq6.png"
          sx={{
            position: 'absolute',
            left: `${(vehicleObj.left / variant.canvas.width) * 100}%`,
            top: `${(vehicleObj.top / variant.canvas.height) * 100}%`,
            width: `${(vehicleObj.width / variant.canvas.width) * 100}%`,
            height: `${(vehicleObj.height / variant.canvas.height) * 100}%`,
            objectFit: 'contain',
          }}
        />
      )}
    </Box>
  );
};

const Editor: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [editableValues, setEditableValues] = useState<Record<string, any>>({});
  const [assetSelectorOpen, setAssetSelectorOpen] = useState(false);
  const [currentEditingElement, setCurrentEditingElement] = useState<string | null>(null);
  const [formatSelectorOpen, setFormatSelectorOpen] = useState(false);
  const [availableTemplates, setAvailableTemplates] = useState<Template[]>([]);
  const [availableFormats, setAvailableFormats] = useState<FormatOption[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<FormatOption | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [saveSuccessDialogOpen, setSaveSuccessDialogOpen] = useState(false);
  const [availableTemplateVariants, setAvailableTemplateVariants] = useState<UnifiedFormat[]>([]);
  const [selectedTemplateVariant, setSelectedTemplateVariant] = useState<string>('default');
  const canvasRef = useRef<CanvasRef>(null);

useEffect(() => {
  console.log(template);
}, [template]);

  useEffect(() => {
    // 카테고리에 따른 포맷과 템플릿 로드
    if (categoryId) {
      const category = categoryMap[categoryId];
      if (category) {
        setCurrentCategory(category);
        const categoryFormats = getFormatsByCategory(category);
        const categoryTemplates = getTemplatesByCategory(category);
        setAvailableFormats(categoryFormats);
        setAvailableTemplates(categoryTemplates);
        
        // location.state에서 work 데이터 확인 (최근 작업에서 편집하는 경우)
        if (location.state?.work) {
          const work = location.state.work as RecentWork;
          const workTemplate = categoryTemplates.find(t => t.id === work.templateId);
          if (workTemplate) {
            setTemplate(workTemplate);
            setSelectedFormat(workTemplate.format);
            setEditableValues(work.data || {});
          }
        } else if (location.state?.selectedFormat) {
          // 홈에서 선택된 통합 포맷이 있는 경우
          const selectedUnifiedFormat = location.state.selectedFormat as UnifiedFormat;
          
          // 해당 포맷 그룹의 모든 템플릿 변형 로드
          if (selectedUnifiedFormat.formatGroup) {
            const variants = getTemplatesByFormatGroup(selectedUnifiedFormat.formatGroup);
            setAvailableTemplateVariants(variants);
            // 기본적으로 default 템플릿 선택
            const defaultVariant = variants.find(v => v.templateVariant === 'default') || selectedUnifiedFormat;
            setSelectedTemplateVariant(defaultVariant.templateVariant || 'default');
            
            const convertedTemplate = convertToTemplate(defaultVariant);
            setTemplate(convertedTemplate);
            setSelectedFormat(convertedTemplate.format);
            
            // 초기 편집 가능 값 설정
            const initialValues: Record<string, any> = {};
            convertedTemplate.editableElements.texts.forEach((text) => {
              initialValues[text.id] = text.text || '';
            });
            convertedTemplate.editableElements.images.forEach((image) => {
              // 차량 이미지인 경우 기본 차량 이미지 설정
              if (image.id === 'vehicle' || image.label === 'Vehicle Model') {
                initialValues[image.id] = getDefaultVehicle();
              } 
              // 배경 이미지인 경우 기본 배경 이미지 설정
              else if (image.id === 'background' || image.id === 'bg-image' || image.label === 'Background Image') {
                initialValues[image.id] = getDefaultBackground();
              } 
              // 그 외의 경우
              else {
                initialValues[image.id] = image.src || '';
              }
            });
            
            // 로고 이미지 기본값 설정 - 항상 프리셋 로고 사용
            initialValues['brandLogo'] = getDefaultLogo();
            
            setEditableValues(initialValues);
          } else {
            // formatGroup이 없는 경우 기존 방식대로 처리
            const convertedTemplate = convertToTemplate(selectedUnifiedFormat);
            setTemplate(convertedTemplate);
            setSelectedFormat(convertedTemplate.format);
            
            // 초기 편집 가능 값 설정
            const initialValues: Record<string, any> = {};
            convertedTemplate.editableElements.texts.forEach((text) => {
              initialValues[text.id] = text.text || '';
            });
            convertedTemplate.editableElements.images.forEach((image) => {
              // 차량 이미지인 경우 기본 차량 이미지 설정
              if (image.id === 'vehicle' || image.label === 'Vehicle Model') {
                initialValues[image.id] = getDefaultVehicle();
              } 
              // 배경 이미지인 경우 기본 배경 이미지 설정
              else if (image.id === 'background' || image.id === 'bg-image' || image.label === 'Background Image') {
                initialValues[image.id] = getDefaultBackground();
              } 
              // 그 외의 경우
              else {
                initialValues[image.id] = image.src || '';
              }
            });
            
            // 로고 이미지 기본값 설정 - 항상 프리셋 로고 사용
            initialValues['brandLogo'] = getDefaultLogo();
            
            setEditableValues(initialValues);
          }
        } else if (!template) {
          // 포맷 선택 다이얼로그 열기
          setFormatSelectorOpen(true);
        }
      }
    }
  }, [categoryId, location.state]);

  const handleFormatSelect = (format: FormatOption) => {
    // 통합 포맷 시스템에서는 포맷 선택 시 바로 템플릿 적용
    setSelectedFormat(format);
    setFormatSelectorOpen(false);
    
    // 기존 방식과의 호환성을 위해 첫 번째 템플릿 사용
    const formatTemplates = availableTemplates.filter(t => t.format.id === format.id);
    if (formatTemplates.length > 0) {
      const template = formatTemplates[0];
      setTemplate(template);
      
      // 초기 편집 가능 값 설정
      const initialValues: Record<string, any> = {};
      template.editableElements.texts.forEach((text) => {
        initialValues[text.id] = text.text || '';
      });
      template.editableElements.images.forEach((image) => {
        // 차량 이미지인 경우 기본 차량 이미지 설정
        if (image.id === 'vehicle' || image.label === 'Vehicle Model') {
          initialValues[image.id] = getDefaultVehicle();
        } 
        // 배경 이미지인 경우 기본 배경 이미지 설정
        else if (image.id === 'background' || image.id === 'bg-image' || image.label === 'Background Image') {
          initialValues[image.id] = getDefaultBackground();
        } 
        // 그 외의 경우
        else {
          initialValues[image.id] = image.src || '';
        }
      });
      
      // 로고 이미지 기본값 설정 - 항상 프리셋 로고 사용
      initialValues['brandLogo'] = getDefaultLogo();
      
      setEditableValues(initialValues);
    }
  };


  const handleTextChange = (elementId: string, value: string) => {
    setEditableValues((prev) => ({
      ...prev,
      [elementId]: value,
    }));
    
    // 실시간 업데이트를 위한 자동 저장 (디바운스 사용)
    saveCurrentWork();
  };

  // 템플릿 변형 변경 핸들러
  const handleTemplateVariantChange = (variant: UnifiedFormat) => {
    setSelectedTemplateVariant(variant.templateVariant || 'default');
    const convertedTemplate = convertToTemplate(variant);
    setTemplate(convertedTemplate);
    
    // 기존 편집 값을 유지하면서 템플릿만 변경
    const currentValues = { ...editableValues };
    
    // 차량 이미지가 없는 center 템플릿인 경우 vehicle 이미지 제거
    if (variant.templateVariant === 'center') {
      delete currentValues['vehicle'];
    } else if (!currentValues['vehicle'] && variant.templateVariant !== 'center') {
      // center에서 다른 템플릿으로 변경 시 기본 차량 이미지 추가
      currentValues['vehicle'] = getDefaultVehicle();
    }
    
    setEditableValues(currentValues);
  };

  const [assetFilterCategory, setAssetFilterCategory] = useState<string | undefined>(undefined);
  
  const handleImageSelect = (elementId: string) => {
    setCurrentEditingElement(elementId);
    
    // Set filter category based on image element label or ID
    if (elementId === 'brandLogo') {
      console.log('Editor: Setting filter to Logos');
      setAssetFilterCategory('Logo');
    } else {
      const imageElement = template?.editableElements.images.find(img => img.id === elementId);
      console.log('Editor: Image element found:', imageElement);
      console.log('Editor: Image element label:', imageElement?.label);
      
      if (imageElement?.label === 'Background Image') {
        console.log('Editor: Setting filter to Background Images');
        setAssetFilterCategory('Background Images');
      } else if (imageElement?.label === 'Vehicle Model') {
        console.log('Editor: Setting filter to Vehicle Models');
        setAssetFilterCategory('Vehicle Models');
      } else {
        console.log('Editor: No specific filter set');
        setAssetFilterCategory(undefined);
      }
    }
    
    setAssetSelectorOpen(true);
  };

  const handleAssetSelect = (asset: BrandAsset) => {
    if (currentEditingElement) {
      setEditableValues((prev) => ({
        ...prev,
        [currentEditingElement]: asset,
      }));
      
      // 이미지 변경 시도 자동 저장
      saveCurrentWork();
    }
    setAssetSelectorOpen(false);
    setCurrentEditingElement(null);
  };

  const handleCanvasTextEdit = (elementId: string, value: string) => {
    setEditableValues((prev) => ({
      ...prev,
      [elementId]: value,
    }));
    
    // 캔버스에서 텍스트 편집 시도 자동 저장
    saveCurrentWork();
  };

  const handleCanvasImageEdit = (elementId: string) => {
    setCurrentEditingElement(elementId);
    
    // Set filter category based on image element label or ID
    if (elementId === 'brandLogo') {
      console.log('Editor (Canvas): Setting filter to Logos');
      setAssetFilterCategory('Logo');
    } else {
      const imageElement = template?.editableElements.images.find(img => img.id === elementId);
      console.log('Editor (Canvas): Image element found:', imageElement);
      console.log('Editor (Canvas): Image element label:', imageElement?.label);
      
      if (imageElement?.label === 'Background Image') {
        console.log('Editor (Canvas): Setting filter to Background Images');
        setAssetFilterCategory('Background Images');
      } else if (imageElement?.label === 'Vehicle Model') {
        console.log('Editor (Canvas): Setting filter to Vehicle Models');
        setAssetFilterCategory('Vehicle Models');
      } else {
        console.log('Editor (Canvas): No specific filter set');
        setAssetFilterCategory(undefined);
      }
    }
    
    setAssetSelectorOpen(true);
  };
  
  // 디바운스를 위한 자동 저장 함수
  const saveCurrentWork = React.useCallback(() => {
    if (!template || !canvasRef.current) return;
    
    const timeoutId = setTimeout(() => {
      const thumbnailData = canvasRef.current!.exportCanvas('png', 80);
      const workName = `${template.name} - ${new Date().toLocaleDateString('ko-KR')}`;
      
      const recentWork: RecentWork = {
        id: `auto-${Date.now()}`,
        name: workName,
        thumbnail: thumbnailData,
        category: template.category,
        templateId: template.id,
        lastModified: new Date(),
        canEdit: true,
        canDuplicate: true,
        canDelete: true,
        canRename: true,
        data: editableValues,
      };
      
      const savedWorks = JSON.parse(localStorage.getItem('recentWorks') || '[]');
      // 기존에 있는 샘플 데이터 및 자동 저장 데이터 제거
      const filteredWorks = savedWorks.filter((work: RecentWork) => 
        !work.id.startsWith('sample-') && !work.id.startsWith('auto-')
      );
      filteredWorks.unshift(recentWork);
      localStorage.setItem('recentWorks', JSON.stringify(filteredWorks.slice(0, 20))); // 최대 20개만 유지
    }, 1000); // 1초 디바운스
    
    return () => clearTimeout(timeoutId);
  }, [template, editableValues]);

  const handleExport = (format: string, quality: number, fileName: string) => {
    if (!canvasRef.current || !template) return;
    
    const dataUrl = canvasRef.current.exportCanvas(format, quality);
    
    // 데이터 URL을 파일로 다운로드
    const link = document.createElement('a');
    link.download = `${fileName}.${format}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 사용자 정의 이름이 있으면 사용, 없으면 기본 이름
    const workName = fileName.replace(/\.(png|jpg|jpeg|svg)$/i, '');
    
    // 최근 작업 저장
    const recentWork: RecentWork = {
      id: Date.now().toString(),
      name: workName,
      thumbnail: dataUrl,
      category: template.category,
      templateId: template.id,
      lastModified: new Date(),
      canEdit: true,
      canDuplicate: true,
      canDelete: true,
      canRename: true,
      data: editableValues,
    };
    
    const savedWorks = JSON.parse(localStorage.getItem('recentWorks') || '[]');
    // 기존에 있는 샘플 데이터 제거
    const filteredWorks = savedWorks.filter((work: RecentWork) => !work.id.startsWith('sample-'));
    filteredWorks.unshift(recentWork);
    localStorage.setItem('recentWorks', JSON.stringify(filteredWorks));
  };
  
  const handleExportClick = () => {
    setExportDialogOpen(true);
  };

  const handleSave = () => {
    if (!template || !canvasRef.current) {
      alert('Unable to save. Please make sure the template is loaded.');
      return;
    }

    try {
      const workFromState = location.state?.work as RecentWork | undefined;
      const thumbnailData = canvasRef.current.exportCanvas('png', 0.8);
      
      const newWork: RecentWork = {
        id: workFromState?.id || Date.now().toString(),
        name: workFromState?.name || `${template.name} - ${new Date().toLocaleDateString('ko-KR')}`,
        thumbnail: thumbnailData || '',
        category: currentCategory as 'Document' | 'Promotion Banner' | 'Brochure',
        templateId: template.id,
        lastModified: new Date(),
        canEdit: true,
        canDuplicate: true,
        canDelete: true,
        canRename: true,
        data: editableValues,
      };
      
      const savedWorks = JSON.parse(localStorage.getItem('recentWorks') || '[]');
      const existingIndex = savedWorks.findIndex((w: RecentWork) => w.id === newWork.id);
      
      if (existingIndex >= 0) {
        savedWorks[existingIndex] = newWork;
      } else {
        savedWorks.unshift(newWork);
      }
      
      localStorage.setItem('recentWorks', JSON.stringify(savedWorks));
      
      // 저장 완료 다이얼로그 표시
      console.log('Setting dialog open to true');
      setSaveSuccessDialogOpen(true);
      
      // Force update to ensure dialog shows
      setTimeout(() => {
        console.log('Dialog state is:', saveSuccessDialogOpen);
      }, 0);
    } catch (error) {
      // 에러 발생 시 사용자에게 알림
      console.error('Save error:', error);
      alert('An error occurred while saving. Please try again.');
    }
  };

  if (!template && !formatSelectorOpen) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="info">Please select a format.</Alert>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => setFormatSelectorOpen(true)}
        >
          Select Format
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 상단 헤더 */}
      <Paper
        sx={{
          px: 3,
          py: 2,
          borderRadius: 0,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={() => navigate('/')}
            sx={{ 
              minWidth: 'auto',
              p: 1,
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ArrowBackIcon />
          </Button>
          <Box>
            <Typography variant="h6">
              {template ? template.name : 'Content Editor'}
            </Typography>
          </Box>
        </Box>
        
        <Stack direction="row" spacing={2}>
          {/* 저장 버튼 */}
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save
          </Button>
          
          {/* 내보내기 버튼 */}
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleExportClick}
          >
            내보내기
          </Button>
        </Stack>
      </Paper>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 좌측 패널 */}
        <Paper
          sx={{
            width: 320,
            p: 3,
            overflow: 'auto',
            borderRadius: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
            height: '100%',
          }}
        >

        <Stack spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setFormatSelectorOpen(true)}
          >
            Change Format
          </Button>
        </Stack>

        <Stack spacing={3}>
          {/* 편집 가능한 텍스트 요소들 */}
          {template && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Text Edit
              </Typography>
              {template.editableElements.texts.map((textElement) => (
                <TextField
                  key={textElement.id}
                  fullWidth
                  label={
                    textElement.type === 'heading' ? 'Title' :
                    textElement.type === 'subheading' ? 'Subtitle' : 'Body'
                  }
                  value={editableValues[textElement.id] || ''}
                  onChange={(e) => handleTextChange(textElement.id, e.target.value)}
                  multiline={textElement.type === 'body'}
                  rows={textElement.type === 'body' ? 4 : 1}
                />
              ))}
              
              {template.editableElements.images.length > 0 && (
                <>
                  <Divider />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Image Edit
                  </Typography>
                  {template.editableElements.images.map((imageElement) => (
                    <Box key={imageElement.id}>
                      <Typography variant="body2" gutterBottom>
                        {imageElement.label || 
                         (imageElement.id === 'logo' ? 'Logo' :
                          imageElement.id === 'main' ? 'Main Image' :
                          imageElement.id === 'background' ? 'Background Image' :
                          imageElement.id === 'product' ? 'Product Image' :
                          imageElement.id === 'cover' ? 'Cover Image' : 
                          imageElement.id === 'bg-image' ? 'Background Image' :
                          imageElement.id === 'vehicle' ? 'Vehicle Model' : 'Image')}
                      </Typography>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleImageSelect(imageElement.id)}
                      >
                        {editableValues[imageElement.id] && typeof editableValues[imageElement.id] === 'object'
                          ? (editableValues[imageElement.id] as BrandAsset).name
                          : `Select ${imageElement.label || 'Image'}`}
                      </Button>
                    </Box>
                  ))}
                  
                  {/* Logo Image - Always show for all templates */}
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Logo Image
                    </Typography>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleImageSelect('brandLogo')}
                    >
                      {editableValues['brandLogo'] && typeof editableValues['brandLogo'] === 'object'
                        ? (editableValues['brandLogo'] as BrandAsset).name
                        : 'Select Logo'}
                    </Button>
                  </Box>
                </>
              )}
            </>
          )}

          {/* 템플릿 선택 섹션 - 템플릿 변형이 있는 경우 표시 */}
          {availableTemplateVariants.length > 0 && (
            <>
              <Divider />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Layout
              </Typography>
              <Grid container spacing={1}>
                {availableTemplateVariants.map((variant) => (
                  <Grid item size={6} key={variant.id}>
                    <Box
                      onClick={() => handleTemplateVariantChange(variant)}
                      sx={{
                        cursor: 'pointer',
                        border: selectedTemplateVariant === variant.templateVariant ? '2px solid' : '1px solid',
                        borderColor: selectedTemplateVariant === variant.templateVariant ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'scale(1.02)',
                        }
                      }}
                    >
                      {/* Template Preview */}
                      <Box
                        sx={{
                          aspectRatio: variant.dimensions.width / variant.dimensions.height,
                          backgroundColor: '#f5f5f5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <TemplatePreview variant={variant} />
                      </Box>
                      <Box sx={{ p: 0.5, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ fontSize: '11px' }} fontWeight={selectedTemplateVariant === variant.templateVariant ? 'bold' : 'normal'}>
                          {variant.templateVariant === 'default' && 
                            (variant.formatGroup === 'banner-horizontal' ? 'Default Layout' :
                             variant.formatGroup === 'banner-vertical' ? 'Top Text' :
                             'Left Text')}
                          {variant.templateVariant === 'bottom-left' && 'Bottom Left'}
                          {variant.templateVariant === 'top-right' && 'Top Right'}
                          {variant.templateVariant === 'center' && 'Center Text'}
                          {variant.templateVariant === 'bottom' && 'Bottom Text'}
                          {variant.templateVariant === 'middle' && 'Middle Text'}
                          {variant.templateVariant === 'top' && 'Top Center'}
                          {variant.templateVariant === 'right' && 'Right Text'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

        </Stack>
      </Paper>

      

        {/* 중앙 캔버스 영역 */}
        <Box 
          sx={{ 
            flex: 1, 
            bgcolor: 'grey.100', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          {template && (
            <Box
              sx={{
                position: 'relative',
                width: 'fit-content',
                height: 'fit-content',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: 1,
              }}
            >
              <Canvas
                ref={canvasRef}
                template={template}
                editableValues={editableValues}
                onTextEdit={handleCanvasTextEdit}
                onImageEdit={handleCanvasImageEdit}
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* 포맷 선택 모달 */}
      <FormatSelector
        open={formatSelectorOpen}
        onClose={() => setFormatSelectorOpen(false)}
        onSelect={(format) => {
          const convertedTemplate = convertToTemplate(format);
          setTemplate(convertedTemplate);
          setSelectedFormat(convertedTemplate.format);
          
          // 초기 편집 가능 값 설정
          const initialValues: Record<string, any> = {};
          convertedTemplate.editableElements.texts.forEach((text) => {
            initialValues[text.id] = text.text || '';
          });
          convertedTemplate.editableElements.images.forEach((image) => {
            // 차량 이미지인 경우 기본 차량 이미지 설정
            if (image.id === 'vehicle' || image.label === 'Vehicle Model') {
              initialValues[image.id] = getDefaultVehicle();
            } 
            // 배경 이미지인 경우 기본 배경 이미지 설정
            else if (image.id === 'background' || image.id === 'bg-image' || image.label === 'Background Image') {
              initialValues[image.id] = getDefaultBackground();
            } 
            // 그 외의 경우
            else {
              initialValues[image.id] = image.src || '';
            }
          });
          
          // 로고 이미지 기본값 설정 - 항상 프리셋 로고 사용
          initialValues['brandLogo'] = getDefaultLogo();
          
          setEditableValues(initialValues);
          setFormatSelectorOpen(false);
        }}
        formats={getUniqueFormatsByCategory(currentCategory)}
        category={currentCategory}
      />
      

      {/* 내보내기 다이얼로그 */}
      <ExportDialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        onExport={handleExport}
        template={template}
      />
      
      {/* Asset Selection Modal */}
      <AssetSelector
        open={assetSelectorOpen}
        onClose={() => {
          setAssetSelectorOpen(false);
          setAssetFilterCategory(undefined);
        }}
        onSelect={handleAssetSelect}
        filterCategory={assetFilterCategory}
      />

      {/* 저장 성공 다이얼로그 */}
      <Dialog
        open={saveSuccessDialogOpen}
        onClose={() => setSaveSuccessDialogOpen(false)}
        aria-labelledby="save-dialog-title"
        aria-describedby="save-dialog-description"
        maxWidth="sm"
        fullWidth
        sx={{ zIndex: 1400 }}
      >
        <DialogTitle id="save-dialog-title">Save Complete</DialogTitle>
        <DialogContent>
          <DialogContentText id="save-dialog-description">
            Your work has been saved successfully.
            You can continue editing or return to the home screen.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveSuccessDialogOpen(false)} color="primary">
            Continue Editing
          </Button>
          <Button 
            onClick={() => {
              setSaveSuccessDialogOpen(false);
              navigate('/');
            }} 
            variant="contained"
            color="primary"
          >
            Go to Home
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Editor;