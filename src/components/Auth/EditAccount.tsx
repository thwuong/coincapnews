"use client";
import { useTranslation } from "@/app/i18n/client";
import { useAppSelector } from "@/lib/hooks";
import { Button, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Container } from "../Container";
import { Heading } from "../Heading";
type FormType = {
    firstName: string;
    lastName: string;
    displayName: string;
};
function EditAccount() {
    const currentLanguage = useAppSelector((state) => state.globalStore.currentLanguage);
    const { t } = useTranslation(currentLanguage);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormType>();

    function onSubmit(values: FormType) {}
    return (
        <section className="w-full bg-secondary pb-32 flex items-center justify-center">
            <Container className="px-12">
                <Heading className="py-8" textAlign={"center"} title={t("account.my_account")} />
                <form
                    action=""
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-md shadow-md p-5 w-full flex flex-col gap-6 items-center"
                >
                    <FormControl>
                        <FormLabel>{t("account.first_name")}</FormLabel>
                        <Input
                            variant="filled"
                            bg={"btn"}
                            size={"md"}
                            type="text"
                            placeholder={t("account.placeholder_first_name")}
                            className="text-sm placeholder:text-sm"
                            {...register("firstName", {
                                required: "This is required",
                                minLength: { value: 4, message: "Minimum length should be 4" },
                            })}
                        />
                        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("account.last_name")}</FormLabel>
                        <Input
                            variant="filled"
                            bg={"btn"}
                            size={"md"}
                            type="text"
                            placeholder={t("account.placeholder_last_name")}
                            className="text-sm placeholder:text-sm"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("account.display_name")}</FormLabel>
                        <Input
                            variant="filled"
                            bg={"btn"}
                            size={"md"}
                            type="text"
                            placeholder={t("account.placeholder_display_name")}
                            className="text-sm placeholder:text-sm"
                        />
                        <FormHelperText>{t("account.helper_display_name")}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>{t("account.email_address")}</FormLabel>
                        <Input
                            variant="filled"
                            bg={"btn"}
                            size={"md"}
                            type="email"
                            placeholder={t("account.placeholder_email_address")}
                            className="text-sm placeholder:text-sm"
                        />
                    </FormControl>
                    <div className="flex flex-col gap-4 w-full">
                        <h2 className="text-gray-bg font-bold">{t("account.password_change")}</h2>
                        <Divider />
                        <FormControl>
                            <FormLabel>{t("account.current_password")}</FormLabel>
                            <Input
                                variant="filled"
                                bg={"btn"}
                                size={"md"}
                                type="password"
                                placeholder={t("account.placeholder_current_password")}
                                className="text-sm placeholder:text-sm"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>{t("account.new_password")}</FormLabel>
                            <Input
                                variant="filled"
                                bg={"btn"}
                                size={"md"}
                                type="password"
                                placeholder={t("account.placeholder_new_password")}
                                className="text-sm placeholder:text-sm"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>{t("account.comfirm_password")}</FormLabel>
                            <Input
                                variant="filled"
                                bg={"btn"}
                                size={"md"}
                                type="password"
                                placeholder={t("account.placeholder_comfirm_password")}
                                className="text-sm placeholder:text-sm"
                            />
                        </FormControl>
                    </div>
                    <Button
                        mt={"16px"}
                        width={"fit-content"}
                        bg={"rgb(56,97,251)"}
                        _hover={{
                            bg: "rgba(56,97,251,0.8)",
                        }}
                        rounded={"20px"}
                    >
                        <span className="text-white">{t("account.btn")}</span>
                    </Button>
                </form>
            </Container>
        </section>
    );
}

export default EditAccount;
