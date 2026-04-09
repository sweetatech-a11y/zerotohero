import { useState, useEffect, useRef, useCallback } from "react";

// ─── GUIDE TEMPLATES ───────────────────────────────────────────────────────────
const GUIDE_TEMPLATES = [
  {
    id: "google-ads",
    name: "Google Ads",
    icon: "🔍",
    color: "#4285F4",
    description: "Set up, launch, and optimize Google Ads campaigns — Search, Display, Performance Max, and YouTube",
    sections: [
      {
        name: "Account & Billing Setup",
        icon: "🏗",
        tasks: [
          { text: "Set up MCC (Manager Account) — your agency's parent account", tip: "Create your MCC at ads.google.com/home/tools/manager-accounts. This is the parent structure — all client accounts live under it. Create this first, then create or link client accounts within it." },
          { text: "Create Google Ads account under MCC (or link client's existing account)", tip: "In your MCC, click '+' → Create new account or Link existing. Never create a standalone account outside your MCC — it makes management, reporting, and client transitions difficult." },
          { text: "Link Google Ads to Google Analytics 4 property", tip: "In GA4 → Admin → Google Ads Links → Link. This enables audience sharing, cross-platform attribution, and deeper conversion insights in both platforms." },
          { text: "Link Google Ads to Google Business Profile (if local business)", tip: "This unlocks location assets — your ads show address, phone, and map pin. Huge for local businesses and boosts ad real estate significantly." },
          { text: "Set up billing with client's payment method", tip: "Use the client's credit card or set up invoicing. Never run client spend on your own card — it creates liability and accounting issues." },
          { text: "Configure account-level settings: time zone, currency, auto-tagging ON", tip: "Auto-tagging appends gclid to URLs so GA4 can attribute conversions back to the exact click. Set time zone to the client's local time zone." },
          { text: "Grant team members appropriate access levels (Admin vs Standard vs Read-only)", tip: "Give yourself Admin. Give the client Read-only or Standard unless they specifically need more. Use email-based access — never share login credentials." },
          { text: "Establish naming conventions for campaigns, ad groups, and labels", tip: "Use a consistent format like [Channel]_[Objective]_[Target]_[Location] (e.g., Search_LeadGen_RoofRepair_Atlanta). Labels help you tag and filter across campaign structures." },
        ],
      },
      {
        name: "Conversion Tracking",
        icon: "📡",
        tasks: [
          { text: "Install Google Tag Manager (GTM) container on every page of client's website", tip: "GTM is the industry standard — it lets you manage all tags (Google, Meta, TikTok) from one dashboard without touching site code. Add the container snippet to the <head> and <body> of every page." },
          { text: "Set up Consent Mode V2 for privacy compliance", tip: "Must be configured BEFORE deploying marketing tags. Required for EU/EEA traffic since March 2024 and best practice globally. Consent Mode adjusts tag behavior based on user consent — Google models conversions from non-consenting users to fill measurement gaps. Implement via a CMP (Cookiebot, OneTrust) + GTM before adding any Google Ads or analytics tags." },
          { text: "Deploy Google Ads tag and Conversion Linker via GTM", tip: "In GTM → Tags → New → Google Ads Tag. Always add a Conversion Linker tag alongside it — this ensures the gclid is captured from the URL and passed with every conversion event. Deploy after Consent Mode is configured so tags respect user consent from the first pageview." },
          { text: "Create conversion action: Lead (form submission)", tip: "Google Ads → Goals → Conversions → New → Website. Set category to 'Submit lead form.' Use a thank-you page URL or fire a custom GTM event when the form submits successfully." },
          { text: "Create conversion action: Phone Call (calls from ads + website)", tip: "Set up both 'Calls from ads' (call assets) and 'Calls to a phone number on your website' (requires a forwarding number snippet). Track calls 60+ seconds as conversions." },
          { text: "Create conversion action: Booking/Purchase (if applicable)", tip: "Match this to the actual business goal — booking confirmation page, purchase receipt, etc. Pass dynamic conversion value when possible for ROAS-based bidding." },
          { text: "Enable Enhanced Conversions for better attribution", tip: "Enhanced Conversions sends hashed first-party data (email, phone) to Google for better matching — recovers 5–15% of conversions lost to cookie restrictions and ad blockers. Configure alongside your conversion actions in conversion settings or via GTM." },
          { text: "Ensure GCLID is captured in lead forms and stored in CRM", tip: "Add a hidden field to every lead form that captures the gclid URL parameter. Store it in your CRM alongside the lead record. This is a prerequisite for offline conversion imports — do this before moving on." },
          { text: "Set up offline conversion imports if client tracks leads in CRM", tip: "Export closed deals from CRM with gclid and upload to Google Ads (manually, via API, or Zapier). This teaches Smart Bidding what a 'good' lead looks like — dramatically improves lead quality over time." },
          { text: "Verify all tags fire correctly with Google Tag Assistant", tip: "After completing ALL tracking setup above, install the Tag Assistant Chrome extension. Visit every key page and test every conversion trigger. Confirm the Google tag loads, Consent Mode is active, conversion events fire on correct pages, and Enhanced Conversions data is being sent." },
          { text: "Verify conversion data flows into Google Ads within 24–48 hours", tip: "Go to Goals → Conversions. You should see conversion counts within 1–2 days of launch. If not, debug your GTM setup — check tag firing triggers and conversion action configuration." },
        ],
      },
      {
        name: "Keyword Research & Strategy",
        icon: "🗝",
        tasks: [
          { text: "Use Google Keyword Planner to pull search volume for 30–50 seed keywords", tip: "Start with obvious terms: '[service] + [city]', '[service] near me', 'best [service]'. Pull avg. monthly searches, competition level, and top-of-page bid estimates to forecast budget." },
          { text: "Use Google Trends to identify seasonal demand patterns and search momentum", tip: "Compare keyword interest over 12+ months to spot seasonal spikes (e.g., HVAC peaks in summer/winter, roofing after storm season). Use this data to plan budget allocation by month and front-load spend during high-demand periods when CPAs are often lower due to higher conversion intent." },
          { text: "Analyze competitor keywords using Auction Insights + SpyFu/Semrush", tip: "See who's bidding on the same terms, their impression share, and estimated spend. Find keyword gaps they're missing that you can exploit for cheaper clicks." },
          { text: "Research 'near me' and local-intent long-tail variations", tip: "'Emergency plumber near me' has higher intent than 'plumber.' Mine Google Autocomplete, 'People Also Ask,' and Related Searches for all high-intent local variants." },
          { text: "Group keywords into themed ad groups (5–15 keywords per group, single intent)", tip: "Each ad group = one search intent. 'roof repair' and 'roof replacement' are different intents, different ad groups. This STAG (Single Theme Ad Group) approach keeps ad relevance high and Quality Scores strong." },
          { text: "Identify negative keywords to exclude before launch", tip: "Build a negative keyword list proactively. Add 'jobs', 'salary', 'how to DIY', 'free', 'cheap', 'reddit', 'what is', 'reviews' at minimum. This prevents wasted spend from day one." },
          { text: "Build a shared negative keyword list and apply to all campaigns", tip: "Create at the account level and apply to all campaigns at once. Update weekly from the Search Terms report — this is an ongoing discipline, not a one-time setup task." },
          { text: "Choose match types: Phrase + Exact for new accounts, add Broad Match as data matures", tip: "Start with Phrase and Exact Match for control during the first 4–8 weeks. Once you have 30+ conversions/month and are running Smart Bidding, test Broad Match — Google's AI leverages it effectively with sufficient conversion data." },
        ],
      },
      {
        name: "Search Campaigns",
        icon: "🎯",
        tasks: [
          { text: "Ensure landing pages are ready with clear CTAs above the fold", tip: "Do this FIRST — you need destination URLs before building any campaign. Every ad group should point to a relevant landing page — not the homepage. The page must match keyword intent, load in under 3 seconds on mobile, and have a phone number + form visible without scrolling. One landing page per service or ad group." },
          { text: "Set geographic targeting to client's service area only", tip: "Target by radius or specific cities/zip codes. CRITICAL: Set to 'Presence' (people physically IN the area), not 'Presence or Interest' — the default wastes budget on people merely researching the area from elsewhere." },
          { text: "Choose initial bid strategy: Maximize Conversions or Manual CPC for data collection", tip: "This is a campaign-level setting chosen during campaign creation. For new accounts (<30 conversions/month): use Manual CPC or Maximize Conversions without a target to collect data. After 30+ conversions in 30 days, transition to Target CPA. For budgets over $5K/month, test Smart Bidding earlier — it can outperform Manual CPC by 20–35% in mature accounts." },
          { text: "Set ad schedule based on business hours and conversion patterns", tip: "Configure during campaign creation. If nobody answers the phone at 2am, don't run call-focused ads at 2am. Start with business hours, then refine based on hourly conversion data after 2–4 weeks." },
          { text: "Build Brand Campaign: bid on client's business name", tip: "Competitors will bid on your client's name. A brand campaign protects it at $0.30–$1.00/click and maintains 90%+ impression share on brand terms. Use Exact Match for the brand name." },
          { text: "Build High-Intent Campaign: target '[service] + [city]' keywords", tip: "These are people actively searching for the service right now. This campaign should get 50–60% of the total budget — it's your highest-converting campaign." },
          { text: "Build Competitor Campaign: bid on competitor business names", tip: "You can't use their name in ad copy, but you can bid on it. Position your client as the better alternative. Expect lower Quality Scores and higher CPCs on competitor terms — that's normal." },
          { text: "Write 3 Responsive Search Ads per ad group (15 headlines, 4 descriptions each)", tip: "Give Google variety. Include the keyword, benefits, CTAs, and unique selling points across headlines. Pin your strongest headline to Position 1 and a CTA to Position 2 for consistency." },
          { text: "Add all relevant ad assets: Sitelinks, Callouts, Structured Snippets, Images", tip: "Assets (formerly 'extensions') increase ad real estate and CTR by 10–15%. Add at least 4 sitelinks, 4 callouts, and 2 structured snippet categories. Apply at account level so all campaigns benefit." },
          { text: "Add Call Asset with tracked phone number", tip: "Shows a clickable phone number right in the ad. Essential for service businesses. Use a tracked forwarding number so you can attribute calls back to specific campaigns and keywords." },
          { text: "Add Location Asset (linked from Google Business Profile)", tip: "Shows address and map pin. Increases local trust and drives foot traffic. Requires GBP to be linked to the Google Ads account (done in Section 1)." },
          { text: "Layer in-market and affinity audiences in Observation mode", tip: "Add relevant in-market audiences (e.g., 'Home Services') and affinity audiences to your campaigns in Observation mode — this collects performance data by audience segment WITHOUT restricting reach. After 2–4 weeks of data, apply bid adjustments (+15–30%) on high-converting audience segments to boost performance." },
        ],
      },
      {
        name: "Performance Max & Display",
        icon: "🖼",
        tasks: [
          { text: "Prepare all creative assets: 5+ images per ratio, logos, and headlines", tip: "Prepare BEFORE building the campaign — you can't create asset groups without assets. Upload 5+ high-quality images in every required ratio (landscape 1.91:1, square 1:1, portrait 4:5). Use real photos of work, team, and results over stock imagery. Google crops aggressively, so provide clean compositions in every format." },
          { text: "Produce at least 1 video asset (YouTube link, 15–30 seconds)", tip: "PMax runs across YouTube, Gmail, Discover, and Display — video is critical. Even a simple slideshow video is better than no video. Without one, Google auto-generates a low-quality video from your images that will underperform." },
          { text: "Build Performance Max campaign with complete asset groups", tip: "Now that assets are ready, create the campaign. PMax needs text (headlines + descriptions), images (all ratios), video, logos, and a strong final URL per asset group. Upload the maximum number of assets per type — more variety = better performance across Search, Display, YouTube, Gmail, Discover, and Maps." },
          { text: "Create audience signals: custom segments, remarketing lists, customer lists", tip: "Audience signals tell PMax who your ideal customer is. Upload customer email lists, create custom intent audiences based on competitor URLs and top search terms, and add remarketing lists. These are directional signals — PMax will expand beyond them." },
          { text: "Add search themes to each asset group (up to 25 per group)", tip: "Search themes give PMax keyword-level input for Search inventory. Add your top-performing keywords, competitor brand terms, and high-intent service queries. This guides where PMax shows ads on Search." },
          { text: "Set up brand exclusions to separate brand vs. non-brand traffic", tip: "In campaign settings → Brand exclusions. Exclude your client's own brand name so PMax doesn't cannibalize your cheaper Brand Search campaign. This gives cleaner data on true prospecting performance." },
          { text: "Configure Final URL expansion settings", tip: "Final URL expansion lets PMax swap your landing page for more relevant pages on the site. Turn it OFF if you have limited, curated landing pages. Turn it ON with a page feed if you have many service pages — use page feeds to control which URLs PMax can use." },
          { text: "Set up Display remarketing campaign for website visitors", tip: "Show banner ads to people who visited the site but didn't convert. Use a 30-day audience window. Run this alongside PMax to give you more granular control over display remarketing." },
          { text: "Create responsive display ads with compelling visuals + offer", tip: "Use high-contrast images with minimal text overlay. Include the offer and a clear CTA. Test multiple image variations — Google will surface the best performers automatically." },
          { text: "Exclude irrelevant placements: mobile apps, parked domains, kids content", tip: "Go to Content → Exclusions. Exclude mobile game apps (adsenseformobileapps.com), parked domains, and sensitive content categories. Review placement reports monthly and block low-quality sites." },
        ],
      },
      {
        name: "Optimization & Reporting",
        icon: "📈",
        tasks: [
          { text: "Verify conversion tracking is still firing correctly (weekly first month, then monthly)", tip: "This is the MOST CRITICAL ongoing check — everything else depends on accurate data. Tags break when websites update. Check Tag Assistant and Google Ads conversion status columns weekly during month 1, then monthly ongoing. No tracking = no optimization = wasted spend." },
          { text: "Review Search Terms report weekly — add negatives for irrelevant queries", tip: "The #1 optimization task after verifying tracking. Every week, check what people actually searched and block irrelevant terms. In the first month, expect to add 20–50 negative keywords as you discover junk traffic." },
          { text: "Pause keywords with high spend + zero conversions after 2 weeks", tip: "If a keyword spent 2–3x your target CPA with no conversions, pause it. Don't let losers drain budget from your winners." },
          { text: "Test ad copy variations: rotate headlines, test different CTAs and value props", tip: "Pin your best-performing headline to Position 1. Test urgency vs. trust vs. offer-based CTAs. Replace ads with CTR below 3% or 'Poor' ad strength after 2+ weeks of data." },
          { text: "Adjust bids by device: check mobile vs. desktop conversion rates", tip: "If mobile converts at half the rate of desktop, reduce mobile bid adjustment by 30–50%. Check this after 2+ weeks of data — don't assume mobile is worse without evidence." },
          { text: "Review geographic performance and adjust location bid modifiers", tip: "In Reports → Predefined → Geographic, analyze which cities, zip codes, and DMAs drive conversions vs. waste spend. Increase bids 10–25% in high-converting areas. Decrease bids or exclude areas with high spend and zero conversions. For local businesses, this is one of the highest-impact optimizations available." },
          { text: "Monitor Quality Score — improve ads and landing pages with QS below 6", tip: "Quality Score directly affects CPC and ad rank. The three levers: ad relevance (match copy to keywords), expected CTR (write better ads), and landing page experience (fast, relevant, mobile-friendly)." },
          { text: "Review Auction Insights monthly — track competitor impression share trends", tip: "Auction Insights shows who you're competing against, their impression share, and overlap rate. If a new competitor enters or scales up, adjust bids and strategy accordingly." },
          { text: "Check impression share — increase budget if IS < 70% on top campaigns", tip: "Impression Share shows how often your ads appear vs. how often they could. Below 70% on your best campaigns means you're leaving leads on the table. Check 'Lost IS (budget)' vs 'Lost IS (rank)' to know whether to increase budget or improve Quality Score." },
          { text: "Optimize landing pages: test headlines, CTAs, form length, and trust signals", tip: "Landing page changes often deliver bigger CPA improvements than ad changes. Test shorter forms, stronger headlines, and adding trust signals (reviews, certifications, guarantees). A 10% lift in landing page conversion rate = 10% lower CPA." },
          { text: "Transition to Target CPA or Target ROAS after 30+ conversions in 30 days", tip: "Smart Bidding needs data to work. Set your initial Target CPA at your current actual CPA (not aspirational). Let it run for 2 full weeks before adjusting the target downward in 10–15% increments." },
          { text: "Monitor for invalid clicks and set up IP exclusions if needed", tip: "Check Google Ads → Campaigns → Columns → Add 'Invalid clicks' and 'Invalid click rate.' If you see abnormally high rates (above 10%), investigate click fraud. Use third-party tools (ClickCease, Lunio) for advanced protection. Add known bot IPs and competitor IPs to your account-level IP exclusion list (up to 500 IPs)." },
          { text: "Build monthly report: spend, clicks, conversions, CPA, ROAS, and strategic insights", tip: "Don't just dump numbers — tell the story. Show the client: total spend, total leads, cost per lead, and revenue generated. Compare month-over-month. End with what you're doing next and why." },
        ],
      },
    ],
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    icon: "📘",
    color: "#1877F2",
    description: "Set up Meta Business Suite, install tracking, build audiences, and run Facebook & Instagram ad campaigns",
    sections: [
      {
        name: "Business Manager & Account Setup",
        icon: "🏢",
        tasks: [
          { text: "Create or access client's Meta Business Manager at business.meta.com", tip: "Every client should have their own Business Manager — never run ads from a personal profile. If the client already has one, get added. If not, create one using the client's business email." },
          { text: "Complete Business Verification in Security Center", tip: "Business Settings → Security Center → Start Verification. Requires legal business documents. Verified businesses get higher trust scores, fewer ad rejections, and access to advanced features like Custom Audiences from customer lists." },
          { text: "Add your agency as a Partner in Business Settings → Partners", tip: "The client adds your Business Manager ID (found in Business Settings → Business Info). This gives you access to their assets without owning them — critical for clean offboarding if you part ways." },
          { text: "Claim or create the Ad Account inside Business Manager", tip: "Business Settings → Ad Accounts → Add. If the client has an existing ad account, request access to it. If creating new, set the correct currency and time zone — these cannot be changed later." },
          { text: "Assign correct roles: Ad Account Admin for you, Analyst for client", tip: "You need Admin to manage campaigns, billing, and pixels. Give the client Analyst for view-only reporting access. Never share login credentials — always use role-based access." },
          { text: "Connect Facebook Page and Instagram account to Business Manager", tip: "Business Settings → Accounts → Pages (and Instagram Accounts). Both must be claimed. Ads require a connected Page as the ad identity, and connecting Instagram unlocks Instagram placements and the full ad inventory." },
          { text: "Verify your domain in Business Settings → Brand Safety → Domains", tip: "Add a DNS TXT record or upload a verification file to the client's website root. Domain verification is required to configure Aggregated Event Measurement, edit link previews, and prevent domain spoofing. Do this before pixel setup." },
          { text: "Set up payment method and configure account spending limit", tip: "Use the client's credit card or set up a credit line. Set an account spending limit (not just a campaign budget) as a safety net to prevent overspend — especially during onboarding when you're still learning the account." },
          { text: "Enable two-factor authentication on all accounts", tip: "Meta requires 2FA for ad accounts. Enforce it for everyone with access. Use an authenticator app (not SMS) for better security. Accounts without 2FA risk being restricted without warning." },
          { text: "Establish naming conventions for campaigns, ad sets, and ads", tip: "Use a consistent format: [Funnel Stage]_[Objective]_[Audience]_[Date] (e.g., TOF_Leads_LLA-Customers_Mar26). Consistent naming makes reporting, troubleshooting, and scaling across multiple clients manageable." },
        ],
      },
      {
        name: "Meta Pixel & Conversions API",
        icon: "📡",
        tasks: [
          { text: "Create Meta Pixel in Events Manager → Connect Data Sources → Web", tip: "Events Manager → Connect Data Sources → Web → Meta Pixel. Name it '[Client Name] Pixel'. Each ad account should connect to one pixel. Link the pixel to your verified domain." },
          { text: "Install pixel via Google Tag Manager (GTM) — recommended over hard-coding", tip: "GTM is the industry standard for tag management. In GTM → Tags → New → Meta Pixel. This lets you manage pixel events, CAPI, and other platform tags from one dashboard without touching site code. If the site doesn't have GTM, install the GTM container first." },
          { text: "Enable Automatic Advanced Matching in pixel settings", tip: "Events Manager → Pixel Settings → Automatic Advanced Matching → Toggle ON. This hashes and sends user data (email, phone, name, city, zip) with every event, improving match rates by 15–30% and directly boosting your Event Match Quality score." },
          { text: "Set up PageView event (fires automatically with base pixel code)", tip: "This tracks every page load automatically. It's the foundation for building all website visitor audiences and is required before any other events will work." },
          { text: "Set up Lead event on form submission / thank-you page", tip: "Fire the Lead event when someone submits a contact form. Trigger via thank-you page URL load or a GTM trigger on successful form submission. This is your primary conversion action for lead-gen businesses." },
          { text: "Set up Contact event on phone/email click actions", tip: "Track clicks on tel: and mailto: links. Set up via GTM click triggers or onclick event handlers. These micro-conversions give Meta additional signal for optimization even if they don't fire Lead." },
          { text: "Set up ViewContent event on key service/pricing pages", tip: "Fire ViewContent when someone views a high-intent page (pricing, services, individual service pages). Builds retargeting audiences of people who showed buying intent but didn't convert." },
          { text: "Set up Schedule or Purchase event for bookings/e-commerce (if applicable)", tip: "Track the actual bottom-funnel action — booking confirmation, purchase completion, appointment scheduled. Pass the value parameter for ROAS tracking: fbq('track', 'Schedule', {value: 150, currency: 'USD'})." },
          { text: "Create Custom Conversions for non-standard conversion actions", tip: "Events Manager → Custom Conversions → Create. Use URL rules or event parameters to create specific conversions (e.g., 'Booked a Consultation' = Lead event on /booking-confirmed page). Custom conversions let you optimize campaigns for very specific actions." },
          { text: "Install Meta Pixel Helper Chrome extension and verify all events fire", tip: "Visit every key page with the Helper extension active. Green checkmark = firing correctly. Check that the correct event fires on the correct page with the correct parameters. Fix any errors before launching ads." },
          { text: "Enable Conversions API (CAPI) via partner integration, GTM server-side, or plugin", tip: "CAPI sends conversion data server-side, bypassing ad blockers and browser restrictions. It recovers 10–30% of events the browser pixel misses. Use your CMS partner integration (WordPress: PixelYourSite, Shopify: built-in) or GTM server-side container for custom setups." },
          { text: "Set up event deduplication between browser pixel and CAPI", tip: "Both pixel and CAPI will fire the same events — without deduplication, you'll double-count conversions. Pass an identical event_id parameter in both the browser pixel event and the CAPI event. Meta automatically deduplicates events with matching event_id + event_name." },
          { text: "Verify Event Match Quality score is 6.0+ in Events Manager", tip: "Events Manager → Data Sources → Pixel → Overview. Check EMQ for each event. Below 6.0 means poor data matching — turn on Advanced Matching, add more customer parameters (email, phone, zip), and ensure CAPI is sending complete data. Target 8.0+ for best optimization." },
          { text: "Configure Aggregated Event Measurement and prioritize your top 8 events", tip: "Events Manager → Aggregated Event Measurement → Configure Web Events. Rank your 8 most important conversion events in priority order (Lead > Schedule > Contact > ViewContent, etc.). Required for tracking conversions from iOS 14+ users. Must have domain verified first." },
        ],
      },
      {
        name: "Audience Building",
        icon: "👥",
        tasks: [
          { text: "Create Custom Audience: All Website Visitors (180 days)", tip: "Your broadest retargeting pool. 180 days gives Meta more data to work with. You'll create tighter windows (30d, 7d) for specific retargeting campaigns later." },
          { text: "Create Custom Audience: Website Visitors — specific high-intent pages (30 days)", tip: "Create separate audiences for high-intent pages: pricing page visitors, service page visitors, contact page visitors. These are your hottest prospects and convert at the highest rate in retargeting." },
          { text: "Create Custom Audience: Video Viewers — 50%+ watched (365 days)", tip: "If someone watched half your video, they're genuinely interested. Use 365 days for the largest possible pool — Meta allows up to 365 days for engagement audiences. Great retargeting seed." },
          { text: "Create Custom Audience: Facebook/Instagram Page Engagers (365 days)", tip: "Anyone who liked, commented, shared, saved, or clicked on the page. Use the maximum 365-day window to build the largest pool. Warm and ready for offers." },
          { text: "Create Custom Audience: Lead Form Openers who didn't submit", tip: "These people started the form but abandoned. Retarget with a stronger offer, simpler form, or urgency messaging. This is one of your highest-converting retargeting audiences." },
          { text: "Upload Customer List as Custom Audience (emails + phones from CRM)", tip: "Export customer emails and phone numbers from CRM. Include as many data points as possible (name, city, state, zip) to improve match rates. Use for Lookalike seed audiences and for exclusion from cold prospecting." },
          { text: "Create Lookalike Audience: 1% from customer list, scoped to service area", tip: "1% Lookalike = people most similar to your best customers. Restrict to the geographic area the client actually serves. This is typically your best-performing cold audience for lead gen." },
          { text: "Create Lookalike Audience: 1% from website converters (Lead event)", tip: "People who look like people who already converted on the website. If you have 100+ converters, this Lookalike often outperforms the customer list Lookalike because the data is fresher." },
          { text: "Build interest + behavior + demographic stacks for cold prospecting", tip: "Layer interests (e.g., 'Home improvement' + 'Homeowner') with demographics and behaviors. Don't stack too narrow — audience sizes below 500K can limit delivery. Use these as an alternative to Lookalikes." },
          { text: "Create exclusion audiences: existing customers + recent converters (30–90 days)", tip: "Never waste money showing acquisition ads to people who already converted. Create a 'Converters - Last 30 Days' audience and exclude it from all prospecting and retargeting campaigns." },
          { text: "Test Advantage+ Audience with minimal targeting restrictions", tip: "Meta's AI-driven targeting often outperforms manual audiences when you have strong creative and sufficient pixel data (50+ conversions/month). Set up an ad set with only location targeting and let Meta's algorithm find converters. Compare performance against your manual audiences after 2 weeks." },
        ],
      },
      {
        name: "Campaign Structure & Setup",
        icon: "🎯",
        tasks: [
          { text: "Set geographic targeting to client's service area only", tip: "Campaign level → Locations. Target by city, DMA, state, or zip codes. CRITICAL: Select 'People living in this location' — not 'People living in or recently in this location' (the default includes travelers and wastes budget for local service businesses)." },
          { text: "Build TOF (Top of Funnel) campaign: Leads or Sales objective with broad/Lookalike audiences", tip: "Use the Leads or Sales objective even for prospecting — NOT Awareness or Reach. Modern Meta optimization works best when you tell it your actual business goal. Awareness campaigns optimize for impressions, not conversions, and waste budget for performance-focused campaigns." },
          { text: "Build MOF (Middle of Funnel) campaign: Leads objective targeting warm engagement audiences", tip: "Target video viewers (50%+), page engagers, and ad engagers. Drive them to the website with a compelling offer. These people know the brand — give them a reason to take action." },
          { text: "Build BOF (Bottom of Funnel) campaign: Leads objective targeting website visitors + form abandoners", tip: "Target your hottest audiences: website visitors (30d), pricing page visitors, form abandoners. Direct offer with strong CTA and urgency. This campaign typically delivers the lowest CPA." },
          { text: "Set campaign budget allocation: 60% TOF / 20% MOF / 20% BOF as starting ratio", tip: "Top of funnel needs the most budget because it feeds the entire pipeline. If your retargeting pools are small (<1,000 people), shift even more to TOF until they grow. Adjust ratios monthly based on which stage delivers the best CPA." },
          { text: "Use Advantage Campaign Budget (CBO) at the campaign level", tip: "Advantage Campaign Budget (formerly CBO) lets Meta distribute your daily budget across ad sets to maximize results. This outperforms manual ad set budgets in most cases. Set minimum spend per ad set if you need guaranteed delivery on specific audiences." },
          { text: "Configure Advantage+ Placements (recommended) or select manual placements", tip: "Advantage+ Placements lets Meta show ads across Facebook Feed, Instagram Feed, Stories, Reels, Messenger, and Audience Network automatically. Meta's algorithm allocates spend to the best-performing placements. Only restrict placements if you have a specific reason (e.g., your creative doesn't work in Stories format)." },
          { text: "Set conversion window: 7-day click, 1-day view for lead gen", tip: "This tells Meta's algorithm how far back to attribute conversions. 7-day click / 1-day view is the standard for lead gen. For high-ticket services with longer decision cycles, test 7-day click only (removes view-through attribution for cleaner data)." },
          { text: "Choose the right optimization event for each campaign", tip: "Always optimize for the action closest to revenue. Optimize for 'Leads' (form submissions) — NOT 'Link Clicks' or 'Landing Page Views.' Optimizing for clicks teaches Meta to find clickers, not buyers. If you have purchase/booking data, optimize for that instead." },
          { text: "Set up 2–3 ad sets per campaign to test audiences against each other", tip: "Test one variable at a time: different audiences in separate ad sets, but use the same creative across all ad sets. This isolates which audience performs best. Once you have a winner, consolidate budget." },
          { text: "Set ad scheduling based on business hours and conversion data (if applicable)", tip: "If the client can't respond to leads at 2am, consider day-parting to business hours only. However, Meta's algorithm often performs better with 24/7 delivery in the learning phase. Start with all hours, then restrict based on actual hourly conversion data after 2–4 weeks." },
        ],
      },
      {
        name: "Ad Creative & Copy",
        icon: "🎨",
        tasks: [
          { text: "Research competitor ads in Meta Ad Library before creating anything", tip: "Go to facebook.com/ads/library → search competitor business names. Filter by active ads. Ads running for 60+ days are likely profitable — study their hooks, offers, formats, and CTAs. This is free competitive intelligence." },
          { text: "Produce at least 2 short-form video ads (15–60 seconds, vertical 9:16)", tip: "Video dominates Meta — especially Reels and Stories placements. Hook viewers in the first 3 seconds with a bold claim, question, or visual pattern interrupt. Include captions — 85% of video is watched without sound." },
          { text: "Create UGC-style (user generated content) ads: talking head, testimonials, POV", tip: "UGC-style content outperforms polished branded ads 2–3x on average. Film with a phone camera, natural lighting, real people. Talking-head testimonials, 'day in the life' POVs, and before/after reveals perform best. Source from real customers, employees, or UGC creators." },
          { text: "Design static image ads: bold visual + short text overlay + clear CTA", tip: "Keep it simple: one image, one message, one CTA. High contrast, readable on mobile at thumbnail size. Use real photos of work, team, and results over stock imagery. Ensure text overlay is large enough to read on a phone screen." },
          { text: "Create carousel ads showcasing services, results, or testimonials", tip: "Each card should be self-contained with its own visual and headline. Use the first card as a hook to stop the scroll. Carousels work well for showing multiple services, before/after transformations, or step-by-step processes." },
          { text: "Write ad copy in 3 lengths: short (2–3 lines), medium (paragraph), long (story-based)", tip: "Different people respond to different lengths. Short: for retargeting (they already know you). Medium: for warm audiences. Long: for cold audiences who need context and persuasion. Lead with the pain point or benefit, never the feature." },
          { text: "Test 3–5 different hooks across your video and image creative", tip: "The hook (first line of copy / first 3 seconds of video) determines 80% of ad performance. Test: question hooks ('Tired of...?'), statistic hooks ('80% of homeowners...'), bold claim hooks ('We guarantee...'), before/after hooks, and controversy hooks ('Stop doing X')." },
          { text: "Enable Advantage+ Creative enhancements at the ad level", tip: "Advantage+ Creative automatically adjusts your creative for each viewer — it may add music to video, adjust brightness, swap text placement, or show different aspect ratios per placement. Enable it to let Meta optimize delivery. Review the auto-enhancements to ensure they don't distort your brand." },
          { text: "Create placement-specific creative: square (1:1) for Feed, vertical (9:16) for Stories/Reels", tip: "Don't force one aspect ratio everywhere — a landscape image gets cropped awkwardly in Stories. Upload separate assets for Feed (1:1 or 4:5) and Stories/Reels (9:16). Meta serves the right format to the right placement automatically." },
          { text: "Ensure all creative meets Meta ad policies: no restricted content, proper disclaimers", tip: "Review Meta's Advertising Standards at facebook.com/policies/ads. Common rejections: before/after images (health/beauty), personal attributes ('Are you overweight?'), misleading claims, and missing disclaimers. Get creative approved before scaling spend." },
        ],
      },
      {
        name: "Retargeting Setup",
        icon: "🎪",
        tasks: [
          { text: "Set up Layer 1: Engagement retargeting — video viewers + page engagers (35% of retargeting budget)", tip: "These people engaged with your content but haven't visited the website yet. Serve them educational content and social proof that drives them to the site. Use a different message than your prospecting ads — they already know you exist." },
          { text: "Set up Layer 2: Website visitor retargeting — all site visitors minus converters (40% of retargeting budget)", tip: "These people visited the website but didn't convert. Hit them with a direct offer, strong CTA, and urgency. Testimonials, case studies, and limited-time offers work best here. Use a 30-day window for the primary audience." },
          { text: "Set up Layer 3: Recovery retargeting — form abandoners + pricing page visitors (25% of retargeting budget)", tip: "The hottest retargeting audience. These people were one click away from converting. Use urgency messaging: 'Still thinking about it?', special offers, or simplified next steps. Shorter window (14 days) for highest intent." },
          { text: "Apply proper exclusion audiences across all retargeting layers", tip: "Exclude converters (Lead event, 30 days) from all layers. Cross-exclude between layers so people don't see overlapping ads: Layer 2 excludes Layer 3 audience, Layer 1 excludes Layer 2 audience. This ensures sequential messaging." },
          { text: "Set up sequential messaging so each layer tells a different part of the story", tip: "Layer 1: 'Here's why people trust us' (social proof). Layer 2: 'Here's our offer' (direct CTA). Layer 3: 'Last chance — limited spots' (urgency). Don't run the same ad across all layers — each touchpoint should advance the conversation." },
          { text: "Monitor frequency and rotate creative when it rises above 3.0", tip: "Check frequency in Ads Manager → Columns → Delivery. When frequency exceeds 3.0 per week and CTR drops, the audience is fatigued. Replace creative immediately — don't wait for performance to tank. Plan for new retargeting creative every 2–3 weeks." },
          { text: "Create fresh retargeting creative every 2–4 weeks to combat fatigue", tip: "Retargeting audiences are small, so they see ads more often and fatigue faster than prospecting audiences. Keep a creative production pipeline — schedule new creative before the old set burns out, not after." },
        ],
      },
      {
        name: "Optimization & Scaling",
        icon: "📈",
        tasks: [
          { text: "Respect the Learning Phase: don't edit campaigns for 3–7 days after launch", tip: "Meta needs approximately 50 conversion events per ad set per week to exit the Learning Phase. Every significant edit (budget, audience, creative, bid strategy) resets it. Check the 'Delivery' column — it will say 'Learning' or 'Learning Limited'." },
          { text: "Diagnose 'Learning Limited' status and fix root causes", tip: "Learning Limited means the ad set can't get 50 conversions/week. Fixes: increase budget, broaden audience, consolidate ad sets, optimize for an event higher in the funnel (e.g., Landing Page Views instead of Leads), or improve creative. Don't let ad sets stay Learning Limited — they underperform by 20–30%." },
          { text: "Monitor CPA and ROAS daily for the first 7 days after launch", tip: "Don't panic on Day 1 — CPAs are typically 2–3x higher during the learning phase. Track the trend, not individual days. If CPA is still 3x+ your target after 7 days and 2,000+ impressions, the audience or creative isn't working." },
          { text: "Kill ads with CTR below 1% (link click campaigns) or below 2% (engagement) after 1,000+ impressions", tip: "Low CTR = the creative isn't resonating. Replace it entirely with new creative — don't tweak headlines or minor copy changes. The visual hook is almost always the problem, not the body text." },
          { text: "Review Breakdown reports weekly: age, gender, placement, platform, device", tip: "Ads Manager → Breakdown → By Delivery. Find where your conversions actually come from. Common findings: 80% of leads from 25–54 age range, Instagram Reels outperforming Facebook Feed, or mobile dominating desktop. Cut segments that spend but don't convert." },
          { text: "Scale winning ad sets by increasing budget 20% every 3–4 days", tip: "Never increase budget more than 20% at a time — larger jumps can reset the learning phase and spike CPA. If an ad set is profitable at $50/day, scale: $60 → $72 → $86 → $103 over two weeks." },
          { text: "Duplicate winning ad sets for horizontal scaling into new audiences", tip: "Vertical scaling (budget increases) has limits. Horizontal scaling = take your winning creative and duplicate the ad set with a different audience. This expands reach without fatiguing your current audience." },
          { text: "Check audience overlap between ad sets using the Audience Overlap tool", tip: "Ads Manager → Audiences → Select 2+ audiences → Actions → Show Audience Overlap. If overlap exceeds 30%, the ad sets compete against each other in the auction, driving up costs. Consolidate overlapping audiences or exclude one from the other." },
          { text: "Test Cost Cap or Bid Cap bidding after collecting 50+ conversions", tip: "Start with Lowest Cost (default) to collect data. After 50+ conversions, test Cost Cap set at your target CPA — this prevents Meta from spending above your profitability threshold. Bid Cap is more aggressive and limits the bid per auction." },
          { text: "Set up automated rules for budget management and performance alerts", tip: "Ads Manager → Rules → Create Rule. Essential rules: pause ad if CPA > 2x target after $X spent; increase budget 20% if CPA < target for 3 consecutive days; send notification if daily spend exceeds $X. Automation prevents overspend when you're not watching." },
          { text: "Refresh creative every 2–4 weeks to combat ad fatigue", tip: "Monitor the 'Frequency' and 'CTR' trend lines. When frequency rises above 3 and CTR drops 20%+ from its peak, the creative is fatigued. Always have your next batch of creative ready before the current set burns out." },
          { text: "Review attribution settings and compare reporting windows monthly", tip: "Check Ads Manager → Columns → Comparing Windows. Compare 1-day click vs 7-day click attribution. This shows how many conversions happen immediately vs. days later — critical for understanding your true CPA and making accurate scaling decisions." },
          { text: "Build monthly Meta Ads report: spend, impressions, reach, leads, CPL, ROAS, and strategic insights", tip: "Show the full funnel: impressions → reach → clicks → leads → cost per lead. Include creative performance (which ads won), audience performance (which audiences converted), and placement breakdown. Compare month-over-month. End with what you're optimizing next and why." },
        ],
      },
    ],
  },
  {
    id: "tiktok-ads",
    name: "TikTok Ads",
    icon: "🎵",
    color: "#FF0050",
    description: "Set up TikTok Business Center, install tracking, build audiences, create campaigns, and produce scroll-stopping content that converts",
    sections: [
      {
        name: "Business Center & Account Setup",
        icon: "🏗",
        tasks: [
          { text: "Apply for TikTok Agency Center if managing multiple client accounts", tip: "Do this FIRST — agency accounts unlock centralized billing, higher spend limits, dedicated rep support, and bulk account management tools. Apply at ads.tiktok.com/i18n/agency. Approval takes 1–3 business days. Without this, you'll manage each client account individually with no cross-account visibility." },
          { text: "Create TikTok Business Center account at business-center.tiktok.com", tip: "Business Center is TikTok's version of Meta Business Manager. It houses ad accounts, pixels, catalogs, and team access under one roof. Create a separate Business Center for each client, or use your Agency Center to manage them centrally." },
          { text: "Create or claim an Ad Account inside Business Center", tip: "Business Center → Assets → Ad Accounts → Create. One ad account per client. If the client has an existing account, request them to grant Partner access through their Business Center rather than sharing login credentials." },
          { text: "Connect client's TikTok business profile to the ad account", tip: "Business Center → Assets → TikTok Accounts → Add. This enables Spark Ads (boosted organic posts) — which consistently outperform standard in-feed ads on TikTok with 30–50% higher completion rates and 140%+ higher engagement." },
          { text: "Verify the client's business domain in Business Center", tip: "Business Center → Settings → Domain Verification. Add a meta tag or DNS record to the client's website. Domain verification is required for Events API setup, improves pixel data reliability, and unlocks first-party data features." },
          { text: "Configure account-level settings: timezone, currency, and industry category", tip: "Set timezone to the client's local time zone so reporting aligns with their business hours. Set the correct industry category — TikTok uses this to benchmark your performance against competitors in the same vertical." },
          { text: "Set up billing with client's payment method", tip: "Add the client's credit card or set up auto-pay. Set a daily and lifetime account-level budget cap to prevent runaway spend. Never run client spend on your own card — it creates liability issues." },
          { text: "Enable two-factor authentication on all accounts", tip: "TikTok accounts are prime targets for hijacking. Enable 2FA for every team member with access. This prevents unauthorized access and is required by TikTok for accounts with significant ad spend." },
          { text: "Invite team members with appropriate roles (Admin, Operator, Analyst)", tip: "Give yourself Admin. Give campaign managers Operator access. Give the client Analyst (view-only). Use email-based invitations — never share login credentials. Review access quarterly and remove inactive users." },
          { text: "Establish naming conventions for campaigns, ad groups, and ads", tip: "Use a consistent format like [Objective]_[Audience]_[Creative-Type]_[Date] (e.g., Conv_LAL-Customers_UGC-Testimonial_Mar26). Consistent naming makes performance analysis, bulk editing, and reporting dramatically easier." },
        ],
      },
      {
        name: "TikTok Pixel & Events API",
        icon: "📡",
        tasks: [
          { text: "Create TikTok Pixel in Events Manager → Web Events → Create Pixel", tip: "Go to Assets → Events → Web Events → Create Pixel. Name it '[Client Name] Pixel.' Choose 'Manually Install Pixel Code' if using GTM, or 'Use Partner Integration' for Shopify/WordPress direct setup." },
          { text: "Deploy TikTok Pixel via Google Tag Manager (recommended method)", tip: "GTM is the industry standard for tag management — it lets you manage Google, Meta, AND TikTok pixels from one dashboard without touching site code. In GTM: Tags → New → Custom HTML → paste the TikTok base pixel code. Trigger: All Pages. This keeps your installation clean and maintainable." },
          { text: "Set up PageView event (fires automatically with base pixel code)", tip: "PageView fires on every page load and is the foundation for building website visitor audiences. Verify it fires on all pages, not just the homepage. This event is automatic once the base code is installed correctly." },
          { text: "Set up ViewContent event on key service/product/pricing pages", tip: "Fire ViewContent when someone views a high-value page (service details, pricing, product pages). This lets you build retargeting audiences of people who showed real interest but didn't convert — your highest-intent retargeting pool." },
          { text: "Set up CompleteRegistration / SubmitForm event for lead generation", tip: "Fire on form submission success — use a thank-you page URL rule or a GTM trigger that fires on the form submit JavaScript event. For Instant Forms, this is tracked automatically within TikTok. For website forms, verify the event fires only on successful submission, not on page load." },
          { text: "Set up ClickButton event on key CTAs (phone calls, email, book now)", tip: "Track clicks on your primary conversion buttons. In GTM, create Click triggers matching the CTA button CSS selectors. These micro-conversion events help TikTok's algorithm optimize even when macro-conversions (form submits) are low-volume." },
          { text: "Set up Contact or PlaceAnOrder events for additional conversion actions", tip: "Map every meaningful business action to a TikTok event. Phone calls = Contact event. Purchases = PlaceAnOrder. The more conversion signals you send, the better TikTok's algorithm understands your ideal customer." },
          { text: "Enable Advanced Matching to improve event attribution accuracy", tip: "In Events Manager → Pixel Settings → Enable Advanced Matching. This sends hashed first-party data (email, phone number) with pixel events so TikTok can match more conversions back to ad clicks — recovers 10–20% of conversions lost to cookie restrictions and ad blockers. Similar to Google's Enhanced Conversions and Meta's Advanced Matching." },
          { text: "Enable Events API (server-side tracking) for redundant conversion capture", tip: "Events API sends conversion data server-to-server, bypassing browser limitations entirely. Set up via partner integrations (Shopify, WordPress plugins) or direct API implementation. Run Events API alongside the browser pixel — TikTok deduplicates using event_id. This catches 15–30% of events that browser pixels miss due to ad blockers and iOS restrictions." },
          { text: "Install TikTok Pixel Helper Chrome extension and verify all events fire", tip: "Visit every key page with Pixel Helper active. Verify: PageView fires on all pages, ViewContent fires on service pages, SubmitForm fires on thank-you pages, ClickButton fires on CTAs. Green = good. Red = debug the trigger. Fix ALL issues before launching any ads." },
          { text: "Verify pixel data and event activity appear in Events Manager within 24–48 hours", tip: "Go to Assets → Events → check event activity. You should see event counts and match quality scores within 1–2 days. If no data appears, debug: check GTM tag firing, verify pixel ID matches, and confirm the website has real traffic. No tracking data = no optimization = wasted ad spend." },
        ],
      },
      {
        name: "Targeting & Audiences",
        icon: "🎯",
        tasks: [
          { text: "Create Custom Audience: Website Visitors — all visitors (30 days)", tip: "Requires pixel data to be flowing. This is your retargeting foundation on TikTok. Minimum audience size is 1,000 matched users for TikTok to serve ads to it — if the client's website traffic is low, extend the window to 60–90 days." },
          { text: "Create Custom Audience: Website Visitors — high-intent pages only (30 days)", tip: "Create a separate audience for visitors who viewed pricing, service, or contact pages. These are further down the funnel than general visitors and convert at higher rates. Use URL rules to filter by page path." },
          { text: "Create Custom Audience: Video Viewers — 50%+ watched (60 days)", tip: "TikTok viewers who watched half your video showed genuine interest — they're strong retargeting candidates. Also create a 75%+ and 100% watched audience for your highest-intent video viewers." },
          { text: "Create Custom Audience: TikTok Page Followers + Profile Visitors (60 days)", tip: "People who follow or visited the profile are already interested in the brand. Great for mid-funnel ads with direct offers. This audience refreshes automatically as new followers engage." },
          { text: "Create Custom Audience: Ad Engagement — users who liked, commented, or shared ads", tip: "These users actively engaged with your paid content — they're warmer than general video viewers. Create this audience at 30-day and 60-day windows for layered retargeting." },
          { text: "Upload Customer List as Custom Audience (emails + phones from CRM)", tip: "Export your best customer emails and phone numbers from CRM. TikTok matches against their user database (typically 30–60% match rate). Use this for: creating high-quality lookalikes, excluding existing customers from prospecting, and retargeting lapsed customers." },
          { text: "Create Lookalike Audiences at Narrow, Balanced, and Broad settings", tip: "TikTok offers three lookalike sizes: Narrow (most similar, smallest reach), Balanced (recommended starting point), and Broad (widest reach). Create lookalikes from your customer list AND website converters. Start testing with Balanced — TikTok's lookalikes need broader targeting than Meta's to perform well due to differences in the matching algorithm." },
          { text: "Build interest + behavior targeting audiences relevant to the niche", tip: "TikTok's interest targeting is less granular than Meta's — go broader and let the algorithm find converters. Layer 2–3 interest categories maximum. Use behavior targeting (video interactions, creator follows, hashtag engagement) to add intent signals without over-narrowing." },
          { text: "Create exclusion audiences: existing customers + recent converters (30 days)", tip: "Never waste money showing conversion ads to people who already converted. Upload your customer list as an exclusion, and create a 'Converted last 30 days' pixel audience to exclude from all prospecting and retargeting campaigns. Apply across every campaign — this is not optional." },
        ],
      },
      {
        name: "Campaign Structure",
        icon: "🏗",
        tasks: [
          { text: "Select the correct campaign objective for each business goal", tip: "TikTok campaign objectives: 'Website Conversions' for lead gen / purchases (most common for local businesses), 'Lead Generation' for in-app Instant Forms, 'Traffic' for driving website visits, 'Reach' for brand awareness. Always choose the objective that matches the actual business goal — don't optimize for Traffic when you want Leads." },
          { text: "Build Prospecting Campaign: 'Website Conversions' objective, broad/interest audiences", tip: "This is your top-of-funnel campaign. Target lookalike and interest-based audiences. Let TikTok's algorithm find converters — resist the urge to over-narrow targeting. Start with 2–3 ad groups testing different audiences, each with 3–5 creative variations." },
          { text: "Build Retargeting Campaign: target website visitors + video viewers + engagers", tip: "Show warm audiences a direct offer with urgency. They already know you — give them a reason to act now. Layer your retargeting: video viewers + page engagers in one ad group, website visitors in another, high-intent page visitors in a third." },
          { text: "Set up Lead Gen campaign with TikTok Instant Form (if applicable)", tip: "Instant Forms keep users on TikTok = 2–3x higher completion rates vs. landing pages. Use 'More Volume' form type for quantity or 'Higher Intent' form type with a review step for quality. Map all form fields to your CRM via webhook or Zapier — set up and test the integration BEFORE launching the campaign." },
          { text: "Connect Instant Form leads to CRM via webhook or Zapier integration", tip: "Go to Instant Form settings → Data Management → Webhooks. Set up the connection to GHL, HubSpot, or your CRM. Test with a dummy submission. Verify the lead appears in CRM within 60 seconds. Speed-to-lead matters — if leads sit uncontacted, even the best ads won't generate revenue." },
          { text: "Select placements: start with 'TikTok' only, expand after data collection", tip: "TikTok offers placements across TikTok, Pangle (audience network), and other partner apps. Start with TikTok placement only — it's the highest quality traffic and where your creative was designed to perform. After 2–4 weeks of data, test expanding to Pangle for incremental reach at lower CPMs." },
          { text: "Set geographic targeting to client's service area at the ad group level", tip: "Target by country, state, DMA, or city. TikTok doesn't support radius targeting — use zip codes or city-level targeting instead. For local businesses, target only the cities/regions actually served. Don't use 'Broad' geo targeting unless the client serves nationwide." },
          { text: "Set age, gender, and language targeting based on buyer persona", tip: "TikTok skews younger, but the 30–54 age group is the fastest-growing and highest-spending segment. Don't assume TikTok is only Gen Z. Start with your target demo based on CRM data — test broader after collecting 50+ conversions to let the algorithm expand intelligently." },
          { text: "Set daily budget per ad group: minimum $50–100 for learning phase optimization", tip: "TikTok's algorithm needs sufficient daily budget to exit the learning phase. The rule of thumb: set daily budget at 20x your expected CPA. If your target CPA is $25, budget $500/day per ad group. Below $50/day, the algorithm struggles to gather enough data to optimize. Underfunding is the #1 mistake on TikTok Ads." },
          { text: "Choose bid strategy: start with 'Lowest Cost' (auto-bid) for initial data collection", tip: "Lowest Cost lets TikTok find the cheapest conversions without a cap. Run this for the first 2–4 weeks to establish baseline CPA. After you have 50+ conversions per ad group per week, transition to Cost Cap set at your target CPA — this gives you cost control while maintaining volume." },
          { text: "Set conversion window: 7-day click, 1-day view (default recommended)", tip: "This tells TikTok which conversions to count and optimize toward. 7-day click + 1-day view captures most conversion paths. For longer sales cycles (B2B, high-ticket), extend to 28-day click. Shorter windows reduce reported conversions and starve the algorithm of learning signals." },
          { text: "Set ad schedule based on audience activity patterns and business hours", tip: "If nobody answers the phone after 6pm, don't run call-focused ads after 6pm. Start with 'Run ads all day' for the first 2 weeks to collect hourly data, then use TikTok Analytics to identify peak conversion hours and adjust scheduling accordingly." },
          { text: "Structure ad groups for testing: 3–5 creatives per ad group, max 3 ad groups per campaign", tip: "TikTok's algorithm performs best with 3–5 ads per ad group — enough variety for testing, not so many that budget spreads too thin. Keep ad groups to 2–3 per campaign to give each sufficient budget during learning phase. More ad groups = more budget needed." },
          { text: "Set up A/B Split Test for audiences or creative (use TikTok's built-in tool)", tip: "Campaign creation → Toggle on 'Create Split Test.' Test one variable at a time: different audiences OR different creative, never both simultaneously. TikTok evenly splits budget and traffic, then declares a statistically significant winner. Run tests for at least 7 days." },
        ],
      },
      {
        name: "Creative & Content Strategy",
        icon: "🎬",
        tasks: [
          { text: "Research top-performing TikTok ads in the niche using Creative Center", tip: "Go to ads.tiktok.com/business/creativecenter → Top Ads. Filter by industry, country, objective, and time period. Study what's working: hook styles, video length, pacing, CTAs. Research BEFORE filming — don't guess at what works when TikTok shows you real performance data." },
          { text: "Film 5–10 short-form videos in vertical 9:16 format (1080x1920px, 15–60 seconds)", tip: "TikTok ads must look like organic TikToks — not polished commercials. Shoot on a smartphone, use natural lighting, and feature real people. Keep videos between 21–34 seconds for optimal completion rates. File specs: .mp4 or .mov, max 500MB, minimum 720x1280 resolution." },
          { text: "Hook viewers in the first 1–2 seconds with a bold statement, question, or visual shock", tip: "'Stop overpaying for [service]' — 'Did you know 80% of homeowners make this mistake?' — 'POV: you just got your first quote.' The hook determines 80% of ad performance. The first frame must stop the scroll or nothing else matters." },
          { text: "Test multiple content formats: testimonial, before/after, POV, how-to, listicle, day-in-the-life", tip: "Different formats resonate with different segments. Testimonials build trust. Before/after shows proof. POV creates relatability. How-to positions expertise. Listicles ('3 things to know before hiring a [service]') drive high engagement. Create at least 2–3 different format types per campaign." },
          { text: "Create UGC-style (user generated content) ads — talking head, reaction, get-ready-with-me", tip: "People skip 'ad-looking' ads. Film as if you're making a TikTok for friends — phone camera, natural lighting, real people, casual tone. UGC-style ads average 2.4x higher completion rates than studio-produced creative on TikTok." },
          { text: "Use trending sounds and music from TikTok's Commercial Music Library", tip: "Go to TikTok Ads Manager → Creative Center → Trending Sounds. Using trending audio boosts distribution because TikTok's algorithm favors content using popular sounds. Only use sounds from the Commercial Music Library — regular TikTok sounds can trigger copyright claims on ads." },
          { text: "Add on-screen text, captions, and subtitles to every video (most users watch without sound)", tip: "85% of TikTok is consumed with sound off. Every piece of information that relies on audio MUST also appear as on-screen text. Use TikTok's auto-caption feature or CapCut's subtitle generator. Bold, high-contrast text with a background bar ensures readability." },
          { text: "Test 3–5 different hooks on the same core video (vary only the opening 2 seconds)", tip: "The hook determines whether someone watches or scrolls. Create 5 versions of the same ad body with different openings: question hook, statistic hook, controversial statement, before/after reveal, 'You need to see this.' Run all versions and let data pick the winner." },
          { text: "Select strong CTA buttons that match the conversion goal (Sign Up, Contact Us, Learn More, Get Quote)", tip: "TikTok offers CTA button options at the ad level. Match the button to the action: 'Get Quote' for service businesses, 'Sign Up' for lead gen forms, 'Learn More' for traffic campaigns. A clear CTA button increases click-through rate by 15–25% vs. no CTA button." },
          { text: "Create Spark Ads by boosting organic TikToks that already perform well", tip: "Spark Ads use an existing organic post as the ad — they keep all engagement (likes, comments, shares) and feel completely native. Average 142% higher engagement rate and 43% higher conversion rate than standard in-feed ads. Get the Spark Ad authorization code from the organic post → paste it in Ads Manager → run as an ad." },
        ],
      },
      {
        name: "Optimization & Scaling",
        icon: "📈",
        tasks: [
          { text: "Allow the learning phase to complete: 50 conversion events per ad group before optimizing", tip: "TikTok's learning phase ends after approximately 50 conversions per ad group — this typically takes 5–7 days with adequate budget. During this phase, performance will fluctuate wildly. Do NOT pause ads, change budgets, or edit targeting during learning. Resetting the learning phase wastes the data already collected." },
          { text: "Monitor CPA, CTR, and video view rate daily during the first 2 weeks", tip: "TikTok benchmarks: CTR above 1% is good (below 0.8% = kill the creative). 6-second view rate above 50% means the hook is working. CPA should stabilize after learning phase — if CPA is 3x your target after 50+ conversions, the audience or creative needs changing, not the budget." },
          { text: "Kill underperforming ads after 1,000+ impressions with CTR below 0.8%", tip: "Low CTR means the creative isn't stopping the scroll. Don't tweak it — replace it with a fundamentally different approach. Keep winning ads running and replace losers with fresh creative. Aim to always have 3–5 active ads per ad group." },
          { text: "Monitor ad frequency and refresh creative when frequency exceeds 4x per week", tip: "TikTok creative fatigues 2–3x faster than Meta or Google. When frequency rises above 4 and CTR drops, viewers are seeing the same ad too often. Have a content pipeline that produces 3–5 new videos every 2 weeks so you always have fresh creative ready to rotate in." },
          { text: "Replace underperforming and fatigued creative every 7–14 days", tip: "Creative lifespan on TikTok is 7–14 days on average before fatigue sets in. Plan for this from day one. Batch-film content sessions to build a library. The agencies that win on TikTok are the ones with a systematic creative production pipeline." },
          { text: "Scale winning ad groups by increasing budget 20–30% every 2–3 days", tip: "Gradual increases prevent performance crashes. Never increase budget more than 30% at a time — large jumps re-trigger the learning phase. If an ad group is crushing it at $100/day, go $120 → $150 → $180 over 6–9 days." },
          { text: "Test new audiences by duplicating winning creative into fresh ad groups (horizontal scaling)", tip: "Horizontal scaling: take your best-performing video and run it against a new audience in a new ad group. This expands reach without resetting the learning phase on your winners. Test lookalike audiences, interest-based audiences, and broader targeting progressively." },
          { text: "Review audience analytics: age, gender, device, time-of-day breakdown", tip: "TikTok Reporting → Breakdown. Check where conversions actually come from vs. where you assumed they'd come from. TikTok's audience may surprise you — the 25–45 age range often converts best for local services. Cut demographics and times that waste budget." },
          { text: "Manage comments and engagement on active ads to maintain social proof", tip: "Ad comments are public and influence whether new viewers trust the ad. Reply to positive comments to boost engagement signals. Hide or delete negative/spam comments promptly. Pin your best comment (testimonial, result) to the top. Active comment management improves ad performance and lowers CPA." },
          { text: "Transition to Cost Cap bidding after achieving 50+ conversions per week per ad group", tip: "Once you have enough conversion volume, switch from Lowest Cost to Cost Cap for cost control. Set your initial Cost Cap at your actual current CPA (not aspirational). Let it run for 7+ days before adjusting. Lower the cap in 10–15% increments — aggressive cap reductions tank delivery volume." },
          { text: "Build monthly TikTok report: impressions, video views, CTR, leads, CPL, engagement rate, ROAS", tip: "TikTok metrics differ from Google/Meta. Key metrics: video view rate (hook quality), CTR (creative resonance), CPL (efficiency), 6-second view rate (thumb-stop rate), engagement rate (content quality). Compare month-over-month trends. End with what's working, what's being tested, and what's planned next." },
        ],
      },
    ],
  },
  {
    id: "seo",
    name: "SEO",
    icon: "🌐",
    color: "#0F766E",
    description: "Technical SEO, on-page optimization, local SEO, content strategy, and link building for organic growth",
    sections: [
      {
        name: "Google Business Profile",
        icon: "📍",
        tasks: [
          { text: "Claim & verify GBP listing at business.google.com", tip: "If not claimed, verification usually takes 3–5 days by postcard or instant via phone/email for some businesses." },
          { text: "Choose the most specific primary category", tip: "Don't pick 'Contractor' when 'Roofing Contractor' exists. Specific categories = better rankings in map pack." },
          { text: "Add all relevant secondary categories (up to 9)", tip: "Use every category that genuinely applies. More categories = more search queries you can appear for." },
          { text: "Complete every field: name, address, phone, hours, description, services", tip: "Google rewards completeness. Fill out every single field available including service areas and attributes." },
          { text: "Upload 10+ high-quality photos (exterior, interior, team, work examples)", tip: "Businesses with photos get 42% more direction requests. Real photos only — no stock images." },
          { text: "Write a keyword-rich business description (750 characters)", tip: "Include primary services and location naturally. Don't keyword-stuff, but make sure core terms appear." },
          { text: "Post weekly GBP updates (offers, news, events, tips)", tip: "Regular posts signal to Google that the business is active. Set a recurring weekly reminder." },
          { text: "Add products/services with descriptions and pricing (if applicable)", tip: "The Products section appears prominently in GBP. Fill it out with real offerings and prices." },
        ],
      },
      {
        name: "Technical SEO",
        icon: "⚙️",
        tasks: [
          { text: "Run a full site crawl with Screaming Frog or Semrush Site Audit", tip: "This finds broken links, duplicate content, missing meta tags, and crawl issues. Fix critical errors first." },
          { text: "Submit XML sitemap to Google Search Console", tip: "Go to Search Console → Sitemaps → Add. Most CMS platforms auto-generate sitemaps at /sitemap.xml." },
          { text: "Fix all 404 errors — redirect or create missing pages", tip: "Broken pages waste crawl budget and frustrate users. 301 redirect old URLs to relevant live pages." },
          { text: "Ensure site loads in under 3 seconds on mobile (Core Web Vitals)", tip: "Use PageSpeed Insights. Optimize images, enable lazy loading, minimize CSS/JS, and use caching." },
          { text: "Verify mobile-first responsive design works on all screen sizes", tip: "Google uses mobile-first indexing. If it looks bad on mobile, your rankings will suffer." },
          { text: "Set up HTTPS / SSL certificate on all pages", tip: "Google flags non-HTTPS sites as 'Not Secure.' Most hosts offer free SSL via Let's Encrypt." },
          { text: "Fix duplicate content issues: canonical tags, redirect www vs non-www", tip: "Pick one version (www or non-www) and 301 redirect the other. Add canonical tags to prevent duplicates." },
          { text: "Ensure robots.txt isn't blocking important pages", tip: "Check [site]/robots.txt. Make sure key pages aren't accidentally disallowed from crawling." },
          { text: "Implement structured data / schema markup and validate", tip: "Add LocalBusiness, Service, FAQ, and Review schema. Validate with Google's Rich Results Test." },
        ],
      },
      {
        name: "NAP & Citations",
        icon: "🔗",
        tasks: [
          { text: "Audit existing citations for NAP inconsistencies", tip: "Search the business name + phone number. Every listing across the web should match exactly." },
          { text: "Fix all NAP discrepancies (name, address, phone)", tip: "Even small differences (St vs Street, Suite 100 vs #100) confuse Google and hurt local rankings." },
          { text: "Submit to core data aggregators (Foursquare, Data Axle, Localeze)", tip: "These feed data to hundreds of smaller directories. Start here for maximum citation impact." },
          { text: "Submit to Tier 1 directories: Google, Bing, Yelp, Apple Maps, Facebook, BBB", tip: "These are the most authoritative directories. Get them right before moving to niche sites." },
          { text: "Build industry-specific directory citations", tip: "Roofers: HomeAdvisor, Angi. Dentists: Healthgrades, Zocdoc. Lawyers: Avvo, FindLaw. Find the niche directories." },
          { text: "Set quarterly citation audit reminders", tip: "Citations drift over time. Data aggregators can overwrite your corrections. Re-audit every 3 months." },
        ],
      },
      {
        name: "Keyword Research",
        icon: "🔍",
        tasks: [
          { text: "Use Google Keyword Planner for seed keyword volume and competition", tip: "Start with '[service] [city]' combinations. Pull search volume, competition, and CPC data." },
          { text: "Mine Google Autocomplete and 'People Also Ask' for long-tail ideas", tip: "Type your seed keywords and note every suggestion. These are real searches with real demand." },
          { text: "Analyze competitor keywords with Semrush / Ahrefs / BrightLocal", tip: "See what your competitors rank for that you don't. These keyword gaps are your biggest opportunities." },
          { text: "Review Google Search Console for current ranking queries", tip: "Search Console → Performance. Find queries where you rank positions 5–20 — these are quick-win optimization targets." },
          { text: "Review GBP Insights for actual discovery search terms", tip: "GBP shows the exact terms people use to find the business. Align your content with these real searches." },
          { text: "Build a prioritized keyword list: high-intent commercial + informational", tip: "Commercial keywords ('roof repair Atlanta') drive leads. Informational ('how much does a new roof cost') build authority." },
          { text: "Map keywords to specific pages — one primary keyword per page", tip: "Don't optimize multiple pages for the same keyword (keyword cannibalization). Each page targets a unique term." },
        ],
      },
      {
        name: "On-Page SEO",
        icon: "📝",
        tasks: [
          { text: "Optimize title tags: [Primary Keyword] in [City] | [Business Name]", tip: "Keep under 60 characters. Put the keyword first, location second, brand last." },
          { text: "Write unique meta descriptions (150–160 chars) with keyword + CTA", tip: "Meta descriptions don't directly affect ranking but drive click-through rate. Include a call-to-action." },
          { text: "Use H1 tag with primary keyword on every page (one H1 per page)", tip: "The H1 should clearly state what the page is about. Use H2/H3 for subheadings with related keywords." },
          { text: "Write 800–1500+ words of unique content per service page", tip: "Thin content doesn't rank. Each service page needs substantial, unique copy that answers user questions." },
          { text: "Optimize images: descriptive alt text, compressed file size, descriptive filenames", tip: "Rename 'IMG_4832.jpg' to 'roof-repair-atlanta-before-after.jpg'. Compress to under 200KB." },
          { text: "Place NAP in footer on every page (clickable phone number)", tip: "Consistent NAP across all pages signals legitimacy to Google. Use schema markup on the footer NAP too." },
          { text: "Embed Google Map on the contact page", tip: "Use the GBP embed code. This creates a direct association between the website and the GBP listing." },
          { text: "Build internal linking structure between related pages", tip: "Every service page should link to related services and the contact page. Use descriptive anchor text." },
          { text: "Add clear CTAs above the fold on every service page", tip: "Don't make visitors scroll to find the phone number or contact form. CTA should be visible immediately." },
        ],
      },
      {
        name: "Content Strategy",
        icon: "✍️",
        tasks: [
          { text: "Create unique service pages for each core service offered", tip: "If the business does 5 services, it needs 5 separate pages. Don't lump everything onto one page." },
          { text: "Build location-specific landing pages for each area served", tip: "Each city or neighborhood gets its own page with unique content. No copy-paste — write unique copy for each." },
          { text: "Publish monthly blog posts targeting informational keywords", tip: "Answer the questions your target audience asks: 'How much does X cost?' 'How to choose a Y.' 'Signs you need Z.'" },
          { text: "Build FAQ pages from 'People Also Ask' research", tip: "Answer the exact questions people search on Google. Use FAQ schema markup for rich snippet eligibility." },
          { text: "Publish case studies with real project photos and results", tip: "Before/after photos, project details, client testimonials. This builds trust and targets long-tail keywords." },
          { text: "Create a local resources or community guide page", tip: "'Best [service] tips for [city] homeowners' — locally relevant content that earns local links and traffic." },
          { text: "Set up a content calendar: 2–4 posts per month minimum", tip: "Consistency matters more than volume. Plan topics a month ahead and stick to the schedule." },
        ],
      },
      {
        name: "Link Building",
        icon: "🔗",
        tasks: [
          { text: "Get listed in local Chamber of Commerce and business associations", tip: "Chamber websites have high domain authority. Most offer member listings with a dofollow link." },
          { text: "Earn links from local news sites and community blogs", tip: "Sponsor local events, offer expert quotes for articles, or write guest posts for community blogs." },
          { text: "Submit to niche-relevant resource pages and directories", tip: "Search '[niche] resources [city]' or '[niche] directory.' These curated pages pass real authority." },
          { text: "Create linkable assets: data studies, infographics, tools, guides", tip: "A 'Cost of [service] in [city] — 2026 Guide' earns links naturally from people researching prices." },
          { text: "Build relationships with complementary local businesses for link exchanges", tip: "A roofer links to a gutter company, they link back. Natural, relevant, and mutually beneficial." },
          { text: "Monitor backlink profile monthly with Ahrefs/Semrush", tip: "Track new links gained, check for toxic links, and disavow spammy backlinks that could hurt rankings." },
        ],
      },
      {
        name: "Reviews & Reputation",
        icon: "⭐",
        tasks: [
          { text: "Create a direct Google review link and share it with happy customers", tip: "Search 'Google review link generator' — get a short URL that opens directly to the review box." },
          { text: "Set up automated email/SMS review request sequences in GHL", tip: "Trigger 24 hours after service completion. Make it easy: one click to leave a review." },
          { text: "Respond to every Google review within 24 hours (positive and negative)", tip: "Responding shows Google and customers that the business cares. Thank positive reviewers, address negative professionally." },
          { text: "Build reviews on 2–3 additional platforms (Yelp, Facebook, industry sites)", tip: "Google isn't the only review site. Diversify across platforms relevant to the industry." },
          { text: "Implement review schema markup on the website", tip: "Display star ratings in search results. Use AggregateRating schema on the homepage or testimonials page." },
          { text: "Set a monthly review velocity target (aim for 4–8 new reviews/month)", tip: "Consistent review flow matters more than review count. Steady growth signals an active, trusted business." },
        ],
      },
      {
        name: "Schema Markup",
        icon: "🧩",
        tasks: [
          { text: "Implement LocalBusiness JSON-LD with specific subtype", tip: "Don't use generic 'LocalBusiness.' Use 'RoofingContractor', 'Dentist', 'Plumber' — the more specific the better." },
          { text: "Add Service schema for each service offered", tip: "Each service page gets its own Service schema with name, description, provider, and areaServed." },
          { text: "Implement FAQ schema on FAQ and Q&A pages", tip: "FAQ schema can earn you rich snippets — expanded answers directly in search results. Free visibility." },
          { text: "Add BreadcrumbList schema for site navigation", tip: "Breadcrumbs appear in search results showing the page hierarchy. Improves click-through rate." },
          { text: "Validate all schema with Google Rich Results Test", tip: "Paste each URL into Google's Rich Results Test. Fix all errors and warnings before moving on." },
        ],
      },
    ],
  },
  {
    id: "client-engagement",
    name: "Client Engagement & Retention",
    icon: "🎯",
    color: "#E8630A",
    description: "Win the handoff, set expectations, communicate with confidence, and keep clients long-term",
    sections: [
      {
        name: "Sales-to-Client Handoff",
        icon: "🤝",
        tasks: [
          { text: "Send welcome packet with services overview, timeline, and next steps", tip: "First impressions set the tone. A polished welcome email with a clear 'here's what happens next' builds instant confidence." },
          { text: "Schedule kickoff call within 48 hours of contract signing", tip: "Momentum matters. The longer the gap between signing and kickoff, the more buyer's remorse creeps in." },
          { text: "Collect all access credentials (social logins, website admin, GBP, ad accounts)", tip: "Use a secure form (not email). Missing access is the #1 reason onboarding stalls." },
          { text: "Complete client intake questionnaire (goals, past marketing, competitors, budget)", tip: "Ask about what they've tried before and why it failed. This prevents you from repeating their last agency's mistakes." },
          { text: "Confirm billing setup and first invoice sent", tip: "Get payment logistics locked down before you start work. Chasing invoices mid-project kills the relationship." },
          { text: "Introduce the client to their main point of contact on your team", tip: "Even if you're solo, set the expectation of who handles what. Clarity prevents 'who do I call?' confusion." },
        ],
      },
      {
        name: "Expectation Setting & Agreements",
        icon: "📋",
        tasks: [
          { text: "Define scope of work with specific deliverables and explicit exclusions", tip: "List what's IN and what's OUT. 'We manage Meta ads' is vague — '3 Meta campaigns, 12 ad creatives/month, weekly optimization' is clear." },
          { text: "Set realistic timeline expectations (SEO = 3–6 months, Ads = 2–4 weeks for data)", tip: "Under-promise, over-deliver. If you promise results in 30 days, you'll lose the client at day 31." },
          { text: "Agree on communication cadence (weekly updates, monthly calls)", tip: "Put it in writing: 'You'll receive a weekly email update every Monday and a monthly strategy call on the first Friday.'" },
          { text: "Establish success KPIs together — not just your metrics, their business goals", tip: "Ask: 'What number would make you feel this investment was worth it?' Then tie your reporting to that number." },
          { text: "Document approval workflows (who signs off on ads, content, spend changes)", tip: "Know who the decision-maker is. Getting creative approved by the wrong person wastes everyone's time." },
          { text: "Send signed scope of work / service agreement before any work begins", tip: "Never start without a signed agreement. It protects you and sets the professional tone." },
        ],
      },
      {
        name: "Client Communication & Reporting",
        icon: "📊",
        tasks: [
          { text: "Create a shared communication channel (Slack, email thread, or GHL portal)", tip: "Pick one channel and keep everything there. Scattered conversations across text, email, and DMs = lost context." },
          { text: "Send weekly progress snapshot (3–5 bullet points: done, doing, blocked)", tip: "Takes 5 minutes to write, saves hours of 'just checking in' messages from the client." },
          { text: "Prepare monthly performance report with metrics, insights, and next steps", tip: "Don't just dump numbers. Tell the story: what happened, why it matters, what you're doing about it." },
          { text: "Schedule monthly strategy call — come with data and recommendations", tip: "Never show up to a client call without an agenda. Lead with insights, not status updates." },
          { text: "Address client concerns within 24 hours, even if just to acknowledge receipt", tip: "You don't need to solve it instantly. 'Got it, looking into this and I'll have an answer by tomorrow' is enough." },
          { text: "Document every client interaction and decision in CRM notes", tip: "When a client says 'I never agreed to that,' your notes are your proof. Log everything." },
        ],
      },
      {
        name: "Retention & Growth",
        icon: "📈",
        tasks: [
          { text: "Check client satisfaction at 30, 60, and 90 days", tip: "Don't wait for them to complain. A simple 'How are you feeling about things so far?' catches problems early." },
          { text: "Identify upsell opportunities based on results and client needs", tip: "If ads are working, pitch SEO. If SEO is ranking, pitch reputation management. Let results open the door." },
          { text: "Proactively suggest strategy pivots when data supports a change", tip: "Clients respect agencies that bring ideas, not just execute orders. Be the strategist, not the task-doer." },
          { text: "Handle scope creep: acknowledge the request, document it, quote additional cost", tip: "'Great idea — that's outside our current scope. Here's what it would look like as an add-on.' Professional, not defensive." },
          { text: "Build a case study from client results (with their permission)", tip: "Case studies sell better than any pitch deck. Before/after numbers + client quote = powerful social proof." },
          { text: "Ask for referrals and testimonials after delivering strong results", tip: "The best time to ask is right after sharing a great report. 'Know anyone else who could use results like these?'" },
        ],
      },
    ],
  },
  {
    id: "delivery-ops",
    name: "Client Delivery Operations",
    icon: "⚡",
    color: "#0066FF",
    description: "Week-by-week delivery playbook from onboarding through ongoing optimization",
    sections: [
      {
        name: "Week 1–2: Client Onboarding",
        icon: "🔌",
        tasks: [
          { text: "Create GHL sub-account, apply onboarding snapshot", tip: "Use your agency snapshot template. This pre-loads pipelines, automations, and settings." },
          { text: "Connect Google My Business, Google Ads, Meta, TikTok via OAuth/integrations", tip: "Do this in GHL integrations. Ensure the client grants admin-level access to all platforms." },
          { text: "Add client contact with tags: new-client, services (seo, google-ads, meta-ads, tiktok-ads)", tip: "Tags help you segment and automate. Always tag on intake based on which services they purchased." },
          { text: "Trigger 'New Client Welcome Sequence' automation", tip: "This should send welcome email, onboarding form, and set up tasks for your team." },
          { text: "Set up Client Delivery Pipeline opportunity", tip: "Track delivery progress visually. Each phase = a pipeline stage." },
          { text: "Configure review request + missed-call text-back automations", tip: "These two automations alone justify the GHL subscription for most clients." },
          { text: "Build lead follow-up workflow: SMS (immediate) → Email (1hr) → Task (24hr)", tip: "Speed-to-lead is everything. Responding within 5 minutes gets 400% higher conversion rates." },
          { text: "Share GHL read-only dashboard link with client", tip: "Transparency builds trust. Let clients see their leads and stats in real time." },
        ],
      },
      {
        name: "Week 1–2: Audit & Strategy",
        icon: "🔍",
        tasks: [
          { text: "Create BrightLocal campaign with NAP + 10–20 target keywords", tip: "Pick keywords that match the client's actual services and locations." },
          { text: "Run Local Search Audit — save full PDF report as baseline", tip: "This becomes your baseline. Share with the client to show where they stand today." },
          { text: "Export NAP inconsistency list from Citation Tracker", tip: "This shows every directory where the business info is wrong. Fix these first." },
          { text: "Benchmark top 3–5 local competitors across all channels", tip: "Check their ads (Meta Ad Library, Google), reviews, citations, social content, and SEO rankings." },
          { text: "Audit GBP: categories, description, photos, Q&A, posts", tip: "Go through every field. Most businesses have a half-complete GBP." },
          { text: "Install all tracking pixels (Google, Meta, TikTok) + verify events fire", tip: "No tracking = no proof of results. Install and verify every pixel before any ads go live." },
          { text: "Map the full customer funnel and define conversion actions per channel", tip: "What does a 'conversion' mean on each platform? Form submit, phone call, booking — define it upfront." },
        ],
      },
      {
        name: "Week 2–3: Build & Configure",
        icon: "🛠",
        tasks: [
          { text: "Optimize GBP fully: all fields, 10+ photos, weekly posts scheduled", tip: "This alone can move local rankings within 2–4 weeks for many businesses." },
          { text: "Submit Tier 1 citations (Google, Bing, Yelp, Apple Maps, Facebook, BBB)", tip: "These are the most important directories. Get these right first." },
          { text: "Start Tier 2 citations via BrightLocal Citation Builder", tip: "Automate the bulk submissions. Aim for 40–80 total citations." },
          { text: "Set up rank tracking in BrightLocal (local pack + organic)", tip: "Track both map pack and organic positions. Check weekly for movement." },
          { text: "Build Google Ads campaigns per the Google Ads guide", tip: "Follow the Google Ads guide for detailed campaign setup: Brand, High-Intent, and Competitor campaigns." },
          { text: "Build Meta Ads campaigns per the Meta Ads guide", tip: "Follow the Meta Ads guide: TOF/MOF/BOF structure with proper audiences and creative." },
          { text: "Build TikTok Ads campaigns per the TikTok Ads guide (if applicable)", tip: "Follow the TikTok Ads guide for campaign setup and creative production." },
          { text: "Activate reputation monitoring in BrightLocal", tip: "Get alerts for new reviews across all platforms. Respond within 24 hours." },
        ],
      },
      {
        name: "Week 3–4: Launch",
        icon: "🚀",
        tasks: [
          { text: "Set all ad campaigns ACTIVE — verify delivering impressions on each platform", tip: "Check within 2 hours of launch. If no impressions on any platform, debug immediately." },
          { text: "Capture Day 0 ranking baseline snapshot in BrightLocal", tip: "Screenshot everything. You'll use this for month-1 reporting to show improvement." },
          { text: "Verify call tracking number forwards correctly (GHL)", tip: "Call the tracking number yourself. Make sure it rings the client's phone correctly." },
          { text: "Publish first GBP weekly post", tip: "Start the weekly cadence now. Set a recurring reminder." },
          { text: "Move GHL pipeline to 'Active — Month 1'", tip: "This keeps your team organized on who's in what delivery phase." },
          { text: "Send launch confirmation email to client via GHL", tip: "Confirm what's live, what to expect in the first 2–4 weeks, and when the first report comes." },
        ],
      },
      {
        name: "Month 2+: Optimize & Grow",
        icon: "📈",
        tasks: [
          { text: "Weekly: Review Search Terms + pause underperforming ads across all platforms", tip: "Check Google search terms, Meta ad performance, TikTok creative metrics. Cut what's not working." },
          { text: "Weekly: Publish 1 GBP post + respond to all reviews within 24hrs", tip: "Consistency beats intensity. One post per week, every week, plus review responses." },
          { text: "Weekly: Check citation build progress — target +10 new/month", tip: "Build citations steadily until you hit 80+ total across directories." },
          { text: "Weekly: Refresh ad creative on Meta and TikTok (creative fatigues fast)", tip: "Plan for new creative every 2–4 weeks. Have a content production pipeline in place." },
          { text: "Monthly: Pull ranking, reputation, and ad performance reports", tip: "Combine BrightLocal rankings + Google/Meta/TikTok ad reports into one unified client report." },
          { text: "Monthly: Compile and send consolidated client report via GHL", tip: "Automate delivery. Include rankings, reviews, leads, ad spend, and ROI. Tell the story, not just numbers." },
          { text: "Monthly: 30-min check-in call — log notes in GHL contact", tip: "Never skip the check-in. This is where you prevent churn and identify upsell opportunities." },
          { text: "Quarterly: Full audit, strategy refresh, and goal reset across all channels", tip: "Every 3 months, re-audit everything. Markets change, algorithms update, strategies must adapt." },
        ],
      },
    ],
  },
];

// ─── THEME ─────────────────────────────────────────────────────────────────────
const T = {
  bg: "#06080C",
  surface: "#0E1117",
  surfaceRaised: "#151A23",
  surfaceHover: "#1B2230",
  accent: "#FF6B2B",
  accentSoft: "rgba(255,107,43,0.12)",
  accentGlow: "rgba(255,107,43,0.25)",
  green: "#22C55E",
  greenSoft: "rgba(34,197,94,0.12)",
  text: "#E8ECF1",
  textSec: "#8B95A5",
  textDim: "#555F6F",
  border: "rgba(255,255,255,0.06)",
  borderLight: "rgba(255,255,255,0.1)",
};

const FONT = `'Outfit', 'DM Sans', system-ui, sans-serif`;
const MONO = `'JetBrains Mono', 'Fira Code', monospace`;

// ─── STORAGE HELPERS (localStorage for Cursor / local dev) ─────────────────────
const STORAGE_KEY = "agency-z2h:projects";

function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) { console.error("Save failed:", e); }
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function ProgressRing({ pct, size = 40, stroke = 3.5, color = T.accent }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dasharray 0.5s cubic-bezier(.4,0,.2,1)" }} />
      <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle"
        fill={pct === 100 ? T.green : color} fontSize={size * 0.26} fontFamily={MONO} fontWeight="600">
        {pct}
      </text>
    </svg>
  );
}

// ─── DASHBOARD VIEW ────────────────────────────────────────────────────────────

function Dashboard({ projects, onCreate, onOpen }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), niche.trim() || "General");
    setName(""); setNiche(""); setShowForm(false);
  };

  return (
    <div style={{ padding: "48px 24px", maxWidth: 860, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 48, textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: T.accentSoft, border: `1px solid ${T.accent}33`,
          borderRadius: 100, padding: "6px 18px 6px 14px", marginBottom: 20,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent, boxShadow: `0 0 10px ${T.accentGlow}` }} />
          <span style={{ fontSize: 11, fontFamily: MONO, color: T.accent, letterSpacing: "0.08em", fontWeight: 600 }}>
            AGENCY OS
          </span>
        </div>
        <h1 style={{
          fontSize: 42, fontWeight: 800, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 10,
          fontFamily: `'Syne', ${FONT}`,
        }}>
          Zero → Hero
        </h1>
        <p style={{ fontSize: 15, color: T.textSec, lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
          Run every client through the same proven execution framework. 6 interactive guides — Google Ads, Meta Ads, TikTok Ads, SEO, Client Engagement, and Delivery Ops.
        </p>
      </div>

      {/* Create Button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          width: "100%", padding: "18px 24px", marginBottom: 32,
          background: `linear-gradient(135deg, ${T.accent}18, ${T.accent}08)`,
          border: `1px dashed ${T.accent}44`, borderRadius: 16, cursor: "pointer",
          transition: "all 0.25s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = `linear-gradient(135deg, ${T.accent}28, ${T.accent}12)`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${T.accent}44`; e.currentTarget.style.background = `linear-gradient(135deg, ${T.accent}18, ${T.accent}08)`; }}
        >
          <span style={{ fontSize: 24, color: T.accent }}>+</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: T.accent }}>Create New Project</span>
        </button>
      )}

      {/* Create Form */}
      {showForm && (
        <div style={{
          padding: 28, marginBottom: 32, borderRadius: 16,
          background: T.surfaceRaised, border: `1px solid ${T.accent}33`,
          boxShadow: `0 0 40px ${T.accent}10`,
        }}>
          <div style={{ fontSize: 11, fontFamily: MONO, color: T.accent, letterSpacing: "0.1em", marginBottom: 16, fontWeight: 600 }}>
            NEW PROJECT
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, color: T.textSec, marginBottom: 6, fontWeight: 500 }}>
              Client / Company Name *
            </label>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Atlanta Roofing Pros"
              autoFocus
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                background: T.surface, border: `1px solid ${T.borderLight}`,
                color: T.text, fontSize: 15, fontFamily: FONT, outline: "none",
              }}
              onFocus={e => e.target.style.borderColor = T.accent}
              onBlur={e => e.target.style.borderColor = T.borderLight}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, color: T.textSec, marginBottom: 6, fontWeight: 500 }}>
              Business Niche
            </label>
            <input value={niche} onChange={e => setNiche(e.target.value)}
              placeholder="e.g. Roofing, Dentist, SaaS, Gym"
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                background: T.surface, border: `1px solid ${T.borderLight}`,
                color: T.text, fontSize: 15, fontFamily: FONT, outline: "none",
              }}
              onFocus={e => e.target.style.borderColor = T.accent}
              onBlur={e => e.target.style.borderColor = T.borderLight}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleCreate} style={{
              flex: 1, padding: "12px 20px", borderRadius: 10,
              background: T.accent, border: "none", color: "#fff",
              fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: FONT,
            }}>
              Create Project
            </button>
            <button onClick={() => { setShowForm(false); setName(""); setNiche(""); }} style={{
              padding: "12px 20px", borderRadius: 10,
              background: "transparent", border: `1px solid ${T.borderLight}`,
              color: T.textSec, fontSize: 14, cursor: "pointer", fontFamily: FONT,
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Project List */}
      {projects.length === 0 && !showForm && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: T.textDim }}>
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}>📂</div>
          <div style={{ fontSize: 15, marginBottom: 6 }}>No projects yet</div>
          <div style={{ fontSize: 13 }}>Create your first project to get started</div>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {projects.map(proj => {
          const totalTasks = GUIDE_TEMPLATES.reduce((sum, g) => sum + g.sections.reduce((s2, sec) => s2 + sec.tasks.length, 0), 0);
          const doneTasks = Object.values(proj.checked || {}).filter(Boolean).length;
          const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
          return (
            <button key={proj.id} onClick={() => onOpen(proj.id)} style={{
              display: "flex", alignItems: "center", gap: 18,
              padding: "20px 24px", borderRadius: 14,
              background: T.surfaceRaised, border: `1px solid ${T.border}`,
              cursor: "pointer", transition: "all 0.2s ease", width: "100%", textAlign: "left",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderLight; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <ProgressRing pct={pct} size={48} stroke={4} color={pct === 100 ? T.green : T.accent} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 3 }}>{proj.name}</div>
                <div style={{ fontSize: 12, color: T.textDim }}>{proj.niche}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontFamily: MONO, fontWeight: 600, color: pct === 100 ? T.green : T.accent }}>
                  {doneTasks}/{totalTasks}
                </div>
                <div style={{ fontSize: 11, color: T.textDim }}>tasks</div>
              </div>
              <span style={{ fontSize: 18, color: T.textDim }}>›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── PROJECT VIEW ──────────────────────────────────────────────────────────────

function ProjectView({ project, onBack, onUpdate }) {
  const [activeGuide, setActiveGuide] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTip, setActiveTip] = useState(null);
  const [aiHelp, setAiHelp] = useState({});
  const [aiLoading, setAiLoading] = useState(null);
  const [userNotes, setUserNotes] = useState(project.notes || {});
  const [editingNote, setEditingNote] = useState(null);
  const noteSaveTimer = useRef(null);

  const guide = GUIDE_TEMPLATES[activeGuide];
  const checked = project.checked || {};

  const toggleCheck = (key) => {
    const newChecked = { ...checked, [key]: !checked[key] };
    onUpdate({ ...project, checked: newChecked });
  };

  const saveNote = (key, value) => {
    const newNotes = { ...userNotes, [key]: value };
    setUserNotes(newNotes);
    clearTimeout(noteSaveTimer.current);
    noteSaveTimer.current = setTimeout(() => {
      onUpdate({ ...project, notes: newNotes });
    }, 800);
  };

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: prev[key] === false ? true : prev[key] === undefined ? false : !prev[key] }));
  };

  const getGuideProgress = (guideIdx) => {
    const g = GUIDE_TEMPLATES[guideIdx];
    let total = 0, done = 0;
    g.sections.forEach((sec, si) => {
      sec.tasks.forEach((_, ti) => {
        total++;
        if (checked[`${g.id}-${si}-${ti}`]) done++;
      });
    });
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const getSectionProgress = (guideId, si, section) => {
    let done = 0;
    section.tasks.forEach((_, ti) => { if (checked[`${guideId}-${si}-${ti}`]) done++; });
    return { done, total: section.tasks.length };
  };

  const handleAiHelp = async (taskText, taskKey) => {
    setAiLoading(taskKey);
    try {
      // ── Option A: Use a local backend proxy (recommended for production) ──
      // Set up a /api/ai route in your backend that adds the API key server-side.
      // See server.js included in this project.
      //
      // ── Option B: Direct API call for quick prototyping ──
      // Create a .env file with VITE_ANTHROPIC_API_KEY=sk-ant-...
      // ⚠️ This exposes the key in the browser — only use for local dev!

      const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || "";
      const USE_PROXY = !API_KEY; // falls back to /api/ai if no key set

      const url = USE_PROXY ? "/api/ai" : "https://api.anthropic.com/v1/messages";
      const headers = { "Content-Type": "application/json" };
      if (API_KEY) {
        headers["x-api-key"] = API_KEY;
        headers["anthropic-version"] = "2023-06-01";
        headers["anthropic-dangerous-direct-browser-access"] = "true";
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are an expert SEO and digital marketing consultant helping a marketing agency execute their client strategy.

Client name: ${project.name}
Client niche: ${project.niche}

Task: ${taskText}

Explain what this task means in practical terms and provide 3 specific, actionable examples relevant to a ${project.niche} business. Keep it concise and useful. Format with clear sections.`
          }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map(c => c.text || "").join("\n") || "Unable to generate help.";
      setAiHelp(prev => ({ ...prev, [taskKey]: text }));
    } catch (err) {
      setAiHelp(prev => ({ ...prev, [taskKey]: "AI help is currently unavailable. Add your API key to .env (VITE_ANTHROPIC_API_KEY=sk-ant-...) or set up the /api/ai proxy." }));
    }
    setAiLoading(null);
  };

  const totalAll = GUIDE_TEMPLATES.reduce((s, g) => s + g.sections.reduce((s2, sec) => s2 + sec.tasks.length, 0), 0);
  const doneAll = Object.values(checked).filter(Boolean).length;
  const totalPct = Math.round((doneAll / totalAll) * 100);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* ── SIDEBAR ── */}
      <div style={{
        width: 280, flexShrink: 0, background: T.surface,
        borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column",
        overflowY: "auto",
      }}>
        {/* Back + Project Info */}
        <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${T.border}` }}>
          <button onClick={onBack} style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "none", color: T.textSec, cursor: "pointer",
            fontSize: 12, fontFamily: FONT, marginBottom: 14, padding: 0,
          }}>
            <span style={{ fontSize: 16 }}>←</span> All Projects
          </button>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 2 }}>{project.name}</div>
          <div style={{
            display: "inline-block", fontSize: 10, fontFamily: MONO, color: T.accent,
            background: T.accentSoft, padding: "3px 8px", borderRadius: 6, fontWeight: 600,
            letterSpacing: "0.04em",
          }}>
            {project.niche}
          </div>
        </div>

        {/* Overall Progress */}
        <div style={{ padding: "16px 18px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontFamily: MONO, color: T.textDim, letterSpacing: "0.06em" }}>OVERALL</span>
            <span style={{ fontSize: 12, fontFamily: MONO, fontWeight: 600, color: totalPct === 100 ? T.green : T.accent }}>
              {totalPct}%
            </span>
          </div>
          <div style={{ height: 4, background: T.surfaceRaised, borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2,
              width: `${totalPct}%`,
              background: totalPct === 100 ? T.green : `linear-gradient(90deg, ${T.accent}, #FF9F43)`,
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        {/* Guide Nav */}
        <div style={{ flex: 1, padding: "12px 10px" }}>
          <div style={{ fontSize: 9, fontFamily: MONO, color: T.textDim, letterSpacing: "0.12em", padding: "0 8px", marginBottom: 10 }}>
            GUIDES
          </div>
          {GUIDE_TEMPLATES.map((g, i) => {
            const prog = getGuideProgress(i);
            const active = activeGuide === i;
            return (
              <button key={g.id} onClick={() => setActiveGuide(i)} style={{
                display: "flex", alignItems: "center", gap: 12,
                width: "100%", padding: "12px 12px", marginBottom: 4, borderRadius: 10,
                background: active ? `${g.color}15` : "transparent",
                border: `1px solid ${active ? `${g.color}30` : "transparent"}`,
                cursor: "pointer", transition: "all 0.2s", textAlign: "left",
              }}>
                <ProgressRing pct={prog.pct} size={34} stroke={3} color={prog.pct === 100 ? T.green : g.color} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 12, fontWeight: 600,
                    color: active ? T.text : T.textSec,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{g.name}</div>
                  <div style={{ fontSize: 10, fontFamily: MONO, color: T.textDim }}>
                    {prog.done}/{prog.total}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px", maxHeight: "100vh" }}>
        {/* Guide Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 10, fontFamily: MONO, color: guide.color, letterSpacing: "0.1em",
            background: `${guide.color}12`, padding: "5px 12px", borderRadius: 6,
            marginBottom: 12, fontWeight: 600,
          }}>
            <span>{guide.icon}</span> GUIDE {activeGuide + 1} OF {GUIDE_TEMPLATES.length}
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: T.text, letterSpacing: "-0.02em", marginBottom: 6, fontFamily: `'Syne', ${FONT}` }}>
            {guide.name}
          </h2>
          <p style={{ fontSize: 14, color: T.textSec, lineHeight: 1.5 }}>{guide.description}</p>
        </div>

        {/* Sections */}
        {guide.sections.map((section, si) => {
          const sKey = `${guide.id}-s${si}`;
          const isExpanded = expandedSections[sKey] !== false;
          const prog = getSectionProgress(guide.id, si, section);
          const sectionDone = prog.done === prog.total && prog.total > 0;

          return (
            <div key={sKey} style={{ marginBottom: 12 }}>
              {/* Section Header */}
              <button onClick={() => toggleSection(sKey)} style={{
                display: "flex", alignItems: "center", gap: 14, width: "100%",
                padding: "14px 18px", borderRadius: isExpanded ? "12px 12px 0 0" : 12,
                background: T.surfaceRaised,
                border: `1px solid ${sectionDone ? `${T.green}33` : T.border}`,
                borderBottom: isExpanded ? `1px solid ${T.border}` : undefined,
                cursor: "pointer", transition: "all 0.2s", textAlign: "left",
              }}>
                <span style={{ fontSize: 18 }}>{section.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: sectionDone ? T.green : T.text }}>{section.name}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    fontSize: 11, fontFamily: MONO, fontWeight: 600,
                    color: sectionDone ? T.green : T.textDim,
                  }}>
                    {prog.done}/{prog.total}
                    {sectionDone && " ✓"}
                  </span>
                  <span style={{
                    fontSize: 14, color: T.textDim, transition: "transform 0.25s",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                    display: "inline-block",
                  }}>▾</span>
                </div>
              </button>

              {/* Tasks */}
              {isExpanded && (
                <div style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`, borderTop: "none",
                  borderRadius: "0 0 12px 12px",
                  padding: "8px 12px 12px",
                }}>
                  {section.tasks.map((task, ti) => {
                    const taskKey = `${guide.id}-${si}-${ti}`;
                    const isDone = !!checked[taskKey];
                    const tipOpen = activeTip === taskKey;
                    const aiContent = aiHelp[taskKey];
                    const isAiLoading = aiLoading === taskKey;
                    const noteVal = userNotes[taskKey] || "";

                    return (
                      <div key={taskKey} style={{ marginBottom: 4 }}>
                        {/* Task Row */}
                        <div style={{
                          display: "flex", alignItems: "flex-start", gap: 12,
                          padding: "12px 14px", borderRadius: 10,
                          cursor: "pointer", transition: "all 0.15s",
                          background: isDone ? `${T.green}08` : "transparent",
                        }}
                          onMouseEnter={e => { if (!isDone) e.currentTarget.style.background = T.surfaceHover; }}
                          onMouseLeave={e => { e.currentTarget.style.background = isDone ? `${T.green}08` : "transparent"; }}
                        >
                          {/* Checkbox */}
                          <div onClick={() => toggleCheck(taskKey)} style={{
                            width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                            border: isDone ? `2px solid ${T.green}` : `2px solid ${T.borderLight}`,
                            background: isDone ? `${T.green}22` : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s", cursor: "pointer",
                          }}>
                            {isDone && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke={T.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>

                          {/* Task Content */}
                          <div style={{ flex: 1, minWidth: 0 }} onClick={() => toggleCheck(taskKey)}>
                            <div style={{
                              fontSize: 13.5, lineHeight: 1.5, fontWeight: 400,
                              color: isDone ? T.textDim : T.text,
                              textDecoration: isDone ? "line-through" : "none",
                              transition: "all 0.2s",
                            }}>{task.text}</div>
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: "flex", gap: 6, flexShrink: 0, marginTop: 2 }}>
                            <button onClick={(e) => { e.stopPropagation(); setActiveTip(tipOpen ? null : taskKey); }}
                              style={{
                                padding: "3px 8px", borderRadius: 6, fontSize: 10, fontFamily: MONO,
                                background: tipOpen ? `${guide.color}22` : T.surfaceRaised,
                                border: `1px solid ${tipOpen ? `${guide.color}44` : T.border}`,
                                color: tipOpen ? guide.color : T.textDim, cursor: "pointer",
                                fontWeight: 600, letterSpacing: "0.04em",
                              }}>
                              tip
                            </button>
                            <button onClick={(e) => {
                              e.stopPropagation();
                              if (!aiContent && !isAiLoading) handleAiHelp(task.text, taskKey);
                              else if (aiContent) setAiHelp(prev => { const n = { ...prev }; delete n[taskKey]; return n; });
                            }}
                              style={{
                                padding: "3px 8px", borderRadius: 6, fontSize: 10, fontFamily: MONO,
                                background: aiContent ? `${T.accent}22` : T.surfaceRaised,
                                border: `1px solid ${aiContent ? `${T.accent}44` : T.border}`,
                                color: aiContent ? T.accent : T.textDim, cursor: "pointer",
                                fontWeight: 600, letterSpacing: "0.04em",
                              }}>
                              {isAiLoading ? "..." : "AI"}
                            </button>
                          </div>
                        </div>

                        {/* Tip */}
                        {tipOpen && task.tip && (
                          <div style={{
                            marginLeft: 46, marginTop: 2, marginBottom: 4,
                            padding: "10px 14px", borderRadius: "0 8px 8px 0",
                            background: `${guide.color}0C`,
                            borderLeft: `3px solid ${guide.color}55`,
                            fontSize: 12.5, color: T.textSec, lineHeight: 1.6,
                          }}>
                            {task.tip}
                          </div>
                        )}

                        {/* AI Help */}
                        {aiContent && (
                          <div style={{
                            marginLeft: 46, marginTop: 2, marginBottom: 4,
                            padding: "14px 16px", borderRadius: "0 10px 10px 0",
                            background: `${T.accent}08`,
                            borderLeft: `3px solid ${T.accent}55`,
                          }}>
                            <div style={{ fontSize: 9, fontFamily: MONO, color: T.accent, letterSpacing: "0.08em", marginBottom: 8, fontWeight: 600 }}>
                              AI GUIDANCE — {project.niche.toUpperCase()}
                            </div>
                            <div style={{ fontSize: 12.5, color: T.textSec, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                              {aiContent}
                            </div>
                          </div>
                        )}

                        {/* Note Input */}
                        {editingNote === taskKey ? (
                          <div style={{ marginLeft: 46, marginTop: 4, marginBottom: 6 }}>
                            <textarea
                              value={noteVal}
                              onChange={e => saveNote(taskKey, e.target.value)}
                              onBlur={() => setEditingNote(null)}
                              autoFocus
                              placeholder="Write your notes for this step..."
                              style={{
                                width: "100%", minHeight: 60, padding: "10px 12px", borderRadius: 8,
                                background: T.surfaceRaised, border: `1px solid ${T.borderLight}`,
                                color: T.text, fontSize: 13, fontFamily: FONT, resize: "vertical",
                                outline: "none", lineHeight: 1.5,
                              }}
                              onFocus={e => e.target.style.borderColor = guide.color}
                            />
                          </div>
                        ) : noteVal ? (
                          <div onClick={() => setEditingNote(taskKey)} style={{
                            marginLeft: 46, marginTop: 4, marginBottom: 6,
                            padding: "8px 12px", borderRadius: 8,
                            background: T.surfaceRaised, cursor: "pointer",
                            fontSize: 12.5, color: T.textSec, lineHeight: 1.5,
                            border: `1px solid ${T.border}`,
                          }}>
                            {noteVal}
                          </div>
                        ) : (
                          <button onClick={() => setEditingNote(taskKey)} style={{
                            marginLeft: 46, marginTop: 2, marginBottom: 4,
                            background: "none", border: "none",
                            fontSize: 11, color: T.textDim, cursor: "pointer",
                            fontFamily: FONT, padding: "2px 0",
                          }}>
                            + Add notes
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Guide Complete */}
        {getGuideProgress(activeGuide).pct === 100 && (
          <div style={{
            marginTop: 24, padding: 28, borderRadius: 16, textAlign: "center",
            background: `linear-gradient(135deg, ${T.green}10, ${T.green}05)`,
            border: `1px solid ${T.green}33`,
          }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>✓</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.green, marginBottom: 4, fontFamily: `'Syne', ${FONT}` }}>
              {guide.name} — Complete!
            </div>
            <div style={{ fontSize: 13, color: T.textSec }}>
              All tasks in this guide are done.
              {activeGuide < GUIDE_TEMPLATES.length - 1 && " Move on to the next guide."}
            </div>
            {activeGuide < GUIDE_TEMPLATES.length - 1 && (
              <button onClick={() => setActiveGuide(activeGuide + 1)} style={{
                marginTop: 14, padding: "10px 24px", borderRadius: 10,
                background: `${T.green}18`, border: `1px solid ${T.green}44`,
                color: T.green, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
              }}>
                Next Guide →
              </button>
            )}
          </div>
        )}

        {/* All Complete */}
        {totalPct === 100 && (
          <div style={{
            marginTop: 32, padding: 36, borderRadius: 20, textAlign: "center",
            background: `linear-gradient(135deg, ${T.accent}10, ${T.green}10)`,
            border: `1px solid ${T.accent}33`,
          }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🏆</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.accent, fontFamily: `'Syne', ${FONT}`, marginBottom: 6 }}>
              Full Execution Complete!
            </div>
            <div style={{ fontSize: 14, color: T.textSec }}>
              Every task across all guides is done for {project.name}. Outstanding work.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────

export default function AgencyZeroToHero() {
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProjects(loadProjects());
    setLoading(false);
  }, []);

  const persistProjects = useCallback((newProjects) => {
    setProjects(newProjects);
    saveProjects(newProjects);
  }, []);

  const createProject = (name, niche) => {
    const newProject = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name, niche,
      checked: {},
      notes: {},
      createdAt: new Date().toISOString(),
    };
    persistProjects([newProject, ...projects]);
  };

  const updateProject = (updated) => {
    const newProjects = projects.map(p => p.id === updated.id ? updated : p);
    persistProjects(newProjects);
  };

  const openProject = projects.find(p => p.id === activeProject);

  return (
    <div style={{
      minHeight: "100vh", background: T.bg, fontFamily: FONT, color: T.text,
      WebkitFontSmoothing: "antialiased",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.surfaceRaised}; border-radius: 3px; }
        ::selection { background: ${T.accent}44; }
        textarea::placeholder, input::placeholder { color: ${T.textDim}; }
      `}</style>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontFamily: MONO, color: T.accent, letterSpacing: "0.1em", animation: "pulse 1.5s infinite" }}>
              LOADING...
            </div>
          </div>
        </div>
      ) : activeProject && openProject ? (
        <ProjectView
          project={openProject}
          onBack={() => setActiveProject(null)}
          onUpdate={updateProject}
        />
      ) : (
        <Dashboard
          projects={projects}
          onCreate={createProject}
          onOpen={setActiveProject}
        />
      )}
    </div>
  );
}
