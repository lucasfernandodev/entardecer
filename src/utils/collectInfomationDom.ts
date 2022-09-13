export const collectInfomationDom = {
  getIcon: () => {
    interface response {
      icon: null | string;
    }

    const response: response = {
      icon: null,
    };

    const properties = [
      'rel="icon"',
      'rel=icon',
      'rel="shortcut icon"',
      'rel="icon shortcut"',
      'rel="apple-touch-icon"',
    ];

    if (!document.querySelector('link[rel=icon]')) {
      // Search favicons
      for (const property of properties) {
        try {
          const icon = document.querySelectorAll(`link[${property}]`);

          if (icon.length !== 0) {
            const currentIcon = icon[icon.length - 1] as HTMLLinkElement;
            response.icon = currentIcon.href;
            break;
          }
        } catch (error) {
          // Icon not found
        }
      }

      if (response.icon !== null) {
        return response.icon;
      } else {
        // Search icon in <meta>
        const icon = document.querySelector(
          `meta[itemprop=image]`
        ) as HTMLMetaElement;
        if (icon !== null) {
          response.icon = `${location.origin}/${icon.content}`; // Add link complet
        }
      }
      return response.icon;
    } else {
      const icon = document.querySelector('link[rel=icon]') as HTMLLinkElement;
      return icon.href;
    }
  },

  getTitle: () => {
    return document.title || null;
  },

  getUrl: () => {
    return {
      origin: window.location.origin || null,
      url: window.location.href || null,
      pathname: window.location.pathname || null,
    };
  },

  getPageName: () => {
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

    return null;
  },
};
