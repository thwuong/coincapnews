"use client";
import { Button, Checkbox, Flex, FormControl, Input } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
function AuthLogin() {
    return (
        <div className="flex flex-col gap-8 py-12 animate-fade-left animate-duration-[1500ms]">
            <h1 className="text-32 font-bold leading-[38px] text-typo-5">Login</h1>
            <form className="flex flex-col gap-5">
                <FormControl>
                    <Input size={"lg"} type="email" placeholder="Number phone or email" className="text-base" />
                </FormControl>
                <FormControl>
                    <Input
                        size={"lg"}
                        type="password"
                        placeholder="Password"
                        className="text-base placeholder:text-base"
                    />
                </FormControl>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Checkbox className="font-bold text-base">Remember me</Checkbox>
                    <Link href={"/forgot"} className="text-primary-1 text-base">
                        Lost your password?
                    </Link>
                </Flex>
            </form>
            <Button size={"lg"} bg={"rgb(56,97,251)"} rounded={"20px"}>
                <span className="text-white">Log in</span>
            </Button>
        </div>
    );
}
function AuthRegistation() {
    return (
        <div className="flex flex-col gap-8 py-12 animate-fade-left animate-duration-[1500ms]">
            <h1 className="text-32 font-bold leading-[38px] text-typo-5">Register</h1>
            <form action="" className="flex flex-col gap-5">
                <FormControl>
                    <Input size={"lg"} type="email" placeholder="Number phone or email" className="text-base" />
                </FormControl>
                <FormControl>
                    <Input
                        size={"lg"}
                        type="password"
                        placeholder="Password"
                        className="text-base placeholder:text-base"
                    />
                </FormControl>
            </form>
            <Button size={"lg"} bg={"rgb(56,97,251)"} rounded={"20px"}>
                <span className="text-white">Register</span>
            </Button>
        </div>
    );
}
function Auth() {
    const router = useRouter();
    const [tab, setTab] = useState(false);
    return (
        <main className="w-full grid grid-cols-12 h-svh max-lg:grid-cols-1">
            <section className="col-span-4 bg-white p-14 max-xl:col-span-6 max-lg:col-span-1 max-lg:p-4 max-lg:flex-col max-lg:flex">
                <div className="flex items-center justify-between ">
                    <div
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-full bg-[#EFF2F5] flex items-center justify-center hover:bg-[#EFF2F5]/60 duration-300 cursor-pointer"
                    >
                        <Image src={"/assets/icons/back.svg"} alt="back" height={24} width={24} />
                    </div>
                    <p
                        className="text-base text-primary-1 leading-[26px] font-bold cursor-pointer"
                        onClick={() => setTab(!tab)}
                    >
                        {tab ? "Register" : "Login"}
                    </p>
                </div>
                <div className="max-lg:mt-40">{tab ? <AuthLogin /> : <AuthRegistation />}</div>
            </section>
            <section
                className="col-span-8 h-full max-xl:col-span-6 max-lg:hidden
            flex items-center justify-center relative"
            >
                <Image src={"/assets/images/logo-auth.svg"} alt="logo-auth" fill className="absolute" />
            </section>
        </main>
    );
}

export default Auth;
