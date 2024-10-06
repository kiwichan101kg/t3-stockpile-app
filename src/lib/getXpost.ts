export type XPostObject = {
  url: string;
  author_name: string;
  author_url: string;
  html: string;
  width: number;
  height: number | null;
  type: string;
  cache_age: string;
};

export const getXPost = async (url: string) => {
  try {
    const res = await fetch(
      `https://publish.twitter.com/oembed?url=${url}&partner=&hide_thread=true`,
    );
    const result = (await res.json()) as XPostObject;
    return result;
  } catch (error) {
    console.error("Error fetching XPost:", error);
    return null;
  }
};

export async function getXPosts(urls: string[]) {
  try {
    // URL配列に対して、全てのOGP情報を取得する
    const XPostResults = await Promise.all(
      urls.map(async (url) => {
        try {
          const res = await fetch(
            `https://publish.twitter.com/oembed?url=${url}&partner=&hide_thread=true`,
          );
          const result = (await res.json()) as XPostObject;
          return result;
        } catch (error) {
          console.error("Error fetching XPosts:", error);
          return null;
        }
      }),
    );

    // 成功したOGP情報のみを返す
    return XPostResults.filter((result) => result !== null);
  } catch (error) {
    console.error("Error fetching XPost for URLs:", error);
    return [];
  }
}

export const isXUrl = (url: string) => {
  const twitterRegex =
    /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_]{1,15}\/status\/\d+/;
  return twitterRegex.test(url);
};
