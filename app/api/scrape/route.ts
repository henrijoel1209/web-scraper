import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(req: Request) {
  const { url } = await req.json()

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const { stdout, stderr } = await execAsync(`python scraper.py "${url}"`)
    
    if (stderr) {
      console.error('Stderr:', stderr)
      return NextResponse.json({ error: 'An error occurred during scraping' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Scraping completed successfully', output: stdout })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'An error occurred during scraping' }, { status: 500 })
  }
}