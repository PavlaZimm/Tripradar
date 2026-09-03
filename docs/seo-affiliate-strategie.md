# TripRadar.cz — SEO & affiliate strategie pro low-KD long-taily

**Verze:** 1.0 | **Datum:** 3. 9. 2026 | **Trh:** CZ (google.cz)
**Zdroj dat o hledanosti, KD a CPC:** Marketing Miner (jazyk `cs`), sběr 3. 9. 2026

---

## 0. Výchozí stav a co z něj plyne

Podle dat z Marketing Mineru má tripradar.cz aktuálně **248 odhadovaných organických návštěv měsíčně na 435 klíčových slovech**. To je doména s nízkou autoritou — a to je *nejdůležitější vstup celé strategie*.

**Praktický důsledek:** dokud web nemá ~30+ odkazujících domén, je jakékoli KW s obtížností nad ~30 ztráta času a rozpočtu. Celá strategie níže proto míří výhradně na pásmo **KD 0–30** a staví na tom, že v každé vertikále existuje vrstva dotazů, které konkurence nechala ležet, protože jsou pro velké e-shopy „příliš malé".

Tři pravidla, která drží celý dokument pohromadě:

1. **Neútočíme na produktová generika.** „Spacák" (2 800/měs, KD 52) ani „cestovní pojištění" nikdy neuhrajeme proti Alze, Hudy a Slevomatu. Uhrajeme ale „ultralight spacák" (170/měs, KD 20) a „pojištění na hory do Rakouska" (100/měs, CPC 36,72 Kč).
2. **Hledanost není hodnota. Hodnota je hledanost × CPC × blízkost k nákupu.** Dotaz se 30 hledáními a CPC 45 Kč je pro affiliate cennější než dotaz s 1 500 hledáními a CPC 0 Kč.
3. **Každý článek vzniká proti konkrétnímu feedu.** Téma, které nemá napárovatelný produkt u partnera, se nepíše — jde do backlogu.

### Poznámka k dostupnosti feedů

Pět zadaných XML feedů (Svět karavanů, NejOutdoor, ProCamping, Zážitky.cz, Adrop) **se z tohoto prostředí nepodařilo stáhnout** — egress proxy relace vrátila na všech pět hostů `403` na CONNECT (organizační síťová politika, nikoli chyba feedů). Kapitola 4 proto pracuje se **standardními specifikacemi formátů** (Google Merchant / Mergado a Heureka), které jsou veřejně dokumentované a stabilní. Konkrétní názvy polí je nutné jednou ověřit proti živému feedu — v kapitole 4 je na to připravený ověřovací skript, který to udělá za 30 sekund.

---

## KROK 1: Nákupní záměr a ideální typologie KW

### Obecný princip: čtyři vrstvy long-tailu, které dobýváme

| Vrstva | Vzorec dotazu | Proč je slabě obsazená | Konverzní síla |
|---|---|---|---|
| **L1 — Parametrický výběr** | „jaký X na Y", „X do minus 10" | E-shopy mají kategorie, ne rádce | ★★★★☆ |
| **L2 — Problém → produkt** | „jak vyřešit X", „co když Y" | Blogy to píšou bez produktů, e-shopy o tom nepíšou | ★★★☆☆ |
| **L3 — Lokace + výbava** | „X v Rakousku", „X na Šumavě" | Nikdo nespojuje destinaci s nákupním seznamem | ★★★★☆ |
| **L4 — Checklist / seznam** | „co sbalit na X", „seznam věcí na X" | Vysoká šance na featured snippet, přirozeně unese 15+ produktů | ★★★★★ |

L4 je pro TripRadar strategicky nejcennější: checklist je *jediný* formát, kde je 20 produktových odkazů na stránce přirozený a ne spamový.

---

### 1.1 Karavaning & Vanlife → Svět karavanů

**Kdo hledá:** člověk, který si právě koupil (nebo staví) dodávku a v horizontu týdnů utratí 20–250 tisíc za vybavení. Extrémně vysoká hodnota zákazníka, extrémně nízká loajalita ke zdroji informací — kdo mu poradí první, ten prodá.

**Nákupní záměr:** dominantně *commercial investigation* s velmi krátkou cestou k transakci. Uživatel neřeší „chci karavan", řeší „mám Ducato, potřebuju do něj topení a nevím, jestli 2 kW stačí".

**Čemu se vyhnout:** „obytná dodávka" (3 300/měs, KD 27) vypadá lákavě, ale SERP drží bazary a prodejci — je to *transakční* dotaz na koupi vozu, ne na vybavení. Neprodáme přes něj nic z feedu. Stejně tak „obytná dodávka bazar" (1 400/měs) a „půjčovna" — jiný byznys model.

**Kde je díra (data z Marketing Mineru):**

| Klíčové slovo | Hledanost/měs | KD | CPC | Poznámka |
|---|---|---|---|---|
| solární panely na karavan | 240 | **0** | 2,50 Kč | KD nula při 240 hledáních |
| obytná vestavba do dodávky | 210 | **17** | 4,13 Kč | nejvyšší CPC ve vertikále |
| vybavení do karavanu | 140 | **7** | 3,05 Kč | čistý checklist dotaz |
| solární panel na karavan | 140 | **9** | 2,30 Kč | |
| obytná dodávka 4x4 | 120 | 29 | 3,02 Kč | yoy +38 % |
| přestavba dodávky na obytné auto | 90 | 24 | 3,88 Kč | |
| solární panel na karavan komplet | 80 | — | 2,90 Kč | „komplet" = nákupní signál |
| jaký solární panel na karavan | 70 | **0** | 1,38 Kč | **featured snippet v SERPu** |
| jak vybrat karavan | 60 | **16** | — | **yoy +484 %** |
| obytná dodávka přestavba | 60 | **15** | — | yoy +13,5 % |
| kde zaparkovat karavan | 40 | **10** | — | **featured snippet v SERPu** |
| vanlife | 410 | 20 | 2,99 Kč | brandový hub, ne konverzní |

> **Klíčový insight:** celý solární shluk (240 + 140 + 80 + 70 + 50 ≈ 580 hledání/měs) má obtížnost **0–9**. To je nejlevnější organická návštěvnost v celém zadání. Jeden dobře udělaný článek posbírá celý shluk.

---

### 1.2 Outdoor & Kemping → NejOutdoor, ProCamping

**Kdo hledá:** dva různí lidé, a je zásadní je nemíchat. (a) *Turista na přechod* — řeší gramy, komfortní teplotu, vodní sloupec, kupuje jednou za 3 roky drahou věc. (b) *Rodina do kempu* — řeší cenu, kapacitu, praktičnost, kupuje každý rok levné věci. Pro affiliate marži je zajímavější (a).

**Nákupní záměr:** *commercial investigation* s dlouhým rozhodovacím cyklem (týdny). Uživatel čte 5–8 zdrojů, než koupí. To je dobře — je čas ho zachytit.

**Čemu se vyhnout:** „spacák" (2 800, KD 52), „decathlon spacák" (980, KD 70), „kempování" (370, KD 59), „kempování v ČR" (180, KD 69). Vše brandové nebo příliš obsazené.

**Kde je díra:**

| Klíčové slovo | Hledanost/měs | KD | CPC | Poznámka |
|---|---|---|---|---|
| via ferrata set | 470 | **20** | 3,05 Kč | yoy +31 %, drahý produkt |
| ultralehký spacák | 280 | 30 | 2,65 Kč | hraniční, ale strategický |
| zimní spacák | 220 | **15** | 2,18 Kč | podzimní sezónnost |
| rybářský spacák | 190 | **3** | 2,71 Kč | KD tři |
| ultralight spacák | 170 | **20** | 2,76 Kč | |
| lehký spacák | 160 | 33 | 2,27 Kč | |
| kempování na divoko | 150 | **17** | 0,87 Kč | |
| lehký stan pro dva | 150 | 24 | 1,93 Kč | peak červen–srpen |
| spacák pro psa | 150 | **10** | 2,37 Kč | nika bez konkurence |
| kempování v Rakousku | 140 | **10** | 3,40 Kč | **featured snippet** |
| via ferrata sety | 130 | 33 | 3,05 Kč | |
| jak se vybavit na kempování | 100 | — | — | **yoy +3 724 %** |
| vychytávky na kempování | 100 | — | 0,89 Kč | ideální produktový výpis |
| via ferrata Rakousko | 80 | **11** | 1,65 Kč | lokace + výbava |
| vařiče na kempování | 70 | — | 1,43 Kč | |
| seznam věcí na kempování | 20 | 25 | — | **featured snippet** |

---

### 1.3 Zážitky & Adrenalin → Zážitky.cz, Adrop

**Kdo hledá:** dva odlišné záměry. (a) *Kupující zážitek pro sebe* — řeší cenu a lokalitu, konverze do týdne. (b) *Kupující dárek* — řeší „co koupit člověku, který má všechno", extrémní sezónnost (listopad–prosinec = 2–3× průměr).

**Nákupní záměr:** nejkratší cesta k nákupu ze všech čtyř vertikál. „Tandemový seskok cena" je fakticky předposlední klik před objednávkou.

**Čemu se vyhnout:** „zážitkový dárek pro muže" (500/měs, KD 46) a „zážitkový dárek" (240, KD 40) — SERP drží Slevomat, Allegro a samotné Zážitky.cz. Proti nim s DR pod 20 nemáme šanci. **Jdeme na lokační a nikové varianty, kde KD spadne na 6–15.**

**Kde je díra:**

| Klíčové slovo | Hledanost/měs | KD | CPC | Poznámka |
|---|---|---|---|---|
| tandemový seskok | 1 500 | 23 | 9,08 Kč | hlavní cíl vertikály |
| tandemový seskok padákem | 540 | 23 | 10,70 Kč | |
| tandemový seskok Prostějov | 180 | 23 | 9,88 Kč | local pack v SERPu |
| tandemový seskok cena | 150 | **14** | 2,93 Kč | featured snippet příležitost |
| tandemový seskok Most | 140 | 23 | 10,79 Kč | |
| zážitkový dárek pro rybáře | 100 | 33 | 3,22 Kč | **FS + shopping ads** |
| tandemový seskok Brno | 90 | **15** | 8,42 Kč | |
| tandemový seskok Kunovice | 90 | 24 | 7,55 Kč | |
| tandemový seskok Ostrava | 80 | 27 | 5,74 Kč | |
| tandemový seskok Kolín | 60 | — | 10,59 Kč | yoy +76 % |
| tandemový seskok Příbram | 50 | **6** | 12,70 Kč | KD šest při CPC 12,70 |
| tandemový seskok Praha | 50 | **6** | 9,13 Kč | **featured snippet** |
| poukaz na tandemový seskok | 30 | — | **27,68 Kč** | nejvyšší CPC vertikály |

> **Klíčový insight:** lokační varianty tandemového seskoku mají dohromady ~800 hledání/měs při KD 6–27 a CPC 5,74–12,70 Kč. Jedna přehledová stránka + regionální podstránky posbírají celý shluk.

---

### 1.4 Cestovní pojištění & služby → eHub

**Kdo hledá:** člověk 3–10 dní před odjezdem na hory. Nejvyšší komerční hodnota ze všech čtyř vertikál — CPC běžně 20–45 Kč, tedy 10× výš než outdoor vybavení.

**Nákupní záměr:** *transakční s obavou*. Uživatel neřeší, jestli pojištění chce; řeší, jestli to, co si kupuje, **opravdu zaplatí vrtulník**. Kdo tuhle obavu adresuje konkrétně (limity, výluky, jméno pojišťovny), ten konvertuje.

**Čemu se vyhnout:** „pojištění na hory" (290/měs, **KD 79**) a „cestovní pojištění" — tam jsou srovnávače s desetiletou historií. Zabít se na tom dá libovolný rozpočet.

**Kde je díra:**

| Klíčové slovo | Hledanost/měs | KD | CPC | yoy |
|---|---|---|---|---|
| cestovní pojištění na hory | 340 | — | **23,72 Kč** | +72 % |
| co je cestovní pojištění | 190 | — | 12,59 Kč | −18 % |
| kolik stojí cestovní pojištění | 120 | — | 8,58 Kč | −30 % |
| pojištění na hory do Rakouska | 100 | — | **36,72 Kč** | +35 % |
| jak vybrat cestovní pojištění | 90 | — | 13,64 Kč | **+499 %** |
| kde sjednat cestovní pojištění | 70 | — | **20,64 Kč** | +4 % |
| cestovní pojištění do hor | 60 | — | **26,99 Kč** | **+466 %** |
| nejlepší pojištění na hory | 60 | — | 23,20 Kč | +56 % |
| pojištění na hory Slovensko | 50 | — | 29,75 Kč | **+229 %** |
| pojištění na hory v ČR | 40 | — | 17,52 Kč | +61 % |
| pojištění na hory online | 30 | — | **45,72 Kč** | −25 % |
| úrazové pojištění na hory | 30 | — | 24,19 Kč | +3 % |

**Sezónnost je tady zásadní** (data Marketing Miner, měsíční rozpad):

- `pojištění na hory`: leden **960**, únor **960**, březen 460, prosinec 310 — vs. červen 70
- `cestovní pojištění na hory`: listopad **1 400**, září 600, únor 480, leden 400

> **Provozní důsledek:** tyto články musí být publikované, zaindexované a odležené **nejpozději v polovině září**. Publikace v prosinci znamená minout celý vrchol sezóny.

---

## KROK 2: Zadání pro Marketing Miner

### 2.1 Seed keywords k vložení (30 dotazů)

Vlož do **Průzkumníku klíčových slov → Návrhy klíčových slov**, jazyk **čeština (cs)**, zdroj **našeptávače + související dotazy**, zapnuté **„Získat data o klíčových slovech"** (jinak nedostaneš KD a SERP features).

**Skupina A — Karavaning & Vanlife (7 seedů)**
```
solární panel na karavan
nezávislé topení do dodávky
obytná vestavba do dodávky
vybavení do karavanu
chemické wc do karavanu
markýza na dodávku
elektroinstalace v dodávce
```

**Skupina B — Outdoor & Kemping (9 seedů)**
```
ultralehký spacák
lehký stan pro dva
via ferrata set
kempování na divoko
vařič na kemp
nafukovací karimatka
turistický batoh na vícedenní přechod
čelovka na turistiku
filtr na vodu turistika
```

**Skupina C — Zážitky & Adrenalin (7 seedů)**
```
tandemový seskok cena
let balonem
adrenalinový zážitek pro dva
zážitkový dárek pro rybáře
jízda v terénním voze
paragliding tandem
zážitkový poukaz
```

**Skupina D — Pojištění & služby (7 seedů)**
```
cestovní pojištění na hory
pojištění na ferraty
pojištění rizikové sporty
pojištění na skialpy
pojištění storna zájezdu
připojištění zavazadel
pojištění na cestu do Rakouska
```

### 2.2 Filtry, které nastavit

**Krok 1 — hrubé odsítí (nastav při exportu):**

| Filtr | Hodnota | Proč |
|---|---|---|
| Hledanost | **≥ 20/měs** | Pod 20 nemá smysl psát samostatnou stránku; použij jako H3/FAQ |
| Hledanost | **≤ 2 000/měs** | Nad 2 000 je v CZ prakticky vždy obsazeno velkými hráči |
| Obtížnost (KD) | **≤ 30** | Strop odpovídající aktuální autoritě tripradar.cz |
| Jazyk | čeština | |

**Krok 2 — komerční filtr (aplikuj v exportu do tabulky):**

| Filtr | Hodnota | Proč |
|---|---|---|
| CPC | **≥ 1,50 Kč** | Nulové CPC = informační dotaz bez inzerentů = neprodá |
| Výjimka | CPC < 1,50 Kč **povol**, pokud dotaz obsahuje „co sbalit / seznam / checklist / vybavení / výbava" | Checklisty mají nízké CPC, ale nejvyšší produktovou nosnost |

**Krok 3 — prioritizační skóre (dopočítej ve sloupci):**

```
Priorita = (Hledanost × CPC) / (KD + 5)
```

Řaď sestupně. `+5` ve jmenovateli brání dělení nulou u KD = 0 a zároveň nenafoukne mikro-dotazy do absurdna. Toto skóre samo o sobě vytáhne nahoru přesně ty dotazy, které jsou v kapitole 1 označené jako „díra" — což je dobrá kontrola, že je filtr nastavený správně.

**Krok 4 — ruční vyřazení (projdi export očima, ~10 minut):**

Vyhoď řádky obsahující:
- **Brandy e-shopů:** `decathlon`, `alza`, `sportisimo`, `hudy`, `intersport`, `slevomat`, `rohlik`
- **Bazarový intent:** `bazar`, `bazoš`, `bazos`, `použit`, `prodám`, `půjčovna`, `pronájem` (jiný byznys model, feedy to neobslouží)
- **Nesouvisející homonyma:** u seedu „karavan" vypadne `karavan film kde sledovat` (190/měs, film), u „kempování" vypadne celá řada `baby born kempování` (hračka)
- **Diakritické duplicity:** `spacak` vs `spacák` — nech jen variantu s diakritikou, Google je vyhodnocuje totožně

**Krok 5 — co si naopak označit barevně:**

Ve sloupci `serp_features` si zvýrazni řádky s **`featured_snippet`** a **`people_also_ask`**. To jsou dotazy, kde se dá získat nultá pozice odstavcem o 40–55 slovech přímo pod H2 — nejlevnější viditelnost, jakou web s nízkou autoritou může dostat. V datech výše to jsou např. `jaký solární panel na karavan`, `kde zaparkovat karavan`, `kempování v Rakousku`, `seznam věcí na kempování`, `tandemový seskok Praha`, `zážitkový dárek pro rybáře`.

### 2.3 Doplňkové miningy (nepovinné, ale doporučené)

1. **Návrhy z otázek** (`suggestions_type = questions`) na seedech `karavan`, `cestovní pojištění`, `spacák` — přímý zdroj FAQ sekcí a tím i `FAQPage` structured data, které už má repo implementované v `src/components/seo/FAQSchema.tsx`.
2. **Analýza konkurence → Společná klíčová slova** pro `svetkaravanu.cz`, `nejoutdoor.cz`, `zazitky.cz`. Cíl: najít dotazy, na které partner rankuje svou **kategoriální** stránkou. Tam nemá rádcovský obsah a my ho tam předběhneme — a zároveň mu pošleme trafiku zpátky přes affiliate. Win-win, který se dobře vyjednává při domlouvání vyšší provize.

---

## KROK 3: Obsahové clustery & affiliate architektura

### 3.0 Konvence platné pro všech 12 článků

**Umístění affiliate prvků — pravidlo tří dotyků:**

| Pozice | Prvek | Účel |
|---|---|---|
| Po 1. sekci (~300 slov) | **1 kontextový odkaz** v textu | Zachytí uživatele, který už ví, co chce |
| Střed článku | **Produktový box** (`AffiliateBox`) | Hlavní konverzní bod |
| Před FAQ | **Srovnávací tabulka** nebo **checklist ke stažení** | Zachytí uživatele, který dočetl a rozhoduje se |

Nikdy víc než **1 affiliate prvek na ~400 slov** mimo srovnávací tabulku. Tabulka je výjimka — tam je 5–10 odkazů očekávané chování a Google to tak čte.

**Technické nastavení odkazů (platí bez výjimky):**

```html
<a href="{tracking_url}" rel="sponsored nofollow noopener" target="_blank">
```

Repo už to má správně v `src/components/article/AffiliateBox.tsx` — atribut je tam `rel="noopener noreferrer nofollow"`. **Doporučená úprava:** přidat `sponsored`. Google od roku 2019 preferuje `rel="sponsored"` pro placené/affiliate odkazy; `nofollow` samotné funguje, ale `sponsored` je explicitní signál a snižuje riziko manuální penalizace.

**Disclosure:** viditelná věta nad prvním affiliate prvkem, ne jen v patičce. Repo už má správný text v `AffiliateBox`: *„Partnerský link — platíš stejnou cenu, nám pomáhá provozovat magazín."* Tohle nechat.

---

### 3.1 VERTIKÁLA A — Karavaning & Vanlife (Svět karavanů)

---

#### **A1 — H1: „Jaký solární panel na karavan? Výpočet spotřeby, srovnání kompletů a montáž krok za krokem"**

**Cílová KW:** `jaký solární panel na karavan` (70/měs, KD 0, FS) · `solární panel na karavan` (140, KD 9) · `solární panely na karavan` (240, KD 0) · `solární panel na karavan komplet` (80) · `solární panely na kempování` (20)
**Souhrnný potenciál shluku:** ~580 hledání/měs při KD 0–9
**Search intent:** commercial investigation — uživatel má vůz, ví že chce solár, neví jaký výkon a jestli kupovat komplet nebo po dílech.

**Struktura:**

```
H1  Jaký solární panel na karavan? Výpočet spotřeby, srovnání kompletů a montáž
    [Disclosure věta]

H2  Kolik wattů opravdu potřebujete (výpočet za 2 minuty)
    ⮕ FEATURED SNIPPET TARGET: odstavec 45 slov s odpovědí "pro víkendové
      použití 100–150 W, pro celosezónní vanlife 300–400 W" hned pod H2
    H3  Tabulka spotřeby: lednice, čerpadlo, nabíječky, topení
    H3  Vzorec: (denní spotřeba Wh × 1,4) ÷ 4 hodiny efektivního slunce
    ⮕ AFFILIATE PRVEK 1: kontextový odkaz
      "…u 150Ah baterie počítejte minimálně se 200 W panelem —
       [modely v tomto výkonovém pásmu] najdete u Světa karavanů."

H2  Monokrystal vs. polykrystal vs. flexibilní: co dává smysl na střechu
    H3  Kdy se vyplatí flexibilní panel (a kdy je to chyba)

H2  Kompletní sady vs. skládání po dílech
    ⮕ AFFILIATE PRVEK 2: SROVNÁVACÍ TABULKA (3–5 kompletů z feedu)
      Sloupce: Výkon | Typ | Regulátor v ceně | Rozměry | Cena | CTA
      CTA text: "Zjistit dostupnost"
    H3  Na čem se nevyplatí šetřit: MPPT regulátor
    H3  Na čem ano: kabeláž a průchodky

H2  Montáž krok za krokem
    H3  Lepení vs. vrtání — co udělá se zárukou na karoserii
    H3  Kudy vést kabel do interiéru
    ⮕ AFFILIATE PRVEK 3: PRODUKTOVÝ BOX (AffiliateBox)
      Label: "Montážní sada a průchodka"
      CTA: "Koupit u partnera"

H2  Nejčastější chyby
H2  FAQ  ⮕ generuje FAQPage schema
    Zdroj otázek: Marketing Miner suggestions_type=questions
```

**Anchor texty (rotovat, nikdy neopakovat stejný 2×):**
- `modely v tomto výkonovém pásmu` (deskriptivní, nejbezpečnější)
- `solární komplety pro obytné vozy` (KW-blízký, ale ne přesná shoda)
- `MPPT regulátory u Světa karavanů` (brandový)

**Anti-vzor:** nikdy `klikněte zde`, nikdy `nejlepší solární panel na karavan` jako anchor (přesná shoda na peněžní KW = klasický spam signál).

**Tracking:** `?utm_source=tripradar&utm_medium=affiliate&utm_campaign=karavan-solar&utm_content=a1-tabulka-radek3`
`utm_content` rozlišuje *pozici v článku* — po měsíci uvidíte, jestli konvertuje tabulka, nebo box, a podle toho upravíte šablonu pro dalších 50 článků.

---

#### **A2 — H1: „Obytná vestavba do dodávky: co koupit hotové a co si postavit (rozpočty 40 / 120 / 250 tisíc)"**

**Cílová KW:** `obytná vestavba do dodávky` (210/měs, KD 17, CPC 4,13 Kč) · `obytná dodávka přestavba` (60, KD 15) · `přestavba dodávky na obytné auto` (90, KD 24) · `přestavba dodávky na obytné auto cena` (90) · `přestavba dodávky na obytné auto legislativa` (60)
**Search intent:** smíšený — informační („kolik to stojí") přecházející v transakční („co objednat"). Rozpočtové varianty tenhle přechod obsluhují přesně.

**Struktura:**

```
H1  Obytná vestavba do dodávky: co koupit hotové a co si postavit
H2  Tři rozpočty, tři výsledky
    H3  40 000 Kč — spací modul a nic víc  → seznam 6 položek + odkazy
    H3  120 000 Kč — kuchyňka, voda, elektro  → seznam 14 položek
    H3  250 000 Kč — plnohodnotný celoroční vůz  → seznam 22 položek
    ⮕ AFFILIATE PRVEK 1+2+3: každý rozpočet = jeden PRODUKTOVÝ BOX
      s 3–4 klíčovými položkami z feedu
      Toto je jediné místo v celé strategii, kde jsou 3 boxy v řadě
      obhajitelné — jsou to tři různé odpovědi na tři různé rozpočty.

H2  Co si opravdu nevyrábět svépomocí
    H3  Nezávislé topení — proč montáž patří do servisu
    H3  Plyn a revize
    ⮕ AFFILIATE PRVEK 4: kontextový odkaz na topení

H2  Legislativa: kdy je z dodávky obytný vůz
    H3  Podmínky přestavby v technickém průkazu
    ⮕ Vnitřní odkaz na A3 (checklist vybavení)

H2  FAQ
```

**Anchor texty:** `nezávislá topení do 2 kW`, `vestavbové moduly`, `kompletní kuchyňské jednotky`
**Tracking:** `utm_campaign=karavan-vestavba`, `utm_content=a2-rozpocet-120k`

---

#### **A3 — H1: „Vybavení do karavanu: checklist na první sezónu (86 položek podle priority)"**

**Cílová KW:** `vybavení do karavanu` (140/měs, KD 7, CPC 3,05 Kč) · `jak vybavit karavan` (20) · `jak vylepšit karavan` (40) · `kde zaparkovat karavan` (40, KD 10, FS) · `vychytávky na kempování` (100)
**Search intent:** informační s vysokou produktovou nosností. Typ L4 — nejvyšší affiliate kapacita ze všech formátů.

**Struktura:**

```
H1  Vybavení do karavanu: checklist na první sezónu
H2  Bez čeho neodjedete (14 položek)   → tabulka s odkazy
H2  Co doceníte po prvním týdnu (23 položek)  → tabulka s odkazy
H2  Vychytávky, které nejsou nutné, ale mění komfort (31 položek)
H2  Co si nekupujte hned (18 položek a proč)   ← budování důvěry
H2  Kde s karavanem legálně přespat
    ⮕ FEATURED SNIPPET TARGET pro "kde zaparkovat karavan"
    H3  Kempy vs. stellplatzy vs. parkoviště
    ⮕ AFFILIATE PRVEK: eHub — cestovní pojištění (cross-sell)
H2  Checklist ke stažení (PDF)
    ⮕ EMAIL CAPTURE přes NewsletterForm (už v repu)
    ⮕ PDF obsahuje odkazy — ale zkrácené přes vlastní /go/ redirect
H2  FAQ
```

> **Pozor u PDF:** odkazy v PDF nesmí být syrové affiliate URL. Použijte vlastní redirect `/go/{slug}` (viz kapitola 4.5) — jinak nemáte kontrolu nad linkem, který koluje mimo web, a při změně partnera vám PDF navždy odkazuje do prázdna.

**Sekce „Co si nekupujte hned"** je záměrná: článek, který od něčeho odrazuje, konvertuje na zbylých položkách lépe než článek, který doporučuje všechno. Zároveň je to nejsilnější E-E-A-T signál v celém textu.

---

### 3.2 VERTIKÁLA B — Outdoor & Kemping (NejOutdoor, ProCamping)

---

#### **B1 — H1: „Nejlepší lehký stan pro dva na přechod hor: srovnání podle hmotnosti, vodního sloupce a ceny"**

**Cílová KW:** `lehký stan pro dva` (150/měs, KD 24) · `stan pro dva lehký` (90, yoy +22 %) · `stan na kempování` (60, KD 39 — jen jako H2) · `stany na kempování` (30, KD 26)
**Sezónnost:** peak červen–srpen (260/měs), minimum listopad (50). **Publikovat nejpozději v březnu.**
**Search intent:** commercial investigation, dlouhý cyklus, vysoká citlivost na parametry.

**Struktura:**

```
H1  Nejlepší lehký stan pro dva na přechod hor
H2  Co znamená "lehký" v praxi
    ⮕ FS TARGET: "Za lehký se u dvoumístného stanu považuje…" (45 slov)
    H3  Hmotnost balení vs. minimální hmotnost — na co si dát pozor
H2  Vodní sloupec: kolik opravdu potřebujete
    H3  3 000 vs. 5 000 mm — kdy je vyšší číslo marketing
    ⮕ AFFILIATE PRVEK 1: kontextový odkaz v textu
H2  Srovnání 7 stanů do 2,5 kg
    ⮕ AFFILIATE PRVEK 2: SROVNÁVACÍ TABULKA (hlavní konverzní bod)
      Sloupce: Model | Hmotnost | Vodní sloupec | Konstrukce |
               Vnitřní rozměr | Cena | CTA
      Řazení: podle hmotnosti vzestupně (ne podle provize)
      Označit: "Nejlepší poměr cena/hmotnost", "Nejlevnější do 2 kg"
H2  Jednoplášťový vs. dvouplášťový
H2  Co ke stanu dokoupit
    ⮕ AFFILIATE PRVEK 3: PRODUKTOVÝ BOX — podlážka, kolíky, opravná sada
    ⮕ Vnitřní odkaz na B2 (spacák)
H2  FAQ
```

**Anchor texty:** `stany do 2 kg`, `dvouplášťové modely`, `hliníkové kolíky`
**Tracking:** `utm_campaign=outdoor-stan-2os`, `utm_content=b1-tabulka-{model_slug}`

> **Pravidlo pro tabulku:** řadit podle deklarovaného parametru, nikdy podle výše provize. Uživatel to pozná do tří vteřin a je to jediná věc, která zabije důvěru rychleji než skryté affiliate.

---

#### **B2 — H1: „Ultralehký spacák: jak vybrat podle komfortní teploty (a kdy stačí letní za 1 500 Kč)"**

**Cílová KW:** `ultralehký spacák` (280/měs, KD 30) · `ultralight spacák` (170, KD 20) · `lehký spacák` (160, KD 33) · `zimní spacák` (220, KD 15) · `jak vybrat spacák` (140, KD 56 — pouze jako H2, ne jako cíl)
**Search intent:** commercial investigation. Uživatel se bojí, že koupí drahý spacák a bude mu zima.

**Struktura:**

```
H1  Ultralehký spacák: jak vybrat podle komfortní teploty
H2  Tři teploty na štítku a proč vás dvě z nich nezajímají
    ⮕ FS TARGET: rozdíl comfort / limit / extreme ve 45 slovech
H2  Peří vs. syntetika: rozhodovací strom
    H3  Kdy syntetika vyhraje (vlhko, cena, údržba)
    H3  Fill power: co znamená 650 vs. 850 cuin
    ⮕ AFFILIATE PRVEK 1: kontextový odkaz
H2  Srovnání podle použití
    ⮕ AFFILIATE PRVEK 2: SROVNÁVACÍ TABULKA (5–7 modelů)
      Sloupce: Model | Comfort °C | Hmotnost | Náplň | Balení | Cena | CTA
    H3  Letní přechod (comfort +8 °C a výš)
    H3  Třísezónní (0 až +5 °C)
    H3  Zimní (−10 °C a níž)  → cílí na `zimní spacák` (220/měs, KD 15)
H2  Co spacák zabije: skladování a praní
    ⮕ AFFILIATE PRVEK 3: PRODUKTOVÝ BOX — kompresní obal, prací prostředek
      (KW `kompresní obal na spacák` 90/měs, KD 27 — vlastní H3)
H2  FAQ
```

**Poznámka ke clusteru:** `rybářský spacák` (190/měs, **KD 3**) a `spacák pro psa` (150, KD 10) jsou samostatné niky s minimální konkurencí — **do tohoto článku nepatří**, ale patří do backlogu jako dvě samostatné stránky. Jsou to nejlevnější pozice v celé outdoor vertikále.

---

#### **B3 — H1: „Kempování na divoko v Rakousku: kde to legálně jde a co si sbalit (checklist ke stažení)"**

**Cílová KW:** `kempování v Rakousku` (140/měs, KD 10, **FS**) · `kempování na divoko` (150, KD 17) · `kempování na divoko Rakousko` (20) · `volné kempování v Rakousku` (10) · `jak se vybavit na kempování` (100, **yoy +3 724 %**) · `seznam věcí na kempování` (20, KD 25, **FS**)
**Search intent:** hybridní L3+L4 — informační vstup („smím tam spát?") s produktovým výstupem („co si vzít"). Ideální affiliate architektura: uživatel přijde na právní otázku a odejde s nákupním seznamem.

**Struktura:**

```
H1  Kempování na divoko v Rakousku: kde to legálně jde a co si sbalit
H2  Jak to v Rakousku funguje: spolková země od spolkové země
    ⮕ FS TARGET pro "kempování v Rakousku": přímá odpověď 50 slov
    H3  Tabulka: 9 spolkových zemí × pravidlo × pokuta
    H3  Nad hranicí lesa — kde platí výjimka
H2  Alternativa: stellplatzy a zemědělské kempy
H2  Co si sbalit (checklist podle priority)
    H3  Spaní: stan, spacák, karimatka
        ⮕ AFFILIATE PRVEK 1: PRODUKTOVÝ BOX
        ⮕ Vnitřní odkazy na B1 a B2
    H3  Voda a vaření
        ⮕ AFFILIATE PRVEK 2: kontextový odkaz na vařiče
          (KW `vařiče na kempování` 70/měs)
    H3  Bezpečnost a hygiena
H2  Pojištění: co dělat, když se něco stane v horách
    ⮕ AFFILIATE PRVEK 3: eHub box
    ⮕ Vnitřní odkaz na D2 (pojištění na hory do Rakouska)
    Toto je nejcennější prolink v celé struktuře — vede z CPC 3,40 Kč
    obsahu do CPC 36,72 Kč obsahu.
H2  Checklist ke stažení
    ⮕ EMAIL CAPTURE
H2  FAQ
```

---

### 3.3 VERTIKÁLA C — Zážitky & Adrenalin (Zážitky.cz, Adrop)

---

#### **C1 — H1: „Tandemový seskok: cena, průběh a co si vzít s sebou (srovnání 12 letišť v ČR)"**

**Cílová KW:** `tandemový seskok cena` (150/měs, KD 14) · `tandemový seskok` (1 500, KD 23) · `tandemový seskok padákem cena` (50) · `nejlevnější tandemový seskok` (10)
**Search intent:** transakční. Uživatel je 1–2 kliky od nákupu.

**Struktura:**

```
H1  Tandemový seskok: cena, průběh a co si vzít s sebou
H2  Kolik to stojí (aktuální ceny 2026)
    ⮕ FS TARGET: "Tandemový seskok v ČR stojí 3 900 až 7 500 Kč
      podle výšky a lokality." (věta pod 55 slov, hned pod H2)
    ⮕ AFFILIATE PRVEK 1: SROVNÁVACÍ TABULKA — hlavní konverzní bod
      Sloupce: Letiště | Kraj | Výška | Cena | Video v ceně | CTA
      12 řádků = 12 hubů pro vnitřní prolink na C2 a regionální stránky
      CTA: "Zobrazit termíny"
H2  Jak seskok probíhá minutu po minutě
    H3  Instruktáž a výstroj
    H3  Volný pád: 30–60 sekund
H2  Co si vzít a co nechat doma
    ⮕ AFFILIATE PRVEK 2: kontextový odkaz — Adrop / NejOutdoor
      (brýle, rukavice, obuv)
H2  Zdravotní omezení a váhový limit
H2  Seskok jako dárek: voucher vs. konkrétní termín
    ⮕ AFFILIATE PRVEK 3: PRODUKTOVÝ BOX — poukaz Zážitky.cz
      Cílí na `poukaz na tandemový seskok` (30/měs, CPC 27,68 Kč
      — nejvyšší CPC celé vertikály)
H2  FAQ
```

**Tracking:** `utm_campaign=zazitky-tandem`, `utm_content=c1-tabulka-{letiste_slug}`

---

#### **C2 — H1: „Tandemový seskok v Praze a středních Čechách: Příbram, Kolín, Mladá Boleslav — srovnání cen"**

**Cílová KW:** `tandemový seskok Praha` (50/měs, **KD 6**, FS) · `tandemový seskok Příbram` (50, **KD 6**, CPC 12,70 Kč) · `tandemový seskok Kolín` (60, CPC 10,59 Kč) · `tandemový seskok mladá boleslav` (20) · `letiště Příbram tandemový seskok` (10)
**Proč právě tohle:** KD 6 při CPC 9–13 Kč. To je nejsnazší uhratelná pozice v celém zadání.
**Search intent:** transakční + lokální. V SERPu je `local_pack` a `featured_snippet` — obojí jde získat.

**Struktura (šablona replikovatelná na dalších 6 regionů):**

```
H1  Tandemový seskok v Praze a středních Čechách
H2  Kde se v okolí Prahy skáče
    ⮕ FS TARGET: výčet 4 letišť s dojezdem z Prahy, do 50 slov
    H3  Letiště Příbram   → cena, výška, dojezd, ⮕ affiliate CTA
    H3  Letiště Kolín      → cena, výška, dojezd, ⮕ affiliate CTA
    H3  Mladá Boleslav     → cena, výška, dojezd, ⮕ affiliate CTA
    H3  Sazená / Roudnice  → cena, výška, dojezd, ⮕ affiliate CTA
H2  Srovnávací tabulka: cena vs. výška vs. dojezd z centra
    ⮕ HLAVNÍ AFFILIATE PRVEK
H2  Kdy se skáče a jak řešit počasí
H2  FAQ
⮕ Vnitřní odkaz zpět na C1 (pilířový článek)
```

> **Škálování:** tuhle šablonu vyplňte pro Brno (90/měs, KD 15), Ostravu (80, KD 27), Prostějov (180, KD 23), Most (140, KD 23), Kunovice (90, KD 24) a Hradec Králové (50, KD 36). Šest stránek, každá 1 200 slov, dohromady ~630 hledání/měs při průměrném CPC ~9 Kč. Toto je nejlepší poměr práce/výnos v celém dokumentu.

---

#### **C3 — H1: „Zážitkový dárek pro rybáře: 14 tipů od půldenního lovu po výbavu do 3 000 Kč"**

**Cílová KW:** `zážitkový dárek pro rybáře` (100/měs, KD 33, **FS + shopping ads**) · `rybářský spacák` (190, **KD 3**) · `spacák na ryby` (100, KD 10)
**Proč tenhle článek:** je to jediné místo, kde se **dva feedy protnou v jednom nákupním záměru** — zážitek (Zážitky.cz) i produkt (NejOutdoor). Průměrná hodnota objednávky roste, protože uživatel často koupí obojí.
**Sezónnost:** peak listopad (260/měs) a prosinec (210). **Publikovat do konce září.**

**Struktura:**

```
H1  Zážitkový dárek pro rybáře: 14 tipů
H2  Zážitky na vodě (5 tipů)
    ⮕ AFFILIATE PRVEK 1: PRODUKTOVÝ BOX — Zážitky.cz
      (lov s průvodcem, kurz mušky, noční lov)
H2  Výbava, kterou opravdu použije (6 tipů)
    H3  Rybářský spacák   ← cílí na KW s KD 3, 190 hledání/měs
        ⮕ AFFILIATE PRVEK 2: SROVNÁVACÍ TABULKA (NejOutdoor)
    H3  Křeslo a přístřešek
    H3  Čelovka a powerbanka
H2  Do 1 000 / 3 000 / 8 000 Kč
    ⮕ AFFILIATE PRVEK 3: tři cenové boxy
H2  Co rybáři nekupovat
H2  FAQ
```

---

### 3.4 VERTIKÁLA D — Cestovní pojištění & služby (eHub)

> **Pozor na E-E-A-T.** Pojištění je pro Google **YMYL téma** (Your Money or Your Life) a hodnotí se přísněji. Všechny tři články níže musí mít: podepsaného autora s vyplněnou biografií (repo má kolekci `Authors` s EEAT poli), **datum poslední aktualizace** (pole `updatedDate` v `src/collections/Articles.ts`), odkazy na primární zdroje (pojistné podmínky partnerů) a explicitní větu, že článek není finanční poradenství.

---

#### **D1 — H1: „Pojištění na ferraty a rizikové sporty: které pojišťovny je opravdu kryjí (srovnání 2026)"**

**Cílová KW:** `úrazové pojištění na hory` (30/měs, CPC 24,19 Kč) · `nejlepší pojištění na hory` (60, CPC 23,20 Kč) · `pojištění na hory srovnání` (10) · `pojištění na hory v ČR` (40, CPC 17,52 Kč)
**Podpůrné (přivedou trafiku, konvertují do pojištění):** `via ferrata set` (470, KD 20) · `via ferrata Rakousko` (80, KD 11)
**Search intent:** transakční s obavou. Nejkomplexnější a nejcennější dotaz v zadání — protože nikdo na něj neodpovídá konkrétně.

**Struktura:**

```
H1  Pojištění na ferraty a rizikové sporty: které pojišťovny je kryjí
    [Disclosure + věta "Nejde o finanční poradenství" + datum aktualizace]

H2  Proč běžné cestovní pojištění na ferratě nemusí platit
    ⮕ FS TARGET: konkrétní odpověď ve 45 slovech
    H3  Rozdíl mezi "rizikové" a "extrémní" sporty v podmínkách
    H3  Kde přesně ve smlouvě to hledat

H2  Srovnání: 6 pojišťoven a co u nich ferrata znamená
    ⮕ AFFILIATE PRVEK 1: SROVNÁVACÍ TABULKA (eHub) — hlavní konverzní bod
      Sloupce: Pojišťovna | Ferrata krytá | Limit léčebných výloh |
               Pátrání a záchrana | Cena 7 dní | CTA
      CTA: "Spočítat cenu"
      ⚠ Každý řádek musí mít odkaz na zdroj (PDF pojistných podmínek).
        Bez toho je to YMYL obsah bez opory a Google ho nepustí nahoru.

H2  Kolik má stačit limit na pátrání a záchranu
    H3  Vrtulník v Rakousku vs. Slovensku vs. Itálii — reálné částky

H2  Výbava, kterou pojišťovny vyžadují
    ⮕ AFFILIATE PRVEK 2: PRODUKTOVÝ BOX — NejOutdoor, ferratový set
      (KW `via ferrata set` 470/měs, KD 20)
      Přirozený cross-sell: pojistka vyžaduje certifikovaný set → tady je.

H2  Co dělat při úrazu na ferratě (postup)
H2  FAQ
```

**Anchor texty:** `srovnat krytí rizikových sportů`, `podmínky u {pojišťovna}`, `certifikované ferratové sety`
**Tracking eHub:** tracking link partnera + **sub-ID / channel parametr** (v rozhraní eHubu ho ověřte — bývá `chan`), hodnota `tripradar-d1-tabulka-{pojistovna}`. UTM parametry přidávejte **až za** partnerský tracking link, ne místo něj — jinak se rozbije atribuce na straně sítě.

---

#### **D2 — H1: „Cestovní pojištění na hory do Rakouska: co musí krýt, aby zaplatilo vrtulník"**

**Cílová KW:** `pojištění na hory do Rakouska` (100/měs, **CPC 36,72 Kč**) · `cestovní pojištění na hory` (340, CPC 23,72 Kč, yoy +72 %) · `pojištění na hory Rakousko` (20, CPC 32,80 Kč) · `pojištění na hory Slovensko` (50, CPC 29,75 Kč, yoy +229 %)
**Search intent:** transakční, 3–10 dní před odjezdem.
**Sezónnost — kritická:** `pojištění na hory` má leden **960** a únor **960** vs. červen 70. `cestovní pojištění na hory` má listopad **1 400**.

> **⏰ Deadline: publikovat do 15. září 2026.** Článek potřebuje 6–10 týdnů na zaindexování a získání pozic, aby zachytil listopadový a lednový vrchol. Publikace v prosinci = minutá sezóna a čekání na další rok.

**Struktura:**

```
H1  Cestovní pojištění na hory do Rakouska: co musí krýt, aby zaplatilo vrtulník
H2  Kolik stojí zásah horské služby v Rakousku
    ⮕ FS TARGET: konkrétní částka ve 45 slovech — nejsilnější hook
H2  Čtyři položky, které musí být ve smlouvě
    H3  Limit léčebných výloh
    H3  Pátrání a záchrana (samostatný limit!)
    H3  Repatriace
    H3  Zimní sporty jako připojištění
    ⮕ AFFILIATE PRVEK 1: kontextový odkaz v textu
H2  Evropský průkaz pojištěnce nestačí — proč
H2  Srovnání nabídek pro Rakousko
    ⮕ AFFILIATE PRVEK 2: SROVNÁVACÍ TABULKA (eHub) — hlavní konverzní bod
H2  Skialpy a freeride: kdy pojištění přestává platit
    ⮕ Vnitřní odkaz na D1
H2  Slovensko a Itálie: v čem se liší  ← cílí na `pojištění na hory Slovensko`
H2  FAQ
```

---

#### **D3 — H1: „Jak vybrat cestovní pojištění: 7 parametrů, na kterých záleží (a 3, na kterých ne)"**

**Cílová KW:** `jak vybrat cestovní pojištění` (90/měs, CPC 13,64 Kč, **yoy +499 %**) · `kde sjednat cestovní pojištění` (70, CPC 20,64 Kč) · `kolik stojí cestovní pojištění` (120, CPC 8,58 Kč) · `co zahrnuje cestovní pojištění` (20) · `co je cestovní pojištění` (190, CPC 12,59 Kč)
**Search intent:** informační přecházející v transakční. Toto je **pilířová stránka** celé vertikály D — sbírá široký informační traffic a rozvádí ho na D1 a D2.

**Struktura:**

```
H1  Jak vybrat cestovní pojištění: 7 parametrů, na kterých záleží
H2  7 parametrů, které rozhodují
    H3  1. Limit léčebných výloh
    H3  2. Územní platnost
    H3  3. Rizikové sporty  ⮕ vnitřní odkaz na D1
    H3  4. Pátrání a záchrana  ⮕ vnitřní odkaz na D2
    H3  5. Spoluúčast
    H3  6. Storno zájezdu
    H3  7. Zavazadla a elektronika
    ⮕ AFFILIATE PRVEK 1: kontextový odkaz po 3. parametru
H2  3 parametry, na které se marketing odvolává zbytečně
    ← důvěryhodnostní sekce; nejsilnější E-E-A-T signál v článku
H2  Kolik má pojištění stát  ⮕ cílí na `kolik stojí cestovní pojištění`
    ⮕ FS TARGET: cenové rozpětí ve 45 slovech
H2  Kde sjednat  ⮕ cílí na `kde sjednat cestovní pojištění` (CPC 20,64 Kč)
    ⮕ AFFILIATE PRVEK 2: SROVNÁVACÍ TABULKA (eHub)
H2  FAQ
```

---

### 3.5 Mapa vnitřního prolinkování

```
        D3 (jak vybrat pojištění) ────── pilíř vertikály D
         │                    │
         ▼                    ▼
        D1 (ferraty)◄──────► D2 (Rakousko)
         ▲                    ▲
         │                    │
    ┌────┴────┐          ┌────┘
    │         │          │
   B1 ◄────► B2 ◄─────► B3 (Rakousko na divoko)
  (stan)  (spacák)        │
                          │  ← nejcennější prolink: z CPC 3,40 Kč
                          │    obsahu do CPC 36,72 Kč obsahu
   A1 ◄────► A2 ◄─────► A3 (checklist)
 (solár) (vestavba)        │
                           └──► D3 (pojištění pro karavanisty)

   C1 (tandem pilíř) ◄──► C2 (Praha) + 6 dalších regionů
    └──► C3 (dárek pro rybáře) ──► B2 (spacák)
```

**Pravidlo:** každý článek má **3–5 vnitřních odkazů** ven a minimálně **2 dovnitř**. Repo to podporuje polem `relatedArticles` v kolekci `Articles` — ale ruční kontextové odkazy přímo v textu mají výrazně vyšší váhu než blok „související články" v patičce. Dělejte obojí.

---

## KROK 4: Práce s XML feedy

Cíl: dostat z pěti feedů **~200 vybraných produktů** do CMS a napárovat je na obsah. Bez e-shopu, bez skladu, bez košíku. Statická data + ruční kurátorství.

### 4.1 S jakými formáty pracujete

| Feed | Formát | Kořen | Klíčová pole |
|---|---|---|---|
| Svět karavanů (Mergado) | Google Merchant RSS 2.0 | `rss > channel > item` | `g:id`, `g:title`, `g:price`, `g:availability`, `g:product_type`, `g:custom_label_0..4` |
| NejOutdoor | Google Merchant RSS 2.0 | `rss > channel > item` | tamtéž |
| ProCamping | Heureka | `SHOP > SHOPITEM` | `ITEM_ID`, `PRODUCTNAME`, `PRICE_VAT`, `CATEGORYTEXT`, `PARAM`, `DELIVERY_DATE` |
| Adrop (Mergado) | Heureka | `SHOP > SHOPITEM` | tamtéž |
| Zážitky.cz | vlastní PAP export | ověřit | ověřit |

**Zážitky.cz** je jediná neznámá — `zazitky-pap-all.xml` je export partnerského programu, jehož schéma není veřejně dokumentované. Nejde odhadnout, musí se jednou otevřít a zmapovat. Skript v 4.2 to udělá automaticky.

### 4.2 Krok 1 — Zmapovat schéma (jednou za feed, 5 minut)

Než napíšete jakoukoli extrakci, zjistěte, co ve feedu skutečně je. Tenhle skript vypíše všechny cesty k elementům a četnost:

```bash
# scripts/feed-schema.sh
curl -sL "$1" -o /tmp/feed.xml
echo "Velikost: $(du -h /tmp/feed.xml | cut -f1)"
echo "--- Struktura (top 40 cest) ---"
python3 - <<'PY'
import xml.etree.ElementTree as ET
from collections import Counter
t = ET.parse('/tmp/feed.xml'); paths = Counter()
def walk(el, p=''):
    tag = el.tag.split('}')[-1]
    cur = f'{p}/{tag}'
    paths[cur] += 1
    for c in el: walk(c, cur)
walk(t.getroot())
for path, n in paths.most_common(40):
    print(f'{n:>7}  {path}')
PY
```

Spuštění: `bash scripts/feed-schema.sh "https://www.nejoutdoor.cz/google/export/products.xml"`

Výstup vám řekne přesné názvy polí *tohoto* feedu — včetně toho, jestli má `g:sale_price`, jestli plní `g:custom_label_*` a jak vypadá `zazitky-pap-all.xml`. Teprve podle toho se píše extrakce.

### 4.3 Krok 2 — Jak najít konverzní produkty (ne všechny)

Nechcete 40 000 produktů. Chcete 200. Filtrujte v tomto pořadí:

**Filtr 1 — dostupnost (tvrdý):**
- Google Merchant: `g:availability = "in stock"`
- Heureka: `DELIVERY_DATE = 0` (skladem)

Nedostupný produkt v článku je horší než žádný produkt — uživatel proklikne, narazí na „vyprodáno" a už se nevrátí.

**Filtr 2 — signály bestselleru:**

Bestsellery ve feedu nejsou označené explicitně, ale jdou odvodit ze tří nepřímých signálů:

| Signál | Kde ho hledat | Jak číst |
|---|---|---|
| **`g:custom_label_0..4`** | Merchant feedy | E-shopy sem typicky dávají marži, obrátku nebo kampaňové tagy pro Google Ads bidding. Když jsou vyplněné, je to nejlepší dostupný signál — po zmapování hodnot se zeptejte partnera, co znamenají. |
| **Bohatost dat** | oba formáty | Produkt s dlouhým popisem, 4+ obrázky a vyplněnými `PARAM`/`gtin` je produkt, do kterého e-shop investoval čas. To dělá jen u toho, co prodává. |
| **Hloubka `PARAM` / atributů** | Heureka | 8+ parametrů = produkt, který se dá zařadit do srovnávací tabulky. Produkty se 2 parametry do tabulky nepatří. |

**Filtr 3 — cenové pásmo pro marži:**

Ignorujte spodních 20 % ceníku. U 3% provize vydělá spacák za 800 Kč 24 Kč, spacák za 9 000 Kč vydělá 270 Kč — při identické práci na vaší straně. Cílové pásmo: **medián kategorie až 90. percentil**.

**Filtr 4 — napárovatelnost na článek:**

Produkt musí jít zařadit pod H2/H3 v některém z 12 článků. Když nejde, nepatří do výběru.

### 4.4 Krok 3 — Extrakce do JSON (jeden skript, oba formáty)

```javascript
// scripts/feed-extract.mjs
// Spuštění: node scripts/feed-extract.mjs <url> <merchant|heureka> <výstup.json>
import { XMLParser } from 'fast-xml-parser'

const [url, format, out] = process.argv.slice(2)
const xml = await (await fetch(url)).text()
const parser = new XMLParser({ ignoreAttributes: false, removeNSPrefix: true })
const doc = parser.parse(xml)

const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : [])

const items =
  format === 'merchant'
    ? asArray(doc?.rss?.channel?.item).map((i) => ({
        id: String(i.id ?? ''),
        name: i.title ?? '',
        price: parseFloat(String(i.sale_price ?? i.price ?? '0').replace(/[^\d.,]/g, '').replace(',', '.')),
        url: i.link ?? '',
        image: i.image_link ?? '',
        brand: i.brand ?? '',
        category: i.product_type ?? '',
        available: /in\s*stock/i.test(String(i.availability ?? '')),
        labels: [i.custom_label_0, i.custom_label_1, i.custom_label_2].filter(Boolean),
        richness: (String(i.description ?? '').length > 300 ? 1 : 0) + (i.gtin ? 1 : 0),
      }))
    : asArray(doc?.SHOP?.SHOPITEM).map((i) => ({
        id: String(i.ITEM_ID ?? ''),
        name: i.PRODUCTNAME ?? i.PRODUCT ?? '',
        price: parseFloat(String(i.PRICE_VAT ?? '0').replace(',', '.')),
        url: i.URL ?? '',
        image: asArray(i.IMGURL)[0] ?? '',
        brand: i.MANUFACTURER ?? '',
        category: i.CATEGORYTEXT ?? '',
        available: String(i.DELIVERY_DATE ?? '') === '0',
        params: asArray(i.PARAM).map((p) => `${p.PARAM_NAME}: ${p.VAL}`),
        richness: (String(i.DESCRIPTION ?? '').length > 300 ? 1 : 0) + (i.EAN ? 1 : 0),
      }))

// Filtr 1 + 2: skladem, s daty, seřazeno podle bohatosti a ceny
const picked = items
  .filter((i) => i.available && i.price > 0 && i.image)
  .sort((a, b) => b.richness - a.richness || b.price - a.price)

await import('node:fs/promises').then((fs) =>
  fs.writeFile(out, JSON.stringify(picked.slice(0, 400), null, 2)),
)
console.log(`${items.length} položek ve feedu → ${picked.length} po filtru → uloženo 400 nejlepších`)
```

Instalace jediné závislosti: `npm i -D fast-xml-parser`

### 4.5 Krok 4 — Napárování na obsah (bez e-shopu)

**Doporučený model: kurátorský snapshot, ne živý feed.**

Živé volání feedu při každém zobrazení stránky je pro magazín špatná volba — zpomalí render, přidá závislost na dostupnosti partnera a Google občas uvidí prázdné boxy. Místo toho:

```
1× týdně (ruční nebo cron)
   ↓
node scripts/feed-extract.mjs <feed> <formát> data/feeds/<partner>.json
   ↓
Ručně vybrat 10–25 produktů na článek (30 minut práce)
   ↓
Vložit do Payload CMS jako produktová data u článku
   ↓
Next.js ISR (repo už má revalidate 3600 na článcích) je vyrenderuje staticky
```

**Konkrétně v tomto repu:** kolekce `Articles` (`src/collections/Articles.ts`) už má skupinu `affiliate` pro jeden box. Pro srovnávací tabulky doporučuji přidat pole typu `array` s názvem `products` a fieldy: `name`, `price`, `image`, `url`, `partner`, `params` (array), `highlight` (text — např. „Nejlepší poměr cena/hmotnost"). Tím se z jednoho boxu stane plnohodnotný srovnávací modul bez další infrastruktury.

**Redirect vrstva — udělejte to hned, ne později:**

Nikdy nedávejte partnerské URL přímo do HTML. Zaveďte `/go/{slug}`:

```
/go/svetkaravanu-solar-200w  →  302  →  {tracking_url}?utm_...
```

Tři důvody, proč to za tu hodinu práce stojí:
1. **Změna partnera nebo tracking parametru = jedna změna v CMS**, ne přepisování 200 článků.
2. **Měření prokliků je vaše**, nezávislé na tom, co vám partner ukáže v rozhraní.
3. **Odkazy v PDF a newsletterech zůstanou funkční** i po změně affiliate programu.

Route je v Next.js triviální: `src/app/go/[slug]/route.ts` s lookupem do CMS a `NextResponse.redirect(url, 302)`. Použijte 302, ne 301 — 301 se cachuje v prohlížeči a znemožní vám pozdější změnu cíle.

### 4.6 Krok 5 — Hlídání zastaralých cen

Nesprávná cena v článku je nejrychlejší způsob, jak ztratit důvěru. Při týdenním přegenerování JSON snapshotu porovnávejte:

```javascript
// pseudo: v CI nebo cronu
const drift = Math.abs(novaCena - ulozenaCena) / ulozenaCena
if (drift > 0.10) upozorni(`${produkt.name}: ${ulozenaCena} → ${novaCena} Kč`)
if (!novy.available) upozorni(`${produkt.name}: již není skladem`)
```

Vedle ceny vždy uveďte **„Ceny aktualizovány k {datum}"**. Je to poctivé, je to E-E-A-T signál a zbavuje vás to odpovědnosti za desetikorunové odchylky.

---

## 5. Roadmapa (co dělat v jakém pořadí)

Pořadí je určené **sezónností**, ne obtížností.

| Sprint | Termín | Články | Proč právě teď |
|---|---|---|---|
| **1** | do 15. 9. 2026 | **D2**, **D1**, **D3** | ⏰ Pojištění na hory kulminuje v listopadu (1 400/měs) a lednu (960/měs). Potřebují 6–10 týdnů na indexaci. **Nedodržení = minutá sezóna.** |
| **2** | do 30. 9. 2026 | **C3**, **C1** | Dárkové dotazy kulminují v listopadu a prosinci |
| **3** | říjen 2026 | **A1**, **A3** | Solární shluk (KD 0–9) — nejrychlejší výsledky, buduje autoritu pro zbytek |
| **4** | listopad 2026 | **C2** + 6 regionálních klonů | Šablona je hotová, jde o vyplnění; nejlepší poměr práce/výnos |
| **5** | prosinec–leden | **B2**, **A2** | Zimní spacák (KD 15) má podzimní/zimní peak |
| **6** | únor–březen 2027 | **B1**, **B3** | Stan a kempování kulminují v červnu–srpnu; publikovat s předstihem |

**Backlog (samostatné stránky, kdykoli mezi sprinty):**
`rybářský spacák` (190/měs, **KD 3**) · `spacák pro psa` (150, KD 10) · `via ferrata Rakousko` (80, KD 11) · `kde zaparkovat karavan` (40, KD 10, FS)

---

## 6. Jak měřit, jestli to funguje

**Nesledovat pozice jako hlavní metriku.** U webu s 248 návštěvami měsíčně jsou pozice příliš rozkolísané, aby něco znamenaly. Sledujte:

| Metrika | Nástroj | Cíl za 6 měsíců |
|---|---|---|
| Počet KW v top 20 | Marketing Miner / GSC | 435 → 900+ |
| Počet stránek s ≥ 10 impresemi/den | GSC | základ → 40+ |
| Proklik na `/go/*` / návštěva článku | vlastní redirect vrstva | 6–12 % |
| Konverzní poměr proklik → objednávka | rozhraní partnerů + eHub | 2–5 % (pojištění výš) |
| RPM (výnos na 1 000 návštěv článku) | dopočet | rozlišovat po vertikálách |

**Kontrolní bod po 90 dnech:** porovnejte RPM čtyř vertikál. Očekávaná hypotéza podle CPC dat: **pojištění (D) vydělá na návštěvu 5–10× víc než outdoor vybavení (B)**. Pokud se to potvrdí, přesuňte publikační kapacitu do D a lokačních variant D2 (Slovensko, Itálie, Francie). Pokud ne, hypotéza byla špatná a řídit se má naměřeným RPM — ne tímto dokumentem.

---

## 7. Čeho se v této strategii vyvarovat

1. **Nepsat článek, ke kterému neexistuje produkt ve feedu.** Traffic bez monetizace je náklad, ne aktivum.
2. **Neřadit srovnávací tabulky podle výše provize.** Uživatel to pozná a je to nevratné.
3. **Nepoužívat přesnou shodu peněžního KW jako anchor text.** `nejlepší pojištění na hory` jako anchor = klasický spam vzorec.
4. **Nepublikovat sezónní obsah v sezóně.** Vždy 8–10 týdnů předem.
5. **Nedávat affiliate odkaz do H1, H2 ani do prvního odstavce.** Konverze to nezvýší a Googlu to signalizuje thin affiliate content.
6. **Neuvádět ceny bez data aktualizace.** U YMYL obsahu (vertikála D) je to blokující chyba.

---

*Data o hledanosti, obtížnosti (KD), CPC a sezónnosti pocházejí z Marketing Mineru (trh CZ, sběr 3. 9. 2026). Odhad organické návštěvnosti tripradar.cz (248 návštěv / 435 KW) rovněž z Marketing Mineru. Hodnoty KD uvedené jako „—" nebyly v datové sadě pro daný výraz dostupné.*
