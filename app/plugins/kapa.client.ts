const kapa = {
  'key': 'kapa',
  'src': 'https://widget.kapa.ai/kapa-widget.bundle.js',
  'data-website-id': 'fb3af718-9db2-440d-9da9-14e6c5fca2aa',
  // 'data-button-hide': true,
  'data-project-name': 'Nuxt',
  'data-project-color': '#00DC82',
  'data-button-text-color': '#000000',
  'data-project-logo': 'https://nuxt.com/assets/design-kit/icon-black.svg',
  'data-modal-image': 'https://nuxt.com/assets/design-kit/icon-green.svg',
  'data-button-padding': '0.5rem',
  'data-button-width': '5.5rem',
  'data-modal-disclaimer': 'Acesta este un LLM personalizat pentru a răspunde la întrebări despre Nuxt. Răspunsurile se bazează pe conținutul documentației, informațiile GitHub și articolele. Vă rugăm să rețineți că răspunsurile sunt generate de AI și este posibil să nu fie exacte, așa că vă rugăm să folosiți capul.',
  'data-user-analytics-fingerprint-enabled': 'true',
  'crossorigin': false
} as const

interface OnModalOpenArgs {
  mode: 'search' | 'ai'
}

interface OnModalCloseArgs {
  mode: 'search' | 'ai'
}

interface OnAskAIQuerySubmitArgs {
  threadId: string | null
  questionAnswerId: string
  question: string
}

interface OnAskAIExampleQuerySubmitArgs {
  threadId: string | null
  questionAnswerId: string
  question: string
}

interface OnAskAIAnswerCompletedArgs {
  threadId: string
  questionAnswerId: string
  question: string
  answer: string
  conversation: { questionAnswerId: string, question: string, answer: string }[]
}

interface OnAskAIFeedbackSubmitArgs {
  reaction: string
  comment: {
    issue: string
    irrelevant: boolean
    incorrect: boolean
    unaddressed: boolean
  }
  threadId: string
  questionAnswerId: string
  question: string
  answer: string
  conversation: { questionAnswerId: string, question: string, answer: string }[]
}

interface OnAskAILinkClickArgs {
  href: string
  threadId: string
  questionAnswerId: string
  question: string
  answer: string
}

interface OnAskAISourceClickArgs {
  source: {
    title: string
    subtitle: string
    url: string
  }
  threadId: string
  questionAnswerId: string
  question: string
  answer: string
}

interface OnAskAIAnswerCopyArgs {
  threadId: string
  questionAnswerId: string
  question: string
  answer: string
}

interface OnAskAIGenerationStopArgs {
  threadId: string | null
  question: string
  conversation: { questionAnswerId: string, question: string, answer: string }[]
}

interface OnAskAIConversationResetArgs {
  threadId: string
  conversation: { questionAnswerId: string, question: string, answer: string }[]
}

interface OnModeSwitchArgs {
  mode: 'search' | 'ai'
}

interface OnSearchResultsCompletedArgs {
  query: string
  searchResults: { title: string, subtitle: string, url: string, sourceName: string }[]
}

interface OnSearchResultsShowMoreClickArgs {
  query: string
  searchResults: { title: string, subtitle: string, url: string, sourceName: string }[]
}

interface OnSearchResultClickArgs {
  query: string
  searchResult: { title: string, subtitle: string, url: string, sourceName: string }
  rank: number
}

interface Kapa {
  (event: 'onModalOpen', handler: (args: OnModalOpenArgs) => void): void
  (event: 'onModalClose', handler: (args: OnModalCloseArgs) => void): void
  (event: 'onAskAIQuerySubmit', handler: (args: OnAskAIQuerySubmitArgs) => void): void
  (event: 'onAskAIExampleQuerySubmit', handler: (args: OnAskAIExampleQuerySubmitArgs) => void): void
  (event: 'onAskAIAnswerCompleted', handler: (args: OnAskAIAnswerCompletedArgs) => void): void
  (event: 'onAskAIFeedbackSubmit', handler: (args: OnAskAIFeedbackSubmitArgs) => void): void
  (event: 'onAskAILinkClick', handler: (args: OnAskAILinkClickArgs) => void): void
  (event: 'onAskAISourceClick', handler: (args: OnAskAISourceClickArgs) => void): void
  (event: 'onAskAIAnswerCopy', handler: (args: OnAskAIAnswerCopyArgs) => void): void
  (event: 'onAskAIGenerationStop', handler: (args: OnAskAIGenerationStopArgs) => void): void
  (event: 'onAskAIConversationReset', handler: (args: OnAskAIConversationResetArgs) => void): void
  (event: 'onModeSwitch', handler: (args: OnModeSwitchArgs) => void): void
  (event: 'onSearchResultsCompleted', handler: (args: OnSearchResultsCompletedArgs) => void): void
  (event: 'onSearchResultsShowMoreClick', handler: (args: OnSearchResultsShowMoreClickArgs) => void): void
  (event: 'onSearchResultClick', handler: (args: OnSearchResultClickArgs) => void): void
}

declare global {
  interface Window {
    Kapa: Kapa
  }
}

export default defineNuxtPlugin(() => {
  const script = useScript<{ Kapa: Kapa }>(kapa, {
    trigger: 'manual',
    use() {
      return { Kapa: window.Kapa }
    }
  })

  return {
    provide: {
      kapa: {
        async openModal(q) {
          await script.load()
          const button = await waitUntilSelector<HTMLButtonElement>('#kapa-widget-container button')
          button?.click()
          if (q) {
            const input = await waitUntilSelector<HTMLInputElement>('#kapa-widget-portal .mantine-Textarea-input')
            if (input) {
              input.value = q
            }
            // await new Promise(resolve => setTimeout(resolve, 50))
            // input.dispatchEvent(new Event('input', { bubbles: true }))
            // document.querySelector('#kapa-widget-portal button.mantine-ActionIcon-root')?.click()
          }
        }
      }
    }
  }
})

async function waitUntilSelector<T extends HTMLElement = HTMLElement>(selector: string) {
  let i = 0

  do {
    const el = document.querySelector(selector)
    if (el) {
      return el as T
    }
    await new Promise(resolve => setTimeout(resolve, 10))
    i++
  } while (i < 200)
  console.log('nu am găsit selectorul', selector)
}
