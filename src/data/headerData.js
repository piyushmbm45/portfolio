/**
 * Profile Photo Management
 * 
 * To update your profile photo:
 * 1. Replace the image file at: src/assets/png/profile_photo.png
 *    OR
 * 2. Import a new image and update the 'image' property below
 * 
 * Recommended image specifications:
 * - Format: PNG, JPG, or WebP
 * - Size: 400x400px or larger (square aspect ratio)
 * - File size: Under 500KB for best performance
 * - Background: Transparent or solid color (will be displayed as a circle)
 */

import resume from '../assets/pdf/piyush_full_Stack_developer.pdf';
import img from '../assets/png/profile_photo.png';
import placeholderImg from '../assets/png/placeholder.png';

export const headerData = {
  name: 'Piyush Jain',
  title: 'Full Stack Web Developer',
  description:
    'As a web developer, I turn ideas into interactive experiences, crafting digital solutions that empower businesses and individuals to thrive in the online world.',
  // Profile Photo Configuration
  image: img, // Main profile photo - replace this import to change your photo
  imageAlt: 'Piyush Jain - Full Stack Web Developer', // Alt text for screen readers and SEO
  fallbackImage: placeholderImg, // Shown if main image fails to load
  resumePdf: resume,
};
