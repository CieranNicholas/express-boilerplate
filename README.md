# Express boilerplate

### Useful commands

- `npx prisma generate` - Generate prisma client / types
- `"docker ps"` - List all running containers
- `"docker exec -it <container name> sh"` - Access the container shell
- `docker exec -it <container name> npx prisma migrate dev` - Create a new prisma migration

- `docker exec -it backend npx prisma migrate dev --name init` -
- `docker exec -it db psql -U postgres`

TODO:

- logger
- unit tests
- payment processing
  - purchases table?
- relative import paths
