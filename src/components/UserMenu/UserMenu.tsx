import { logoutAPI } from "@/api/authAPI";
import { useTranslation } from "@/app/i18n/client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import showToast from "@/utils";
import { Avatar, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
function UserMenu({ onOpen }: { onOpen: () => void }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userStore.user);
  const lang = useAppSelector((state) => state.globalStore.currentLanguage);
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);

  const [cookies, setCookie] = useCookies(["c-token"]);

  const { t } = useTranslation(lang, "home");
  const logout = async () => {
    try {
      const res = await logoutAPI(dispatch);
      setCookie("c-token", "");
      showToast("success", res.message || "Logout successfully");
    } catch (error: any) {
      showToast("error", error?.message || "Logout failed");
    }
  };
  if (user) {
    return <Avatar size={"sm"} onClick={onOpen} className="cursor-pointer" />;
  }
  return (
    <Button
      as={Link}
      href={"/my-account"}
      bgColor={"#3861fb"}
      _hover={{
        bgColor: "none",
      }}
      px={"20px"}
      color={"#fff"}
      fontSize={"12px"}
      fontWeight={"600"}
      letterSpacing={"0.4px"}
      lineHeight={"18px"}
    >
      {t("login")}
    </Button>
  );
}

export default UserMenu;
