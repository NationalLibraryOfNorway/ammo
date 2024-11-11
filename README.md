# AMMO
**A**lt **M**ulig **MO**ttak (AMMO) er en web app for behandling av materiale i produksjonsløype for tekst.

## Lokalt oppsett
For å kjøre lokalt må du sette de nødvendige miljøvariablene:
```bash
cp .env.example .env.local
```

| Variabelnavn                   | Standardverdi                | Beskrivelse                                                                                                              |
|--------------------------------|------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| NEXT_PUBLIC_BASE_PATH          | /ammo                        | Base path for applikasjonen                                                                                              |
| NEXT_PUBLIC_KEYCLOAK_BASE_URL  | _N/A_                        | URL til keycloak                                                                                                         |
| NEXT_PUBLIC_KEYCLOAK_REALM     | _N/A_                        | Keycloak-realmen                                                                                                         |
| NEXT_PUBLIC_KEYCLOAK_CLIENT_ID | _N/A_                        | Keycloak-klienten                                                                                                        |
| NEXT_PUBLIC_IMAGE_API_PATH     | _N/A_                        | Sti til bilde-APIet                                                                                                      |
| AUTH_API_PATH                  | _N/A_                        | Sti til autentiserings-APIet                                                                                             |
| CATALOG_API_PATH               | http://localhost:8087/bikube | Sti til [katalog APIet ](https://github.com/NationalLibraryOfNorway/bikube)<br/>Må starte med `http://` eller `https://` |
| DATABASE_URL                   | file:../db/ammo.db           | Sti til databasefil (SQLite database)                                                                                    |

Appen bruker SQLite for å holde orden på hvilke objekter som er låst til ulike brukere.
AMMO bruker Prisma som ORM for å kommunisere med databasen.
For å få dette opp å kjøre bruker man `prisma db pull` for å lage nytt schema.prisma,
og `prisma generate` for å laste skjemaet inn i prisma klienten.


Deretter må du kjøre følgende kommandoer:
```bash
npm install
npm run dev
```

Applikasjonen finner du nå i nettleseren på [http://localhost:3000/ammo](http://localhost:3000/ammo).
