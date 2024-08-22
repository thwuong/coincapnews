import useFetchAPI from "@/api/baseAPI";
import { useAppSelector } from "@/lib/hooks";
import React, { useMemo } from "react";

function UsePriceConversion() {
  const { currentCurrency } = useAppSelector((store) => store.globalStore);
  const { data: exchange_rates } = useFetchAPI(`/exchange_rates`);

  const priceByCurrentCurrency = useMemo(() => {
    if (exchange_rates?.rates && currentCurrency) {
      const objectToArray = Object.keys(exchange_rates.rates).map((key) => [
        key,
        exchange_rates.rates[key],
      ]);
      const foundItem = objectToArray.find(
        (item) => item[0] == currentCurrency
      );
      if (!foundItem) return 0;
      return foundItem[1].value;
    }
  }, [currentCurrency, exchange_rates]);
  return { priceByCurrentCurrency };
}

export default UsePriceConversion;
