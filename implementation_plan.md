# SafeNet India — Redesigning the Citizen Entry Point for Cybercrime Reporting

> **Hackathon Prototype · Concept Redesign · Not an official Government of India website.** All data, OTPs, acknowledgments, and status information are simulated locally.

---

## 1. Product Positioning & Core Problem

**SafeNet India = A redesigned citizen entry point and reporting experience for the National Cyber Crime Reporting Portal.**

### The Core Problem
On the current portal, citizens in crisis must navigate complex categories, legal jargon, and bureaucratic structures before they can report an incident. 

### The SafeNet Solution
> **"Citizens should not have to understand cybercrime categories before they can explain what happened."**

SafeNet organizes reporting around the **citizen's experience** rather than legal classifications:
1. **Citizen shares their story in natural language** (“Someone called claiming to be SBI KYC and ₹24,000 was debited after I shared an OTP”).
2. **SafeNet transparently understands & triages** to the right reporting path.
3. **Progressive questions collect only what is necessary**.
4. **Evidence assistant guides what to preserve locally**.
5. **An editable, structured complaint draft is generated for user verification**.

---

## 2. Product Architecture & Scope

```text
                    SAFENET INDIA
                         │
                “What happened?”
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
    Financial Fraud   Account/      Other Cybercrime
    (FLAGSHIP MVP)    Identity      (Harassment, etc.)
          │              │              │
          │              └───────┬──────┘
          ↓                      ↓
      Understand           Lightweight
          ↓              Intake & Preserved
        Triage            Evidence Guide
          ↓                      ↓
       Prepare              Architecture
          ↓               Routing Preview
        Report
          ↓
     Next Steps &
     Simulated Ack
```

### Scope Boundaries:
- **Flagship Fully Implemented Journey**: **Financial / UPI Fraud** (Complete 3-minute end-to-end flow: Describe → Triage → Adaptive Questions → Evidence Checklist → Editable Complaint Draft → Review → Mock Submission → 1930 & Next Steps).
- **Lightweight Demonstration Branches**: **Account & Identity** and **Other Cybercrime** (Demonstrates scalable natural-language routing without rebuilding full forms for every portal category).
- **Prototype Guardrails**: No actual government authentication, no real OTP, no live submission to authorities, no bank integration, 100% synthetic local data.

---

## 3. Landing Page Refinements

1. **Hero Positioning**:
   - Headline: *Calm guidance when every minute matters.*
   - Subtitle: *A simpler way to report cybercrime.*
   - Primary CTA: **Tell us what happened →** (`/guided`)
   - Secondary CTA: **Report payment fraud →** (`/report`)
   - Emergency Banner: *Lost money? Call 1930 immediately.*

2. **Primary Portal Question & 3 Category Options**:
   - Title: **What happened to you?**
   - Option 1 (Flagship): **💸 Financial fraud** — *UPI, bank transfer, card, payment or online shopping scams.* (`/report`)
   - Option 2: **🔐 Account & identity** — *Account compromise, impersonation, stolen credentials and related issues.* (`/guided?cat=account`)
   - Option 3: **🛡️ Other cybercrime** — *Harassment, suspicious activity and other cybercrime incidents.* (`/guided?cat=other`)
   - Natural Language CTA: **Not sure? Tell us what happened →** (`/guided`)

3. **Central Differentiator**:
   - Visual comparison illustrating the shift from **Category-First** (*Financial Fraud, Identity Theft, Vishing, Phishing...*) to **Experience-First** (*"Someone called pretending to be my bank..." → SafeNet suggestion → Citizen confirmation*).

4. **Phone Mockup**:
   - Demonstrates natural language comprehension and transparent feature detection (Bank impersonation, OTP sharing, Unauthorized payment, ₹24,000 loss).

---

## 4. Verification Plan

### Automated Build Check
- `npm run build` to verify clean static generation and type safety across all routes (`/`, `/guided`, `/report`).

### Manual UX & Navigation Check
- Test navigation from landing page to natural language triage (`/guided`) and flagship financial fraud report (`/report`).
- Test quick prompt chips and on-device keyword triage for financial, account, and other cybercrime descriptions.
- Test 4-step financial fraud workflow in English and Hindi.
