// // نوع بيانات نتيجة البحث
// export interface SearchResult {
//     id: string;
//     tab: string;
//     sectionId: string;
//     title: string;
//     content: string;
//     relevance: number;
//     type: 'title' | 'content' | 'both';
// }

// // فهرس البحث
// export const createSearchIndex = (t: (key: string) => string): SearchResult[] => {
//     const tabs = ['frontend', 'backend', 'mobile', 'devops', 'ai', 'security'];
//     const searchIndex: SearchResult[] = [];

//     tabs.forEach((tab) => {
//         // إضافة العنوان الرئيسي للقسم
//         searchIndex.push({
//             id: `${tab}-main-title`,
//             tab,
//             sectionId: 'main-title',
//             title: t(`content.${tab}.title`),
//             content: t(`content.${tab}.intro`),
//             relevance: 10,
//             type: 'title'
//         });

//         // محتوى Frontend
//         if (tab === 'frontend') {
//             // Why Important
//             searchIndex.push({
//                 id: `${tab}-why-important`,
//                 tab,
//                 sectionId: 'why-important',
//                 title: t('content.frontend.whyImportant'),
//                 content: t.raw('content.frontend.whyImportantPoints').join(' '),
//                 relevance: 8,
//                 type: 'both'
//             });

//             // Core Technologies
//             t.raw('content.frontend.coreTech').forEach((tech: any, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-core-tech-${index}`,
//                     tab,
//                     sectionId: 'core-technologies',
//                     title: tech.title,
//                     content: tech.desc,
//                     relevance: 7,
//                     type: 'both'
//                 });
//             });

//             // Frameworks
//             t.raw('content.frontend.frameworks').forEach((framework: any, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-framework-${index}`,
//                     tab,
//                     sectionId: 'frameworks',
//                     title: framework.name,
//                     content: framework.desc,
//                     relevance: 7,
//                     type: 'both'
//                 });
//             });

//             // Tools
//             t.raw('content.frontend.tools').forEach((tool: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-tool-${index}`,
//                     tab,
//                     sectionId: 'tools',
//                     title: tool,
//                     content: tool,
//                     relevance: 6,
//                     type: 'both'
//                 });
//             });

//             // Best Practices
//             t.raw('content.frontend.bestPracticesList').forEach((practice: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-practice-${index}`,
//                     tab,
//                     sectionId: 'best-practices',
//                     title: practice,
//                     content: practice,
//                     relevance: 6,
//                     type: 'content'
//                 });
//             });
//         }

//         // محتوى Backend
//         if (tab === 'backend') {
//             // Languages
//             t.raw('content.backend.languages').forEach((lang: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-language-${index}`,
//                     tab,
//                     sectionId: 'languages',
//                     title: lang,
//                     content: lang,
//                     relevance: 7,
//                     type: 'both'
//                 });
//             });

//             // Databases
//             t.raw('content.backend.databases').forEach((db: any, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-database-${index}`,
//                     tab,
//                     sectionId: 'databases',
//                     title: db.type,
//                     content: `${db.examples} - ${db.desc}`,
//                     relevance: 8,
//                     type: 'both'
//                 });
//             });

//             // APIs
//             t.raw('content.backend.apis').forEach((api: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-api-${index}`,
//                     tab,
//                     sectionId: 'apis',
//                     title: api,
//                     content: api,
//                     relevance: 7,
//                     type: 'both'
//                 });
//             });

//             // Security
//             t.raw('content.backend.security').forEach((item: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-security-${index}`,
//                     tab,
//                     sectionId: 'security',
//                     title: item,
//                     content: item,
//                     relevance: 6,
//                     type: 'content'
//                 });
//             });
//         }

//         // محتوى Mobile
//         if (tab === 'mobile') {
//             // Native Development
//             t.raw('content.mobile.native').forEach((platform: any, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-native-${index}`,
//                     tab,
//                     sectionId: 'native-development',
//                     title: platform.platform,
//                     content: `${platform.language} - ${platform.tools} - ${platform.desc}`,
//                     relevance: 8,
//                     type: 'both'
//                 });
//             });

//             // Hybrid Development
//             t.raw('content.mobile.hybrid').forEach((framework: any, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-hybrid-${index}`,
//                     tab,
//                     sectionId: 'hybrid-development',
//                     title: framework.framework,
//                     content: framework.desc,
//                     relevance: 8,
//                     type: 'both'
//                 });
//             });

//             // Considerations
//             t.raw('content.mobile.considerations').forEach((consideration: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-consideration-${index}`,
//                     tab,
//                     sectionId: 'considerations',
//                     title: consideration,
//                     content: consideration,
//                     relevance: 7,
//                     type: 'content'
//                 });
//             });
//         }

//         // محتوى DevOps
//         if (tab === 'devops') {
//             // Practices
//             t.raw('content.devops.practices').forEach((practice: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-practice-${index}`,
//                     tab,
//                     sectionId: 'practices',
//                     title: practice,
//                     content: practice,
//                     relevance: 8,
//                     type: 'both'
//                 });
//             });

//             // Tools
//             t.raw('content.devops.tools').forEach((tool: any, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-tool-${index}`,
//                     tab,
//                     sectionId: 'tools',
//                     title: tool.name,
//                     content: tool.desc,
//                     relevance: 9,
//                     type: 'both'
//                 });
//             });

//             // Benefits
//             t.raw('content.devops.benefits').forEach((benefit: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-benefit-${index}`,
//                     tab,
//                     sectionId: 'benefits',
//                     title: benefit,
//                     content: benefit,
//                     relevance: 7,
//                     type: 'content'
//                 });
//             });
//         }

//         // محتوى AI
//         if (tab === 'ai') {
//             // ML Content
//             searchIndex.push({
//                 id: `${tab}-ml`,
//                 tab,
//                 sectionId: 'machine-learning',
//                 title: t('content.ai.mlTitle'),
//                 content: t('content.ai.ml'),
//                 relevance: 9,
//                 type: 'both'
//             });

//             // DL Content
//             searchIndex.push({
//                 id: `${tab}-dl`,
//                 tab,
//                 sectionId: 'deep-learning',
//                 title: t('content.ai.dlTitle'),
//                 content: t('content.ai.dl'),
//                 relevance: 9,
//                 type: 'both'
//             });

//             // Algorithms
//             t.raw('content.ai.algorithms').forEach((algorithm: any, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-algorithm-${index}`,
//                     tab,
//                     sectionId: 'algorithms',
//                     title: algorithm.name,
//                     content: algorithm.desc,
//                     relevance: 8,
//                     type: 'both'
//                 });
//             });

//             // Applications
//             t.raw('content.ai.applications').forEach((app: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-application-${index}`,
//                     tab,
//                     sectionId: 'applications',
//                     title: app,
//                     content: app,
//                     relevance: 7,
//                     type: 'both'
//                 });
//             });
//         }

//         // محتوى Security
//         if (tab === 'security') {
//             // Principles
//             t.raw('content.security.principles').forEach((principle: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-principle-${index}`,
//                     tab,
//                     sectionId: 'principles',
//                     title: principle,
//                     content: principle,
//                     relevance: 8,
//                     type: 'both'
//                 });
//             });

//             // Threats
//             t.raw('content.security.threats').forEach((threat: any, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-threat-${index}`,
//                     tab,
//                     sectionId: 'threats',
//                     title: threat.name,
//                     content: threat.desc,
//                     relevance: 9,
//                     type: 'both'
//                 });
//             });

//             // Protection
//             t.raw('content.security.protection').forEach((method: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-protection-${index}`,
//                     tab,
//                     sectionId: 'protection',
//                     title: method,
//                     content: method,
//                     relevance: 7,
//                     type: 'content'
//                 });
//             });

//             // Best Practices
//             t.raw('content.security.bestPractices').forEach((practice: string, index: number) => {
//                 searchIndex.push({
//                     id: `${tab}-security-practice-${index}`,
//                     tab,
//                     sectionId: 'best-practices',
//                     title: practice,
//                     content: practice,
//                     relevance: 6,
//                     type: 'content'
//                 });
//             });
//         }
//     });

//     return searchIndex;
// };

// // دالة البحث
// export const searchInContent = (
//     query: string,
//     searchIndex: SearchResult[],
//     maxResults: number = 10
// ): SearchResult[] => {
//     if (!query.trim()) return [];

//     const lowerQuery = query.toLowerCase().trim();
//     const words = lowerQuery.split(/\s+/).filter(word => word.length > 2);

//     // حساب الدرجة لكل نتيجة
//     const scoredResults = searchIndex.map(item => {
//         let score = 0;
//         const title = item.title.toLowerCase();
//         const content = item.content.toLowerCase();

//         // البحث في العنوان
//         if (title.includes(lowerQuery)) {
//             score += 10; // تطابق كامل في العنوان
//         } else {
//             words.forEach(word => {
//                 if (title.includes(word)) score += 5;
//             });
//         }

//         // البحث في المحتوى
//         if (content.includes(lowerQuery)) {
//             score += 5; // تطابق كامل في المحتوى
//         } else {
//             words.forEach(word => {
//                 if (content.includes(word)) score += 2;
//             });
//         }

//         // مكافأة للتطابق في العنوان أكثر من المحتوى
//         if (item.type === 'title' || item.type === 'both') {
//             score += 3;
//         }

//         // إضافة درجة الأهمية المحددة مسبقاً
//         score += item.relevance;

//         return { ...item, score };
//     });

//     // ترتيب النتائج حسب الدرجة
//     const filteredResults = scoredResults
//         .filter(item => item.score > 5) // فقط النتائج ذات الدرجة المعقولة
//         .sort((a, b) => b.score - a.score) // ترتيب تنازلي
//         .slice(0, maxResults); // تحديد عدد النتائج

//     return filteredResults;
// };

// // تنسيق النص لتسليط الضوء على كلمات البحث
// export const highlightText = (text: string, query: string): string => {
//     if (!query.trim()) return text;

//     const words = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
//     let highlightedText = text;

//     words.forEach(word => {
//         const regex = new RegExp(`(${word})`, 'gi');
//         highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
//     });

//     return highlightedText;
// };