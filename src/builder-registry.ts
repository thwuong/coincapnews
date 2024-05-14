"use client";
import { builder, Builder, withChildren } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import Container from "./components/Container/Container";
import dynamic from "next/dynamic";
import { NewsFeed } from "./components/NewsFeed";
import { DerivativesExchanges } from "./components/DerivativesExchanges";
const BannerSlide = dynamic(() => import("./components/BannerSlide/BannerSlide"), {
    ssr: false,
});
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
    name: "Counter",
    inputs: [
        {
            name: "initialCount",
            type: "number",
        },
    ],
});
Builder.registerComponent(withChildren(Container), {
    name: "Container",
    inputs: [
        {
            name: "className",
            type: "string",
        },
    ],
});
Builder.registerComponent(withChildren(BannerSlide), {
    name: "BannerSlide",
});
Builder.registerComponent(withChildren(NewsFeed), {
    name: "NewsFeed",
});
Builder.registerComponent(withChildren(DerivativesExchanges), {
    name: "DerivativesExchanges",
    inputs: [
        {
            name: "perPage",
            type: "number",
            defaultValue: 10,
        },
    ],
});
