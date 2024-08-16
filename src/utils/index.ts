import { createStandaloneToast } from "@chakra-ui/react";

export default function showToast(
  status: "info" | "warning" | "success" | "error" | "loading" | undefined,
  message: string
) {
  const { toast } = createStandaloneToast();

  toast({
    title: message,
    status,
    position: "top-right",
    duration: 5000,
    isClosable: true,
  });
}
