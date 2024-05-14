export type DetailCoinType = {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: string;
    description: object;
    image: {
        large: string;
        small: string;
        thumb: string;
    };
    market_data: {
        total_volume: object;
        low_24h: object;
        high_24h: object;
        price_change_percentage_24h_in_currency: object;
        current_price: any;
    };
    links: object;
};
export type FeedType = {
    id: string;
    post_title: string;
    post_excerpt: string;
    post_thumbnail: string;
    post_date: string;
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
            converted_volume: any;
            target: string;
            bid_ask_spread_percentage: string;
            converted_last: any;
            base: string;
        }
    ];
};
