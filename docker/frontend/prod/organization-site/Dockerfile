FROM node:20-alpine

WORKDIR /app

COPY /frontend/organization-site/package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY /frontend/organization-site ./

ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}


ENV NEXT_TELEMETRY_DISABLED 1


RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    else yarn build; \
    fi

CMD \
    if [ -f yarn.lock ]; then yarn start; \
    elif [ -f package-lock.json ]; then npm run start; \
    elif [ -f pnpm-lock.yaml ]; then pnpm start; \
    else yarn start; \
    fi
