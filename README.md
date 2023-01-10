# McBroken Frontend

> Visualization of the [McBroken backend](https://github.com/paulbtw/mcbrokenio) data

The project idea is from [McBroken.com](https://mcbroken.com/) by [rashiq](https://rashiq.me/).

Built with:

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Mapbox](https://www.mapbox.com/)

## Setup

You need to have a location service api and the McDonald's data as json. If you just want to test this out you can use the prod url as env variables
`
S3_URL=https://mcbroken.io/assets
LOCATION_SERVICE_API=https://mcbroken.io/ip
`

1. Set the env variables S3_URL and LOCATION_SERVICE_API
2. yarn install
3. yarn dev
