import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as yup from 'yup'
import { useFetch } from "@/hooks/useFetch"

export default function RegisterForm() {

  const schema = yup.object().shape({
    username: yup.string().required("Kötelező mező").min(3, "A felhasználónévnek legalább 6 karakter hosszúnak kell lennie"),
    email: yup.string().email("E-mail érvénytelen").required("Kötelező mező"),
    password: yup.string().required("Kötelező mező").min(6, "A jelszónak legalább 6 karakter hosszúnak kell lennie"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "A jelszavaknak egyezniük kell")
  })
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    schema.validate({ username, email, password, confirmPassword }).then(() => {
      console.log(JSON.stringify({ email, password, name: username }))
      fetch("http://localhost:3000/users", { method: "POST", body: JSON.stringify({ email, password, name: username }), headers: { "Content-Type": "application/json" } })
    }).catch((err) => {
      setError(err.message)
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="username">Felhasználónév</Label>
          <Input
            id="username"
            type="text"
            placeholder="pelda.janos"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail cím</Label>
          <Input
            id="email"
            type="email"
            placeholder="pelda@tutor.hu"
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
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Jelszó megerősítése</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
