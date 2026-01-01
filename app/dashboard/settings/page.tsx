"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Bell, Shield, Palette, Upload } from "lucide-react"

export default function SettingsPage() {
  // PROFILE
  const [name, setName] = useState("Nexus Partner")
  const [email] = useState("partner@nexus.dev")
  const [company, setCompany] = useState("Nexus Business")
  const [savingProfile, setSavingProfile] = useState(false)

  // PASSWORD
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [updatingPassword, setUpdatingPassword] = useState(false)

  // NOTIFICATIONS
  const [emailNotif, setEmailNotif] = useState(true)
  const [projectNotif, setProjectNotif] = useState(true)
  const [invoiceNotif, setInvoiceNotif] = useState(true)
  const [marketingNotif, setMarketingNotif] = useState(false)

  // APPEARANCE
  const [darkMode, setDarkMode] = useState(true)
  const [compactView, setCompactView] = useState(false)

  // HANDLERS
  const saveProfile = async () => {
    setSavingProfile(true)
    await fetch("/api/user/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, company }),
    })
    setSavingProfile(false)
    alert("Profile updated")
  }

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setUpdatingPassword(true)
    const res = await fetch("/api/user/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    })

    setUpdatingPassword(false)

    if (!res.ok) alert("Wrong current password")
    else {
      alert("Password updated")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
  }

  return (
    <main className="flex-1 p-6 lg:p-10 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PROFILE */}
        <Card className="glass border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <User className="h-4 w-4 mr-2 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                  {name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Upload className="h-3 w-3 mr-2" />
                Upload Photo
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} disabled />
            </div>

            <div className="space-y-2">
              <Label>Company</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <Button className="w-full glow-primary" onClick={saveProfile}>
              {savingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* NOTIFICATIONS */}
          <Card className="glass border-white/5">
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                <Bell className="h-4 w-4 mr-2 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Toggle label="Email Notifications" value={emailNotif} set={setEmailNotif} />
              <Toggle label="Project Updates" value={projectNotif} set={setProjectNotif} />
              <Toggle label="Invoice Reminders" value={invoiceNotif} set={setInvoiceNotif} />
              <Toggle label="Marketing Emails" value={marketingNotif} set={setMarketingNotif} />
            </CardContent>
          </Card>

          {/* SECURITY */}
          <Card className="glass border-white/5">
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                <Shield className="h-4 w-4 mr-2 text-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button className="w-full glow-primary" onClick={updatePassword}>
                {updatingPassword ? "Updating..." : "Update Password"}
              </Button>
            </CardContent>
          </Card>

          {/* APPEARANCE */}
          <Card className="glass border-white/5">
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                <Palette className="h-4 w-4 mr-2 text-primary" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Toggle label="Dark Mode" value={darkMode} set={setDarkMode} />
              <Toggle label="Compact View" value={compactView} set={setCompactView} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

function Toggle({ label, value, set }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-white/5">
      <p className="text-sm font-medium">{label}</p>
      <Switch checked={value} onCheckedChange={set} />
    </div>
  )
}
