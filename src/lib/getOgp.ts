import ogs from "open-graph-scraper";

export async function getOgp(url: string) {
  try {
    const { result } = await ogs({ url });
    return result;
  } catch (error) {
    console.error("Error fetching OGP:", error);
    return null;
  }
}

export async function getOgps(urls: string[]) {
  try {
    // URL配列に対して、全てのOGP情報を取得する
    const ogpResults = await Promise.all(
      urls.map(async (url) => {
        try {
          const { result } = await ogs({ url });
          return result;
        } catch (error) {
          console.error(`Error fetching OGP for ${url}:`, error);
          return null; // OGPの取得に失敗した場合はnullを返す
        }
      }),
    );

    // 成功したOGP情報のみを返す
    return ogpResults.filter((result) => result !== null);
  } catch (error) {
    console.error("Error fetching OGP for URLs:", error);
    return [];
  }
}
