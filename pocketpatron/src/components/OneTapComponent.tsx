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
      try {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
        })
    
        if (error) {
          console.error('Supabase login error:', error.message)
          // Show a user-friendly error message or fallback
        } else {
          router.push('/dashboard')
        }
      } catch (err) {
        console.error('FedCM/GSI error:', err)
        // Optional: Retry with redirect fallback or show sign-in button
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
      <div className="g_id_signin"
     data-type="standard"
     data-shape="pill"
     data-theme="filled_black"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
    </div>
    </>
  )
}

export default OneTapComponent
