import Fastify, { FastifyLoggerInstance } from "fastify"
import fCors from "@fastify/cors"
import { ReqEvent } from "./interfaces/ReqEvent.ts/index.ts"
import { connectMongo, createMongoIndexes } from "./utils/mongodb.ts"
import * as http from "http"
const fastify = Fastify<http.Server, http.IncomingMessage, http.ServerResponse, FastifyLoggerInstance>({ logger: true })

async function getModule(name: string): Promise<{ handler: (event: ReqEvent, _) => Promise<any> }> {
  return import(name + ".ts")
    .catch(() => import(name))
}

const netlifyFunctions = async (request, reply) => {
  const functionsName = request.params["*"]

  const path = `./apis/${functionsName}`
  const module = await getModule(path)

  const res = await module.handler(
    {
      path: request.url, // "Path parameter (original URL encoding)"
      httpMethod: request.routerMethod, // "Incoming request's method name",
      headers: request.headers, //{Incoming request headers},
      queryStringParameters: request.query, //{Query string parameters},
      body: JSON.stringify(request.body), //"A JSON string of the request payload",
      payload: request.body, //"Request payload",
      isBase64Encoded: true, //"A boolean flag to indicate if the applicable request payload is Base64-encoded"
    },
    {}
  ).catch(err => {
    if (err.statusCode) {
      return err
    } else {
      return {
        statusCode: 500,
        body: err
      }
    }
  })
  console.log(res.body)
  reply
    .code(res.statusCode || 201)
    .headers(res.headers || {})
    .send(res.body)
}

fastify.register(fCors, {
  // put your options here

  origin: [
    "http://localhost",
    "http://localhost:3000",
    "http://netlify.app",
  ],
  credentials: true,

})

fastify.register((instance, options, done) => {
  instance.addHook('onClose', (instance, done) => {
    console.log('Fastify server closing...');
    // Perform any necessary cleanup or shutdown tasks here
    // Close database connections, release resources, etc.
    done();
  });

  process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Gracefully shutting down Fastify server...');
    instance.close(() => {
      console.log('Fastify server closed');
      process.exit(0);
    });
  });

  done();
});

fastify.get("/", async (request, reply) => {
  return "Server is Connected"
})

// Declare a route
fastify.get("/.netlify/functions/*", netlifyFunctions)

fastify.post("/.netlify/functions/*", netlifyFunctions)

fastify.put("/.netlify/functions/*", netlifyFunctions)

fastify.patch("/.netlify/functions/*", netlifyFunctions)

fastify.delete("/.netlify/functions/*", netlifyFunctions)


// Run the server!
const start = async () => {
  try {
    await Promise.all([
      connectMongo()
    ])

    await Promise.all([
      createMongoIndexes()
    ])

    await fastify.listen(8080, "0.0.0.0")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
