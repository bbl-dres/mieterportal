# Mieterportal

Static HTML/CSS/JS prototype of a tenant portal for the Swiss **Bundesamt für Bauten und Logistik (BBL)**. German UI, no framework, no build step — open the files directly.

> [!CAUTION]
> **This is an unofficial mockup for demonstration purposes only.**
> All data is fictional. Not all features are fully functional. This project serves as a visual and conceptual prototype — it is not intended for production use.

## Run

Open [index.html](index.html) (redirects to the app) or serve the folder:

```bash
python -m http.server
```

Then visit `http://localhost:8000`.

## Structure

The app lives in [`Version 2/`](Version%202/):

| File | Page |
|------|------|
| `startseite.html` | Home / start page |
| `Dienstleistungen.html` | Services catalog |
| `Meine-antrage.html` | My applications (list + filters) |
| `antrag-detail.html` | Application detail view |
| `antrag.html` | Communication / chat |
| `raumbedarf-antrag.html` | New application wizard (6 steps) |
| `informationen.html` | Information & references |
| `preiskatalog.html` | Price catalog |
| `js/main.js` | All interactivity |
| `css/style.css` | Styling |

## Notes

- All data (applications, chats, prices) is hardcoded mock content — no backend.
- Custom chat folders persist in `localStorage`.
- Images and icons load from external CDNs (BBL asset server, Bootstrap Icons).
