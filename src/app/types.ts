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
    title: string;
    summary: string;
    description: string;
    author: {
        avatar: string;
        name: string;
    };
    meta: {
        last_update: string;
    };
};
