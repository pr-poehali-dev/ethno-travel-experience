import Icon from "@/components/ui/icon";
import { Route, RouteId, RoutePoint, routes, accentColors, FOOD_IMG, COSTUME_IMG, PARCHMENT_IMG } from "./types";

interface HomeScreenProps {
  onSelectRoute: (id: RouteId) => void;
}

export const HomeScreen = ({ onSelectRoute }: HomeScreenProps) => (
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
          style={{ background: "rgba(253,243,227,0.7)", borderColor: "#e3c07f", animationDelay: `${i * 0.15}s` }}
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
            onClick={() => onSelectRoute(route.id)}
            className="group text-left rounded-xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{ borderColor: "#e3c07f", background: "rgba(253,243,227,0.8)", animationDelay: `${i * 0.1}s` }}
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
);

interface RoutePointsListProps {
  route: Route;
  activeRoute: RouteId;
  onSelectPoint: (id: string) => void;
}

export const RoutePointsList = ({ route, activeRoute, onSelectPoint }: RoutePointsListProps) => {
  const accent = accentColors[activeRoute];

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Icon name={route.icon} size={22} style={{ color: accent }} />
          <h2 className="font-cormorant text-4xl font-bold" style={{ color: "#2c1a0e" }}>
            {route.title}
          </h2>
        </div>
        <p className="font-montserrat text-sm" style={{ color: "#6b4a30" }}>{route.subtitle}</p>
      </div>

      <div className="relative">
        {route.points.map((point: RoutePoint, i: number) => (
          <div key={point.id} className="relative flex gap-6 mb-8 last:mb-0">
            {/* Вертикальная линия */}
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-cormorant text-lg font-bold text-white flex-shrink-0"
                style={{ background: accent }}
              >
                {i + 1}
              </div>
              {i < route.points.length - 1 && (
                <div className="w-px flex-1 mt-2" style={{ background: `${accent}40`, minHeight: "40px" }} />
              )}
            </div>

            {/* Карточка точки */}
            <button
              onClick={() => onSelectPoint(point.id)}
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
  );
};
