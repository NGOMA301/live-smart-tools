"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Shield } from "lucide-react";

interface AdBlockDetectorProps {
  enabled: boolean;
  message: string;
}

export function AdBlockDetector({ enabled, message }: AdBlockDetectorProps) {
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setChecking(false);
      return;
    }

    const detectAdBlock = async () => {
      let isBlocked = false;

      try {
        // Method 1: Test with bait element
        const bait = document.createElement("div");
        bait.className =
          "ad ads adsbox doubleclick ad-placement ad-placeholder adbadge BannerAd AdHeader";
        bait.style.cssText =
          "position:absolute;top:-1px;left:-1px;width:1px;height:1px;";
        document.body.appendChild(bait);

        await new Promise((resolve) => setTimeout(resolve, 100));

        isBlocked =
          bait.offsetHeight === 0 ||
          bait.offsetWidth === 0 ||
          window.getComputedStyle(bait).display === "none" ||
          window.getComputedStyle(bait).visibility === "hidden";

        document.body.removeChild(bait);

        // Method 2: Test Google AdSense script loading
        if (!isBlocked) {
          try {
            await fetch(
              "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
              {
                method: "HEAD",
                mode: "no-cors",
              }
            );
          } catch {
            isBlocked = true;
          }
        }

        // Method 3: Check for common ad blocker properties
        if (!isBlocked) {
          // @ts-ignore - checking for ad blocker properties
          if (window.canRunAds === false || window.isAdBlockActive === true) {
            isBlocked = true;
          }
        }

        setAdBlockDetected(isBlocked);
      } catch (error) {
        // If detection fails, assume no ad blocker
        setAdBlockDetected(false);
      } finally {
        setChecking(false);
      }
    };

    detectAdBlock();
  }, [enabled]);

  useEffect(() => {
    if (!adBlockDetected) return;

    const modal = document.getElementById("adblock-modal");
    const observer = new MutationObserver(() => {
      const exists = document.getElementById("adblock-modal");
      if (!exists) {
        // Re-create modal instantly
        document.body.innerHTML = "";
        document.write(
          "<h1 style='text-align:center;margin-top:30vh'>Access Blocked 🚫</h1>"
        );
        document.close();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [adBlockDetected]);

  useEffect(() => {
    if (adBlockDetected) {
      document.body.style.overflow = "hidden";
      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }
  }, [adBlockDetected]);

  const handleReload = () => {
    window.location.reload();
  };

  if (checking) {
    return null;
  }

  if (!enabled || !adBlockDetected) {
    return null;
  }

  return (
    <div
      id="adblock-modal"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
    >
      <Card className="w-full max-w-md sm:max-w-lg p-5 sm:p-6 border shadow-xl rounded-xl">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <Shield className="h-8 w-8 text-destructive" />
          </div>

          {/* Title & Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Ad Blocker Detected</h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We noticed you're using an ad blocker. Ads help keep SmartTools
              free for everyone. Please disable your ad blocker and reload the
              page to continue using our tools.
            </p>
          </div>

          {/* Why We Show Ads */}
          <div className="w-full space-y-2 rounded-lg bg-muted/50 p-4 text-sm text-left border">
            <p className="font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Why we show ads:
            </p>
            <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
              <li>Keep all tools 100% free forever</li>
              <li>Cover hosting and infrastructure costs</li>
              <li>Fund development of new tools</li>
              <li>Maintain fast, reliable service</li>
              <li>No registration or payment required</li>
            </ul>
          </div>

          {/* Action */}
          <div className="w-full space-y-3">
            <div className="p-3 rounded-md bg-primary/5 border border-primary/20 text-sm">
              Please disable your ad blocker for SmartTools to continue using
              our free tools.
            </div>
            <Button onClick={handleReload} className="w-full" size="lg">
              <RefreshCw className="mr-2 h-5 w-5" />
              I’ve Disabled Ad Blocker — Reload Page
            </Button>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground">
            Thank you for supporting free tools for everyone! 🙏
          </p>
        </div>
      </Card>
    </div>
  );
}
