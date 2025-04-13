'use client'

import Script from 'next/script'
import { createClient } from '../../utils/supabase/client'
import { CredentialResponse } from 'google-one-tap'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const supabase = createClient()

interface GoogleCredentialResponse extends CredentialResponse {
  credential: string
}

function OneTapComponent() {
  const router = useRouter()

  useEffect(() => {
    // Assign function to global scope so Google can call it
    (window as any).handleSignInWithGoogle = async function (
      response: GoogleCredentialResponse
    ) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      })

      if (error) {
        console.error('Login error:', error.message)
      } else {
        console.log('Logged in:', data)
        router.push('/dashboard') // or your post-login route
      }
    }
  }, [])

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" async />
      <div
        id="g_id_onload"
        data-client_id="82835658552-lchs54lh91ef11caj3lldqud8fdgt4pg.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="icon"
        data-shape="square"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
      ></div>
    </>
  )
}

export default OneTapComponent
