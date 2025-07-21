import React, { useImperativeHandle, forwardRef, useEffect, useState, useRef, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { Template, BrandAsset } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ContractData } from './CarSalesContractEditor';

interface CanvasProps {
  template: Template;
  editableValues: Record<string, any>;
  contractData?: ContractData;
  onTextEdit?: (elementId: string, currentValue: string) => void;
  onImageEdit?: (elementId: string) => void;
}

export interface CanvasRef {
  exportCanvas: (format: string, quality: number) => Promise<string>;
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(({ template, editableValues, contractData, onTextEdit, onImageEdit }, ref) => {
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
      analyzeImageBrightness(backgroundImage).then((isBright) => {
        // If background is bright, use black text; if dark, use white text
        setTextColor(isBright ? '#000000' : '#ffffff');
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
            
            const isPromotionBanner = template.category === 'Promotion Banner';
            const isVerticalBanner = template.format.id === 'banner-vertical';
            const isSquareBanner = template.format.id === 'banner-square';
            
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
                        fontFamily: titleCanvasObj?.fontFamily || 'Arial, sans-serif',
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
                        fontFamily: titleCanvasObj?.fontFamily || 'Arial, sans-serif',
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
                  
                  const canvasTextObj = template.canvas.objects?.find(
                    (obj: any) => obj.type === 'text' && obj.id === textElement.id
                  ) as any;
                  
                  const position = {
                    left: canvasTextObj?.left || textElement.position.x,
                    top: canvasTextObj?.top || textElement.position.y,
                  };
                  
                  const fontSize = canvasTextObj?.fontSize || 18;
                  const fontWeight = canvasTextObj?.fontWeight || 'normal';
                  const fontFamily = canvasTextObj?.fontFamily || 'Arial, sans-serif';
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
                        {displayText}
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
                  carContractOffset = 91; // Payment: down 91px (121 - 30px up)
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

        {/* Buyer Signature Image for Car Sales Contract */}
        {template.format.id === 'doc-contract-a4' && editableValues['buyerSignature'] && (() => {
          const partyBTextElement = template.editableElements.texts.find(t => t.id === 'party-b-info');
          if (!partyBTextElement) return null;
          
          const canvasTextObj = template.canvas.objects?.find(
            (obj: any) => obj.type === 'text' && obj.id === 'party-b-info'
          ) as any;
          
          const position = {
            left: (canvasTextObj?.left || partyBTextElement.position.x) + 200,
            top: (canvasTextObj?.top || partyBTextElement.position.y) - 40 + 60, // Apply same offset as party-b-info text
          };
          
          const signature = editableValues['buyerSignature'] as BrandAsset;
          
          return (
            <Box
              key="buyer-signature"
              onClick={() => onImageEdit && onImageEdit('buyerSignature')}
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
                src={signature.url} 
                alt="Signature"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </Box>
          );
        })()}

      </Box>
    </Box>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas;