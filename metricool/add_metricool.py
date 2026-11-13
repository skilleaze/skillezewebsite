#!/usr/bin/env python3
# Adds the Metricool tracking pixel to every page of the Skilleaze website.
# Run from inside the website repo folder (next to index.html). Safe to run twice.
import os, re, sys
TAG = '<img src="https://tracker.metricool.com/c3po.jpg?hash=a148ade8a0d7f070caee24b8fef4f2ee" alt="" width="1" height="1" style="position:absolute;width:1px;height:1px;opacity:0;pointer-events:none" aria-hidden="true" loading="eager" referrerpolicy="no-referrer-when-downgrade">'
if not os.path.exists('index.html'):
    sys.exit('Run this inside your website folder (next to index.html).')
done = skipped = 0
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
    for f in files:
        if not f.endswith('.html'): continue
        p = os.path.join(root, f)
        s = open(p, encoding='utf-8', errors='ignore').read()
        if 'tracker.metricool.com/c3po.jpg' in s or '</body>' not in s:
            skipped += 1; continue
        i = s.rfind('</body>')
        s = s[:i] + TAG + '\n' + s[i:]
        open(p, 'w', encoding='utf-8').write(s)
        done += 1
print(f'Done: {done} pages updated, {skipped} skipped.')
