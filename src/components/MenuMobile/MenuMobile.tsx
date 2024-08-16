"use client";

import { useTranslation } from "@/app/i18n/client";
import {
  currenciesData,
  navUser,
  navigationHeaderData,
} from "@/fakedata/fakedata";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { LanguageMenu } from "../LanguageMenu";
import { CurrencyModal } from "../Modal";
import { useCookies } from "react-cookie";
import { logoutAPI } from "@/api/authAPI";
import showToast from "@/utils";
import UseResize from "@/hooks/UseResize";
type MenuMobileProps = {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
};
type NavItemType = {
  label?: string;
  href?: string;
  key?: string;
  icon?: string;
  children?: NavItemType[];
};
function NavItem({
  navItem,
  onClose,
}: {
  navItem: NavItemType;
  onClose: () => void;
}) {
  const pathName = usePathname();

  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const nextPage = (href: string = "/") => {
    router.push(href, {
      scroll: true,
    });
    onClose();
  };
  const currentLanguage = useAppSelector(
    (state) => state.globalStore.currentLanguage
  );
  const { t } = useTranslation(currentLanguage);
  let activePathCurrent = false;
  if (navItem.children && navItem.children?.length > 0) {
    activePathCurrent = navItem.children.some((child) => {
      return pathName.includes(child.href || "/");
    });
  } else {
    activePathCurrent = pathName.includes(navItem.href || "/");
  }
  return (
    <Box position={"relative"}>
      <Button
        className="group "
        bg={"transparent"}
        _hover={{
          bg: "transparent",
        }}
        height={"fit-content"}
        width={"100%"}
        alignItems={"center"}
        p={"16px"}
        leftIcon={
          <Image src={navItem.icon || ""} alt="icon" width={24} height={24} />
        }
      >
        <div
          className="flex items-center gap-4 justify-between w-full"
          onClick={() => {
            setShowDropdown(!showDropdown);
            if (!navItem.children) {
              nextPage(navItem.href);
            }
          }}
        >
          <span
            className={clsx(
              "text-base leading-[1.5] group font-bold  hover:text-typo-1 duration-300",
              activePathCurrent ? "text-primary-1" : "text-typo-4"
            )}
          >
            {t(`header.${navItem.key}`)}
          </span>
          {navItem.children && navItem.children.length > 0 && (
            <Image
              src={"/assets/icons/sort-down.svg"}
              alt="sort-down"
              width={10}
              height={10}
              className="opacity-50"
            />
          )}
        </div>
      </Button>

      {navItem.children && navItem.children.length > 0 && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          height={showDropdown ? "auto" : 0}
          visibility={showDropdown ? "visible" : "hidden"}
          opacity={showDropdown ? 1 : 0}
          pl={4}
          py={showDropdown ? 2 : 0}
          className="border-l border-white duration-300"
        >
          {navItem.children.map((item: NavItemType, index: number) => (
            <Button
              onClick={() => nextPage(item.href)}
              className="group"
              bg={"transparent"}
              _hover={{
                bg: "gray.50",
              }}
              height={"fit-content"}
              justifyContent={"start"}
              width={"100%"}
              p={"16px"}
              leftIcon={
                <Image
                  src={item.icon || ""}
                  alt="icon"
                  width={24}
                  height={24}
                />
              }
            >
              <span
                className={clsx(
                  "text-base whitespace-nowrap leading-[1.5] font-bold text-typo-4 group-hover:text-primary-1 duration-300"
                )}
              >
                {t(`header.${item.key}`)}
              </span>
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}

function MenuMobile({ onClose, isOpen, lang }: MenuMobileProps) {
  const router = useRouter();
  const nextPage = (href: string = "/") => {
    router.push(href, {
      scroll: true,
    });
    onClose();
  };
  const { t } = useTranslation(lang);
  const [keyword, setKeyword] = useState<string>();
  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const [currentCurrency, setCurrentCurrency] = useState(currenciesData[0]);

  const {
    isOpen: isOpenCurrency,
    onOpen: onOpenCurrency,
    onClose: onCloseCurrency,
  } = useDisclosure();
  const user = useAppSelector((state) => state.userStore.user);
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);

  const [cookies, setCookie] = useCookies(["c-token"]);
  const dispatch = useAppDispatch();
  const logout = async () => {
    setLoadingLogout(true);
    try {
      const res = await logoutAPI(dispatch);
      setCookie("c-token", "");
      showToast("success", res.message || "Logout successfully");
      setLoadingLogout(false);
      router.refresh();
    } catch (error: any) {
      showToast("error", error?.message || "Logout failed");
      setLoadingLogout(false);
    }
  };
  const [width] = UseResize();
  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      size={width >= 768 ? "sm" : "full"}
      placement={width >= 768 ? "left" : "right"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton>
          <Image
            src={"/assets/icons/close-menu.svg"}
            alt="close-menu"
            width={40}
            height={40}
          />
        </DrawerCloseButton>
        <DrawerHeader>
          <Flex>
            <Center gap={4}>
              {user ? (
                <div className="flex items-center gap-2">
                  <Avatar src="https://bit.ly/broken-link" size={"sm"} />
                  <div className="flex flex-col">
                    <p className="text-sm">{user?.email}</p>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    nextPage("/my-account");
                  }}
                >
                  <p className="text-typo-4 text-base leading-5 font-semibold capitalize">
                    Log in / Register
                  </p>
                </div>
              )}
            </Center>
          </Flex>
        </DrawerHeader>
        <DrawerBody className="flex flex-col justify-between">
          <div className="flex flex-col gap-8">
            <InputGroup bg={"gray.50"} py={"16px"} borderRadius={"8px"}>
              <InputLeftElement
                pointerEvents="none"
                top={"50%"}
                transform={"translateY(-50%)"}
              >
                <Image
                  src={"/assets/icons/search.svg"}
                  alt="dropdown"
                  width={20}
                  height={20}
                />
              </InputLeftElement>

              <Input
                onChange={handlerSearch}
                height={"min-content"}
                border={"none"}
                outline={"unset"}
                _focus={{
                  border: "none",
                }}
                _focusVisible={{
                  boxShadow: "none",
                }}
                type="text"
                placeholder="Search coin"
              />
            </InputGroup>
            {user && (
              <Fragment>
                <nav className="w-full flex flex-col gap-1">
                  {navUser.map((item, index) => {
                    return (
                      <NavItem key={index} navItem={item} onClose={onClose} />
                    );
                  })}
                </nav>
                <Divider />
              </Fragment>
            )}
            <nav className="w-full flex flex-col gap-1">
              {navigationHeaderData.map((item, index) => {
                return <NavItem key={index} navItem={item} onClose={onClose} />;
              })}
            </nav>
            <div className="flex items-center justify-between">
              <LanguageMenu />
              <Button
                onClick={() => onOpenCurrency()}
                bg={"transparent"}
                _hover={{
                  bg: "gray.100",
                }}
                borderRadius={6}
                height={7}
                alignItems={"center"}
                rightIcon={
                  <Image
                    src={"/assets/icons/dropdown.svg"}
                    alt="dropdown"
                    width={12}
                    height={12}
                  />
                }
              >
                <span className="text-12 font-semibold">
                  {currentCurrency.code}
                </span>
              </Button>
            </div>
            <CurrencyModal isOpen={isOpenCurrency} onClose={onCloseCurrency} />
          </div>
          {user && (
            <div className="py-5 w-full flex items-center justify-center">
              <Button
                onClick={logout}
                isLoading={loadingLogout}
                width={"100%"}
                py={"16px"}
                className="mx-auto"
                bgColor={"#3861fb"}
                _hover={{
                  bgColor: "none",
                }}
                color={"#fff"}
                rightIcon={
                  <Image
                    src={"/assets/icons/logout.svg"}
                    alt="dropdown"
                    width={20}
                    height={20}
                  />
                }
              >
                {t("logout")}
              </Button>
            </div>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MenuMobile;
