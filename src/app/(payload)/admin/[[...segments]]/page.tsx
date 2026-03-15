import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from './importMap'

export const generateMetadata = ({ params }: { params: Promise<{ segments: string[] }> }): Promise<Metadata> =>
  generatePageMetadata({ config, params, importMap })

export default function Page({ params }: { params: Promise<{ segments: string[] }> }) {
  return RootPage({ config, params, importMap })
}
