#!/usr/bin/env python3
"""Hide the 1-to-1 Interview Preparation service from every city and keyword page.
Run once from the website repo folder:  python3 hide_interview.py
To bring the service back later, restore the files from Git (git revert this commit)."""
import os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
SKIP_DIRS = {'.git', 'node_modules', 'assets'}

A_LINK = re.compile(r'<a\b[^>]*href="[^"]*interview-prep(?:aration)?/[^"]*"[^>]*>.*?</a>', re.S)
LIST_ITEM = re.compile(r',?\{"@type":"ListItem","position":\d+,"name":"[^"]*Interview Prep[^"]*","url":"[^"]*"\}')
OFFER = re.compile(r',?\{"@type":"Offer"[^{}]*"itemOffered":\{"@type":"Service","name":"[^"]*Interview Prep[^"]*"\}\}')
ROBOTS = re.compile(r'<meta name="robots"[^>]*>')
PHRASES = [
    (', portfolio websites and 1-to-1 interview preparation', ' and portfolio websites'),
    (', portfolio websites and 1-to-1 interview coaching', ' and portfolio websites'),
    (', portfolio websites and interview prep', ' and portfolio websites'),
    (', portfolio websites and interview preparation', ' and portfolio websites'),
]

def is_interview_page(path):
    p = path.replace('\\', '/')
    return '/interview-preparation/' in p or '/interview-prep/' in p or p.endswith('/interview-prep.html')

changed = pages = hidden = 0
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
    for name in filenames:
        if not name.endswith('.html'):
            continue
        path = os.path.join(dirpath, name)
        with open(path, encoding='utf-8') as f:
            s = f.read()
        o = s
        if is_interview_page(path):
            if 'http-equiv="refresh"' not in s:
                s = ROBOTS.sub('<meta name="robots" content="noindex, follow">', s, count=1)
                s = s.replace('<head>', '<head>\n<meta http-equiv="refresh" content="0; url=/">', 1)
                hidden += 1
        else:
            s = A_LINK.sub('', s)
            s = LIST_ITEM.sub('', s)
            s = OFFER.sub('', s)
            for a, b in PHRASES:
                s = s.replace(a, b)
        pages += 1
        if s != o:
            changed += 1
            with open(path, 'w', encoding='utf-8') as f:
                f.write(s)

print(f'Done: {pages} pages checked, {changed} updated, {hidden} interview pages hidden.')
