import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { 
  Download as DownloadIcon, 
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  DirectionsCar as CarIcon
} from '@mui/icons-material';
import Canvas, { CanvasRef } from '../components/Canvas';
import AssetSelector from '../components/AssetSelector';
import FormatSelector from '../components/FormatSelector';
import ExportDialog from '../components/ExportDialog';
import CarSalesContractEditor, { ContractData } from '../components/CarSalesContractEditor';
import QuotationEditor, { QuotationData } from '../components/QuotationEditor';
import PurchaseOrderEditor, { PurchaseOrderData } from '../components/PurchaseOrderEditor';
import { Template, FormatOption, BrandAsset, RecentWork } from '../types';
import { getTemplatesByCategory } from '../data/templates';
import { getFormatsByCategory } from '../data/formats';
import { 
  UnifiedFormat, 
  convertToTemplate,
  getTemplatesByFormatGroup,
  getUniqueFormatsByCategory 
} from '../data/unifiedFormats';
import { getDefaultLogo, getDefaultVehicle, getDefaultBackground } from '../data/brandPresets';
import { vehicleColors, getVehicleImageUrl, VehicleColor } from '../data/vehicleColors';
import { VehicleModel, getVehicleModelById, getDefaultColorForModel } from '../data/vehicleModels';

const categoryMap: Record<string, string> = {
  'document': 'Document',
  'banner': 'Google Ads',
  'sns': 'SNS',
};

// Template Preview Component
const TemplatePreview: React.FC<{ variant: UnifiedFormat }> = ({ variant }) => {
  // Get actual layout from variant
  const vehicleImage = variant.editableElements.images.find(img => img.id === 'vehicle');
  const centerLogoImage = variant.editableElements.images.find(img => img.id === 'centerLogo');
  
  // Find overlay object for positioning
  const vehicleObj = variant.canvas.objects?.find((obj: any) => obj.id === 'vehicle') as any;
  const titleObj = variant.canvas.objects?.find((obj: any) => obj.id === 'title') as any;
  const centerLogoObj = variant.canvas.objects?.find((obj: any) => obj.id === 'centerLogo') as any;
  
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
            fontSize: '14px',
            fontWeight: 'bold',
            whiteSpace: 'pre-line',
            textAlign: titleObj.textAlign || 'left',
          }}
        >
          Text
        </Box>
      )}
      
      {/* Center Logo for center variant */}
      {variant.templateVariant === 'center' && centerLogoImage && centerLogoObj && (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${(centerLogoObj.width / variant.canvas.width) * 100}%`,
            height: `${(centerLogoObj.height / variant.canvas.height) * 100}%`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box 
            sx={{ 
              fontSize: '10px',
              color: 'rgba(0, 0, 0, 0.5)',
              fontWeight: 'bold',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              padding: '4px 8px',
              borderRadius: '2px',
            }}
          >
            LOGO
          </Box>
        </Box>
      )}
      
      {/* Vehicle Image */}
      {vehicleImage && vehicleObj && variant.templateVariant !== 'center' && (
        <Box
          sx={{
            position: 'absolute',
            left: variant.formatGroup === 'banner-horizontal' && variant.templateVariant === 'default'
              ? `${((vehicleObj.left - 10) / variant.canvas.width) * 100}%`
              : `${(vehicleObj.left / variant.canvas.width) * 100}%`,
            top: variant.formatGroup === 'banner-horizontal' && variant.templateVariant === 'default'
              ? `${((vehicleObj.top - 10) / variant.canvas.height) * 100}%`
              : `${(vehicleObj.top / variant.canvas.height) * 100}%`,
            width: `${(vehicleObj.width / variant.canvas.width) * 100}%`,
            height: `${(vehicleObj.height / variant.canvas.height) * 100}%`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CarIcon 
            sx={{ 
              fontSize: `${Math.min(vehicleObj.width, vehicleObj.height) / variant.canvas.width * 750}%`,
              color: 'rgba(0, 0, 0, 0.3)'
            }} 
          />
        </Box>
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
  const [contractData, setContractData] = useState<ContractData>({
    registrationNumber: '',
    modelName: '',
    year: '',
    vin: '',
    salesPrice: '',
    paymentTerms: '',
    sellerName: '',
    sellerAddress: '',
    sellerContact: '',
    buyerName: '',
    buyerAddress: '',
    buyerContact: '',
    agreementDate: new Date().toISOString().split('T')[0],
  });
  
  const [quotationData, setQuotationData] = useState<QuotationData>({
    modelName: '',
    year: '',
    vin: '',
    registrationNumber: '',
    mileage: '',
    fuelTransmission: '',
    basePrice: '',
    vat: '',
    optionalFeatures: '',
    registrationFees: '',
    deliveryCharges: '',
    totalPrice: '',
    validUntil: new Date().toISOString().split('T')[0],
    dealerCompanyName: '',
    dealerAddress: '',
    dealerContactPerson: '',
    dealerPhone: '',
    dealerEmail: '',
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerEmail: '',
    issueDate: new Date().toISOString().split('T')[0],
  });
  
  const [purchaseOrderData, setPurchaseOrderData] = useState<PurchaseOrderData>({
    // Order Information
    poNumber: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryLocation: '',
    paymentTerms: '',
    shippingMethod: '',
    
    // Vehicle Items
    items: [],
    
    // Price Summary
    subtotal: '',
    tax: '',
    shippingHandling: '',
    totalAmount: '',
    
    // Special Instructions
    specialInstructions: '',
    
    // Buyer Information
    buyerCompany: '',
    buyerDepartment: '',
    buyerAddress: '',
    buyerContactPerson: '',
    buyerPhone: '',
    buyerEmail: '',
  });
  const [assetSelectorOpen, setAssetSelectorOpen] = useState(false);
  const [currentEditingElement, setCurrentEditingElement] = useState<string | null>(null);
  const [formatSelectorOpen, setFormatSelectorOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [saveSuccessDialogOpen, setSaveSuccessDialogOpen] = useState(false);
  const [availableTemplateVariants, setAvailableTemplateVariants] = useState<UnifiedFormat[]>([]);
  const [selectedTemplateVariant, setSelectedTemplateVariant] = useState<string>('default');
  const [selectedVehicleColor, setSelectedVehicleColor] = useState<string>('snow-white-pearl');
  const [showDealerInfo, setShowDealerInfo] = useState<boolean>(true); // 기본값 true
  const canvasRef = useRef<CanvasRef>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

useEffect(() => {
  console.log(template);
}, [template]);

// 차량 색상 초기화 및 동기화
useEffect(() => {
  // vehicle 이미지 요소가 있는지 확인
  const vehicleElement = template?.editableElements.images.find(img => img.id === 'vehicle' || img.label === 'Vehicle Model');
  
  if (vehicleElement) {
    // 현재 선택된 차량과 색상 확인
    const selectedVehicle = editableValues[vehicleElement.id] as BrandAsset;
    const vehicleColorId = editableValues[`${vehicleElement.id}_color`];
    
    if (selectedVehicle && !vehicleColorId) {
      // 차량은 선택되었지만 색상이 없으면 기본 색상 설정
      const defaultColor = getDefaultColorForModel(selectedVehicle.id);
      if (defaultColor) {
        console.log('Setting default color for vehicle:', selectedVehicle.name, 'Color:', defaultColor.displayName);
        setSelectedVehicleColor(defaultColor.id);
        setEditableValues(prev => ({
          ...prev,
          [`${vehicleElement.id}_color`]: defaultColor.id
        }));
        // 자동 저장
        debouncedSave(1000);
      }
    } else if (selectedVehicle && vehicleColorId) {
      // 선택된 차량 모델의 색상이 유효한지 확인
      const vehicleModel = getVehicleModelById(selectedVehicle.id);
      const isValidColor = vehicleModel?.availableColors.some(color => color.id === vehicleColorId);
      
      if (isValidColor) {
        setSelectedVehicleColor(vehicleColorId);
      } else {
        // 유효하지 않은 색상이면 기본 색상으로 변경
        const defaultColor = getDefaultColorForModel(selectedVehicle.id);
        if (defaultColor) {
          console.log('Invalid color, setting default:', defaultColor.displayName);
          setSelectedVehicleColor(defaultColor.id);
          setEditableValues(prev => ({
            ...prev,
            [`${vehicleElement.id}_color`]: defaultColor.id
          }));
          debouncedSave(1000);
        }
      }
    }
  }
}, [template?.id, editableValues.vehicle?.id]); // 의존성을 더 구체적으로 변경

// 딜러 정보 토글 상태 동기화
useEffect(() => {
  if (editableValues['showDealerInfo'] !== undefined) {
    setShowDealerInfo(editableValues['showDealerInfo']);
  }
}, [editableValues['showDealerInfo']]);

  useEffect(() => {
    // 카테고리에 따른 포맷과 템플릿 로드
    if (categoryId) {
      const category = categoryMap[categoryId];
      if (category) {
        setCurrentCategory(category);
        const categoryFormats = getFormatsByCategory(category);
        const categoryTemplates = getTemplatesByCategory(category);
        
        // location.state에서 work 데이터 확인 (최근 작업에서 편집하는 경우)
        if (location.state?.work) {
          const work = location.state.work as RecentWork;
          console.log('Loading work from Recent Works:', {
            workId: work.id,
            templateId: work.templateId,
            category: work.category,
            data: work.data
          });
          
          // 먼저 기존 템플릿 시스템에서 찾기
          const workTemplate = categoryTemplates.find(t => t.id === work.templateId);
          
          if (workTemplate) {
            // 기존 템플릿 시스템에서 찾은 경우
            setTemplate(workTemplate);
            setEditableValues(work.data || {});
            console.log('Work loaded successfully with existing template system');
          } else {
            // 기존 시스템에서 못 찾은 경우에만 통합 포맷 시스템에서 찾기
            const allFormats = getUniqueFormatsByCategory(category);
            let foundFormat: UnifiedFormat | null = null;
            
            // templateId로 직접 찾기
            for (const format of allFormats) {
              if (format.formatGroup) {
                const variants = getTemplatesByFormatGroup(format.formatGroup);
                const matchingVariant = variants.find(v => v.id === work.templateId);
                if (matchingVariant) {
                  foundFormat = matchingVariant;
                  break;
                }
              } else if (format.id === work.templateId) {
                foundFormat = format;
                break;
              }
            }
            
            if (foundFormat) {
              console.log('Found matching format in unified system:', foundFormat.id);
              
              // 포맷 그룹이 있는 경우 변형들 로드
              if (foundFormat.formatGroup) {
                const variants = getTemplatesByFormatGroup(foundFormat.formatGroup);
                setAvailableTemplateVariants(variants);
                setSelectedTemplateVariant(foundFormat.templateVariant || 'default');
              }
              
              const convertedTemplate = convertToTemplate(foundFormat);
              setTemplate(convertedTemplate);
              
              // 저장된 데이터 복원
              setEditableValues(work.data || {});
              console.log('Work loaded successfully with unified format system');
            } else {
              console.error('Could not find template for work:', work.templateId);
              // 템플릿을 찾을 수 없는 경우 포맷 선택 다이얼로그 표시
              setFormatSelectorOpen(true);
            }
          }
        } else if (location.state?.selectedFormat) {
          // 홈에서 선택된 통합 포맷이 있는 경우
          const selectedUnifiedFormat = location.state.selectedFormat as UnifiedFormat;
          
          console.log('Selected format from Home:', {
            id: selectedUnifiedFormat.id,
            name: selectedUnifiedFormat.name,
            formatGroup: selectedUnifiedFormat.formatGroup,
            templateVariant: selectedUnifiedFormat.templateVariant,
            dimensions: selectedUnifiedFormat.dimensions
          });
          
          // 해당 포맷 그룹의 모든 템플릿 변형 로드
          if (selectedUnifiedFormat.formatGroup) {
            console.log('Getting templates for format group:', selectedUnifiedFormat.formatGroup);
            const variants = getTemplatesByFormatGroup(selectedUnifiedFormat.formatGroup);
            console.log('Found variants:', variants.length);
            console.log('Variants details:', variants.map(v => ({ 
              id: v.id, 
              name: v.name, 
              formatGroup: v.formatGroup,
              templateVariant: v.templateVariant,
              dimensions: v.dimensions
            })));
            
            setAvailableTemplateVariants(variants);
            // 기본적으로 default 템플릿 선택
            const defaultVariant = variants.find(v => v.templateVariant === 'default') || selectedUnifiedFormat;
            console.log('Selected default variant:', {
              id: defaultVariant.id,
              formatGroup: defaultVariant.formatGroup,
              templateVariant: defaultVariant.templateVariant
            });
            
            setSelectedTemplateVariant(defaultVariant.templateVariant || 'default');
            
            const convertedTemplate = convertToTemplate(defaultVariant);
            console.log('Converted template:', {
              id: convertedTemplate.id,
              name: convertedTemplate.name,
              format: convertedTemplate.format
            });
            
            setTemplate(convertedTemplate);
            
            // 초기 편집 가능 값 설정
            const initialValues: Record<string, any> = {};
            
            // 기존 editableValues가 있는지 확인 (Change Format 후 재실행되는 경우)
            const hasExistingValues = Object.keys(editableValues).length > 0;
            
            convertedTemplate.editableElements.texts.forEach((text) => {
              // 기존 값이 있으면 사용, 없으면 기본값 사용
              if (hasExistingValues && editableValues[text.id]) {
                initialValues[text.id] = editableValues[text.id];
              } else {
                // Google Ads의 경우 특별한 기본값 사용
                if (currentCategory === 'Google Ads') {
                  if (text.id === 'title' && text.type === 'heading') {
                    initialValues[text.id] = 'Your Journey Starts Here';
                  } else if (text.id === 'subtitle' && text.type === 'subheading') {
                    initialValues[text.id] = 'Upgrade Your Ride, Elevate Your Drive!';
                  } else if (text.id === 'dealerName') {
                    initialValues[text.id] = 'Dealer name';
                  } else if (text.id === 'dealerPhone') {
                    initialValues[text.id] = '010-1234-5678';
                  } else {
                    initialValues[text.id] = text.text || '';
                  }
                } else {
                  initialValues[text.id] = text.text || '';
                }
              }
            });
            
            convertedTemplate.editableElements.images.forEach((image) => {
              // 기존 값이 있으면 유지
              if (hasExistingValues && editableValues[image.id]) {
                initialValues[image.id] = editableValues[image.id];
              } else {
                // 없으면 기본 이미지 설정
                if (image.id === 'vehicle' || image.label === 'Vehicle Model') {
                  const defaultVehicle = getDefaultVehicle();
                  initialValues[image.id] = defaultVehicle;
                  // 기본 차량 색상도 항상 설정 (기존 값이 없을 때)
                  const defaultColor = getDefaultColorForModel(defaultVehicle.id);
                  initialValues[`${image.id}_color`] = defaultColor?.id || 'snow-white-pearl';
                  console.log('Setting default vehicle and color:', defaultVehicle.name, defaultColor?.displayName);
                } 
                else if (image.id === 'background' || image.id === 'bg-image' || image.label === 'Background Image') {
                  initialValues[image.id] = getDefaultBackground();
                } 
                else if (image.id === 'centerLogo' || image.label === 'Center Logo') {
                  initialValues[image.id] = getDefaultLogo();
                }
                else {
                  initialValues[image.id] = image.src || '';
                }
              }
            });
            
            // 로고 이미지도 기존 값 유지 또는 기본값 설정
            initialValues['brandLogo'] = (hasExistingValues && editableValues['brandLogo']) ? editableValues['brandLogo'] : getDefaultLogo();
            
            // 딜러 정보 표시 토글 상태 설정
            initialValues['showDealerInfo'] = (hasExistingValues && editableValues['showDealerInfo'] !== undefined) ? editableValues['showDealerInfo'] : true;
            
            setEditableValues(initialValues);
          } else {
            // formatGroup이 없는 경우 기존 방식대로 처리
            const convertedTemplate = convertToTemplate(selectedUnifiedFormat);
            setTemplate(convertedTemplate);
            // setSelectedFormat is not needed anymore
            
            // 초기 편집 가능 값 설정
            const initialValues: Record<string, any> = {};
            
            // 기존 editableValues가 있는지 확인 (Change Format 후 재실행되는 경우)
            const hasExistingValues = Object.keys(editableValues).length > 0;
            
            convertedTemplate.editableElements.texts.forEach((text) => {
              // 기존 값이 있으면 사용, 없으면 기본값 사용
              if (hasExistingValues && editableValues[text.id]) {
                initialValues[text.id] = editableValues[text.id];
              } else {
                // Google Ads의 경우 특별한 기본값 사용
                if (currentCategory === 'Google Ads') {
                  if (text.id === 'title' && text.type === 'heading') {
                    initialValues[text.id] = 'Your Journey Starts Here';
                  } else if (text.id === 'subtitle' && text.type === 'subheading') {
                    initialValues[text.id] = 'Upgrade Your Ride, Elevate Your Drive!';
                  } else if (text.id === 'dealerName') {
                    initialValues[text.id] = 'Dealer name';
                  } else if (text.id === 'dealerPhone') {
                    initialValues[text.id] = '010-1234-5678';
                  } else {
                    initialValues[text.id] = text.text || '';
                  }
                } else {
                  initialValues[text.id] = text.text || '';
                }
              }
            });
            
            convertedTemplate.editableElements.images.forEach((image) => {
              // 기존 값이 있으면 유지
              if (hasExistingValues && editableValues[image.id]) {
                initialValues[image.id] = editableValues[image.id];
              } else {
                // 없으면 기본 이미지 설정
                if (image.id === 'vehicle' || image.label === 'Vehicle Model') {
                  const defaultVehicle = getDefaultVehicle();
                  initialValues[image.id] = defaultVehicle;
                  // 기본 차량 색상도 항상 설정 (기존 값이 없을 때)
                  const defaultColor = getDefaultColorForModel(defaultVehicle.id);
                  initialValues[`${image.id}_color`] = defaultColor?.id || 'snow-white-pearl';
                  console.log('Setting default vehicle and color:', defaultVehicle.name, defaultColor?.displayName);
                } 
                else if (image.id === 'background' || image.id === 'bg-image' || image.label === 'Background Image') {
                  initialValues[image.id] = getDefaultBackground();
                } 
                else if (image.id === 'centerLogo' || image.label === 'Center Logo') {
                  initialValues[image.id] = getDefaultLogo();
                }
                else {
                  initialValues[image.id] = image.src || '';
                }
              }
            });
            
            // 로고 이미지 기본값 설정 - 항상 프리셋 로고 사용
            initialValues['brandLogo'] = (hasExistingValues && editableValues['brandLogo']) ? editableValues['brandLogo'] : getDefaultLogo();
            
            // 딜러 정보 표시 토글 상태 설정
            initialValues['showDealerInfo'] = (hasExistingValues && editableValues['showDealerInfo'] !== undefined) ? editableValues['showDealerInfo'] : true;
            
            setEditableValues(initialValues);
          }
        } else if (!template) {
          // 포맷 선택 다이얼로그 열기
          setFormatSelectorOpen(true);
        }
      }
    }
  }, [categoryId, location.state]);



  const handleTextChange = (elementId: string, value: string) => {
    setEditableValues((prev) => ({
      ...prev,
      [elementId]: value,
    }));
    
    // 텍스트 변경 시 더 긴 디바운스 시간으로 자동 저장
    debouncedSave(3000); // 3초 디바운스
  };

  const handleDealerInfoToggle = (checked: boolean) => {
    setShowDealerInfo(checked);
    setEditableValues((prev) => ({
      ...prev,
      showDealerInfo: checked,
    }));
    
    // 토글 변경 시 자동 저장
    debouncedSave(1000); // 1초 디바운스
  };

  // 템플릿 변형 변경 핸들러
  const handleTemplateVariantChange = (variant: UnifiedFormat) => {
    const variantType: string = variant.templateVariant || 'default';
    setSelectedTemplateVariant(variantType);
    const convertedTemplate = convertToTemplate(variant);
    setTemplate(convertedTemplate);
    
    // 기존 편집 값을 유지하면서 템플릿만 변경
    const currentValues = { ...editableValues };
    
    // 차량 이미지가 없는 center 템플릿인 경우 vehicle 이미지 제거
    if (variantType === 'center') {
      // Center Text로 변경할 때만 차량 이미지를 제거하되, 어딘가에 임시 저장
      if (currentValues['vehicle']) {
        // 나중에 복원할 수 있도록 임시 저장
        currentValues['_previousVehicle'] = currentValues['vehicle'];
        delete currentValues['vehicle'];
      }
    } else if (!currentValues['vehicle'] && variantType !== 'center') {
      // center에서 다른 템플릿으로 변경 시
      if (currentValues['_previousVehicle']) {
        // 이전에 저장된 차량 이미지가 있으면 복원
        currentValues['vehicle'] = currentValues['_previousVehicle'];
        delete currentValues['_previousVehicle'];
      } else {
        // 없으면 기본 차량 이미지 추가
        currentValues['vehicle'] = getDefaultVehicle();
      }
    }
    
    setEditableValues(currentValues);
  };

  const [assetFilterCategory, setAssetFilterCategory] = useState<string | undefined>(undefined);
  
  const handleImageSelect = (elementId: string) => {
    setCurrentEditingElement(elementId);
    
    // Handle signature upload separately
    if (elementId === 'sellerSignature') {
      console.log('Editor: Opening file picker for Signature');
      // Create a temporary file input
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const signatureAsset: BrandAsset = {
              id: `signature-${Date.now()}`,
              name: file.name,
              type: 'image',
              url: event.target?.result as string,
              thumbnailUrl: event.target?.result as string,
              category: 'Signature',
              uploadedAt: new Date(),
              fileSize: file.size,
              dimensions: { width: 200, height: 100 },
            };
            setEditableValues((prev) => ({
              ...prev,
              sellerSignature: signatureAsset,
            }));
          };
          reader.readAsDataURL(file);
        }
      };
      fileInput.click();
      return;
    }
    
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
      setEditableValues((prev) => {
        const newValues = {
          ...prev,
          [currentEditingElement]: asset,
        };
        
        // 차량 모델을 변경하는 경우, 해당 모델의 기본 색상으로 변경
        if (currentEditingElement === 'vehicle' || 
            template?.editableElements.images.find(img => img.id === currentEditingElement)?.label === 'Vehicle Model') {
          const vehicleModel = getVehicleModelById(asset.id);
          if (vehicleModel) {
            const defaultColor = getDefaultColorForModel(asset.id);
            if (defaultColor) {
              newValues[`${currentEditingElement}_color`] = defaultColor.id;
              // 상태 즉시 업데이트
              setTimeout(() => {
                setSelectedVehicleColor(defaultColor.id);
              }, 0);
              console.log('Vehicle model changed to:', vehicleModel.name, 'Default color:', defaultColor.displayName);
            }
          }
        }
        
        return newValues;
      });
      
      // 이미지 변경 시 자동 저장 (즉시)
      debouncedSave(1000); // 1초 디바운스
    }
    setAssetSelectorOpen(false);
    setCurrentEditingElement(null);
  };

  const handleCanvasTextEdit = (elementId: string, value: string) => {
    setEditableValues((prev) => ({
      ...prev,
      [elementId]: value,
    }));
    
    // 캔버스에서 텍스트 편집 시 자동 저장
    debouncedSave(3000); // 3초 디바운스
  };

  const handleCanvasImageEdit = (elementId: string) => {
    // Handle signature click from canvas
    if (elementId === 'sellerSignature') {
      handleImageSelect(elementId);
      return;
    }
    
    setCurrentEditingElement(elementId);
    
    // Set filter category based on image element label or ID
    if (elementId === 'brandLogo') {
      console.log('Editor (Canvas): Setting filter to Logos');
      setAssetFilterCategory('Logo');
    } else if (elementId === 'centerLogo' && template?.category === 'Google Ads') {
      // Google Ads의 Center Logo 레이아웃에서 로고 클릭 시 Logo 카테고리만 필터링
      console.log('Editor (Canvas): Setting filter to Logo for Google Ads Center Logo');
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
  
  // 디바운스된 자동 저장 함수
  const debouncedSave = useCallback((delay: number = 2000) => {
    // 이전 timeout 취소
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // 새로운 timeout 설정
    saveTimeoutRef.current = setTimeout(() => {
      saveCurrentWork();
    }, delay);
  }, []);

  // 실제 저장 작업을 수행하는 함수
  const saveCurrentWork = useCallback(async () => {
    if (!template || !canvasRef.current) return;
    
    try {
      // 썸네일 생성을 위해 낮은 품질로 export
      const thumbnailData = await canvasRef.current.exportCanvas('jpg', 20);
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
      localStorage.setItem('recentWorks', JSON.stringify(filteredWorks.slice(0, 10))); // 최대 10개만 유지
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [template, editableValues]);
  
  // 컴포넌트 언마운트 시 pending timeout 정리
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleExport = async (format: string, quality: number, fileName: string) => {
    if (!canvasRef.current || !template) return;
    
    const dataUrl = await canvasRef.current.exportCanvas(format, quality);
    
    if (!dataUrl) {
      alert('Failed to export. Please try again.');
      return;
    }
    
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

  const handleSave = async () => {
    console.log('handleSave called');
    console.log('template:', template);
    console.log('canvasRef.current:', canvasRef.current);
    
    if (!template || !canvasRef.current) {
      alert('Unable to save. Please make sure the template is loaded.');
      return;
    }

    try {
      console.log('Starting save process...');
      const workFromState = location.state?.work as RecentWork | undefined;
      
      console.log('Calling exportCanvas...');
      // 썸네일용으로 작은 크기의 이미지 생성 (0.3 = 30% 품질)
      const thumbnailData = await canvasRef.current.exportCanvas('jpg', 30);
      console.log('thumbnailData received:', thumbnailData ? 'yes' : 'no', 'length:', thumbnailData?.length);
      
      // Ensure category is valid for RecentWork type
      let validCategory: 'Document' | 'Google Ads' | 'Brochure' = 'Document';
      console.log('Current category:', currentCategory);
      console.log('Template category:', template.category);
      
      if (currentCategory === 'Document' || currentCategory === 'Google Ads' || currentCategory === 'Brochure') {
        validCategory = currentCategory;
      } else if (currentCategory === 'SNS') {
        // Map SNS to Google Ads as it's the closest match
        validCategory = 'Google Ads';
      } else {
        // Fallback to template category
        validCategory = template.category;
      }
      
      console.log('Valid category:', validCategory);
      
      const newWork: RecentWork = {
        id: workFromState?.id || Date.now().toString(),
        name: workFromState?.name || `${template.name} - ${new Date().toLocaleDateString('ko-KR')}`,
        thumbnail: thumbnailData || '',
        category: validCategory,
        templateId: template.id,
        lastModified: new Date(),
        canEdit: true,
        canDuplicate: true,
        canDelete: true,
        canRename: true,
        data: editableValues,
      };
      
      console.log('newWork object created:', newWork);
      
      // localStorage 정리 - 오래된 작업 삭제 및 샘플 데이터 제거
      try {
        const savedWorks = JSON.parse(localStorage.getItem('recentWorks') || '[]');
        console.log('Existing works count:', savedWorks.length);
        
        // 샘플 데이터 및 자동 저장 데이터 제거
        let filteredWorks = savedWorks.filter((work: RecentWork) => 
          !work.id.startsWith('sample-') && !work.id.startsWith('auto-')
        );
        
        // 최대 10개만 유지 (새 작업 포함하여 11개가 되도록)
        if (filteredWorks.length > 10) {
          // 날짜순으로 정렬 후 최신 10개만 유지
          filteredWorks = filteredWorks
            .sort((a: RecentWork, b: RecentWork) => 
              new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
            )
            .slice(0, 10);
        }
        
        const existingIndex = filteredWorks.findIndex((w: RecentWork) => w.id === newWork.id);
        
        if (existingIndex >= 0) {
          filteredWorks[existingIndex] = newWork;
        } else {
          filteredWorks.unshift(newWork);
        }
        
        console.log('Saving to localStorage...');
        localStorage.setItem('recentWorks', JSON.stringify(filteredWorks));
        console.log('Save completed successfully');
      } catch (storageError) {
        console.error('Storage error:', storageError);
        
        // 저장 공간이 부족한 경우 모든 작업 삭제 후 현재 작업만 저장
        try {
          console.log('Clearing all works and saving only current work...');
          localStorage.setItem('recentWorks', JSON.stringify([newWork]));
          console.log('Save completed after clearing storage');
        } catch (finalError) {
          console.error('Final storage error:', finalError);
          throw new Error('Unable to save due to storage limitations. Please clear your browser data.');
        }
      }
      
      // 저장 완료 다이얼로그 표시
      console.log('Setting dialog open to true');
      setSaveSuccessDialogOpen(true);
      
      // Force update to ensure dialog shows
      setTimeout(() => {
        console.log('Dialog state is:', saveSuccessDialogOpen);
      }, 0);
    } catch (error) {
      // 에러 발생 시 사용자에게 알림
      console.error('Save error details:', error);
      console.error('Error stack:', (error as Error).stack);
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
            Export
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
          {/* Document 포맷별 전용 에디터 사용 */}
          {template && template.format.id === 'doc-contract-a4' ? (
            <CarSalesContractEditor
              data={contractData}
              onChange={setContractData}
              onImageEdit={handleImageSelect}
              editableValues={editableValues}
            />
          ) : template && template.format.id === 'doc-quotation-a4' ? (
            <QuotationEditor
              data={quotationData}
              onChange={setQuotationData}
              onImageEdit={handleImageSelect}
              editableValues={editableValues}
            />
          ) : template && template.format.id === 'doc-purchase-order-a4' ? (
            <PurchaseOrderEditor
              data={purchaseOrderData}
              onChange={setPurchaseOrderData}
              onImageEdit={handleImageSelect}
              editableValues={editableValues}
            />
          ) : (
            /* 다른 템플릿의 경우 기존 편집 방식 사용 */
            template && (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {template?.category === 'Google Ads' ? 'Title' : 'Text Edit'}
                </Typography>
                {template.editableElements.texts
                  .filter((textElement) => {
                    // Google Ads에서 dealerName과 dealerPhone은 Information 섹션에서만 표시
                    if (template?.category === 'Google Ads' && 
                        (textElement.id === 'dealerName' || textElement.id === 'dealerPhone')) {
                      return false;
                    }
                    return true;
                  })
                  .map((textElement) => (
                    <TextField
                      key={textElement.id}
                      fullWidth
                      label={
                        textElement.type === 'heading' ? 'Title' :
                        textElement.type === 'subheading' ? 'Subtitle' : 'Body'
                      }
                      value={editableValues[textElement.id] || ''}
                      onChange={(e) => handleTextChange(textElement.id, e.target.value)}
                      multiline={true}
                      rows={
                        template?.category === 'Google Ads' && (textElement.type === 'heading' || textElement.type === 'subheading') ? 1 :
                        textElement.type === 'heading' ? 2 :
                        textElement.type === 'subheading' ? 2 : 4
                      }
                      maxRows={
                        template?.category === 'Google Ads' && (textElement.type === 'heading' || textElement.type === 'subheading') ? 1 : undefined
                      }
                      sx={
                        template?.category === 'Google Ads' && (textElement.type === 'heading' || textElement.type === 'subheading') ? {
                          '& .MuiInputBase-root': {
                            maxHeight: '56px',
                            overflow: 'auto'
                          }
                        } : {}
                      }
                    />
                  ))}
                
                <>
                  <Divider />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {template?.category === 'Google Ads' ? 'Image' : 'Image Edit'}
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
                    
                    {/* Vehicle Model 색상 선택기 */}
                    {(imageElement.id === 'vehicle' || imageElement.label === 'Vehicle Model') && template?.category === 'Google Ads' && editableValues[imageElement.id] && (() => {
                      const selectedVehicle = editableValues[imageElement.id] as BrandAsset;
                      const vehicleModel = selectedVehicle ? getVehicleModelById(selectedVehicle.id) : null;
                      const availableColors = (vehicleModel as VehicleModel)?.availableColors || [];
                      
                      console.log('Color UI Debug:', {
                        selectedVehicle: selectedVehicle?.id,
                        vehicleModel: vehicleModel?.name,
                        availableColorsCount: availableColors.length,
                        currentColor: editableValues[`${imageElement.id}_color`],
                        selectedVehicleColor: selectedVehicleColor,
                        availableColorIds: availableColors.map(c => c.id),
                        isSelectedColorValid: availableColors.some(c => c.id === selectedVehicleColor)
                      });
                      
                      // 차량 모델이 있고 색상이 있으면 UI 표시 (로딩 중에도 유지)
                      if (!selectedVehicle || availableColors.length === 0) return null;
                      
                      return (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'normal' }}>
                            Vehicle Color
                          </Typography>
                          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
                            {availableColors.map((color) => (
                            <Box
                              key={color.id}
                              onClick={() => {
                                setSelectedVehicleColor(color.id);
                                // editableValues에 선택된 색상 저장
                                setEditableValues(prev => ({
                                  ...prev,
                                  [`${imageElement.id}_color`]: color.id
                                }));
                              }}
                              sx={{
                                cursor: 'pointer',
                                border: (selectedVehicleColor === color.id || editableValues[`${imageElement.id}_color`] === color.id) ? '2px solid' : '1px solid',
                                borderColor: (selectedVehicleColor === color.id || editableValues[`${imageElement.id}_color`] === color.id) ? 'primary.main' : 'divider',
                                borderRadius: 1,
                                overflow: 'hidden',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderColor: 'primary.main',
                                  transform: 'scale(1.02)',
                                }
                              }}
                            >
                              <Box
                                sx={{
                                  width: '100%',
                                  height: 40,
                                  backgroundColor: color.colorCode,
                                  border: color.colorCode === '#FFFFFF' ? '1px solid #e0e0e0' : 'none',
                                }}
                              />
                              <Box sx={{ p: 1, textAlign: 'center' }}>
                                <Typography component="p" variant="caption" sx={{ fontSize: '10px', lineHeight: '1.2 !important' }}>
                                  {color.displayName}
                                </Typography>
                              </Box>
                            </Box>
                            ))}
                          </Box>
                        </Box>
                      );
                    })()}
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
              </>
            )
          )}

          {/* 템플릿 선택 섹션 - 템플릿 변형이 있는 경우 표시 */}
          {availableTemplateVariants.length > 0 && (
            <>
              <Divider />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Layout
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1 }}>
                {availableTemplateVariants
                  .filter((variant) => {
                    // vertical 포맷에서는 centerCar 제외
                    if (variant.formatGroup === 'banner-vertical' && variant.templateVariant === 'centerCar') {
                      return false;
                    }
                    return true;
                  })
                  .sort((a, b) => {
                    const order = ['default', 'centerCar', 'center'];
                    const aIndex = order.indexOf(a.templateVariant || 'default');
                    const bIndex = order.indexOf(b.templateVariant || 'default');
                    return aIndex - bIndex;
                  })
                  .map((variant) => (
                  <Box key={variant.id}
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
                          aspectRatio: variant.formatGroup === 'banner-vertical' 
                            ? (variant.dimensions.width / variant.dimensions.height) * 2  // 세로 폭을 2배 축소
                            : variant.dimensions.width / variant.dimensions.height,
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
                          {variant.templateVariant === 'default' && 'Default'}
                          {variant.templateVariant === 'center' && 'Center Logo'}
                          {variant.templateVariant === 'centerCar' && 'Center Car'}
                        </Typography>
                      </Box>
                    </Box>
                ))}
              </Box>
            </>
          )}

          {/* Information 섹션 - Google Ads일 때만 표시 */}
          {template?.category === 'Google Ads' && (
            <>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Information
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showDealerInfo}
                      onChange={(e) => handleDealerInfoToggle(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#1F7AFC',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#1F7AFC',
                        },
                      }}
                    />
                  }
                  label=""
                />
              </Box>
              {showDealerInfo && (
                <>
                  <TextField
                    fullWidth
                    label="Dealer Name"
                    value={editableValues['dealerName'] || 'Dealer name'}
                    onChange={(e) => handleTextChange('dealerName', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={editableValues['dealerPhone'] || '010-1234-5678'}
                    onChange={(e) => handleTextChange('dealerPhone', e.target.value)}
                  />
                </>
              )}
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
                // Square Banner의 경우 고정 크기 설정 (900x900)
                // Vertical Banner의 경우 고정 크기 설정 (720x900)
                width: template?.format?.id === 'banner-square' ? 900 : 
                       template?.format?.id === 'banner-vertical' ? 720 : 'fit-content',
                height: template?.format?.id === 'banner-square' ? 900 : 
                        template?.format?.id === 'banner-vertical' ? 900 : 'fit-content',
                backgroundColor: 'white',
                overflow: 'hidden', // Add overflow hidden
              }}
            >
              <Canvas
                ref={canvasRef}
                template={template}
                editableValues={editableValues}
                contractData={template.format.id === 'doc-contract-a4' ? contractData : undefined}
                quotationData={template.format.id === 'doc-quotation-a4' ? quotationData : undefined}
                purchaseOrderData={template.format.id === 'doc-purchase-order-a4' ? purchaseOrderData : undefined}
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
          console.log('Format selected from Change Format:', {
            id: format.id,
            name: format.name,
            formatGroup: format.formatGroup,
            templateVariant: format.templateVariant
          });
          
          // 해당 포맷 그룹의 모든 템플릿 변형 로드
          if (format.formatGroup) {
            const variants = getTemplatesByFormatGroup(format.formatGroup);
            console.log('Loading variants for format group:', format.formatGroup);
            console.log('Found variants:', variants.length);
            
            setAvailableTemplateVariants(variants);
            
            // 기본적으로 default 템플릿 선택
            const defaultVariant = variants.find(v => v.templateVariant === 'default') || format;
            setSelectedTemplateVariant(defaultVariant.templateVariant || 'default');
            
            const convertedTemplate = convertToTemplate(defaultVariant);
            setTemplate(convertedTemplate);
            // setSelectedFormat is not needed anymore
            
            // 기존 편집 값을 유지하면서 새 템플릿에 맞게 조정
            const initialValues: Record<string, any> = {};
            
            // 텍스트 값은 기존 값 유지 또는 새 템플릿의 기본값 사용
            convertedTemplate.editableElements.texts.forEach((text) => {
              // Promotion Banner의 경우 특별한 기본값 사용
              if (currentCategory === 'Google Ads') {
                if (text.id === 'title' && text.type === 'heading') {
                  initialValues[text.id] = editableValues[text.id] || 'Your Journey Starts Here';
                } else if (text.id === 'subtitle' && text.type === 'subheading') {
                  initialValues[text.id] = editableValues[text.id] || 'Upgrade Your Ride, Elevate Your Drive!';
                } else if (text.id === 'dealerName') {
                  initialValues[text.id] = editableValues[text.id] || 'Dealer name';
                } else if (text.id === 'dealerPhone') {
                  initialValues[text.id] = editableValues[text.id] || '010-1234-5678';
                } else {
                  initialValues[text.id] = editableValues[text.id] || text.text || '';
                }
              } else {
                initialValues[text.id] = editableValues[text.id] || text.text || '';
              }
            });
            
            // 이미지는 기존에 선택한 값 유지
            convertedTemplate.editableElements.images.forEach((image) => {
              // 기존에 선택한 이미지가 있으면 유지
              if (editableValues[image.id]) {
                initialValues[image.id] = editableValues[image.id];
              } else {
                // 없으면 기본 이미지 설정
                if (image.id === 'vehicle' || image.label === 'Vehicle Model') {
                  const defaultVehicle = getDefaultVehicle();
                  initialValues[image.id] = defaultVehicle;
                  // 기본 차량 색상도 항상 설정 (기존 값이 없을 때)
                  const defaultColor = getDefaultColorForModel(defaultVehicle.id);
                  initialValues[`${image.id}_color`] = defaultColor?.id || 'snow-white-pearl';
                  console.log('Setting default vehicle and color:', defaultVehicle.name, defaultColor?.displayName);
                } 
                else if (image.id === 'background' || image.id === 'bg-image' || image.label === 'Background Image') {
                  initialValues[image.id] = getDefaultBackground();
                } 
                else if (image.id === 'centerLogo' || image.label === 'Center Logo') {
                  initialValues[image.id] = getDefaultLogo();
                }
                else {
                  initialValues[image.id] = image.src || '';
                }
              }
            });
            
            // 로고 이미지도 기존 값 유지
            initialValues['brandLogo'] = editableValues['brandLogo'] || getDefaultLogo();
            
            // 딜러 정보 표시 토글 상태 설정
            initialValues['showDealerInfo'] = editableValues['showDealerInfo'] !== undefined ? editableValues['showDealerInfo'] : true;
            
            setEditableValues(initialValues);
          } else {
            // formatGroup이 없는 경우 기존 방식대로 처리
            const convertedTemplate = convertToTemplate(format);
            setTemplate(convertedTemplate);
            // setSelectedFormat is not needed anymore
            
            // 템플릿 변형 초기화
            setAvailableTemplateVariants([]);
            setSelectedTemplateVariant('default');
            
            // 기존 편집 값을 유지하면서 새 템플릿에 맞게 조정
            const initialValues: Record<string, any> = {};
            
            // 텍스트 값은 기존 값 유지 또는 새 템플릿의 기본값 사용
            convertedTemplate.editableElements.texts.forEach((text) => {
              // Promotion Banner의 경우 특별한 기본값 사용
              if (currentCategory === 'Google Ads') {
                if (text.id === 'title' && text.type === 'heading') {
                  initialValues[text.id] = editableValues[text.id] || 'Your Journey Starts Here';
                } else if (text.id === 'subtitle' && text.type === 'subheading') {
                  initialValues[text.id] = editableValues[text.id] || 'Upgrade Your Ride, Elevate Your Drive!';
                } else if (text.id === 'dealerName') {
                  initialValues[text.id] = editableValues[text.id] || 'Dealer name';
                } else if (text.id === 'dealerPhone') {
                  initialValues[text.id] = editableValues[text.id] || '010-1234-5678';
                } else {
                  initialValues[text.id] = editableValues[text.id] || text.text || '';
                }
              } else {
                initialValues[text.id] = editableValues[text.id] || text.text || '';
              }
            });
            
            // 이미지는 기존에 선택한 값 유지
            convertedTemplate.editableElements.images.forEach((image) => {
              // 기존에 선택한 이미지가 있으면 유지
              if (editableValues[image.id]) {
                initialValues[image.id] = editableValues[image.id];
              } else {
                // 없으면 기본 이미지 설정
                if (image.id === 'vehicle' || image.label === 'Vehicle Model') {
                  const defaultVehicle = getDefaultVehicle();
                  initialValues[image.id] = defaultVehicle;
                  // 기본 차량 색상도 항상 설정 (기존 값이 없을 때)
                  const defaultColor = getDefaultColorForModel(defaultVehicle.id);
                  initialValues[`${image.id}_color`] = defaultColor?.id || 'snow-white-pearl';
                  console.log('Setting default vehicle and color:', defaultVehicle.name, defaultColor?.displayName);
                } 
                else if (image.id === 'background' || image.id === 'bg-image' || image.label === 'Background Image') {
                  initialValues[image.id] = getDefaultBackground();
                } 
                else if (image.id === 'centerLogo' || image.label === 'Center Logo') {
                  initialValues[image.id] = getDefaultLogo();
                }
                else {
                  initialValues[image.id] = image.src || '';
                }
              }
            });
            
            // 로고 이미지도 기존 값 유지
            initialValues['brandLogo'] = editableValues['brandLogo'] || getDefaultLogo();
            
            // 딜러 정보 표시 토글 상태 설정
            initialValues['showDealerInfo'] = editableValues['showDealerInfo'] !== undefined ? editableValues['showDealerInfo'] : true;
            
            setEditableValues(initialValues);
          }
          
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