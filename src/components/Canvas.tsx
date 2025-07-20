import React, { useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Template, BrandAsset } from '../types';

interface CanvasProps {
  template: Template;
  editableValues: Record<string, any>;
  onTextEdit?: (elementId: string, currentValue: string) => void;
  onImageEdit?: (elementId: string) => void;
}

export interface CanvasRef {
  exportCanvas: (format: string, quality: number) => string;
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(({ template, editableValues, onTextEdit, onImageEdit }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useImperativeHandle(ref, () => ({
    exportCanvas: (format: string, quality: number) => {
      // For now, return empty string as we're not using canvas
      return '';
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
    const value = editableValues[elementId];
    if (value) return value;
    
    // Return placeholder
    return type === 'heading' ? 'Enter title here' : 
           type === 'subheading' ? 'Enter subtitle here' : 
           'Enter text here';
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
        overflow: 'hidden',
      }}
    >
      {/* Canvas wrapper with scale */}
      <Box
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
        {editableValues['brandLogo'] && (
          <Box
            onClick={() => onImageEdit && onImageEdit('brandLogo')}
            sx={{
              position: 'absolute',
              right: 20,
              top: 20,
              width: template.format.id === 'banner-square' ? 150 : 120,
              height: template.format.id === 'banner-square' ? 75 : 60,
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
        )}

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
              const maxLeft = template.canvas.width - size.width - rightMargin;
              const maxTop = template.canvas.height - size.height - bottomMargin;
              
              adjustedLeft = Math.min(adjustedLeft, maxLeft);
              adjustedTop = Math.min(adjustedTop, maxTop);
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

        {/* Text elements layer */}
        {template.editableElements.texts.map((textElement) => {
          const value = editableValues[textElement.id] || textElement.text || '';
          const displayText = getTextValue(textElement.id, textElement.type);
          const isPlaceholder = !value;
          
          // Get position from canvas objects or use default
          const canvasTextObj = template.canvas.objects?.find(
            (obj: any) => obj.type === 'text' && obj.id === textElement.id
          ) as any;
          
          // Apply position adjustment for promotion banner titles
          const isPromotionBanner = template.category === 'Promotion Banner';
          const isHeading = textElement.type === 'heading';
          // Check if it's Vertical or Square Banner
          const isVerticalBanner = template.format.id === 'banner-vertical';
          const isSquareBanner = template.format.id === 'banner-square';
          const isSpecialBanner = isVerticalBanner || isSquareBanner;
          const topOffset = (isPromotionBanner && isHeading && !isSpecialBanner) ? -30 : 0; // Move title up by 30px (except for Vertical/Square banners)
          
          const position = {
            left: canvasTextObj?.left || textElement.position.x,
            top: (canvasTextObj?.top || textElement.position.y) + topOffset,
          };
          
          // Apply larger font size for promotion banner titles and specific banners
          const headingSize = (isPromotionBanner || isVerticalBanner || isSquareBanner) ? 90 : 72;
          
          const fontSize = canvasTextObj?.fontSize || 
                          (textElement.type === 'heading' ? headingSize : 
                           textElement.type === 'subheading' ? 32 : 18);
          const fontWeight = canvasTextObj?.fontWeight || 
                            (textElement.type === 'heading' ? 'bold' : 
                             textElement.type === 'subheading' ? '500' : 'normal');
          const fontFamily = canvasTextObj?.fontFamily || 'Arial, sans-serif';
          const color = isPlaceholder ? 'rgba(255, 255, 255, 0.5)' : (canvasTextObj?.fill || '#ffffff');
          
          // Calculate max width for text wrapping
          // Check if text is center-aligned
          const textAlign = canvasTextObj?.textAlign || 'left';
          const originX = canvasTextObj?.originX || 'left';
          
          let maxWidth;
          if (textAlign === 'center' && originX === 'center') {
            // For center-aligned text, use 95% of canvas width for more space
            maxWidth = template.canvas.width * 0.95;
          } else {
            // For left/right aligned text, calculate based on position
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

          // Use width for center-aligned text, maxWidth for others
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
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: textElement.type === 'heading' ? '0.5px' : 'normal',
                  textAlign: textAlign || 'left',
                }}
              >
                {displayText}
              </Typography>
            </Box>
          );
        })}

      </Box>
    </Box>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas;