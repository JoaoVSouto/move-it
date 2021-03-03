export default function stringifyCookies(cookies: object) {
  return Object.keys(cookies)
    .reduce((cookiesArr, cookieKey) => {
      cookiesArr.push(`${cookieKey}=${cookies[cookieKey]}`);
      return cookiesArr;
    }, [])
    .join('; ');
}
