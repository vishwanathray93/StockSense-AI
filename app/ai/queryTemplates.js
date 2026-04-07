export const templates = {

visitors_today: `
SELECT COUNT(DISTINCT visitor_id) AS visitors
FROM sessions
WHERE started_at::date = CURRENT_DATE
`,

top_pages: `
SELECT path, COUNT(*) AS views
FROM page_views
GROUP BY path
ORDER BY views DESC
LIMIT 10
`,

traffic_drop: `
SELECT
shop_domain,
date,
total_visitors,
total_sessions,
LAG(total_visitors) OVER (PARTITION BY shop_domain ORDER BY date) AS prev_visitors
FROM daily_stats
WHERE date >= CURRENT_DATE - INTERVAL '2 days'
`,

revenue: `
SELECT
SUM(total_price) as revenue
FROM orders
WHERE created_at::date = CURRENT_DATE
`,

product_views: `
SELECT
product_id,
COUNT(*) as views
FROM product_views
GROUP BY product_id
ORDER BY views DESC
LIMIT 10
`

};