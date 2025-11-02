# Next.js Migration Guide

This project has been migrated from Create React App to Next.js.

## Changes Made

1. **Project Structure**: Converted to Next.js App Router structure
   - `app/` - Next.js app directory with pages and layout
   - `components/` - All React components (marked with 'use client')
   - `public/Photo/` - Static assets (moved from src/Photo/)

2. **Routing**: Converted from React Router to Next.js App Router
   - `/` - Main POS page (equivalent to App.js)
   - `/dashboard` - Dashboard page (equivalent to Maindb.js)

3. **Dependencies**: Updated package.json for Next.js
   - Removed: react-scripts, react-router-dom
   - Added: next

## Running the Application

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the Next.js development server**:
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:3000

3. **Run the Express API server** (in a separate terminal):
   ```bash
   cd Apidb
   node Dbs.js
   ```
   The API server runs on http://localhost:3001

## Build for Production

```bash
npm run build
npm start
```

## Important Notes

- All components using hooks or browser APIs must have 'use client' directive
- Image paths in CSS are now relative to /public (e.g., `/Photo/image.jpg`)
- The Express API server must be running separately
- Bootstrap is loaded in the root layout via CDN

## Migration Status

✅ Project structure created
✅ Components migrated to Next.js format
✅ Routing converted to App Router
✅ Global styles moved to app/globals.css
✅ Assets moved to public/Photo/
✅ Client components marked with 'use client'
