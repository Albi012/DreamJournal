// Lucid dreaming technique guides.
// Content is grounded in the standard literature — primarily
// Stephen LaBerge ("Exploring the World of Lucid Dreaming") and
// Daniel Love ("Are You Dreaming?"). Written here in Hungarian.

export const TECHNIQUES = [
  {
    id: 'journal',
    icon: '📓',
    title: 'Álomnapló',
    subtitle: 'Minden technika alapja',
    level: 'Kezdő',
    intro:
      'A lucid álmodás első és legfontosabb lépése az álomemlékezés fejlesztése. Ha nem emlékszel az álmaidra, a lucid álmaidra sem fogsz. A napló naponta írva drámaian javítja a felidézést, és felfedi a személyes álomjeleidet.',
    steps: [
      'Tarts a fekhelyed mellett telefont vagy füzetet.',
      'Ébredés után azonnal, mozdulatlanul idézd fel az álmot, mielőtt megmozdulnál.',
      'Írj le mindent: helyszínt, embereket, érzéseket, furcsaságokat — akár csak töredékeket.',
      'Adj címet minden álomnak, ez segít a felidézésben.',
      'Jelöld meg a visszatérő motívumokat (álomjeleket).',
    ],
    tips: [
      'Már 1-2 kulcsszó is „lehorgonyozza" az emléket ébredéskor.',
      'Éjszakai ébredéskor is jegyzetelj — ilyenkor élénkebbek az álmok.',
      'A rendszeresség fontosabb, mint a hossz.',
    ],
  },
  {
    id: 'reality-checks',
    icon: '👁',
    title: 'Reality Checks',
    subtitle: 'Szokj rá a valóság tesztelésére',
    level: 'Kezdő',
    intro:
      'A reality check egy gyors teszt, amivel megállapítod: ébren vagy-e vagy álmodsz. Ha napközben szokássá válik, az álomban is elvégzed — és ráébredsz, hogy álmodsz. A kulcs a valódi kíváncsiság: tényleg kérdezd meg magadtól.',
    steps: [
      'Napközben 5-10 alkalommal kérdezd meg: „Álmodom most?"',
      'Fogd be az orrod és próbálj rajta keresztül lélegezni — ha megy, álmodsz.',
      'Nézz a kezedre: álomban gyakran torz, extra ujjak, elmosódás.',
      'Olvass el egy szöveget, nézz félre, olvasd újra — álomban megváltozik.',
      'Kapcsold a checket egy triggerhez (ajtón lépsz át, telefont nézel).',
    ],
    tips: [
      'Ne gépiesen csináld — tényleg vedd fontolóra, hogy álom lehet.',
      'Kösd össze az álomjeleiddel: ha meglátsz egy triggert, azonnal tesztelj.',
    ],
  },
  {
    id: 'mild',
    icon: '🧠',
    title: 'MILD',
    subtitle: 'Mnemonic Induction of Lucid Dreams',
    level: 'Haladó',
    intro:
      'LaBerge technikája: a szándék és a prospektív memória („emlékezz, hogy felismerd az álmot") használatával indukálsz lucid álmot. Leghatékonyabb éjszakai ébredés után, közvetlenül visszaalvás előtt.',
    steps: [
      'Ébredés után (pl. 4-6 óra alvás után) idézd fel az utolsó álmodat.',
      'Válassz egy álomjelet, amin lucidan „elkaptad" volna magad.',
      'Miközben visszaalszol, ismételd: „Legközelebb felismerem, hogy álmodom."',
      'Képzeld el, hogy visszatérsz abba az álomba és rájössz, hogy álmodsz.',
      'Csináld ezt, míg elalszol; ha a gondolataid elkalandoznak, kezdd újra.',
    ],
    tips: [
      'A WBTB-vel kombinálva a leghatékonyabb.',
      'Az érzés és a szándék erőssége számít, nem a szó szerinti ismétlés.',
    ],
  },
  {
    id: 'wbtb',
    icon: '⏰',
    title: 'WBTB',
    subtitle: 'Wake Back To Bed',
    level: 'Haladó',
    intro:
      'Felébredsz az éjszaka második felében (amikor sok a REM-alvás), rövid ideig ébren maradsz, majd visszaalszol — jellemzően MILD-del vagy WILD-del kombinálva. Ez az egyik legmegbízhatóbb módszer.',
    steps: [
      'Állíts ébresztőt 4,5-6 órával elalvás utánra.',
      'Ébredés után maradj ébren 15-40 percig.',
      'Ez idő alatt olvass a lucid álmodásról vagy jegyezz naplót.',
      'Amikor visszaalszol, alkalmazd a MILD-et (szándék + vizualizáció).',
      'Térj vissza az ágyba, mielőtt túl éberré válnál.',
    ],
    tips: [
      'Az ébrenlét hossza egyénfüggő — kísérletezz 20-30 perccel.',
      'Ne kelj fel túl aktívan (erős fény, telefon-görgetés kerülendő).',
    ],
  },
  {
    id: 'wild',
    icon: '🌌',
    title: 'WILD',
    subtitle: 'Wake-Initiated Lucid Dream',
    level: 'Szakértő',
    intro:
      'Éber tudattal lépsz át közvetlenül az álomba, miközben a tested elalszik. Nehezebb, de nagyon élénk, azonnal lucid álmot adhat. Gyakran hypnagóg képek és testérzések (rezgés, súly) kísérik — ezek normálisak.',
    steps: [
      'WBTB után feküdj kényelmesen, lazíts teljesen.',
      'Tartsd a tudatod éberen, miközben a tested elalszik.',
      'Figyeld passzívan a hypnagóg képeket, ne ragadj meg egyikben sem.',
      'Használhatsz „horgonyt": számolást vagy a légzés figyelését.',
      'Amikor egy jelenet stabillá válik, lépj bele — már az álomban vagy.',
    ],
    tips: [
      'A test-rezgés/hangok ijesztőek lehetnek, de veszélytelenek — engedd elmúlni.',
      'Ne mozdulj és ne nyeld tudatosan — az visszahoz az ébrenlétbe.',
      'Kezdőknek nehéz; előbb a MILD+WBTB-t érdemes gyakorolni.',
    ],
  },
  {
    id: 'dream-signs',
    icon: '🔎',
    title: 'Álomjelek',
    subtitle: 'Ismerd fel a saját mintáid',
    level: 'Kezdő',
    intro:
      'Az álomjelek visszatérő elemek az álmaidban (helyszínek, emberek, témák, lehetetlen dolgok). Ha megtanulod felismerni őket, azok „ébresztőként" működnek az álomban. Az appod Insights füle automatikusan kigyűjti a leggyakoribb címkéidet.',
    steps: [
      'Vezess naplót, és címkézd fel az álmaid elemeit.',
      'Hetente nézd át: mi tér vissza gyakran?',
      'Válaszd ki a top 2-3 álomjeledet.',
      'Napközben, ha ilyesmivel találkozol, végezz reality checket.',
      'A MILD során ezekre a jelekre koncentrálj.',
    ],
    tips: [
      'A leggyakoribb álomjelek: repülés, fogak, kései érkezés, halott/ismerős emberek.',
      'A személyes álomjelek erősebbek, mint az általánosak.',
    ],
  },
];
