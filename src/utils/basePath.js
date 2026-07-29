/**
 * Utility to prepend basePath to static image and asset links for GitHub Pages deployment.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/ccdportfolio' : '');

export function getAssetPath(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  // Ensure path starts with a slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // If cleanPath already starts with basePath, return cleanPath directly
  if (basePath && cleanPath.startsWith(basePath)) return cleanPath;
  
  return `${basePath}${cleanPath}`;
}

export default getAssetPath;
