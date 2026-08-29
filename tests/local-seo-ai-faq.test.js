import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  englishLocalFaqItems,
  googleBusinessProfileFacts,
  nearbyCommunities,
  serbianLocalFaqItems
} from '../src/utils/local-practice-data.js';
import {
  createHomepageMarkdown,
  createPracticePayload,
  serviceDirectory as englishServiceDirectory
} from '../src/utils/agent-ready-data.js';
import { serviceDirectory as serbianServiceDirectory } from '../src/utils-sr/agent-ready-data.js';

const englishHome = readFileSync('src/pages/index.astro', 'utf8');
const serbianHome = readFileSync('src/pages/sr/index.astro', 'utf8');
const localOfficeFaq = readFileSync('src/components/LocalOfficeFaq.astro', 'utf8');
const englishNavbar = readFileSync('src/components/Navbar.astro', 'utf8');
const serbianNavbar = readFileSync('src/components-sr/Navbar.astro', 'utf8');
const englishFooter = readFileSync('src/components/Footer.astro', 'utf8');
const serbianFooter = readFileSync('src/components-sr/Footer.astro', 'utf8');
const englishTherapy = readFileSync('src/pages/therapy.astro', 'utf8');
const serbianTherapy = readFileSync('src/pages/sr/therapy.astro', 'utf8');
const englishRates = readFileSync('src/pages/rates-and-insurance.astro', 'utf8');
const serbianRates = readFileSync('src/pages/sr/rates-and-insurance.astro', 'utf8');
const englishProfessionalServices = readFileSync('src/pages/consultation-supervision-and-coaching.astro', 'utf8');
const serbianProfessionalServices = readFileSync('src/pages/sr/consultation-supervision-and-coaching.astro', 'utf8');
const englishOfficePage = readFileSync('src/pages/schaumburg-office.astro', 'utf8');
const serbianOfficePage = readFileSync('src/pages/sr/schaumburg-office.astro', 'utf8');
const englishHero = readFileSync('src/components/Hero.astro', 'utf8');
const serbianHero = readFileSync('src/components-sr/Hero.astro', 'utf8');

test('homepage location FAQs have bilingual parity and only verified practical claims', () => {
  assert.equal(englishLocalFaqItems.length, 11);
  assert.equal(serbianLocalFaqItems.length, englishLocalFaqItems.length);
  assert.ok(nearbyCommunities.includes('Hoffman Estates'));
  assert.ok(nearbyCommunities.includes('Arlington Heights'));

  const combinedAnswers = [...englishLocalFaqItems, ...serbianLocalFaqItems]
    .map((item) => item.answer)
    .join(' ');

  assert.match(combinedAnswers, /1320 Tower Rd, Suite 156/);
  assert.match(combinedAnswers, /Center for Psychological Treatment and Assessment/);
  assert.match(combinedAnswers, /NPI-2 1306636089/);
  assert.match(combinedAnswers, /physically located in Illinois/);
  assert.match(combinedAnswers, /fizički nalaze u Ilinoisu/);
  assert.match(combinedAnswers, /immigration psychological evaluations/);
  assert.match(combinedAnswers, /imigracione psihološke evaluacije/);
  assert.match(combinedAnswers, /women's mental health/);
  assert.match(combinedAnswers, /mentalno zdravlje žena/);
  assert.match(combinedAnswers, /family therapy/);
  assert.match(combinedAnswers, /porodičnu terapiju/);
  assert.match(combinedAnswers, /self-compassion/);
  assert.match(combinedAnswers, /samosaosećanje/);
  assert.match(combinedAnswers, /reproductive stress/);
  assert.match(combinedAnswers, /reproduktivni stres/);
  assert.match(combinedAnswers, /postpartum concerns/);
  assert.match(combinedAnswers, /postporođajne poteškoće/);
  assert.match(combinedAnswers, /Dr\. Jelena Djurovic, Psy\.D\./);
  assert.match(combinedAnswers, /Dr Jelena Djurovic, Psy\.D\./);
  assert.match(combinedAnswers, /071-011433/);
  assert.match(combinedAnswers, /bariatric psychological evaluations/);
  assert.match(combinedAnswers, /bariatrijske psihološke evaluacije/);
  assert.match(combinedAnswers, /BCBS PPO/);
  assert.match(combinedAnswers, /Aetna/);
  assert.match(combinedAnswers, /UnitedHealthcare/);
  assert.match(combinedAnswers, /does not guarantee coverage or payment/);
  assert.match(combinedAnswers, /ne garantuje pokriće ili isplatu/);
  assert.match(combinedAnswers, /Monday through Friday from 9:00 AM to 8:00 PM/);
  assert.match(combinedAnswers, /ponedeljka do petka od 9:00 do 20:00/);
  assert.doesNotMatch(combinedAnswers, /Spanish|špansk/i);
  assert.match(combinedAnswers, /wheelchair-accessible car park/);
  assert.match(combinedAnswers, /parking pristupačan/);
  assert.match(combinedAnswers, /restroom/);
  assert.match(combinedAnswers, /toalet/);
  assert.match(combinedAnswers, /Appointments are recommended/);
  assert.match(combinedAnswers, /Zakazivanje se preporučuje/);
  assert.doesNotMatch(combinedAnswers, /wheelchair-accessible entrance/i);
});

test('both homepages render the local office content and matching FAQ schema input', () => {
  assert.match(englishHome, /<LocalOfficeFaq/);
  assert.match(englishHome, /faqItems=\{englishLocalFaqItems\}/);
  assert.match(englishHome, /insurance verification/);
  assert.match(serbianHome, /<LocalOfficeFaq/);
  assert.match(serbianHome, /faqItems=\{serbianLocalFaqItems\}/);
  assert.match(serbianHome, /proveri osiguranja/);
  assert.match(localOfficeFaq, /1320 Tower Rd, Suite 156/);
  assert.match(localOfficeFaq, /id="schaumburg-office"/);
  assert.match(localOfficeFaq, /scroll-mt-24/);
  assert.match(englishFooter, /Schaumburg Office/);
  assert.match(serbianFooter, /Ordinacija u Schaumburgu/);
  assert.match(englishFooter, /1320 Tower Rd, Suite 156/);
  assert.match(serbianFooter, /1320 Tower Rd, Suite 156/);
  assert.match(englishFooter, /Monday-Friday: 9:00 AM-8:00 PM/);
  assert.match(englishFooter, /Saturday-Sunday: Closed/);
  assert.match(englishFooter, /Wheelchair-accessible parking and a restroom are available/);
  assert.match(englishFooter, /Appointments recommended/);
  assert.match(serbianFooter, /Ponedeljak-petak: 9:00-20:00/);
  assert.match(serbianFooter, /Subota-nedelja: zatvoreno/);
  assert.match(serbianFooter, /Dostupni su pristupačan parking i toalet/);
  assert.match(serbianFooter, /Zakazivanje se preporučuje/);
  assert.match(englishFooter, /href="\/schaumburg-office\/"/);
  assert.match(serbianFooter, /href="\/sr\/schaumburg-office\/"/);
});

test('sitewide navigation links to the bilingual office pages', () => {
  assert.match(englishNavbar, /\{ name: 'Schaumburg Office', href: '\/schaumburg-office\/' \}/);
  assert.match(serbianNavbar, /\{ name: 'Ordinacija u Schaumburgu', href: '\/sr\/schaumburg-office\/' \}/);
});

test('dedicated office pages expose the canonical bilingual location facts and FAQ schema input', () => {
  for (const page of [englishOfficePage, serbianOfficePage]) {
    assert.match(page, /1320 Tower Rd, Suite 156/);
    assert.match(page, /1306636089/);
    assert.match(page, /071-011433/);
    assert.match(page, /Google Business Profile/);
    assert.match(page, /mainEntity:[\s\S]*#professional-service/);
    assert.match(page, /<FaqSection/);
    assert.match(page, /nearbyCommunities\.join/);
    assert.match(page, /schaumburg-office/);
  }

  assert.match(englishOfficePage, /faqItems=\{englishLocalFaqItems\}/);
  assert.match(englishOfficePage, /physically located in Illinois/);
  assert.match(englishOfficePage, /English and Serbian/);
  assert.match(serbianOfficePage, /faqItems=\{serbianLocalFaqItems\}/);
  assert.match(serbianOfficePage, /fizički nalaze u Ilinoisu/);
  assert.match(serbianOfficePage, /srpskom i engleskom/);
});

test('homepage availability language stays accurate until the practice confirms new-client status', () => {
  assert.match(englishHero, /Appointments by Request/);
  assert.match(englishHero, /Ask About Availability/);
  assert.doesNotMatch(englishHero, /Accepting New Patients|Free Consultation/i);

  assert.match(serbianHero, /Termini uz prethodni dogovor/);
  assert.match(serbianHero, /Pitajte za dostupnost/);
  assert.doesNotMatch(serbianHero, /Prima nove klijente|besplatnu konsultaciju/i);
});

test('public AI surfaces expose the same service area and location answers', () => {
  const practice = createPracticePayload();
  const markdown = createHomepageMarkdown();

  assert.deepEqual(practice.locationFaq, englishLocalFaqItems);
  assert.deepEqual(practice.googleBusinessProfile, googleBusinessProfileFacts);
  assert.equal(practice.googleBusinessProfile.primaryCategory, 'Psychologist');
  assert.ok(practice.googleBusinessProfile.services.includes('Therapy in Schaumburg'));
  assert.ok(
    practice.googleBusinessProfile.locationFeatures.some(
      (feature) => feature.name === 'Wheelchair-accessible car park' && feature.value === true
    )
  );
  assert.ok(practice.serviceArea.includes('Schaumburg'));
  assert.ok(practice.serviceArea.includes('Palatine'));
  assert.equal(practice.location.pageUrl, 'https://centerforpta.com/schaumburg-office/');
  assert.equal(
    practice.location.serbianPageUrl,
    'https://centerforpta.com/sr/schaumburg-office/'
  );
  assert.match(markdown, /## Schaumburg office and location questions/);
  assert.match(markdown, /Can someone who lives outside Illinois travel to Schaumburg/);
  assert.match(markdown, /Does Center for PTA accept insurance for services in Schaumburg/);
  assert.match(markdown, /listing a plan does not guarantee coverage or payment/);

  const agentReadySource = readFileSync('src/utils/agent-ready-data.js', 'utf8');
  assert.match(agentReadySource, /Schaumburg office and location FAQ/);
  assert.match(agentReadySource, /Serbian office and location FAQ/);
});

test('main therapy pages expose location, telehealth, language, and FAQ evidence', () => {
  for (const page of [englishTherapy, serbianTherapy]) {
    assert.match(page, /<LocalServiceArea/);
    assert.match(page, /<FaqSection/);
    assert.match(page, /faqItems=\{faqItems\}/);
    assert.match(page, /<AuthorBioBox \/>/);
    assert.match(page, /<PageAddressCard \/>/);
    assert.match(page, /1320 Tower Rd, Suite 156/);
  }

  assert.match(englishTherapy, /physically located in Illinois/);
  assert.match(englishTherapy, /available in Serbian and English/);
  assert.match(serbianTherapy, /fizički nalaze u Ilinoisu/);
  assert.match(serbianTherapy, /dostupne na srpskom i engleskom/);
});

test('rates pages expose bilingual local FAQs without promising insurance reimbursement', () => {
  for (const page of [englishRates, serbianRates]) {
    assert.match(page, /<FaqSection/);
    assert.match(page, /faqItems=\{faqItems\}/);
    assert.match(page, /<PageAddressCard \/>/);
    assert.match(page, /1320 Tower Rd, Suite 156/);
    assert.match(page, /BCBS PPO/);
    assert.match(page, /Aetna/);
    assert.match(page, /UnitedHealthcare/);
  }

  assert.match(englishRates, /Please verify current benefits/);
  assert.match(englishRates, /does not guarantee payment/);
  assert.match(englishRates, /physically located in Illinois/);
  assert.match(serbianRates, /proverite aktuelne benefite/);
  assert.match(serbianRates, /ne garantuje isplatu/);
  assert.match(serbianRates, /fizički nalaze u Ilinoisu/);
});

test('professional service pages expose local, provider, language, and licensure-boundary evidence', () => {
  for (const page of [englishProfessionalServices, serbianProfessionalServices]) {
    assert.match(page, /<FaqSection/);
    assert.match(page, /faqItems=\{faqItems\}/);
    assert.match(page, /<AuthorBioBox \/>/);
    assert.match(page, /<PageAddressCard \/>/);
    assert.match(page, /1320 Tower Rd, Suite 156/);
    assert.match(page, /Center for PTA/);
    assert.doesNotMatch(page, /board-approved/i);
  }

  assert.match(englishProfessionalServices, /title="Clinical Supervision in Schaumburg \| Center for PTA"/);
  assert.match(englishProfessionalServices, /Clinical Supervision, Consultation and Coaching in Schaumburg/);
  assert.match(englishProfessionalServices, /cannot determine whether a board or program will accept particular hours/);
  assert.match(englishProfessionalServices, /available in English and Serbian/);
  assert.match(englishProfessionalServices, /without promising a particular exam or employment outcome/);

  assert.match(serbianProfessionalServices, /title="Klinička supervizija u Schaumburgu \| Center for PTA"/);
  assert.match(serbianProfessionalServices, /Klinička supervizija, konsultacije i koučing u Schaumburgu/);
  assert.match(serbianProfessionalServices, /ne može da odredi da li će određeni odbor ili program prihvatiti sate/);
  assert.match(serbianProfessionalServices, /dostupne su na srpskom i engleskom/);
  assert.match(serbianProfessionalServices, /bez obećanja određenog ispitnog ili poslovnog ishoda/);
});

test('public AI service directories preserve the same Schaumburg and licensure boundaries', () => {
  const englishService = englishServiceDirectory.find(
    (service) => service.slug === 'consultation-supervision-and-coaching'
  );
  const serbianService = serbianServiceDirectory.find(
    (service) => service.slug === 'consultation-supervision-and-coaching'
  );

  assert.match(englishService.description, /Center for PTA in Schaumburg, Illinois/);
  assert.match(englishService.description, /must be confirmed before starting/);
  assert.match(serbianService.description, /Center for PTA u Schaumburgu, Illinois/);
  assert.match(serbianService.description, /mora se potvrditi pre početka/);
});

test('postpartum service FAQs include visible source-backed clinical distinctions in both languages', () => {
  const englishPage = readFileSync('src/pages/postpartum-therapy.astro', 'utf8');
  const serbianPage = readFileSync('src/pages/sr/postpartum-therapy.astro', 'utf8');

  for (const page of [englishPage, serbianPage]) {
    assert.match(page, /https:\/\/www\.nimh\.nih\.gov\/health\/publications\/perinatal-depression/);
    assert.match(page, /https:\/\/www\.acog\.org\/womens-health\/faqs\/postpartum-depression/);
    assert.match(page, /clinicalSources\.map/);
  }

  assert.match(englishPage, /How are the baby blues different from postpartum depression\?/);
  assert.match(englishPage, /When should I ask for help with postpartum depression or anxiety\?/);
  assert.match(serbianPage, /Koja je razlika između baby blues-a i postpartalne depresije\?/);
  assert.match(serbianPage, /Kada treba da potražim pomoć zbog postpartalne depresije ili anksioznosti\?/);
});
