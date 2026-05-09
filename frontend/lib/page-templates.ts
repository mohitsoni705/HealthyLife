/**
 * Template Utilities for Page Generation
 * 
 * This file provides helper functions and patterns for creating new pages
 * following the established project structure and conventions.
 */

/**
 * Generate a basic page template
 * Usage: Use this as a starting point for new pages
 */
export const generatePageTemplate = (pageName: string) => {
  const componentName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  return `export default function ${componentName}Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">${componentName}</h1>
        <p className="text-gray-600 text-lg mb-8">
          Welcome to the ${componentName} page.
        </p>
      </div>
    </div>
  );
}`;
};

/**
 * Generate an API route template
 * Usage: Create new API endpoints with consistent structure
 */
export const generateAPITemplate = (routeName: string) => {
  return `import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Implement GET logic
    return NextResponse.json({ message: '${routeName} GET' }, { status: 200 });
  } catch (error) {
    console.error('${routeName} error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // TODO: Implement POST logic
    return NextResponse.json({ message: '${routeName} POST' }, { status: 201 });
  } catch (error) {
    console.error('${routeName} error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}`;
};

/**
 * Generate a component template
 * Usage: Create new reusable UI components
 */
export const generateComponentTemplate = (componentName: string) => {
  const camelCaseName = componentName.replace(/([A-Z])/g, ' $1').trim();
  return `'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ${componentName}Props {
  // Define props here
}

export function ${componentName}({}: ${componentName}Props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>${camelCaseName}</CardTitle>
        <CardDescription>Add description here</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add content here */}
      </CardContent>
    </Card>
  );
}`;
};

/**
 * Directory structure for a new feature
 * Usage: Reference for organizing new features
 */
export const featureStructureExample = `
Feature: User Profile
├── app/
│   └── profile/
│       ├── page.tsx                 # Main page
│       ├── layout.tsx               # Layout (optional)
│       └── components/
│           ├── ProfileCard.tsx
│           ├── EditProfileForm.tsx
│           └── ProfileSettings.tsx
├── components/
│   └── ui/
│       └── profile-components.tsx   # Shared UI components
└── lib/
    ├── types.ts                      # Types for profile
    └── profile.ts                    # Profile utilities
`;

/**
 * Common patterns to follow:
 * 
 * 1. File Naming:
 *    - Pages: page.tsx
 *    - Layouts: layout.tsx
 *    - Components: PascalCase.tsx
 *    - Utils: camelCase.ts
 *    - Types: types.ts
 * 
 * 2. Component Structure:
 *    - Use 'use client' for interactive components
 *    - Import shadcn/ui components
 *    - Define interfaces for props
 *    - Use TypeScript for type safety
 * 
 * 3. API Routes:
 *    - Use NextRequest and NextResponse
 *    - Handle try-catch for errors
 *    - Return JSON responses
 *    - Log errors to console
 * 
 * 4. Styling:
 *    - Use Tailwind CSS
 *    - Follow mobile-first approach
 *    - Use consistent spacing and colors
 *    - Import shadcn/ui for components
 */
