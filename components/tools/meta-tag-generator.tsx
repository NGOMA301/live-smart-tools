"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [keywords, setKeywords] = useState("")
  const [author, setAuthor] = useState("")
  const [ogTitle, setOgTitle] = useState("")
  const [ogDescription, setOgDescription] = useState("")
  const [ogImage, setOgImage] = useState("")
  const [twitterCard, setTwitterCard] = useState("summary_large_image")
  const [generated, setGenerated] = useState("")

  const generateMetaTags = () => {
    const tags = `<!-- Basic Meta Tags -->
<title>${title || "Your Page Title"}</title>
<meta name="description" content="${description || "Your page description"}">
<meta name="keywords" content="${keywords || "keyword1, keyword2, keyword3"}">
<meta name="author" content="${author || "Your Name"}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="${ogTitle || title || "Your Page Title"}">
<meta property="og:description" content="${ogDescription || description || "Your page description"}">
<meta property="og:image" content="${ogImage || "https://example.com/image.jpg"}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com">

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="${twitterCard}">
<meta name="twitter:title" content="${ogTitle || title || "Your Page Title"}">
<meta name="twitter:description" content="${ogDescription || description || "Your page description"}">
<meta name="twitter:image" content="${ogImage || "https://example.com/image.jpg"}">`

    setGenerated(tags)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
  }

  const handleReset = () => {
    setTitle("")
    setDescription("")
    setKeywords("")
    setAuthor("")
    setOgTitle("")
    setOgDescription("")
    setOgImage("")
    setGenerated("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meta Tag Generator</CardTitle>
        <CardDescription>Generate SEO-friendly meta tags for your website</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              placeholder="My Awesome Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" placeholder="John Doe" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="A brief description of your page..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords (comma separated)</Label>
          <Input
            id="keywords"
            placeholder="web development, SEO, marketing"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="mb-4 font-semibold">Open Graph & Social Media</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ogTitle">OG Title (optional)</Label>
              <Input
                id="ogTitle"
                placeholder="Leave empty to use page title"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input
                id="ogImage"
                placeholder="https://example.com/image.jpg"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Label htmlFor="ogDescription">OG Description (optional)</Label>
            <Textarea
              id="ogDescription"
              placeholder="Leave empty to use page description"
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateMetaTags} className="flex-1">
            Generate Meta Tags
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {generated && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Generated Meta Tags</Label>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                Copy
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-muted p-4">
              <pre className="whitespace-pre-wrap text-sm">{generated}</pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
