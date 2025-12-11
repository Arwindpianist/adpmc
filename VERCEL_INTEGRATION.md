# Vercel Integration Setup Guide

This guide explains how to set up the Vercel integration to automatically display your Vercel projects on the projects page.

## Overview

The projects page now automatically fetches all your active Vercel projects and displays them with their correct domains. You no longer need to manually add new projects to the `deployedProjects` array.

## Setup Steps

### 1. Get Your Vercel API Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Navigate to the **Tokens** section
3. Click **Create Token**
4. Give it a name (e.g., "Projects Page Integration")
5. Set the expiration (recommended: **No expiration** for production)
6. Click **Create**
7. **Copy the token** - you won't be able to see it again!

### 2. Add Token to Environment Variables

#### For Local Development

Create or update your `.env.local` file in the project root:

```env
VERCEL_TOKEN=your_vercel_api_token_here
```

#### For Production (Vercel Deployment)

1. Go to your project settings on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `VERCEL_TOKEN`
   - **Value**: Your Vercel API token
   - **Environment**: Production, Preview, and Development (or as needed)
4. Click **Save**

### 3. Deploy/Redeploy

After adding the environment variable, redeploy your application:

- **If deploying on Vercel**: The next deployment will automatically pick up the new environment variable
- **If running locally**: Restart your development server (`npm run dev`)

## How It Works

1. **Vercel API Integration** (`/api/vercel-projects`):
   - Fetches all your Vercel projects
   - Gets custom domains for each project
   - Retrieves production deployment URLs
   - Matches projects with GitHub repositories (if applicable)

2. **Automatic Detection** (`/api/detect-projects`):
   - Combines Vercel projects with subdomain detection
   - Merges with GitHub repository homepage URLs
   - Removes duplicates based on hostname
   - Returns a unified list of detected projects

3. **Projects Page Display**:
   - Automatically fetches from `/api/detect-projects` on load
   - Refreshes every 5 minutes
   - Displays all detected projects including Vercel deployments

## Features

- ✅ **Automatic Updates**: New Vercel projects appear automatically
- ✅ **Correct Domains**: Uses actual custom domains or Vercel URLs
- ✅ **GitHub Integration**: Automatically matches Vercel projects with GitHub repos
- ✅ **Production Only**: Only shows projects with production deployments
- ✅ **Verified Domains**: Only includes verified custom domains
- ✅ **Fallback Support**: Falls back gracefully if Vercel API is unavailable

## Troubleshooting

### Projects Not Appearing

1. **Check Token**: Verify `VERCEL_TOKEN` is set correctly
2. **Check Console**: Look for errors in server logs
3. **Verify Projects**: Ensure your Vercel projects have:
   - Production deployments
   - Custom domains (verified) or production URLs
4. **API Limits**: Vercel API has rate limits - if you have many projects, there may be delays

### Token Issues

- **Invalid Token**: Make sure you copied the entire token
- **Expired Token**: Create a new token if the old one expired
- **Permissions**: Ensure the token has access to your projects

### Environment Variable Not Working

- Make sure `.env.local` is in the project root (not in a subdirectory)
- Restart your development server after adding the variable
- For production, redeploy after adding the environment variable

## API Endpoints

### `/api/vercel-projects`
Fetches and returns all Vercel projects with their domains.

**Response:**
```json
{
  "success": true,
  "projects": [
    {
      "title": "my-project",
      "description": "Vercel deployment for my-project",
      "url": "https://my-project.vercel.app",
      "githubUrl": "https://github.com/user/my-project",
      "detected": true
    }
  ],
  "count": 1
}
```

### `/api/detect-projects`
Combines Vercel projects with other detection methods (subdomain scanning, GitHub).

## Notes

- Projects are cached for performance
- The integration prioritizes Vercel projects over other detection methods
- Only production deployments are shown
- Custom domains must be verified to appear

