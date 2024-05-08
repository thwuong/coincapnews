"use client";
import { builder, Builder, withChildren } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import Container from "./components/Container/Container";
import dynamic from "next/dynamic";
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
