import isImageDark from '../isImageDark';


export const getIcon = () => {
  let icon: string | null = null;

  const properties = [
    'icon',
    '"shortcut icon"',
    '"icon shortcut"',
    '"apple-touch-icon"',
  ];

  const isIcon = document.querySelector('link[rel=icon]') as HTMLLinkElement;

  if (isIcon) return isIcon.href;

  // Search favicons
  for (const property of properties) {
    try {
      const elements = document.querySelectorAll(`link[rel=${property}]`);

      if (elements.length !== 0) {
        const currentIcon = elements[elements.length - 1] as HTMLLinkElement;
        icon = currentIcon.href;
        break;
      }
    } catch (error) {
      // Icon not found
    }
  }

  if (icon) return icon;

  // Search icon in <meta>
  const url = document.querySelector(`meta[itemprop=image]`) as HTMLMetaElement;
  if (url) {
    icon = `${location.origin}/${url.content}`;
  }

  return icon;
};





export const getTitle = () => {
  return document.title || 'Titlte not found';
};





export const getUrl = () => {
  return {
    origin: window.location.origin,
    url: window.location.href,
    pathname: window.location.pathname,
  };
};





export const getPageName = () => {
  const properties: any = [];

  try {
    document.querySelectorAll('meta').forEach((element) => {
      const property = element.getAttribute('property');
      const name = element.getAttribute('name');

      if (property !== null && property === 'og:site_name') {
        properties.push(element?.content || null);
      }

      if (property !== null && property === 'og:title') {
        properties.push(element?.content || null);
      }

      if (name === 'twitter:title') {
        properties.push(element?.content || null);
      }
    });
  } catch (error) {
    console.log(`error`, error);
  }

  if (properties.length !== 0) {
    return properties[0];
  }

  return document.title;
};





export const getBrightness = async (link: string | null) => {
  if (link === null) return null;
  const response = await isImageDark(link);

  return response;
};
