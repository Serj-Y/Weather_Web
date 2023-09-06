import { useState } from "react";

export const celsiusToFahrenheit = (celsius: number, isFahrenheit: boolean) => {
        if (isFahrenheit) {
            const tempF = (celsius * (9 / 5)) + 32;
            return tempF.toFixed();
        } else {
            const tempC = celsius;
            return tempC.toFixed();
        }
};
