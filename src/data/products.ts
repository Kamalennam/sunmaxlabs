import pregarapMnt from '@/assets/pregarap_mnt.jpeg'
import pregarapMnt1 from '@/assets/pregarap_mnt1.jpeg'
import neuromax from '@/assets/neuromax.jpeg'
import toverP from '@/assets/tover_p.jpeg'
import tendrilPlus from '@/assets/tendril_plus.jpeg'
import in10s from '@/assets/in_10s.jpeg'

export type ProductSlug =
  | 'pregarap-mnt'
  | 'neuromax'
  | 'tover-p'
  | 'tendril-plus'
  | 'in-10s'

export interface Product {
  slug: ProductSlug
  name: string
  tagline: string
  composition: string
  indications: string[]
  dosageHighlights?: string
  images: string[]
}

export const products: Product[] = [
  {
    slug: 'pregarap-mnt',
    name: 'Pregarap MNT',
    tagline: 'Neuropathic pain, paresthesia and nerve health support',
    composition:
      'Each capsule contains Pregabalin with Methylcobalamin and Nortriptyline, supported by additional neurotropic vitamins (refer pack insert for exact strengths).',
    indications: [
      'Neuropathic pain including painful diabetic neuropathy and post-herpetic neuralgia',
      'Chronic low back pain and cervical spondylosis with neuropathic component',
      'Peripheral neuropathies, radiculopathies and entrapment neuropathies',
      'Paresthesia, burning feet and numbness where vitamin B12 supplementation is indicated',
      'Adjunct in chronic pain syndromes where optimization of nerve function is desired',
    ],
    dosageHighlights:
      'Dose, titration and duration must be individualised and decided only by the treating physician, typically once or twice daily based on response and tolerability.',
    images: [pregarapMnt, pregarapMnt1],
  },
  {
    slug: 'neuromax',
    name: 'Neuromax',
    tagline: 'Comprehensive neurotropic multivitamin formulation',
    composition:
      'Balanced combination of vitamin B-complex, neurotropic cofactors and antioxidants to support nerve metabolism (exact composition as printed on the pack).',
    indications: [
      'Supportive therapy in peripheral neuropathy, neuritis and neuralgias',
      'Nutritional supplementation in vitamin B-complex deficiency states',
      'Adjuvant in diabetic neuropathy, alcoholic neuropathy and other chronic metabolic disorders',
      'General weakness, fatigue and convalescence where vitamin support is recommended',
    ],
    dosageHighlights:
      'Usually administered once daily with or without food, or as directed by the healthcare professional based on the patient’s nutritional needs.',
    images: [neuromax],
  },
  {
    slug: 'tover-p',
    name: 'Tover-P',
    tagline: 'Analgesic–antipyretic for fever and mild to moderate pain',
    composition:
      'Combination analgesic / antipyretic formulation intended for symptomatic relief of fever and pain (see product label for exact strengths and components).',
    indications: [
      'Fever associated with common viral or bacterial infections, as advised by the physician',
      'Mild to moderate pain such as headache, myalgia, backache and dental pain',
      'Body ache and malaise accompanying febrile illnesses',
    ],
    dosageHighlights:
      'Use the lowest effective dose at the recommended dosing interval. Do not exceed the maximum daily dose mentioned on the product label; use only under medical guidance.',
    images: [toverP],
  },
  {
    slug: 'tendril-plus',
    name: 'Tendril Plus',
    tagline: 'Advanced hematinic with iron, folic acid and supportive nutrients',
    composition:
      'Hematini c formulation containing iron, folic acid and supportive vitamins / minerals designed to improve hemoglobin and red cell indices (final composition as per pack).',
    indications: [
      'Iron deficiency anemia of nutritional or chronic blood loss origin',
      'Nutritional anemia in pregnancy and lactation, as per clinician’s judgement',
      'Adjuvant therapy in pre- and post-operative periods where iron support is required',
      'Supportive therapy in individuals with poor dietary iron and folate intake',
    ],
    dosageHighlights:
      'Generally taken once daily or as prescribed, preferably after meals to improve tolerance, unless advised otherwise by the clinician.',
    images: [tendrilPlus],
  },
  {
    slug: 'in-10s',
    name: 'IN-10s',
    tagline: 'Oral iron preparation for anemia management',
    composition:
      'Oral iron preparation with supportive hematinic ingredients formulated to replenish and maintain body iron stores (see pack insert for detailed composition).',
    indications: [
      'Treatment and prophylaxis of iron deficiency anemia of various etiologies',
      'Supportive therapy in periods of increased physiological iron requirement, such as growth spurts or post-illness recovery',
      'Maintenance of iron stores after parenteral iron therapy, if recommended by the physician',
    ],
    dosageHighlights:
      'Dose and duration should be individualised according to the severity of deficiency and the clinician’s assessment; therapy is usually continued for several weeks after normalization of hemoglobin to replenish iron stores.',
    images: [in10s],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
