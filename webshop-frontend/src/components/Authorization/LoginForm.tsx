import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as yup from 'yup';
import { useAuth } from '@/components/AuthContext';

export default function LoginForm() {
  const schema = yup.object().shape({
    email: yup.string().email("E-mail érvénytelen").required("Kötelező mező"),
    password: yup.string().required("Kötelező mező").min(6, "A jelszónak legalább 6 karakter hosszúnak kell lennie"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await schema.validate({ email, password });
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', 
      });
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const result = await response.json();
      login(result.user);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail cím</Label>
          <Input
            id="email"
            type="email"
            placeholder="pelda@pelda.com"
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
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Bejelentkezés</Button>
      </form>
      {token && <p>Token: {token}</p>}
    </>
  );
}
