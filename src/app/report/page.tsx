"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type CategoryType = "financial" | "account" | "harassment";

type Details = {
  amount: string;
  incidentAt: string;
  service: string;
  reference: string;
  suspect: string;
  platform: string;
  handle: string;
  recoveryAltered: string;
  harassmentType: string;
  targetUrl: string;
};

type Lang = "en" | "hi";

const categoryMeta = {
  financial: {
    icon: "💸",
    tag: "Financial & Payment Fraud",
    tagHi: "वित्तीय व भुगतान धोखाधड़ी",
    emergencyTitle: "Lost money online?",
    emergencyTitleHi: "ऑनलाइन पैसे खोए हैं?",
    emergencySub: "Call 1930 immediately, then contact your bank to freeze transactions.",
    emergencySubHi: "तुरंत 1930 पर कॉल करें, फिर ट्रांज़ैक्शन फ्रीज़ कराने के लिए बैंक से संपर्क करें।",
    callText: "Call 1930 now",
    callTextHi: "1930 पर कॉल करें",
    tel: "tel:1930",
    triageHeadline: "We will guide you through your payment fraud report",
    triageHeadlineHi: "हम पेमेंट फ्रॉड रिपोर्ट तैयार करने में आपकी मदद करेंगे",
    triageSub: "We'll organize transaction references and details so you can file with your bank and the cyber cell.",
    triageSubHi: "हम ट्रांज़ैक्शन और बैंक विवरण व्यवस्थित करेंगे ताकि आप साइबर सेल व बैंक में रिपोर्ट कर सकें।",
    field1Label: "Amount lost (₹)",
    field1LabelHi: "खोई हुई रकम (₹)",
    field1Hint: "Enter approximate amount in rupees",
    field1HintHi: "रुपयों में अनुमानित रकम दर्ज करें",
    field1Placeholder: "e.g. 24000",
    field2Label: "When did the debit happen?",
    field2LabelHi: "पैसे कब कटे?",
    field3Label: "Bank or payment app",
    field3LabelHi: "बैंक या पेमेंट ऐप",
    field3Placeholder: "e.g. SBI, PhonePe, Google Pay, Paytm",
    field4Label: "Transaction reference / UTR",
    field4LabelHi: "ट्रांज़ैक्शन रेफरेंस / UTR",
    field4Hint: "Found in your banking SMS or UPI app receipt",
    field4HintHi: "बैंकिंग SMS या पेमेंट ऐप की रसीद में उपलब्ध",
    field4Placeholder: "e.g. 402918239012",
    field5Label: "Suspect phone number / UPI ID",
    field5LabelHi: "संदिग्ध फोन नंबर / UPI ID",
    field5Hint: "Leave blank if unknown. Do not contact the suspect.",
    field5HintHi: "पता न हो तो खाली छोड़ें। संदिग्ध से संपर्क न करें।",
    field5Placeholder: "e.g. 9876543210 or scammer@upi",
    ev1: "Debit SMS or payment app receipt",
    ev1Hi: "डेबिट SMS या पेमेंट ऐप की रसीद",
    ev2: "Transaction reference / UTR noted",
    ev2Hi: "ट्रांज़ैक्शन रेफरेंस / UTR नोट किया",
    ev3: "Chat screenshot or call log",
    ev3Hi: "चैट स्क्रीनशॉट या कॉल लॉग",
    next1: "Call 1930 national helpline immediately if not already done.",
    next1Hi: "अगर अभी तक नहीं किया है तो 1930 हेल्पलाइन पर कॉल करें।",
    next2: "Contact your bank's fraud desk to dispute the transaction.",
    next2Hi: "लेनदेन को रोकने के लिए बैंक के फ्रॉड डेस्क से संपर्क करें।",
    next3: "Keep transaction receipts, SMS, and reference numbers safe.",
    next3Hi: "रसीद, SMS और रेफरेंस नंबर सुरक्षित रखें।"
  },
  account: {
    icon: "🔐",
    tag: "Account & Identity Takeover",
    tagHi: "खाता व पहचान हैक रिपोर्ट",
    emergencyTitle: "Account compromised or locked out?",
    emergencyTitleHi: "खाता हैक या लॉक हो गया है?",
    emergencySub: "Do not pay any ransom. Alert your friends not to send money to your compromised account.",
    emergencySubHi: "कोई फिरौती न दें। अपने परिचितों को सचेत करें कि आपके खाते से पैसे न भेजें।",
    callText: "Safety tips",
    callTextHi: "सुरक्षा सुझाव",
    tel: "#guide",
    triageHeadline: "We will guide you through an account takeover report",
    triageHeadlineHi: "हम खाता हैक रिपोर्ट तैयार करने में आपकी मदद करेंगे",
    triageSub: "We'll record altered login details, platform handles, and breach timestamps for official recovery.",
    triageSubHi: "हम बदले गए लॉगिन विवरण और टाइमस्टैम्प रिकॉर्ड करेंगे ताकि आप आधिकारिक रिकवरी कर सकें।",
    field1Label: "Affected platform / service",
    field1LabelHi: "प्रभावित प्लेटफॉर्म / सेवा",
    field1Hint: "e.g. Instagram, WhatsApp, Gmail, Facebook, X",
    field1HintHi: "उदा. इंस्टाग्राम, व्हाट्सएप, जीमेल, फेसबुक",
    field1Placeholder: "e.g. Instagram / WhatsApp",
    field2Label: "When did you lose access?",
    field2LabelHi: "पहुंच कब बंद हुई?",
    field3Label: "Your account handle / username / email",
    field3LabelHi: "आपका यूजरनेम / हैंडल / ईमेल",
    field3Placeholder: "e.g. @username or myemail@gmail.com",
    field4Label: "Attacker's altered email / phone (if shown)",
    field4LabelHi: "हमलावर द्वारा बदला गया ईमेल / फोन (यदि दिखा हो)",
    field4Hint: "Found in security alert email (e.g. 'Email changed to x***@mail.com')",
    field4HintHi: "सुरक्षा अलर्ट ईमेल में दिखा नया पता",
    field4Placeholder: "e.g. attacker***@mail.ru",
    field5Label: "Attacker demands / message (if any)",
    field5LabelHi: "हमलावर की मांग / संदेश (यदि कोई हो)",
    field5Hint: "Did they demand ransom or message your contacts?",
    field5HintHi: "क्या उन्होंने फिरौती मांगी या संपर्कों को मैसेज किया?",
    field5Placeholder: "e.g. Demanding ₹5,000 to restore access",
    ev1: "Security alert email ('Password/Email changed')",
    ev1Hi: "सुरक्षा अलर्ट ईमेल ('पासवर्ड/ईमेल बदला गया')",
    ev2: "Screenshot of login error or altered profile",
    ev2Hi: "लॉगिन एरर या बदले हुए प्रोफाइल का स्क्रीनशॉट",
    ev3: "Messages from contacts who received scam DMs",
    ev3Hi: "मित्रों को आए फर्जी संदेशों के स्क्रीनशॉट",
    next1: "Use the official platform account recovery page with your registered device.",
    next1Hi: "अपने पंजीकृत डिवाइस से आधिकारिक प्लेटफॉर्म रिकवरी पेज का उपयोग करें।",
    next2: "Alert your contacts via another channel not to click links or send money.",
    next2Hi: "दूसरे माध्यम से संपर्कों को बताएं कि आपके खाते से पैसे न भेजें।",
    next3: "Check connected email accounts and revoke unauthorized third-party apps.",
    next3Hi: "जुड़े हुए ईमेल खाते की सुरक्षा जांचें और अज्ञात ऐप्स हटाएं।"
  },
  harassment: {
    icon: "🛡️",
    tag: "Online Harassment & Impersonation",
    tagHi: "ऑनलाइन उत्पीड़न व फर्जी प्रोफाइल रिपोर्ट",
    emergencyTitle: "Facing cyber harassment or fake profiles?",
    emergencyTitleHi: "ऑनलाइन उत्पीड़न या फर्जी प्रोफाइल की समस्या?",
    emergencySub: "Do not delete abusive messages. Take full screenshots with date & time visible as legal evidence.",
    emergencySubHi: "आपत्तिजनक संदेश डिलीट न करें। कानूनी साक्ष्य हेतु समय व दिनांक सहित स्क्रीनशॉट लें।",
    callText: "National helpline: 1930",
    callTextHi: "राष्ट्रीय हेल्पलाइन: 1930",
    tel: "tel:1930",
    triageHeadline: "We will guide you through an impersonation / harassment report",
    triageHeadlineHi: "हम उत्पीड़न व फर्जी प्रोफाइल रिपोर्ट तैयार करने में मदद करेंगे",
    triageSub: "We'll structure the evidence, profile links, and incident timeline for grievance officer & cyber cell filing.",
    triageSubHi: "हम प्रोफाइल लिंक और घटनाक्रम को शिकायत अधिकारी व साइबर सेल के लिए तैयार करेंगे।",
    field1Label: "Type of incident",
    field1LabelHi: "घटना का प्रकार",
    field1Hint: "e.g. Fake profile with my photos, Abusive DMs, Defamation, Doxxing",
    field1HintHi: "उदा. मेरी तस्वीरों से फर्जी प्रोफाइल, अभद्र संदेश, मानहानि",
    field1Placeholder: "e.g. Fake profile using my photos",
    field2Label: "When did this start?",
    field2LabelHi: "यह कब शुरू हुआ?",
    field3Label: "Platform / website where incident occurs",
    field3LabelHi: "प्लेटफॉर्म या वेबसाइट जहाँ घटना हुई",
    field3Placeholder: "e.g. Instagram, WhatsApp, Telegram",
    field4Label: "Offender's profile URL or handle",
    field4LabelHi: "दोषी का प्रोफाइल लिंक (URL) या हैंडल",
    field4Hint: "Copy the full link (e.g. https://instagram.com/fake_account)",
    field4HintHi: "पूरा वेब लिंक कॉपी करें",
    field4Placeholder: "e.g. https://instagram.com/fake_profile",
    field5Label: "Suspected person (if known / leave empty if anonymous)",
    field5LabelHi: "संदिग्ध व्यक्ति (यदि ज्ञात हो)",
    field5Hint: "Only if you know who it is. Never confront them online.",
    field5HintHi: "केवल यदि आप जानते हों। ऑनलाइन विवाद न करें।",
    field5Placeholder: "e.g. Unknown anonymous user",
    ev1: "Uncropped screenshots of abusive content with timestamp",
    ev1Hi: "समय व दिनांक सहित पूरे स्क्रीनशॉट",
    ev2: "Exact profile URL copied and preserved",
    ev2Hi: "प्रोफाइल का पूरा URL लिंक सुरक्षित किया",
    ev3: "Original photos/ID proving identity theft",
    ev3Hi: "पहचान साबित करने वाली मूल तस्वीरें",
    next1: "File an official takedown request with the platform's Grievance Officer in India.",
    next1Hi: "भारत में प्लेटफॉर्म के शिकायत अधिकारी को हटाने का अनुरोध भेजें।",
    next2: "Preserve all uncropped evidence and do not engage in heated arguments.",
    next2Hi: "सभी साक्ष्य बिना क्रॉप किए सुरक्षित रखें और विवाद में न पड़ें।",
    next3: "Submit this draft along with screenshot timestamps to your local cyber police station.",
    next3Hi: "इस शिकायत ड्राफ्ट को साक्ष्यों सहित स्थानीय साइबर पुलिस में दर्ज कराएं।"
  }
};

const copy = {
  en: {
    name: "SafeNet India",
    prototype: "Hackathon prototype · Citizen entry redesign concept · Nothing is sent to any authority.",
    begin: "Tell us what happened",
    sub: "Use your own words. We will only ask for the details needed to prepare a report.",
    placeholder: "Describe what happened in everyday plain language...",
    continue: "Continue",
    quick: "Try a sample prompt",
    guide: "Why this helps",
    guideText: "A structured account and preserved timestamps help authorities and grievance officers act quickly.",
    prepare: "Collect essential details",
    evidence: "Preserve evidence locally",
    evidenceSub: "You do not need to upload anything here. Save these items safely on your phone/computer.",
    review: "Review your complaint draft",
    reviewSub: "This draft only uses details you entered. Edit anything that is not correct before saving it.",
    submit: "Save simulated report",
    back: "Back",
    acknowledgement: "Your practice report is ready",
    acknowledgementSub: "This is a prototype acknowledgement only. It has not been submitted to the Government, police, or platforms.",
    next: "Recommended next steps",
    new: "Start another practice report",
    report: "Draft complaint",
    progress: ["Describe", "Details", "Review", "Done"]
  },
  hi: {
    name: "सेफनेट इंडिया",
    prototype: "हैकाथॉन प्रोटोटाइप · यह भारत सरकार की आधिकारिक वेबसाइट नहीं है · कोई जानकारी किसी प्राधिकरण को नहीं भेजी जाती।",
    begin: "बताइए क्या हुआ",
    sub: "अपनी भाषा में लिखें। हम केवल रिपोर्ट तैयार करने के लिए ज़रूरी जानकारी पूछेंगे।",
    placeholder: "सरल शब्दों में बताएं कि क्या हुआ...",
    continue: "आगे बढ़ें",
    quick: "उदाहरण चुनें",
    guide: "यह क्यों मदद करता है",
    guideText: "व्यवस्थित विवरण और सुरक्षित साक्ष्य अधिकारियों व शिकायत निवारण टीम को तुरंत कार्रवाई में मदद करते हैं।",
    prepare: "ज़रूरी जानकारी जुटाएँ",
    evidence: "सबूत सुरक्षित रखें",
    evidenceSub: "यहाँ कुछ अपलोड नहीं करना है। इन चीज़ों को अपने फोन में सुरक्षित रखें।",
    review: "अपने ड्राफ्ट की जाँच करें",
    reviewSub: "यह ड्राफ्ट केवल आपकी दर्ज जानकारी से बना है। गलत हो तो सेव करने से पहले बदलें।",
    submit: "सिम्युलेटेड रिपोर्ट सेव करें",
    back: "वापस",
    acknowledgement: "आपकी प्रैक्टिस रिपोर्ट तैयार है",
    acknowledgementSub: "यह केवल प्रोटोटाइप पावती है। इसे सरकार या पुलिस को नहीं भेजा गया है।",
    next: "सुझाए गए अगले कदम",
    new: "नई प्रैक्टिस रिपोर्ट शुरू करें",
    report: "शिकायत ड्राफ्ट",
    progress: ["बताएँ", "विवरण", "जाँचें", "पूरा"]
  }
};

const sampleStories = {
  financial: "Someone called claiming to be from SBI KYC and ₹24,000 was debited on PhonePe after I shared an OTP.",
  account: "My Instagram account (@myhandle) was hacked, the recovery email was changed to an unknown address, and scam messages are being sent.",
  harassment: "Someone created a fake profile with my photos and name on Instagram and is sending abusive messages to my contacts."
};

function ReportContent() {
  const searchParams = useSearchParams();
  const storyParam = searchParams.get("story");
  const typeParam = searchParams.get("type");

  const [lang, setLang] = useState<Lang>("en");
  const [category, setCategory] = useState<CategoryType>("financial");
  const [step, setStep] = useState(0);
  const [story, setStory] = useState("");
  const [fromGuided, setFromGuided] = useState(false);

  const [details, setDetails] = useState<Details>({
    amount: "",
    incidentAt: "",
    service: "",
    reference: "",
    suspect: "",
    platform: "",
    handle: "",
    recoveryAltered: "",
    harassmentType: "",
    targetUrl: ""
  });

  const [evidence, setEvidence] = useState({ ev1: false, ev2: false, ev3: false });
  const [draft, setDraft] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    let activeCat: CategoryType = "financial";

    if (typeParam === "account") {
      activeCat = "account";
    } else if (typeParam === "harassment" || typeParam === "other") {
      activeCat = "harassment";
    } else if (typeParam === "financial") {
      activeCat = "financial";
    } else if (storyParam) {
      const text = storyParam.toLowerCase();
      if (
        text.includes("instagram") ||
        text.includes("account") ||
        text.includes("login") ||
        text.includes("taken over") ||
        text.includes("takeover") ||
        text.includes("compromis") ||
        text.includes("hacked") ||
        text.includes("password") ||
        text.includes("gmail") ||
        text.includes("whatsapp")
      ) {
        activeCat = "account";
      } else if (
        text.includes("fake profile") ||
        text.includes("harass") ||
        text.includes("abuse") ||
        text.includes("photo") ||
        text.includes("assault") ||
        text.includes("threat") ||
        text.includes("blackmail")
      ) {
        activeCat = "harassment";
      } else {
        activeCat = "financial";
      }
    }

    setCategory(activeCat);

    if (storyParam && storyParam.trim().length > 8) {
      setStory(storyParam);
      setFromGuided(true);

      const text = storyParam.toLowerCase();
      if (activeCat === "account") {
        setDetails((prev) => ({
          ...prev,
          platform: prev.platform || (text.includes("whatsapp") ? "WhatsApp" : text.includes("gmail") ? "Gmail" : "Instagram"),
          handle: prev.handle || "@user_account"
        }));
      } else if (activeCat === "harassment") {
        setDetails((prev) => ({
          ...prev,
          platform: prev.platform || "Instagram",
          harassmentType: prev.harassmentType || (text.includes("photo") ? "Fake Profile / Photo Misuse" : "Abusive DMs & Harassment"),
          targetUrl: prev.targetUrl || "https://instagram.com/fake_profile"
        }));
      } else if (activeCat === "financial") {
        if (/24,?000/i.test(storyParam)) setDetails((prev) => ({ ...prev, amount: "24000" }));
        if (/sbi/i.test(storyParam) || /phonepe/i.test(storyParam)) {
          setDetails((prev) => ({ ...prev, service: "PhonePe / SBI" }));
        }
      }

      setStep(1);
    }
  }, [storyParam, typeParam]);

  const t = copy[lang];
  const meta = categoryMeta[category];

  const update = (key: keyof Details, value: string) => setDetails((d) => ({ ...d, [key]: value }));

  const isValidForCategory = useMemo(() => {
    if (story.trim().length < 10) return false;
    if (category === "financial") {
      return !!(details.amount && details.incidentAt && details.service && details.reference);
    }
    if (category === "account") {
      return !!(details.platform && details.incidentAt && details.handle);
    }
    if (category === "harassment") {
      return !!(details.harassmentType && details.incidentAt && details.platform && details.targetUrl);
    }
    return false;
  }, [category, story, details]);

  const generated = useMemo(() => {
    if (category === "financial") {
      return `I wish to report a suspected online payment fraud. On ${details.incidentAt || "[date and time]"}, an amount of ₹${details.amount || "[amount]"} was lost through ${details.service || "[bank/payment app]"}. The transaction reference/UTR is ${details.reference || "[reference]"}.${details.suspect ? ` The suspected contact or UPI identifier is ${details.suspect}.` : ""} My account of the incident: ${story || "[describe what happened]"} I have preserved the available transaction and communication evidence for review.`;
    }
    if (category === "account") {
      return `I wish to report an unauthorized account takeover and cyber security breach. On ${details.incidentAt || "[date and time]"}, access to my ${details.platform || "[platform]"} account (${details.handle || "[handle/email]"}) was compromised.${details.recoveryAltered ? ` The recovery information was altered to: ${details.recoveryAltered}.` : ""}${details.suspect ? ` Offender remarks/demands: ${details.suspect}.` : ""} Sequence of events: ${story || "[describe what happened]"} I have preserved official security alert emails, IP logs, and uncropped screenshots to prove account ownership.`;
    }
    return `I wish to report an incident of online impersonation / cyber harassment. On or around ${details.incidentAt || "[date and time]"}, a violation regarding ${details.harassmentType || "[incident type]"} was identified on ${details.platform || "[platform]"}. The offending URL/handle is: ${details.targetUrl || "[URL/handle]"}.${details.suspect ? ` Suspected individual (if any): ${details.suspect}.` : ""} Details of the incident: ${story || "[describe what happened]"} I request formal takedown by the platform grievance officer and cyber cell investigation. Complete uncropped evidence with timestamps has been preserved.`;
  }, [category, details, story]);

  function next(e?: FormEvent) {
    e?.preventDefault();
    if (step === 0 && story.trim().length > 10) setStep(1);
    else if (step === 1 && isValidForCategory) {
      setDraft(generated);
      setStep(2);
    }
  }

  function save() {
    const value = `SAFE-2026-${Math.floor(10000 + Math.random() * 89999)}`;
    setId(value);
    localStorage.setItem("safenet-demo-id", value);
    setStep(3);
  }

  return (
    <main className="reportApp">
      <div className="notice">{t.prototype}</div>

      <header>
        <Link href="/" className="reportBrand">
          <span>✦</span>SafeNet <i>India</i>
        </Link>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/"
            className="language"
            style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
          >
            ← Home
          </Link>
          <button className="language" onClick={() => setLang(lang === "en" ? "hi" : "en")}>
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </div>
      </header>

      {/* Dynamic Category Selector Tabs */}
      <div className="categoryTabStrip">
        {(["financial", "account", "harassment"] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            className={`categoryTab ${category === cat ? "activeTab" : ""}`}
            onClick={() => {
              setCategory(cat);
              if (step === 0) setStory(sampleStories[cat]);
            }}
          >
            <span>{categoryMeta[cat].icon}</span>
            {lang === "en" ? categoryMeta[cat].tag : categoryMeta[cat].tagHi}
          </button>
        ))}
      </div>

      {/* Emergency Guidance Banner */}
      <section className="sos">
        <div>
          <b>{lang === "en" ? meta.emergencyTitle : meta.emergencyTitleHi}</b>
          <span>{lang === "en" ? meta.emergencySub : meta.emergencySubHi}</span>
        </div>
        <a href={meta.tel}>☎ {lang === "en" ? meta.callText : meta.callTextHi}</a>
      </section>

      {/* Progress Navigation */}
      <nav aria-label="Progress">
        {t.progress.map((label, i) => (
          <div
            key={label}
            className={i <= step ? "active" : ""}
            onClick={() => {
              if (i === 0) setStep(0);
              else if (i === 1 && story.trim().length > 10) setStep(1);
              else if (i === 2 && isValidForCategory) setStep(2);
            }}
            style={{ cursor: "pointer" }}
          >
            <i>{i + 1}</i>
            <span>{label}</span>
          </div>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        {/* Step 1: Describe Story */}
        {step === 0 && (
          <motion.section
            key="step-0"
            className="card intro"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            <div className="introTop">
              <div>
                <p className="eyebrow">STEP 1 · {t.progress[0]}</p>
                <h1>{t.begin}</h1>
                <p>{t.sub}</p>
              </div>
              <div className="timeBadge">
                <b>~3</b>
                <span>{lang === "en" ? "minutes" : "मिनट"}</span>
              </div>
            </div>

            <div className="reassurance">
              <span>✓</span>
              <span>
                {lang === "en"
                  ? "Simple, private, and saved only on this device"
                  : "सरल, निजी और केवल इस डिवाइस पर सेव"}
              </span>
            </div>

            <form onSubmit={next}>
              <label htmlFor="story">{t.begin}</label>
              <textarea
                id="story"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder={t.placeholder}
                rows={6}
              />
              <div className="storyMeta">
                <span>
                  {lang === "en"
                    ? "Share only the facts you remember."
                    : "केवल वे तथ्य लिखें जो आपको याद हैं।"}
                </span>
                <span>{story.length}/600</span>
              </div>

              <div className="samples">
                <span>{t.quick}:</span>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("financial");
                    setStory(sampleStories.financial);
                  }}
                >
                  💸 {lang === "en" ? "Bank / OTP fraud" : "बैंक / OTP फ्रॉड"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("account");
                    setStory(sampleStories.account);
                  }}
                >
                  🔐 {lang === "en" ? "Account takeover" : "खाता हैक"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("harassment");
                    setStory(sampleStories.harassment);
                  }}
                >
                  🛡️ {lang === "en" ? "Fake profile / Harassment" : "फर्जी प्रोफाइल / उत्पीड़न"}
                </button>
              </div>

              <motion.button
                className="primary"
                type="submit"
                disabled={story.trim().length < 11}
                whileHover={story.trim().length >= 11 ? { scale: 1.01 } : {}}
                whileTap={story.trim().length >= 11 ? { scale: 0.99 } : {}}
              >
                {t.continue} <span>→</span>
              </motion.button>
            </form>

            <aside>
              <b>✦ {t.guide}</b>
              <p>{t.guideText}</p>
            </aside>
          </motion.section>
        )}

        {/* Step 2: Tailored Essential Details */}
        {step === 1 && (
          <motion.section
            key="step-1"
            className="card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            <p className="eyebrow">STEP 2 · {t.progress[1]}</p>

            {/* Seamless bridge showing captured story from guided triage */}
            {story && (
              <div className="storyBridgeBanner">
                <div className="storyBridgeContent">
                  <span className="storyBridgeTag">
                    {fromGuided ? "✓ Captured from guided triage" : "✓ Your recorded description"}
                  </span>
                  <p className="storyBridgeText">“{story}”</p>
                </div>
                <button
                  type="button"
                  className="storyBridgeEdit"
                  onClick={() => setStep(0)}
                >
                  Edit description
                </button>
              </div>
            )}

            <div className="triage">
              <span>{meta.icon}</span>
              <div>
                <h2>{lang === "en" ? meta.triageHeadline : meta.triageHeadlineHi}</h2>
                <p>{lang === "en" ? meta.triageSub : meta.triageSubHi}</p>
              </div>
            </div>

            <form onSubmit={next}>
              <h2>{t.prepare}</h2>
              <div className="fields">
                {category === "financial" && (
                  <>
                    <Field
                      label={lang === "en" ? meta.field1Label : meta.field1LabelHi}
                      hint={lang === "en" ? meta.field1Hint : meta.field1HintHi}
                      value={details.amount}
                      onChange={(v) => update("amount", v)}
                      required
                      type="number"
                      placeholder={meta.field1Placeholder}
                    />
                    <Field
                      label={lang === "en" ? meta.field2Label : meta.field2LabelHi}
                      value={details.incidentAt}
                      onChange={(v) => update("incidentAt", v)}
                      required
                      type="datetime-local"
                    />
                    <Field
                      label={lang === "en" ? meta.field3Label : meta.field3LabelHi}
                      value={details.service}
                      onChange={(v) => update("service", v)}
                      required
                      placeholder={meta.field3Placeholder}
                    />
                    <Field
                      label={lang === "en" ? meta.field4Label : meta.field4LabelHi}
                      hint={lang === "en" ? meta.field4Hint : meta.field4HintHi}
                      value={details.reference}
                      onChange={(v) => update("reference", v)}
                      required
                      placeholder={meta.field4Placeholder}
                    />
                    <Field
                      label={lang === "en" ? meta.field5Label : meta.field5LabelHi}
                      hint={lang === "en" ? meta.field5Hint : meta.field5HintHi}
                      value={details.suspect}
                      onChange={(v) => update("suspect", v)}
                      placeholder={meta.field5Placeholder}
                    />
                  </>
                )}

                {category === "account" && (
                  <>
                    <Field
                      label={lang === "en" ? meta.field1Label : meta.field1LabelHi}
                      hint={lang === "en" ? meta.field1Hint : meta.field1HintHi}
                      value={details.platform}
                      onChange={(v) => update("platform", v)}
                      required
                      placeholder={meta.field1Placeholder}
                    />
                    <Field
                      label={lang === "en" ? meta.field2Label : meta.field2LabelHi}
                      value={details.incidentAt}
                      onChange={(v) => update("incidentAt", v)}
                      required
                      type="datetime-local"
                    />
                    <Field
                      label={lang === "en" ? meta.field3Label : meta.field3LabelHi}
                      value={details.handle}
                      onChange={(v) => update("handle", v)}
                      required
                      placeholder={meta.field3Placeholder}
                    />
                    <Field
                      label={lang === "en" ? meta.field4Label : meta.field4LabelHi}
                      hint={lang === "en" ? meta.field4Hint : meta.field4HintHi}
                      value={details.recoveryAltered}
                      onChange={(v) => update("recoveryAltered", v)}
                      placeholder={meta.field4Placeholder}
                    />
                    <Field
                      label={lang === "en" ? meta.field5Label : meta.field5LabelHi}
                      hint={lang === "en" ? meta.field5Hint : meta.field5HintHi}
                      value={details.suspect}
                      onChange={(v) => update("suspect", v)}
                      placeholder={meta.field5Placeholder}
                    />
                  </>
                )}

                {category === "harassment" && (
                  <>
                    <Field
                      label={lang === "en" ? meta.field1Label : meta.field1LabelHi}
                      hint={lang === "en" ? meta.field1Hint : meta.field1HintHi}
                      value={details.harassmentType}
                      onChange={(v) => update("harassmentType", v)}
                      required
                      placeholder={meta.field1Placeholder}
                    />
                    <Field
                      label={lang === "en" ? meta.field2Label : meta.field2LabelHi}
                      value={details.incidentAt}
                      onChange={(v) => update("incidentAt", v)}
                      required
                      type="datetime-local"
                    />
                    <Field
                      label={lang === "en" ? meta.field3Label : meta.field3LabelHi}
                      value={details.platform}
                      onChange={(v) => update("platform", v)}
                      required
                      placeholder={meta.field3Placeholder}
                    />
                    <Field
                      label={lang === "en" ? meta.field4Label : meta.field4LabelHi}
                      hint={lang === "en" ? meta.field4Hint : meta.field4HintHi}
                      value={details.targetUrl}
                      onChange={(v) => update("targetUrl", v)}
                      required
                      placeholder={meta.field4Placeholder}
                    />
                    <Field
                      label={lang === "en" ? meta.field5Label : meta.field5LabelHi}
                      hint={lang === "en" ? meta.field5Hint : meta.field5HintHi}
                      value={details.suspect}
                      onChange={(v) => update("suspect", v)}
                      placeholder={meta.field5Placeholder}
                    />
                  </>
                )}
              </div>

              <section className="evidence">
                <h2>{t.evidence}</h2>
                <p>{t.evidenceSub}</p>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={evidence.ev1}
                    onChange={(e) => setEvidence((x) => ({ ...x, ev1: e.target.checked }))}
                  />
                  <span>{lang === "en" ? meta.ev1 : meta.ev1Hi}</span>
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={evidence.ev2}
                    onChange={(e) => setEvidence((x) => ({ ...x, ev2: e.target.checked }))}
                  />
                  <span>{lang === "en" ? meta.ev2 : meta.ev2Hi}</span>
                </label>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={evidence.ev3}
                    onChange={(e) => setEvidence((x) => ({ ...x, ev3: e.target.checked }))}
                  />
                  <span>{lang === "en" ? meta.ev3 : meta.ev3Hi}</span>
                </label>
              </section>

              <div className="actions">
                <button type="button" className="secondary" onClick={() => setStep(0)}>
                  {t.back}
                </button>
                <motion.button
                  type="submit"
                  className="primary"
                  disabled={!isValidForCategory}
                  whileHover={isValidForCategory ? { scale: 1.01 } : {}}
                  whileTap={isValidForCategory ? { scale: 0.99 } : {}}
                >
                  {t.continue} <span>→</span>
                </motion.button>
              </div>
            </form>
          </motion.section>
        )}

        {/* Step 3: Review Draft */}
        {step === 2 && (
          <motion.section
            key="step-2"
            className="card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            <p className="eyebrow">STEP 3 · {t.progress[2]}</p>
            <h1>{t.review}</h1>
            <p>{t.reviewSub}</p>

            <label htmlFor="draft">{t.report}</label>
            <textarea
              id="draft"
              className="draft"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={10}
            />

            <div className="actions">
              <button className="secondary" type="button" onClick={() => setStep(1)}>
                {t.back}
              </button>
              <motion.button
                className="primary"
                type="button"
                onClick={save}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {t.submit} <span>→</span>
              </motion.button>
            </div>
          </motion.section>
        )}

        {/* Step 4: Simulated Acknowledgement */}
        {step === 3 && (
          <motion.section
            key="step-3"
            className="card success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="successIcon">✓</div>
            <p className="eyebrow">STEP 4 · {t.progress[3]}</p>
            <h1>{t.acknowledgement}</h1>
            <p>{t.acknowledgementSub}</p>

            <div className="receipt">
              <span>SIMULATED ACKNOWLEDGEMENT · {meta.tag.toUpperCase()}</span>
              <strong>{id}</strong>
              <small>SafeNet India · Concept Prototype</small>
            </div>

            <section className="next">
              <h2>{t.next}</h2>
              <ol>
                <li>{lang === "en" ? meta.next1 : meta.next1Hi}</li>
                <li>{lang === "en" ? meta.next2 : meta.next2Hi}</li>
                <li>{lang === "en" ? meta.next3 : meta.next3Hi}</li>
              </ol>
            </section>

            <button
              className="secondary"
              type="button"
              onClick={() => {
                setStep(0);
                setStory("");
                setFromGuided(false);
                setDetails({
                  amount: "",
                  incidentAt: "",
                  service: "",
                  reference: "",
                  suspect: "",
                  platform: "",
                  handle: "",
                  recoveryAltered: "",
                  harassmentType: "",
                  targetUrl: ""
                });
              }}
            >
              {t.new}
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <footer>
        SafeNet India is an independent concept prototype. For official reporting, use the appropriate government channels.
      </footer>
    </main>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="reportApp"><div className="card">Loading reporting assistant...</div></div>}>
      <ReportContent />
    </Suspense>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  required,
  type = "text",
  placeholder
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>
        {label} {required && <em>•</em>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <small>{hint}</small>}
    </label>
  );
}
