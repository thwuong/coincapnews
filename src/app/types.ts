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
        total_volume: any;
        low_24h: any;
        high_24h: any;
        price_change_percentage_24h_in_currency: any;
        current_price: any;
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
