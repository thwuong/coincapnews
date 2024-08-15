"use client";
import { createUserAPI, loginAPI } from "@/api/authAPI";
import { EMAIL_REGEX } from "@/app/contants";
import { setUser } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import showToast from "@/utils";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { mutate } from "swr";
type Inputs = {
  email: string;
  password: string;
};
function AuthLogin() {
  const [cookies, setCookie] = useCookies(["c-token"]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
  });
  const router = useRouter();
  const handleLogin: SubmitHandler<Inputs> = async (newUser) => {
    setLoading(true);
    try {
      const res = await mutate("/api/user", loginAPI(newUser));
      if (!res?.user) {
        throw new Error("Login failed");
      }
      setCookie("c-token", res.token, { path: "/" });
      dispatch(setUser(res.user));
      showToast("success", res.message || "Login successfully");
      setLoading(false);
      router.push("/");
    } catch (error) {
      showToast("error", "Login failed");
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 py-12 animate-fade-left animate-duration-[1500ms]">
      <h1 className="text-32 font-bold leading-[38px] text-typo-5">Login</h1>
      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex flex-col gap-5">
          <FormControl isInvalid={!!errors.email}>
            <Input
              size={"lg"}
              type="email"
              placeholder="Number phone or email"
              className="text-base"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Email is not valid",
                },
              })}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <Input
              size={"lg"}
              type="password"
              placeholder="Password"
              className="text-base placeholder:text-base"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Checkbox className="font-bold text-base">Remember me</Checkbox>
            <Link href={"/forgot"} className="text-primary-1 text-base">
              Lost your password?
            </Link>
          </Flex>
        </div>
        <Button
          size={"lg"}
          isLoading={loading}
          isDisabled={loading}
          type="submit"
          bg={"rgb(56,97,251)"}
          rounded={"20px"}
          _hover={{ bg: "rgb(56,97,251)", opacity: "0.8" }}
        >
          <span className="text-white">Log in</span>
        </Button>
      </form>
    </div>
  );
}
function AuthRegistation({ setTab }: { setTab: (tab: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
  });
  const handleRegister: SubmitHandler<Inputs> = async (newUser) => {
    setLoading(true);
    try {
      const res = await mutate("/api/create/user", createUserAPI(newUser));
      if (!res?.doc) {
        throw new Error("Register failed");
      }
      showToast("success", res.message || "Register successfully");
      setLoading(false);
      setTab(true);
    } catch (error) {
      showToast("error", "Register failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-12 animate-fade-left animate-duration-[1500ms]">
      <h1 className="text-32 font-bold leading-[38px] text-typo-5">Register</h1>
      <form
        action=""
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="flex flex-col gap-5">
          <FormControl isInvalid={!!errors.email}>
            <Input
              size={"lg"}
              type="email"
              placeholder="Enter your email"
              className="text-base"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Email is not valid",
                },
              })}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <Input
              size={"lg"}
              type="password"
              placeholder="Password"
              className="text-base placeholder:text-base"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            {errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
        </div>
        <Button
          disabled={loading}
          isLoading={loading}
          size={"lg"}
          bg={"rgb(56,97,251)"}
          _hover={{ bg: "rgb(56,97,251)", opacity: "0.8" }}
          rounded={"20px"}
          type="submit"
        >
          <span className="text-white">Register</span>
        </Button>
      </form>
    </div>
  );
}
function Auth() {
  const router = useRouter();
  const [tab, setTab] = useState(true);
  return (
    <main className="w-full grid grid-cols-12 h-svh max-lg:grid-cols-1">
      <section className="col-span-4 bg-white p-14 max-xl:col-span-6 max-lg:col-span-1 max-lg:p-4 max-lg:flex-col max-lg:flex">
        <div className="flex items-center justify-between ">
          <div
            onClick={() => router.back()}
            className="w-12 h-12 rounded-full bg-[#EFF2F5] flex items-center justify-center hover:bg-[#EFF2F5]/60 duration-300 cursor-pointer"
          >
            <Image
              src={"/assets/icons/back.svg"}
              alt="back"
              height={24}
              width={24}
            />
          </div>
          <p
            className="text-base text-primary-1 leading-[26px] font-bold cursor-pointer"
            onClick={() => setTab(!tab)}
          >
            {tab ? "Register" : "Login"}
          </p>
        </div>
        <div className="max-lg:mt-40">
          {tab ? <AuthLogin /> : <AuthRegistation setTab={setTab} />}
        </div>
      </section>
      <section
        className="col-span-8 h-full max-xl:col-span-6 max-lg:hidden
            flex items-center justify-center relative"
      >
        <Image
          src={"/assets/images/logo-auth.svg"}
          alt="logo-auth"
          fill
          className="absolute"
        />
      </section>
    </main>
  );
}

export default Auth;
