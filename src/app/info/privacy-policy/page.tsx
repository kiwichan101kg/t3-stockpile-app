import { Logo } from "@/components/Logo";

export default async function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-10 flex items-center justify-between">
        <Logo />
      </header>

      <main className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          プライバシーポリシー
        </h1>

        <section className="space-y-6">
          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              1. はじめに
            </h2>
            <p className="leading-relaxed text-gray-600">
              本プライバシーポリシーは、Tech
              Stock（以下、「本アプリ」といいます。）において、ユーザーの個人情報がどのように収集、使用、共有されるかを説明するものです。本アプリを利用することで、ユーザーは本ポリシーに同意したものとみなされます。
            </p>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              2. 収集する情報
            </h2>
            <p className="leading-relaxed text-gray-600">
              本アプリでは、以下の個人情報を収集する場合があります。
            </p>
            <ul className="list-inside list-disc leading-relaxed text-gray-600">
              <li>Google認証により提供される情報</li>
              <li>アカウント情報</li>
              <li>ユーザーが保存した記事とメモ</li>
              <li>利用履歴</li>
            </ul>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              3. 情報の利用目的
            </h2>
            <p className="leading-relaxed text-gray-600">
              収集した個人情報は、以下の目的で利用されます。
            </p>
            <ul className="list-inside list-disc leading-relaxed text-gray-600">
              <li>本アプリの提供および運営のため</li>
              <li>ユーザーサポートのため</li>
              <li>本アプリの改善および新機能の開発のため</li>
            </ul>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              4. 情報の共有
            </h2>
            <p className="leading-relaxed text-gray-600">
              ユーザーの個人情報は、以下の状況において第三者と共有される場合があります。
            </p>
            <ul className="list-inside list-disc leading-relaxed text-gray-600">
              <li>法令に基づく場合</li>
              <li>サービス提供に必要な場合</li>
              <li>ユーザーの同意がある場合</li>
            </ul>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              5. セキュリティ
            </h2>
            <p className="leading-relaxed text-gray-600">
              ユーザーの個人情報を保護するために、適切なセキュリティ対策を講じています。しかし、インターネット上の情報送信の完全な安全性を保証するものではありません。
            </p>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              6. プライバシーポリシーの変更
            </h2>
            <p className="leading-relaxed text-gray-600">
              本ポリシーは、必要に応じて変更される場合があります。変更があった場合、ユーザーには適切な形で通知されます。
            </p>
          </article>

          <article>
            <h2 className="mb-2 text-xl font-semibold text-gray-700">
              7. お問い合わせ
            </h2>
            <p className="leading-relaxed text-gray-600">
              プライバシーポリシーに関する質問やご意見は、以下のアカウントまでお問い合わせください。
            </p>
            <p className="leading-relaxed text-gray-600">X : @kiwichan_101kg</p>
          </article>
        </section>
      </main>

      <footer className="mt-10 text-center text-gray-500">
        © 2024 Tech📚Stock. All Rights Reserved.
      </footer>
    </div>
  );
}
