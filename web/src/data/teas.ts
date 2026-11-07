// Sample catalog. Later this comes from the admin panel (Website Settings).
export type L = { bn: string; en: string };
export type Tea = {
  id: number;
  type: 'black' | 'green' | 'herbal' | 'blend';
  tag?: 'best' | 'new';
  c: [string, string];
  base: number; // BDT per 100g
  r: number;
  rc: number;
  n: L;
  g: L;
  d: L;
  notes: { bn: string[]; en: string[] };
  brew: { t: string; m: string };
};

export const WEIGHTS = [
  { g: 100, k: 1, l: '100g' },
  { g: 250, k: 2.35, l: '250g' },
  { g: 500, k: 4.5, l: '500g' },
  { g: 1000, k: 8.6, l: '1kg' },
];
export const DELIVERY = 60;
export const price = (t: Tea, wi: number) => Math.round((t.base * WEIGHTS[wi].k) / 10) * 10;

export const TEAS: Tea[] = [
  { id: 1, type: 'black', tag: 'best', c: ['#2F6B3A', '#9ED36A'], base: 380, r: 4.8, rc: 126,
    n: { bn: 'সিলেট প্রিমিয়াম', en: 'Sylhet Premium' }, g: { bn: 'অরেঞ্জ পিকো', en: 'Orange Pekoe' },
    d: { bn: 'সিলেটের পাহাড়ি বাগানের কচি পাতা। গাঢ় লিকার, হালকা মিষ্টি সুবাস। দুধ ছাড়া বা দুধ-চা দুইভাবেই দারুণ।', en: 'Young leaves from Sylhet hill gardens. Bright liquor with a light sweet aroma. Great with or without milk.' },
    notes: { bn: ['মধুর সুবাস', 'গাঢ় রং', 'মোলায়েম স্বাদ'], en: ['Honey aroma', 'Deep colour', 'Smooth finish'] }, brew: { t: '95°C', m: '3-4' } },
  { id: 2, type: 'black', c: ['#7A4A28', '#C98B4E'], base: 260, r: 4.6, rc: 211,
    n: { bn: 'সিটিসি ডাস্ট চা', en: 'CTC Dust Tea' }, g: { bn: 'কড়া, দুধ-চা', en: 'Strong, milk tea' },
    d: { bn: 'রোজকার দুধ-চায়ের জন্য কড়া ও ঘন লিকার। দ্রুত রং ছাড়ে, দামে সাশ্রয়ী।', en: 'Strong, thick liquor made for everyday milk tea. Quick colour, great value.' },
    notes: { bn: ['কড়া', 'ঘন লিকার', 'দুধ-চায়ের জন্য'], en: ['Strong', 'Thick liquor', 'For milk tea'] }, brew: { t: '100°C', m: '2-3' } },
  { id: 3, type: 'green', c: ['#4E8B3A', '#B7DB7A'], base: 520, r: 4.7, rc: 78,
    n: { bn: 'গ্রিন টি ক্লাসিক', en: 'Green Tea Classic' }, g: { bn: 'হালকা, স্বাস্থ্যকর', en: 'Light, healthy' },
    d: { bn: 'হালকা ঘাসের সুবাস আর পরিষ্কার স্বাদ। চিনি ছাড়া পান করুন, দিন শুরু হবে সতেজ।', en: 'Fresh grassy aroma and a clean taste. Best without sugar for a fresh start.' },
    notes: { bn: ['সতেজ', 'ঘাসের সুবাস', 'কম ক্যাফেইন'], en: ['Fresh', 'Grassy', 'Low caffeine'] }, brew: { t: '80°C', m: '2' } },
  { id: 4, type: 'blend', c: ['#8A4B1F', '#F2A93B'], base: 420, r: 4.9, rc: 164,
    n: { bn: 'মশলা চা', en: 'Masala Chai' }, g: { bn: 'এলাচ, দারুচিনি', en: 'Cardamom, cinnamon' },
    d: { bn: 'এলাচ, দারুচিনি, আদা আর লবঙ্গের মিশ্রণ। শীতের বিকেলের জন্য একদম মানানসই।', en: 'Cardamom, cinnamon, ginger and clove. Made for cold evenings.' },
    notes: { bn: ['এলাচ', 'দারুচিনি', 'আদা'], en: ['Cardamom', 'Cinnamon', 'Ginger'] }, brew: { t: '100°C', m: '4-5' } },
  { id: 5, type: 'herbal', c: ['#C08A1E', '#F2D06B'], base: 480, r: 4.5, rc: 52,
    n: { bn: 'লেমন জিঞ্জার', en: 'Lemon Ginger' }, g: { bn: 'হারবাল', en: 'Herbal' },
    d: { bn: 'লেবুর টক ভাব আর আদার ঝাল। ঠান্ডা-কাশিতে আরামদায়ক, ক্যাফেইন-মুক্ত।', en: 'Citrus zing with ginger warmth. Soothing and caffeine-free.' },
    notes: { bn: ['লেবু', 'আদা', 'ক্যাফেইন-মুক্ত'], en: ['Lemon', 'Ginger', 'Caffeine-free'] }, brew: { t: '95°C', m: '5' } },
  { id: 6, type: 'black', tag: 'new', c: ['#3E2615', '#7A4A28'], base: 450, r: 4.8, rc: 31,
    n: { bn: 'ব্ল্যাক টি গোল্ড', en: 'Black Tea Gold' }, g: { bn: 'প্রিমিয়াম বিওপি', en: 'Premium BOP' },
    d: { bn: 'বেছে নেওয়া বড় পাতা, গভীর স্বাদ। যাঁরা দুধ ছাড়া লিকার চা ভালোবাসেন, তাঁদের জন্য।', en: 'Hand-picked broken leaf with deep flavour. For lovers of black liquor tea.' },
    notes: { bn: ['গভীর স্বাদ', 'মাল্টি সুবাস', 'লিকার চা'], en: ['Deep flavour', 'Malty', 'Liquor tea'] }, brew: { t: '95°C', m: '3-4' } },
  { id: 7, type: 'herbal', c: ['#2F8F4E', '#8FD1A0'], base: 540, r: 4.6, rc: 44,
    n: { bn: 'তুলসী চা', en: 'Tulsi Tea' }, g: { bn: 'হারবাল', en: 'Herbal' },
    d: { bn: 'তুলসী পাতার প্রাকৃতিক সুবাস। রাতে শান্তির চা, ক্যাফেইন নেই।', en: 'Natural tulsi leaf aroma. A calm evening cup with no caffeine.' },
    notes: { bn: ['প্রশান্তি', 'তুলসী', 'ক্যাফেইন-মুক্ত'], en: ['Calming', 'Holy basil', 'Caffeine-free'] }, brew: { t: '95°C', m: '4' } },
  { id: 8, type: 'blend', c: ['#245530', '#F2A93B'], base: 620, r: 5, rc: 19,
    n: { bn: 'স্পেশাল ব্লেন্ড', en: 'Special Blend' }, g: { bn: 'আমাদের বাছাই', en: 'Our pick' },
    d: { bn: 'তিন ধরনের পাতা মিশিয়ে আমাদের নিজস্ব ব্লেন্ড। উপহারের জন্য সেরা।', en: 'Our own blend of three leaf grades. A perfect gift.' },
    notes: { bn: ['ব্যালান্সড', 'ফুলের সুবাস', 'উপহার'], en: ['Balanced', 'Floral', 'Gift-worthy'] }, brew: { t: '95°C', m: '3-4' } },
];

export const REVIEWS = [
  { n: { bn: 'রাহিম উদ্দিন', en: 'Rahim Uddin' }, c: { bn: 'ঢাকা', en: 'Dhaka' }, t: { bn: 'সিলেট প্রিমিয়ামের সুবাসটা একদম আলাদা। প্যাকিংও সুন্দর ছিল।', en: 'Sylhet Premium smells amazing. Packing was neat too.' } },
  { n: { bn: 'নুসরাত জাহান', en: 'Nusrat Jahan' }, c: { bn: 'চট্টগ্রাম', en: 'Chattogram' }, t: { bn: 'মশলা চা আমার পরিবারের সবার পছন্দ। আবার অর্ডার করব।', en: 'The whole family loves the masala chai. Will order again.' } },
  { n: { bn: 'কামরুল হাসান', en: 'Kamrul Hasan' }, c: { bn: 'সিলেট', en: 'Sylhet' }, t: { bn: 'ওজনে কোনো কম নেই, ডেলিভারিও দ্রুত। ভালো লাগল।', en: 'Full weight and quick delivery. Happy with it.' } },
];

export const TYPE_LABEL: Record<Tea['type'], L> = {
  black: { bn: 'ব্ল্যাক', en: 'Black' },
  green: { bn: 'গ্রিন', en: 'Green' },
  herbal: { bn: 'হারবাল', en: 'Herbal' },
  blend: { bn: 'ব্লেন্ড', en: 'Blends' },
};
