import { Logo } from "@/components/Logo";

export default async function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-10 flex items-center justify-between">
        <Logo />
      </header>

      <main className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">利用規約</h1>

        <section className="space-y-6">
          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              第1条（適用）
            </h2>
            <p className="leading-relaxed text-gray-600">
              本規約は、ユーザーと本アプリの提供者との間の利用条件を定めるものです。ユーザーは、本規約に同意した上で本アプリを利用するものとします。
            </p>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              第2条（禁止事項）
            </h2>
            <ul className="list-inside list-disc leading-relaxed text-gray-600">
              <li>法令または公序良俗に反する行為</li>
              <li>他のユーザーまたは第三者の権利を侵害する行為</li>
              <li>不正アクセスやクラッキングなどの行為</li>
              <li>運営者が不適切と判断する行為</li>
            </ul>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              第3条（免責事項）
            </h2>
            <p className="leading-relaxed text-gray-600">
              本アプリの利用によって生じた損害に対し、運営者は一切の責任を負いません。また、本アプリの内容についてその正確性や完全性を保証するものではありません。
            </p>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              第4条（利用の停止・終了）
            </h2>
            <p className="leading-relaxed text-gray-600">
              ユーザーが本規約に違反した場合、運営者は事前の通知なく本アプリの利用を停止または終了させることができるものとします。
            </p>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              第5条（本規約の変更）
            </h2>
            <p className="leading-relaxed text-gray-600">
              運営者は、必要と判断した場合、事前の通知なく本規約を変更することができるものとします。変更後の規約は、本アプリに掲示された時点で効力を生じます。
            </p>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              第6条（準拠法）
            </h2>
            <p className="leading-relaxed text-gray-600">
              本規約の解釈および適用は、日本法に準拠するものとします。
            </p>
          </article>
        </section>
      </main>

      <footer className="mt-10 text-center text-gray-500">
        © 2024 Tech📚Stock. All Rights Reserved.
      </footer>
    </div>
  );
}
