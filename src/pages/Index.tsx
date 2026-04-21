import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CompassSVG } from "@/components/travel/CompassSVG";
import { HomeScreen, RoutePointsList } from "@/components/travel/RoutesList";
import { RoutePointDetail } from "@/components/travel/RoutePointDetail";
import { UserCabinet } from "@/components/travel/UserCabinet";
import { routes, RouteId } from "@/components/travel/types";

type Screen = "home" | "route" | "point" | "cabinet";

export default function Index() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeRoute, setActiveRoute] = useState<RouteId | null>(null);
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const selectedRoute = routes.find((r) => r.id === activeRoute) || null;
  const selectedPoint = selectedRoute?.points.find((p) => p.id === activePoint) || null;

  const handleRouteSelect = (id: RouteId) => {
    setActiveRoute(id);
    setActivePoint(null);
    setScreen("route");
  };

  const handlePointSelect = (id: string) => {
    setActivePoint(id);
    setScreen("point");
  };

  const handleBack = () => {
    if (screen === "point") {
      setActivePoint(null);
      setScreen("route");
    } else if (screen === "route") {
      setActiveRoute(null);
      setScreen("home");
    } else if (screen === "cabinet") {
      setScreen("home");
    }
  };

  const handleToggleFavorite = (pointId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(pointId)) next.delete(pointId);
      else next.add(pointId);
      return next;
    });
  };

  const handleMarkVisited = (pointId: string) => {
    setVisited(prev => {
      const next = new Set(prev);
      if (next.has(pointId)) next.delete(pointId);
      else next.add(pointId);
      return next;
    });
  };

  const handleOpenFromCabinet = (routeId: RouteId, pointId: string) => {
    setActiveRoute(routeId);
    setActivePoint(pointId);
    setScreen("point");
  };

  const showBack = screen !== "home";
  const backLabel =
    screen === "point" ? "К маршруту" :
    screen === "route" ? "К маршрутам" :
    "На главную";

  return (
    <div
      className="min-h-screen font-montserrat"
      style={{ background: "linear-gradient(160deg, #fdf3e3 0%, #f5e6c8 40%, #ede0c4 100%)" }}
    >
      {/* Текстура фона */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236b4a30' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Шапка */}
      <header
        className="relative z-10 border-b-2"
        style={{ background: "rgba(253,243,227,0.94)", backdropFilter: "blur(8px)", borderColor: "rgba(139,90,43,0.2)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setScreen("home")}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 animate-compass-spin">
              <CompassSVG />
            </div>
            <div className="text-left">
              <h1 className="font-cormorant text-2xl font-bold leading-none" style={{ color: "#2c1a0e" }}>
                Пути Дружбы Народов
              </h1>
              <p className="font-montserrat text-xs tracking-[0.2em] uppercase mt-0.5" style={{ color: "#6b4a30" }}>
                Культурные маршруты Поволжья
              </p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border transition-all hover:bg-amber-50"
                style={{ borderColor: "#c8941a", color: "#6b4a30" }}
              >
                <Icon name="ArrowLeft" size={15} />
                <span className="hidden sm:inline">{backLabel}</span>
              </button>
            )}
            {/* Кнопка кабинета */}
            <button
              onClick={() => setScreen("cabinet")}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border transition-all relative"
              style={{
                background: screen === "cabinet" ? "#c8941a" : "#f7edd8",
                borderColor: "#c8941a",
                color: screen === "cabinet" ? "white" : "#6b4a30",
              }}
            >
              <Icon name="User" size={15} />
              <span className="hidden sm:inline">Кабинет</span>
              {visited.size > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs flex items-center justify-center font-montserrat font-bold"
                  style={{ background: "#065f46", color: "white" }}
                >
                  {visited.size}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* Главный экран */}
        {screen === "home" && (
          <HomeScreen onSelectRoute={handleRouteSelect} visited={visited} />
        )}

        {/* Список точек маршрута */}
        {screen === "route" && selectedRoute && (
          <RoutePointsList
            route={selectedRoute}
            activeRoute={activeRoute!}
            onSelectPoint={handlePointSelect}
            visited={visited}
            favorites={favorites}
          />
        )}

        {/* Детальный экран точки */}
        {screen === "point" && selectedPoint && selectedRoute && activeRoute && (
          <RoutePointDetail
            point={selectedPoint}
            route={selectedRoute}
            activeRoute={activeRoute}
            onBackToRoutes={() => { setActiveRoute(null); setActivePoint(null); setScreen("home"); }}
            onBackToPoints={() => { setActivePoint(null); setScreen("route"); }}
            setLightboxImg={setLightboxImg}
            isFavorite={favorites.has(selectedPoint.id)}
            isVisited={visited.has(selectedPoint.id)}
            onToggleFavorite={() => handleToggleFavorite(selectedPoint.id)}
            onMarkVisited={() => handleMarkVisited(selectedPoint.id)}
          />
        )}

        {/* Личный кабинет */}
        {screen === "cabinet" && (
          <UserCabinet
            visited={visited}
            favorites={favorites}
            onOpenPoint={handleOpenFromCabinet}
            onRemoveFavorite={handleToggleFavorite}
          />
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
      <footer
        className="relative z-10 mt-20 border-t-2 py-8 text-center"
        style={{ borderColor: "#e3c07f", background: "rgba(253,243,227,0.7)" }}
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12" style={{ background: "#c8941a" }} />
          <div className="w-8 h-8"><CompassSVG /></div>
          <div className="h-px w-12" style={{ background: "#c8941a" }} />
        </div>
        <p className="font-cormorant text-lg italic" style={{ color: "#6b4a30" }}>
          «Дороги соединяют города. Культура соединяет сердца.»
        </p>
        <p className="font-montserrat text-xs mt-2 tracking-widest uppercase" style={{ color: "#a86e2e" }}>
          Пути Дружбы Народов · Поволжье · 2024
        </p>
        <p className="font-montserrat text-xs mt-1" style={{ color: "#c4a882" }}>
          Все материалы созданы авторами проекта. Иллюстрации — авторские работы.
        </p>
      </footer>
    </div>
  );
}
