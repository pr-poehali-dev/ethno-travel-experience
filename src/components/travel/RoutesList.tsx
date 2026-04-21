import Icon from "@/components/ui/icon";
import { Route, RouteId, RoutePoint, routes, accentColors } from "./types";

const difficultyIcon: Record<string, string> = {
  "лёгкий": "TrendingUp",
  "средний": "Activity",
  "сложный": "Zap",
};
const difficultyColor: Record<string, string> = {
  "лёгкий": "#065f46",
  "средний": "#92400e",
  "сложный": "#9f1239",
};

interface HomeScreenProps {
  onSelectRoute: (id: RouteId) => void;
  visited: Set<string>;
}

export const HomeScreen = ({ onSelectRoute, visited }: HomeScreenProps) => (
  <div className="animate-fade-in">
    {/* Герой */}
    <section className="text-center mb-16">
      <div className="inline-block mb-6">
        <span className="text-4xl">✦</span>
      </div>
      <h2 className="font-cormorant text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ color: "#2c1a0e" }}>
        Выбери свой маршрут
      </h2>
      <p className="font-montserrat text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#6b4a30" }}>
        Четыре пути сквозь культуру, вкусы и предания народов Поволжья —
        выберите то, что отзовётся в вашем сердце.
      </p>
      <div className="flex items-center justify-center gap-3 mt-8">
        <div className="h-px w-16" style={{ background: "#c8941a" }} />
        <span className="text-xl">🧭</span>
        <div className="h-px w-16" style={{ background: "#c8941a" }} />
      </div>
    </section>

    {/* О проекте */}
    <section className="mb-16 grid md:grid-cols-3 gap-6">
      {[
        { icon: "Heart", title: "Дружба народов", text: "Культурные связи, выстроенные столетиями совместного пути, — основа мира и взаимопонимания." },
        { icon: "Globe", title: "Живая традиция", text: "Каждый маршрут — это не музейный экспонат, а живая история, которую продолжают люди сегодня." },
        { icon: "Users", title: "Общее наследие", text: "Языки разные — душа одна. Наш проект помогает услышать каждый голос и сохранить его для потомков." },
      ].map((item, i) => (
        <div
          key={i}
          className="p-6 rounded-lg border text-center"
          style={{ background: "rgba(253,243,227,0.7)", borderColor: "#e3c07f" }}
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
        <h3 className="font-cormorant text-3xl font-bold" style={{ color: "#2c1a0e" }}>Маршруты</h3>
        <p className="text-sm mt-2" style={{ color: "#6b4a30" }}>Нажмите на карточку, чтобы начать путешествие</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {routes.map((route) => {
          const visitedCount = route.points.filter(p => visited.has(p.id)).length;
          const accent = accentColors[route.id as RouteId];
          const completed = visitedCount === route.points.length && route.points.length > 0;

          return (
            <button
              key={route.id}
              onClick={() => onSelectRoute(route.id)}
              className="group text-left rounded-xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: "#e3c07f", background: "rgba(253,243,227,0.8)" }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,26,14,0.8) 0%, transparent 55%)" }} />
                {completed && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-montserrat flex items-center gap-1" style={{ background: "#065f46", color: "white" }}>
                    <Icon name="CheckCircle" size={11} />
                    Пройден
                  </div>
                )}
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-xs font-montserrat mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>{route.subtitle}</p>
                  <span className="text-white font-cormorant text-2xl font-semibold drop-shadow">{route.title}</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6b4a30" }}>{route.description}</p>

                {/* Метаданные */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-montserrat" style={{ color: difficultyColor[route.difficulty] }}>
                    <Icon name={difficultyIcon[route.difficulty]} size={12} />
                    {route.difficulty}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-montserrat" style={{ color: "#6b4a30" }}>
                    <Icon name="Clock" size={12} />
                    {route.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-montserrat" style={{ color: "#6b4a30" }}>
                    <Icon name="MapPin" size={12} />
                    {route.points.length} точки маршрута
                  </div>
                </div>

                {/* Прогресс */}
                {visitedCount > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs font-montserrat mb-1" style={{ color: "#a86e2e" }}>
                      <span>Прогресс</span>
                      <span>{visitedCount}/{route.points.length}</span>
                    </div>
                    <div className="w-full rounded-full h-1.5" style={{ background: "#e3c07f" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${(visitedCount / route.points.length) * 100}%`, background: accent }} />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-1" style={{ color: "#c8941a" }}>
                  <span className="text-xs font-montserrat">Открыть маршрут</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  </div>
);

interface RoutePointsListProps {
  route: Route;
  activeRoute: RouteId;
  onSelectPoint: (id: string) => void;
  visited: Set<string>;
  favorites: Set<string>;
}

export const RoutePointsList = ({ route, activeRoute, onSelectPoint, visited, favorites }: RoutePointsListProps) => {
  const accent = accentColors[activeRoute];
  const visitedCount = route.points.filter(p => visited.has(p.id)).length;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Icon name={route.icon} size={22} style={{ color: accent }} />
          <h2 className="font-cormorant text-4xl font-bold" style={{ color: "#2c1a0e" }}>
            {route.title}
          </h2>
        </div>
        <p className="font-montserrat text-sm mb-3" style={{ color: "#6b4a30" }}>{route.subtitle}</p>

        {/* Метаданные маршрута */}
        <div className="flex flex-wrap gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-xs font-montserrat" style={{ color: difficultyColor[route.difficulty] }}>
            <Icon name={difficultyIcon[route.difficulty]} size={12} />
            Сложность: {route.difficulty}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-montserrat" style={{ color: "#6b4a30" }}>
            <Icon name="Clock" size={12} />
            {route.duration}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-montserrat" style={{ color: "#6b4a30" }}>
            <Icon name="MapPin" size={12} />
            {route.points.length} точки
          </span>
        </div>

        {/* Прогресс маршрута */}
        <div>
          <div className="flex justify-between text-xs font-montserrat mb-1.5" style={{ color: "#a86e2e" }}>
            <span>Пройдено точек</span>
            <span>{visitedCount} из {route.points.length}</span>
          </div>
          <div className="w-full rounded-full h-1.5" style={{ background: "#e3c07f" }}>
            <div className="h-1.5 rounded-full transition-all" style={{ width: `${(visitedCount / route.points.length) * 100}%`, background: accent }} />
          </div>
        </div>
      </div>

      <div className="relative">
        {route.points.map((point: RoutePoint, i: number) => {
          const isVisited = visited.has(point.id);
          const isFav = favorites.has(point.id);

          return (
            <div key={point.id} className="relative flex gap-6 mb-8 last:mb-0">
              {/* Вертикальная линия */}
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-cormorant text-lg font-bold flex-shrink-0 transition-all"
                  style={{
                    background: isVisited ? accent : "#f7edd8",
                    color: isVisited ? "white" : accent,
                    border: `2px solid ${accent}`,
                  }}
                >
                  {isVisited ? <Icon name="Check" size={16} /> : i + 1}
                </div>
                {i < route.points.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ background: `${accent}40`, minHeight: "40px" }} />
                )}
              </div>

              {/* Карточка точки */}
              <button
                onClick={() => onSelectPoint(point.id)}
                className="flex-1 text-left rounded-xl border overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-2"
                style={{ borderColor: isVisited ? `${accent}60` : "#e3c07f", background: "rgba(253,243,227,0.85)" }}
              >
                <div className="flex">
                  <div className="w-32 h-28 flex-shrink-0 overflow-hidden relative">
                    <img src={point.image} alt={point.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                    {isFav && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#9f1239" }}>
                        <Icon name="Heart" size={11} style={{ color: "white" }} />
                      </div>
                    )}
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
                    <div className="flex flex-wrap gap-1.5 mt-3 items-center">
                      {point.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f7edd8", color: "#a86e2e", border: "1px solid #e3c07f" }}>
                          {tag}
                        </span>
                      ))}
                      {isVisited && (
                        <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{ background: "#065f46", color: "white" }}>
                          ✓ Посещено
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
