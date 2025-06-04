# Fivestar Business Finance - Payments Engine Style Guide

<div align="center">

![1CloudHub Logo](https://www.1cloudhub.com/wp-content/uploads/2020/01/1CloudHub-Logo-horiz-hires-RGB-copy-1.jpg)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Fivestar Logo](https://fivestargroup.in/storage/2023/04/fivestart-logo-1.png)

**Visual Design & Brand Standards**

</div>

---

## Document Information

| **Field** | **Details** |
|-----------|-------------|
| **Document Title** | Style Guide |
| **Project Name** | Fivestar Payments Engine Modernization |
| **Client** | Fivestar Business Finance |
| **Prepared By** | 1CloudHub Design Team |
| **Document Version** | v1.0 |
| **Date** | May 16, 2025 |
| **Document Type** | Visual Design Standards |
| **Classification** | Confidential |

---

## Approval & Sign-off

| **Role** | **Name** | **Signature** | **Date** |
|----------|----------|---------------|----------|
| **Design Lead** | 1CloudHub Design Team | ✅ *Approved* | May 16, 2025 |
| **Product Owner** | Azharuddin Nurul | ✅ *Approved* | May 20, 2025 |
| **Brand Manager** | Fivestar Marketing | ✅ *Approved* | May 18, 2025 |
| **1CloudHub CRO** | Ramakrishna Phani | ✅ *Approved* | May 16, 2025 |

**Approval Status:** ![Status](https://img.shields.io/badge/Status-Approved-green)  
**GitHub Issue:** [Issue #9 - Style Guide Brand Review](https://github.com/1cloudhub/fivestar-payments-engine/issues/9)  
**Sign-off Tracker:** [Link to tracker](../08_Customer_Approvals/SIGN_OFF_TRACKER.md)

---

## Revision History

| **Version** | **Date** | **Author** | **Changes** | **Approved By** |
|-------------|----------|------------|-------------|-----------------|
| v1.0 | May 16, 2025 | 1CloudHub Design Team | Initial brand guidelines and component library | Azharuddin Nurul |

---

## 1. Introduction

This style guide establishes the visual and interaction standards for the Fivestar Payments Engine modernization project. It serves as a reference for designers and developers to ensure consistency, accessibility, and usability across the entire application.

## 2. Color Palette

### 2.1 Primary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Deep Blue | `#003366` | rgb(0, 51, 102) | Primary brand color, headers, primary buttons |
| Vibrant Red | `#D32F2F` | rgb(211, 47, 47) | Accent color, call-to-action elements, alerts |

### 2.2 Secondary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Gold | `#FFC107` | rgb(255, 193, 7) | Highlights, secondary CTAs, success states |
| White | `#FFFFFF` | rgb(255, 255, 255) | Backgrounds, cards, content areas |

### 2.3 Neutral Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Light Gray | `#F5F5F5` | rgb(245, 245, 245) | Page backgrounds, alternate rows |
| Medium Gray | `#E0E0E0` | rgb(224, 224, 224) | Borders, dividers, disabled states |
| Dark Gray | `#757575` | rgb(117, 117, 117) | Secondary text, icons |
| Charcoal | `#212121` | rgb(33, 33, 33) | Primary text, headers |

### 2.4 Status Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Success Green | `#4CAF50` | rgb(76, 175, 80) | Success messages, positive indicators |
| Warning Amber | `#FFA000` | rgb(255, 160, 0) | Warnings, caution indicators |
| Error Red | `#D32F2F` | rgb(211, 47, 47) | Error messages, failure indicators |
| Info Blue | `#2196F3` | rgb(33, 150, 243) | Information messages, help indicators |

## 3. Typography

### 3.1 Font Family

- **Primary Font**: Roboto (Sans-serif)
- **Secondary Font**: Open Sans (Sans-serif)
- **Fallback**: System UI fonts (Segoe UI, Helvetica, Arial, sans-serif)

### 3.2 Type Scale

| Element | Font | Weight | Size | Line Height | Usage |
|---------|------|--------|------|-------------|-------|
| H1 | Roboto | 700 | 28px | 36px | Page titles |
| H2 | Roboto | 700 | 24px | 32px | Section headers |
| H3 | Roboto | 600 | 20px | 28px | Card titles, sub-sections |
| H4 | Roboto | 600 | 18px | 24px | Widget headers |
| H5 | Roboto | 600 | 16px | 24px | Small section headers |
| Body 1 | Open Sans | 400 | 16px | 24px | Primary content |
| Body 2 | Open Sans | 400 | 14px | 20px | Secondary content |
| Caption | Open Sans | 400 | 12px | 16px | Supporting text, timestamps |
| Button | Roboto | 500 | 14px | 20px | Button text |
| Label | Roboto | 500 | 14px | 20px | Form labels |

### 3.3 Text Colors

| Context | Color | Hex Code |
|---------|-------|----------|
| Primary Text | Charcoal | `#212121` |
| Secondary Text | Dark Gray | `#757575` |
| Disabled Text | Medium Gray | `#9E9E9E` |
| Links | Deep Blue | `#003366` |
| Error Text | Error Red | `#D32F2F` |

## 4. Spacing System

### 4.1 Spacing Scale

A consistent 8px spacing scale should be used throughout the application:

| Scale | Value | Usage |
|-------|-------|-------|
| xs | 4px | Minimal spacing, icons |
| s | 8px | Tight spacing, buttons |
| m | 16px | Standard spacing, form fields |
| l | 24px | Wider spacing, section margins |
| xl | 32px | Large spacing, section padding |
| xxl | 48px | Extra large spacing, page margins |

### 4.2 Layout Grid

- Base unit: 8px
- Columns: 12-column grid system
- Gutters: 16px (mobile), 24px (tablet), 32px (desktop)
- Margins: 16px (mobile), 32px (tablet), 48px (desktop)

## 5. Components

### 5.1 Buttons

#### 5.1.1 Button Types

| Type | Background | Text Color | Border | Usage |
|------|------------|------------|--------|-------|
| Primary | Deep Blue | White | None | Primary actions |
| Secondary | White | Deep Blue | 1px Deep Blue | Secondary actions |
| Tertiary | Transparent | Deep Blue | None | Tertiary actions |
| Danger | Error Red | White | None | Destructive actions |

#### 5.1.2 Button States

| State | Visual Change |
|-------|---------------|
| Hover | 10% darker background |
| Focus | 2px outline in accent color + focus ring |
| Active | 20% darker background |
| Disabled | 50% opacity, no hover effects |

#### 5.1.3 Button Sizes

| Size | Padding | Font Size | Height |
|------|---------|-----------|--------|
| Small | 8px 16px | 12px | 32px |
| Medium | 12px 24px | 14px | 40px |
| Large | 16px 32px | 16px | 48px |

### 5.2 Form Elements

#### 5.2.1 Text Inputs

| State | Border | Background | Text |
|-------|--------|------------|------|
| Default | 1px Medium Gray | White | Charcoal |
| Focus | 2px Deep Blue | White | Charcoal |
| Disabled | 1px Medium Gray | Light Gray | Dark Gray |
| Error | 1px Error Red | White | Charcoal |

#### 5.2.2 Dropdowns

Follow same styling as text inputs, with added dropdown icon in Dark Gray.

#### 5.2.3 Checkboxes & Radio Buttons

- **Unchecked**: 1px Medium Gray border, White background
- **Checked**: Deep Blue background, White checkmark/dot
- **Focus**: 2px Deep Blue focus ring
- **Disabled**: Light Gray background, Medium Gray border

#### 5.2.4 Form Layout

- **Label Position**: Above input fields
- **Helper Text**: Below input fields
- **Error Messages**: Below input fields, Error Red color
- **Required Fields**: Indicated with an asterisk (*) next to label
- **Field Spacing**: 24px between fields

### 5.3 Cards

| Element | Styling |
|---------|---------|
| Background | White |
| Border | None |
| Border Radius | 8px |
| Shadow | 0 2px 4px rgba(0, 0, 0, 0.1) |
| Padding | 24px |
| Header Padding | 16px 24px |
| Footer Padding | 16px 24px |
| Divider | 1px Medium Gray |

### 5.4 Tables

| Element | Styling |
|---------|---------|
| Header Background | Light Gray |
| Header Text | Charcoal, Bold, 14px |
| Row Background | White |
| Alternate Row | Light Gray (optional) |
| Cell Padding | 12px 16px |
| Border | 1px Medium Gray |
| Hover State | 5% tint of Deep Blue |
| Selected State | 10% tint of Deep Blue |

### 5.5 Data Visualization

| Element | Color Recommendations |
|---------|----------------------|
| Primary Data Series | Deep Blue |
| Secondary Data Series | Gold |
| Tertiary Data Series | Medium Gray |
| Positive Trends | Success Green |
| Negative Trends | Error Red |
| Neutral Data | Dark Gray |

## 6. Icons

### 6.1 Icon System

- **Style**: Outlined/Stroke-based
- **Grid**: 24x24px
- **Stroke**: 2px
- **Corner Radius**: 2px

### 6.2 Icon Sizes

| Size | Dimensions | Usage |
|------|------------|-------|
| Small | 16x16px | Inline with text, dense UIs |
| Medium | 24x24px | Standard UI elements |
| Large | 32x32px | Feature highlights, illustrations |

### 6.3 Common Icons

| Icon | Usage |
|------|-------|
| Search | Search functionality |
| Plus | Add new items |
| Edit | Modify existing items |
| Delete | Remove items |
| Download | Download reports/files |
| Upload | Upload documents |
| Filter | Filter data |
| Sort | Sort data |
| Alert | Warnings or alerts |
| Check | Success or completion |
| Close | Close modals or panels |

## 7. Imagery & Illustrations

### 7.1 Photography

- **Style**: Clean, professional, representing diverse Indian financial contexts
- **Treatment**: Subtle desaturation (10-20%), increased contrast
- **Subject Matter**: Branch operations, field collections, customer interactions, digital payments

### 7.2 Illustrations

- **Style**: Clean, minimal line illustrations with selective color highlights
- **Colors**: Primarily Deep Blue and Gold with selective Red accents
- **Purpose**: To explain complex workflows, onboarding, and empty states

## 8. Motion & Microinteractions

### 8.1 Animation Timing

| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | 100-150ms | Buttons, tooltips |
| Medium | 200-300ms | Panels, drawers |
| Slow | 300-500ms | Page transitions |

### 8.2 Easing

- **Standard**: Ease-out (0.25, 0.1, 0.25, 1)
- **Entrance**: Ease-out-cubic (0.33, 1, 0.68, 1)
- **Exit**: Ease-in-cubic (0.32, 0, 0.67, 0)

### 8.3 Common Animations

| Element | Animation |
|---------|-----------|
| Button Press | Subtle scale down (95%) |
| Form Validation | Gentle side-to-side shake for errors |
| Loading States | Pulsing opacity or circular progress |
| Page Transitions | Fade in/out |
| Modal/Dialog | Fade in + slight scale up from 95% |
| Dropdown/Menu | Fade in + subtle slide down |

## 9. Responsive Design

### 9.1 Breakpoints

| Breakpoint | Range | Target Devices |
|------------|-------|---------------|
| Mobile | 320px - 767px | Smartphones |
| Tablet | 768px - 1023px | Tablets, small laptops |
| Desktop | 1024px - 1439px | Laptops, desktops |
| Large Desktop | 1440px+ | Large monitors |

### 9.2 Layout Adjustments

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navigation | Bottom tab bar | Side drawer | Full sidebar |
| Data Tables | Stacked cards | Scrollable tables | Full tables |
| Forms | Full width, stacked | 2-column grid possible | Multi-column grid |
| Buttons | Full width or icon | Standard width | Standard width |
| Font Size | -1px from base | Base size | Base size |

## 10. Accessibility Guidelines

### 10.1 Color Contrast

- **Text**: Minimum ratio of 4.5:1 for normal text, 3:1 for large text
- **UI Components**: Minimum ratio of 3:1 between adjacent colors

### 10.2 Focus States

- All interactive elements must have visible focus states
- Focus outlines should be 2px with high contrast

### 10.3 Touch Targets

- Minimum size of 44px × 44px for all touch targets
- Adequate spacing between interactive elements (minimum 8px)

### 10.4 Text Alternatives

- All images must have appropriate alt text
- Icons should have descriptive text or aria-labels

### 10.5 Keyboard Navigation

- All interactive elements must be accessible via keyboard
- Clear visual indicators for keyboard focus
- Logical tab order following visual layout

## 11. Voice & Tone

### 11.1 Writing Style

- **Clear**: Use simple, direct language
- **Concise**: Keep messages brief and to the point
- **Professional**: Maintain a business-appropriate tone
- **Helpful**: Focus on guiding the user
- **Human**: Avoid overly technical jargon

### 11.2 Common UI Text

| Context | Example |
|---------|---------|
| Confirmations | "Transaction successful. Receipt #12345 has been generated." |
| Errors | "Unable to process payment. Please check your connection and try again." |
| Empty States | "No transactions found for this period. Payments will appear here when processed." |
| Loading | "Processing your request..." |
| Hints | "Enter the 16-digit number from the customer's loan account." |

## 12. Component Patterns

### 12.1 Navigation Patterns

#### 12.1.1 Main Navigation

- Desktop: Left sidebar with nested categories, showing icons and text
- Tablet: Collapsible sidebar with icons and text
- Mobile: Bottom tab bar with primary sections, hamburger menu for additional items

#### 12.1.2 Secondary Navigation

- Page-level tabs for switching between related views
- Breadcrumbs for deep navigation paths
- Back buttons for multi-step processes

### 12.2 Page Templates

#### 12.2.1 Dashboard Layout

- Header with page title and global actions
- Card-based widgets in a responsive grid
- Quick access shortcuts
- Summary metrics at top
- Detailed sections below

#### 12.2.2 List/Table View

- Filter and search controls at top
- Bulk action buttons
- Sortable column headers
- Pagination controls at bottom
- Item-level action buttons

#### 12.2.3 Detail View

- Back button to list view
- Overview section at top
- Tabbed sections for related information
- Action buttons in consistent position
- Related items in cards or sections

#### 12.2.4 Form Layout

- Clear grouping of related fields
- Progressive disclosure for complex forms
- Validation feedback adjacent to fields
- Persistent save/submit buttons (sticky on scroll)

## 13. Application-Specific Patterns

### 13.1 Payment Processing

- Status indicators with consistent colors
- Transaction amount in prominent position
- Receipt number in copy-friendly format
- Timeline visualization for multi-stage processes

### 13.2 Approval Workflows

- Clear indication of current approval stage
- Audit trail with timestamps and user information
- Action buttons appropriate to user role and stage
- Preview of data being approved

### 13.3 Reconciliation Views

- Side-by-side comparison layouts
- Color-coding for matched/unmatched items
- Running totals and difference calculations
- Batch status indicators

## 14. File Naming & Organization

### 14.1 Design Assets

- **Pattern**: `fivestar-[component]-[variant]-[state].[format]`
- **Example**: `fivestar-button-primary-hover.png`

### 14.2 Code Components

- **Pattern**: `FivestarComponentName.tsx`
- **Example**: `FivestarButton.tsx`

### 14.3 CSS/SCSS

- **Pattern**: `_component.scss`
- **Example**: `_buttons.scss`

## 15. Implementation Guidelines

### 15.1 CSS Approach

- Use CSS-in-JS or SCSS with BEM naming convention
- Create reusable mixins for common patterns
- Maintain a consistent import order
- Document complex calculations or hacks

### 15.2 Responsive Implementation

- Mobile-first approach
- Use relative units (rem, em) for typography and spacing
- Avoid fixed widths where possible
- Test on real devices

### 15.3 Performance Considerations

- Optimize images before implementation
- Minimize DOM nesting
- Avoid expensive CSS properties (box-shadow, border-radius with overflow)
- Lazy load offscreen content

## 16. Versioning & Updates

This style guide is a living document that will evolve over time. Significant updates will be versioned and documented.

- **Current Version**: 1.0
- **Last Updated**: May 16, 2025
- **Next Review**: August 16, 2025

## 17. Resources & Assets

- Design System Figma Library: [Link to Figma]
- Icon Library: [Link to Icon Set]
- Color Palette Adobe Swatch: [Link to Swatch File]
- Font Files: [Link to Font Package]

---

**Document Classification:** Confidential  
**Distribution:** Limited to design and development stakeholders  
**Next Review Date:** August 16, 2025  
**Document Owner:** 1CloudHub Design Team

---

*This document contains confidential and proprietary information of 1CloudHub and Fivestar Business Finance. Any reproduction or distribution without written consent is prohibited.*
