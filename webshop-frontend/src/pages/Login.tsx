import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/components/Authorization/LoginForm"
import RegisterForm from "@/components/Authorization/RegisterForm"

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState("login")
   return (
        <section className="h-screen w-screen flex justify-center items-center">
         <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Üdvözlünk!</CardTitle>
        <CardDescription>Jelentkezz be, vagy hozz létre egy új fiókot</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Bejelentkezés</TabsTrigger>
            <TabsTrigger value="register">Regisztráció</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
        </section>
    )
}
