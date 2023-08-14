# Demo
https://www.loom.com/share/4cd87cf15f4d4db0ac625e6f850ef5e7

# Install dependencies
```bash
yarn
```

# Running the app

```bash
yarn dev
```

- Web [http://localhost:3000](http://localhost:3000)
- Server [http://localhost:3001/graphql](http://localhost:3001/graphql)

# Running with Docker

Create a network, which allows containers to communicate with each other, by using their container name as a hostname

```bash
docker network create app_network
```

Build prod using new BuildKit engine

```bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build
```

Start prod in detached mode

```bash
docker-compose -f docker-compose.yml up -d
```

# Tests
```
yarn test
```