import { Feed } from 'feed'
import { joinURL } from 'ufo'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://nuxt.com'
  const siteUrl = joinURL(baseUrl, 'blog')
  const feed = new Feed({
    title: 'Blogul Nuxt',
    description: 'Știri și actualizări despre Nuxt Nuxt.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: joinURL(baseUrl, 'icon.png'),
    favicon: joinURL(baseUrl, 'favicon.png'),
    copyright: `Drepturi de autor © 2016-${new Date().getFullYear()} Nuxt Toate drepturile rezervate`,
    feedLinks: {
      rss: `${siteUrl}/rss.xml`
    }
  })

  const articles = await serverQueryContent(event, '/blog')
    .sort({ date: -1 })
    .where({ _partial: false, _draft: false, _type: 'markdown' })
    .find()

  for (const article of articles) {
    feed.addItem({
      link: joinURL(baseUrl, article._path),
      image: joinURL(baseUrl, article.image),
      title: article.title,
      date: new Date(article.date),
      description: article.description,
      author: article.authors,
      category: article.category
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
