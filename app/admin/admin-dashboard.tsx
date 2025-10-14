"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, Key, Hand as Ad, Shield, LogOut } from "lucide-react"
import {
  getApiKeys,
  addApiKey,
  updateApiKey,
  deleteApiKey,
  getAds,
  addAd,
  updateAd,
  deleteAd,
  getAdBlockSettings,
  updateAdBlockSettings,
  type ApiKeyData,
  type AdData,
  type AdBlockSettings,
} from "@/lib/admin-actions"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const [apiKeys, setApiKeys] = useState<ApiKeyData[]>([])
  const [ads, setAds] = useState<AdData[]>([])
  const [adBlockSettings, setAdBlockSettings] = useState<AdBlockSettings>({
    enabled: true,
    message: "",
  })
  const [loading, setLoading] = useState(true)

  // New API Key form
  const [newApiKey, setNewApiKey] = useState({
    key: "",
    provider: "exchangerate",
    monthlyLimit: 100,
  })

  // New Ad form
  const [newAd, setNewAd] = useState({
    slot: "",
    code: "",
    position: "top" as "top" | "bottom" | "sidebar" | "inline",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [keysData, adsData, adBlockData] = await Promise.all([getApiKeys(), getAds(), getAdBlockSettings()])
      setApiKeys(keysData)
      setAds(adsData)
      setAdBlockSettings(adBlockData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddApiKey = async () => {
    if (!newApiKey.key) return
    try {
      await addApiKey({
        ...newApiKey,
        requestCount: 0,
        lastResetDate: new Date().toISOString(),
        isActive: true,
      })
      setNewApiKey({ key: "", provider: "exchangerate", monthlyLimit: 100 })
      await loadData()
    } catch (error) {
      console.error("Error adding API key:", error)
    }
  }

  const handleDeleteApiKey = async (id: string) => {
    if (!confirm("Are you sure you want to delete this API key?")) return
    try {
      await deleteApiKey(id)
      await loadData()
    } catch (error) {
      console.error("Error deleting API key:", error)
    }
  }

  const handleToggleApiKey = async (id: string, isActive: boolean) => {
    try {
      await updateApiKey(id, { isActive })
      await loadData()
    } catch (error) {
      console.error("Error updating API key:", error)
    }
  }

  const handleAddAd = async () => {
    if (!newAd.slot || !newAd.code) return
    try {
      await addAd({
        ...newAd,
        isActive: true,
      })
      setNewAd({ slot: "", code: "", position: "top" })
      await loadData()
    } catch (error) {
      console.error("Error adding ad:", error)
    }
  }

  const handleDeleteAd = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return
    try {
      await deleteAd(id)
      await loadData()
    } catch (error) {
      console.error("Error deleting ad:", error)
    }
  }

  const handleToggleAd = async (id: string, isActive: boolean) => {
    try {
      await updateAd(id, { isActive })
      await loadData()
    } catch (error) {
      console.error("Error updating ad:", error)
    }
  }

  const handleUpdateAdBlockSettings = async () => {
    try {
      await updateAdBlockSettings(adBlockSettings)
      alert("Ad block settings updated successfully!")
    } catch (error) {
      console.error("Error updating ad block settings:", error)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-6">
        <TabsList>
          <TabsTrigger value="api-keys">
            <Key className="mr-2 h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="ads">
            <Ad className="mr-2 h-4 w-4" />
            Ads
          </TabsTrigger>
          <TabsTrigger value="adblock">
            <Shield className="mr-2 h-4 w-4" />
            Ad Blocker
          </TabsTrigger>
        </TabsList>

        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New API Key</CardTitle>
              <CardDescription>Add API keys for currency conversion and other services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Select
                    value={newApiKey.provider}
                    onValueChange={(value) => setNewApiKey({ ...newApiKey, provider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exchangerate">ExchangeRate API</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input
                    value={newApiKey.key}
                    onChange={(e) => setNewApiKey({ ...newApiKey, key: e.target.value })}
                    placeholder="Enter API key"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Monthly Limit</Label>
                  <Input
                    type="number"
                    value={newApiKey.monthlyLimit}
                    onChange={(e) => setNewApiKey({ ...newApiKey, monthlyLimit: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <Button onClick={handleAddApiKey}>
                <Plus className="mr-2 h-4 w-4" />
                Add API Key
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Keys ({apiKeys.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{key.provider}</p>
                      <p className="text-sm text-muted-foreground">
                        {key.key.substring(0, 10)}...{key.key.substring(key.key.length - 4)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Usage: {key.requestCount} / {key.monthlyLimit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={key.isActive}
                        onCheckedChange={(checked) => handleToggleApiKey(key._id!, checked)}
                      />
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteApiKey(key._id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ads Tab */}
        <TabsContent value="ads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Ad</CardTitle>
              <CardDescription>Add Google AdSense or custom ad code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Slot Name</Label>
                  <Input
                    value={newAd.slot}
                    onChange={(e) => setNewAd({ ...newAd, slot: e.target.value })}
                    placeholder="e.g., home-top, tool-sidebar"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select
                    value={newAd.position}
                    onValueChange={(value: any) => setNewAd({ ...newAd, position: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                      <SelectItem value="inline">Inline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ad Code (Google AdSense or HTML)</Label>
                <Textarea
                  value={newAd.code}
                  onChange={(e) => setNewAd({ ...newAd, code: e.target.value })}
                  placeholder="Paste your ad code here"
                  className="min-h-[150px] font-mono text-sm"
                />
              </div>
              <Button onClick={handleAddAd}>
                <Plus className="mr-2 h-4 w-4" />
                Add Ad
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Ads ({ads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ads.map((ad) => (
                  <div key={ad._id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{ad.slot}</p>
                      <p className="text-sm text-muted-foreground">Position: {ad.position}</p>
                      <p className="text-xs text-muted-foreground mt-2 font-mono">{ad.code.substring(0, 100)}...</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={ad.isActive} onCheckedChange={(checked) => handleToggleAd(ad._id!, checked)} />
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteAd(ad._id!)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ad Blocker Tab */}
        <TabsContent value="adblock" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ad Blocker Detection</CardTitle>
              <CardDescription>Configure ad blocker detection and messaging</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Ad Blocker Detection</Label>
                  <p className="text-sm text-muted-foreground">Block users with ad blockers from using the site</p>
                </div>
                <Switch
                  checked={adBlockSettings.enabled}
                  onCheckedChange={(checked) => setAdBlockSettings({ ...adBlockSettings, enabled: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label>Message to Users</Label>
                <Textarea
                  value={adBlockSettings.message}
                  onChange={(e) => setAdBlockSettings({ ...adBlockSettings, message: e.target.value })}
                  placeholder="Enter the message to show users with ad blockers"
                  className="min-h-[150px]"
                />
              </div>
              <Button onClick={handleUpdateAdBlockSettings}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
