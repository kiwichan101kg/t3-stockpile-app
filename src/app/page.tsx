export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stockpile</h1>
          <p className="mt-2 text-gray-600">技術記事をたくさん集めよう🎉</p>
        </div>

        {/* ログイン・ログアウトボタン */}
        <div>
          <button className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
            ログイン
          </button>
          <button className="rounded-md bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600">
            ログアウト
          </button>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="mb-6 flex flex-col items-start justify-between md:flex-row">
        <div className="relative mb-4 w-full max-w-md md:mb-0">
          <input
            type="text"
            placeholder="URLを入力"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Article Form Section */}
      <section className="mb-6 max-w-md rounded-lg bg-white p-4 shadow-md">
        {/* タイトル入力欄 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="タイトルを入力"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 画像URL入力欄 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="画像URLを入力"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 画像プレビュー */}
        <div className="mb-4 flex justify-center">
          <img
            src="https://via.placeholder.com/150" // ここは画像URLで動的に変更できます
            alt="プレビュー画像"
            className="h-32 w-32 rounded-md border border-gray-300 object-cover"
          />
        </div>

        {/* メモ入力欄 */}
        <div className="mb-4">
          <textarea
            placeholder="メモを入力"
            className="h-24 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 保存ボタン */}
        <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
          保存
        </button>
      </section>

      {/* Article List Section */}
      <section>
        {/* フィルタリングボタン */}
        <div className="mb-6 flex flex-wrap space-x-4">
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
            すべて
          </button>
          <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300">
            読んだ
          </button>
          <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300">
            読みたい
          </button>
        </div>

        {/* 記事リスト（レスポンシブグリッド） */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Example of an Article Card */}
          <div className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
            {/* 画像の追加 */}
            <img
              src="https://via.placeholder.com/400x200" // ここに画像URLを入れます
              alt="記事画像"
              className="mb-4 h-24 w-full rounded-md object-cover"
            />

            {/* タイトルと説明 */}
            <h3 className="text-xl font-semibold text-gray-900">
              App Routerのデータフェッチ
            </h3>
            <p className="mt-2 text-gray-600">
              App RouterはNext.jsのルーティングシステムで...
            </p>

            {/* "Read More" ボタン */}
            <div className="mt-4 flex items-center justify-between">
              <button className="text-blue-500 hover:underline">
                Read More
              </button>
            </div>
          </div>

          {/* 他の記事カードを追加 */}
        </div>
      </section>
    </main>
  );
}
