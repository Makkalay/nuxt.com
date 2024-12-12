export default defineNuxtPlugin(() => {
  const toast = useToast()

  useNuxtApp().hook('app:mounted', () => {
    const { email, confirmation } = useRoute().query
    if (email && confirmation) {
      $fetch('https://api.nuxt.com/newsletter/confirm', {
        method: 'POST',
        body: { email, confirmation }
      }).then(() => {
        toast.add({ title: 'Abonamenarea a reușit', description: 'Ați fost abonat cu succes la Newsletterele Nuxt.', color: 'green' })
      }).catch((err) => {
        toast.add({ title: 'Abonamenarea a eșuat', description: err.data?.message || '', color: 'red' })
      })
    }
  })
})
