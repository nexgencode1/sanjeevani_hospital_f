import { useEffect } from 'react';

/**
 * PageSEO Component
 * Dynamically manages SEO meta tags, OpenGraph, Canonical URLs, and JSON-LD schema
 * for each individual page in the application.
 */
export default function PageSEO({
  title,
  description,
  keywords,
  canonicalPath = '',
  schemaData = null,
  ogType = 'website',
  image = 'https://sanjeevanihospital.in/hospital-building.jpg'
}) {
  useEffect(() => {
    // 1. Page Title
    if (title) {
      document.title = title;
    }

    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    if (description) {
      setMetaTag('name', 'description', description);
    }
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Canonical Link
    const fullCanonicalUrl = `https://sanjeevanihospital.in${canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : ''}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. OpenGraph Tags
    if (title) setMetaTag('property', 'og:title', title);
    if (description) setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    if (image) setMetaTag('property', 'og:image', image);

    // 5. Twitter Card Tags
    if (title) setMetaTag('name', 'twitter:title', title);
    if (description) setMetaTag('name', 'twitter:description', description);
    if (image) setMetaTag('name', 'twitter:image', image);

    // 6. Page-Specific JSON-LD Schema
    let schemaScript = document.getElementById('page-jsonld-schema');
    if (schemaData) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'page-jsonld-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaData);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Optional cleanup on unmount if needed
    };
  }, [title, description, keywords, canonicalPath, schemaData, ogType, image]);

  return null;
}
