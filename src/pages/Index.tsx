import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CompassSVG } from "@/components/travel/CompassSVG";
import { HomeScreen, RoutePointsList } from "@/components/travel/RoutesList";
import { RoutePointDetail } from "@/components/travel/RoutePointDetail";
import { routes, RouteId } from "@/components/travel/types";

export default function Index() {
  const [activeRoute, setActiveRoute] = useState<RouteId | null>(null);
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const selectedRoute = routes.find((r) => r.id === activeRoute) || null;
  const selectedPoint = selectedRoute?.points.find((p) => p.id === activePoint) || null;

  const handleRouteSelect = (id: RouteId) => {
    setActiveRoute(id);
    setActivePoint(null);
  };

  const handleBack = () => {
    if (activePoint) {
      setActivePoint(null);
    } else {
      setActiveRoute(null);
    }
  };

  return (
    <div
      className="min-h-screen font-montserrat"
      style={{
        background: "linear-gradient(160deg, #fdf3e3 0%, #f5e6c8 40%, #ede0c4 100%)",
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
        {/* Главный экран */}
        {!activeRoute && (
          <HomeScreen onSelectRoute={handleRouteSelect} />
        )}

        {/* Список точек маршрута */}
        {activeRoute && !activePoint && selectedRoute && (
          <RoutePointsList
            route={selectedRoute}
            activeRoute={activeRoute}
            onSelectPoint={setActivePoint}
          />
        )}

        {/* Детальный экран точки */}
        {activePoint && selectedPoint && selectedRoute && activeRoute && (
          <RoutePointDetail
            point={selectedPoint}
            route={selectedRoute}
            activeRoute={activeRoute}
            onBackToRoutes={() => { setActiveRoute(null); setActivePoint(null); }}
            onBackToPoints={() => setActivePoint(null)}
            setLightboxImg={setLightboxImg}
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
      <footer className="relative z-10 mt-20 border-t-2 py-8 text-center" style={{ borderColor: "#e3c07f", background: "rgba(253,243,227,0.7)" }}>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12" style={{ background: "#c8941a" }} />
          <div className="w-8 h-8">
            <CompassSVG />
          </div>
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
