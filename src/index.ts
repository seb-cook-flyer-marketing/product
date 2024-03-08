/*
Copyright 2021 The Dapr Authors
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
dapr run --app-id batch-sdk --app-port 5002 --dapr-http-port 3500 --components-path ../../../components -- node index.js
*/

import { DaprServer } from "@dapr/dapr";
import { routes } from "./router";

const daprHost = process.env.DAPR_HOST || 'http://localhost';
const daprPort = process.env.DAPR_HTTP_PORT || '3500';
const serverHost = "127.0.0.1";
const serverPort = process.env.SERVER_PORT || '5001';

const server  = new DaprServer({ serverHost, serverPort, clientOptions: { daprHost, daprPort } });

async function start() {
  routes(server);
  await server.start();
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});