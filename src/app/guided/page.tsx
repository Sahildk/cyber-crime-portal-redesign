"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type RouteCategory = "financial" | "account" | "harassment" | null;

function GuidedContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [story, setStory] = useState("");
  const [route, setRoute] = useState<RouteCategory>(null);

  useEffect(() => {
    if (catParam === "account") {
      setStory("My Instagram account was taken over and the recovery email was changed.");
      setRoute("account");
    } else if (catParam === "other" || catParam === "harassment") {
      setStory("Someone created a fake profile with my photos and is harassing my contacts.");
      setRoute("harassment");
    }
  }, [catParam]);

  const detectedCategory = useMemo<RouteCategory>(() => {
    const text = story.toLowerCase();
    if (!text.trim()) return null;

    let accountScore = 0;
    let harassmentScore = 0;
    let financialScore = 0;

    // Account takeover signals
    if (text.includes("account")) accountScore += 3;
    if (text.includes("instagram") || text.includes("facebook") || text.includes("whatsapp") || text.includes("gmail") || text.includes("telegram")) accountScore += 4;
    if (text.includes("taken over") || text.includes("takeover") || text.includes("hacked") || text.includes("compromis")) accountScore += 5;
    if (text.includes("recovery email") || text.includes("password") || text.includes("login") || text.includes("locked out") || text.includes("2fa")) accountScore += 4;
    if (text.includes("follower") || text.includes("dms") || text.includes("handle")) accountScore += 2;

    // Harassment / Impersonation signals
    if (text.includes("fake profile") || text.includes("impersonat")) harassmentScore += 5;
    if (text.includes("harass") || text.includes("abuse") || text.includes("abusive") || text.includes("stalk")) harassmentScore += 4;
    if (text.includes("photo") || text.includes("photos") || text.includes("video") || text.includes("nude") || text.includes("defamat")) harassmentScore += 4;
    if (text.includes("threat") || text.includes("blackmail") || text.includes("doxx") || text.includes("assault")) harassmentScore += 4;

    // Financial signals
    if (text.includes("upi") || text.includes("debit") || text.includes("deducted") || text.includes("₹") || text.includes("rupee") || text.includes("lost money") || text.includes("transferred")) financialScore += 5;
    if (text.includes("bank") || text.includes("sbi") || text.includes("phonepe") || text.includes("gpay") || text.includes("paytm") || text.includes("kyc")) financialScore += 4;
    if (text.includes("money") || text.includes("payment") || text.includes("amount") || text.includes("card")) financialScore += 3;

    if (accountScore > financialScore && accountScore >= harassmentScore) return "account";
    if (harassmentScore > financialScore && harassmentScore > accountScore) return "harassment";
    if (financialScore > accountScore && financialScore >= harassmentScore) return "financial";
    if (accountScore > 0) return "account";
    if (harassmentScore > 0) return "harassment";
    if (financialScore > 0) return "financial";

    return "account";
  }, [story]);

  function handleGuide(e: FormEvent) {
    e.preventDefault();
    if (!detectedCategory) return;
    setRoute(detectedCategory);
  }

  const sampleStories = [
    {
      icon: "💸",
      label: "Unauthorized UPI / Payment debit",
      text: "Someone called claiming to be from SBI KYC and ₹24,000 was debited on PhonePe after I shared an OTP."
    },
    {
      icon: "🔐",
      label: "Account takeover / Compromised login",
      text: "My Instagram account was taken over, the recovery email was changed, and scam DMs are being sent to my followers."
    },
    {
      icon: "🛡️",
      label: "Online harassment / Impersonation profile",
      text: "Someone created a fake profile with my photos and is sending abusive messages to my contacts."
    }
  ];

  return (
    <main className="guidedApp">
      <div className="guidedNotice">
        INDEPENDENT HACKATHON PROTOTYPE · CITIZEN ENTRY POINT REDESIGN CONCEPT · NOT AN OFFICIAL GOVERNMENT WEBSITE
      </div>

      <header>
        <Link href="/" className="guidedBrand">
          <span>✦</span>SafeNet <i>India</i>
        </Link>
        <Link href="/" className="guidedBack">
          ← Back to home
        </Link>
      </header>

      <AnimatePresence mode="wait">
        {!route ? (
          <motion.section
            key="input-form"
            className="guidedCard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <p className="guidedKicker">A SIMPLER WAY TO REPORT CYBERCRIME</p>
            <h1>What happened to you?</h1>
            <p className="guidedSub">
              You don’t need to know which cybercrime category applies. Tell us what happened and we’ll guide you to the right reporting path.
            </p>

            <form onSubmit={handleGuide}>
              <label htmlFor="guided-story">Tell us what happened in your own words</label>
              <textarea
                id="guided-story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Example: Someone called claiming to be from SBI KYC and ₹24,000 was debited after I shared an OTP."
                rows={5}
              />

              <div className="guidedChips">
                <span className="chipsLabel">Or try a sample description:</span>
                <div className="chipsGroup">
                  {sampleStories.map((s) => (
                    <motion.button
                      key={s.label}
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setStory(s.text);
                      }}
                    >
                      {s.icon} {s.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                className="guidedPrimary"
                type="submit"
                disabled={story.trim().length < 10}
                whileHover={story.trim().length >= 10 ? { scale: 1.01 } : {}}
                whileTap={story.trim().length >= 10 ? { scale: 0.99 } : {}}
              >
                Continue <span>→</span>
              </motion.button>
            </form>
          </motion.section>
        ) : route === "financial" ? (
          <motion.section
            key="financial-result"
            className="guidedCard routed financialRoute"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <p className="guidedKicker">SAFE NET ROUTING PREVIEW</p>
            <div className="routeHeader">
              <div className="routeMark">💸</div>
              <div>
                <h1>This looks like a financial / payment fraud issue.</h1>
                <p className="routeSub">
                  SafeNet identified bank/UPI loss. We will guide you through transaction freezing and a structured report.
                </p>
              </div>
            </div>

            <div className="urgentCardMini">
              <strong>Lost money? Call 1930 immediately.</strong>
              <p>Contact your bank or payment app to freeze the transaction and preserve receipts/SMS.</p>
            </div>

            <div className="routeBreakdown">
              <b>Detected details from your story:</b>
              <div className="badgeList">
                <span>✓ Bank / service impersonation</span>
                <span>✓ OTP / credential sharing</span>
                <span>✓ Unauthorized debit / payment</span>
              </div>
            </div>

            <div className="routeActions">
              <Link
                className="guidedPrimary"
                href={`/report?type=financial&story=${encodeURIComponent(story)}`}
              >
                Start Payment Fraud Report <span>→</span>
              </Link>
              <button
                type="button"
                className="guidedSecondary"
                onClick={() => {
                  setRoute(null);
                  setStory("");
                }}
              >
                Try another description
              </button>
            </div>
          </motion.section>
        ) : route === "account" ? (
          <motion.section
            key="account-result"
            className="guidedCard routed"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <p className="guidedKicker">SAFE NET ROUTING PREVIEW</p>
            <div className="routeHeader">
              <div className="routeMark">🔐</div>
              <div>
                <h1>This looks like an account-compromise issue.</h1>
                <p className="routeSub">
                  We will guide you through collecting altered login details, security alerts, and preparing an official takeover report.
                </p>
              </div>
            </div>

            <div className="routeList">
              <b>Information we will help you prepare:</b>
              <span>○ Affected account/platform handle and registered email</span>
              <span>○ Exact time access was lost or password was changed</span>
              <span>○ Altered recovery email/phone and attacker demands</span>
              <span>○ Preserved security alert emails and login error screenshots</span>
            </div>

            <div className="routeActions">
              <Link
                className="guidedPrimary"
                href={`/report?type=account&story=${encodeURIComponent(story)}`}
              >
                Start Account Takeover Report <span>→</span>
              </Link>
              <button
                type="button"
                className="guidedSecondary"
                onClick={() => {
                  setRoute(null);
                  setStory("");
                }}
              >
                Try another description
              </button>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="harassment-result"
            className="guidedCard routed"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <p className="guidedKicker">SAFE NET ROUTING PREVIEW</p>
            <div className="routeHeader">
              <div className="routeMark">🛡️</div>
              <div>
                <h1>This looks like an online harassment / impersonation issue.</h1>
                <p className="routeSub">
                  SafeNet structures the necessary evidence, URLs, and uncropped screenshots for swift platform takedown and cyber cell filing.
                </p>
              </div>
            </div>

            <div className="routeList">
              <b>Information we will help you prepare:</b>
              <span>○ Specific violation (fake profile, abusive DMs, defamation, photo misuse)</span>
              <span>○ The platform, offending profile URL, or handle</span>
              <span>○ Timestamped uncropped screenshots and proof of identity</span>
            </div>

            <div className="routeActions">
              <Link
                className="guidedPrimary"
                href={`/report?type=harassment&story=${encodeURIComponent(story)}`}
              >
                Start Harassment & Safety Report <span>→</span>
              </Link>
              <button
                type="button"
                className="guidedSecondary"
                onClick={() => {
                  setRoute(null);
                  setStory("");
                }}
              >
                Try another description
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <footer>
        SafeNet India · Redesigned citizen entry point for cybercrime reporting · All data is synthetic and kept local.
      </footer>
    </main>
  );
}

export default function GuidedPage() {
  return (
    <Suspense fallback={<div className="guidedApp"><div className="guidedCard">Loading SafeNet...</div></div>}>
      <GuidedContent />
    </Suspense>
  );
}
