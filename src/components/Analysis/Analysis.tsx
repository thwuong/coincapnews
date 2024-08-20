import { INTOTHEBLOCK_KEY } from "@/app/contants";
import { useAppSelector } from "@/lib/hooks";
import React, { useRef } from "react";

function Analysis({ symbol }: { symbol: string }) {
  const container = useRef<any>();
  const { currentLanguage } = useAppSelector((state) => state.globalStore);
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
    window.itb_widget = window.itb_widget || {
        init: (t) => {
          const e = document.createElement("script");
          (e.async = !0),
            (e.type = "text/javascript"),
            (e.src = "https://app.intotheblock.com/widget.js"),
            (e.onload = function () {
              window.itbWidgetInit(t);
            }),
            document.getElementsByTagName("head")[0].appendChild(e);
        },
      };
      window.itb_widget.init({
        apiKey: "${INTOTHEBLOCK_KEY}",
        language: "${currentLanguage}",
        options: {
          tokenId: "${symbol}",
          loader: true,
          hidePriceSeries: true,
          hideNavigator: true,
          colors: {
            highlights: {
              average: "#000",
              base: "#000",
              high: "#000",
              low: "#000",
            },
          },
          events: {
            onLoaded: (params) => {
              //   console.log("onLoaded: ", params);
            },
          },
        },
      });   
    
    `;
    container.current.appendChild(script);
  }, []);
  return (
    <div ref={container}>
      <div className="widget-container ">
        <div data-target="itb-widget" data-type="token-summary"></div>
        <div data-target="itb-widget" data-type="signals"></div>
        <div data-target="itb-widget" data-type="volatility"></div>
        <div data-target="itb-widget" data-type="perpetual-volume"></div>
        <div data-target="itb-widget" data-type="daily-active-addresses"></div>
        <div data-target="itb-widget" data-type="search-trends"></div>
      </div>
    </div>
  );
}

export default Analysis;
