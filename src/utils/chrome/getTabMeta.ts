import isImageDark from "../image/isImageDark";

export const getPageMeta = async () => {
  const config = {
    title: document.title,
    url: window.location.href,
    favicon: 'default Favicon',
    brightness: false
  }

  function favicon(u: string) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "32");
    return url.toString();
  }

  config.favicon = favicon(config.url);

  try {
    const isBrightness = await isImageDark(config.favicon);
    if (!isBrightness.error?.message) {
      config.brightness = isBrightness.isDark !== null ? isBrightness.isDark : false
    }
  } catch (error: any) {

    console.log('Impossible to get favicon in this page', error)
  }

  return config;
}
