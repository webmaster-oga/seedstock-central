# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Seedstock Central** is a WordPress theme (`OGA`) for [seedstockcentral.com.au](https://seedstockcentral.com.au), an Australian agricultural livestock/seedstock publication. The theme was originally generated with Artisteer v4.1 and has been customized beyond the baseline.

## Deployment

There is no build step. Files are deployed directly via SFTP (VS Code SFTP extension, configured in `.vscode/sftp.json`):

- **Remote path:** `/www/seedstockcentral_859/public/wp-content/themes/OGA`
- `uploadOnSave: true` is set — saving a file in VS Code auto-deploys it to the live server.

To deploy manually, use the VS Code SFTP extension ("SFTP: Upload File" or "SFTP: Sync Local -> Remote").

## Theme Architecture

All theme files live in `/OGA/`. There is no bundler, no `package.json`, and no Composer setup.

### Initialization Flow

`functions.php` is the main entry point. It:
1. Defines `THEME_NAME = "OGA"` and `THEME_NS = "twentyten"`
2. Includes library modules from `/OGA/library/` in order
3. Registers WordPress hooks/filters for enqueuing scripts, customizing admin, etc.

### Key Files

| File | Purpose |
|------|---------|
| `functions.php` | Theme bootstrap, hook registration, options |
| `library/defaults.php` | Default theme option values |
| `library/options.php` | Theme Customizer settings and controls |
| `library/navigation.php` | Menu and nav HTML rendering |
| `library/sidebars.php` | Widget area registration |
| `library/widgets.php` | Custom widget definitions |
| `library/shortcodes.php` | Custom shortcodes (ads: `base-ad`, `footer-ad`, `mobile-ad`) |
| `library/admins.php` | WordPress admin UI customizations |
| `library/misc.php` | Utility functions |
| `script.js` | Main theme JavaScript (jQuery-dependent) |
| `script.responsive.js` | Responsive behaviour JavaScript |
| `style.css` | Main stylesheet |
| `style.responsive.css` | Responsive/mobile stylesheet |

### Template Hierarchy

Standard WordPress template hierarchy. Content partials (`content-*.php`) are loaded via `get_template_part()` from `index.php` and other templates based on post format/type.

Sidebar regions: `sidebar.php`, `sidebar-nav.php`, `sidebar-top.php`, `sidebar-bottom.php`, `sidebar-header.php`, `sidebar-footer.php`.

### Frontend

- jQuery is bundled at `/OGA/jquery.js` (not loaded from CDN)
- Google Analytics tag is hardcoded in `header.php` (ID: `G-QQTZTH9EZX`)
- Category-specific content sliders for Beef, Sheep, and Dairy sections
- Responsive breakpoints handled by `script.responsive.js` + `style.responsive.css`
- IE7 compat via `style.ie7.css` and `html5.js`

### Localization

Text domain: `twentyten`. Language files (`.mo`/`.po`) are in `/OGA/languages/` for de_DE, es_ES, fr_FR, it_IT, ru_RU.

## Development Notes

- **No tests** and no test runner configured.
- **No linter** configured (JS was written with JSHint conventions — see comment at top of `script.js`).
- The `.vscode/sftp.json` contains live server credentials — do not commit changes to this file or expose its contents.
- Demo content importer lives in `/OGA/content/` (`content-importer.php`, `content-parser.php`, `content.xml`).
