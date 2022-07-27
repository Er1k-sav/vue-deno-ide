import { Application } from "./deps.ts";
const server: Application = new Application();

import rep from "./controllers/routes.ts";

server.use(rep.routes());
server.use(rep.allowedMethods());
server.listen({port: 9797});
console.log('\x1b[33m%s\x1b[0m', "----------------------------------");
console.log('\x1b[36m%s\x1b[0m',"Server is listening on 9797")
console.log('\x1b[33m%s\x1b[0m', "----------------------------------\n");
export { server };


