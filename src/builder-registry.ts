"use client";
import { builder, Builder, withChildren } from "@builder.io/react";
import { Container } from "./components/Container";
import { BannerSlide } from "./components/BannerSlide";
import { NewsFeed } from "./components/NewsFeed";
import { DerivativesExchanges } from "./components/DerivativesExchanges";
import { DifferentExchanges } from "./components/DifferentExchanges";
import { Heading } from "./components/Heading";
import { Auth } from "./components/Auth";
import { TableSection } from "./components/TableSection";
import { ConvertAmount } from "./components/ConvertAmount";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

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
            name: "title",
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
Builder.registerComponent(withChildren(Auth), {
    name: "Auth",
});
Builder.registerComponent(withChildren(TableSection), {
    name: "TableSection",
});
Builder.registerComponent(withChildren(ConvertAmount), {
    name: "ConvertAmount",
});
