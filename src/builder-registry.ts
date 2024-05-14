"use client";
import { builder, Builder, withChildren } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import Container from "./components/Container/Container";
import dynamic from "next/dynamic";
import { NewsFeed } from "./components/NewsFeed";
import { DerivativesExchanges } from "./components/DerivativesExchanges";
import DifferentExchanges from "./components/DifferentExchanges/DifferentExchanges";
import Heading from "./components/Heading/Heading";
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
Builder.registerComponent(withChildren(DifferentExchanges), {
    name: "DifferentExchanges",
    inputs: [
        {
            name: "perPage",
            type: "number",
            defaultValue: 10,
        },
        {
            name: "title",
            type: "string",
            defaultValue: "Title",
        },
        {
            name: "url",
            type: "string",
        },
    ],
});
Builder.registerComponent(withChildren(Heading), {
    name: "Heading",
    inputs: [
        {
            name: "className",
            type: "string",
        },
        {
            name: "textAlign",
            type: "string",
            options: [
                {
                    name: "Text Left",
                    value: "left",
                },
                {
                    name: "Text Center",
                    value: "center",
                },
                {
                    name: "Text Right",
                    value: "right",
                },
            ],
        },
    ],
});
