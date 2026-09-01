# Mieterportal

[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-2ea44f?logo=github&logoColor=white)](https://bbl-dres.github.io/mieterportal/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> [!CAUTION]
> This is an unofficial mockup for demonstration purposes only. Its records are fictional, not every function is implemented, and it is not intended for production use.

Static HTML/CSS/JavaScript prototype of a tenant portal for the Swiss Bundesamt für Bauten und Logistik (BBL).

## Demo

**Live demo:** https://bbl-dres.github.io/mieterportal/

## Features

- Browse a catalogue of tenant services and reference information.
- View and filter submitted applications.
- Open application details with status and history information.
- Submit a space-requirement request through a six-step wizard.
- Follow case communication in a chat-style view.
- Consult the information pages and price catalogue.

## Run locally

Serve the repository over HTTP:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/>. The root page redirects to the app in `Version 2/`.

## Prototype notes

- The app has no backend; its application, chat, and price data are hardcoded mock content.
- Custom chat folders persist in browser `localStorage`.
- Some images and icons load from external services and require network access.

## License

Licensed under the [MIT License](LICENSE).
