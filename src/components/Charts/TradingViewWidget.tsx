// TradingViewWidget.jsx
import { useAppSelector } from "@/lib/hooks";
import { memo, useEffect, useRef } from "react";

function TradingViewWidget({ symbol }: { symbol: string }) {
  const container = useRef<any>();
  const currentLanguage = useAppSelector(
    (state) => state.globalStore.currentLanguage
  );
  const symbolFormat =
    symbol === "fmc"
      ? `${symbol.toUpperCase()}USDT`
      : `${symbol.toUpperCase()}USD`;
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
            "autosize": true,
            "symbol": "${symbolFormat}",
            "timezone": "Etc/UTC",
            "theme": "light",
            "interval": "D",
            "style": "1",
            "locale": "en",
            "allow_symbol_change": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
          }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "610px", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(610px - 32px)", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
