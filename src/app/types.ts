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
export type NavItemType = {
    label?: string;
    href?: string;
    icon?: string;
    children?: NavItemType[];
};
export type NewDataType = {
    price?: number;
    change24?: number;
};
