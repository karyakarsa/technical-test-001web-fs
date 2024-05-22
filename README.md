# Webfs (001web-fs)

A quasar project for KaryaKarsa technical test for full stack developer candidate

## Requirements

- [Quasar v1 CLI](https://v1.quasar.dev/quasar-cli/installation)
- [NodeJS v16.x](https://nodejs.org/en/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop): For running Supabase container locally
- [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started?queryGroups=platform&platform=npx): For running Supabase locally

## Stack

## Install the dependencies

```bash
yarn install
```

### Start the local supabase

```bash
npx supabase start
```

This action will start a local Supabase instance including migrations and seeding dummy data.

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

### Lint the files

```bash
yarn lint
```

### Build the app for production

```bash
yarn build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).
