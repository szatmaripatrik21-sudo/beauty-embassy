// ============================================================================
// Beauty Embassy — központi tartalom + képmanifeszt.
// Prémium med-spa és szépségműhely Budapesten. PLACEHOLDER demó:
// a márka, a szövegek, az árak, a nevek és az értékelések kitaláltak.
//
// Koncepció: a modern szépség "nagykövetsége" — nyugodt rezidencia a városban,
// ahol a vendégeket úgy fogadják, mint a méltóságokat. A csapat a "nagykövetek",
// a stúdió "a Rezidencia", a foglalást a "concierge" intézi.
//
// A képek `img()` segítővel működnek: ha megadod a `localSrc`-t (egy /public
// alatti útvonal), azt használja; egyébként automatikusan az Unsplash tartalék.
// ============================================================================

export const brand = {
  name: 'Beauty Embassy',
  wordmark: 'BEAUTY EMBASSY',
  tagline: 'Nagykövetség a bőrnek, a hajnak és önmagadnak',
  shortPitch:
    'Nyugodt rezidencia Budapest szívében, ahol a bőrt, a hajat és önmagadat csendes, igényes gondoskodás fogadja.',
  phone: '+36 1 480 2200',
  phoneHref: 'tel:+3614802200',
  email: 'concierge@beautyembassy.hu',
  emailHref: 'mailto:concierge@beautyembassy.hu',
  address: 'Andrássy út 39, 1061 Budapest',
  addressLines: ['Andrássy út 39', '1061 Budapest, Magyarország'],
  mapsHref: 'https://maps.google.com/?q=Andrássy+út+39+Budapest',
  hoursShort: 'Kedd–Szombat · 9:00–19:00',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  founded: 2016,
  bookingHref: '/book',
}

// Elsődleges útvonal-navigáció.
export const nav = [
  { label: 'Kezelések', to: '/treatments' },
  { label: 'Rólunk', to: '/about' },
  { label: 'Galéria', to: '/gallery' },
  { label: 'Kapcsolat', to: '/contact' },
]

export const hero = {
  eyebrow: 'Szépségműhely · Budapest',
  title: 'Beauty Embassy',
  subheading:
    'Magas szintű bőr-, haj- és szépségrituálék — egy privát rezidencia diszkréciójával és egy klinika precizitásával.',
  primaryCta: { label: 'Időpontfoglalás', to: '/book' },
  secondaryCta: { label: 'Kezelések', to: '/treatments' },
  trust: '★★★★★  5.0 — több mint 600 helyi vendég értékelése',
}

// ----------------------------------------------------------------------------
// Képmanifeszt
// ----------------------------------------------------------------------------
type SalonImage = { localSrc?: string; remote: string; alt: string }

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

export const images = {
  heroMain: {
    localSrc: '/images/beauty/heronew.png',
    remote: U('photo-1457972729786-0411a3b2b626', 1600),
    alt: 'Közeli portré a sugárzó, természetesen ragyogó bőrről',
  },
  facial: {
    localSrc: '/images/beauty/heromiddlesmall.jpg',
    remote: U('photo-1616394584738-fc6e612e71b9'),
    alt: 'Vendég pihen egy feltöltő arckezelés közben',
  },
  hair: {
    localSrc: '/images/beauty/herorightbottom.jpg',
    remote: U('photo-1560066984-138dadb4c035'),
    alt: 'Fodrász elegáns berakást fejez be',
  },
  makeup: {
    localSrc: '/images/beauty/rightbottom.png',
    remote: U('photo-1487412947147-5cebf100ffc2'),
    alt: 'Professzionális sminkecsetek és paletta',
  },
  nails: {
    remote: U('photo-1604654894610-df63bc536371'),
    alt: 'Manikűr és körömápolás közben',
  },
  skincare: {
    remote: U('photo-1556228720-195a672e8a03'),
    alt: 'Válogatott bőrápolási termékek márványfelületen',
  },
  interior: {
    remote: U('photo-1633681926022-84c23e8cb2d6'),
    alt: 'A Rezidencia meleg, minimalista belső tere',
  },
  towels: {
    remote: U('photo-1540555700478-4be289fbecef'),
    alt: 'Puha törölközők, gyertya és virágok a kezelőben',
  },
  lounge: {
    remote: U('photo-1522337660859-02fbefca4702'),
    alt: 'Az Embassy társalgó puha ülőgarnitúrával és meleg fénnyel',
  },
  lashes: {
    remote: U('photo-1583001931096-959e9a1a6223'),
    alt: 'Részletes pilla- és szemöldökmunka',
  },
  massage: {
    remote: U('photo-1600334129128-685c5582fd35'),
    alt: 'Nyugodt testkezelő szoba masszázshoz előkészítve',
  },
  products: {
    remote: U('photo-1571781926291-c477ebfd024b'),
    alt: 'Polc válogatott szépség- és bőrápolási termékekkel',
  },
  detail: {
    remote: U('photo-1512496015851-a90fb38ba796'),
    alt: 'Csendes styling részlet az Embassyben',
  },
} satisfies Record<string, SalonImage>

export type ImageKey = keyof typeof images

export const img = (key: ImageKey) => {
  const entry = images[key] as SalonImage
  return entry.localSrc ?? entry.remote
}

// ----------------------------------------------------------------------------
// Szolgáltatások — teljes, kategorizált "dosszié"
// ----------------------------------------------------------------------------
export type Service = {
  name: string
  duration: string
  price: string
  blurb: string
  signature?: boolean
}

export type ServiceCategory = {
  id: string
  label: string
  title: string
  intro: string
  image: ImageKey
  services: Service[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'skin',
    label: 'Bőr & Arckezelések',
    title: 'Bőr & Arckezelések',
    intro:
      'Diagnosztikára épülő arckezelések, amelyek előbb felmérik a bőröd, mielőtt hozzáérnének — a 30 perces frissítéstől a mély korrekciós protokollokig.',
    image: 'facial',
    services: [
      {
        name: 'Embassy Signature arckezelés',
        duration: '75 perc',
        price: '32 000 Ft-tól',
        blurb:
          'Zászlóshajónk: mélytisztítás, enzimes hámlasztás, nyirokmasszázs és személyre szabott maszk — élőben a bőrödhöz igazítva.',
        signature: true,
      },
      {
        name: 'Diplomatic Glow Express',
        duration: '30 perc',
        price: '16 000 Ft-tól',
        blurb: 'Ebédidős frissítés — tisztítás, hámlasztás és hidratálás azonnali, fotóra kész ragyogásért.',
      },
      {
        name: 'Clarity protokoll (akne & pórustömődés)',
        duration: '60 perc',
        price: '26 000 Ft-tól',
        blurb: 'Célzott pórustisztítás, finom kinyomás és nyugtató LED, hogy a reaktív bőr visszataláljon az egyensúlyba.',
      },
      {
        name: 'Hydra-Resurface kezelés',
        duration: '60 perc',
        price: '34 000 Ft-tól',
        blurb: 'Orvosi szintű vortex hámlasztás, amely eltávolítja a szennyeződéseket, miközben szérumokat juttat a bőrbe — kihagyás nélkül.',
      },
      {
        name: 'Mikrotűs kezelés növekedési szérummal',
        duration: '75 perc',
        price: '42 000 Ft-tól',
        blurb: 'Kollagéntermelést serkentő terápia a textúráért, a hegekért és a finom ráncokért, regeneráló maszkkal zárva.',
      },
    ],
  },
  {
    id: 'hair',
    label: 'Haj & Styling',
    title: 'Haj & Styling',
    intro:
      'Vágás, szín és styling olyan szakemberektől, akik editorial és menyasszonyi munkában is jártasak. Minden alkalom konzultációval kezdődik — sosem találgatással.',
    image: 'hair',
    services: [
      {
        name: 'Precíziós vágás & styling',
        duration: '60 perc',
        price: '18 000 Ft-tól',
        blurb: 'Vágás, amely az arcvonásaidra és a mindennapi hajviseletedre épül.',
      },
      {
        name: 'Embassy berakás',
        duration: '45 perc',
        price: '12 000 Ft-tól',
        blurb: 'Mosás, ápolás és kifutóra kész, tartós végeredmény.',
        signature: true,
      },
      {
        name: 'Gloss & tónusfrissítés',
        duration: '60 perc',
        price: '22 000 Ft-tól',
        blurb: 'Áttetsző glazúr, amely felfrissíti a színt, semlegesíti a rézes tónust és tükörfényt ad.',
      },
      {
        name: 'Teljes balayage & tonírozás',
        duration: '180 perc',
        price: '58 000 Ft-tól',
        blurb: 'Kézzel festett, természetes mélység személyre szabott tonerrel és kötéserősítő ápolással.',
      },
      {
        name: 'Menyasszonyi haj (próbával)',
        duration: '120 perc',
        price: '48 000 Ft-tól',
        blurb: 'Előre kipróbált, fotón is tesztelt frizura életed legnézettebb napjára.',
      },
    ],
  },
  {
    id: 'makeup',
    label: 'Smink & Menyasszonyi',
    title: 'Smink & Menyasszonyi',
    intro:
      'A letisztult hétköznapi sminktől a tartós menyasszonyi műgondig, amely kitart az első fénytől az utolsó táncig.',
    image: 'makeup',
    services: [
      {
        name: 'Menyasszonyi smink (próbával)',
        duration: '90 perc',
        price: '38 000 Ft-tól',
        blurb: 'Tartós, kamerára tökéletes smink, esküvő előtti próbával, hogy minden részlet a helyén legyen.',
        signature: true,
      },
      {
        name: 'Alkalmi & esti smink',
        duration: '60 perc',
        price: '22 000 Ft-tól',
        blurb: 'Átgondolt megjelenés gálákra, fotózásokra és alkalmakra, amelyek többet érdemelnek egy gyors sminknél.',
      },
      {
        name: 'Természetes „smink nélküli” smink',
        duration: '45 perc',
        price: '16 000 Ft-tól',
        blurb: 'Bőrközpontú műgond, amely a legjobb, kipihent énedet mutatja.',
      },
      {
        name: 'Sminktanfolyam (1:1)',
        duration: '90 perc',
        price: '28 000 Ft-tól',
        blurb: 'Ismerd meg az arcod, a termékeid és egy ötperces rutint, amelyet tényleg megtartasz.',
      },
    ],
  },
  {
    id: 'lashes',
    label: 'Szempilla & Szemöldök',
    title: 'Szempilla & Szemöldök',
    intro:
      'Keretezd a tekinteted olyan kezelésekkel, amelyek természetesek és szépen nőnek ki — éles vonalak és karbantartási csapda nélkül.',
    image: 'lashes',
    services: [
      {
        name: 'Szempillalifting & -festés',
        duration: '50 perc',
        price: '15 000 Ft-tól',
        blurb: 'Nyitott, definiált, sötétebb természetes pillák — műpilla nélkül, hetekig.',
        signature: true,
      },
      {
        name: 'Szemöldök formázás & festés',
        duration: '40 perc',
        price: '11 000 Ft-tól',
        blurb: 'Felmért, formázott és festett — az arccsontodhoz igazítva, nem egy trendhez.',
      },
      {
        name: 'Szemöldök lamináció',
        duration: '50 perc',
        price: '16 000 Ft-tól',
        blurb: 'Felfésült, teltebb hatású szemöldök, amely hetekig tart.',
      },
      {
        name: 'Klasszikus szempilla-hosszabbítás',
        duration: '90 perc',
        price: '24 000 Ft-tól',
        blurb: 'Szálankénti felhelyezés lágy, természetes hosszabbításért.',
      },
    ],
  },
  {
    id: 'body',
    label: 'Test & Masszázs',
    title: 'Test & Masszázs',
    intro:
      'Csendes szobák, meleg kezek és olyan nyomás, amely hozzád igazodik — a feltöltődés a lényeg.',
    image: 'massage',
    services: [
      {
        name: 'Embassy feltöltő masszázs',
        duration: '60 perc',
        price: '24 000 Ft-tól',
        blurb: 'Teljesen személyre szabott teljes testes masszázs — a pihekönnyűtől a mélyszövetiig.',
        signature: true,
      },
      {
        name: 'Hát-, nyak- és válllazítás',
        duration: '40 perc',
        price: '17 000 Ft-tól',
        blurb: 'Célzott lazítás az íróasztal melletti feszültségre.',
      },
      {
        name: 'Body Glow radír & pakolás',
        duration: '75 perc',
        price: '30 000 Ft-tól',
        blurb: 'Hámlasztás, tápláló pakolás és hidratáló zárás a selymes, belülről ragyogó bőrért.',
      },
    ],
  },
  {
    id: 'nails',
    label: 'Körmök',
    title: 'Körmök',
    intro:
      'Aprólékos körömápolás higiénikus, nyugodt környezetben — a szín opcionális, a tökéletes finish garantált.',
    image: 'nails',
    services: [
      {
        name: 'Embassy manikűr',
        duration: '50 perc',
        price: '12 000 Ft-tól',
        blurb: 'Formázás, bőrkeápolás, kézmasszázs és hibátlan végeredmény.',
        signature: true,
      },
      {
        name: 'Géllakk manikűr',
        duration: '60 perc',
        price: '15 000 Ft-tól',
        blurb: 'Magasfényű, tartós szín, amely bírja a mindennapokat.',
      },
      {
        name: 'Spa pedikűr',
        duration: '60 perc',
        price: '16 000 Ft-tól',
        blurb: 'Alapos, feltöltő pedikűr meleg áztatással és masszázzsal.',
      },
    ],
  },
]

// Egy kis, gondosan válogatott készlet a főoldali kiemeléshez.
export const featuredServices: Service[] = serviceCategories
  .map((c) => c.services.find((s) => s.signature))
  .filter((s): s is Service => Boolean(s))
  .slice(0, 4)

// ----------------------------------------------------------------------------
// Történet / Rólunk
// ----------------------------------------------------------------------------
export const story = {
  eyebrow: 'A Nagykövetség',
  title: 'A szépség, ahogy egy államügyet kezelnek',
  body: [
    'A Beauty Embassy 2016-ban egy egyszerű meggyőződéssel indult: az önápolás ugyanazt a nyugodt, átgondolt vendéglátást érdemli, amelyet egy privát rezidenciától elvárnál — sosem kapkodva, sosem személytelenül.',
    'Az Andrássy úti csendes ajtó mögött bőrterapeutáink, fodrászaink és művészeink egyetlen házként dolgoznak. Minden alkalom konzultációval kezdődik és olyan eredménnyel zárul, amely továbbra is te vagy — csak kipihentebb, ragyogóbb, igazibb.',
  ],
  stat: { value: '12k+', label: 'megújulás 2016 óta' },
}

export const values = [
  {
    title: 'Diagnózis, sosem találgatás',
    body: 'Minden kezelés valódi konzultációval kezdődik. Felmérjük a bőröd és a hajad, mielőtt hozzáérnénk, és őszintén megmondjuk, mi segít valójában.',
  },
  {
    title: 'Egy ház, nem egy lánc',
    body: 'Egy cím, egy csapat. A nagyköveted ismeri az előzményeidet, a preferenciáidat és a legutóbbi időpontodat — érezhető folytonosság.',
  },
  {
    title: 'Csendes luxus, valódi eredmények',
    body: 'Klinikai szintű technológia egy menedéknek ható környezetben. Nyugodt szoba, komoly tudomány.',
  },
]

export const stats = [
  { value: '2016', label: 'Alapítva' },
  { value: '12k+', label: 'Vendéglátogatás' },
  { value: '40+', label: 'Kezelés' },
  { value: '5.0★', label: 'Átlagos értékelés' },
]

// ----------------------------------------------------------------------------
// Csapat — "Nagykövetek"
// ----------------------------------------------------------------------------
export type TeamMember = {
  name: string
  role: string
  image: ImageKey
  bio: string
  specialties: string[]
}

export const team: TeamMember[] = [
  {
    name: 'Varga Sofia',
    role: 'Alapító · Vezető bőrterapeuta',
    image: 'facial',
    bio: 'Sofia bécsi és budapesti bőrgyógyászati klinikákon eltöltött évtized után alapította a Beauty Embassyt. Hisz benne, hogy a szép bőr őszinteségre és következetességre épül, nem csodaígéretekre.',
    specialties: ['Korrekciós arckezelések', 'Mikrotűs kezelés', 'Bőr-coaching'],
  },
  {
    name: 'Kiss Dóra',
    role: 'Kreatív igazgató · Haj',
    image: 'hair',
    bio: 'Editorial és menyasszonyi munkákkal a háta mögött Dóra olyan vágásairól ismert, amelyek szépen nőnek ki, és olyan színeiről, amelyek drágán mutatnak anélkül, hogy mesterkéltek lennének.',
    specialties: ['Balayage', 'Precíziós vágás', 'Menyasszonyi haj'],
  },
  {
    name: 'Boros Lena',
    role: 'Vezető sminkmester',
    image: 'makeup',
    bio: 'Lena bőrközpontú megközelítése miatt esküvők és fotózások kedvence. Munkája a fotókon ugyanolyan gyönyörű, mint élőben.',
    specialties: ['Menyasszonyi smink', 'Editorial', '1:1 oktatás'],
  },
  {
    name: 'Tóth Anna',
    role: 'Vezető terapeuta · Pilla & Szemöldök',
    image: 'lashes',
    bio: 'Precíz és nyugodt; Anna olyan kezelésekkel keretezi a tekintetet, amelyek természetesek és sosem túlzók.',
    specialties: ['Szempillalifting', 'Szemöldök lamináció', 'Szemöldök felmérés'],
  },
]

// ----------------------------------------------------------------------------
// Vélemények
// ----------------------------------------------------------------------------
export const testimonials = [
  {
    quote:
      'A legpihentetőbb arckezelés, amin valaha voltam — a bőröm hetekig belülről ragyogott.',
    name: 'Eszter K.',
    detail: 'Signature arckezelés',
  },
  {
    quote:
      'Ők készítették a menyasszonyi hajam és sminkem, és sírva fakadtam (aztán egész nap és éjjel kitartott).',
    name: 'Réka M.',
    detail: 'Menyasszonyi smink',
  },
  {
    quote:
      'Nyugodt, szakértő, sosem kapkodó. Nem is szalon, inkább menedék, amit alig vársz.',
    name: 'Anna T.',
    detail: 'Szempillalifting & -festés',
  },
  {
    quote:
      'A nagyköveted mindenre emlékezett a legutóbbi alkalomról. Ezt a folytonosságot sehol máshol nem tapasztaltam.',
    name: 'Júlia S.',
    detail: 'Balayage & tonírozás',
  },
]

// ----------------------------------------------------------------------------
// GYIK
// ----------------------------------------------------------------------------
export const faq = [
  {
    q: 'Hogyan foglalhatok időpontot?',
    a: 'Foglalj online a concierge űrlapunkon, vagy hívd közvetlenül a Rezidenciát. Visszaigazoljuk az időpontodat, és a látogatásod előtt emlékeztetőt küldünk.',
  },
  {
    q: 'Van konzultáció a kezelés előtt?',
    a: 'Mindig. Minden alkalom rövid konzultációval kezdődik, hogy a kezelés a bőrödhöz, hajadhoz és céljaidhoz igazodjon — ezért sosem számítunk fel külön díjat.',
  },
  {
    q: 'Mi a lemondási feltétel?',
    a: 'Kérjük, az időpont módosítását vagy lemondását legalább 24 órával előre jelezd. A késői lemondás díjköteles lehet, mivel az időpontot kizárólag neked tartjuk fenn.',
  },
  {
    q: 'Vásárolhatok ajándékkártyát?',
    a: `Igen. A Beauty Embassy ajándékkártyák bármilyen értékben vagy adott kezelésre elérhetők — egy csendesen nagyvonalú ajándék. Írj a concierge-ünknek: concierge@beautyembassy.hu`,
  },
  {
    q: 'Van a közelben parkolás?',
    a: 'A Rezidencia az Andrássy úton található, fizetős utcai parkolással és két percre lévő nyilvános parkolóházzal. Az M1-es metró (Opera) néhány percnyi sétára van.',
  },
  {
    q: 'Milyen termékekkel dolgoztok?',
    a: 'Kizárólag klinikai szintű, állatkísérlet-mentes professzionális termékcsaládokkal dolgozunk, amelyeket terapeutáink választanak ki — nem szponzoráció alapján.',
  },
]

// ----------------------------------------------------------------------------
// Nyitvatartás
// ----------------------------------------------------------------------------
export const hours = [
  { day: 'Hétfő', value: 'Zárva' },
  { day: 'Kedd', value: '9:00 – 19:00' },
  { day: 'Szerda', value: '9:00 – 19:00' },
  { day: 'Csütörtök', value: '9:00 – 20:00' },
  { day: 'Péntek', value: '9:00 – 20:00' },
  { day: 'Szombat', value: '9:00 – 18:00' },
  { day: 'Vasárnap', value: 'Zárva' },
]

// ----------------------------------------------------------------------------
// Galéria
// ----------------------------------------------------------------------------
export const galleryKeys: ImageKey[] = [
  'makeup',
  'hair',
  'facial',
  'nails',
  'interior',
  'skincare',
  'lashes',
  'lounge',
  'products',
]
