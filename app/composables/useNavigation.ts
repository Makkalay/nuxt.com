import { createSharedComposable } from '@vueuse/core'

const _useNavigation = () => {
  const nuxtApp = useNuxtApp()
  const headerLinks = computed(() => {
    const route = useRoute()

    return [{
      label: 'Documente',
      icon: 'i-ph-book-bookmark',
      to: '/docs',
      search: false,
      children: [{
        label: 'Începeți',
        description: 'Aflați cum să începeți cu Nuxt.',
        icon: 'i-ph-rocket-launch',
        to: '/docs/getting-started',
        active: route.path.startsWith('/docs/getting-started')
      }, {
        label: 'Ghid',
        description: 'Aflați cum să construiți și să implementați aplicații Nuxt.',
        icon: 'i-ph-book-open',
        to: '/docs/guide',
        active: route.path.startsWith('/docs/guide')
      }, {
        label: 'API',
        description: 'Explorați API-ul Nuxt.',
        icon: 'i-ph-code',
        to: '/docs/api',
        active: route.path.startsWith('/docs/api')
      }, {
        label: 'Exemple',
        description: 'Descoperiți și explorați exemple oficiale și comunitare.',
        icon: 'i-ph-app-window',
        to: '/docs/examples',
        active: route.path.startsWith('/docs/examples')
      }, {
        label: 'Comunitate',
        description: 'Găsiți răspunsuri și sprijin din partea comunității.',
        icon: 'i-ph-chats-teardrop',
        to: '/docs/community',
        active: route.path.startsWith('/docs/community')
      }]
    }, {
      label: 'Integrări',
      to: '/modules',
      icon: 'i-ph-plugs-connected',
      search: false,
      active: route.path.startsWith('/modules') || route.path.startsWith('/deploy'),
      children: [{
        label: 'Module',
        description: 'Supraîncărcați-vă proiectul Nuxt cu module.',
        icon: 'i-ph-puzzle-piece',
        to: '/modules'
      }, {
        label: 'Hosting',
        description: 'Implementați-vă proiectul Nuxt oriunde.',
        icon: 'i-ph-rocket-launch',
        to: '/deploy'
      }]
    }, {
      label: 'Resurse',
      icon: 'i-ph-books',
      to: '/templates',
      search: false,
      active: route.path.startsWith('/templates') || route.path.startsWith('/video-courses'),
      children: [{
        label: 'Șabloane',
        icon: 'i-ph-browsers',
        description: 'Începeți următorul proiect cu un șablon nuxt.',
        to: '/templates'
      }, {
        label: 'Cursuri video',
        description: 'Aflați nuxt urmărind cursuri video.',
        icon: 'i-ph-graduation-cap',
        to: '/video-courses'
      }, {
        label: 'Vitrină',
        description: 'Descoperiți și explorați proiecte construite cu nuxt.',
        icon: 'i-ph-projector-screen',
        to: '/showcase'
      }, {
        label: 'Certificare Nuxt',
        description: 'Obțineți certificarea dvs. de competență.',
        icon: 'i-ph-medal',
        to: 'https://certification.nuxt.com',
        target: '_blank'
      }]
    }, {
      label: 'Produse',
      icon: 'i-ph-sparkle',
      search: false,
      children: [{
        label: 'Nuxt UI Pro',
        to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=header',
        description: 'Componente premium Vue pentru nuxt.',
        icon: 'i-ph-layout',
        target: '_blank'
      }, {
        label: 'NuxtStudio',
        to: 'https://nuxt.studio/?utm_source=nuxt-website&utm_medium=header',
        description: 'CMS bazat pe Git pentru nuxt.',
        icon: 'i-ph-pen',
        target: '_blank'
      }, {
        label: 'NuxtHub',
        to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=header',
        description: 'Construiți, implementați și gestionați aplicațiile Nuxt cu potențial de creștere.',
        icon: 'i-ph-rocket-launch',
        target: '_blank'
      }]
    }, {
      label: 'Servicii',
      icon: 'i-ph-buildings',
      to: '/enterprise',
      search: false,
      children: [{
        label: 'Suport',
        to: '/enterprise/support',
        description: 'Suport profesional al experților Nuxt.',
        icon: 'i-ph-lifebuoy'
      }, {
        label: 'Agenții',
        to: '/enterprise/agencies',
        description: 'Agenții specializate în dezvoltarea Nuxt.',
        icon: 'i-ph-handshake'
      }, {
        label: 'sponsori',
        to: '/enterprise/sponsors',
        description: 'Ajută-ne să susținem dezvoltarea Nuxt.',
        icon: 'i-ph-hand-heart'
      }]
    }, {
      label: 'blog',
      icon: 'i-ph-newspaper',
      to: '/blog'
    }]
  })

  const footerLinks = [{
    label: 'Comunitate',
    children: [{
      label: 'Nuxteri',
      to: 'https://nuxters.nuxt.com',
      target: '_blank'
    }, {
      label: 'Echipă',
      to: '/team'
    }, {
      label: 'Kit de proiectare',
      to: '/design-kit'
    }]
  }, {
    label: 'Produse',
    children: [{
      label: 'Nuxt UI Pro',
      to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=footer',
      target: '_blank'
    }, {
      label: 'Nuxt Studio',
      to: 'https://nuxt.studio/?utm_source=nuxt-website&utm_medium=footer',
      target: '_blank'
    }, {
      label: 'NuxtHub',
      to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=footer',
      target: '_blank'
    }]
  }, {
    label: 'Întreprindere',
    children: [{
      label: 'Suport',
      to: '/enterprise/support'
    }, {
      label: 'Agenții',
      to: '/enterprise/agencies'
    }, {
      label: 'Sponsori',
      to: '/enterprise/sponsors'
    }]
  }]

  const searchLinks = computed(() => [
    {
      label: 'Întrebați IA',
      icon: 'i-ph-magic-wand',
      to: 'javascript:void(0);',
      // @ts-expect-error this is not typed
      click: () => nuxtApp.$kapa?.openModal()
    },
    ...headerLinks.value.map((link) => {
    // Remove `/docs` and `/enterprise` links from command palette
      if (link.search === false) {
        return {
          label: link.label,
          icon: link.icon,
          children: link.children
        }
      }

      return link
    }).filter(Boolean), {
      label: 'Echipă',
      icon: 'i-ph-users',
      to: '/team'
    }, {
      label: 'Kit de proiectare',
      icon: 'i-ph-palette',
      to: '/design-kit'
    }, {
      label: 'Buletin informativ',
      icon: 'i-ph-envelope-simple',
      to: '/newsletter'
    }])

  const searchGroups = [{
    key: 'ask-ai-search',
    label: 'IA',
    icon: 'i-ph-magic-wand',
    search: async (q) => {
      if (!q) {
        return []
      }

      return [{
        label: `Întrebați IA despre "${q}"`,
        icon: 'i-ph-magic-wand',
        to: 'javascript:void(0);',
        click() {
          return nuxtApp.$kapa.openModal(q)
        }
      }]
    }
  }, {
    key: 'modules-search',
    label: 'Module',
    search: async (q) => {
      if (!q) {
        return []
      }

      const { modules, fetchList } = useModules()
      if (!modules.value.length) {
        await fetchList()
      }

      return modules.value
        .filter(module => ['name', 'npm', 'repo'].map(field => module[field]).filter(Boolean).some(value => value.search(searchTextRegExp(q)) !== -1))
        .map(module => ({
          id: `module-${module.name}`,
          label: module.npm,
          suffix: module.description,
          avatar: {
            src: moduleImage(module.icon),
            ui: {
              rounded: 'rounded-md'
            }
          },
          to: `/modules/${module.name}`
        }))
    }
  }, {
    key: 'hosting-search',
    label: 'Găzduire',
    search: async (q) => {
      if (!q) {
        return []
      }

      const { providers, fetchList } = useHostingProviders()
      if (!providers.value.length) {
        await fetchList()
      }

      return providers.value
        .filter(hosting => ['title'].map(field => hosting[field]).filter(Boolean).some(value => value.search(searchTextRegExp(q)) !== -1))
        .map(hosting => ({
          id: `hosting-${hosting._path}`,
          label: hosting.title,
          suffix: hosting.description,
          icon: hosting.logoIcon,
          avatar: hosting.logoSrc
            ? {
                src: hosting.logoSrc
              }
            : undefined,
          to: hosting._path
        }))
    }
  }, {
    key: 'articles-search',
    label: 'Articole',
    search: async (q) => {
      if (!q) {
        return []
      }

      const { articles, fetchList } = useBlog()
      if (!articles.value.length) {
        await fetchList()
      }

      return articles.value
        .filter(article => article.title.search(searchTextRegExp(q)) !== -1)
        .map(article => ({
          id: `article-${article._path}`,
          label: article.title,
          suffix: article.description,
          icon: 'i-ph-newspaper',
          to: article._path
        }))
    }
  }]

  return {
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = createSharedComposable(_useNavigation)
