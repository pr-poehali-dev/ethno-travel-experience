import { useState } from "react";
import Icon from "@/components/ui/icon";

const PARCHMENT_IMG = "https://cdn.poehali.dev/projects/482d4405-5286-41e9-9631-d018ad742c9f/files/e5e327cb-828c-4a4f-b683-371f67efd15c.jpg";
const COSTUME_IMG = "https://cdn.poehali.dev/projects/482d4405-5286-41e9-9631-d018ad742c9f/files/a31be8e9-957f-42a8-adf4-3942ce718836.jpg";
const FOOD_IMG = "https://cdn.poehali.dev/projects/482d4405-5286-41e9-9631-d018ad742c9f/files/366d7a6e-7002-4369-a027-d34e13473322.jpg";

type RouteId = "gastro" | "costume" | "heritage";

interface RoutePoint {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  audioLang: string[];
  tags: string[];
  artifact?: string;
}

interface Route {
  id: RouteId;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  borderColor: string;
  accentColor: string;
  bgGradient: string;
  points: RoutePoint[];
}

const routes: Route[] = [
  {
    id: "gastro",
    title: "Гастрономическая карта",
    subtitle: "Вкусы, объединяющие народы",
    icon: "UtensilsCrossed",
    color: "text-amber-800",
    borderColor: "border-amber-700",
    accentColor: "bg-amber-700",
    bgGradient: "from-amber-50 to-orange-50",
    points: [
      {
        id: "g1",
        title: "Самаркандский плов",
        subtitle: "Узбекистан · Самарканд",
        description: "Плов — не просто блюдо, это священный ритуал единения. В Самарканде его готовят в огромных казанах на открытом огне, следуя рецептам, передававшимся семь веков от мастера к мастеру. Аромат зиры, золотистой моркови и нежной баранины разносится по всей махалле, созывая соседей за общий дастархан.",
        image: FOOD_IMG,
        audioLang: ["Русский", "Узбекский", "Английский"],
        tags: ["ЮНЕСКО", "Ремесло", "Обряд"],
        artifact: "🫕 Чугунный казан XVII века",
      },
      {
        id: "g2",
        title: "Грузинское застолье — Супра",
        subtitle: "Грузия · Тбилиси",
        description: "Супра — это философия гостеприимства, воплощённая в сотнях блюд. Тамада ведёт застолье с тостами-молитвами за мир, любовь и предков. Хачапури, хинкали, чурчхела — каждое угощение несёт в себе историю края и тепло грузинской души.",
        image: FOOD_IMG,
        audioLang: ["Русский", "Грузинский", "Английский"],
        tags: ["Традиция", "Гостеприимство", "Вино"],
        artifact: "🍷 Глиняный кувшин-квеври",
      },
      {
        id: "g3",
        title: "Казахский дастархан",
        subtitle: "Казахстан · Алматы",
        description: "В степях Казахстана дастархан — знак высшего уважения к гостю. Баурсаки, кумыс, бешбармак из конины — блюда кочевников, закалённых ветрами великой степи. Белая скатерть на земле символизирует чистоту намерений и открытость сердца хозяина.",
        image: FOOD_IMG,
        audioLang: ["Русский", "Казахский", "Английский"],
        tags: ["Степная культура", "Кочевники", "Обычай"],
        artifact: "🏺 Серебряная пиала для кумыса",
      },
    ],
  },
  {
    id: "costume",
    title: "Национальный костюм",
    subtitle: "Узоры, хранящие память веков",
    icon: "Shirt",
    color: "text-rose-800",
    borderColor: "border-rose-700",
    accentColor: "bg-rose-700",
    bgGradient: "from-rose-50 to-pink-50",
    points: [
      {
        id: "c1",
        title: "Тюбетейка — корона Востока",
        subtitle: "Центральная Азия",
        description: "Тюбетейка — головной убор, в котором зашифрована вся космогония Востока. Четыре стороны олицетворяют стороны света, орнамент рассказывает о роде и происхождении. Вышивальщицы годами создавали один узор, вкладывая в каждый стежок пожелание счастья тому, кто наденет этот головной убор.",
        image: COSTUME_IMG,
        audioLang: ["Русский", "Узбекский", "Таджикский"],
        tags: ["Вышивка", "Символизм", "Ремесло"],
        artifact: "🪡 Старинная игла с золотой нитью",
      },
      {
        id: "c2",
        title: "Башкирский костюм",
        subtitle: "Россия · Башкортостан",
        description: "Башкирский национальный наряд — живая энциклопедия степной жизни. Массивные серебряные украшения — хакал и яга — передавались по женской линии и служили оберегом. Каждый элемент вышивки имеет своё название и значение: тамга рода, знак плодородия, обережная спираль.",
        image: COSTUME_IMG,
        audioLang: ["Русский", "Башкирский", "Татарский"],
        tags: ["Серебро", "Обереги", "Степь"],
        artifact: "💎 Нагрудное украшение-хакал",
      },
      {
        id: "c3",
        title: "Кыргызский эпчек",
        subtitle: "Кыргызстан · Бишкек",
        description: "Кыргызский женский костюм — поэзия в ткани. Узоры на платье — это карта мироздания: горные вершины Тянь-Шаня, реки, несущие жизнь, и небесные птицы, связывающие мир людей с миром духов. Войлочный колпак — калпак — носили и мужчины, и по форме его поля читали о статусе хозяина.",
        image: COSTUME_IMG,
        audioLang: ["Русский", "Кыргызский", "Английский"],
        tags: ["Войлок", "Горы", "Эпос Манас"],
        artifact: "🎭 Белый калпак мастера",
      },
    ],
  },
  {
    id: "heritage",
    title: "Наследие предков",
    subtitle: "Связь времён и поколений",
    icon: "Landmark",
    color: "text-emerald-800",
    borderColor: "border-emerald-700",
    accentColor: "bg-emerald-700",
    bgGradient: "from-emerald-50 to-teal-50",
    points: [
      {
        id: "h1",
        title: "Великий Шёлковый путь",
        subtitle: "Евразия · 6600 км",
        description: "Шёлковый путь — это не просто торговый маршрут, это первый диалог цивилизаций. По нему шли не только шёлк и пряности, но и идеи, религии, музыка и архитектурные стили. Города, выросшие вдоль пути — Самарканд, Мерв, Дунхуан — стали перекрёстками культур и колыбелями человечества.",
        image: PARCHMENT_IMG,
        audioLang: ["Русский", "Китайский", "Персидский", "Английский"],
        tags: ["ЮНЕСКО", "История", "Цивилизация"],
        artifact: "🗺️ Карта Аль-Идриси XII века",
      },
      {
        id: "h2",
        title: "Эпос «Манас»",
        subtitle: "Кыргызстан · Устная традиция",
        description: "«Манас» — величайший эпос человечества: он в 20 раз длиннее «Илиады» и «Одиссеи» вместе взятых. Манасчи — сказители — хранят его в памяти, не записывая ни строки. Это живое наследие, передающееся через голос, жест и дыхание уже более тысячи лет.",
        image: PARCHMENT_IMG,
        audioLang: ["Русский", "Кыргызский", "Английский"],
        tags: ["Эпос", "Устная традиция", "ЮНЕСКО"],
        artifact: "📜 Рукопись первой записи эпоса",
      },
      {
        id: "h3",
        title: "Башня Бурана",
        subtitle: "Кыргызстан · Чуйская долина",
        description: "Башня Бурана — немой свидетель расцвета и упадка великой империи Карахани. Возведённая в X веке, она пережила землетрясения, нашествия и забвение. Вокруг неё — поле балбалов, каменных стел с ликами воинов, смотрящих в вечность уже больше тысячи лет.",
        image: PARCHMENT_IMG,
        audioLang: ["Русский", "Кыргызский", "Английский"],
        tags: ["Архитектура", "X век", "Балбалы"],
        artifact: "🏛️ Барельеф с арабской вязью",
      },
    ],
  },
];

const CompassSVG = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
    <circle cx="60" cy="60" r="56" stroke="#c8941a" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="60" cy="60" r="48" stroke="#c8941a" strokeWidth="0.5" />
    <circle cx="60" cy="60" r="6" fill="#c8941a" />
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const inner = i % 3 === 0 ? 42 : 46;
      return (
        <line
          key={deg}
          x1={60 + inner * Math.sin(rad)}
          y1={60 - inner * Math.cos(rad)}
          x2={60 + 52 * Math.sin(rad)}
          y2={60 - 52 * Math.cos(rad)}
          stroke="#c8941a"
          strokeWidth={i % 3 === 0 ? "1.5" : "0.7"}
        />
      );
    })}
    <polygon points="60,12 56,58 64,58" fill="#8a1c1c" />
    <polygon points="60,108 56,62 64,62" fill="#2c1a0e" />
    <polygon points="12,60 58,56 58,64" fill="#2c1a0e" />
    <polygon points="108,60 62,56 62,64" fill="#2c1a0e" />
    {[["С","N",0],["В","E",90],["Ю","S",180],["З","W",270]].map(([ru,,deg]) => {
      const rad = ((+deg) * Math.PI) / 180;
      const r = 36;
      return (
        <text
          key={ru}
          x={60 + r * Math.sin(rad)}
          y={60 - r * Math.cos(rad) + 5}
          textAnchor="middle"
          fontSize="9"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="600"
          fill="#2c1a0e"
        >{ru}</text>
      );
    })}
  </svg>
);

const MapDotSVG = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
    <circle cx="12" cy="12" r="4" fill={color} />
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
    <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="0.5" fill="none" opacity="0.2" />
  </svg>
);

export default function Index() {
  const [activeRoute, setActiveRoute] = useState<RouteId | null>(null);
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"desc" | "media" | "audio">("desc");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const selectedRoute = routes.find((r) => r.id === activeRoute) || null;
  const selectedPoint = selectedRoute?.points.find((p) => p.id === activePoint) || null;

  const handleRouteSelect = (id: RouteId) => {
    setActiveRoute(id);
    setActivePoint(null);
    setActiveTab("desc");
  };

  const handleBack = () => {
    if (activePoint) {
      setActivePoint(null);
      setActiveTab("desc");
    } else {
      setActiveRoute(null);
    }
  };

  const accentColors: Record<RouteId, string> = {
    gastro: "#92400e",
    costume: "#9f1239",
    heritage: "#065f46",
  };

  return (
    <div
      className="min-h-screen font-montserrat"
      style={{
        background: "linear-gradient(160deg, #fdf3e3 0%, #f5e6c8 40%, #ede0c4 100%)",
        backgroundImage: `
          linear-gradient(160deg, #fdf3e3 0%, #f5e6c8 40%, #ede0c4 100%)
        `,
      }}
    >
      {/* Текстура */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236b4a30' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Шапка */}
      <header className="relative z-10 border-b-2 border-amber-800/30" style={{ background: "rgba(253,243,227,0.92)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 animate-compass-spin">
              <CompassSVG />
            </div>
            <div>
              <h1 className="font-cormorant text-2xl font-bold text-ink leading-none" style={{ color: "#2c1a0e" }}>
                Пути Дружбы Народов
              </h1>
              <p className="font-montserrat text-xs tracking-[0.2em] uppercase mt-0.5" style={{ color: "#6b4a30" }}>
                Культурные маршруты Евразии
              </p>
            </div>
          </div>

          {(activeRoute || activePoint) && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded border transition-all hover:bg-amber-100"
              style={{ borderColor: "#c8941a", color: "#6b4a30" }}
            >
              <Icon name="ArrowLeft" size={15} />
              {activePoint ? "К маршруту" : "К маршрутам"}
            </button>
          )}
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* === ГЛАВНЫЙ ЭКРАН === */}
        {!activeRoute && (
          <div className="animate-fade-in">
            {/* Герой */}
            <section className="text-center mb-20">
              <div className="inline-block mb-6">
                <span className="text-4xl">✦</span>
              </div>
              <h2 className="font-cormorant text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ color: "#2c1a0e" }}>
                Там, где встречаются
                <br />
                <em className="italic" style={{ color: "#c8941a" }}>народы и судьбы</em>
              </h2>
              <p className="font-montserrat text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#6b4a30" }}>
                Проект посвящён укреплению дружбы народов через живую культуру — 
                вкусы, наряды и предания тех, кто на протяжении веков шёл рядом по 
                великим дорогам Евразии.
              </p>
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="h-px w-16" style={{ background: "#c8941a" }} />
                <span className="text-xl">🧭</span>
                <div className="h-px w-16" style={{ background: "#c8941a" }} />
              </div>
            </section>

            {/* О проекте */}
            <section className="mb-20 grid md:grid-cols-3 gap-8">
              {[
                { icon: "Heart", title: "Дружба народов", text: "Культурные связи, выстроенные столетиями совместного пути, — основа мира и взаимопонимания." },
                { icon: "Globe", title: "Живая традиция", text: "Каждый маршрут — это не музейный экспонат, а живая история, которую продолжают люди сегодня." },
                { icon: "Users", title: "Общее наследие", text: "Языки разные — душа одна. Наш проект помогает услышать каждый голос и сохранить его для потомков." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg border text-center"
                  style={{
                    background: "rgba(253,243,227,0.7)",
                    borderColor: "#e3c07f",
                    animationDelay: `${i * 0.15}s`,
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#fdf3e3", border: "1px solid #c8941a" }}>
                    <Icon name={item.icon} size={18} style={{ color: "#c8941a" }} />
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold mb-2" style={{ color: "#2c1a0e" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b4a30" }}>{item.text}</p>
                </div>
              ))}
            </section>

            {/* Маршруты */}
            <section>
              <div className="text-center mb-10">
                <h3 className="font-cormorant text-3xl font-bold" style={{ color: "#2c1a0e" }}>Выберите маршрут</h3>
                <p className="text-sm mt-2" style={{ color: "#6b4a30" }}>Три пути — три грани одной большой истории</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {routes.map((route, i) => (
                  <button
                    key={route.id}
                    onClick={() => handleRouteSelect(route.id)}
                    className="group text-left rounded-xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{
                      borderColor: "#e3c07f",
                      background: "rgba(253,243,227,0.8)",
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={route.id === "gastro" ? FOOD_IMG : route.id === "costume" ? COSTUME_IMG : PARCHMENT_IMG}
                        alt={route.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,26,14,0.7) 0%, transparent 60%)" }} />
                      <div className="absolute bottom-3 left-4">
                        <span className="text-white font-cormorant text-xl font-semibold drop-shadow">{route.title}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "#6b4a30" }}>{route.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-montserrat tracking-wider uppercase" style={{ color: "#a86e2e" }}>
                          {route.points.length} точки маршрута
                        </span>
                        <div className="flex items-center gap-1" style={{ color: "#c8941a" }}>
                          <span className="text-xs font-montserrat">Открыть</span>
                          <Icon name="ArrowRight" size={14} />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* === МАРШРУТ (список точек) === */}
        {activeRoute && !activePoint && selectedRoute && (
          <div className="animate-fade-in">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <Icon name={selectedRoute.icon} size={22} style={{ color: accentColors[activeRoute] }} />
                <h2 className="font-cormorant text-4xl font-bold" style={{ color: "#2c1a0e" }}>
                  {selectedRoute.title}
                </h2>
              </div>
              <p className="font-montserrat text-sm" style={{ color: "#6b4a30" }}>{selectedRoute.subtitle}</p>
            </div>

            {/* Линия маршрута */}
            <div className="relative">
              {selectedRoute.points.map((point, i) => (
                <div key={point.id} className="relative flex gap-6 mb-8 last:mb-0">
                  {/* Вертикальная линия */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-cormorant text-lg font-bold text-white flex-shrink-0"
                      style={{ background: accentColors[activeRoute] }}
                    >
                      {i + 1}
                    </div>
                    {i < selectedRoute.points.length - 1 && (
                      <div className="w-px flex-1 mt-2" style={{ background: `${accentColors[activeRoute]}40`, minHeight: "40px" }} />
                    )}
                  </div>

                  {/* Карточка точки */}
                  <button
                    onClick={() => { setActivePoint(point.id); setActiveTab("desc"); }}
                    className="flex-1 text-left rounded-xl border overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-2"
                    style={{ borderColor: "#e3c07f", background: "rgba(253,243,227,0.85)" }}
                  >
                    <div className="flex">
                      <div className="w-32 h-28 flex-shrink-0 overflow-hidden">
                        <img src={point.image} alt={point.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-cormorant text-xl font-bold leading-tight" style={{ color: "#2c1a0e" }}>{point.title}</h3>
                            <p className="text-xs font-montserrat mt-0.5 flex items-center gap-1" style={{ color: "#a86e2e" }}>
                              <Icon name="MapPin" size={11} />
                              {point.subtitle}
                            </p>
                          </div>
                          <Icon name="ChevronRight" size={18} style={{ color: "#c8941a", flexShrink: 0 }} />
                        </div>
                        <p className="text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: "#6b4a30" }}>{point.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {point.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f7edd8", color: "#a86e2e", border: "1px solid #e3c07f" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === ТОЧКА МАРШРУТА (детали) === */}
        {activePoint && selectedPoint && selectedRoute && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            {/* Хлебные крошки */}
            <div className="flex items-center gap-2 text-xs font-montserrat mb-8" style={{ color: "#a86e2e" }}>
              <button onClick={() => setActiveRoute(null)} className="hover:underline">Маршруты</button>
              <Icon name="ChevronRight" size={12} />
              <button onClick={() => { setActivePoint(null); setActiveTab("desc"); }} className="hover:underline">{selectedRoute.title}</button>
              <Icon name="ChevronRight" size={12} />
              <span style={{ color: "#2c1a0e" }}>{selectedPoint.title}</span>
            </div>

            {/* Заголовок */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <MapDotSVG color={accentColors[activeRoute]} />
                <span className="text-sm font-montserrat" style={{ color: "#a86e2e" }}>{selectedPoint.subtitle}</span>
              </div>
              <h2 className="font-cormorant text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#2c1a0e" }}>
                {selectedPoint.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedPoint.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full font-montserrat" style={{ background: "#f7edd8", color: "#a86e2e", border: "1px solid #e3c07f" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Вкладки */}
            <div className="flex gap-0 mb-6 border-b-2" style={{ borderColor: "#e3c07f" }}>
              {[
                { id: "desc", label: "Описание", icon: "BookOpen" },
                { id: "media", label: "Визуальный контент", icon: "Image" },
                { id: "audio", label: "Аудиоэкскурсия", icon: "Headphones" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "desc" | "media" | "audio")}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-montserrat transition-all border-b-2 -mb-0.5"
                  style={{
                    borderColor: activeTab === tab.id ? accentColors[activeRoute] : "transparent",
                    color: activeTab === tab.id ? accentColors[activeRoute] : "#a86e2e",
                    fontWeight: activeTab === tab.id ? "600" : "400",
                  }}
                >
                  <Icon name={tab.icon} size={14} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Вкладка: Описание */}
            {activeTab === "desc" && (
              <div className="animate-fade-in">
                <div
                  className="p-8 rounded-xl border mb-6"
                  style={{ background: "rgba(253,243,227,0.85)", borderColor: "#e3c07f" }}
                >
                  <p className="font-montserrat text-base leading-8" style={{ color: "#2c1a0e" }}>
                    {selectedPoint.description}
                  </p>
                </div>
                {selectedPoint.artifact && (
                  <div
                    className="flex items-center gap-4 p-5 rounded-xl border"
                    style={{ background: "rgba(200,148,26,0.07)", borderColor: "#c8941a" }}
                  >
                    <span className="text-3xl">{selectedPoint.artifact.split(" ")[0]}</span>
                    <div>
                      <p className="text-xs font-montserrat uppercase tracking-widest mb-1" style={{ color: "#a86e2e" }}>Артефакт маршрута</p>
                      <p className="font-cormorant text-lg font-semibold" style={{ color: "#2c1a0e" }}>
                        {selectedPoint.artifact.substring(selectedPoint.artifact.indexOf(" ") + 1)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Вкладка: Визуальный контент */}
            {activeTab === "media" && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[selectedPoint.image, selectedPoint.image].map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxImg(src)}
                      className="relative overflow-hidden rounded-xl border group cursor-zoom-in"
                      style={{ borderColor: "#e3c07f" }}
                    >
                      <img src={src} alt="" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-400" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(44,26,14,0.4)" }}>
                        <Icon name="ZoomIn" size={24} style={{ color: "white" }} />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Видео-рассказ (заглушка) */}
                <div
                  className="relative rounded-xl border overflow-hidden cursor-pointer group"
                  style={{ background: "#1a0f05", borderColor: "#e3c07f" }}
                >
                  <img src={selectedPoint.image} alt="" className="w-full h-52 object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center border-2 transition-transform group-hover:scale-110"
                      style={{ background: "rgba(200,148,26,0.2)", borderColor: "#c8941a" }}
                    >
                      <Icon name="Play" size={26} style={{ color: "#c8941a" }} />
                    </div>
                    <p className="font-cormorant text-xl text-white font-semibold">Видео-рассказ</p>
                    <p className="text-xs font-montserrat" style={{ color: "#c8941a" }}>«{selectedPoint.title}»</p>
                  </div>
                </div>
              </div>
            )}

            {/* Вкладка: Аудиоэкскурсия */}
            {activeTab === "audio" && (
              <div className="animate-fade-in space-y-3">
                <p className="text-sm font-montserrat mb-5" style={{ color: "#6b4a30" }}>
                  Аудиоэкскурсия доступна на нескольких языках. Выберите удобный:
                </p>
                {selectedPoint.audioLang.map((lang) => {
                  const isPlaying = playingAudio === lang;
                  return (
                    <div
                      key={lang}
                      className="flex items-center justify-between p-4 rounded-xl border transition-all"
                      style={{
                        background: isPlaying ? "rgba(200,148,26,0.1)" : "rgba(253,243,227,0.85)",
                        borderColor: isPlaying ? "#c8941a" : "#e3c07f",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ background: isPlaying ? "#c8941a" : "#f7edd8", border: `1px solid ${isPlaying ? "#c8941a" : "#e3c07f"}` }}
                        >
                          <Icon name={isPlaying ? "Pause" : "Play"} size={14} style={{ color: isPlaying ? "white" : "#a86e2e" }} />
                        </div>
                        <div>
                          <p className="font-cormorant text-lg font-semibold" style={{ color: "#2c1a0e" }}>{lang}</p>
                          <p className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>~12 минут · HD звук</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPlayingAudio(isPlaying ? null : lang)}
                        className="text-xs font-montserrat px-4 py-1.5 rounded-full transition-all"
                        style={{
                          background: isPlaying ? accentColors[activeRoute] : "#f7edd8",
                          color: isPlaying ? "white" : "#a86e2e",
                          border: `1px solid ${isPlaying ? accentColors[activeRoute] : "#e3c07f"}`,
                        }}
                      >
                        {isPlaying ? "Пауза" : "Слушать"}
                      </button>
                    </div>
                  );
                })}

                {playingAudio && (
                  <div
                    className="mt-4 p-4 rounded-xl border animate-fade-in"
                    style={{ background: "rgba(200,148,26,0.07)", borderColor: "#c8941a" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="Headphones" size={16} style={{ color: "#c8941a" }} />
                      <span className="text-sm font-montserrat" style={{ color: "#6b4a30" }}>Воспроизводится: {playingAudio}</span>
                    </div>
                    <div className="w-full rounded-full h-1.5" style={{ background: "#e3c07f" }}>
                      <div className="h-1.5 rounded-full transition-all" style={{ width: "35%", background: "#c8941a" }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>4:12</span>
                      <span className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>12:00</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Лайтбокс */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(20,10,5,0.92)" }}
          onClick={() => setLightboxImg(null)}
        >
          <img src={lightboxImg} alt="" className="max-w-full max-h-full rounded-xl shadow-2xl" />
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(200,148,26,0.2)", border: "1px solid #c8941a" }}
            onClick={() => setLightboxImg(null)}
          >
            <Icon name="X" size={18} style={{ color: "#c8941a" }} />
          </button>
        </div>
      )}

      {/* Подвал */}
      <footer className="relative z-10 mt-20 border-t-2 py-8 text-center" style={{ borderColor: "#e3c07f", background: "rgba(253,243,227,0.7)" }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12" style={{ background: "#c8941a" }} />
          <CompassSVG />
          <div className="h-px w-12" style={{ background: "#c8941a" }} />
        </div>
        <p className="font-cormorant text-lg italic" style={{ color: "#6b4a30" }}>
          «Дороги соединяют города. Культура соединяет сердца.»
        </p>
        <p className="font-montserrat text-xs mt-2 tracking-widest uppercase" style={{ color: "#a86e2e" }}>
          Пути Дружбы Народов · 2024
        </p>
      </footer>
    </div>
  );
}
