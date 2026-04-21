import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MapDotSVG } from "./CompassSVG";
import { RoutePoint, RouteId, Route, accentColors } from "./types";

interface RoutePointDetailProps {
  point: RoutePoint;
  route: Route;
  activeRoute: RouteId;
  onBackToRoutes: () => void;
  onBackToPoints: () => void;
  setLightboxImg: (src: string | null) => void;
}

export const RoutePointDetail = ({
  point,
  route,
  activeRoute,
  onBackToRoutes,
  onBackToPoints,
  setLightboxImg,
}: RoutePointDetailProps) => {
  const [activeTab, setActiveTab] = useState<"desc" | "media" | "audio">("desc");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const accent = accentColors[activeRoute];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      {/* Хлебные крошки */}
      <div className="flex items-center gap-2 text-xs font-montserrat mb-8" style={{ color: "#a86e2e" }}>
        <button onClick={onBackToRoutes} className="hover:underline">Маршруты</button>
        <Icon name="ChevronRight" size={12} />
        <button onClick={onBackToPoints} className="hover:underline">{route.title}</button>
        <Icon name="ChevronRight" size={12} />
        <span style={{ color: "#2c1a0e" }}>{point.title}</span>
      </div>

      {/* Заголовок */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <MapDotSVG color={accent} />
          <span className="text-sm font-montserrat" style={{ color: "#a86e2e" }}>{point.subtitle}</span>
        </div>
        <h2 className="font-cormorant text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#2c1a0e" }}>
          {point.title}
        </h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {point.tags.map(tag => (
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
              borderColor: activeTab === tab.id ? accent : "transparent",
              color: activeTab === tab.id ? accent : "#a86e2e",
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
          <div className="p-8 rounded-xl border mb-6" style={{ background: "rgba(253,243,227,0.85)", borderColor: "#e3c07f" }}>
            <p className="font-montserrat text-base leading-8" style={{ color: "#2c1a0e" }}>
              {point.description}
            </p>
          </div>
          {point.artifact && (
            <div className="flex items-center gap-4 p-5 rounded-xl border" style={{ background: "rgba(200,148,26,0.07)", borderColor: "#c8941a" }}>
              <span className="text-3xl">{point.artifact.split(" ")[0]}</span>
              <div>
                <p className="text-xs font-montserrat uppercase tracking-widest mb-1" style={{ color: "#a86e2e" }}>Артефакт маршрута</p>
                <p className="font-cormorant text-lg font-semibold" style={{ color: "#2c1a0e" }}>
                  {point.artifact.substring(point.artifact.indexOf(" ") + 1)}
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
            {[point.image, point.image].map((src, i) => (
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

          {/* Видео-рассказ */}
          <div className="relative rounded-xl border overflow-hidden cursor-pointer group" style={{ background: "#1a0f05", borderColor: "#e3c07f" }}>
            <img src={point.image} alt="" className="w-full h-52 object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border-2 transition-transform group-hover:scale-110"
                style={{ background: "rgba(200,148,26,0.2)", borderColor: "#c8941a" }}
              >
                <Icon name="Play" size={26} style={{ color: "#c8941a" }} />
              </div>
              <p className="font-cormorant text-xl text-white font-semibold">Видео-рассказ</p>
              <p className="text-xs font-montserrat" style={{ color: "#c8941a" }}>«{point.title}»</p>
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
          {point.audioLang.map((lang) => {
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
                    background: isPlaying ? accent : "#f7edd8",
                    color: isPlaying ? "white" : "#a86e2e",
                    border: `1px solid ${isPlaying ? accent : "#e3c07f"}`,
                  }}
                >
                  {isPlaying ? "Пауза" : "Слушать"}
                </button>
              </div>
            );
          })}

          {playingAudio && (
            <div className="mt-4 p-4 rounded-xl border animate-fade-in" style={{ background: "rgba(200,148,26,0.07)", borderColor: "#c8941a" }}>
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
  );
};
