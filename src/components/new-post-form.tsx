'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

const inputClass =
  'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'

interface FormData {
  title: string
  content: string
}

export default function NewPostForm() {
  const { data: session } = useSession()
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({ title: '', content: '' })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const responce = await axios.post('/api/posts', formData)

      if (responce.status === 201) {
        router.push(`/blogs/${responce.data.newPost.id}`)
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault()

    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className={inputClass}
          placeholder="Enter the title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <ReactTextareaAutosize
          minRows={5}
          name="content"
          className={inputClass}
          placeholder="Enter the content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <button
        disabled={!session?.user?.email}
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
      >
        Submit
      </button>
    </form>
  )
}
