#!/usr/bin/env python3
from pathlib import Path
import shutil


ROOT_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = ROOT_DIR / "dist"

# Only files in this allowlist are shipped to Cloudflare Pages.
PUBLIC_FILES = [
    "index.html",
    "app.js",
    "lang.js",
    "_headers",
    "_redirects",
    "favicon.ico",
    "robots.txt",
    "sitemap.xml",
    "manifest.webmanifest",
]


def main():
    if DIST_DIR.exists():
        shutil.rmtree(DIST_DIR)
    DIST_DIR.mkdir(parents=True)

    copied = []
    for relative_path in PUBLIC_FILES:
        src = ROOT_DIR / relative_path
        if not src.exists():
            continue
        dst = DIST_DIR / relative_path
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        copied.append(relative_path)

    print(f"Built {DIST_DIR}")
    for path in copied:
        print(f" - {path}")


if __name__ == "__main__":
    main()
