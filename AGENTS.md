# Muraasala - Premium Design System

## Overview

A premium, Apple-inspired landing page for Muraasala WhatsApp Business API with sophisticated animations, bento grid layouts, and modern glass morphism effects.

## Brand Colors

```css
--brand: #0B5C58;        /* Primary teal */
--accent: #F2B705;       /* Gold accent */
```

## Typography

| Class | Size | Usage |
|-------|------|-------|
| `.text-hero` | clamp(3rem, 8vw, 7rem) | Hero headlines |
| `.text-headline` | clamp(2rem, 5vw, 4rem) | Section titles |
| `.text-title` | clamp(1.25rem, 2vw, 1.75rem) | Card titles |
| `.text-lead` | clamp(1.125rem, 1.5vw, 1.375rem) | Body text large |
| `.text-body` | 1rem | Body text |
| `.text-caption` | 0.75rem uppercase | Labels |

## Components

### Buttons
```html
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-accent">Accent</button>
<button class="btn-lg">Large</button>
```

### Cards
```html
<div class="card">Standard card</div>
<div class="card-premium">Gradient background</div>
<div class="card-glass">Glass morphism</div>
<div class="feature-card">Feature with icon</div>
```

### Bento Grid
```html
<div class="bento">
  <div class="bento-col-12">Full width</div>
  <div class="bento-col-6">Half width</div>
  <div class="bento-col-4">Third width</div>
</div>
```

## Animations

### Scroll Reveal
```tsx
<Reveal delay={100}>
  <div>Content fades up on scroll</div>
</Reveal>
```

### Hooks
```tsx
const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
const progress = useScrollProgress();
const { ref, offset } = useParallax(0.1);
```

### CSS Animations
- `animate-float` - Floating elements
- `animate-pulse-soft` - Soft pulsing
- `animate-gradient-x` - Moving gradients

## Design Features

1. **Hero Section**
   - Animated aurora background
   - Gradient text effects
   - Floating decorations
   - Glass card product showcase
   - Parallax scroll effect

2. **Features Section**
   - Bento grid layout
   - Icon boxes with gradients
   - Hover effects with glow
   - "Coming Soon" badges

3. **Contact Section**
   - Glass morphism card
   - Stats grid (24/7, 99.9%, Fast)
   - WhatsApp & Email CTAs

4. **Navigation**
   - Glass morphism header
   - Scroll-based transparency
   - Mobile sheet menu

## RTL Support

Full right-to-left support:
- Logical CSS properties
- Arabic typography
- Mirrored layouts

## Build

```bash
npm install
npm run dev
npm run build
```

## Key Files

- `src/index.css` - Design system
- `src/pages/HomePage.tsx` - Main page
- `src/components/Header.tsx` - Navigation
- `src/hooks/` - Animation hooks
