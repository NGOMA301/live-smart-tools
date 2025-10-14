"use client"

import { Heart } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AdBlock } from "@/components/ad-block"
import { useToolStore } from "@/store/use-tool-store"
import type { Tool } from "@/lib/tools-data"
import { toolsData } from "@/lib/tools-data"
import { ToolCard } from "@/components/tool-card"

import BMICalculator from "@/components/tools/bmi-calculator"
import AgeCalculator from "@/components/tools/age-calculator"
import PasswordGenerator from "@/components/tools/password-generator"
import WordCounter from "@/components/tools/word-counter"
import TextCaseConverter from "@/components/tools/text-case-converter"
import LoanCalculator from "@/components/tools/loan-calculator"
import DiscountCalculator from "@/components/tools/discount-calculator"
import TipCalculator from "@/components/tools/tip-calculator"
import PercentageCalculator from "@/components/tools/percentage-calculator"
import FractionCalculator from "@/components/tools/fraction-calculator"
import TemperatureConverter from "@/components/tools/temperature-converter"
import BinaryConverter from "@/components/tools/binary-converter"
import UnitConverter from "@/components/tools/unit-converter"
import TimeZoneConverter from "@/components/tools/timezone-converter"
import CurrencyConverter from "@/components/tools/currency-converter"
import RgbHex from "@/components/tools/rgb-hex"
import UnixTimestamp from "@/components/tools/unix-timestamp"
import BaseConverter from "@/components/tools/base-converter"
import CsvJson from "@/components/tools/csv-json"
import HtmlEncoder from "@/components/tools/html-encoder"
import ImageCompressor from "@/components/tools/image-compressor"
import ImageResizer from "@/components/tools/image-resizer"
import ImageConverter from "@/components/tools/image-converter"
import PdfToImage from "@/components/tools/pdf-to-image"
import CssMinifier from "@/components/tools/css-minifier"
import SqlFormatter from "@/components/tools/sql-formatter"
import Stopwatch from "@/components/tools/stopwatch"
import Timer from "@/components/tools/timer"
import HashGenerator from "@/components/tools/hash-generator"
import Rot13 from "@/components/tools/rot13"
import CaesarCipher from "@/components/tools/caesar-cipher"
import PDFMerger from "@/components/tools/pdf-merger"
import PDFSplitter from "@/components/tools/pdf-splitter"
import QRCodeGenerator from "@/components/tools/qr-code-generator"
import BarcodeGenerator from "@/components/tools/barcode-generator"
import MortgageCalculator from "@/components/tools/mortgage-calculator"
import InvestmentCalculator from "@/components/tools/investment-calculator"
import CompoundInterestCalculator from "@/components/tools/compound-interest-calculator"
import DateCalculator from "@/components/tools/date-calculator"
import BusinessDaysCalculator from "@/components/tools/business-days-calculator"
import WorldClock from "@/components/tools/world-clock"
import JWTDecoder from "@/components/tools/jwt-decoder"
import Base64Encoder from "@/components/tools/base64-encoder"
import URLEncoder from "@/components/tools/url-encoder"
import RegexTester from "@/components/tools/regex-tester"
import MetaTagGenerator from "@/components/tools/meta-tag-generator"
import KeywordDensityChecker from "@/components/tools/keyword-density-checker"
import PomodoroTimer from "@/components/tools/pomodoro-timer"
import LoremIpsum from "@/components/tools/lorem-ipsum"
import RandomNumber from "@/components/tools/random-number"
import ColorPicker from "@/components/tools/color-picker"
import UuidGenerator from "@/components/tools/uuid-generator"
import TextCleaner from "@/components/tools/text-cleaner"
import JsonFormatter from "@/components/tools/json-formatter"
import MarkdownConverter from "@/components/tools/markdown-converter"
import TextDiff from "@/components/tools/text-diff"
import CharacterFrequency from "@/components/tools/character-frequency"
import DuplicateRemover from "@/components/tools/duplicate-remover"
import TextReverser from "@/components/tools/text-reverser"
import MorseCode from "@/components/tools/morse-code"

interface ToolPageClientProps {
  tool: Tool
}

export default function ToolPageClient({ tool }: ToolPageClientProps) {
  const { favorites, toggleFavorite } = useToolStore()
  const isFavorite = favorites.includes(tool.slug)

  const IconComponent = (LucideIcons as any)[tool.icon] || LucideIcons.Wrench
  const relatedTools = toolsData.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3)

  const renderToolComponent = () => {
    switch (tool.slug) {
      // Calculators
      case "bmi-calculator":
        return <BMICalculator />
      case "age-calculator":
        return <AgeCalculator />
      case "loan-calculator":
        return <LoanCalculator />
      case "discount-calculator":
        return <DiscountCalculator />
      case "tip-calculator":
        return <TipCalculator />
      case "percentage-calculator":
        return <PercentageCalculator />
      case "fraction-calculator":
        return <FractionCalculator />
      case "mortgage-calculator":
        return <MortgageCalculator />
      case "investment-calculator":
        return <InvestmentCalculator />
      case "compound-interest-calculator":
        return <CompoundInterestCalculator />

      // Converters
      case "temperature-converter":
        return <TemperatureConverter />
      case "binary-converter":
        return <BinaryConverter />
      case "unit-converter":
        return <UnitConverter />
      case "timezone-converter":
      case "time-zone-converter":
        return <TimeZoneConverter />
      case "currency-converter":
        return <CurrencyConverter />
      case "rgb-to-hex":
      case "rgb-hex-converter":
        return <RgbHex />
      case "unix-timestamp":
        return <UnixTimestamp />
      case "base-converter":
        return <BaseConverter />
      case "csv-to-json":
        return <CsvJson />
      case "html-encoder":
        return <HtmlEncoder />
      case "image-converter":
        return <ImageConverter />
      case "pdf-to-image":
        return <PdfToImage />

      // Generators
      case "password-generator":
        return <PasswordGenerator />
      case "lorem-ipsum":
        return <LoremIpsum />
      case "random-number":
        return <RandomNumber />
      case "color-picker":
        return <ColorPicker />
      case "uuid-generator":
        return <UuidGenerator />
      case "hash-generator":
        return <HashGenerator />
      case "qr-code-generator":
        return <QRCodeGenerator />
      case "barcode-generator":
        return <BarcodeGenerator />

      // Text Tools
      case "word-counter":
        return <WordCounter />
      case "text-case-converter":
        return <TextCaseConverter />
      case "text-cleaner":
        return <TextCleaner />
      case "json-formatter":
        return <JsonFormatter />
      case "markdown-converter":
        return <MarkdownConverter />
      case "text-diff":
        return <TextDiff />
      case "character-frequency":
        return <CharacterFrequency />
      case "duplicate-remover":
        return <DuplicateRemover />
      case "text-reverser":
        return <TextReverser />
      case "morse-code":
        return <MorseCode />

      // Code Tools
      case "css-minifier":
        return <CssMinifier />
      case "sql-formatter":
        return <SqlFormatter />

      // Utilities
      case "stopwatch":
        return <Stopwatch />
      case "countdown-timer":
      case "timer":
        return <Timer />
      case "pomodoro-timer":
        return <PomodoroTimer />
      case "image-compressor":
        return <ImageCompressor />
      case "image-resizer":
        return <ImageResizer />
      case "pdf-merger":
        return <PDFMerger />
      case "pdf-splitter":
        return <PDFSplitter />

      // Crypto
      case "rot13-cipher":
      case "rot13":
        return <Rot13 />
      case "caesar-cipher":
        return <CaesarCipher />

      // Date & Time Tools
      case "date-calculator":
        return <DateCalculator />
      case "business-days-calculator":
        return <BusinessDaysCalculator />
      case "world-clock":
        return <WorldClock />

      // Developer Tools
      case "jwt-decoder":
        return <JWTDecoder />
      case "base64-encoder":
        return <Base64Encoder />
      case "url-encoder":
        return <URLEncoder />
      case "regex-tester":
        return <RegexTester />

      // SEO & Marketing Tools
      case "meta-tag-generator":
        return <MetaTagGenerator />
      case "keyword-density-checker":
        return <KeywordDensityChecker />

      default:
        return (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">This tool is coming soon!</p>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-8">
        <AdBlock slot={`tool-${tool.slug}-top`} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <IconComponent className="h-8 w-8" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold">{tool.title}</h1>
              <p className="text-muted-foreground">{tool.description}</p>
            </div>
          </div>
          <Button variant={isFavorite ? "default" : "outline"} size="lg" onClick={() => toggleFavorite(tool.slug)}>
            <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Saved" : "Save"}
          </Button>
        </div>

        <div className="mb-12">{renderToolComponent()}</div>

        <div className="mb-12">
          <AdBlock slot={`tool-${tool.slug}-bottom`} />
        </div>

        {relatedTools.length > 0 && (
          <div>
            <h2 className="mb-6 text-2xl font-bold">Related Tools</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((relatedTool, index) => (
                <ToolCard key={relatedTool.slug} tool={relatedTool} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
