export default async function handler(request, context) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    console.log('Request URL:', request.url);
  
    // Fetch your redirect config entry from Contentstack
    const stackApiKey = context.env.STACK_API_KEY;
    const deliveryToken = context.env.DELIVERY_TOKEN;
    const entryUID = context.env.ENTRY_UID; // your entry UID
    const contentTypeUID = context.env.CONTENT_TYPE_UID; // your content type UID
    const locale = context.env.LOCALE; // e.g., 'en-us'


    const apiUrl = `https://cdn.contentstack.io/v3/content_types/${contentTypeUID}/entries/${entryUID}?locale=${locale}`;
  
    console.log('API URL:', apiUrl);

    // const response = await fetch(apiUrl, {
    //   headers: {
    //     api_key: stackApiKey,
    //     access_token: deliveryToken,
    //   },
    // });

    // if (!response.ok) {
    //   // Fallback to origin if the CMS call fails
    //   return fetch(request);
    // }

    // const data = await response.json();
    // const redirects = data.entry.redirects || [];

    const redirects = [
      { source: '/posts/cms', destination: '/support/cms', status_code: 301 },
      { source: '/posts/preview', destination: '/support/preview', status_code: 301 },
    ];
  
    console.log('Redirects:', redirects);
    // Match against path
    const match = redirects.find((r) => r.source === pathname);

    console.log('Match:', match);
  
    if (match) {
      return new Response(null, {
        status: match.status_code || 302,
        headers: {
          Location: match.destination,
        },
      });
    }
  
    return fetch(request);
}
