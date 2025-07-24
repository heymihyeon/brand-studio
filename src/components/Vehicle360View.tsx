import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import { Vehicle360Data, colorIdTo360ColorCode, vehicleIdToModelId, vehicle360Data } from '../data/vehicle360Images';

interface Vehicle360ViewProps {
  vehicleId: string;
  colorId: string;
  width: number;
  height: number;
  fallbackImage?: string; // 360도 이미지가 없을 때 사용할 기본 이미지
  onDragEnd?: () => void; // 드래그 종료 시 호출되는 콜백
}

const Vehicle360View: React.FC<Vehicle360ViewProps> = ({ vehicleId, colorId, width, height, fallbackImage, onDragEnd }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateInterval = useRef<NodeJS.Timeout | null>(null);
  const dragStartIndex = useRef(0);
  
  // 차량 모델과 색상 코드 가져오기
  const modelId = vehicleIdToModelId[vehicleId] || 'ev9';
  const colorCode = colorIdTo360ColorCode[colorId] || 'swp';
  const vehicleData = vehicle360Data[modelId];
  const colorData = vehicleData?.colors[colorCode];
  const images = colorData?.images || [];
  
  // 디버깅 정보
  console.log('Vehicle360View Debug:', {
    vehicleId,
    colorId,
    modelId,
    colorCode,
    imagesCount: images.length,
    firstImage: images[0]
  });
  
  // 이미지 프리로드
  useEffect(() => {
    if (images.length === 0) return;
    
    setIsLoading(true);
    const imagePromises = images.map((src) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
        img.src = src;
      });
    });
    
    Promise.allSettled(imagePromises)
      .then((results) => {
        const successfulImages = results
          .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
          .map(result => result.value);
        
        if (successfulImages.length > 0) {
          setLoadedImages(successfulImages);
          console.log(`Successfully loaded ${successfulImages.length} images`);
        } else {
          console.error('Failed to load all 360 images');
        }
        setIsLoading(false);
      });
  }, [images]);
  
  // 자동 회전
  useEffect(() => {
    if (isAutoRotating && !isDragging && loadedImages.length > 0) {
      autoRotateInterval.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % loadedImages.length);
      }, 50); // 50ms마다 다음 이미지로
    } else {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
        autoRotateInterval.current = null;
      }
    }
    
    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
    };
  }, [isAutoRotating, isDragging, loadedImages.length]);
  
  // 마우스 드래그 시작
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
    dragStartIndex.current = currentImageIndex;
    setIsAutoRotating(false);
  }, [currentImageIndex]);
  
  // 마우스 드래그 중
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || loadedImages.length === 0) return;
    
    const deltaX = e.clientX - startX;
    const sensitivity = 5; // 픽셀당 회전 감도
    const indexChange = Math.round(deltaX / sensitivity);
    let newIndex = dragStartIndex.current - indexChange;
    
    // 인덱스 순환 처리
    while (newIndex < 0) newIndex += loadedImages.length;
    while (newIndex >= loadedImages.length) newIndex -= loadedImages.length;
    
    setCurrentImageIndex(newIndex);
  }, [isDragging, startX, loadedImages.length]);
  
  // 마우스 드래그 종료
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (onDragEnd) {
        onDragEnd();
      }
    }
  }, [isDragging, onDragEnd]);
  
  // 전역 마우스 이벤트 리스너
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = 'default';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  // 터치 이벤트 핸들러
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(true);
    setStartX(touch.clientX);
    dragStartIndex.current = currentImageIndex;
    setIsAutoRotating(false);
  }, [currentImageIndex]);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || loadedImages.length === 0) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const sensitivity = 5;
    const indexChange = Math.round(deltaX / sensitivity);
    let newIndex = dragStartIndex.current - indexChange;
    
    while (newIndex < 0) newIndex += loadedImages.length;
    while (newIndex >= loadedImages.length) newIndex -= loadedImages.length;
    
    setCurrentImageIndex(newIndex);
  }, [isDragging, startX, loadedImages.length]);
  
  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (onDragEnd) {
        onDragEnd();
      }
    }
  }, [isDragging, onDragEnd]);
  
  if (images.length === 0 || !loadedImages.length) {
    // 360도 이미지가 없는 경우 fallback 이미지 표시
    console.warn('No 360 images available for:', vehicleId, colorId, 'Using fallback image');
    if (fallbackImage) {
      return (
        <img
          src={fallbackImage}
          alt={`${vehicleData?.modelName || 'Vehicle'}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      );
    }
    return null;
  }
  
  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: width,
        height: height,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isLoading ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <img
            src={loadedImages[currentImageIndex]}
            alt={`${vehicleData?.modelName} - ${colorData?.colorName}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              display: 'block',
            }}
            draggable={false}
          />
          
          {/* 자동 회전 토글 버튼 */}
          <IconButton
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            sx={{
              position: 'absolute',
              top: 10,
              right: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
            size="small"
          >
            {isAutoRotating ? <Pause /> : <PlayArrow />}
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default Vehicle360View;