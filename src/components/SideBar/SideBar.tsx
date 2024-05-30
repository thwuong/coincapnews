import Link from "next/link";
import * as React from "react";

type ImageProps = {
    src: string;
    alt: string;
};

const ImageComponent: React.FC<ImageProps> = ({ src, alt }) => {
    return (
        <Link href={"https://fmcpay.com/"} target="_blank">
            <img
                loading="lazy"
                src={src}
                alt={alt}
                className="box-border object-cover overflow-hidden shrink-0 mt-5 w-full rounded-lg cursor-pointer pointer-events-auto aspect-[0.55] min-h-[240px] min-w-[20px]"
            />
        </Link>
    );
};

const SideBar = ({ images }: { images: ImageProps[] }) => {


    return (
        <aside className="5xl:flex box-border hidden relative flex-col shrink-0 w-full max-w-[190px] max-md:hidden">
            <div className="box-border flex sticky bottom-4 top-1/2 -translate-y-1/2 flex-col shrink-0 w-full max-w-[190px]">
                {images.map((image, index) => (
                    <ImageComponent key={index} src={image.src} alt={image.alt} />
                ))}
            </div>
        </aside>
    );
};

export default SideBar;
