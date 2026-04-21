import Icon from "@/components/ui/icon";
import { routes, RouteId, accentColors } from "./types";

interface UserCabinetProps {
  visited: Set<string>;
  favorites: Set<string>;
  onOpenPoint: (routeId: RouteId, pointId: string) => void;
  onRemoveFavorite: (pointId: string) => void;
}

const difficultyColor: Record<string, string> = {
  "лёгкий": "#065f46",
  "средний": "#92400e",
  "сложный": "#9f1239",
};

export const UserCabinet = ({ visited, favorites, onOpenPoint, onRemoveFavorite }: UserCabinetProps) => {
  const totalPoints = routes.reduce((sum, r) => sum + r.points.length, 0);
  const totalRoutes = routes.length;
  const visitedRoutes = routes.filter(r => r.points.every(p => visited.has(p.id))).length;

  const favoritePoints = routes.flatMap(r =>
    r.points
      .filter(p => favorites.has(p.id))
      .map(p => ({ point: p, route: r }))
  );

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      {/* Заголовок */}
      <div className="mb-10">
        <h2 className="font-cormorant text-4xl font-bold" style={{ color: "#2c1a0e" }}>Личный кабинет</h2>
        <p className="font-montserrat text-sm mt-1" style={{ color: "#6b4a30" }}>Ваш путевой дневник странника</p>
      </div>

      {/* Общий прогресс */}
      <div className="p-6 rounded-xl border mb-8" style={{ background: "rgba(253,243,227,0.9)", borderColor: "#e3c07f" }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#fdf3e3", border: "1px solid #c8941a" }}>
            <Icon name="Map" size={16} style={{ color: "#c8941a" }} />
          </div>
          <h3 className="font-cormorant text-xl font-semibold" style={{ color: "#2c1a0e" }}>Прогресс путешествия</h3>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Точек посещено", value: visited.size, total: totalPoints, icon: "MapPin" },
            { label: "Маршрутов пройдено", value: visitedRoutes, total: totalRoutes, icon: "Route" },
            { label: "В избранном", value: favorites.size, total: totalPoints, icon: "Heart" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-lg" style={{ background: "rgba(200,148,26,0.07)", border: "1px solid #e3c07f" }}>
              <Icon name={stat.icon} size={20} style={{ color: "#c8941a" }} className="mx-auto mb-2" />
              <div className="font-cormorant text-3xl font-bold" style={{ color: "#2c1a0e" }}>{stat.value}</div>
              <div className="text-xs font-montserrat mt-0.5" style={{ color: "#a86e2e" }}>{stat.label}</div>
              <div className="text-xs font-montserrat" style={{ color: "#c4a882" }}>из {stat.total}</div>
            </div>
          ))}
        </div>

        {/* Прогресс-бар общий */}
        <div>
          <div className="flex justify-between text-xs font-montserrat mb-1.5" style={{ color: "#a86e2e" }}>
            <span>Общий прогресс</span>
            <span>{Math.round((visited.size / totalPoints) * 100)}%</span>
          </div>
          <div className="w-full rounded-full h-2" style={{ background: "#e3c07f" }}>
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${(visited.size / totalPoints) * 100}%`, background: "linear-gradient(to right, #c8941a, #e8b84b)" }}
            />
          </div>
        </div>
      </div>

      {/* Прогресс по маршрутам */}
      <div className="mb-8">
        <h3 className="font-cormorant text-2xl font-semibold mb-4" style={{ color: "#2c1a0e" }}>По маршрутам</h3>
        <div className="space-y-3">
          {routes.map(route => {
            const visitedCount = route.points.filter(p => visited.has(p.id)).length;
            const percent = Math.round((visitedCount / route.points.length) * 100);
            const accent = accentColors[route.id as RouteId];
            const completed = visitedCount === route.points.length;

            return (
              <div key={route.id} className="p-4 rounded-xl border" style={{ background: "rgba(253,243,227,0.85)", borderColor: "#e3c07f" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon name={route.icon} size={16} style={{ color: accent }} />
                    <span className="font-montserrat text-sm font-medium" style={{ color: "#2c1a0e" }}>{route.title}</span>
                    {completed && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-montserrat" style={{ background: "#065f46", color: "white" }}>
                        Пройден ✓
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>
                    {visitedCount}/{route.points.length} точек
                  </span>
                </div>
                <div className="w-full rounded-full h-1.5" style={{ background: "#e3c07f" }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${percent}%`, background: accent }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Избранное */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Icon name="Heart" size={18} style={{ color: "#9f1239" }} />
          <h3 className="font-cormorant text-2xl font-semibold" style={{ color: "#2c1a0e" }}>Избранные места</h3>
        </div>

        {favoritePoints.length === 0 ? (
          <div className="text-center py-12 rounded-xl border" style={{ background: "rgba(253,243,227,0.6)", borderColor: "#e3c07f" }}>
            <Icon name="HeartOff" size={32} style={{ color: "#c4a882" }} className="mx-auto mb-3" />
            <p className="font-cormorant text-xl" style={{ color: "#a86e2e" }}>Пока пусто</p>
            <p className="font-montserrat text-sm mt-1" style={{ color: "#c4a882" }}>
              Нажмите ♡ в точке маршрута, чтобы добавить в избранное
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoritePoints.map(({ point, route }) => (
              <div
                key={point.id}
                className="flex items-center gap-4 p-4 rounded-xl border group"
                style={{ background: "rgba(253,243,227,0.85)", borderColor: "#e3c07f" }}
              >
                <img src={point.image} alt={point.title} className="w-16 h-14 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-cormorant text-lg font-semibold truncate" style={{ color: "#2c1a0e" }}>{point.title}</p>
                  <p className="text-xs font-montserrat flex items-center gap-1 mt-0.5" style={{ color: "#a86e2e" }}>
                    <Icon name="MapPin" size={10} />
                    {point.subtitle}
                  </p>
                  <p className="text-xs font-montserrat mt-1" style={{ color: "#c4a882" }}>{route.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenPoint(route.id as RouteId, point.id)}
                    className="text-xs font-montserrat px-3 py-1.5 rounded-full transition-all"
                    style={{ background: "#f7edd8", color: "#a86e2e", border: "1px solid #e3c07f" }}
                  >
                    Открыть
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(point.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-red-50"
                    style={{ border: "1px solid #e3c07f" }}
                  >
                    <Icon name="Heart" size={14} style={{ color: "#9f1239" }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
