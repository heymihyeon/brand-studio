import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box } from '@mui/material';
import { Canvas as FabricCanvas, Rect, Text, Textbox, FabricImage } from 'fabric';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  useImperativeHandle(ref, () => ({
    exportCanvas: (format: string, quality: number) => {
      if (!fabricCanvasRef.current) return '';
      
      const canvas = fabricCanvasRef.current;
      
      switch (format) {
        case 'png':
          return canvas.toDataURL('image/png');
        case 'jpg':
          return canvas.toDataURL('image/jpeg', quality / 100);
        case 'svg':
          return canvas.toSVG();
        default:
          return canvas.toDataURL('image/png');
      }
    }
  }));

  useEffect(() => {
    if (!canvasRef.current) return;

    // Fabric.js 캔버스 초기화
    const canvas = new FabricCanvas(canvasRef.current, {
      width: template.canvas.width,
      height: template.canvas.height,
      backgroundColor: template.canvas.backgroundColor,
    });

    fabricCanvasRef.current = canvas;

    // 템플릿에 따른 기본 객체 렌더링
    renderTemplate(canvas, template, editableValues);

    return () => {
      canvas.dispose();
    };
  }, [template, onTextEdit, onImageEdit]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      updateCanvas(fabricCanvasRef.current, template, editableValues);
    }
  }, [editableValues, template]);

  const renderTemplate = (
    canvas: FabricCanvas,
    template: Template,
    values: Record<string, any>
  ) => {
    canvas.clear();
    canvas.set('backgroundColor', template.canvas.backgroundColor);
    
    // 템플릿의 editableElements를 기반으로 렌더링
    renderTemplateElements(canvas, template, values);
    
    canvas.renderAll();
  };

  const updateCanvas = (
    canvas: FabricCanvas,
    template: Template,
    values: Record<string, any>
  ) => {
    renderTemplate(canvas, template, values);
  };

  const renderTemplateElements = (
    canvas: FabricCanvas,
    template: Template,
    values: Record<string, any>
  ) => {
    // First render canvas.objects (background, overlay, etc.)
    if (template.canvas.objects && template.canvas.objects.length > 0) {
      template.canvas.objects.forEach((obj: any) => {
        if (obj.type === 'rect') {
          const rect = new Rect({
            left: obj.left,
            top: obj.top,
            width: obj.width,
            height: obj.height,
            fill: obj.fill,
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
            selectable: false,
            evented: false,
          });
          canvas.add(rect);
        } else if (obj.type === 'image' && obj.src) {
          // Check if image is in editableElements
          const isEditable = template.editableElements.images.some(img => img.id === obj.id);
          
          if (isEditable) {
            // Editable images are processed later
            return;
          }
          
          // Non-editable images (background, etc.)
          FabricImage.fromURL(obj.src, { crossOrigin: 'anonymous' }).then((img) => {
            img.set({
              left: obj.left,
              top: obj.top,
              width: obj.width,
              height: obj.height,
              scaleX: obj.scaleX || 1,
              scaleY: obj.scaleY || 1,
              selectable: false,
              evented: false,
            });
            canvas.add(img);
            canvas.renderAll();
          });
        } else if (obj.type === 'text' && !template.editableElements.texts.some(t => t.id === obj.id)) {
          // Non-editable text
          const text = new Text(obj.text, {
            left: obj.left,
            top: obj.top,
            fontSize: obj.fontSize,
            fontWeight: obj.fontWeight,
            fill: obj.fill,
            fontFamily: obj.fontFamily || 'Arial',
            lineHeight: obj.lineHeight,
            selectable: false,
            evented: false,
          });
          canvas.add(text);
        }
      });
    }
    
    // Render text elements
    template.editableElements.texts.forEach((textElement) => {
      const value = values[textElement.id] || textElement.text;
      if (value) {
        // Find corresponding text object from canvas.objects
        const canvasTextObj = template.canvas.objects?.find((obj: any) => obj.type === 'text' && obj.id === textElement.id);
        
        const fontSize = canvasTextObj?.fontSize || 
                        (textElement.type === 'heading' ? 32 : 
                         textElement.type === 'subheading' ? 24 : 16);
        const fontWeight = canvasTextObj?.fontWeight || 
                          (textElement.type === 'heading' ? 'bold' : 
                           textElement.type === 'subheading' ? 'bold' : 'normal');
        const fontFamily = canvasTextObj?.fontFamily || 'Arial';
        const fill = canvasTextObj?.fill || '#333333';
        
        const text = new Textbox(value, {
          left: canvasTextObj?.left || textElement.position.x,
          top: canvasTextObj?.top || textElement.position.y,
          fontSize: fontSize,
          fontWeight: fontWeight,
          fill: fill,
          fontFamily: fontFamily,
          lineHeight: canvasTextObj?.lineHeight || 1,
          selectable: true,
          editable: true,
          width: textElement.type === 'body' ? canvas.width! - textElement.position.x - 50 : undefined,
          hasControls: false,
          hasBorders: true,
          borderColor: '#1F7AFC',
          cornerColor: '#1F7AFC',
          cornerSize: 8,
          transparentCorners: false,
        });
        
        // Save text element ID
        text.set('elementId', textElement.id);
        
        // Handle double-click event
        text.on('mouse:dblclick', () => {
          if (onTextEdit) {
            onTextEdit(textElement.id, text.text || '');
          }
        });
        
        // Handle text change event
        text.on('changed', () => {
          // Notify parent component of changes
          if (onTextEdit) {
            onTextEdit(textElement.id, text.text || '');
          }
        });
        
        canvas.add(text);
      }
    });

    // Render image elements
    template.editableElements.images.forEach((imageElement) => {
      const value = values[imageElement.id];
      
      // Find corresponding image object from canvas.objects
      const canvasImgObj = template.canvas.objects?.find((obj: any) => obj.type === 'image' && obj.id === imageElement.id);
      const imageSrc = (value && typeof value === 'object' && (value as BrandAsset).url) 
                      ? (value as BrandAsset).url 
                      : canvasImgObj?.src || imageElement.src;
      
      if (imageSrc) {
        FabricImage.fromURL(imageSrc, { crossOrigin: 'anonymous' }).then((img) => {
          // Use properties from canvas.objects or defaults
          const imgWidth = canvasImgObj?.width || imageElement.size.width;
          const imgHeight = canvasImgObj?.height || imageElement.size.height;
          const scaleX = imgWidth / img.width!;
          const scaleY = imgHeight / img.height!;
          
          img.set({
            left: canvasImgObj?.left || imageElement.position.x,
            top: canvasImgObj?.top || imageElement.position.y,
            scaleX: canvasImgObj?.scaleX || scaleX,
            scaleY: canvasImgObj?.scaleY || scaleY,
            selectable: false,
            evented: true,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true,
          });
          
          // Save image element ID
          img.set('elementId', imageElement.id);
          
          // Handle double-click event
          img.on('mouse:dblclick', () => {
            if (onImageEdit) {
              onImageEdit(imageElement.id);
            }
          });
          
          canvas.add(img);
          canvas.renderAll();
        });
      } else {
        // Show placeholder when no image
        const placeholder = new Rect({
          left: imageElement.position.x,
          top: imageElement.position.y,
          width: imageElement.size.width,
          height: imageElement.size.height,
          fill: '#f5f5f5',
          stroke: '#ddd',
          strokeWidth: 2,
          strokeDashArray: [5, 5],
          selectable: false,
          evented: true,
          hasControls: false,
          hasBorders: false,
          lockMovementX: true,
          lockMovementY: true,
        });
        
        const placeholderText = new Text('Select an image', {
          left: imageElement.position.x + imageElement.size.width / 2,
          top: imageElement.position.y + imageElement.size.height / 2,
          fontSize: 16,
          fill: '#999',
          textAlign: 'center',
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
        });
        
        placeholder.set('elementId', imageElement.id);
        
        placeholder.on('mouse:dblclick', () => {
          if (onImageEdit) {
            onImageEdit(imageElement.id);
          }
        });
        
        canvas.add(placeholder);
        canvas.add(placeholderText);
      }
    });
  };

  // Calculate canvas scale (responsive)
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const scale = Math.min(
    containerSize.width / template.canvas.width,
    containerSize.height / template.canvas.height
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        
      }}
    >
      <Box
        sx={{
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transition: 'transform 0.2s ease',
          boxShadow: 3,
          backgroundColor: 'white',
          display: 'inline-block',
        }}
      >
        <canvas ref={canvasRef} />
      </Box>
    </Box>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas;