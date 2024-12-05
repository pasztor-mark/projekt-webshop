import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import * as yup from 'yup'
import { useFetch } from "@/hooks/useFetch"
export default function LoginForm() {

    const schema = yup.object().shape({
        email: yup.string().email("E-mail érvénytelen").required("Kötelező mező"),
        password: yup.string().required("Kötelező mező").min(6, "A jelszónak legalább 6 karakter hosszúnak kell lennie"),
    })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    schema.validate({ email, password }).then((valid) => async () =>{

    }).catch((err) => {
        setError(err.errors.map((e: string) => e).join(", "))
    })
}
   return (
        <>
         <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail cím</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Jelszó</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <p className="text-red-500">{error}</p>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
        </>
    )
}
