import { DaprServer, HttpMethod, DaprClient } from "@dapr/dapr";

const daprHost = process.env.DAPR_HOST || 'http://localhost';
const daprPort = process.env.DAPR_HTTP_PORT || '3500';
const client = new DaprClient({ daprHost, daprPort });
export function productRoutes(server: DaprServer) {

    server.invoker.listen("product", async ({ query, metadata, headers }) => {
        const params = new URLSearchParams(query);

        const product = params.get("product");
        const currency = params.get("currency");

        const response = await client.invoker.invoke("price", `price?product=${product}&currency=${currency}`, HttpMethod.GET).then((response) => {
            console.log("Response from price service", response);
            return { status: 200, data: response };
        });

        return response
    }, { method: HttpMethod.GET });

    server.invoker.listen("product", async (request: any) => {
        console.log("Received request", request);
        await client.pubsub.publish("az.sb", "product", request.body, { contentType: "application/json" }).then((response) => {
            console.log("Response from az.sb", response)
            return { status: 200, data: "product Created" };
        }).catch((error) => {
            console.error("Error sending message to az.sb", error)
            return { status: 500, data: "product Creation Failed" };
        });
    }, { method: HttpMethod.POST });

    server.invoker.listen("product", async (request) => {
        console.log("Received request", request);
        return { status: 200, data: "product Updated" };
    }, { method: HttpMethod.PUT });

    server.invoker.listen("product", async (request) => {
        console.log("Received request", request);
        return { status: 200, data: "product Deleted" };
    }, { method: HttpMethod.DELETE });
}