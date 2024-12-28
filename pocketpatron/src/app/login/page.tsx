import { login, signup, signout } from './actions'
import { createClient } from '../../../utils/supabase/server'

export default async function LoginPage() {

  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  return (
    <>
    <button onClick={signout}>Sign out</button>
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
    </>
  )
}