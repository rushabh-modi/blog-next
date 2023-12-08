import { getServerAuthSession } from '@/lib/auth'
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getServerAuthSession()

  try {
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Not Authenticated' },
        { status: 401 }
      )
    }

    const { postId, text } = await req.json()

    const newPost = await prisma.comment.create({
      data: {
        postId,
        text,
        authorEmail: session.user.email,
      },
    })

    return NextResponse.json(
      {
        newPost,
      },
      { status: 201 }
    )
  } catch (error) {
    console.log(error)
  }
}
