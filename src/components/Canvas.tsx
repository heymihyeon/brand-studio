import React, { useImperativeHandle, forwardRef, useEffect, useState, useRef, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { Template, BrandAsset } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ContractData } from './CarSalesContractEditor';
import { QuotationData } from './QuotationEditor';
import { PurchaseOrderData, VehicleItem } from './PurchaseOrderEditor';

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
  const [textColor, setTextColor] = useState<string>('#ffffff'); // Default to white

  useImperativeHandle(ref, () => ({
    exportCanvas: async (format: string, quality: number) => {
      console.log('Canvas exportCanvas called with format:', format, 'quality:', quality);
      if (!canvasRef.current) {
        console.error('canvasRef.current is null');
        return '';
      }
      
      try {
        // Store original scale
        const originalScale = scale;
        console.log('Original scale:', originalScale);
        
        // Temporarily set scale to 1 for export
        canvasRef.current.style.transform = 'scale(1)';
        
        console.log('Creating canvas with html2canvas...');
        console.log('Template canvas dimensions:', template.canvas.width, 'x', template.canvas.height);
        
        // 썸네일용인 경우 작은 크기로 생성
        const isThumbnail = format === 'jpg' && quality <= 30;
        const exportScale = isThumbnail ? 0.5 : 2; // 썸네일은 0.5배, 일반 내보내기는 2배
        
        // Create a canvas from the DOM element
        const canvas = await html2canvas(canvasRef.current, {
          scale: exportScale,
          backgroundColor: null,
          allowTaint: true,
          useCORS: true,
          width: template.canvas.width,
          height: template.canvas.height,
          logging: false,
        });
        console.log('html2canvas completed, canvas:', canvas, 'scale:', exportScale);
        
        // Restore original scale
        canvasRef.current.style.transform = `scale(${originalScale})`;
        
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
        
        const scaleX = containerWidth / template.canvas.width;
        const scaleY = containerHeight / template.canvas.height;
        const newScale = Math.min(scaleX, scaleY, 1);
        
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [template.canvas.width, template.canvas.height]);

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
      } catch (e) {
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
      } catch (e) {
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
      } catch (e) {
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

  // Function to analyze image brightness
  const analyzeImageBrightness = useCallback(async (imageUrl: string) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      return new Promise<boolean>((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(true); // Default to bright if context fails
            return;
          }

          // Sample the image at a smaller size for performance
          const sampleSize = 50;
          canvas.width = sampleSize;
          canvas.height = sampleSize;
          ctx.drawImage(img, 0, 0, sampleSize, sampleSize);

          const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
          const data = imageData.data;
          
          let totalBrightness = 0;
          const pixelCount = data.length / 4;

          for (let i = 0; i < data.length; i += 4) {
            // Calculate brightness using relative luminance formula
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
            totalBrightness += brightness;
          }

          const averageBrightness = totalBrightness / pixelCount;
          // If average brightness is above 128 (middle value), consider it bright
          resolve(averageBrightness > 128);
        };

        img.onerror = () => {
          resolve(true); // Default to bright if image fails to load
        };

        img.src = imageUrl;
      });
    } catch (error) {
      console.error('Error analyzing image brightness:', error);
      return true; // Default to bright on error
    }
  }, []);

  // Effect to analyze background image brightness when it changes
  useEffect(() => {
    if (backgroundImage && template.category === 'Promotion Banner') {
      // Create a stable key for the background image
      const imageKey = backgroundImage.substring(0, 100); // Use first 100 chars as key
      
      // Check if we've already analyzed this image
      const cachedColor = sessionStorage.getItem(`img-brightness-${imageKey}`);
      if (cachedColor) {
        setTextColor(cachedColor);
        return;
      }
      
      // Analyze new image
      analyzeImageBrightness(backgroundImage).then((isBright) => {
        const color = isBright ? '#000000' : '#ffffff';
        setTextColor(color);
        // Cache the result
        sessionStorage.setItem(`img-brightness-${imageKey}`, color);
      });
    }
  }, [backgroundImage, template.category, analyzeImageBrightness]);

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
        overflow: 'hidden',
      }}
    >
      {/* Canvas wrapper with scale */}
      <Box
        ref={canvasRef}
        sx={{
          position: 'relative',
          width: template.canvas.width,
          height: template.canvas.height,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          backgroundColor: template.canvas.backgroundColor || '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden',
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
          console.log('Logo rendering info:', {
            formatId: template.format.id,
            logoUrl: (logo as BrandAsset).url,
            position: template.format.id === 'banner-square' 
              ? `left: ${template.canvas.width - 140}, top: 20`
              : 'right: 20, top: 20',
            size: '120x60',
            canvasWidth: template.canvas.width
          });
          return (
          <Box
            onClick={() => onImageEdit && onImageEdit('brandLogo')}
            sx={{
              position: 'absolute',
              // Square Banner의 경우 left 사용, 다른 경우 right 사용
              ...(template.format.id === 'banner-square' 
                ? { left: template.canvas.width - 150, top: 4 }  // 1080 - 150 = 930 (10px 좌측), top: 4 (16px 위로)
                : { right: 30, top: 4 }  // right: 30 (10px 좌측), top: 4 (16px 위로)
              ),
              width: 120,
              height: 60,
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
          .filter(img => img.id !== 'background' && img.id !== 'bg-image' && img.label !== 'Background Image')
          .map((imageElement) => {
            const value = editableValues[imageElement.id];
            const canvasImgObj = template.canvas.objects?.find(
              (obj: any) => obj.type === 'image' && obj.id === imageElement.id
            ) as any;
            
            const imageSrc = (value && typeof value === 'object' && (value as BrandAsset).url) 
                            ? (value as BrandAsset).url 
                            : canvasImgObj?.src || imageElement.src;
            
            // Increase vehicle image size by 1.4x
            const isVehicleImage = imageElement.id === 'vehicle' || imageElement.label === 'Vehicle Model';
            const scaleFactor = isVehicleImage ? 1.4 : 1;
            
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
            
            // Ensure the vehicle doesn't go beyond canvas bounds with margins
            if (isVehicleImage) {
              console.log('Vehicle image processing:', {
                templateFormatId: template.format.id,
                templateName: template.name,
                canvasWidth: template.canvas.width,
                originalLeft: adjustedLeft,
                vehicleWidth: size.width,
                scaleFactor: scaleFactor
              });
              
              const maxLeft = template.canvas.width - size.width - rightMargin;
              const maxTop = template.canvas.height - size.height - bottomMargin;
              
              adjustedLeft = Math.min(adjustedLeft, maxLeft);
              adjustedTop = Math.min(adjustedTop, maxTop);
              
              // Center horizontally for vertical banner format
              // Check both format id and canvas dimensions
              const isVerticalBanner = template.format.id === 'banner-vertical' || 
                                     (template.canvas.width === 400 && template.canvas.height === 900);
              
              if (isVerticalBanner) {
                adjustedLeft = (template.canvas.width - size.width) / 2;
                console.log('Centering vehicle for vertical banner:', {
                  newLeft: adjustedLeft,
                  calculation: `(${template.canvas.width} - ${size.width}) / 2`
                });
              }
            }
            
            const position = {
              left: adjustedLeft,
              top: adjustedTop,
            };
            
            return (
              <Box
                key={imageElement.id}
                onClick={() => onImageEdit && onImageEdit(imageElement.id)}
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
                  <img 
                    src={imageSrc} 
                    alt={imageElement.label || 'Image'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
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
          const otherTexts = template.editableElements.texts.filter(t => t.type !== 'heading' && t.type !== 'subheading');
          
          // If both title and subtitle exist, render them in a stack
          if (titleElement && subtitleElement) {
            const titleCanvasObj = template.canvas.objects?.find(
              (obj: any) => obj.type === 'text' && obj.id === titleElement.id
            ) as any;
            
            
            // Use title position as the base position for the stack
            // Adjust position based on layout type
            const isDefaultLayout = template.name?.includes('Default') || template.id?.includes('default');
            const isBottomLeftLayout = template.name?.includes('Bottom Left') || template.id?.includes('bottom-left');
            
            let topAdjustment = 0;
            if (isDefaultLayout) {
                topAdjustment = -30; // Move up by 30px for default layout
            } else if (isBottomLeftLayout) {
                topAdjustment = 24; // Move down by 24px for bottom left layout
            }
            
            const stackPosition = {
              left: titleCanvasObj?.left || titleElement.position.x,
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
              gap: '8px', // Space between title and subtitle
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
                        fontSize: titleCanvasObj?.fontSize || (template.format.id === 'banner-vertical' ? 42 : 48),
                        fontWeight: 'bold',
                        fontFamily: template.category === 'Promotion Banner' ? 'Kia Signature Fix OTF' : (titleCanvasObj?.fontFamily || 'Arial, sans-serif'),
                        color: editableValues[titleElement.id] ? textColor : (textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                        lineHeight: titleCanvasObj?.lineHeight || 1.2,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        textShadow: template.category === 'Document' ? 'none' : (textColor === '#000000' ? '0 1px 2px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.3)'),
                        letterSpacing: '0.5px',
                        textAlign: textAlign || 'left',
                      }}
                    >
                      {editableValues[titleElement.id] || 'Enter title here'}
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
                        fontSize: titleCanvasObj?.fontSize ? titleCanvasObj.fontSize * 0.5 : 32,
                        fontWeight: '500',
                        fontFamily: template.category === 'Promotion Banner' ? 'Kia Signature Fix OTF' : (titleCanvasObj?.fontFamily || 'Arial, sans-serif'),
                        color: editableValues[subtitleElement.id] ? textColor : (textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                        lineHeight: 1.2,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        textShadow: template.category === 'Document' ? 'none' : (textColor === '#000000' ? '0 1px 2px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.3)'),
                        textAlign: textAlign || 'left',
                      }}
                    >
                      {editableValues[subtitleElement.id] || 'Enter subtitle here'}
                    </Typography>
                  </Box>
                </Box>
                
                {/* Render other texts separately */}
                {otherTexts.map((textElement) => {
                  const value = editableValues[textElement.id] || textElement.text || '';
                  const displayText = getTextValue(textElement.id, textElement.type);
                  const isPlaceholder = !value;
                  
                  // Skip rendering if displayText is empty for Quotation/Purchase Order templates
                  if ((template.format.id === 'doc-quotation-a4' || template.format.id === 'doc-purchase-order-a4') && (!displayText || displayText.trim() === '')) {
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
                  const fontFamily = template.category === 'Promotion Banner' ? 'Kia Signature Fix OTF' : (canvasTextObj?.fontFamily || 'Arial, sans-serif');
                  const color = isPlaceholder 
                    ? (textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)') 
                    : (template.category === 'Promotion Banner' ? textColor : (canvasTextObj?.fill || '#ffffff'));
                  const textAlign = canvasTextObj?.textAlign || 'left';
                  const originX = canvasTextObj?.originX || 'left';
                  
                  let maxWidth = template.canvas.width - (position.left * 2);
                  
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
                          textShadow: template.category === 'Document' ? 'none' : (textColor === '#000000' ? '0 1px 2px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.3)'),
                          textAlign: textAlign || 'left',
                        }}
                      >
                        {displayText || ''}
                      </Typography>
                    </Box>
                  );
                })}
              </>
            );
          } else {
            // If no title-subtitle pair, render texts individually as before
            return template.editableElements.texts.map((textElement) => {
              const value = editableValues[textElement.id] || textElement.text || '';
              const displayText = getTextValue(textElement.id, textElement.type);
              const isPlaceholder = !value;
              
              // Skip rendering if displayText is empty for Quotation/Purchase Order templates
              if ((template.format.id === 'doc-quotation-a4' || template.format.id === 'doc-purchase-order-a4') && (!displayText || displayText.trim() === '')) {
                return null;
              }
              
              const canvasTextObj = template.canvas.objects?.find(
                (obj: any) => obj.type === 'text' && obj.id === textElement.id
              ) as any;
              
              const isPromotionBanner = template.category === 'Promotion Banner';
              const isHeading = textElement.type === 'heading';
              const isVerticalBanner = template.format.id === 'banner-vertical';
              const isSquareBanner = template.format.id === 'banner-square';
              const isSpecialBanner = isVerticalBanner || isSquareBanner;
              const isDefaultLayout = template.name?.includes('Default') || template.id?.includes('default');
              const isBottomLeftLayout = template.name?.includes('Bottom Left') || template.id?.includes('bottom-left');
              
              // Apply different offsets based on layout type
              let topOffset = 0;
              if (isDefaultLayout && (isHeading || textElement.type === 'subheading')) {
                topOffset = -30; // Move up for default layout
              } else if (isBottomLeftLayout && (isHeading || textElement.type === 'subheading')) {
                topOffset = 24; // Move down for bottom left layout
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
                ? (textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)') 
                : (isPromotionBanner ? textColor : (canvasTextObj?.fill || '#ffffff'));
              
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
                    {displayText}
                  </Typography>
                </Box>
              );
            });
          }
        })()}


        {/* Static Text Objects from Canvas */}
        {template.canvas.objects?.filter((obj: any) => 
          obj.type === 'text' && 
          !obj.id && // Only render static texts (without id)
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