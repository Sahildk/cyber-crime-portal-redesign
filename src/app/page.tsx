"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    icon: "💸",
    tag: "FINANCIAL FRAUD",
    title: "Payment & banking fraud",
    text: "UPI, bank transfer, unauthorized debit, OTP compromise, or online shopping scams.",
    action: "Report payment fraud",
    href: "/report?type=financial",
    isFlagship: true
  },
  {
    icon: "🔐",
    tag: "ACCOUNT SECURITY",
    title: "Account & identity takeover",
    text: "Compromised login, altered recovery email/phone, Instagram/WhatsApp hack, and stolen credentials.",
    action: "Report account takeover",
    href: "/report?type=account",
    isFlagship: false
  },
  {
    icon: "🛡️",
    tag: "CYBER SAFETY",
    title: "Online harassment & fake profiles",
    text: "Fake profile creation, photo misuse, abusive DMs, defamation, and stalking.",
    action: "Report harassment",
    href: "/report?type=harassment",
    isFlagship: false
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Home() {
  return (
    <main className="site">
      <div className="siteNotice">
        INDEPENDENT HACKATHON PROTOTYPE · CITIZEN ENTRY POINT REDESIGN CONCEPT · NOT AN OFFICIAL GOVERNMENT WEBSITE
      </div>

      <header className="siteHeader">
        <Link className="siteBrand" href="/">
          <span>✦</span>SafeNet <i>India</i>
        </Link>
        <nav>
          <a href="#support">What happened?</a>
          <a href="#how">How it works</a>
          <a href="#about">Why SafeNet</a>
        </nav>
        <Link className="navCta" href="/report">
          Flagship demo <b>→</b>
        </Link>
      </header>

      <section className="hero">
        <div className="heroGlow" />
        <div className="heroGlowSecondary" />
        <div className="heroGridBg" />

        <motion.div
          className="heroCopy"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p variants={itemVariants} className="kicker">
            A SIMPLER WAY TO REPORT CYBERCRIME
          </motion.p>
          <motion.h1 variants={itemVariants}>
            Calm guidance<br />when <em>every minute</em><br />matters.
          </motion.h1>
          <motion.p variants={itemVariants} className="heroText">
            Cybercrime can be confusing when you don’t know where to start. SafeNet helps you explain what happened, find the right reporting path, and prepare a clear report.
          </motion.p>
          <motion.div variants={itemVariants} className="heroActions">
            <Link className="limeButton" href="/guided">
              Tell us what happened <span>→</span>
            </Link>
            <Link className="ghostButton" href="/report">
              Report payment fraud <span>→</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="heroSidebar"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          <aside className="urgentCard">
            <span className="pulse" />
            <p>LOST MONEY?</p>
            <strong>Call 1930 immediately.</strong>
            <small>Contact your bank or payment provider and preserve your evidence.</small>
            <a href="tel:1930">
              Call the cyber helpline <b>↗</b>
            </a>
          </aside>
        </motion.div>
      </section>

      <section className="section services" id="support">
        <motion.div
          className="sectionIntro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="kicker">START WITH YOUR EXPERIENCE</p>
          <h2>What happened<br />to you?</h2>
          <p>
            You don’t need to know which cybercrime category applies. Tell us what happened and we’ll guide you to the right reporting path.
          </p>
          <Link className="textLink" href="/guided">
            Not sure? Tell us what happened <span>→</span>
          </Link>
        </motion.div>

        <div className="serviceGrid">
          {services.map((service, index) => (
            <motion.article
              className={`serviceCard card${index + 1} ${service.isFlagship ? "flagshipCard" : ""}`}
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="serviceTop">
                <div className="serviceIcon">{service.icon}</div>
                <span className="cardTag">{service.tag}</span>
              </div>
              <div className="serviceContent">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link href={service.href}>
                  {service.action} <span>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="how section" id="how">
        <motion.div
          className="phoneMock"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="phoneTop" />
          <div className="phoneBody">
            <span className="miniBrand">✦ SafeNet</span>
            <small>Tell us what happened</small>
            <div className="miniMessage">
              Someone called claiming to be from SBI KYC and ₹24,000 was debited after I shared an OTP.
            </div>
            <div className="miniResult">
              <b>Possible payment fraud</b>
              <span>
                • Bank impersonation<br />
                • OTP sharing<br />
                • Unauthorized payment<br />
                • ₹24,000 loss
              </span>
            </div>
            <p className="miniConfirm">Is this correct?</p>
            <Link href="/report">Continue →</Link>
          </div>
        </motion.div>

        <motion.div
          className="howCopy"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="kicker">CITIZEN-FIRST REPORTING</p>
          <h2>From “what do I do?”<br />to a report you can review.</h2>
          <ol>
            <li>
              <b>01</b>
              <div>
                <strong>Act immediately</strong>
                <span>Call 1930, contact your bank or payment provider, and preserve evidence.</span>
              </div>
            </li>
            <li>
              <b>02</b>
              <div>
                <strong>Tell your story simply</strong>
                <span>Describe what happened. SafeNet identifies the likely path and asks only relevant questions.</span>
              </div>
            </li>
            <li>
              <b>03</b>
              <div>
                <strong>Save a clear draft</strong>
                <span>Review the structured complaint and verify the facts before simulated submission.</span>
              </div>
            </li>
          </ol>
          <Link className="textLink" href="/report">
            Try the flagship financial-fraud journey <span>→</span>
          </Link>
        </motion.div>
      </section>

      <motion.section
        className="about"
        id="about"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="kicker">REDESIGNING CITIZEN ENTRY</p>
          <h2>Technology should feel<br />human in a crisis.</h2>
        </div>
        <p>
          Citizens should not have to understand cybercrime categories before they can explain what happened. SafeNet lets citizens start with their story, then progressively guides them toward the information and evidence needed for a report.
        </p>
        <div className="aboutLine">
          <span>Start with your story</span>
          <i />
          <span>Clear next steps</span>
          <i />
          <span>Flagship financial fraud demo</span>
        </div>
      </motion.section>

      <motion.section
        className="finalCta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="kicker">READY WHEN YOU NEED IT</p>
        <h2>Start with a clear<br /><em>next step.</em></h2>
        <p>
          Tell SafeNet what happened, or jump straight into the complete financial-fraud reporting demo.
        </p>
        <div className="finalActions">
          <Link className="limeButton" href="/guided">
            Tell us what happened <span>→</span>
          </Link>
          <Link className="ghostButton" href="/report">
            I lost money <span>→</span>
          </Link>
        </div>
      </motion.section>

      <footer className="siteFooter">
        <div className="siteBrand">
          <span>✦</span>SafeNet <i>India</i>
        </div>
        <p>
          Hackathon concept · Redesigned citizen entry point for cybercrime reporting · Synthetic local data only.
        </p>
        <a href="tel:1930">Financial fraud? Call 1930</a>
      </footer>
    </main>
  );
}
