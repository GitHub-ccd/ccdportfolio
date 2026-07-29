/**
 * Utility to normalize asset paths across both local development (localhost)
 * and production static exports (GitHub Pages with /ccdportfolio subpath).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/ccdportfolio' : '');

export function getAssetPath(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  // Ensure path starts with a slash
  let cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Strip hardcoded '/ccdportfolio' if present, to normalize the root relative path
  if (cleanPath.startsWith('/ccdportfolio/')) {
    cleanPath = cleanPath.slice('/ccdportfolio'.length);
  }
  
  // In development, basePath is empty, so cleanPath resolves to '/img/...' on localhost.
  // In production, basePath is '/ccdportfolio', so resolves to '/ccdportfolio/img/...' for GitHub Pages.
  return `${basePath}${cleanPath}`;
}

export default getAssetPath;
