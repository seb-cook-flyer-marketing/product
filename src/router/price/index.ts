import { DaprServer, HttpMethod } from "@dapr/dapr";
import currencies from "../../models/currencies.json";

export function priceRoutes(server: DaprServer) {
    server.invoker.listen("price", async ({ query, metadata, headers }) => {
        const params = new URLSearchParams(query);

        const currency = params.get("currency");

        if (!currency) {
            return { status: 400, data: "Currency is required" };
        }
        for (const [key, value] of Object.entries(currencies)) {
            console.log(value, currency)
            if (value.code === currency) {
                return {
                    maxPrice: 100,
                    minPrice: 1,
                    averagePrice: 50,
                    priceCurrency: value.code,
                    validFrom: "2024-01-01",
                    validThrough: "2024-12-31",
                    valueAddedTaxIncluded: true
                };
            }
        }
    }, { method: HttpMethod.GET });

    server.invoker.listen("price", async (request) => {
        console.log("Received request", request);
        return { status: 200, data: "Price Created" };
    }, { method: HttpMethod.POST });

    server.invoker.listen("price", async (request) => {
        console.log("Received request", request);
        return { status: 200, data: "Price Updated" };
    }, { method: HttpMethod.PUT });

    server.invoker.listen("price", async (request) => {
        console.log("Received request", request);
        return { status: 200, data: "Price Deleted" };
    }, { method: HttpMethod.DELETE });
}