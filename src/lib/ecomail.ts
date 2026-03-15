import type { NewsletterTag } from '@/types'

const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY!
const ECOMAIL_LIST_ID = process.env.ECOMAIL_LIST_ID!
const ECOMAIL_BASE_URL = 'https://api2.ecomailapp.cz'

interface EcomailSubscriberData {
  email: string
  name?: string
  tags?: string[]
}

// Přihlásí uživatele k newsletteru
// update_existing: true — bezpečné opakované přihlášení
export async function subscribeToNewsletter(
  email: string,
  tags: NewsletterTag[] = ['free-newsletter', 'website-signup']
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(
      `${ECOMAIL_BASE_URL}/lists/${ECOMAIL_LIST_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          key: ECOMAIL_API_KEY,
        },
        body: JSON.stringify({
          subscriber_data: { email } satisfies EcomailSubscriberData,
          tags,
          trigger_autoresponders: true,
          update_existing: true,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Ecomail subscribe error:', error)
      return { success: false, message: 'Nepodařilo se přihlásit k newsletteru.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Ecomail network error:', error)
    return { success: false, message: 'Chyba sítě. Zkuste to prosím znovu.' }
  }
}

// Přidá tagy existujícímu odběrateli (např. po koupi e-booku)
export async function addTagsToSubscriber(
  email: string,
  tags: NewsletterTag[]
): Promise<boolean> {
  try {
    const response = await fetch(
      `${ECOMAIL_BASE_URL}/subscribers/${encodeURIComponent(email)}/tags`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          key: ECOMAIL_API_KEY,
        },
        body: JSON.stringify({ tags }),
      }
    )
    return response.ok
  } catch {
    return false
  }
}
