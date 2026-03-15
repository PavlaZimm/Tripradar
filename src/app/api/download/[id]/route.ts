import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    // 1. Ověř přihlášení
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Přihlášení vyžadováno.' }, { status: 401 })
    }

    // 2. Ověř, že user opravdu zaplatil (tabulka purchases)
    const admin = createSupabaseAdminClient()
    const { data: purchase, error: purchaseError } = await admin
      .from('purchases')
      .select('id, file_path, slug')
      .eq('user_id', user.id)
      .eq('product_id', id)
      .single()

    if (purchaseError || !purchase) {
      return NextResponse.json({ error: 'Nemáš přístup k tomuto souboru.' }, { status: 403 })
    }

    // 3. Vygeneruj signed URL platnou 60 sekund
    const { data: signedUrlData, error: urlError } = await admin.storage
      .from('ebooks')
      .createSignedUrl(purchase.file_path, 60, {
        download: `tripradar-${purchase.slug}.pdf`,
      })

    if (urlError || !signedUrlData?.signedUrl) {
      console.error('Signed URL error:', urlError)
      return NextResponse.json({ error: 'Nepodařilo se vygenerovat odkaz.' }, { status: 500 })
    }

    // 4. Přesměruj na signed URL
    return NextResponse.redirect(signedUrlData.signedUrl, { status: 303 })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Chyba serveru.' }, { status: 500 })
  }
}
