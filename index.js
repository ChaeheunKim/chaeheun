import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# Hello 👋

## Tech ✍🏼

### Backend
<p>
  <img alt="Java" src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=OpenJDK&logoColor=white"/>
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=Spring-Boot&logoColor=white"/>
</p>

### Database
<p>
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white"/>
</p>

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    try {
        // 피드 목록 (요청하신 티스토리 주소의 RSS)
        const feed = await parser.parseURL('https://chee0630.tistory.com/rss');

        text += `<ul>`;

        // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
        for (let i = 0; i < 10; i++) {
            // 혹시 작성된 글이 10개 미만일 경우를 대비한 예외 처리
            if (!feed.items[i]) break;

            const {title, link} = feed.items[i];
            console.log(`${i + 1}번째 게시물`);
            console.log(`추가될 제목: ${title}`);
            console.log(`추가될 링크: ${link}`);
            text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
        }

        text += `</ul>`;

        // README.md 파일 생성
        writeFileSync('README.md', text, 'utf8');
        console.log('업데이트 완료');
    } catch (error) {
        console.error('RSS 피드를 가져오는 중 에러가 발생했습니다:', error);
    }
})();