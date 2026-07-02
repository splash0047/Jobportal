---
version: alpha
name: JobPortal-Modern-Design
description: A premium, modern design language for the Intelligent Job Portal. It features a vibrant sky blue primary color, deep slate grays for text, clean rounded cards, and smooth modern typography to deliver a premium user experience.

colors:
  primary: "#00A7F3"
  primary-hover: "#0086C3"
  primary-soft: "#E0F4FE"
  secondary: "#6366F1"
  secondary-hover: "#4F46E5"
  ink: "#0F172A"
  ink-secondary: "#475569"
  ink-mute: "#94A3B8"
  canvas: "#FFFFFF"
  canvas-soft: "#F8FAFC"
  success: "#10B981"
  warning: "#F59E0B"
  error: "#EF4444"
  border: "#E2E8F0"

typography:
  display-xl:
    fontFamily: "Urbanist, Inter, system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.8px
  display-lg:
    fontFamily: "Urbanist, Inter, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.6px
  heading-lg:
    fontFamily: "Urbanist, Inter, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.4px
  heading-md:
    fontFamily: "Urbanist, Inter, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  button-md:
    fontFamily: "Urbanist, Inter, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.0
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4

rounded:
  sm: 6px
  md: 12px
  lg: 16px
  xl: 24px
  pill: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    border: "1px solid {colors.primary}"
  card-job:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: 24px
    border: "1px solid {colors.border}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 16px
    border: "1px solid {colors.border}"
---

# Design System Guidelines

This document specifies the design system for the **Intelligent Job Portal with AI Resume Analysis**. AI coding assistants and developers should refer to this document to ensure visual consistency and premium user experience across all interfaces.

## 🎨 Color Palette & Roles

*   **Primary Color (`#00A7F3`)**: Represents technology, trust, and modernity. Used for primary call-to-actions, active navigation items, and highlighted brand highlights.
*   **Secondary Color (`#6366F1`)**: A vibrant indigo used for accents, badges, AI-related features, and secondary interactive components.
*   **Ink (`#0F172A`)**: Slate-900, our main text color. It provides high contrast while being softer on the eyes than pure black.
*   **Ink Secondary (`#475569`)**: Slate-600, used for body text, subtitles, and descriptions.
*   **Ink Mute (`#94A3B8`)**: Slate-400, used for hints, helper text, and disabled states.
*   **Canvas (`#FFFFFF`)**: Pure white, used for cards, sheets, dialog backgrounds, and content areas.
*   **Canvas Soft (`#F8FAFC`)**: Slate-50, our primary background color for the application shell.
*   **Success (`#10B981`)**: Emerald-500, used for success messages, "applied" badges, positive resume analysis scores, and hired states.
*   **Warning (`#F59E0B`)**: Amber-500, used for pending reviews or alert messages.
*   **Error (`#EF4444`)**: Red-500, used for validation errors, failed actions, and rejections.

## ✍️ Typography

We use **Urbanist** for display headings, buttons, and high-impact UI elements to create a sleek, modern, and friendly tone. We use **Inter** (or standard system sans-serif fallback) for long-form body text and labels to guarantee maximum readability.

### Headings
*   **Display XL (40px, Bold, tight spacing)**: Used for main marketing headings and hero section titles.
*   **Display LG (32px, Bold, tight spacing)**: Used for dashboard headers and page titles.
*   **Heading LG (24px, Semi-Bold)**: Used for card titles and section headers.
*   **Heading MD (20px, Semi-Bold)**: Used for smaller subheadings and settings group titles.

### Body & Labels
*   **Body LG (16px, Regular, 1.6 line height)**: Primary text size for blog articles, long descriptions, and emails.
*   **Body MD (14px, Regular, 1.5 line height)**: Standard size for descriptions, forms, metadata, and tables.
*   **Caption (12px, Regular)**: Used for tiny label details, timestamps, and supporting annotations.

## 📐 Spacing & Layout

All padding, margins, and gaps should align with an 8px grid system to maintain a clean layout balance:
*   `xs` (4px): Micro-spacing (e.g., between icon and text).
*   `sm` (8px): Inner card element spacing, list item gaps.
*   `md` (16px): Input padding, spacing between smaller cards.
*   `lg` (24px): Standard page content margins, large card padding.
*   `xl` (32px): Layout grid gaps, section gaps.
*   `xxl` (48px): Large landing page section margins.

## 📦 Component Behaviors

### Buttons
*   **Primary Button**: Large tap targets with fully rounded corner styles or `rounded.md`. Slight scale transition on hover and active click states.
*   **Secondary Button**: Transparent background with a primary color border. Used for tertiary actions.
*   **Shadows**: Subtle shadows to suggest elevation. Never use heavy, dark shadows. Use a soft slate shadow (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`).
