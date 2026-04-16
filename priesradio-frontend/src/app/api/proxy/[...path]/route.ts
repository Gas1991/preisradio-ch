import { NextRequest, NextResponse } from 'next/server'

const API_BACKEND = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const endpoint = path.join('/')
  const search = request.nextUrl.searchParams.toString()
  const url = `${API_BACKEND}/${endpoint}/${search ? `?${search}` : ''}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json(
      { error: 'Erreur proxy API' },
      { status: 502 }
    )
  }
}
