import { FC } from 'react'

import Comments from '@/components/comments'
import CommentsForm from '@/components/comments-form'
import prisma from '@/lib/db'

interface BlogDetailPageProps {
  params: {
    blogId: string
  }
}
const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: params.blogId,
    },
    include: {
      author: true,
    },
  })

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <p>Written by: {post?.author?.name}</p>
      <div className="mt-4">{post?.content}</div>

      <Comments postId={params.blogId} />
      <CommentsForm postId={params.blogId} />
    </div>
  )
}

export default BlogDetailPage
