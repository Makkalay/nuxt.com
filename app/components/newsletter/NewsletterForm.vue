<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Abonați-vă la newsletter-ul nostru'
  },
  description: {
    type: String,
    default: 'Rămâneți la curent cu noile versiuni și funcții, ghiduri și actualizări ale comunității.'
  }
})

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  if (loading.value) {
    return
  }
  loading.value = true

  $fetch('https://api.nuxt.com/newsletter/subscribe', {
    method: 'POST',
    body: { email: email.value }
  }).then(() => {
    toast.add({ title: 'Abonament în așteptare', description: 'Vă rugăm să verificați e-mailul pentru a vă confirma abonamentul.', color: 'green' })
    email.value = ''
  }).catch((err) => {
    const error = JSON.parse(err.data?.message)
    const description = error[0].message || 'Ceva nu a mers bine. Vă rugăm să încercați din nou mai târziu.'
    toast.add({ title: 'Abonamentul a eșuat', description, color: 'red' })
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UFormGroup name="email" :label="label" size="lg" :description="description" :ui="{ label: { base: 'font-semibold' }, container: 'mt-3' }">
      <UInput
        v-model="email"
        type="email"
        placeholder="you@domain.com"
        :ui="{ icon: { trailing: { pointer: '', padding: { lg: 'px-1' } } } }"
        required
        autocomplete="off"
        class="max-w-sm"
      >
        <template #trailing>
          <UButton type="submit" size="xs" color="black" :label="loading ? 'Abonare' : 'Abonați-vă'" :loading="loading" />
        </template>
      </UInput>
    </UFormGroup>
  </form>
</template>
