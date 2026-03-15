import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from './importMap'

type Args = {
  params: Promise<{ segments: string[] }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const resolvedParams = await params
  return generatePageMetadata({ config, params: resolvedParams, importMap })
}

export default async function Page({ params }: Args) {
  const resolvedParams = await params
  return RootPage({ config, params: resolvedParams, importMap })
}
