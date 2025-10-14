"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Settings, ArrowRight, Shield, Key } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CurrencySettingsClient() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Currency API Settings</h1>
        <p className="text-muted-foreground">Manage your API keys and site settings</p>
      </div>

      <Card className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3">Settings Moved to Admin Panel</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          API key management and all site settings are now centralized in the secure admin dashboard for better control
          and security.
        </p>

        <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto mb-8">
          <Card className="p-4 text-left">
            <Key className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">API Keys</h3>
            <p className="text-sm text-muted-foreground">Manage currency converter API keys</p>
          </Card>

          <Card className="p-4 text-left">
            <Settings className="h-6 w-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Ad Management</h3>
            <p className="text-sm text-muted-foreground">Configure Google AdSense ads</p>
          </Card>
        </div>

        <Link href="/admin/login">
          <Button size="lg" className="gap-2">
            Go to Admin Panel
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <p className="text-xs text-muted-foreground mt-6">You'll need the admin password to access the dashboard</p>
      </Card>

      <Card className="p-6 mt-8 bg-muted/50">
        <h3 className="font-semibold mb-3">What's in the Admin Panel?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Manage API keys for currency conversion with MongoDB storage</li>
          <li>• Configure Google AdSense ads with position control</li>
          <li>• Control ad blocker detection and messaging</li>
          <li>• View usage statistics and monitor API limits</li>
          <li>• Secure password-protected access</li>
        </ul>
      </Card>
    </div>
  )
}
