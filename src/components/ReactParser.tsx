"use client";

import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";

type ReactParserProps = {
  tweetHTML: string;
};

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export const ReactParser = ({ tweetHTML }: ReactParserProps) => {
  const tweetContainerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ動作するようにフラグをセット
    setIsClient(true);
  }, []);

  useEffect(() => {
    // クライアントサイドでのみスクリプトを実行
    if (isClient && window && tweetHTML) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);

      script.onload = () => {
        window.twttr?.widgets?.load(tweetContainerRef.current ?? undefined);
      };
    }
  }, [isClient, tweetHTML]);

  // クライアントサイドでのみレンダリング
  if (!isClient) {
    return null; // サーバーサイドでは何もレンダリングしない
  }

  return (
    <div ref={tweetContainerRef} className="">
      {parse(tweetHTML)}
    </div>
  );
};
