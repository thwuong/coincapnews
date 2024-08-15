export const WEBSITE_HOST_URL = process.env.NEXT_PUBLIC_WEBSITE_HOST_URL;
export const NEWS_HOST_URL = process.env.NEXT_PUBLIC_API_HOST_NEWS_URL;
export const SOCKET_URL = `wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/usdtusdt@ticker/bnbusdt@ticker/solusdt@ticker/usdcusdt@ticker/xrpusdt@ticker/stethusdt@ticker/tonusdt@ticker/dogeusdt@ticker/adausdt@ticker/shibusdt@ticker/avaxusdt@ticker/trxusdt@ticker/wbtcusdt@ticker/dotusdt@ticker/bchusdt@ticker/nearusdt@ticker/linkusdt@ticker/maticusdt@ticker/ltcusdt@ticker/icpusdt@ticker/fetusdt@ticker/uniusdt@ticker/leousdt@ticker/daiusdt@ticker/pepeusdt@ticker/rndrusdt@ticker/etcusdt@ticker/hbarusdt@ticker/fdusdusdt@ticker/aptusdt@ticker/weethusdt@ticker/imxusdt@ticker/crousdt@ticker/atomusdt@ticker/mntusdt@ticker/filusdt@ticker/stxusdt@ticker/xlmusdt@ticker/wifusdt@ticker/okbusdt@ticker/ezethusdt@ticker/arusdt@ticker/kasusdt@ticker/grtusdt@ticker/arbusdt@ticker/taousdt@ticker/mkrusdt@ticker/opusdt@ticker/@2000ms`;
export const SOCKET_DETAIL_URL = `wss://stream.binance.com:9443/stream?streams=`;
export const COIN_PER_PAGE = process.env.NEXT_PUBLIC_PER_PAGE;
export const IDS_FEATURE = process.env.NEXT_PUBLIC_IDS_FEATURE;
export const STATIC_HOST_URL = process.env.NEXT_PUBLIC_STATIC_HOST_URL;
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
