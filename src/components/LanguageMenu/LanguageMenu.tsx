"use client";
import { setCurrentLang } from "@/lib/features/lang/langSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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
type LanguageMenuProps = {
    lang: string;
};
function LanguageMenu({ lang }: LanguageMenuProps) {
    const [currLang, setCurrLang] = useState(langData.find((l) => l.code === lang) || langData[0]);
    const router = useRouter();
    const path = usePathname();
    const dispatch = useAppDispatch();

    const selectedLang = (item: LangType) => {
        const currentHref = path.replace(currLang.code, item.code);
        setCurrLang(item);
        dispatch(setCurrentLang(item.code));
        router.push(currentHref);
    };
    return (
        <Menu>
            <MenuButton
                bg={"transparent"}
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
            <MenuList p={2} zIndex={11}>
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

export default LanguageMenu;
