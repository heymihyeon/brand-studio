import React from 'react';
import { Box } from '@mui/material';
import { profanityFilter, ProfanityMatch } from '../utils/profanityFilter';

interface ProfanityHighlightTextProps {
  text: string;
  style?: React.CSSProperties;
  sx?: any;
}

const ProfanityHighlightText: React.FC<ProfanityHighlightTextProps> = ({ text, style, sx }) => {
  // 비속어 감지
  profanityFilter.updateProfanityWords(JSON.parse(localStorage.getItem('profanityWords') || '[]'));
  const matches = profanityFilter.checkText(text);

  if (matches.length === 0) {
    // 비속어가 없으면 일반 텍스트로 표시
    return (
      <Box component="span" sx={sx} style={style}>
        {text}
      </Box>
    );
  }

  // 비속어가 있으면 하이라이트와 함께 렌더링
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, index) => {
    // 비속어 이전 텍스트
    if (match.startIndex > lastIndex) {
      parts.push(
        <span key={`text-${index}`}>
          {text.substring(lastIndex, match.startIndex)}
        </span>
      );
    }

    // 비속어 텍스트 (하이라이트)
    parts.push(
      <Box
        key={`profanity-${index}`}
        component="span"
        sx={{
          backgroundColor: 'red',
          color: 'white',
          padding: '2px 4px',
          borderRadius: '2px',
          fontWeight: 'bold',
          animation: 'blink 1s infinite',
          '@keyframes blink': {
            '0%, 50%': { opacity: 1 },
            '51%, 100%': { opacity: 0.3 }
          }
        }}
      >
        {text.substring(match.startIndex, match.endIndex)}
      </Box>
    );

    lastIndex = match.endIndex;
  });

  // 마지막 비속어 이후 텍스트
  if (lastIndex < text.length) {
    parts.push(
      <span key="text-end">
        {text.substring(lastIndex)}
      </span>
    );
  }

  return (
    <Box component="span" sx={sx} style={style}>
      {parts}
    </Box>
  );
};

export default ProfanityHighlightText;