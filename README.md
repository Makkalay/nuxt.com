<a href="https://nuxt.com"><img width="1200" alt="Nuxt Website" src="https://github.com/nuxt/nuxt.com/assets/904724/22772d8b-4fff-4cf9-a592-85c5ff5d6d58"></a>

# nuxt.com

Bine ați venit la repozitorul site-ușui Nuxt disponibile pe [nuxt.com](https://nuxt.com).

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com/pro)

## Setup

Asigurați-vă că ați activat corepack și ați instalat dependențele

```bash
corepack enable
pnpm install
```

Copiați `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Clonați [nuxt/nuxt](https://github.com/nuxt/nuxt) repo unde doriți (dar nu în proiectul Nuxt.com) și în interiorul directorului `docs/`, rulați:

```bash
pwd
```

Dacă sunteți pe Windows, puteți utiliza în schimb următoarea comandă:

```bash
echo %cd%
```

Copiați rezultatul comenzii de mai sus și lipiți-o în variabila `NUXT_DOCS_PATH` din fișierul `.env`.

## Dezvoltare

Porniți serverul de dezvoltare:

```bash
pnpm dev
```

### Adăugați un șablon nuxt

Pentru a enumera un șablon nuxt, adăugați-l la listă [./content/4.templates.yml](./content/4.templates.yml).

Asigurați-vă că ați pornit serverul de dezvoltare și accesați http://localhost:3000/templates tpentru a vedea rezultatul.

Dacă doriți să actualizați adresa URL unde luăm captura de ecran automată, utilizați proprietate `screenshotUrl`.

Pentru a regenera imaginea, ștergeți imaginea existentă din `public/assets/templates`.

## Producție

Pentru a construi aplicația pentru producție, trebuie să aveți o licență [Nuxt UI Pro](https://ui.nuxt.com/pro) și să setați variabila `NUXT_UI_PRO_LICENSE` din fișierul `.env`.

Rețineți că licența nu e necesară în timpul dezvoltării locale de aceea puteți contribui la dezvoltarea site-ul și a documentației Nuxt fără impedimente.

Construiți aplicația pentru producție:

```bash
pnpm generate
```

## Licenţă

[Licenţă MIT](./LICENSE)
