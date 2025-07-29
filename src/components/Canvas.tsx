import React, { useImperativeHandle, forwardRef, useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Template, BrandAsset } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ContractData } from './CarSalesContractEditor';
import { QuotationData } from './QuotationEditor';
import { PurchaseOrderData } from './PurchaseOrderEditor';
import Vehicle360View from './Vehicle360View';
import { getVehicleModelById, getVehicleColorForModel, getDefaultColorForModel } from '../data/vehicleModels';

interface CanvasProps {
  template: Template;
  editableValues: Record<string, any>;
  contractData?: ContractData;
  quotationData?: QuotationData;
  purchaseOrderData?: PurchaseOrderData;
  onTextEdit?: (elementId: string, currentValue: string) => void;
  onImageEdit?: (elementId: string) => void;
}

export interface CanvasRef {
  exportCanvas: (format: string, quality: number) => Promise<string>;
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(({ template, editableValues, contractData, quotationData, purchaseOrderData, onTextEdit, onImageEdit }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [recentlyDragged, setRecentlyDragged] = useState(false);
  const textColor = '#ffffff'; // Always white
  
  // Check if current template is Square or Vertical format
  const isSquareOrVertical = template.id?.includes('square') || template.id?.includes('vertical');

  useImperativeHandle(ref, () => ({
    exportCanvas: async (format: string, quality: number) => {
      console.log('Canvas exportCanvas called with format:', format, 'quality:', quality);
      if (!canvasRef.current) {
        console.error('canvasRef.current is null');
        return '';
      }
      
      try {
        console.log('Creating canvas with html2canvas...');
        console.log('Template canvas dimensions:', template.canvas.width, 'x', template.canvas.height);
        
        // 썸네일용인 경우 작은 크기로 생성
        const isThumbnail = format === 'jpg' && quality <= 30;
        const exportScale = isThumbnail ? 0.5 : 2; // 썸네일은 0.5배, 일반 내보내기는 2배
        
        // Store original transform
        const originalTransform = canvasRef.current.style.transform;
        
        console.log('Export adjustment check:', { 
          templateId: template.id, 
          isSquareOrVertical,
          currentScale: scale 
        });
        
        // Function to restore original state
        const restoreOriginalState = () => {
          canvasRef.current!.style.transform = originalTransform;
          canvasRef.current!.style.transformOrigin = (template.format.id === 'banner-square' || template.format.id === 'banner-vertical') ? 'top center' : 'center';
        };
        
        try {
          console.log('Creating canvas with html2canvas with scale compensation');
          
          // Hide 360-icon before export
          const iconElement = canvasRef.current.querySelector('img[src="/images/360-icon.png"]') as HTMLImageElement;
          const iconParent = iconElement?.parentElement as HTMLElement;
          if (iconParent) {
            iconParent.style.display = 'none';
          }
          
          // Use current canvas state but compensate for display scale in html2canvas options
          const canvas = await html2canvas(canvasRef.current, {
            scale: exportScale / scale, // Compensate for display scale
            backgroundColor: null,
            allowTaint: true,
            useCORS: true,
            width: template.canvas.width,
            height: template.canvas.height,
            logging: false,
            imageTimeout: 15000,
          });
          console.log('html2canvas completed, canvas:', canvas, 'compensated scale:', exportScale / scale);
          
          // Restore 360-icon after export
          if (iconParent) {
            iconParent.style.display = 'flex';
          }
          
          // Convert to requested format
          if (format === 'png') {
            return canvas.toDataURL('image/png');
          } else if (format === 'jpg' || format === 'jpeg') {
            return canvas.toDataURL('image/jpeg', quality / 100);
          } else if (format === 'pdf') {
            // Create PDF from canvas
            const imgData = canvas.toDataURL('image/png');
            
            // Calculate PDF dimensions in mm
            const pdfWidth = template.canvas.width * 0.264583; // pixels to mm (96 DPI)
            const pdfHeight = template.canvas.height * 0.264583;
            
            // Create PDF with custom dimensions
            const pdf = new jsPDF({
              orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
              unit: 'mm',
              format: [pdfWidth, pdfHeight]
            });
            
            // Add image to PDF
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            
            // Convert to data URL
            return pdf.output('dataurlstring');
          }
          
          return canvas.toDataURL('image/png');
        } catch (exportError) {
          console.error('Error during html2canvas export:', exportError);
          // Restore original state in case of error
          restoreOriginalState();
          throw exportError;
        }
      } catch (error) {
        console.error('Error exporting canvas:', error);
        return '';
      }
    }
  }));

  // Calculate scale to fit canvas in container
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // For Square and Vertical Banners, apply additional reduction to ensure it fits
        // Check multiple conditions to ensure we catch Square Banner
        const isSquareBanner = template.format?.id === 'banner-square' || 
                              template.id?.includes('banner-square') ||
                              template.name?.includes('Square') ||
                              (template.canvas.width === 1200 && template.canvas.height === 1200);
        
        // Check for Vertical Banner
        const isVerticalBanner = template.format?.id === 'banner-vertical' || 
                                template.id?.includes('banner-vertical') ||
                                template.name?.includes('Vertical') ||
                                (template.canvas.width === 960 && template.canvas.height === 1200);
        
        // Debug logging - more detailed
        console.log('Canvas Scale Debug:', {
          template: template,
          formatId: template.format?.id,
          formatName: template.format?.name,
          templateId: template.id,
          templateName: template.name,
          isSquareBanner,
          isVerticalBanner,
          canvasWidth: template.canvas.width,
          canvasHeight: template.canvas.height,
          containerWidth,
          containerHeight,
          currentScale: scale
        });
        
        let newScale;
        if (isSquareBanner) {
          // For square banners, we have a fixed 900x900 container
          // Canvas is 1200x1200, so scale = 900/1200 = 0.75
          newScale = 900 / 1200;
          console.log('Square Banner: Fixed scale', newScale);
        } else if (isVerticalBanner) {
          // For vertical banners, apply the same logic as square banners
          // Canvas is 960x1200, we want to fit it in a reasonable size
          // Using the same scale factor (0.75) for consistency
          newScale = 0.75;
          console.log('Vertical Banner: Fixed scale', newScale);
        } else {
          // Calculate scale based on canvas size (padding is handled by wrapper)
          const scaleX = containerWidth / template.canvas.width;
          const scaleY = containerHeight / template.canvas.height;
          newScale = Math.min(scaleX, scaleY, 1);
          console.log('Other formats: Calculated scale', newScale);
        }
        
        // Force scale update
        if (Math.abs(scale - newScale) > 0.001) {
          setScale(newScale);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    
    // Force update after a short delay to ensure container is properly rendered
    const timer = setTimeout(updateScale, 100);
    
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, [template.canvas.width, template.canvas.height, template.format?.id, template.id]);

  // Get background image
  const getBackgroundImage = () => {
    const bgElement = template.editableElements.images.find(
      img => img.id === 'background' || img.id === 'bg-image' || img.label === 'Background Image'
    );
    
    if (bgElement) {
      const value = editableValues[bgElement.id];
      if (value && typeof value === 'object' && (value as BrandAsset).url) {
        return (value as BrandAsset).url;
      }
      // Try to get from canvas objects
      const canvasObj = template.canvas.objects?.find((obj: any) => obj.type === 'image' && obj.id === bgElement.id) as any;
      return canvasObj?.src || bgElement.src;
    }
    
    return null;
  };

  // Get text value with placeholder
  const getTextValue = (elementId: string, type: string) => {
    // For Document templates, always show title from template
    if (template.category === 'Document' && elementId === 'title') {
      const canvasTextObj = template.canvas.objects?.find(
        (obj: any) => obj.type === 'text' && obj.id === 'title'
      ) as any;
      return canvasTextObj?.text || (editableValues[elementId] || 'Document Title');
    }
    
    // Special handling for car sales contract
    if (template.format.id === 'doc-contract-a4' && contractData) {
      return getContractText(elementId);
    }
    
    // Special handling for quotation
    if (template.format.id === 'doc-quotation-a4' && quotationData) {
      return getQuotationText(elementId);
    }
    
    // Special handling for purchase order
    if (template.format.id === 'doc-purchase-order-a4' && purchaseOrderData) {
      return getPurchaseOrderText(elementId);
    }
    
    const value = editableValues[elementId];
    if (value) return value;
    
    // Return placeholder
    return type === 'heading' ? 'Enter title here' : 
           type === 'subheading' ? 'Enter subtitle here' : 
           'Enter text here';
  };

  // Get contract text based on element ID
  const getContractText = (elementId: string): string => {
    if (!contractData) return '';
    
    // Helper function to render field value or underline
    const field = (value: string | undefined): string => {
      return value && value.trim() !== '' ? value : '_____';
    };
    
    // Helper function to format date
    const formatDate = (dateStr: string | undefined): string => {
      if (!dateStr || dateStr.trim() === '') return '_____ Year _____ Month _____ Day';
      
      try {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year} Year ${month} Month ${day} Day`;
      } catch (_e) {
        return '_____ Year _____ Month _____ Day';
      }
    };
    
    // Map element IDs to contract data - matching actual template IDs
    const textMappings: Record<string, string> = {
      'title': 'Car sales contract',
      'intro': 'This Car Sales Agreement is made and entered into by and between the seller (hereinafter referred to as "Party A") and the buyer (hereinafter referred to as "Party B") under the following terms and conditions.',
      'vehicle-info': `1. Vehicle Registration Number: ${field(contractData.registrationNumber)}
2. Vehicle Type and Model: ${field(contractData.modelName)}
3. Year of Manufacture: ${field(contractData.year)}
4. Vehicle Identification Number (VIN): ${field(contractData.vin)}

※ Vehicle mileage, accident history, flood damage status, etc., shall be provided in a separate confirmation document or vehicle inspection report.`,
      'price': `The sales price of the vehicle in Article 1, including value-added tax, is set at KRW ${field(contractData.salesPrice)} (₩${field(contractData.salesPrice)}).`,
      'payment-delivery': `1. Upon execution of this agreement, Party B shall pay the full amount specified in Article 2 to Party A in cash or by wire transfer, as mutually agreed.
2. The vehicle shall be delivered at the storage location (○○ Auto Repair Shop, ○○-dong, ○○ City, ○○ Province) at the responsibility of the buyer.

Payment terms: ${field(contractData.paymentTerms)}`,
      'agreement-date': `Date of Agreement: ${formatDate(contractData.agreementDate)}`,
      'party-a-info': `Address: ${field(contractData.sellerAddress)}
Name: ${field(contractData.sellerName)}
Contact: ${field(contractData.sellerContact)}
(Signature or Seal)`,
      'party-b-info': `Address: ${field(contractData.buyerAddress)}
Name: ${field(contractData.buyerName)}
Contact: ${field(contractData.buyerContact)}
(Signature or Seal)`
    };
    
    return textMappings[elementId] || '';
  };
  
  // Get quotation text based on element ID
  const getQuotationText = (elementId: string): string => {
    if (!quotationData) return '';
    
    // Helper function to render field value or underline
    const field = (value: string | undefined): string => {
      return value && value.trim() !== '' ? value : '_____';
    };
    
    // Helper function to format date
    const formatDate = (dateStr: string | undefined): string => {
      if (!dateStr || dateStr.trim() === '') return '_____ Year _____ Month _____ Day';
      
      try {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year} Year ${month} Month ${day} Day`;
      } catch (_e) {
        return '_____ Year _____ Month _____ Day';
      }
    };
    
    // Map element IDs to quotation data - matching actual template IDs
    const textMappings: Record<string, string> = {
      'title': 'Quotation',
      'vehicle-details': `1. Vehicle Type and Model: ${field(quotationData.modelName)}
2. Year of Manufacture: ${field(quotationData.year)}
3. Vehicle Identification Number (VIN): ${field(quotationData.vin)}
4. Vehicle Registration Number (if applicable): ${field(quotationData.registrationNumber)}
5. Mileage: ${field(quotationData.mileage)}
6. Fuel Type / Transmission: ${field(quotationData.fuelTransmission)}`,
      'quotation-summary': `1. Base Vehicle Price: KRW ${field(quotationData.basePrice)} (₩${field(quotationData.basePrice)})
2. Value-Added Tax (VAT): KRW ${field(quotationData.vat)} (₩${field(quotationData.vat)})
3. Optional Features / Add-ons: KRW ${field(quotationData.optionalFeatures)} (₩${field(quotationData.optionalFeatures)})
4. Registration Fees and Taxes: KRW ${field(quotationData.registrationFees)} (₩${field(quotationData.registrationFees)})
5. Delivery Charges (if any): KRW ${field(quotationData.deliveryCharges)} (₩${field(quotationData.deliveryCharges)})
6. Total Estimated Price: KRW ${field(quotationData.totalPrice)} (₩${field(quotationData.totalPrice)})`,
      'quotation-terms': `1. This quotation is valid until: ${formatDate(quotationData.validUntil)}
2. Final price may vary based on additional services or updated vehicle condition.
3. Vehicle availability is subject to prior sale.
4. This quotation does not constitute a binding agreement unless a formal contract is signed by both parties.`,
      'agreement-date': `Date of Agreement: ${formatDate(quotationData.issueDate)}`,
      'party-a-info': `Address: ${field(quotationData.dealerAddress)}
Name: ${field(quotationData.dealerContactPerson)}
Contact: ${field(quotationData.dealerPhone)}
(Signature or Seal)`,
      'party-b-info': `Address: ${field(quotationData.customerAddress)}
Name: ${field(quotationData.customerName)}
Contact: ${field(quotationData.customerPhone)}
(Signature or Seal)`,
      // 템플릿의 실제 ID들에 대한 매핑
      'quote-number': `Quotation #Q-2025-${field(quotationData.issueDate ? quotationData.issueDate.slice(5,7) : '01')}`,
      'quote-date': `Date: ${formatDate(quotationData.issueDate)}`,
      'valid-until': `Valid Until: ${formatDate(quotationData.validUntil)}`,
      'customer': `${field(quotationData.customerName)}
${field(quotationData.customerAddress)}
${field(quotationData.customerPhone)}
${field(quotationData.customerEmail)}`,
      'company': `${field(quotationData.dealerCompanyName)}
${field(quotationData.dealerAddress)}
${field(quotationData.dealerContactPerson)}
${field(quotationData.dealerPhone)}
${field(quotationData.dealerEmail)}`,
      'items': `Vehicle: ${field(quotationData.modelName)} (${field(quotationData.year)})
VIN: ${field(quotationData.vin)}
Registration: ${field(quotationData.registrationNumber)}
Mileage: ${field(quotationData.mileage)}
Type: ${field(quotationData.fuelTransmission)}

Optional Features: ${field(quotationData.optionalFeatures)}
Registration Fees: ${field(quotationData.registrationFees)}
Delivery Charges: ${field(quotationData.deliveryCharges)}`,
      'subtotal': `$${field(quotationData.basePrice)}`,
      'tax': `$${field(quotationData.vat)}`,
      'total': `$${field(quotationData.totalPrice)}`,
      'terms': `Terms & Conditions:
• Payment is due within 30 days
• Prices are subject to change without notice
• This quote is valid until ${field(quotationData.validUntil)}`
    };
    
    return textMappings[elementId] || '';
  };
  
  // Get purchase order text based on element ID
  const getPurchaseOrderText = (elementId: string): string => {
    if (!purchaseOrderData) return '';
    
    // Helper function to render field value or underline
    const field = (value: string | undefined): string => {
      return value && value.trim() !== '' ? value : '_____';
    };
    
    // Helper function to format date
    const formatDate = (dateStr: string | undefined): string => {
      if (!dateStr || dateStr.trim() === '') return '_____ Year _____ Month _____ Day';
      
      try {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year} Year ${month} Month ${day} Day`;
      } catch (_e) {
        return '_____ Year _____ Month _____ Day';
      }
    };
    
    
    // Calculate totals from items
    const calculateTotals = () => {
      let subtotal = 0;
      if (purchaseOrderData?.items && purchaseOrderData.items.length > 0) {
        purchaseOrderData.items.forEach(item => {
          const quantity = parseInt(item.quantity) || 0;
          const unitPrice = parseFloat(item.unitPrice) || 0;
          subtotal += quantity * unitPrice;
        });
      }
      const tax = subtotal * 0.1; // 10% tax
      const shipping = parseFloat(purchaseOrderData?.shippingHandling || '0') || 0;
      const total = subtotal + tax + shipping;
      
      return { subtotal, tax, shipping, total };
    };
    
    const { subtotal, tax, shipping, total } = calculateTotals();
    
    // Generate vehicle specifications table for the order-info section
    const generateVehicleTable = (): string => {
      if (!purchaseOrderData?.items || purchaseOrderData.items.length === 0) {
        return '';
      }
      
      // Create a simple text-based table
      let table = '';
      purchaseOrderData.items.forEach((item, index) => {
        const lineNumber = (index + 1).toString().padStart(3, '0');
        const quantity = parseInt(item.quantity) || 0;
        const unitPrice = parseFloat(item.unitPrice) || 0;
        const itemTotal = quantity * unitPrice;
        
        if (index > 0) table += '\n';
        table += `${lineNumber}     ${item.modelType.padEnd(15)}     ${item.color.padEnd(10)}     ${quantity.toString().padEnd(8)}     KRW ${unitPrice.toLocaleString().padEnd(12)}     KRW ${itemTotal.toLocaleString()}`;
      });
      
      return table;
    };
    
    // Map element IDs to purchase order data - matching actual template IDs
    const textMappings: Record<string, string> = {
      'title': 'Purchase Order',
      'order-info': `1. Purchase Order Number: ${field(purchaseOrderData.poNumber)}
2. Order Date: ${formatDate(purchaseOrderData.orderDate)}
3. Requested Delivery Date: ${formatDate(purchaseOrderData.deliveryDate)}
4. Delivery Location: ${field(purchaseOrderData.deliveryLocation)}
5. Payment Terms: ${field(purchaseOrderData.paymentTerms)}
6. Shipping Method: ${field(purchaseOrderData.shippingMethod)}

Vehicle Specifications:
Item No.     Model/Type          Color          Quantity     Unit Price          Total Price
${generateVehicleTable()}`,
      'price-summary': `Subtotal: KRW ${subtotal.toLocaleString()}
Tax (10%): KRW ${tax.toLocaleString()}
Shipping & Handling: KRW ${shipping.toLocaleString()}
Total Amount: KRW ${total.toLocaleString()}`,
      'terms': `1. All vehicles must meet the specifications listed above and comply with Korean safety standards.
2. Supplier shall provide all necessary documentation including certificates of origin and compliance.
3. Delivery must be completed by the requested date. Late delivery may result in penalties.
4. Payment will be made according to the payment terms specified above after satisfactory delivery.
5. Any defects must be reported within 7 days of delivery for replacement or refund.
6. This purchase order is subject to the buyer's standard terms and conditions.`,
      'special-instructions': purchaseOrderData?.specialInstructions || `1. Pre-delivery inspection required for all vehicles
2. Include all standard accessories and documentation
3. Vehicles must be delivered with protective covering
4. Additional requirements: _____________________`,
      'buyer-info': `Company Name: ${field(purchaseOrderData?.buyerCompany)}
Department: ${field(purchaseOrderData?.buyerDepartment)}
Address: ${field(purchaseOrderData?.buyerAddress)}
Contact Person: ${field(purchaseOrderData?.buyerContactPerson)}
Phone: ${field(purchaseOrderData?.buyerPhone)}
Email: ${field(purchaseOrderData?.buyerEmail)}
Authorized Signature: _____________________`,
      'note': 'Note: This purchase order becomes a binding contract upon supplier\'s written confirmation. Please confirm receipt and acceptance within 48 hours.'
    };
    
    return textMappings[elementId] || '';
  };

  const backgroundImage = getBackgroundImage();


  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden', // Square Banner는 Editor.tsx에서 overflow hidden 처리
      }}
    >
      {/* Canvas wrapper with scale */}
      <Box
        ref={canvasRef}
        data-canvas-clone="true"
        sx={{
          position: 'relative',
          width: template.canvas.width,
          height: template.canvas.height,
          transform: `scale(${scale})`,
          transformOrigin: (template.format.id === 'banner-square' || template.format.id === 'banner-vertical') ? 'top center' : 'center',
          backgroundColor: template.canvas.backgroundColor || '#ffffff',
          overflow: 'hidden',
          // Remove border for Square Banner
        }}
      >
        {/* Background image layer */}
        {backgroundImage && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1,
            }}
          />
        )}


        {/* Logo image layer - render logo from brandLogo if available */}
        {(() => {
          const logo = editableValues['brandLogo'];
          if (!logo) {
            console.log('No logo found in editableValues');
            return null;
          }
          
          // center 레이아웃에서는 상단 로고를 숨김 (centerLogo로 대체)
          const isCenterLayout = template.id?.includes('center') || 
                                template.name?.includes('Center') || 
                                template.editableElements.images.some(img => img.id === 'centerLogo');
          if (isCenterLayout) {
            return null;
          }
          
          // Default 레이아웃인지 확인
          const isDefaultLayout = template.name?.includes('Default') || template.id?.includes('default');
          console.log('Logo rendering info:', {
            formatId: template.format?.id,
            templateId: template.id,
            isDefaultLayout,
            category: template.category,
            logoUrl: (logo as BrandAsset).url,
            position: template.format?.id === 'banner-square' 
              ? `left: ${template.canvas.width - 140}, top: 20`
              : 'right: 20, top: 20',
            size: '120x60',
            canvasWidth: template.canvas.width
          });
          return (
          <Box
            data-element="brandLogo"
            onClick={() => onImageEdit && onImageEdit('brandLogo')}
            sx={{
              position: 'absolute',
              // Default 레이아웃인 경우 하단 좌측으로 배치, 그 외는 기존 위치 유지
              ...(isDefaultLayout && template.category === 'Google Ads'
                ? { left: 36, bottom: 20 }  // 하단 좌측 (30 + 16 = 46)
                : template.format.id === 'banner-square' 
                  ? { left: template.canvas.width - 150, top: 4 }  // 1200 - 150 = 1050 (10px 좌측), top: 4 (16px 위로)
                  : { right: 30, top: 4 }  // right: 30 (10px 좌측), top: 4 (16px 위로)
              ),
              width: isDefaultLayout && template.category === 'Google Ads' 
                ? (isSquareOrVertical ? 210 / 0.75 : 210) 
                : 120,
              height: isDefaultLayout && template.category === 'Google Ads' 
                ? (isSquareOrVertical ? 105 / 0.75 : 105) 
                : 60,
              cursor: 'pointer',
              zIndex: 10, // Increased z-index to ensure logo is always on top
              '&:hover': {
                filter: 'drop-shadow(0 0 10px rgba(31, 122, 252, 0.5))',
              }
            }}
          >
            {(editableValues['brandLogo'] as BrandAsset).url ? (
              <img 
                src={(editableValues['brandLogo'] as BrandAsset).url} 
                alt="Brand Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : null}
          </Box>
          );
        })()}

        {/* Vehicle/Product images layer */}
        {template.editableElements.images
          .filter(img => {
            // 배경 이미지 제외
            if (img.id === 'background' || img.id === 'bg-image' || img.label === 'Background Image') {
              return false;
            }
            // motif는 showMotif가 false일 때만 제외
            if (img.id === 'motif' && template.category === 'Google Ads' && editableValues['showMotif'] === false) {
              return false;
            }
            return true;
          })
          .map((imageElement) => {
            // Increase vehicle image size by scale factor based on format
            const isVehicleImage = imageElement.id === 'vehicle' || imageElement.label === 'Vehicle Model';
            const isCenterLogo = imageElement.id === 'centerLogo' || imageElement.label === 'Center Logo';
            
            // Apply consistent scale factors for all formats
            let scaleFactor = 1;
            if (isVehicleImage) {
              // Vehicle images: reduced scale for Square/Vertical formats
              // For Square/Vertical (0.75 scale): need 1.2 / 0.75 = 1.6x
              // For Horizontal (1.0 scale): need 1.2x
              scaleFactor = isSquareOrVertical ? 1.2 / 0.75 : 1.2;
            } else if (isCenterLogo) {
              // Center Logo images: compensate for canvas scale
              // For Square/Vertical (0.75 scale): need 1 / 0.75 = 1.33x
              // For Horizontal (1.0 scale): need 1x
              scaleFactor = isSquareOrVertical ? 1 / 0.75 : 1;
            }
            
            // centerLogo의 경우 brandLogo 값을 사용
            const imageId = isCenterLogo ? 'brandLogo' : imageElement.id;
            const value = editableValues[imageId];
            const canvasImgObj = template.canvas.objects?.find(
              (obj: any) => obj.type === 'image' && obj.id === imageElement.id
            ) as any;
            
            // 차량 이미지 디버깅
            if (isVehicleImage) {
              console.log('Vehicle Image Debug:', {
                imageElementId: imageElement.id,
                canvasImgObj: canvasImgObj,
                canvasObjLeft: canvasImgObj?.left,
                canvasObjTop: canvasImgObj?.top,
                canvasObjWidth: canvasImgObj?.width,
                canvasObjHeight: canvasImgObj?.height,
                imageElementPosition: imageElement.position,
                imageElementSize: imageElement.size,
                templateId: template.id,
                templateName: template.name,
                formatId: template.format?.id,
                scaleFactor: scaleFactor,
              });
            }
            
            const imageSrc = (value && typeof value === 'object' && (value as BrandAsset).url) 
                            ? (value as BrandAsset).url 
                            : canvasImgObj?.src || imageElement.src;
            
            // Vehicle 이미지인 경우 선택된 색상에 따라 필터만 적용 (이미지는 이미 선택된 모델 사용)
            let vehicleFilter = '';
            if (isVehicleImage && value) {
              const selectedColorId = editableValues[`${imageElement.id}_color`];
              const vehicleModel = getVehicleModelById((value as BrandAsset).id);
              
              if (vehicleModel && selectedColorId) {
                const color = getVehicleColorForModel(vehicleModel.id, selectedColorId);
                vehicleFilter = color?.filter || '';
              }
            }
            
            const size = {
              width: (canvasImgObj?.width || imageElement.size.width) * scaleFactor,
              height: (canvasImgObj?.height || imageElement.size.height) * scaleFactor,
            };
            
            // Add margins for vehicle images (right and bottom)
            const rightMargin = isVehicleImage ? 40 : 0;
            const bottomMargin = isVehicleImage ? 40 : 0;
            
            // Adjust position to ensure margins
            let adjustedLeft = canvasImgObj?.left || imageElement.position.x;
            let adjustedTop = canvasImgObj?.top || imageElement.position.y;
            
            // Center logo 처리 - 캔버스의 정중앙에 배치
            if (isCenterLogo) {
              // 캔버스의 정중앙에 로고 배치
              adjustedLeft = (template.canvas.width - size.width) / 2;
              adjustedTop = (template.canvas.height - size.height) / 2;
            }
            
            // Ensure the vehicle doesn't go beyond canvas bounds with margins
            if (isVehicleImage) {
              
              
              const maxLeft = template.canvas.width - size.width - rightMargin;
              const maxTop = template.canvas.height - size.height - bottomMargin;
              
              // Google Ads Horizontal 포맷에서만 차량 위치 제한을 완화
              const isGoogleAdsHorizontal = template.category === 'Google Ads' && 
                                          template.canvas.width === 1200 && 
                                          template.canvas.height === 628;
              
              if (!isGoogleAdsHorizontal) {
                adjustedLeft = Math.min(adjustedLeft, maxLeft);
                adjustedTop = Math.min(adjustedTop, maxTop);
              }
              
              // Center horizontally for vertical and square banner formats
              // Check both format id and canvas dimensions
              const isVerticalBanner = template.format.id === 'banner-vertical' || 
                                     (template.canvas.width === 960 && template.canvas.height === 1200);
              
              const isSquareBanner = template.format.id === 'banner-square' || 
                                   (template.canvas.width === 1200 && template.canvas.height === 1200);
              
              if (isVerticalBanner || isSquareBanner) {
                adjustedLeft = (template.canvas.width - size.width) / 2;
              }
            }
            
            const position = {
              left: adjustedLeft,
              top: adjustedTop,
            };
            
            // 차량 이미지 최종 위치 디버깅
            if (isVehicleImage) {
              console.log('Vehicle Final Position:', {
                finalLeft: position.left,
                finalTop: position.top,
                finalWidth: size.width,
                finalHeight: size.height,
                isVerticalBanner: template.format.id === 'banner-vertical' || (template.canvas.width === 960 && template.canvas.height === 1200),
              });
            }

            
            return (
              <Box
                key={imageElement.id}
                data-element={isVehicleImage ? 'vehicle' : imageElement.id}
                onClick={() => {
                  // 최근에 드래그했으면 클릭 이벤트 무시
                  if (recentlyDragged) {
                    setRecentlyDragged(false);
                    return;
                  }
                  onImageEdit && onImageEdit(imageElement.id);
                }}
                sx={{
                  position: 'absolute',
                  left: position.left,
                  top: position.top,
                  width: size.width,
                  height: size.height,
                  cursor: 'pointer',
                  zIndex: 2,
                  '&:hover': {
                    filter: 'drop-shadow(0 0 10px rgba(31, 122, 252, 0.5))',
                  }
                }}
              >
                {imageSrc ? (
                  // Google Ads의 차량 이미지는 360도 뷰 시도, 실패시 일반 이미지
                  isVehicleImage && template.category === 'Google Ads' && value ? (
                    <>
                      <Vehicle360View
                        vehicleId={(value as BrandAsset).id}
                        colorId={editableValues[`${imageElement.id}_color`] || getDefaultColorForModel((value as BrandAsset).id)?.id || 'snow-white-pearl'}
                        width={size.width}
                        height={size.height}
                        fallbackImage={imageSrc}
                        onDragEnd={() => setRecentlyDragged(true)}
                      />
                      {/* 360도 아이콘 */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 74,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 44,
                          height: 25,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10,
                          pointerEvents: 'none',
                          // 부드러운 전환 효과 추가
                          transition: 'opacity 0.3s ease',
                          // will-change로 렌더링 최적화
                          willChange: 'opacity',
                        }}
                      >
                        <img
                          src="/images/360-icon.png"
                          alt="360° View"
                          loading="eager" // 즉시 로딩
                          decoding="async" // 비동기 디코딩
                          style={{
                            width: 46 / (isSquareOrVertical ? 0.75 : 1),
                            height: 26 / (isSquareOrVertical ? 0.75 : 1),
                            opacity: 0.8,
                            filter: 'brightness(0) invert(1)', // 흰색으로 변경
                            // GPU 가속을 위한 transform 사용
                            transform: 'translateZ(0)',
                            // 안티앨리어싱 개선
                            imageRendering: 'crisp-edges',
                          }}
                        />
                      </Box>
                    </>
                  ) : (
                    <img 
                      src={imageSrc} 
                      alt={imageElement.label || 'Image'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        filter: vehicleFilter || undefined,
                      }}
                    />
                  )
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(245, 245, 245, 0.8)',
                      border: '2px dashed #ddd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: '#999', fontSize: 14 }}>
                      Select {imageElement.label || 'image'}
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}

        {/* Text elements layer - Stack layout for title and subtitle */}
        {(() => {
          // Group texts by type
          const titleElement = template.editableElements.texts.find(t => t.type === 'heading');
          const subtitleElement = template.editableElements.texts.find(t => t.type === 'subheading');
          const dealerNameElement = template.editableElements.texts.find(t => t.id === 'dealerName');
          const dealerPhoneElement = template.editableElements.texts.find(t => t.id === 'dealerPhone');
          const otherTexts = template.editableElements.texts.filter(t => 
            t.type !== 'heading' && 
            t.type !== 'subheading' && 
            t.id !== 'dealerName' && 
            t.id !== 'dealerPhone'
          );
          
          // If both title and subtitle exist, render them in a stack
          if (titleElement && subtitleElement) {
            const titleCanvasObj = template.canvas.objects?.find(
              (obj: any) => obj.type === 'text' && obj.id === titleElement.id
            ) as any;
            
            
            // Use title position as the base position for the stack
            // Adjust position based on layout type
            const isDefaultLayout =  template.id?.includes('centerCar') || template.id?.includes('default');
            
            let topAdjustment = 0;
            let leftAdjustment = 0;
            if (isDefaultLayout && template.category === 'Google Ads') {
                topAdjustment = -46; // Move up by 46px for default layout (30 + 16)
                leftAdjustment = -16; // Move left by 16px for default layout
            } else if (isDefaultLayout) {
                topAdjustment = -30; // Move up by 30px for default layout (non-promotion banners)
            }
            
            const stackPosition = {
              left: (titleCanvasObj?.left || titleElement.position.x) + leftAdjustment,
              top: (titleCanvasObj?.top || titleElement.position.y) + topAdjustment,
            };
            
            const textAlign = titleCanvasObj?.textAlign || 'left';
            const originX = titleCanvasObj?.originX || 'left';
            
            let maxWidth;
            if (textAlign === 'center' && originX === 'center') {
              maxWidth = template.canvas.width * 0.95;
            } else {
              maxWidth = template.canvas.width - (stackPosition.left * 2);
            }
            
            const stackBoxStyles: any = {
              position: 'absolute',
              left: textAlign === 'center' && originX === 'center' ? '50%' : stackPosition.left,
              top: stackPosition.top,
              transform: textAlign === 'center' && originX === 'center' ? 'translateX(-50%)' : 'none',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: isDefaultLayout && template.category === 'Google Ads' ? '-22px' : '8px', // Reduced gap for promotion banner default layout
            };
            
            if (textAlign === 'center' && originX === 'center') {
              stackBoxStyles.width = maxWidth;
            } else {
              stackBoxStyles.maxWidth = maxWidth;
            }
            
            return (
              <>
                {/* Stack container for title and subtitle */}
                <Box key="title-subtitle-stack" sx={stackBoxStyles}>
                  {/* Title */}
                  <Box
                    onClick={() => onTextEdit && onTextEdit(titleElement.id, editableValues[titleElement.id] || '')}
                    sx={{
                      cursor: 'text',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: titleCanvasObj?.fontSize || (template.format.id === 'banner-vertical' ? 46 : 52),
                        fontWeight: 'regular',
                        fontFamily: template.category === 'Google Ads' ? 'Kia Signature Fix OTF' : (titleCanvasObj?.fontFamily || 'Arial, sans-serif'),
                        color: editableValues[titleElement.id] ? 
                          (template.category === 'Document' ? '#000000' : '#ffffff') : 
                          (template.category === 'Document' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'),
                        lineHeight: titleCanvasObj?.lineHeight || 1.0,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        textShadow: template.category === 'Document' ? 'none' : '0 2px 4px rgba(0,0,0,0.3)',
                        letterSpacing: '0.5px',
                        textAlign: textAlign || 'left',
                      }}
                    >
                      {editableValues[titleElement.id] || ''}
                    </Typography>
                  </Box>
                  
                  {/* Subtitle */}
                  <Box
                    onClick={() => onTextEdit && onTextEdit(subtitleElement.id, editableValues[subtitleElement.id] || '')}
                    sx={{
                      cursor: 'text',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: titleCanvasObj?.fontSize ? titleCanvasObj.fontSize * 0.45 : 32,
                        fontWeight: '400',
                        fontFamily: template.category === 'Google Ads' ? 'Kia Signature Fix OTF' : (titleCanvasObj?.fontFamily || 'Arial, sans-serif'),
                        color: editableValues[subtitleElement.id] ? 
                          (template.category === 'Document' ? '#000000' : '#ffffff') : 
                          (template.category === 'Document' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'),
                        lineHeight: 0.4,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        textShadow: template.category === 'Document' ? 'none' : '0 2px 4px rgba(0,0,0,0.3)',
                        textAlign: textAlign || 'left',
                      }}
                    >
                      {editableValues[subtitleElement.id] || ''}
                    </Typography>
                  </Box>
                </Box>
                
                {/* Render other texts separately */}
                {otherTexts.map((textElement) => {
                  const value = editableValues[textElement.id] || textElement.text || '';
                  const displayText = getTextValue(textElement.id, textElement.type);
                  const isPlaceholder = !value;
                  
                  // Skip rendering if displayText is empty for Quotation/Purchase Order templates, but not for title
                  if ((template.format.id === 'doc-quotation-a4' || template.format.id === 'doc-purchase-order-a4') && 
                      textElement.id !== 'title' && (!displayText || displayText.trim() === '')) {
                    return null;
                  }
                  
                  const canvasTextObj = template.canvas.objects?.find(
                    (obj: any) => obj.type === 'text' && obj.id === textElement.id
                  ) as any;
                  
                  const position = {
                    left: canvasTextObj?.left || textElement.position.x,
                    top: canvasTextObj?.top || textElement.position.y,
                  };
                  
                  const fontSize = canvasTextObj?.fontSize || 18;
                  const fontWeight = canvasTextObj?.fontWeight || 'normal';
                  const fontFamily = template.category === 'Google Ads' ? 'Kia Signature Fix OTF' : (canvasTextObj?.fontFamily || 'Arial, sans-serif');
                  const color = isPlaceholder 
                    ? (template.category === 'Document' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)') 
                    : (template.category === 'Google Ads' ? '#ffffff' : 
                       template.category === 'Document' ? '#000000' : (canvasTextObj?.fill || '#ffffff'));
                  const textAlign = canvasTextObj?.textAlign || 'left';
                  const originX = canvasTextObj?.originX || 'left';
                  
                  const maxWidth = template.canvas.width - (position.left * 2);
                  
                  const boxStyles: any = {
                    position: 'absolute',
                    left: textAlign === 'center' && originX === 'center' ? '50%' : position.left,
                    top: position.top,
                    transform: textAlign === 'center' && originX === 'center' ? 'translateX(-50%)' : 'none',
                    cursor: 'text',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    zIndex: 3,
                    transition: 'all 0.2s ease',
                    maxWidth: maxWidth,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      transform: textAlign === 'center' && originX === 'center' 
                        ? 'translateX(-50%) translateY(-1px)' 
                        : 'translateY(-1px)',
                    }
                  };
                  
                  return (
                    <Box
                      key={textElement.id}
                      onClick={() => onTextEdit && onTextEdit(textElement.id, value)}
                      sx={boxStyles}
                    >
                      <Typography
                        sx={{
                          fontSize: fontSize,
                          fontWeight: fontWeight,
                          fontFamily: fontFamily,
                          color: color,
                          lineHeight: canvasTextObj?.lineHeight || 1.2,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          textShadow: template.category === 'Document' ? 'none' : '0 2px 4px rgba(0,0,0,0.3)',
                          textAlign: textAlign || 'left',
                        }}
                      >
                        {displayText || (textElement.id === 'title' && template.category === 'Document' ? 'Document Title' : '')}
                      </Typography>
                    </Box>
                  );
                })}
                
                {/* Dealer Information Stack for Google Ads - Center Logo 레이아웃에서는 숨김 */}
                {template.category === 'Google Ads' && dealerNameElement && dealerPhoneElement && 
                 editableValues['showDealerInfo'] !== false && 
                 !(template.id?.includes('center') || template.name?.includes('Center')) && (
                  <Box
                    key="dealer-info-stack"
                    sx={{
                      position: 'absolute',
                      right: 30, // 우측으로 16px 이동 (60 - 16 = 44)
                      bottom: 30, // 아래로 16px 이동 (50 - 16 = 34)
                      zIndex: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end', // 오른쪽 정렬
                      gap: '2px', // 간격 좁히기
                    }}
                  >
                    {/* Dealer Name */}
                    <Box
                      onClick={() => onTextEdit && onTextEdit('dealerName', editableValues['dealerName'] || '')}
                      sx={{
                        cursor: 'text',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: isSquareOrVertical ? 24 : 18,
                          fontWeight: 'normal',
                          fontFamily: 'Kia Signature Fix OTF',
                          color: editableValues['dealerName'] ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                          lineHeight: 1.2,
                          whiteSpace: 'nowrap',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                      >
                        {editableValues['dealerName'] || ''}
                      </Typography>
                    </Box>
                    
                    {/* Phone Number */}
                    <Box
                      onClick={() => onTextEdit && onTextEdit('dealerPhone', editableValues['dealerPhone'] || '')}
                      sx={{
                        cursor: 'text',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: isSquareOrVertical ? 24 : 18,
                          fontWeight: 'normal',
                          fontFamily: 'Kia Signature Fix OTF',
                          color: editableValues['dealerPhone'] ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                          lineHeight: 1.2,
                          whiteSpace: 'nowrap',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                      >
                        {editableValues['dealerPhone'] || ''}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            );
          } else {
            // If no title-subtitle pair, render texts individually as before
            return (
              <>
                {otherTexts.map((textElement) => {
              const value = editableValues[textElement.id] || textElement.text || '';
              const displayText = getTextValue(textElement.id, textElement.type);
              const isPlaceholder = !value;
              
              // Skip rendering if displayText is empty for Quotation/Purchase Order templates, but not for title
              if ((template.format.id === 'doc-quotation-a4' || template.format.id === 'doc-purchase-order-a4') && 
                  textElement.id !== 'title' && (!displayText || displayText.trim() === '')) {
                return null;
              }
              
              const canvasTextObj = template.canvas.objects?.find(
                (obj: any) => obj.type === 'text' && obj.id === textElement.id
              ) as any;
              
              const isPromotionBanner = template.category === 'Google Ads';
              const isHeading = textElement.type === 'heading';
              const isVerticalBanner = template.format.id === 'banner-vertical';
              const isSquareBanner = template.format.id === 'banner-square';
              const isSpecialBanner = isVerticalBanner || isSquareBanner;
              const isDefaultLayout = template.name?.includes('Default') || template.id?.includes('default');
              
              // Apply different offsets based on layout type
              let topOffset = 0;
              if (isDefaultLayout && (isHeading || textElement.type === 'subheading')) {
                topOffset = -30; // Move up for default layout
              } else if (isPromotionBanner && isHeading && !isSpecialBanner) {
                topOffset = -30;
              }
              
              // Special handling for car sales contract
              const isCarContract = template.format.id === 'doc-contract-a4';
              const isCarContractTitle = isCarContract && textElement.id === 'title';
              
              // Stack positioning for vehicle/sales info sections
              let carContractOffset = 0;
              if (isCarContract) {
                // Apply global -20px offset to all contract text elements
                if (isCarContractTitle) {
                  carContractOffset = -24; // Title: up 24px (40-16)
                } else if (textElement.id === 'vehicle-info') {
                  carContractOffset = -50; // Vehicle info: up 50px from base position (20 + 30px up)
                } else if (textElement.id === 'price') {
                  carContractOffset = 140; // Price: down 140px (170 - 30px up)
                } else if (textElement.id === 'payment-delivery') {
                  carContractOffset = 170; // Payment: sale price와 30px 간격 (140 + 30 = 170)
                } else if (textElement.id === 'agreement-date' || textElement.id === 'party-a-info' || textElement.id === 'party-b-info') {
                  carContractOffset = -40; // Contract date and party info: up 40px (20+20)
                } else {
                  carContractOffset = 60; // Other text: down 60px (80-20)
                }
              }
              
              const position = {
                left: canvasTextObj?.left || textElement.position.x,
                top: (canvasTextObj?.top || textElement.position.y) + topOffset + carContractOffset,
              };
              
              const fontSize = canvasTextObj?.fontSize || 
                              (textElement.type === 'heading' ? (template.format.id === 'banner-vertical' ? 42 : 48) : 
                               textElement.type === 'subheading' ? 32 : 18);
              const fontWeight = canvasTextObj?.fontWeight || 
                                (textElement.type === 'heading' ? 'bold' : 
                                 textElement.type === 'subheading' ? '500' : 'normal');
              const fontFamily = canvasTextObj?.fontFamily || 'Arial, sans-serif';
              const color = isPlaceholder 
                ? (template.category === 'Document' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)') 
                : (isPromotionBanner ? textColor : 
                   template.category === 'Document' ? '#000000' : (canvasTextObj?.fill || '#ffffff'));
              
              const textAlign = canvasTextObj?.textAlign || 'left';
              const originX = canvasTextObj?.originX || 'left';
              
              let maxWidth;
              if (textAlign === 'center' && originX === 'center') {
                maxWidth = template.canvas.width * 0.95;
              } else {
                maxWidth = template.canvas.width - (position.left * 2);
              }
              
              const boxStyles: any = {
                position: 'absolute',
                left: textAlign === 'center' && originX === 'center' ? '50%' : position.left,
                top: position.top,
                transform: textAlign === 'center' && originX === 'center' ? 'translateX(-50%)' : 'none',
                cursor: 'text',
                padding: '8px 16px',
                borderRadius: '4px',
                zIndex: 3,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  transform: textAlign === 'center' && originX === 'center' 
                    ? 'translateX(-50%) translateY(-1px)' 
                    : 'translateY(-1px)',
                }
              };

              if (textAlign === 'center' && originX === 'center') {
                boxStyles.width = maxWidth;
              } else {
                boxStyles.maxWidth = maxWidth;
              }

              return (
                <Box
                  key={textElement.id}
                  onClick={() => onTextEdit && onTextEdit(textElement.id, value)}
                  sx={boxStyles}
                >
                  <Typography
                    sx={{
                      fontSize: fontSize,
                      fontWeight: fontWeight,
                      fontFamily: fontFamily,
                      color: color,
                      lineHeight: canvasTextObj?.lineHeight || 1.2,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      textShadow: template.category === 'Document' ? 'none' : '0 2px 4px rgba(0,0,0,0.3)',
                      letterSpacing: textElement.type === 'heading' ? '0.5px' : 'normal',
                      textAlign: textAlign || 'left',
                    }}
                  >
                    {displayText || (textElement.id === 'title' && template.category === 'Document' ? 'Document Title' : '')}
                  </Typography>
                </Box>
              );
            })}
                
                {/* Dealer Information Stack for Google Ads - Center Logo 레이아웃에서는 숨김 */}
                {template.category === 'Google Ads' && dealerNameElement && dealerPhoneElement && 
                 editableValues['showDealerInfo'] !== false && 
                 !(template.id?.includes('center') || template.name?.includes('Center')) && (
                  <Box
                    key="dealer-info-stack"
                    sx={{
                      position: 'absolute',
                      right: 44, // 우측으로 16px 이동 (60 - 16 = 44)
                      bottom: 34, // 아래로 16px 이동 (50 - 16 = 34)
                      zIndex: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end', // 오른쪽 정렬
                      gap: '2px', // 간격 좁히기
                    }}
                  >
                    {/* Dealer Name */}
                    <Box
                      onClick={() => onTextEdit && onTextEdit('dealerName', editableValues['dealerName'] || '')}
                      sx={{
                        cursor: 'text',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: isSquareOrVertical ? 24 : 18,
                          fontWeight: 'normal',
                          fontFamily: 'Kia Signature Fix OTF',
                          color: editableValues['dealerName'] ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                          lineHeight: 1.2,
                          whiteSpace: 'nowrap',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                      >
                        {editableValues['dealerName'] || ''}
                      </Typography>
                    </Box>
                    
                    {/* Phone Number */}
                    <Box
                      onClick={() => onTextEdit && onTextEdit('dealerPhone', editableValues['dealerPhone'] || '')}
                      sx={{
                        cursor: 'text',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: isSquareOrVertical ? 24 : 18,
                          fontWeight: 'normal',
                          fontFamily: 'Kia Signature Fix OTF',
                          color: editableValues['dealerPhone'] ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                          lineHeight: 1.2,
                          whiteSpace: 'nowrap',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                      >
                        {editableValues['dealerPhone'] || ''}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            );
          }
        })()}


        {/* Static Text Objects from Canvas */}
        {template.canvas.objects?.filter((obj: any) => 
          obj.type === 'text' && 
          (!obj.id || (template.category === 'Document' && obj.id === 'title')) && // Allow Document title
          obj.text && 
          obj.text.trim() !== ''
        ).map((textObj: any, index: number) => {
          return (
            <Box
              key={`static-text-${index}`}
              sx={{
                position: 'absolute',
                left: textObj.left,
                top: textObj.top,
                zIndex: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: textObj.fontSize || 14,
                  fontWeight: textObj.fontWeight || 'normal',
                  fontFamily: textObj.fontFamily || 'Arial, sans-serif',
                  color: textObj.fill || '#000000',
                  lineHeight: textObj.lineHeight || 1.2,
                  textAlign: textObj.textAlign || 'left',
                  transform: textObj.originX === 'center' ? 'translateX(-50%)' : 'none',
                  transformOrigin: textObj.originX === 'center' ? 'center' : 'left',
                }}
              >
                {textObj.text}
              </Typography>
            </Box>
          );
        })}

        {/* Signature Images for Documents */}
        {(() => {
          const signatures = [];
          
          // Car Sales Contract - Seller Signature
          if (template.format.id === 'doc-contract-a4' && editableValues['sellerSignature']) {
            const partyATextElement = template.editableElements.texts.find(t => t.id === 'party-a-info');
            if (partyATextElement) {
              const canvasTextObj = template.canvas.objects?.find(
                (obj: any) => obj.type === 'text' && obj.id === 'party-a-info'
              ) as any;
              
              const position = {
                left: (canvasTextObj?.left || partyATextElement.position.x) + 120 - 48 - 48 - 40 + 16,
                top: (canvasTextObj?.top || partyATextElement.position.y) - 40 + 55 + 10,
              };
              
              signatures.push(
                <Box
                  key="seller-signature"
                  onClick={() => onImageEdit && onImageEdit('sellerSignature')}
                  sx={{
                    position: 'absolute',
                    left: position.left,
                    top: position.top,
                    width: 150,
                    height: 60,
                    cursor: 'pointer',
                    zIndex: 4,
                    '&:hover': {
                      outline: '2px dashed #1976d2',
                      outlineOffset: '2px',
                    }
                  }}
                >
                  <img 
                    src={(editableValues['sellerSignature'] as BrandAsset).url} 
                    alt="Signature"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              );
            }
          }
          
          // Quotation - Seller Signature
          if (template.format.id === 'doc-quotation-a4' && editableValues['sellerSignature']) {
            const sellerTextElement = template.editableElements.texts.find(t => t.id === 'party-a-info');
            if (sellerTextElement) {
              const canvasTextObj = template.canvas.objects?.find(
                (obj: any) => obj.type === 'text' && obj.id === 'party-a-info'
              ) as any;
              
              const position = {
                left: (canvasTextObj?.left || sellerTextElement.position.x) + 120 - 48 - 48 - 40 + 16,
                top: (canvasTextObj?.top || sellerTextElement.position.y) - 40 + 55 + 10 + 40,
              };
              
              signatures.push(
                <Box
                  key="seller-signature"
                  onClick={() => onImageEdit && onImageEdit('sellerSignature')}
                  sx={{
                    position: 'absolute',
                    left: position.left,
                    top: position.top,
                    width: 150,
                    height: 60,
                    cursor: 'pointer',
                    zIndex: 4,
                    '&:hover': {
                      outline: '2px dashed #1976d2',
                      outlineOffset: '2px',
                    }
                  }}
                >
                  <img 
                    src={(editableValues['sellerSignature'] as BrandAsset).url} 
                    alt="Seller Signature"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              );
            }
          }
          
          // Purchase Order - Dealer and Customer Signatures
          if (template.format.id === 'doc-purchase-order-a4') {
            // Dealer Signature
            if (editableValues['dealerSignature']) {
              const dealerTextElement = template.editableElements.texts.find(t => t.id === 'dealer-info');
              if (dealerTextElement) {
                const canvasTextObj = template.canvas.objects?.find(
                  (obj: any) => obj.type === 'text' && obj.id === 'dealer-info'
                ) as any;
                
                const position = {
                  left: (canvasTextObj?.left || dealerTextElement.position.x) + 120 - 48 - 48 - 40 + 16,
                  top: (canvasTextObj?.top || dealerTextElement.position.y) - 40 + 55 + 10,
                };
                
                signatures.push(
                  <Box
                    key="dealer-signature"
                    onClick={() => onImageEdit && onImageEdit('dealerSignature')}
                    sx={{
                      position: 'absolute',
                      left: position.left,
                      top: position.top,
                      width: 150,
                      height: 60,
                      cursor: 'pointer',
                      zIndex: 4,
                      '&:hover': {
                        outline: '2px dashed #1976d2',
                        outlineOffset: '2px',
                      }
                    }}
                  >
                    <img 
                      src={(editableValues['dealerSignature'] as BrandAsset).url} 
                      alt="Dealer Signature"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                );
              }
            }
            
            // Customer Signature
            if (editableValues['customerSignature']) {
              const customerTextElement = template.editableElements.texts.find(t => t.id === 'customer-info');
              if (customerTextElement) {
                const canvasTextObj = template.canvas.objects?.find(
                  (obj: any) => obj.type === 'text' && obj.id === 'customer-info'
                ) as any;
                
                const position = {
                  left: (canvasTextObj?.left || customerTextElement.position.x) + 120 - 48 - 48 - 40 + 16,
                  top: (canvasTextObj?.top || customerTextElement.position.y) - 40 + 55 + 10,
                };
                
                signatures.push(
                  <Box
                    key="customer-signature"
                    onClick={() => onImageEdit && onImageEdit('customerSignature')}
                    sx={{
                      position: 'absolute',
                      left: position.left,
                      top: position.top,
                      width: 150,
                      height: 60,
                      cursor: 'pointer',
                      zIndex: 4,
                      '&:hover': {
                        outline: '2px dashed #1976d2',
                        outlineOffset: '2px',
                      }
                    }}
                  >
                    <img 
                      src={(editableValues['customerSignature'] as BrandAsset).url} 
                      alt="Customer Signature"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                );
              }
            }
          }
          
          return signatures;
        })()}

      </Box>
    </Box>
  );
});

Canvas.displayName = 'Canvas';

// Memoize Canvas component to prevent unnecessary re-renders
export default React.memo(Canvas, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  return (
    prevProps.template === nextProps.template &&
    JSON.stringify(prevProps.editableValues) === JSON.stringify(nextProps.editableValues) &&
    JSON.stringify(prevProps.contractData) === JSON.stringify(nextProps.contractData) &&
    JSON.stringify(prevProps.quotationData) === JSON.stringify(nextProps.quotationData) &&
    JSON.stringify(prevProps.purchaseOrderData) === JSON.stringify(nextProps.purchaseOrderData)
  );
});