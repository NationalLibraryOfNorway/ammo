# AMMO
**A**lt **M**ulig **MO**ttak (AMMO) er en web app for behandling av materiale i produksjonsløype for tekst.

## Lokalt oppsett
For å kjøre lokalt må du sette de nødvendige miljøvariablene:
```bash
cp .env.example .env.local
```

| Variabelnavn                   | Standardverdi | Beskrivelse                  |
|--------------------------------|---------------|------------------------------|
| NEXT_PUBLIC_BASE_PATH          | /ammo         | Base path for applikasjonen  |
| NEXT_PUBLIC_KEYCLOAK_BASE_URL  | _N/A_         | URL til keycloak             |
| NEXT_PUBLIC_KEYCLOAK_REALM     | _N/A_         | Keycloak-realmen             |
| NEXT_PUBLIC_KEYCLOAK_CLIENT_ID | _N/A_         | Keycloak-klienten            |
| AUTH_API_PATH                  | _N/A_         | Sti til autentiserings-APIet |
| IMAGE_API_URL                  | _N/A_         | Sti til bilde-APIet          |

Deretter må du kjøre følgende kommandoer:
```bash
npm install
npm run dev
```

Applikasjonen finner du nå i nettleseren på [http://localhost:3000/ammo](http://localhost:3000/ammo).
