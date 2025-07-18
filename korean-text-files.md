# Korean Text Files in Brand Studio Codebase

This document lists all TypeScript and TSX files containing Korean text that need to be translated.

## Summary
- **Total files with Korean text:** 20 files
- **Primary locations:** UI components, data files, and page components

## Files Containing Korean Text

### 1. `/Users/mihyeon/brand-studio/src/pages/BrandHub.tsx`
- Contains extensive Korean text for brand management UI
- Key translations needed:
  - "브랜드 허브" (Brand Hub)
  - "로고", "색상", "폰트", "이미지" (Logo, Color, Font, Image)
  - Various UI labels and messages

### 2. `/Users/mihyeon/brand-studio/src/pages/Home.tsx`
- Home page with Korean text
- Navigation and welcome messages

### 3. `/Users/mihyeon/brand-studio/src/components/Canvas.tsx`
- Canvas component with Korean tooltips and labels

### 4. `/Users/mihyeon/brand-studio/src/pages/Editor.tsx`
- Editor page with Korean UI elements

### 5. `/Users/mihyeon/brand-studio/src/data/unifiedFormats.ts`
- Format definitions with Korean names
- Platform-specific Korean labels

### 6. `/Users/mihyeon/brand-studio/src/App.tsx`
- Main app component with Korean navigation items

### 7. `/Users/mihyeon/brand-studio/src/components/Header.tsx`
- Header component with Korean menu items

### 8. `/Users/mihyeon/brand-studio/src/components/FormatSelector.tsx`
- Format selector with Korean labels

### 9. `/Users/mihyeon/brand-studio/src/data/templateLayouts.ts`
- Template layouts with Korean descriptions

### 10. `/Users/mihyeon/brand-studio/src/components/AssetSelector.tsx`
- Asset selector with Korean categories

### 11. `/Users/mihyeon/brand-studio/src/data/formats.ts`
- Format definitions with Korean names

### 12. `/Users/mihyeon/brand-studio/src/components/ExportDialog.tsx`
- Export dialog with Korean labels

### 13. `/Users/mihyeon/brand-studio/src/data/templates.ts`
- Template data with Korean names and descriptions

### 14. `/Users/mihyeon/brand-studio/src/components/TemplateSelector.tsx`
- Template selector with Korean UI text

### 15. `/Users/mihyeon/brand-studio/src/components/RecentWorkCard.tsx`
- Recent work card with Korean labels

### 16. `/Users/mihyeon/brand-studio/src/types.ts`
- Type definitions with Korean comments

### 17. `/Users/mihyeon/brand-studio/src/pages/Home.old.tsx`
- Old home page (backup) with Korean text

### 18. `/Users/mihyeon/brand-studio/src/main.tsx`
- Main entry point with Korean configuration

### 19. `/Users/mihyeon/brand-studio/src/components/ErrorBoundary.tsx`
- Error boundary with Korean error messages

### 20. `/Users/mihyeon/brand-studio/src/types/index.ts`
- Type definitions with Korean documentation

## Next Steps

To systematically translate these files:

1. **Create a translation mapping file** - Create a centralized file with all Korean-English translations
2. **Start with data files** - Translate format definitions and template data first
3. **Move to components** - Translate UI components systematically
4. **Update pages last** - Update page-level components after all dependencies are translated
5. **Test thoroughly** - Ensure all UI elements display correctly in English

## Priority Order for Translation

1. **High Priority** (Core functionality):
   - `/src/data/formats.ts`
   - `/src/data/unifiedFormats.ts`
   - `/src/data/templates.ts`
   - `/src/data/templateLayouts.ts`

2. **Medium Priority** (UI Components):
   - `/src/components/Header.tsx`
   - `/src/components/FormatSelector.tsx`
   - `/src/components/TemplateSelector.tsx`
   - `/src/components/AssetSelector.tsx`
   - `/src/components/ExportDialog.tsx`

3. **Lower Priority** (Pages and others):
   - `/src/pages/Home.tsx`
   - `/src/pages/Editor.tsx`
   - `/src/pages/BrandHub.tsx`
   - `/src/components/Canvas.tsx`
   - `/src/components/RecentWorkCard.tsx`
   - `/src/components/ErrorBoundary.tsx`