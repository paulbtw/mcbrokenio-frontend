export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    return;
  }
  // @ts-ignore
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
