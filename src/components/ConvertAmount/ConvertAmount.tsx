import { Box, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import React from "react";

function ConvertAmount() {
    return (
        <div className="rounded-lg shadow-xl bg-white">
            <Box className="py-5 px-4 flex items-center justify-between gap-4">
                <Select
                    placeholder="BTC"
                    className="font-semibold text-sm text-black uppercase "
                    border={"none"}
                    w={"fit-content"}
                >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </Select>
                <NumberInput>
                    <NumberInputField
                        px={"0px"}
                        _focusVisible={{
                            boxShadow: "none",
                        }}
                        border={"none"}
                        outline={"none"}
                        textAlign={"right"}
                        className="font-bold"
                        fontSize={"18px"}
                        placeholder="Enter Amount to Convert"
                    />
                </NumberInput>
            </Box>
            <Box className="py-5 px-4 flex items-center justify-between gap-4">
                <Select
                    placeholder="BTC"
                    className="font-semibold text-sm text-black uppercase"
                    border={"none"}
                    w={"fit-content"}
                >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </Select>
                <p className="font-bold text-lg">{"423"}</p>
            </Box>
        </div>
    );
}

export default ConvertAmount;
