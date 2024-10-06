export type YouTubeObject = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  thumbnail_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  html: string;
  provider_name: string;
  provider_url: string;
  original_url: string; // 元のURLを追加
};

// YouTubeのメタデータを1つ取得
export const getYouTube = async (url: string) => {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${url}&format=json`,
    );
    const result = (await res.json()) as YouTubeObject;

    // 元のURLを追加して返す
    return { ...result, original_url: url };
  } catch (error) {
    console.error("Error fetching YouTube post:", error);
    return null;
  }
};

// 複数のYouTube URLに対してメタデータを取得
export async function getYouTubes(urls: string[]) {
  try {
    // 全てのYouTubeメタデータを取得
    const youTubePostResults = await Promise.all(
      urls.map(async (url) => {
        try {
          const res = await fetch(
            `https://www.youtube.com/oembed?url=${url}&format=json`,
          );
          const result = (await res.json()) as YouTubeObject;

          // 元のURLを追加して返す
          return { ...result, original_url: url };
        } catch (error) {
          console.error("Error fetching YouTube post:", error);
          return null;
        }
      }),
    );

    // 成功したメタデータのみを返す
    return youTubePostResults.filter((result) => result !== null);
  } catch (error) {
    console.error("Error fetching YouTube posts for URLs:", error);
    return [];
  }
}

// YouTubeのURLかどうかを判定する関数
export const isYouTubeUrl = (url: string) => {
  const youtubeRegex = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
};
