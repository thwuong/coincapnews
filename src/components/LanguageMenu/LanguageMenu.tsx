"use client";
import { useAppSelector } from "@/lib/hooks";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { memo } from "react";
type LangType = {
    label: string;
    code: string;
    icon: string;
};
const langData: LangType[] = [
    {
        label: "Tiếng Việt",
        code: "vi",
        icon: "/assets/icons/vi.jpg",
    },
    {
        label: "English",
        code: "en",
        icon: "/assets/icons/en.jpg",
    },
];

function LanguageMenu() {
    const currentLanguage = useAppSelector((state) => state.globalStore.currentLanguage);
    const path = usePathname();
    const router = useRouter();

    const selectedLang = (item: LangType) => {
        router.push(`${path}?lang=${item.code}`);
        // router.refresh();
        // window.location.href = `${path}?lang=${item.code}`;
    };
    const currLang = React.useMemo(
        () => langData.find((item) => item.code === currentLanguage) || langData[0],
        [currentLanguage]
    );

    return (
        <Menu>
            <MenuButton
                bg={"transparent"}
                className="animate-fade"
                _hover={{
                    bg: "gray.100",
                }}
                borderRadius={6}
                height={7}
                minW={"fit-content"}
                as={Button}
                leftIcon={<Image src={currLang.icon} alt="dropdown" width={18} height={18} />}
                rightIcon={<Image src={"/assets/icons/dropdown.svg"} alt="dropdown" width={12} height={12} />}
            >
                <span className="text-12 font-semibold">{currLang.label}</span>
            </MenuButton>
            <MenuList p={2} zIndex={21}>
                {langData
                    .filter((item) => item.code !== currLang.code)
                    .map((item) => (
                        <MenuItem
                            bg={"transparent"}
                            _hover={{
                                bg: "gray.100",
                            }}
                            height={7}
                            borderRadius={6}
                            gap={2}
                            key={item.code}
                            onClick={() => selectedLang(item)}
                        >
                            <Image src={item.icon} alt="dropdown" width={18} height={12} />
                            <span className="text-12 font-semibold">{item.label}</span>
                        </MenuItem>
                    ))}
            </MenuList>
        </Menu>
    );
}

export default memo(LanguageMenu);
