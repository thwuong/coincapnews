export type DetailCoinType = {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  description: any;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
  market_data: {
    total_volume: any;
    low_24h: any;
    high_24h: any;
    price_change_percentage_24h_in_currency: any;
    current_price: any;
    price_change_24h_in_currency: any;
    price_change_percentage_7d_in_currency: any;
    price_change_percentage_30d_in_currency: any;
    price_change_percentage_60d_in_currency: any;
    price_change_percentage_200d_in_currency: any;
    price_change_percentage_1y_in_currency: any;
    market_cap: any;
    fully_diluted_valuation: any;
    ath: any;
    atl: any;
    atl_change_percentage: any;
    ath_change_percentage: any;
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    market_cap_change_percentage_24h: number;
  };
  links: {
    blockchain_site: string[];
    homepage: string[];
    repos_url: {
      github: string[];
    };
    subreddit_url: string;
    facebook_username: string;
    twitter_screen_name: string;
  };
  tickers: [
    {
      coin_id: string;
      market: {
        name: string;
      };
      converted_volume: any;
      converted_last: any;
      base: string;
      target: string;
    }
  ];
  platforms: any;
};
export type FeedType = {
  id: string;
  post_title: string;
  post_excerpt: string;
  post_thumbnail: string;
  post_date: string;
  post_permalink: string;
  author: {
    avatar: string;
    name: string;
  };
};
export type DetailExchangeType = {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: string;
  description: object;
  image: string;
  number_of_futures_pairs: number;
  number_of_perpetual_pairs: number;
  open_interest_btc: number;
  chart: {
    data: number[];
  };
  url: string;
  trade_volume_24h_btc: number;
  trust_score: number;
  facebook_url: string;
  tickers: [
    {
      coin_id: string;
      converted_volume: {
        usd: number;
      };
      open_interest_usd: number;
      h24_volume: number;
      last_traded: number;
      funding_rate: number;
      target: string;
      bid_ask_spread_percentage: number;
      bid_ask_spread: number;
      converted_last: {
        usd: number;
      };
      base: string;
      symbol: string;
    }
  ];
};
export type NavItemType = {
  label?: string;
  href?: string;
  icon?: string;
  key?: string;
  children?: NavItemType[];
};
export type NewDataType = {
  price?: number;
  change24?: number;
};
export type CoinType = {
  image: string;
  name: string;
  currency: string;
  id: string;
  atl: number;
  atl_change_percentage: number;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  price_change_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_1y_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_14d_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_200d_in_currency: number;
  roi: string;
  sparkline_in_7d: {
    price: number[];
  };
  symbol: string;
  total_supply: number;
  total_volume: number;
  volume_24h: number;
};
export type CoinTopType = {
  image: string;
  name: string;
  id: string;
  symbol: string;
  usd: number;
  usd_24h_change: number;
  usd_24h_vol: number;
};
export type ExchangeType = {
  id: string;
  name: string;
  chart: {
    data: number[];
  };
  open_interest_btc: number;
  trade_volume_24h_btc: number;
  number_of_perpetual_pairs: number;
  number_of_futures_pairs: number;
  image: string;
};
