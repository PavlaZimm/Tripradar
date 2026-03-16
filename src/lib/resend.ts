// Resend emaily — POUZE server-side
// Dynamic import zabraňuje pádu při buildu bez RESEND_API_KEY

const FROM_EMAIL = 'TripRadar <noreply@tripradar.cz>'

async function createResend() {
  const { Resend } = await import('resend')
  return new Resend(process.env.RESEND_API_KEY)
}

// Potvrzení nákupu e-booku
export async function sendEbookPurchaseConfirmation(
  to: string,
  data: {
    name?: string
    ebookTitle: string
    downloadUrl: string
  }
) {
  const resend = await createResend()
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Váš e-book: ${data.ebookTitle}`,
    html: `
      <h2>Děkujeme za nákup!</h2>
      <p>${data.name ? `Ahoj ${data.name},` : 'Ahoj,'}</p>
      <p>Váš e-book <strong>${data.ebookTitle}</strong> je připraven ke stažení.</p>
      <p>
        <a href="${data.downloadUrl}" style="
          background: #1C768F; color: white; padding: 12px 24px;
          text-decoration: none; border-radius: 4px; display: inline-block;
        ">
          Stáhnout e-book
        </a>
      </p>
      <p style="color: #9CA3AF; font-size: 12px;">
        Odkaz je platný 24 hodin. Po jeho expiraci se přihlaste do svého účtu.
      </p>
    `,
  })
}

// Potvrzení aktivace Mystery předplatného
export async function sendMysterySubscriptionConfirmation(
  to: string,
  data: { name?: string; nextRevealDate: string }
) {
  const resend = await createResend()
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Vítej v Mystery výletech!',
    html: `
      <h2>Předplatné aktivováno!</h2>
      <p>${data.name ? `Ahoj ${data.name},` : 'Ahoj,'}</p>
      <p>Tvoje Mystery předplatné je aktivní. Připrav se na první překvapení!</p>
      <p>Příští destinace se odhalí: <strong>${data.nextRevealDate}</strong></p>
      <p>
        <a href="https://tripradar.cz/mystery" style="
          background: #1C768F; color: white; padding: 12px 24px;
          text-decoration: none; border-radius: 4px; display: inline-block;
        ">
          Přejít na Mystery výlety
        </a>
      </p>
    `,
  })
}

// Upozornění na neúspěšnou platbu
export async function sendPaymentFailedNotification(
  to: string,
  data: { name?: string; updateUrl: string }
) {
  const resend = await createResend()
  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Problém s platbou — Mystery předplatné',
    html: `
      <h2>Nepodařilo se zaplatit předplatné</h2>
      <p>${data.name ? `Ahoj ${data.name},` : 'Ahoj,'}</p>
      <p>Nepodařilo se stáhnout platbu za tvoje Mystery předplatné.</p>
      <p>Prosím aktualizuj platební údaje co nejdříve, aby nedošlo k přerušení přístupu.</p>
      <p>
        <a href="${data.updateUrl}" style="
          background: #FF6F59; color: white; padding: 12px 24px;
          text-decoration: none; border-radius: 4px; display: inline-block;
        ">
          Aktualizovat platební údaje
        </a>
      </p>
    `,
  })
}
