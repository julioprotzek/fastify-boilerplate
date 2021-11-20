# Fastify Boilerplate

## Initial setup
```bash
$ mkdir myapp && cd myapp
$ yarn init -y
$ yarn add fastify fastify-autoload fastify-cli fastify-plugin fastify-sensible
$ yarn add -D jest ts-jest @types/jest ts-node @types/node fastify-tsconfig typescript cross-env concurrently
$ mkdir -p src/routes test/routes
$ touch .gitignore tsconfig.json src/app.ts src/routes/root.ts test/helper.ts test/routes/root.test.ts
```

## Config git
### `.gitignore`
```
dist
node_modules
coverage
```

### Initialize repository
```bash
$ git init
```

## Config Typescript by extending `fastify-tsconfig`
### `tsconfig.json`
```json
{
  "extends": "fastify-tsconfig",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

## Config Typescript for Jest
```bash
$ yarn ts-jest config:init
```

## Add `"scripts"` to `package.json`:
```json
"scripts": {
  "test": "jest --coverage",
  "start": "npm run build:ts && fastify start -l info dist/app.js",
  "build:ts": "tsc",
  "dev": "tsc && concurrently -k -p \"[{name}]\" -n \"Typescript,App\" -c \"yellow.bold,cyan.bold\" \"tsc -w\" \"fastify start --ignore-watch=.ts$ -w -l info -P dist/app.js\""
},
```

## Create main app
### `src/app.ts`
```typescript
import { join } from "path"
import AutoLoad from "fastify-autoload"
import { FastifyPluginAsync } from "fastify"

const app: FastifyPluginAsync = async (fastify) => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes')
  })
}

export default app
export { app }
```

## Add routes
### `src/routes/root.ts`
```typescript
import { FastifyPluginAsync  } from "fastify"
const root: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (req, res) => {
    return { root: true }
  })
}
export default root
```

## Initialize app for tests
### `test/helper.ts`
```typescript
import Fastify from "fastify"
import fp from "fastify-plugin"
import App from "../src/app"

export function build() {
  const app = Fastify()

  beforeAll(async () => {
    void app.register(fp(App))
    await app.ready()
  })

  afterAll(() => app.close())

  return app
}
```

## Test routes
### `test/routes.test.ts`
```typescript
import { build } from "../helper"

describe("Root route", () => {
  const app = build()

  it("works", async () => {
    const res = await app.inject({ url: "/" })
    expect(res.json()).toEqual({ root: true })
  })
})
```

## First commit
```bash
$ git add .
$ git commit -m "Empty Fastify project"
```

# Run tests
```bash
$ yarn test
```

# Start on localhost
```bash
$ yarn dev
```
