import { readFile, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const pages = [
  { path: 'Week1/Homework/index.html', id: 'week1', title: '1주차 · HTML/CSS' },
  { path: 'Week2/Homework/one-to-fifty/index.html', id: 'week2', title: '2주차 · 1 to 50' },
];

// React 재빌드로 HTML이 바뀌어도 이 명령으로 배포 메뉴 다시 추가
const updates = await Promise.all(pages.map(async (page) => {
  const path = resolve(root, page.path);
  const prefix = relative(dirname(path), root).split('\\').join('/') + '/';
  const original = await readFile(path, 'utf8');
  if (!original.includes('</head>') || !original.includes('<body')) {
    throw new Error(`HTML 구조 확인 필요: ${page.path}`);
  }

  const clean = original
    .replace(/\n[ \t]*<!-- deployment-navigation:head -->\n[ \t]*<link[^>]*>\n?/g, '\n')
    .replace(/\n[ \t]*<!-- deployment-navigation:start -->[\s\S]*?<!-- deployment-navigation:end -->\n?/g, '\n');
  const stylesheet = `    <!-- deployment-navigation:head -->\n    <link rel="stylesheet" href="${prefix}deployment-navigation.css" />\n`;
  const navigation = `\n    <!-- deployment-navigation:start -->\n    <nav class="deployment-navigation" aria-label="과제 기록">\n      <a href="${prefix}">← 전체 과제</a>\n      <span>${page.title}</span>\n    </nav>\n    <!-- deployment-navigation:end -->`;
  const html = clean
    .replace(/[ \t]*<\/head>/, `${stylesheet}  </head>`)
    .replace(/<body([^>]*)>/, (_, attributes) => {
      const rest = attributes.replace(/\sdata-deployment-page="[^"]*"/g, '');
      return `<body${rest} data-deployment-page="${page.id}">${navigation}`;
    });
  return { path, html };
}));

for (const { path, html } of updates) {
  await writeFile(path, html);
  console.log(`배포 메뉴 추가: ${relative(root, path)}`);
}
