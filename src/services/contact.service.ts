export type ContactPayload = {
  name: string
  email: string
  message: string
  company?: string
}

export type ContactResult = {
  ok: boolean
  errorMessage?: string
}

function getEndpoint(): string {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined
  if (!endpoint) {
    throw new Error('Missing VITE_FORMSPREE_ENDPOINT environment variable.')
  }
  return endpoint
}

export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  if (payload.company && payload.company.trim().length > 0) {
    return { ok: true }
  }

  const endpoint = getEndpoint()

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      message: payload.message,
    }),
  })

  if (response.ok) return { ok: true }

  let errorMessage = 'No se pudo enviar el mensaje. Intenta nuevamente.'
  try {
    const data = (await response.json()) as { errors?: Array<{ message?: string }> }
    const first = data?.errors?.[0]?.message
    if (first) errorMessage = first
  } catch {

  }

  return { ok: false, errorMessage }
}