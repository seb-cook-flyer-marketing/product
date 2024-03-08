import { DaprServer, HttpMethod } from "@dapr/dapr";
import { priceRoutes } from "./price";
import { productRoutes } from "./product";

export function routes(server: DaprServer) {
    productRoutes(server);
}