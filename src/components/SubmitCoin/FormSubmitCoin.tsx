import React from "react";
import { useTranslation } from "@/app/i18n/client";
import { useAppSelector } from "@/lib/hooks";
import {
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
type FormType = {
    yourName: string;
    yourEmail: string;
    subjectField: string;
    yourMessage: string;
    relationship: string;
    projectLaunchDate: string;
    projectName: string;
    projectSymbol: string;
    tags: string;
    oneLiner: string;
    detailedProject: string;
    platform: string;
    hasing: string;
    teamBackers: string;
    mediaCoverage: string;
    traction: string;
    countryOfOrigin: string;
    linkToLogo: string;
    web1: string;
    webOther: string;
    richList: string;
    emission: string;
    blockExplorer: string;
    blockExplorerOther: string;
    sourceCode: string;
    whitepaper: string;
    announcement: string;
    messageBoard: string;
    messageBoardOther: string;
    twitter: string;
    facebook: string;
    reddit: string;
    projectIntroductionVideo: string;
    videoChannel: string;
    chat: string;
    chatOther: string;
    linkedIn: string;
    mobileApp: string;
    mobileAppOther: string;
    circulatingSupply: string;
    totalSupply: string;
    maxSupply: string;
    startDate: string;
    endDate: string;
    launchPrice: string;
    apiEndpointTotalSupply: string;
    apiEndpointCirculatingSupply: string;
    exchanges: string;
    areYouWillingToProvide: string;
    pageApp: string;
    srdApp: string;
    proof: string;
    file: string;
};
function FormSubmitCoin() {
    const currentLanguage = useAppSelector((state) => state.langStore.currentLanguage);
    const { t } = useTranslation(currentLanguage);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormType>();

    function onSubmit(values: FormType) {}
    return (
        <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-md shadow-md p-5 w-[1024px] max-lg:w-full flex flex-col gap-6 items-center"
        >
            <FormControl>
                <FormHelperText>{t("submit_coin.helper_line1")}</FormHelperText>
                <FormHelperText>{t("submit_coin.helper_line2")}</FormHelperText>
                <FormHelperText>{t("submit_coin.helper_line3")}</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.your_name")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.your_name")}
                    className="text-sm placeholder:text-sm"
                    {...register("yourName", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.yourName && errors.yourName.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.your_email")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="email"
                    placeholder={t("submit_coin.your_email")}
                    className="text-sm placeholder:text-sm"
                    {...register("yourEmail", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.yourEmail && errors.yourEmail.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.subject_field")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.subject_field")}
                    className="text-sm placeholder:text-sm"
                    {...register("subjectField", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.subjectField && errors.subjectField.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.methodology")}</FormLabel>
                <Checkbox size="md" className="text-sm placeholder:text-sm">
                    <p className="text-sm">{t("submit_coin.methodology_description")}</p>
                </Checkbox>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.support_terms")}</FormLabel>
                <Checkbox size="md" className="text-sm placeholder:text-sm" alignItems={"start"}>
                    <p className="text-sm">{t("submit_coin.support_terms_description")}</p>
                </Checkbox>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.accuracy_declaration")}</FormLabel>
                <Checkbox size="md" className="text-sm placeholder:text-sm" alignItems={"start"}>
                    <p className="text-sm">{t("submit_coin.accuracy_declaration_description")}</p>
                </Checkbox>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.your_message")}</FormLabel>
                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.your_message")}
                    {...register("yourMessage", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.yourMessage && errors.yourMessage.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.relationship")}</FormLabel>
                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.relationship")}
                    {...register("relationship", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.relationship && errors.relationship.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.project_lauch_date")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.project_lauch_date")}
                    className="text-sm placeholder:text-sm"
                    {...register("projectLaunchDate", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.projectLaunchDate && errors.projectLaunchDate.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.project_name")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.project_name")}
                    className="text-sm placeholder:text-sm"
                    {...register("projectName", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.projectName && errors.projectName.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.project_symbol")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.project_symbol")}
                    className="text-sm placeholder:text-sm"
                    {...register("projectSymbol", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.projectSymbol && errors.projectSymbol.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.tags")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.tags")}
                    className="text-sm placeholder:text-sm"
                    {...register("tags", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.tags && errors.tags.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.one_liner")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.one_liner")}
                    className="text-sm placeholder:text-sm"
                    {...register("oneLiner", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.oneLiner && errors.oneLiner.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.detailed_project")}</FormLabel>

                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.detailed_project")}
                    {...register("detailedProject", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.detailedProject && errors.detailedProject.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.platform")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.platform")}
                    className="text-sm placeholder:text-sm"
                    {...register("platform", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.platform && errors.platform.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.hasing")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.hasing")}
                    className="text-sm placeholder:text-sm"
                    {...register("hasing", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.hasing && errors.hasing.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.team_backers")}</FormLabel>
                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.team_backers")}
                    {...register("teamBackers", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.teamBackers && errors.teamBackers.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.media_coverage")}</FormLabel>
                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.media_coverage")}
                    {...register("mediaCoverage", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.mediaCoverage && errors.mediaCoverage.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.traction")}</FormLabel>
                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.traction")}
                    {...register("traction", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.traction && errors.traction.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.country_of_origin")}</FormLabel>
                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.country_of_origin")}
                    {...register("countryOfOrigin", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.countryOfOrigin && errors.countryOfOrigin.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.link_to_logo")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.link_to_logo")}
                    className="text-sm placeholder:text-sm"
                    {...register("linkToLogo", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.linkToLogo && errors.linkToLogo.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.web1")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.web1")}
                    className="text-sm placeholder:text-sm"
                    {...register("web1", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.web1 && errors.web1.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.web_other")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.web_other")}
                    className="text-sm placeholder:text-sm"
                    {...register("webOther", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.webOther && errors.webOther.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.rich_list")}</FormLabel>
                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.rich_list")}
                    {...register("richList", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.richList && errors.richList.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.emission")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.emission")}
                    className="text-sm placeholder:text-sm"
                    {...register("emission", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.emission && errors.emission.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.block_explorer")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.block_explorer")}
                    className="text-sm placeholder:text-sm"
                    {...register("blockExplorer", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.blockExplorer && errors.blockExplorer.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.block_explorer_other")}</FormLabel>

                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.block_explorer_other")}
                    {...register("richList", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.richList && errors.richList.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.source_code")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.source_code")}
                    className="text-sm placeholder:text-sm"
                    {...register("sourceCode", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.sourceCode && errors.sourceCode.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.white_paper")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.white_paper")}
                    className="text-sm placeholder:text-sm"
                    {...register("whitepaper", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.whitepaper && errors.whitepaper.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.message_board")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.message_board")}
                    className="text-sm placeholder:text-sm"
                    {...register("messageBoard", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.messageBoard && errors.messageBoard.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.message_board_other")}</FormLabel>

                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.message_board_other")}
                    {...register("messageBoardOther", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.messageBoardOther && errors.messageBoardOther.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.twitter")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.twitter")}
                    className="text-sm placeholder:text-sm"
                    {...register("twitter", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.twitter && errors.twitter.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.facebook")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.facebook")}
                    className="text-sm placeholder:text-sm"
                    {...register("facebook", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.facebook && errors.facebook.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.reddit")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.reddit")}
                    className="text-sm placeholder:text-sm"
                    {...register("reddit", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.reddit && errors.reddit.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.introduction_video")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.introduction_video")}
                    className="text-sm placeholder:text-sm"
                    {...register("projectIntroductionVideo", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>
                    {errors.projectIntroductionVideo && errors.projectIntroductionVideo.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.channel")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.channel")}
                    className="text-sm placeholder:text-sm"
                    {...register("videoChannel", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.videoChannel && errors.videoChannel.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.chat")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.chat")}
                    className="text-sm placeholder:text-sm"
                    {...register("chat", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.chat && errors.chat.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.chat_other")}</FormLabel>

                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.chat_other")}
                    {...register("chatOther", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.chatOther && errors.chatOther.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.linkedIn")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.linkedIn")}
                    className="text-sm placeholder:text-sm"
                    {...register("linkedIn", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.linkedIn && errors.linkedIn.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.mobile_app")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.mobile_app")}
                    className="text-sm placeholder:text-sm"
                    {...register("mobileApp", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.mobileApp && errors.mobileApp.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.mobile_app_other")}</FormLabel>

                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.mobile_app_other")}
                    {...register("mobileAppOther", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.mobileAppOther && errors.mobileAppOther.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.start_date")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.start_date")}
                    className="text-sm placeholder:text-sm"
                    {...register("startDate", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.startDate && errors.startDate.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.end_date")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.end_date")}
                    className="text-sm placeholder:text-sm"
                    {...register("endDate", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.endDate && errors.endDate.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.launch_price")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.launch_price")}
                    className="text-sm placeholder:text-sm"
                    {...register("launchPrice", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.launchPrice && errors.launchPrice.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.api_endpoint_total_supply")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.api_endpoint_total_supply")}
                    className="text-sm placeholder:text-sm"
                    {...register("apiEndpointTotalSupply", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>
                    {errors.apiEndpointTotalSupply && errors.apiEndpointTotalSupply.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.api_endpoint_circulating_supply")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.api_endpoint_circulating_supply")}
                    className="text-sm placeholder:text-sm"
                    {...register("apiEndpointTotalSupply", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>
                    {errors.apiEndpointTotalSupply && errors.apiEndpointTotalSupply.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.exchanges")}</FormLabel>

                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.exchanges")}
                    {...register("exchanges", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.exchanges && errors.exchanges.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.are_you_willing")}</FormLabel>
                <Input
                    variant="filled"
                    bg={"btn"}
                    size={"md"}
                    type="text"
                    placeholder={t("submit_coin.are_you_willing")}
                    className="text-sm placeholder:text-sm"
                    {...register("areYouWillingToProvide", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>
                    {errors.areYouWillingToProvide && errors.areYouWillingToProvide.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.page_app")}</FormLabel>
                <Checkbox size="md" className="text-sm placeholder:text-sm">
                    <p className="text-sm">{t("submit_coin.page_app_description")}</p>
                </Checkbox>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.srd_app")}</FormLabel>
                <Checkbox size="md" className="text-sm placeholder:text-sm">
                    <p className="text-sm">{t("submit_coin.srd_app_description")}</p>
                </Checkbox>
            </FormControl>
            <FormControl>
                <FormLabel>{t("submit_coin.proof")}</FormLabel>

                <Textarea
                    variant="filled"
                    bg={"btn"}
                    className="text-sm placeholder:text-sm"
                    placeholder={t("submit_coin.proof")}
                    {...register("proof", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.proof && errors.proof.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
                <Input
                    variant="unstyled"
                    p={"12px 16px"}
                    bg={"btn"}
                    type="file"
                    className="text-sm placeholder:text-sm"
                    {...register("file", {
                        required: "This is required",
                        minLength: { value: 4, message: "Minimum length should be 4" },
                    })}
                />
                <FormErrorMessage>{errors.file && errors.file.message}</FormErrorMessage>
            </FormControl>
            <Button
                mt={"16px"}
                width={"fit-content"}
                bg={"rgb(56,97,251)"}
                _hover={{
                    bg: "rgba(56,97,251,0.8)",
                }}
                rounded={"8px"}
            >
                <span className="text-white">{t("submit_coin.submit")}</span>
            </Button>
        </form>
    );
}

export default FormSubmitCoin;
