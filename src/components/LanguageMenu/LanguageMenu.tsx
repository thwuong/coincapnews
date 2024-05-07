"use client";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
const langData = [
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
    const [currentLang, setCurrentLang] = useState(langData[0]);
    return (
        <Menu>
            <MenuButton
                bg={"transparent"}
                _hover={{
                    bg: "gray.100",
                }}
                borderRadius={6}
                height={7}
                as={Button}
                alignItems={"center"}
                leftIcon={<Image src={currentLang.icon} alt="dropdown" width={18} height={18} />}
                rightIcon={<Image src={"/assets/icons/dropdown.svg"} alt="dropdown" width={12} height={12} />}
            >
                <span className="text-12 font-semibold">{currentLang.label}</span>
            </MenuButton>
            <MenuList p={2}>
                {langData
                    .filter((item) => item.code !== currentLang.code)
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
                            onClick={() => setCurrentLang(item)}
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
