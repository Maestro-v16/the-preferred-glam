"""Saves every Instagram image used by index.html into an images/ folder and rewrites index.html to use them.
Run it from the folder that contains index.html:   python save_images.py
(Needs Python 3 and an internet connection. Nothing to install.)
Use --dry to only count the images without downloading."""
import re, sys, html, hashlib, shutil, pathlib, urllib.request
root = pathlib.Path(__file__).parent
page = root / 'index.html'
text = page.read_text(encoding='utf-8')
urls = sorted(set(html.unescape(u) for u in re.findall(r'https://[^"\'()\s<>]+', text) if re.search(r'cdninstagram|fbcdn', u)))
print(len(urls), 'Instagram images found')
if '--dry' in sys.argv: sys.exit()
(root / 'images').mkdir(exist_ok=True)
shutil.copy(page, root / 'index.original.html')
ok = 0
for u in urls:
    name = 'images/' + hashlib.md5(u.encode()).hexdigest()[:12] + '.jpg'
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        (root / name).write_bytes(urllib.request.urlopen(req, timeout=30).read())
    except Exception as e:
        print('FAILED', u[:70], e); continue
    text = text.replace(html.escape(u), name).replace(u, name); ok += 1
page.write_text(text, encoding='utf-8')
print(f'Saved {ok} of {len(urls)}. Upload index.html and the images folder together.')
