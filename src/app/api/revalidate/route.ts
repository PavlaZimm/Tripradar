import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

// Payload CMS webhook → ISR revalidace
// Zabezpečen secret tokenem
export async function POST(req: NextRequest) {
  // Ověření secret tokenu
  const authHeader = req.headers.get('authorization')
  const expectedToken = `Bearer ${process.env.REVALIDATE_SECRET ?? process.env.PAYLOAD_SECRET}`

  if (authHeader !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { slug, type } = body

    if (!slug || !type) {
      return NextResponse.json({ error: 'Chybí slug nebo type.' }, { status: 400 })
    }

    switch (type) {
      case 'article':
        revalidatePath(`/article/${slug}`)
        revalidatePath('/') // Homepage taky
        break
      case 'ebook':
        revalidatePath(`/ebooks/${slug}`)
        revalidatePath('/ebooks')
        revalidatePath('/')
        break
      case 'destination':
        revalidatePath(`/destination/${slug}`)
        break
      case 'category':
        revalidatePath(`/category/${slug}`)
        break
      default:
        revalidatePath('/')
    }

    return NextResponse.json({ revalidated: true, slug, type })
  } catch (error) {
    console.error('Revalidate error:', error)
    return NextResponse.json({ error: 'Chyba revalidace.' }, { status: 500 })
  }
}
