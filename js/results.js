// results.js — типы результатов (волшебные палочки) и логика подсчёта
// Каждый результат: { id, wood, core, length, flexibility, title, description, icon }

export const resultTypes = {
  acacia_dragon: {
    id: "acacia_dragon",
    wood: "Акация",
    core: "жила дракона",
    title: "Акация с жилой дракона",
    description: "Ваша палочка из акации с жилой дракона — редкое сочетание, говорящее о тонкой душевной организации и скрытой силе.",
  },
  acacia_phoenix: {
    id: "acacia_phoenix",
    wood: "Акация",
    core: "перо феникса",
    title: "Акация с пером феникса",
    description: "Акация с пером феникса — палочка для избранных, способных на великие свершения и не боящихся перемен.",
  },
  acacia_unicorn: {
    id: "acacia_unicorn",
    wood: "Акация",
    core: "волос единорога",
    title: "Акация с волосом единорога",
    description: "Ваша палочка из акации с волосом единорога — знак чистоты помыслов и верности своим принципам.",
  },
  alder_phoenix: {
    id: "alder_phoenix",
    wood: "Ольха",
    core: "перо феникса",
    title: "Ольха с пером феникса",
    description: "Ольха с пером феникса — палочка для решительных и смелых, не боящихся идти против течения.",
  },
  alder_unicorn: {
    id: "alder_unicorn",
    wood: "Ольха",
    core: "волос единорога",
    title: "Ольха с волосом единорога",
    description: "Ваша палочка из ольхи с волосом единорога — выбор тех, кто ценит гармонию и стремится к справедливости.",
  },
  apple_dragon: {
    id: "apple_dragon",
    wood: "Яблоня",
    core: "жила дракона",
    title: "Яблоня с жилой дракона",
    description: "Яблоня с жилой дракона — палочка для страстных натур, в ком горит неугасимый внутренний огонь.",
  },
  apple_phoenix: {
    id: "apple_phoenix",
    wood: "Яблоня",
    core: "перо феникса",
    title: "Яблоня с пером феникса",
    description: "Ваша палочка из яблони с пером феникса — символ возрождения и бесконечной мудрости.",
  },
  apple_unicorn: {
    id: "apple_unicorn",
    wood: "Яблоня",
    core: "волос единорога",
    title: "Яблоня с волосом единорога",
    description: "Яблоня с волосом единорога — палочка для тех, кто следует зову сердца и верит в добро.",
  },
  aspen_phoenix: {
    id: "aspen_phoenix",
    wood: "Осина",
    core: "перо феникса",
    title: "Осина с пером феникса",
    description: "Осина с пером феникса — палочка для сильных духом, готовых к любым испытаниям.",
  },
  aspen_unicorn: {
    id: "aspen_unicorn",
    wood: "Осина",
    core: "волос единорога",
    title: "Осина с волосом единорога",
    description: "Ваша палочка из осины с волосом единорога — знак скрытой магической мощи и благородства.",
  },
  ash_unicorn: {
    id: "ash_unicorn",
    wood: "Ясень",
    core: "волос единорога",
    title: "Ясень с волосом единорога",
    description: "Ясень с волосом единорога — палочка для мудрых и терпеливых, кто знает цену знаниям.",
  },
  beech_dragon: {
    id: "beech_dragon",
    wood: "Бук",
    core: "жила дракона",
    title: "Бук с жилой дракона",
    description: "Бук с жилой дракона — палочка для целеустремлённых, кто не боится трудностей на пути к цели.",
  },
  beech_phoenix: {
    id: "beech_phoenix",
    wood: "Бук",
    core: "перо феникса",
    title: "Бук с пером феникса",
    description: "Ваша палочка из бука с пером феникса — символ несгибаемой воли и благородных устремлений.",
  },
  beech_unicorn: {
    id: "beech_unicorn",
    wood: "Бук",
    core: "волос единорога",
    title: "Бук с волосом единорога",
    description: "Бук с волосом единорога — палочка для тех, кто сочетает практичность с душевной чистотой.",
  },
  black_walnut_dragon: {
    id: "black_walnut_dragon",
    wood: "Чёрный орех",
    core: "жила дракона",
    title: "Чёрный орех с жилой дракона",
    description: "Чёрный орех с жилой дракона — редкая и могущественная палочка для проницательных умов.",
  },
  black_walnut_phoenix: {
    id: "black_walnut_phoenix",
    wood: "Чёрный орех",
    core: "перо феникса",
    title: "Чёрный орех с пером феникса",
    description: "Ваша палочка из чёрного ореха с пером феникса — выбор интеллектуалов с великим потенциалом.",
  },
  black_walnut_unicorn: {
    id: "black_walnut_unicorn",
    wood: "Чёрный орех",
    core: "волос единорога",
    title: "Чёрный орех с волосом единорога",
    description: "Чёрный орех с волосом единорога — палочка для тех, чей ум остр, а сердце чисто.",
  },
  blackthorn_phoenix: {
    id: "blackthorn_phoenix",
    wood: "Тёрн",
    core: "перо феникса",
    title: "Тёрн с пером феникса",
    description: "Тёрн с пером феникса — палочка для воинов духа, несгибаемых перед лицом опасности.",
  },
  blackthorn_unicorn: {
    id: "blackthorn_unicorn",
    wood: "Тёрн",
    core: "волос единорога",
    title: "Тёрн с волосом единорога",
    description: "Ваша палочка из тёрна с волосом единорога — знак стойкости и верности идеалам.",
  },
  cedar_dragon: {
    id: "cedar_dragon",
    wood: "Кедр",
    core: "жила дракона",
    title: "Кедр с жилой дракона",
    description: "Кедр с жилой дракона — палочка для оптимистов с несокрушимым внутренним стержнем.",
  },
  cherry_phoenix: {
    id: "cherry_phoenix",
    wood: "Вишня",
    core: "перо феникса",
    title: "Вишня с пером феникса",
    description: "Вишня с пером феникса — палочка для творческих натур с загадочной душой.",
  },
  chestnut_dragon: {
    id: "chestnut_dragon",
    wood: "Каштан",
    core: "жила дракона",
    title: "Каштан с жилой дракона",
    description: "Каштан с жилой дракона — палочка для тех, кто ищет знания и не боится закрытых дверей.",
  },
  chestnut_phoenix: {
    id: "chestnut_phoenix",
    wood: "Каштан",
    core: "перо феникса",
    title: "Каштан с пером феникса",
    description: "Ваша палочка из каштана с пером феникса — выбор искателей приключений и новых горизонтов.",
  },
  chestnut_unicorn: {
    id: "chestnut_unicorn",
    wood: "Каштан",
    core: "волос единорога",
    title: "Каштан с волосом единорога",
    description: "Каштан с волосом единорога — палочка для справедливых и благородных сердцем.",
  },
  cypress_phoenix: {
    id: "cypress_phoenix",
    wood: "Кипарис",
    core: "перо феникса",
    title: "Кипарис с пером феникса",
    description: "Кипарис с пером феникса — палочка для глубоких натур, склонных к созерцанию и магическим открытиям.",
  },
  cypress_unicorn: {
    id: "cypress_unicorn",
    wood: "Кипарис",
    core: "волос единорога",
    title: "Кипарис с волосом единорога",
    description: "Ваша палочка из кипариса с волосом единорога — знак доброты и верности своим убеждениям.",
  },
  dogwood_dragon: {
    id: "dogwood_dragon",
    wood: "Кизил",
    core: "жила дракона",
    title: "Кизил с жилой дракона",
    description: "Кизил с жилой дракона — палочка для пытливых умов, не боящихся испытаний.",
  },
  dogwood_unicorn: {
    id: "dogwood_unicorn",
    wood: "Кизил",
    core: "волос единорога",
    title: "Кизил с волосом единорога",
    description: "Кизил с волосом единорога — палочка для стойких и благородных сердцем.",
  },
  ebony_dragon: {
    id: "ebony_dragon",
    wood: "Эбен",
    core: "жила дракона",
    title: "Эбен с жилой дракона",
    description: "Эбен с жилой дракона — палочка для смелых и воинственных магов.",
  },
  ebony_phoenix: {
    id: "ebony_phoenix",
    wood: "Эбен",
    core: "перо феникса",
    title: "Эбен с пером феникса",
    description: "Ваша палочка из эбена с пером феникса — выбор несгибаемых и решительных.",
  },
  ebony_unicorn: {
    id: "ebony_unicorn",
    wood: "Эбен",
    core: "волос единорога",
    title: "Эбен с волосом единорога",
    description: "Эбен с волосом единорога — палочка для тех, кто сочетает твёрдость духа с чистотой помыслов.",
  },
  elder_dragon: {
    id: "elder_dragon",
    wood: "Бузина",
    core: "жила дракона",
    title: "Бузина с жилой дракона",
    description: "Бузина с жилой дракона — редкое и могущественное сочетание для избранных.",
  },
  elder_phoenix: {
    id: "elder_phoenix",
    wood: "Бузина",
    core: "перо феникса",
    title: "Бузина с пером феникса",
    description: "Ваша палочка из бузины с пером феникса — символ великой судьбы и мудрости.",
  },
  elder_unicorn: {
    id: "elder_unicorn",
    wood: "Бузина",
    core: "волос единорога",
    title: "Бузина с волосом единорога",
    description: "Бузина с волосом единорога — палочка для интеллектуалов с чистым сердцем.",
  },
  elm_dragon: {
    id: "elm_dragon",
    wood: "Вяз",
    core: "жила дракона",
    title: "Вяз с жилой дракона",
    description: "Вяз с жилой дракона — палочка для оптимистов с несгибаемой волей.",
  },
  elm_phoenix: {
    id: "elm_phoenix",
    wood: "Вяз",
    core: "перо феникса",
    title: "Вяз с пером феникса",
    description: "Вяз с пером феникса — палочка для стойких и проницательных натур.",
  },
  elm_unicorn: {
    id: "elm_unicorn",
    wood: "Вяз",
    core: "волос единорога",
    title: "Вяз с волосом единорога",
    description: "Ваша палочка из вяза с волосом единорога — знак оптимизма и душевной чистоты.",
  },
  english_oak_phoenix: {
    id: "english_oak_phoenix",
    wood: "Английский дуб",
    core: "перо феникса",
    title: "Английский дуб с пером феникса",
    description: "Английский дуб с пером феникса — палочка для творческих и смелых.",
  },
  english_oak_unicorn: {
    id: "english_oak_unicorn",
    wood: "Английский дуб",
    core: "волос единорога",
    title: "Английский дуб с волосом единорога",
    description: "Ваша палочка из английского дуба с волосом единорога — символ воображения и верности.",
  },
  fir_dragon: {
    id: "fir_dragon",
    wood: "Пихта",
    core: "жила дракона",
    title: "Пихта с жилой дракона",
    description: "Пихта с жилой дракона — палочка для целеустремлённых и выносливых.",
  },
  fir_unicorn: {
    id: "fir_unicorn",
    wood: "Пихта",
    core: "волос единорога",
    title: "Пихта с волосом единорога",
    description: "Пихта с волосом единорога — палочка для тех, кто ценит знания и порядок.",
  },
  hawthorn_dragon: {
    id: "hawthorn_dragon",
    wood: "Боярышник",
    core: "жила дракона",
    title: "Боярышник с жилой дракона",
    description: "Боярышник с жилой дракона — палочка для воображения и внутренней силы.",
  },
  hawthorn_unicorn: {
    id: "hawthorn_unicorn",
    wood: "Боярышник",
    core: "волос единорога",
    title: "Боярышник с волосом единорога",
    description: "Ваша палочка из боярышника с волосом единорога — знак доброты и интеллекта.",
  },
  hazel_phoenix: {
    id: "hazel_phoenix",
    wood: "Орешник",
    core: "перо феникса",
    title: "Орешник с пером феникса",
    description: "Орешник с пером феникса — палочка для глубоких мыслителей и мечтателей.",
  },
  hazel_unicorn: {
    id: "hazel_unicorn",
    wood: "Орешник",
    core: "волос единорога",
    title: "Орешник с волосом единорога",
    description: "Орешник с волосом единорога — палочка для тех, кто видит магию в повседневном.",
  },
  holly_dragon: {
    id: "holly_dragon",
    wood: "Остролист",
    core: "жила дракона",
    title: "Остролист с жилой дракона",
    description: "Остролист с жилой дракона — палочка для стойких и бесстрашных.",
  },
  holly_phoenix: {
    id: "holly_phoenix",
    wood: "Остролист",
    core: "перо феникса",
    title: "Остролист с пером феникса",
    description: "Ваша палочка из остролиста с пером феникса — выбор героев.",
  },
  yew_unicorn: {
    id: "yew_unicorn",
    wood: "Тис",
    core: "волос единорога",
    title: "Тис с волосом единорога",
    description: "Тис с волосом единорога — палочка для таинственных и творческих натур.",
  },
  hornbeam_dragon: {
    id: "hornbeam_dragon",
    wood: "Граб",
    core: "жила дракона",
    title: "Граб с жилой дракона",
    description: "Граб с жилой дракона — палочка для воображения и отваги.",
  },
  hornbeam_phoenix: {
    id: "hornbeam_phoenix",
    wood: "Граб",
    core: "перо феникса",
    title: "Граб с пером феникса",
    description: "Граб с пером феникса — палочка для оптимистов с несгибаемым духом.",
  },
  hornbeam_unicorn: {
    id: "hornbeam_unicorn",
    wood: "Граб",
    core: "волос единорога",
    title: "Граб с волосом единорога",
    description: "Ваша палочка из граба с волосом единорога — знак творческой энергии.",
  },
  larch_dragon: {
    id: "larch_dragon",
    wood: "Лиственница",
    core: "жила дракона",
    title: "Лиственница с жилой дракона",
    description: "Лиственница с жилой дракона — палочка для смелых и изобретательных.",
  },
  larch_phoenix: {
    id: "larch_phoenix",
    wood: "Лиственница",
    core: "перо феникса",
    title: "Лиственница с пером феникса",
    description: "Лиственница с пером феникса — палочка для добрых и мудрых сердцем.",
  },
  larch_unicorn: {
    id: "larch_unicorn",
    wood: "Лиственница",
    core: "волос единорога",
    title: "Лиственница с волосом единорога",
    description: "Ваша палочка из лиственницы с волосом единорога — символ доброты и чистоты.",
  },
  laurel_dragon: {
    id: "laurel_dragon",
    wood: "Лавр",
    core: "жила дракона",
    title: "Лавр с жилой дракона",
    description: "Лавр с жилой дракона — палочка для победителей с острым умом.",
  },
  laurel_phoenix: {
    id: "laurel_phoenix",
    wood: "Лавр",
    core: "перо феникса",
    title: "Лавр с пером феникса",
    description: "Лавр с пером феникса — палочка для интеллектуалов с гибким мышлением.",
  },
  laurel_unicorn: {
    id: "laurel_unicorn",
    wood: "Лавр",
    core: "волос единорога",
    title: "Лавр с волосом единорога",
    description: "Ваша палочка из лавра с волосом единорога — знак мудрости и благородства.",
  },
  maple_dragon: {
    id: "maple_dragon",
    wood: "Клён",
    core: "жила дракона",
    title: "Клён с жилой дракона",
    description: "Клён с жилой дракона — палочка для стойких и целеустремлённых натур.",
  },
  maple_phoenix: {
    id: "maple_phoenix",
    wood: "Клён",
    core: "перо феникса",
    title: "Клён с пером феникса",
    description: "Клён с пером феникса — палочка для несгибаемых и сильных духом.",
  },
  maple_unicorn: {
    id: "maple_unicorn",
    wood: "Клён",
    core: "волос единорога",
    title: "Клён с волосом единорога",
    description: "Ваша палочка из клёна с волосом единорога — знак творческого воображения и доброты.",
  },
  pear_phoenix: {
    id: "pear_phoenix",
    wood: "Груша",
    core: "перо феникса",
    title: "Груша с пером феникса",
    description: "Груша с пером феникса — палочка для добрых и отзывчивых сердцем.",
  },
  pear_unicorn: {
    id: "pear_unicorn",
    wood: "Груша",
    core: "волос единорога",
    title: "Груша с волосом единорога",
    description: "Ваша палочка из груши с волосом единорога — символ воображения и душевной теплоты.",
  },
  pine_dragon: {
    id: "pine_dragon",
    wood: "Сосна",
    core: "жила дракона",
    title: "Сосна с жилой дракона",
    description: "Сосна с жилой дракона — палочка для стойких и бесстрашных.",
  },
  pine_phoenix: {
    id: "pine_phoenix",
    wood: "Сосна",
    core: "перо феникса",
    title: "Сосна с пером феникса",
    description: "Сосна с пером феникса — палочка для интеллектуалов с несгибаемой волей.",
  },
  poplar_phoenix: {
    id: "poplar_phoenix",
    wood: "Тополь",
    core: "перо феникса",
    title: "Тополь с пером феникса",
    description: "Тополь с пером феникса — палочка для проницательных и мудрых.",
  },
  poplar_unicorn: {
    id: "poplar_unicorn",
    wood: "Тополь",
    core: "волос единорога",
    title: "Тополь с волосом единорога",
    description: "Ваша палочка из тополя с волосом единорога — знак интеллекта и благородства.",
  },
  red_oak_unicorn: {
    id: "red_oak_unicorn",
    wood: "Красный дуб",
    core: "волос единорога",
    title: "Красный дуб с волосом единорога",
    description: "Красный дуб с волосом единорога — палочка для добрых и заботливых.",
  },
  red_oak_phoenix: {
    id: "red_oak_phoenix",
    wood: "Красный дуб",
    core: "перо феникса",
    title: "Красный дуб с пером феникса",
    description: "Красный дуб с пером феникса — палочка для добрых и отзывчивых.",
  },
  redwood_unicorn: {
    id: "redwood_unicorn",
    wood: "Секвоя",
    core: "волос единорога",
    title: "Секвоя с волосом единорога",
    description: "Секвоя с волосом единорога — палочка для великодушных и добрых сердцем.",
  },
  redwood_phoenix: {
    id: "redwood_phoenix",
    wood: "Секвоя",
    core: "перо феникса",
    title: "Секвоя с пером феникса",
    description: "Секвоя с пером феникса — палочка для интеллектуалов с широкой душой.",
  },
  rowan_unicorn: {
    id: "rowan_unicorn",
    wood: "Рябина",
    core: "волос единорога",
    title: "Рябина с волосом единорога",
    description: "Ваша палочка из рябины с волосом единорога — знак воображения и оптимизма.",
  },
  rowan_phoenix: {
    id: "rowan_phoenix",
    wood: "Рябина",
    core: "перо феникса",
    title: "Рябина с пером феникса",
    description: "Рябина с пером феникса — палочка для стойких и мужественных.",
  },
  silver_lime_dragon: {
    id: "silver_lime_dragon",
    wood: "Серебряная липа",
    core: "жила дракона",
    title: "Серебряная липа с жилой дракона",
    description: "Серебряная липа с жилой дракона — палочка для добрых и великодушных.",
  },
  silver_lime_unicorn: {
    id: "silver_lime_unicorn",
    wood: "Серебряная липа",
    core: "волос единорога",
    title: "Серебряная липа с волосом единорога",
    description: "Ваша палочка из серебряной липы с волосом единорога — знак доброты и гармонии.",
  },
  spruce_phoenix: {
    id: "spruce_phoenix",
    wood: "Ель",
    core: "перо феникса",
    title: "Ель с пером феникса",
    description: "Ель с пером феникса — палочка для оригинальных и творческих натур.",
  },
  spruce_unicorn: {
    id: "spruce_unicorn",
    wood: "Ель",
    core: "волос единорога",
    title: "Ель с волосом единорога",
    description: "Ель с волосом единорога — палочка для интеллектуалов с ясным умом.",
  },
  sycamore_dragon: {
    id: "sycamore_dragon",
    wood: "Сикомора",
    core: "жила дракона",
    title: "Сикомора с жилой дракона",
    description: "Сикомора с жилой дракона — палочка для творческих и энергичных.",
  },
  sycamore_phoenix: {
    id: "sycamore_phoenix",
    wood: "Сикомора",
    core: "перо феникса",
    title: "Сикомора с пером феникса",
    description: "Сикомора с пером феникса — палочка для интеллектуалов с богатым воображением.",
  },
  sycamore_unicorn: {
    id: "sycamore_unicorn",
    wood: "Сикомора",
    core: "волос единорога",
    title: "Сикомора с волосом единорога",
    description: "Ваша палочка из сикоморы с волосом единорога — знак целеустремлённости и воображения.",
  },
  vine_dragon: {
    id: "vine_dragon",
    wood: "Лоза",
    core: "жила дракона",
    title: "Лоза с жилой дракона",
    description: "Лоза с жилой дракона — палочка для оптимистов с острым умом.",
  },
  vine_phoenix: {
    id: "vine_phoenix",
    wood: "Лоза",
    core: "перо феникса",
    title: "Лоза с пером феникса",
    description: "Лоза с пером феникса — палочка для стойких и жизнерадостных.",
  },
  vine_unicorn: {
    id: "vine_unicorn",
    wood: "Лоза",
    core: "волос единорога",
    title: "Лоза с волосом единорога",
    description: "Ваша палочка из лозы с волосом единорога — знак стойкости и интеллекта.",
  },
  walnut_dragon: {
    id: "walnut_dragon",
    wood: "Орех",
    core: "жила дракона",
    title: "Орех с жилой дракона",
    description: "Орех с жилой дракона — палочка для стойких и бесстрашных.",
  },
  walnut_unicorn: {
    id: "walnut_unicorn",
    wood: "Орех",
    core: "волос единорога",
    title: "Орех с волосом единорога",
    description: "Орех с волосом единорога — палочка для целеустремлённых и настойчивых.",
  },
  willow_dragon: {
    id: "willow_dragon",
    wood: "Ива",
    core: "жила дракона",
    title: "Ива с жилой дракона",
    description: "Ива с жилой дракона — палочка для добрых и гибких в общении.",
  },
  willow_phoenix: {
    id: "willow_phoenix",
    wood: "Ива",
    core: "перо феникса",
    title: "Ива с пером феникса",
    description: "Ива с пером феникса — палочка для добрых и заботливых.",
  },
  willow_unicorn: {
    id: "willow_unicorn",
    wood: "Ива",
    core: "волос единорога",
    title: "Ива с волосом единорога",
    description: "Ваша палочка из ивы с волосом единорога — знак доброты и душевной теплоты.",
  },
  yew_dragon: {
    id: "yew_dragon",
    wood: "Тис",
    core: "жила дракона",
    title: "Тис с жилой дракона",
    description: "Тис с жилой дракона — палочка для целеустремлённых и несгибаемых.",
  },
  yew_phoenix: {
    id: "yew_phoenix",
    wood: "Тис",
    core: "перо феникса",
    title: "Тис с пером феникса",
    description: "Тис с пером феникса — палочка для целеустремлённых и бесстрашных.",
  },
};

// Правила соответствия комбинаций ответов результатам
// Каждое правило: { resultId, conditions: { questionKey: answerKey, ... } }
// questionKey: q1, q2, ..., q7
// answerKey: ключ ответа из questions.js

export const resultRules = [
  // === Акация + жила дракона ===
  {
    resultId: "acacia_dragon",
    length: '9 1/2"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_short", q2: "eyes_brown", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_darkness", q7: "artifact_gem" },
  },
  {
    resultId: "acacia_dragon",
    length: '10 1/4"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_short", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_kindness", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_mirror" },
  },
  {
    resultId: "acacia_dragon",
    length: '12 1/2"',
    flexibility: "хрупкая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_originality", q5: "path_forest", q6: "fear_darkness", q7: "artifact_dagger" },
  },
  {
    resultId: "acacia_dragon",
    length: '12 1/2"',
    flexibility: "хрупкая",
    conditions: { q1: "height_short", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_originality", q5: "path_sea", q6: "fear_darkness", q7: "artifact_key" },
  },
  // === Акация + перо феникса ===
  {
    resultId: "acacia_phoenix",
    length: '12 1/2"',
    flexibility: "хрупкая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_gem" },
  },
  {
    resultId: "acacia_phoenix",
    length: '14 1/2"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_tall", q2: "eyes_brown", q3: "birthday_even", q4: "pride_imagination", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  {
    resultId: "acacia_phoenix",
    length: '10 3/4"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_imagination", q5: "path_sea", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  // === Акация + волос единорога ===
  {
    resultId: "acacia_unicorn",
    length: '10"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_short", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_originality", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  {
    resultId: "acacia_unicorn",
    length: '11 1/2"',
    flexibility: "достаточно гибкая",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_kindness", q5: "path_sea", q6: "fear_fire", q7: "artifact_mirror" },
  },
  {
    resultId: "acacia_unicorn",
    length: '11 3/4"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_originality", q5: "path_sea", q6: "fear_heights", q7: "artifact_gem" },
  },
  {
    resultId: "acacia_unicorn",
    length: '12 1/2"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_originality", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_bottle" },
  },
  // === Ольха + перо феникса ===
  {
    resultId: "alder_phoenix",
    length: '10 3/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_imagination", q5: "path_castle", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  {
    resultId: "alder_phoenix",
    length: '13"',
    flexibility: "плотная",
    conditions: { q1: "height_tall", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_optimism", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_dagger" },
  },
  {
    resultId: "alder_phoenix",
    length: '13 3/4"',
    flexibility: "податливая",
    conditions: { q1: "height_tall", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_optimism", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_key" },
  },
  // === Ольха + волос единорога ===
  {
    resultId: "alder_unicorn",
    length: '14 1/2"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_imagination", q5: "path_castle", q6: "fear_fire", q7: "artifact_scroll" },
  },
  {
    resultId: "alder_unicorn",
    length: '12"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_imagination", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_glove" },
  },
  // === Яблоня + жила дракона ===
  {
    resultId: "apple_dragon",
    length: '13 1/4"',
    flexibility: "податливая",
    conditions: { q1: "height_tall", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_optimism", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_gem" },
  },
  {
    resultId: "apple_dragon",
    length: '14"',
    flexibility: "упругая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_forest", q6: "fear_heights", q7: "artifact_glove" },
  },
  // === Яблоня + перо феникса ===
  {
    resultId: "apple_phoenix",
    length: '12 1/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_green", q3: "birthday_even", q4: "pride_imagination", q5: "path_forest", q6: "fear_darkness", q7: "artifact_key" },
  },
  // === Яблоня + волос единорога ===
  {
    resultId: "apple_unicorn",
    length: '14"',
    flexibility: "упругая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_glove" },
  },
  // === Осина + перо феникса ===
  {
    resultId: "aspen_phoenix",
    length: '12 1/2"',
    flexibility: "достаточно гибкая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_purposefulness", q5: "path_castle", q6: "fear_loneliness", q7: "artifact_dagger" },
  },
  // === Осина + волос единорога ===
  {
    resultId: "aspen_unicorn",
    length: '11 1/4"',
    flexibility: "достаточно гибкая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_purposefulness", q5: "path_castle", q6: "fear_loneliness", q7: "artifact_bottle" },
  },
  // === Ясень + волос единорога ===
  {
    resultId: "ash_unicorn",
    length: '9 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_glove" },
  },
  // === Бук + жила дракона ===
  {
    resultId: "beech_dragon",
    length: '13"',
    flexibility: "твёрдая",
    conditions: { q1: "height_tall", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_purposefulness", q5: "path_castle", q6: "fear_fire", q7: "artifact_dagger" },
  },
  {
    resultId: "beech_dragon",
    length: '12 1/2"',
    flexibility: "хрупкая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_originality", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_dagger" },
  },
  // === Бук + перо феникса ===
  {
    resultId: "beech_phoenix",
    length: '13 1/2"',
    flexibility: "неподатливая",
    conditions: { q1: "height_tall", q2: "eyes_blue", q3: "birthday_even", q4: "pride_purposefulness", q5: "path_castle", q6: "fear_darkness", q7: "artifact_dagger" },
  },
  // === Бук + волос единорога ===
  {
    resultId: "beech_unicorn",
    length: '11 3/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_originality", q5: "path_sea", q6: "fear_fire", q7: "artifact_gem" },
  },
  {
    resultId: "beech_unicorn",
    length: '12 1/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_purposefulness", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  {
    resultId: "beech_unicorn",
    length: '11 1/4"',
    flexibility: "гнущаяся",
    conditions: { q1: "height_tall", q2: "eyes_green", q3: "birthday_odd", q4: "pride_optimism", q5: "path_forest", q6: "fear_heights", q7: "artifact_key" },
  },
  {
    resultId: "beech_unicorn",
    length: '10 1/2"',
    flexibility: "плотная",
    conditions: { q1: "height_short", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_optimism", q5: "path_castle", q6: "fear_closed_spaces", q7: "artifact_bottle" },
  },
  {
    resultId: "beech_unicorn",
    length: '10 3/4"',
    flexibility: "плотная",
    conditions: { q1: "height_medium", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_optimism", q5: "path_castle", q6: "fear_fire", q7: "artifact_scroll" },
  },
  // === Чёрный орех + жила дракона ===
  {
    resultId: "black_walnut_dragon",
    length: '13"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_intellect", q5: "path_castle", q6: "fear_heights", q7: "artifact_dagger" },
  },
  // === Чёрный орех + перо феникса ===
  {
    resultId: "black_walnut_phoenix",
    length: '10"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  {
    resultId: "black_walnut_phoenix",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  {
    resultId: "black_walnut_phoenix",
    length: '14 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  // === Чёрный орех + волос единорога ===
  {
    resultId: "black_walnut_unicorn",
    length: '10"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_short", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_intellect", q5: "path_castle", q6: "fear_fire", q7: "artifact_scroll" },
  },
  {
    resultId: "black_walnut_unicorn",
    length: '10 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_heights", q7: "artifact_scroll" },
  },
  {
    resultId: "black_walnut_unicorn",
    length: '12 1/4"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_intellect", q5: "path_castle", q6: "fear_loneliness", q7: "artifact_key" },
  },
  // === Тёрн + перо феникса ===
  {
    resultId: "blackthorn_phoenix",
    length: '14 1/2"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_tall", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_intellect", q5: "path_forest", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  // === Тёрн + волос единорога ===
  {
    resultId: "blackthorn_unicorn",
    length: '13 1/2"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_tall", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_intellect", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_bottle" },
  },
  // === Кедр + жила дракона ===
  {
    resultId: "cedar_dragon",
    length: '12 3/4"',
    flexibility: "плотная",
    conditions: { q1: "height_short", q2: "eyes_green", q3: "birthday_even", q4: "pride_optimism", q5: "path_castle", q6: "fear_fire", q7: "artifact_dagger" },
  },
  {
    resultId: "cedar_dragon",
    length: '12 1/2"',
    flexibility: "неподатливая",
    conditions: { q1: "height_medium", q2: "eyes_blue_green", q3: "birthday_even", q4: "pride_perseverance", q5: "path_castle", q6: "fear_heights", q7: "artifact_dagger" },
  },
  // === Вишня + перо феникса ===
  {
    resultId: "cherry_phoenix",
    length: '14 1/2"',
    flexibility: "хрупкая",
    conditions: { q1: "height_tall", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_originality", q5: "path_sea", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  // === Каштан + жила дракона ===
  {
    resultId: "chestnut_dragon",
    length: '12 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_closed_spaces", q7: "artifact_dagger" },
  },
  // === Каштан + перо феникса ===
  {
    resultId: "chestnut_phoenix",
    length: '10 3/4"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_intellect", q5: "path_castle", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  // === Каштан + волос единорога ===
  {
    resultId: "chestnut_unicorn",
    length: '12 1/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_loneliness", q7: "artifact_key" },
  },
  // === Кипарис + перо феникса ===
  {
    resultId: "cypress_phoenix",
    length: '9 3/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_short", q2: "eyes_brown", q3: "birthday_even", q4: "pride_imagination", q5: "path_sea", q6: "fear_darkness", q7: "artifact_gem" },
  },
  {
    resultId: "cypress_phoenix",
    length: '10"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_short", q2: "eyes_green", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  {
    resultId: "cypress_phoenix",
    length: '12 1/2"',
    flexibility: "достаточно гибкая",
    conditions: { q1: "height_short", q2: "eyes_blue_green", q3: "birthday_odd", q4: "pride_purposefulness", q5: "path_forest", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  // === Кипарис + волос единорога ===
  {
    resultId: "cypress_unicorn",
    length: '12 1/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_heights", q7: "artifact_key" },
  },
  {
    resultId: "cypress_unicorn",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_kindness", q5: "path_forest", q6: "fear_heights", q7: "artifact_mirror" },
  },
  {
    resultId: "cypress_unicorn",
    length: '11"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_short", q2: "eyes_other", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_key" },
  },
  {
    resultId: "cypress_unicorn",
    length: '11 1/2"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_short", q2: "eyes_other", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  {
    resultId: "cypress_unicorn",
    length: '10 3/4"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_short", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  // === Кизил + жила дракона ===
  {
    resultId: "dogwood_dragon",
    length: '12 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_forest", q6: "fear_fire", q7: "artifact_dagger" },
  },
  {
    resultId: "dogwood_dragon",
    length: '12 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_forest", q6: "fear_heights", q7: "artifact_dagger" },
  },
  // === Кизил + волос единорога ===
  {
    resultId: "dogwood_unicorn",
    length: '13"',
    flexibility: "твёрдая",
    conditions: { q1: "height_tall", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_fire", q7: "artifact_scroll" },
  },
  {
    resultId: "dogwood_unicorn",
    length: '10 3/4"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_even", q4: "pride_intellect", q5: "path_forest", q6: "fear_heights", q7: "artifact_scroll" },
  },
  {
    resultId: "dogwood_unicorn",
    length: '13 1/4"',
    flexibility: "гибкая",
    conditions: { q1: "height_tall", q2: "eyes_other", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_forest", q6: "fear_heights", q7: "artifact_gem" },
  },
  // === Эбен + жила дракона ===
  {
    resultId: "ebony_dragon",
    length: '13"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_tall", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_imagination", q5: "path_castle", q6: "fear_fire", q7: "artifact_dagger" },
  },
  // === Эбен + перо феникса ===
  {
    resultId: "ebony_phoenix",
    length: '11 3/4"',
    flexibility: "достаточно гибкая",
    conditions: { q1: "height_tall", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_forest", q6: "fear_heights", q7: "artifact_dagger" },
  },
  // === Эбен + волос единорога ===
  {
    resultId: "ebony_unicorn",
    length: '10"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_short", q2: "eyes_green", q3: "birthday_even", q4: "pride_kindness", q5: "path_castle", q6: "fear_fire", q7: "artifact_scroll" },
  },
  {
    resultId: "ebony_unicorn",
    length: '13 1/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_tall", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_perseverance", q5: "path_forest", q6: "fear_heights", q7: "artifact_gem" },
  },
  {
    resultId: "ebony_unicorn",
    length: '14 1/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_tall", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_imagination", q5: "path_castle", q6: "fear_fire", q7: "artifact_mirror" },
  },
  {
    resultId: "ebony_unicorn",
    length: '10 3/4"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_purposefulness", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  // === Бузина + жила дракона ===
  {
    resultId: "elder_dragon",
    length: '13"',
    flexibility: "твёрдая",
    conditions: { q1: "height_tall", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_fire", q7: "artifact_dagger" },
  },
  // === Бузина + перо феникса ===
  {
    resultId: "elder_phoenix",
    length: '14 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_tall", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  // === Бузина + волос единорога ===
  {
    resultId: "elder_unicorn",
    length: '11"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_short", q2: "eyes_blue", q3: "birthday_even", q4: "pride_intellect", q5: "path_castle", q6: "fear_loneliness", q7: "artifact_key" },
  },
  {
    resultId: "elder_unicorn",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_heights", q7: "artifact_scroll" },
  },
  {
    resultId: "elder_unicorn",
    length: '10"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_heights", q7: "artifact_scroll" },
  },
  // === Вяз + жила дракона ===
  {
    resultId: "elm_dragon",
    length: '12 1/2"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_medium", q2: "eyes_blue", q3: "birthday_even", q4: "pride_originality", q5: "path_sea", q6: "fear_heights", q7: "artifact_dagger" },
  },
  {
    resultId: "elm_dragon",
    length: '12"',
    flexibility: "плотная",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_even", q4: "pride_optimism", q5: "path_castle", q6: "fear_fire", q7: "artifact_dagger" },
  },
  // === Вяз + перо феникса ===
  {
    resultId: "elm_phoenix",
    length: '11 1/2"',
    flexibility: "гибкая",
    conditions: { q1: "height_medium", q2: "eyes_gray", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_mirror" },
  },
  {
    resultId: "elm_phoenix",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_hazel", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  {
    resultId: "elm_phoenix",
    length: '10"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_short", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_intellect", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  // === Вяз + волос единорога ===
  {
    resultId: "elm_unicorn",
    length: '10 3/4"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_medium", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_intellect", q5: "path_sea", q6: "fear_heights", q7: "artifact_scroll" },
  },
  {
    resultId: "elm_unicorn",
    length: '10"',
    flexibility: "гнущаяся",
    conditions: { q1: "height_short", q2: "eyes_green", q3: "birthday_odd", q4: "pride_optimism", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  {
    resultId: "elm_unicorn",
    length: '9 3/4"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_short", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_intellect", q5: "path_sea", q6: "fear_heights", q7: "artifact_gem" },
  },
  // === Английский дуб + перо феникса ===
  {
    resultId: "english_oak_phoenix",
    length: '12 1/4"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_imagination", q5: "path_forest", q6: "fear_darkness", q7: "artifact_key" },
  },
  // === Английский дуб + волос единорога ===
  {
    resultId: "english_oak_unicorn",
    length: '11"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_short", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_imagination", q5: "path_forest", q6: "fear_fire", q7: "artifact_key" },
  },
  // === Пихта + жила дракона ===
  {
    resultId: "fir_dragon",
    length: '11 1/2"',
    flexibility: "достаточно гибкая",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_purposefulness", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_mirror" },
  },
  {
    resultId: "fir_dragon",
    length: '12 1/2"',
    flexibility: "жёсткая",
    conditions: { q1: "height_medium", q2: "eyes_gray", q3: "birthday_even", q4: "pride_perseverance", q5: "path_forest", q6: "fear_fire", q7: "artifact_dagger" },
  },
  // === Пихта + волос единорога ===
  {
    resultId: "fir_unicorn",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_hazel", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  // === Боярышник + жила дракона ===
  {
    resultId: "hawthorn_dragon",
    length: '13"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_tall", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_imagination", q5: "path_castle", q6: "fear_fire", q7: "artifact_dagger" },
  },
  {
    resultId: "hawthorn_dragon",
    length: '14 1/2"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_tall", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_intellect", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  // === Боярышник + волос единорога ===
  {
    resultId: "hawthorn_unicorn",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_heights", q7: "artifact_scroll" },
  },
  {
    resultId: "hawthorn_unicorn",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_fire", q7: "artifact_key" },
  },
  {
    resultId: "hawthorn_unicorn",
    length: '12 1/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_darkness", q7: "artifact_mirror" },
  },
  {
    resultId: "hawthorn_unicorn",
    length: '14"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_tall", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_imagination", q5: "path_castle", q6: "fear_fire", q7: "artifact_mirror" },
  },
  {
    resultId: "hawthorn_unicorn",
    length: '14 1/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_tall", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_imagination", q5: "path_castle", q6: "fear_fire", q7: "artifact_mirror" },
  },
  {
    resultId: "hawthorn_unicorn",
    length: '10"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_short", q2: "eyes_blue", q3: "birthday_even", q4: "pride_kindness", q5: "path_castle", q6: "fear_heights", q7: "artifact_scroll" },
  },
  // === Орешник + перо феникса ===
  {
    resultId: "hazel_phoenix",
    length: '10 3/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_blue_green", q3: "birthday_odd", q4: "pride_imagination", q5: "path_castle", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  {
    resultId: "hazel_phoenix",
    length: '12 1/2"',
    flexibility: "гнущаяся",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_intellect", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_dagger" },
  },
  // === Орешник + волос единорога ===
  {
    resultId: "hazel_unicorn",
    length: '12 1/4"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_tall", q2: "eyes_green", q3: "birthday_even", q4: "pride_intellect", q5: "path_castle", q6: "fear_loneliness", q7: "artifact_key" },
  },
  {
    resultId: "hazel_unicorn",
    length: '11"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_short", q2: "eyes_blue_green", q3: "birthday_odd", q4: "pride_imagination", q5: "path_castle", q6: "fear_heights", q7: "artifact_key" },
  },
  // === Остролист + жила дракона ===
  {
    resultId: "holly_dragon",
    length: '12 1/2"',
    flexibility: "жёсткая",
    conditions: { q1: "height_medium", q2: "eyes_green", q3: "birthday_even", q4: "pride_perseverance", q5: "path_forest", q6: "fear_heights", q7: "artifact_dagger" },
  },
  // === Остролист + перо феникса ===
  {
    resultId: "holly_phoenix",
    length: '11"',
    flexibility: "гибкая",
    conditions: { q1: "height_short", q2: "eyes_green", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_forest", q6: "fear_closed_spaces", q7: "artifact_key" },
  },
  // === Тис + волос единорога ===
  {
    resultId: "yew_unicorn",
    length: '10 3/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_imagination", q5: "path_forest", q6: "fear_heights", q7: "artifact_scroll" },
  },
  // === Граб + жила дракона ===
  {
    resultId: "hornbeam_dragon",
    length: '12 1/2"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_green", q3: "birthday_even", q4: "pride_imagination", q5: "path_sea", q6: "fear_heights", q7: "artifact_dagger" },
  },
  // === Граб + перо феникса ===
  {
    resultId: "hornbeam_phoenix",
    length: '12 1/2"',
    flexibility: "гнущаяся",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_optimism", q5: "path_castle", q6: "fear_loneliness", q7: "artifact_dagger" },
  },
  // === Граб + волос единорога ===
  {
    resultId: "hornbeam_unicorn",
    length: '12 1/4"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_medium", q2: "eyes_green", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_fire", q7: "artifact_key" },
  },
  {
    resultId: "hornbeam_unicorn",
    length: '10 3/4"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_medium", q2: "eyes_green", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_heights", q7: "artifact_scroll" },
  },
  // === Лиственница + жила дракона ===
  {
    resultId: "larch_dragon",
    length: '12 3/4"',
    flexibility: "гибкая",
    conditions: { q1: "height_short", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_heights", q7: "artifact_dagger" },
  },
  // === Лиственница + перо феникса ===
  {
    resultId: "larch_phoenix",
    length: '10 3/4"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_short", q2: "eyes_other", q3: "birthday_odd", q4: "pride_kindness", q5: "path_sea", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  {
    resultId: "larch_phoenix",
    length: '11"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_green", q3: "birthday_odd", q4: "pride_intellect", q5: "path_forest", q6: "fear_closed_spaces", q7: "artifact_key" },
  },
  // === Лиственница + волос единорога ===
  {
    resultId: "larch_unicorn",
    length: '9 3/4"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_short", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_kindness", q5: "path_forest", q6: "fear_heights", q7: "artifact_gem" },
  },
  // === Лавр + жила дракона ===
  {
    resultId: "laurel_dragon",
    length: '12 1/2"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_medium", q2: "eyes_blue_green", q3: "birthday_even", q4: "pride_intellect", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_dagger" },
  },
  {
    resultId: "laurel_dragon",
    length: '12 1/2"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_medium", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_dagger" },
  },
  {
    resultId: "laurel_dragon",
    length: '14"',
    flexibility: "плотная",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_optimism", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_mirror" },
  },
  // === Лавр + перо феникса ===
  {
    resultId: "laurel_phoenix",
    length: '10"',
    flexibility: "гибкая",
    conditions: { q1: "height_short", q2: "eyes_blue_green", q3: "birthday_even", q4: "pride_intellect", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  // === Лавр + волос единорога ===
  {
    resultId: "laurel_unicorn",
    length: '9 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_blue_green", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_gem" },
  },
  // === Клён + жила дракона ===
  {
    resultId: "maple_dragon",
    length: '12 1/2"',
    flexibility: "гибкая",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_sea", q6: "fear_darkness", q7: "artifact_dagger" },
  },
  {
    resultId: "maple_dragon",
    length: '13"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_tall", q2: "eyes_other", q3: "birthday_even", q4: "pride_intellect", q5: "path_sea", q6: "fear_fire", q7: "artifact_scroll" },
  },
  // === Клён + перо феникса ===
  {
    resultId: "maple_phoenix",
    length: '14 1/2"',
    flexibility: "жёсткая",
    conditions: { q1: "height_tall", q2: "eyes_blue_green", q3: "birthday_even", q4: "pride_perseverance", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  // === Клён + волос единорога ===
  {
    resultId: "maple_unicorn",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_blue_green", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_sea", q6: "fear_fire", q7: "artifact_scroll" },
  },
  {
    resultId: "maple_unicorn",
    length: '10 3/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_short", q2: "eyes_blue_green", q3: "birthday_even", q4: "pride_imagination", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  {
    resultId: "maple_unicorn",
    length: '11 3/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_blue_green", q3: "birthday_even", q4: "pride_imagination", q5: "path_sea", q6: "fear_fire", q7: "artifact_gem" },
  },
  {
    resultId: "maple_unicorn",
    length: '12 1/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_blue_green", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_fire", q7: "artifact_key" },
  },
  {
    resultId: "maple_unicorn",
    length: '13 3/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_tall", q2: "eyes_green", q3: "birthday_even", q4: "pride_imagination", q5: "path_castle", q6: "fear_fire", q7: "artifact_key" },
  },
  {
    resultId: "maple_unicorn",
    length: '14 1/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_tall", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_kindness", q5: "path_castle", q6: "fear_darkness", q7: "artifact_mirror" },
  },
  // === Груша + перо феникса ===
  {
    resultId: "pear_phoenix",
    length: '10 3/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_short", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  // === Груша + волос единорога ===
  {
    resultId: "pear_unicorn",
    length: '10 1/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_short", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_imagination", q5: "path_forest", q6: "fear_fire", q7: "artifact_mirror" },
  },
  {
    resultId: "pear_unicorn",
    length: '10 3/4"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_imagination", q5: "path_forest", q6: "fear_fire", q7: "artifact_scroll" },
  },
  {
    resultId: "pear_unicorn",
    length: '10 3/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_heights", q7: "artifact_scroll" },
  },
  {
    resultId: "pear_unicorn",
    length: '11 1/2"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_kindness", q5: "path_sea", q6: "fear_darkness", q7: "artifact_mirror" },
  },
  {
    resultId: "pear_unicorn",
    length: '12 1/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_fire", q7: "artifact_key" },
  },
  // === Сосна + жила дракона ===
  {
    resultId: "pine_dragon",
    length: '12 1/2"',
    flexibility: "гибкая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_castle", q6: "fear_heights", q7: "artifact_dagger" },
  },
  // === Сосна + перо феникса ===
  {
    resultId: "pine_phoenix",
    length: '12 1/2"',
    flexibility: "гибкая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_castle", q6: "fear_loneliness", q7: "artifact_dagger" },
  },
  {
    resultId: "pine_phoenix",
    length: '14 1/2"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_tall", q2: "eyes_blue_green", q3: "birthday_even", q4: "pride_intellect", q5: "path_castle", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  {
    resultId: "pine_phoenix",
    length: '13 1/4"',
    flexibility: "гибкая",
    conditions: { q1: "height_tall", q2: "eyes_other", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_gem" },
  },
  {
    resultId: "pine_phoenix",
    length: '14 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  // === Тополь + перо феникса ===
  {
    resultId: "poplar_phoenix",
    length: '10"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_other", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  // === Тополь + волос единорога ===
  {
    resultId: "poplar_unicorn",
    length: '11"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_short", q2: "eyes_other", q3: "birthday_even", q4: "pride_intellect", q5: "path_castle", q6: "fear_heights", q7: "artifact_key" },
  },
  // === Красный дуб + волос единорога ===
  {
    resultId: "red_oak_unicorn",
    length: '11"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_short", q2: "eyes_gray", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_key" },
  },
  // === Красный дуб + перо феникса ===
  {
    resultId: "red_oak_phoenix",
    length: '10 3/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_kindness", q5: "path_forest", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  // === Секвоя + волос единорога ===
  {
    resultId: "redwood_unicorn",
    length: '10 3/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_kindness", q5: "path_castle", q6: "fear_heights", q7: "artifact_scroll" },
  },
  {
    resultId: "redwood_unicorn",
    length: '11 3/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_kindness", q5: "path_castle", q6: "fear_fire", q7: "artifact_gem" },
  },
  // === Секвоя + перо феникса ===
  {
    resultId: "redwood_phoenix",
    length: '11"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  // === Рябина + волос единорога ===
  {
    resultId: "rowan_unicorn",
    length: '10 3/4"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_fire", q7: "artifact_scroll" },
  },
  {
    resultId: "rowan_unicorn",
    length: '10 3/4"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_blue", q3: "birthday_even", q4: "pride_imagination", q5: "path_sea", q6: "fear_heights", q7: "artifact_scroll" },
  },
  {
    resultId: "rowan_unicorn",
    length: '11 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_optimism", q5: "path_forest", q6: "fear_darkness", q7: "artifact_mirror" },
  },
  // === Рябина + волос единорога (доп) ===
  {
    resultId: "rowan_unicorn",
    length: '10 3/4"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  // === Рябина + перо феникса ===
  {
    resultId: "rowan_phoenix",
    length: '13"',
    flexibility: "гибкая",
    conditions: { q1: "height_tall", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_perseverance", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_dagger" },
  },
  // === Серебряная липа + жила дракона ===
  {
    resultId: "silver_lime_dragon",
    length: '12 1/2"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_heights", q7: "artifact_dagger" },
  },
  // === Серебряная липа + волос единорога ===
  {
    resultId: "silver_lime_unicorn",
    length: '12 1/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_fire", q7: "artifact_key" },
  },
  {
    resultId: "silver_lime_unicorn",
    length: '10 3/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_kindness", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  // === Ель + перо феникса ===
  {
    resultId: "spruce_phoenix",
    length: '10"',
    flexibility: "хрупкая",
    conditions: { q1: "height_short", q2: "eyes_green", q3: "birthday_odd", q4: "pride_originality", q5: "path_castle", q6: "fear_closed_spaces", q7: "artifact_scroll" },
  },
  {
    resultId: "spruce_phoenix",
    length: '13 3/4"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_tall", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_imagination", q5: "path_castle", q6: "fear_closed_spaces", q7: "artifact_key" },
  },
  // === Ель + волос единорога ===
  {
    resultId: "spruce_unicorn",
    length: '11 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_forest", q6: "fear_heights", q7: "artifact_scroll" },
  },
  {
    resultId: "spruce_unicorn",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  // === Сикомора + жила дракона ===
  {
    resultId: "sycamore_dragon",
    length: '12 1/2"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_fire", q7: "artifact_dagger" },
  },
  {
    resultId: "sycamore_dragon",
    length: '13"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_tall", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_imagination", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_dagger" },
  },
  // === Сикомора + перо феникса ===
  {
    resultId: "sycamore_phoenix",
    length: '10 3/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_castle", q6: "fear_darkness", q7: "artifact_scroll" },
  },
  {
    resultId: "sycamore_phoenix",
    length: '12 1/2"',
    flexibility: "на удивление пружинистая",
    conditions: { q1: "height_medium", q2: "eyes_dark_brown", q3: "birthday_even", q4: "pride_imagination", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_dagger" },
  },
  // === Сикомора + волос единорога ===
  {
    resultId: "sycamore_unicorn",
    length: '10"',
    flexibility: "слегка упругая",
    conditions: { q1: "height_short", q2: "eyes_dark_brown", q3: "birthday_odd", q4: "pride_imagination", q5: "path_sea", q6: "fear_fire", q7: "artifact_scroll" },
  },
  {
    resultId: "sycamore_unicorn",
    length: '10 3/4"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_purposefulness", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  // === Лоза + жила дракона ===
  {
    resultId: "vine_dragon",
    length: '11 1/2"',
    flexibility: "пластичная",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_optimism", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_mirror" },
  },
  {
    resultId: "vine_dragon",
    length: '9 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_short", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_darkness", q7: "artifact_glove" },
  },
  // === Лоза + перо феникса ===
  {
    resultId: "vine_phoenix",
    length: '12"',
    flexibility: "пластичная",
    conditions: { q1: "height_medium", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_optimism", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_dagger" },
  },
  // === Лоза + волос единорога ===
  {
    resultId: "vine_unicorn",
    length: '11 1/2"',
    flexibility: "твёрдая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_even", q4: "pride_perseverance", q5: "path_sea", q6: "fear_fire", q7: "artifact_mirror" },
  },
  {
    resultId: "vine_unicorn",
    length: '11 1/4"',
    flexibility: "жёсткая",
    conditions: { q1: "height_medium", q2: "eyes_hazel", q3: "birthday_even", q4: "pride_perseverance", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_bottle" },
  },
  {
    resultId: "vine_unicorn",
    length: '10 3/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_gray_blue", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_heights", q7: "artifact_gem" },
  },
  {
    resultId: "vine_unicorn",
    length: '13 1/4"',
    flexibility: "твёрдая",
    conditions: { q1: "height_tall", q2: "eyes_green", q3: "birthday_odd", q4: "pride_intellect", q5: "path_sea", q6: "fear_heights", q7: "artifact_gem" },
  },
  // === Орех + жила дракона ===
  {
    resultId: "walnut_dragon",
    length: '9 1/2"',
    flexibility: "жёсткая",
    conditions: { q1: "height_short", q2: "eyes_blue", q3: "birthday_even", q4: "pride_perseverance", q5: "path_castle", q6: "fear_heights", q7: "artifact_glove" },
  },
  // === Орех + волос единорога ===
  {
    resultId: "walnut_unicorn",
    length: '10 3/4"',
    flexibility: "достаточно гибкая",
    conditions: { q1: "height_medium", q2: "eyes_green", q3: "birthday_odd", q4: "pride_purposefulness", q5: "path_forest", q6: "fear_loneliness", q7: "artifact_scroll" },
  },
  // === Ива + жила дракона ===
  {
    resultId: "willow_dragon",
    length: '10 1/4"',
    flexibility: "довольно гибкая",
    conditions: { q1: "height_short", q2: "eyes_blue", q3: "birthday_even", q4: "pride_kindness", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_mirror" },
  },
  // === Ива + перо феникса ===
  {
    resultId: "willow_phoenix",
    length: '12 1/4"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_medium", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_kindness", q5: "path_sea", q6: "fear_closed_spaces", q7: "artifact_key" },
  },
  // === Ива + волос единорога ===
  {
    resultId: "willow_unicorn",
    length: '14"',
    flexibility: "слегка податливая",
    conditions: { q1: "height_tall", q2: "eyes_blue", q3: "birthday_odd", q4: "pride_kindness", q5: "path_sea", q6: "fear_loneliness", q7: "artifact_glove" },
  },
  // === Тис + жила дракона ===
  {
    resultId: "yew_dragon",
    length: '14"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_tall", q2: "eyes_brown", q3: "birthday_even", q4: "pride_purposefulness", q5: "path_forest", q6: "fear_heights", q7: "artifact_glove" },
  },
  // === Тис + перо феникса ===
  {
    resultId: "yew_phoenix",
    length: '11"',
    flexibility: "несгибаемая",
    conditions: { q1: "height_short", q2: "eyes_brown", q3: "birthday_odd", q4: "pride_purposefulness", q5: "path_forest", q6: "fear_darkness", q7: "artifact_key" },
  },
];

// Простая детерминированная хэш-функция от строки
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Функция поиска результата по ответам пользователя
export function findResult(selectedKeys) {
  // selectedKeys: { q1: "height_short", q2: "eyes_brown", ..., q7: "artifact_gem" }

  // 1. Сначала ищем точное совпадение среди правил
  for (const rule of resultRules) {
    let match = true;
    for (const [qKey, answerKey] of Object.entries(rule.conditions)) {
      if (selectedKeys[qKey] !== answerKey) {
        match = false;
        break;
      }
    }
    if (match) {
      const result = resultTypes[rule.resultId];
      return {
        ...result,
        length: rule.length,
        flexibility: rule.flexibility,
      };
    }
  }

  // 2. Если точного совпадения нет — выбираем детерминированно через хэш
  // Собираем строку из всех ответов (всегда в одинаковом порядке)
  const qKeys = Object.keys(selectedKeys).sort();
  const answerString = qKeys.map(k => selectedKeys[k]).join("|");
  const hash = hashString(answerString);

  // Выбираем одно из существующих правил по хэшу — так любая комбинация
  // даёт один из 170 реальных результатов (с длиной/гибкостью)
  const rule = resultRules[hash % resultRules.length];
  const result = resultTypes[rule.resultId];

  return {
    ...result,
    length: rule.length,
    flexibility: rule.flexibility,
  };
}

// Получить все уникальные resultId из правил
export function getAllResultIds() {
  const ids = new Set();
  for (const rule of resultRules) {
    ids.add(rule.resultId);
  }
  return [...ids];
}
