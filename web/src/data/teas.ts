// Sample catalog. Later this comes from the admin panel (Website Settings).
export type L = { bn: string; en: string };
export type Tea = {
  id: number;
  type: 'black' | 'green' | 'herbal' | 'blend';
  c: [string, string];
  base: number; // BDT per 100g
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
  { id: 1, type: 'black', c: ['#2F6B3A', '#9ED36A'], base: 380,
    n: { bn: 'প্রিমিয়াম অরেঞ্জ পিকো', en: 'Premium Orange Pekoe' }, g: { bn: 'অরেঞ্জ পিকো গ্রেড', en: 'Orange Pekoe grade' },
    d: { bn: 'অরেঞ্জ পিকো গ্রেডের ব্ল্যাক টি। দুধ ছাড়া লিকার চা বা দুধ-চা, দুইভাবেই খাওয়া যায়।', en: 'Orange Pekoe grade black tea. Drink it as liquor tea or with milk.' },
    notes: { bn: ['ব্ল্যাক টি', 'লিকার বা দুধ-চা'], en: ['Black tea', 'Liquor or milk'] }, brew: { t: '95°C', m: '3-4' } },
  { id: 2, type: 'black', c: ['#7A4A28', '#C98B4E'], base: 260,
    n: { bn: 'সিটিসি ডাস্ট চা', en: 'CTC Dust Tea' }, g: { bn: 'কড়া, দুধ-চা', en: 'Strong, milk tea' },
    d: { bn: 'সিটিসি দানার কড়া চা। দুধ-চায়ের জন্য উপযোগী।', en: 'Strong CTC granules. Made for milk tea.' },
    notes: { bn: ['কড়া', 'দুধ-চা'], en: ['Strong', 'Milk tea'] }, brew: { t: '100°C', m: '2-3' } },
  { id: 3, type: 'green', c: ['#4E8B3A', '#B7DB7A'], base: 520,
    n: { bn: 'গ্রিন টি ক্লাসিক', en: 'Green Tea Classic' }, g: { bn: 'হালকা স্বাদ', en: 'Light taste' },
    d: { bn: 'হালকা স্বাদের গ্রিন টি। চিনি ছাড়া খাওয়াই ভালো।', en: 'Light green tea. Best without sugar.' },
    notes: { bn: ['গ্রিন টি', 'চিনি ছাড়া'], en: ['Green tea', 'No sugar'] }, brew: { t: '80°C', m: '2' } },
  { id: 4, type: 'blend', c: ['#8A4B1F', '#F2A93B'], base: 420,
    n: { bn: 'মশলা চা', en: 'Masala Chai' }, g: { bn: 'এলাচ, দারুচিনি', en: 'Cardamom, cinnamon' },
    d: { bn: 'এলাচ, দারুচিনি, আদা ও লবঙ্গ মেশানো মশলা চা।', en: 'Masala chai with cardamom, cinnamon, ginger and clove.' },
    notes: { bn: ['মশলা', 'দুধ-চা'], en: ['Spiced', 'Milk tea'] }, brew: { t: '100°C', m: '4-5' } },
  { id: 5, type: 'herbal', c: ['#C08A1E', '#F2D06B'], base: 480,
    n: { bn: 'লেমন জিঞ্জার', en: 'Lemon Ginger' }, g: { bn: 'হারবাল', en: 'Herbal' },
    d: { bn: 'লেবু ও আদার স্বাদের হারবাল চা। ক্যাফেইন নেই।', en: 'Herbal tea with lemon and ginger. No caffeine.' },
    notes: { bn: ['হারবাল', 'ক্যাফেইন-মুক্ত'], en: ['Herbal', 'Caffeine-free'] }, brew: { t: '95°C', m: '5' } },
  { id: 6, type: 'black', c: ['#3E2615', '#7A4A28'], base: 450,
    n: { bn: 'ব্ল্যাক টি গোল্ড', en: 'Black Tea Gold' }, g: { bn: 'প্রিমিয়াম বিওপি', en: 'Premium BOP' },
    d: { bn: 'বড় পাতার ব্ল্যাক টি (বিওপি)। লিকার চায়ের জন্য।', en: 'Broken leaf black tea (BOP). For liquor tea.' },
    notes: { bn: ['ব্ল্যাক টি', 'লিকার চা'], en: ['Black tea', 'Liquor tea'] }, brew: { t: '95°C', m: '3-4' } },
  { id: 7, type: 'herbal', c: ['#2F8F4E', '#8FD1A0'], base: 540,
    n: { bn: 'তুলসী চা', en: 'Tulsi Tea' }, g: { bn: 'হারবাল', en: 'Herbal' },
    d: { bn: 'তুলসী পাতার হারবাল চা। ক্যাফেইন নেই।', en: 'Tulsi herbal tea. No caffeine.' },
    notes: { bn: ['হারবাল', 'ক্যাফেইন-মুক্ত'], en: ['Herbal', 'Caffeine-free'] }, brew: { t: '95°C', m: '4' } },
  { id: 8, type: 'blend', c: ['#245530', '#F2A93B'], base: 620,
    n: { bn: 'স্পেশাল ব্লেন্ড', en: 'Special Blend' }, g: { bn: 'আমাদের বাছাই', en: 'Our pick' },
    d: { bn: 'তিন ধরনের পাতার মিশ্রণ। উপহার দেওয়ার জন্যও মানানসই।', en: 'A blend of three leaf grades. Also works as a gift.' },
    notes: { bn: ['ব্লেন্ড', 'উপহার'], en: ['Blend', 'Gift'] }, brew: { t: '95°C', m: '3-4' } },
];

export const TYPE_LABEL: Record<Tea['type'], L> = {
  black: { bn: 'ব্ল্যাক', en: 'Black' },
  green: { bn: 'গ্রিন', en: 'Green' },
  herbal: { bn: 'হারবাল', en: 'Herbal' },
  blend: { bn: 'ব্লেন্ড', en: 'Blends' },
};
