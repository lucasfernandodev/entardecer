export const collectInfomationDom = {

  getIcon: () => {

    interface response {
      icon: null | string
    }

    const response: response = {
      icon:null,
    };
  
    const properties = [
      'rel="icon"',
      'rel=icon',
      'rel="shortcut icon"',
      'rel="icon shortcut"',
      'rel="apple-touch-icon"',
      'itemprop="image"'
    ]
  
  
  
    for(const propertie of properties){
      try {
        const icon = document.querySelectorAll(`link[${propertie}]`);
  
        if(icon.length !== 0){
          const currentIcon = icon[icon.length - 1] as HTMLLinkElement;
          response.icon = currentIcon.href;
          break;
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    return response.icon;
  },




  getTitle: () => {
    return document.title || null;
  },



  
  getUrl: () => {
    return {
      origin: window.location.origin || null,
      url: window.location.href || null,
      pathname: window.location.pathname || null
    }
  },




  getPageName: () => {
    const properties: any = [];

    try {
      document.querySelectorAll('meta').forEach(element => {
        const property = element.getAttribute('property');
        const name = element.getAttribute('name');
  
        if(property !== null && property === 'og:site_name') {
          properties.push(element?.content || null)
        }
  
        if(property !== null && property === 'og:title') {
          properties.push(element?.content || null)
        }
  
        if(name === 'twitter:title'){
          properties.push(element?.content || null)
        }
      })
    } catch (error) {
      console.log(`error`, error)
    }

    if(properties.length !== 0){
      return properties[0]
    }

    return null;
  }
}