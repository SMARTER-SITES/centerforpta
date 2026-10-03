# SEO sprint: 3 October 2026

## Published scope

- EN/SR prenatal pages: search titles, descriptions and introductory text clarify pregnancy anxiety support, Schaumburg and the existing Illinois telehealth restriction. Existing clinical scope, FAQs and related articles remain the source of service details.
- EN/SR bariatric counseling pages: an introductory link directs visitors needing a surgical-program evaluation to the existing evaluation page.
- EN/SR evaluation pages: prominent contact and counseling links distinguish the next steps. Home service cards explicitly name bariatric evaluations.
- Shared EN/SR analytics: `click_to_call` measures a real phone-link activation. It sends only the measurement ID, `contact_method: phone` and language. It measures intent, not a completed call or accepted contact inquiry. Analytics failure must leave native telephone navigation usable.
- Successful form submissions continue to emit `generate_lead` only after endpoint acceptance; telephone clicks do not emit it.

## Validation

- `npm test`: 108 tests passed under Node 22.
- `npm run audit:seo`: 68 pages built; 64 indexable, 5 noindex, zero audit issues.
- Local browser checks: 16 groups passed across EN/SR and mobile/desktop, covering the changed introductory links, canonical URLs, layout width, trusted mouse/keyboard phone activation, exact analytics payload and blocked/missing analytics behavior.
- Contact-form regression: 20 groups passed with the form endpoint and GA4 transport mocked, including simulated Netlify removal of discovery attributes. Covered all four forms, validation, honeypot, server/network failure, retry, double submission, two separate accepted submissions, reload/back/forward and direct thank-you visits. No real inquiries or production analytics were sent by these checks.

## Baseline and comparison

Source: read-only Search Console and GA4 reports fetched on 3 October 2026. Current period: 3–30 September; comparison: 6 August–2 September. Search Console dates use its Pacific reporting calendar. GA4 uses its property's reporting timezone; the services' counts are not interchangeable.

| Metric | Current 28 days | Previous 28 days |
| --- | ---: | ---: |
| Search Console clicks | 42 | 33 |
| Search Console impressions | 8,804 | 1,170 |
| Search Console CTR | 0.48% | 2.82% |
| GA4 organic sessions | 60 | 43 |
| GA4 organic engaged sessions | 40 | 25 |

Four days account for 85.6% of current impressions, mostly US desktop. The cause is unverified. Evaluate daily/device/country distributions before attributing the apparent rank or CTR change to visitors. Query reports omit anonymized queries and do not cover all clicks.

Over 3 July–30 September, the prenatal page had 445 impressions and zero clicks; `pregnancy therapy schaumburg` had 67 impressions and zero clicks at average position 3.04, all US mobile. The bariatric counseling page had 85 impressions and two clicks. These are small samples, not forecasts.

Historical `generate_lead` counts are not a reliable baseline for accepted submissions. The corrected behavior was published on 3 October. One owner-authorized delivery test reached email; its GA4 transport was blocked. Start the new conversion baseline after publication and exclude internal/test activity when evaluating results.

Review after 4–6 weeks, approximately 1–15 November, allowing for Search Console's reporting delay. Compare equivalent 28-day periods for relevant US/Illinois traffic, mobile clicks, changed landing pages, organic engagement and accepted form leads. Track `click_to_call` separately. Avoid conclusions from a few days or a handful of submissions.

## Account configuration still pending

The owner approved marking `generate_lead` as a GA4 key event. The installed Work Cloud connector returned an authentication request again after retrying a read, and the configured cloud GA4 helper permits reporting reads only. No GA4 configuration write was performed; no credentials or OAuth grants were changed.

In property **529306129** (measurement ID **G-N367CP9MSE**), mark `generate_lead` as a key event with **once per event** counting through the authorized GA4 admin interface. Preserve other existing key events. Do not invent a monetary value; do not import it into Ads as part of this sprint. Key-event designation does not repair historical counts. Validate with the next legitimate inquiry and its receipt; do not generate another production test submission merely to populate reports.

GBP read-only identity verification confirmed the public name, `1320 Tower Road, Suite 156, Schaumburg, IL 60173`, website and place ID. The existing guarded helper does not expose categories, services, photos, reviews or performance. Those areas have not been audited or changed. In the authorized GBP UI, review factual categories/services, contact details and hours; assess public photos and neutral review-request practices without publishing patient information. Compare booking-link traffic with actual GBP performance rather than treating tagged sessions as all Maps activity.

## Subsequent priorities

1. Reassess the targeted prenatal/bariatric changes using the measurement window above before broad title changes.
2. Improve immigration visibility through relevant referral relationships and useful, accurate explanations of the existing evaluation process. Existing pricing and FAQ content should be checked before adding duplicates. No outreach or messages were sent in this sprint.
3. Extend the existing prenatal/postpartum article cluster only for a specific unmet question, with clinical review and contextual links. Existing fertility-stress and pregnancy-after-loss articles already cover part of this need; avoid bulk articles and duplicate pages.
4. Complete the GBP audit and GA4 key-event setup through authorized account access. These access limitations do not block the website improvements.
