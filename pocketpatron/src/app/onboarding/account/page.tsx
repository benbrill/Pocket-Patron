'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { createClient } from '../../../../utils/supabase/client'
import { useState } from 'react'
import Image from 'next/image'

const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  profilePic: z
    .any()
    .refine((file) => file?.length === 1, 'Profile picture is required'),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfileForm() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)
    }
  }
  

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true)
    setSuccess(false)

    try {
      const file = data.profilePic[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `avatars/${crypto.randomUUID()}.${fileExt}`
      console.log(filePath)

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file,{
            cacheControl: '3600',
            upsert: false})

      if (uploadError) throw uploadError


      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const user = await supabase.auth.getUser()
      const userId = user.data.user?.id
      if (!userId) throw new Error('User not logged in.')

      // Upsert profile
      const { error: dbError } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          full_name: data.fullName,
          display_name: data.displayName,
          avatar_url: urlData.publicUrl,
        })

      if (dbError) throw dbError

      setSuccess(true)
      reset()
    } catch (err: any) {
      console.error('Error saving profile:', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 font-sans">
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register('fullName')} />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" {...register('displayName')} />
          {errors.displayName && (
            <p className="text-red-500 text-sm">
              {errors.displayName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="profilePic">Profile Picture</Label>
          <Input
            id="profilePic"
            type="file"
            accept="image/*"
            {...register('profilePic')}
            onChange={(e) => {
                handleImageChange(e) // for preview
                // also let react-hook-form handle it
                register('profilePic').onChange(e)
            }}
            />
            {previewUrl && (
                <div className="mt-4">
                    <p className="font-medium">Live Preview:</p>
                    <Image
                    src={previewUrl}
                    alt="Live profile preview"
                    width={100}
                    height={100}
                    />
                </div>
                )}

          {errors.profilePic && (
            // <p className="text-red-500 text-sm">{errors.profilePic.message}</p>
            <p className="text-red-500 text-sm"></p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>

      {success && (
        <p className="text-green-600 font-medium">Profile updated successfully!</p>
      )}
    </div>
  )
}
