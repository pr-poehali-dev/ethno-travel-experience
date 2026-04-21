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
  isFavorite: boolean;
  isVisited: boolean;
  onToggleFavorite: () => void;
  onMarkVisited: () => void;
}

const QuizTab = ({ point, accent }: { point: RoutePoint; accent: string }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = point.quiz[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < point.quiz.length) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / point.quiz.length) * 100);
    return (
      <div className="animate-fade-in text-center py-8">
        <div className="text-5xl mb-4">{pct === 100 ? "🏆" : pct >= 66 ? "⭐" : "📖"}</div>
        <p className="font-cormorant text-3xl font-bold mb-2" style={{ color: "#2c1a0e" }}>
          {score} из {point.quiz.length} правильно
        </p>
        <p className="font-montserrat text-sm mb-6" style={{ color: "#6b4a30" }}>
          {pct === 100 ? "Превосходно! Вы настоящий знаток!" : pct >= 66 ? "Хороший результат, продолжайте!" : "Пройдите ещё раз — знания придут!"}
        </p>
        <button
          onClick={handleRestart}
          className="font-montserrat text-sm px-6 py-2.5 rounded-full transition-all"
          style={{ background: accent, color: "white", border: `1px solid ${accent}` }}
        >
          Пройти снова
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>
          Вопрос {current + 1} из {point.quiz.length}
        </p>
        <div className="flex gap-1">
          {point.quiz.map((_, i) => (
            <div
              key={i}
              className="w-6 h-1.5 rounded-full transition-all"
              style={{ background: i < current ? accent : i === current ? accent : "#e3c07f", opacity: i < current ? 0.5 : 1 }}
            />
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl border mb-4" style={{ background: "rgba(253,243,227,0.85)", borderColor: "#e3c07f" }}>
        <p className="font-cormorant text-xl font-semibold leading-snug" style={{ color: "#2c1a0e" }}>{q.question}</p>
      </div>

      <div className="space-y-2 mb-5">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correct;
          const isSelected = idx === selected;
          const revealed = selected !== null;

          let bg = "rgba(253,243,227,0.85)";
          let border = "#e3c07f";
          let color = "#2c1a0e";

          if (revealed && isCorrect) { bg = "rgba(6,95,70,0.1)"; border = "#065f46"; color = "#065f46"; }
          else if (revealed && isSelected && !isCorrect) { bg = "rgba(159,18,57,0.08)"; border = "#9f1239"; color = "#9f1239"; }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
              className="w-full text-left p-4 rounded-xl border transition-all font-montserrat text-sm flex items-center gap-3"
              style={{ background: bg, borderColor: border, color }}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: revealed && isCorrect ? "#065f46" : revealed && isSelected && !isCorrect ? "#9f1239" : "#e3c07f", color: (revealed && (isCorrect || (isSelected && !isCorrect))) ? "white" : "#a86e2e" }}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
              {revealed && isCorrect && <Icon name="Check" size={14} style={{ color: "#065f46", marginLeft: "auto" }} />}
              {revealed && isSelected && !isCorrect && <Icon name="X" size={14} style={{ color: "#9f1239", marginLeft: "auto" }} />}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl font-montserrat text-sm font-medium transition-all animate-fade-in"
          style={{ background: accent, color: "white" }}
        >
          {current + 1 < point.quiz.length ? "Следующий вопрос →" : "Завершить викторину"}
        </button>
      )}
    </div>
  );
};

export const RoutePointDetail = ({
  point,
  route,
  activeRoute,
  onBackToRoutes,
  onBackToPoints,
  setLightboxImg,
  isFavorite,
  isVisited,
  onToggleFavorite,
  onMarkVisited,
}: RoutePointDetailProps) => {
  const [activeTab, setActiveTab] = useState<"desc" | "media" | "audio" | "quiz">("desc");
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const accent = accentColors[activeRoute];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      {/* Хлебные крошки */}
      <div className="flex items-center gap-2 text-xs font-montserrat mb-6" style={{ color: "#a86e2e" }}>
        <button onClick={onBackToRoutes} className="hover:underline">Маршруты</button>
        <Icon name="ChevronRight" size={12} />
        <button onClick={onBackToPoints} className="hover:underline">{route.title}</button>
        <Icon name="ChevronRight" size={12} />
        <span style={{ color: "#2c1a0e" }}>{point.title}</span>
      </div>

      {/* Заголовок + действия */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MapDotSVG color={accent} />
              <span className="text-sm font-montserrat" style={{ color: "#a86e2e" }}>{point.subtitle}</span>
            </div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#2c1a0e" }}>
              {point.title}
            </h2>
          </div>
          <div className="flex gap-2 flex-shrink-0 pt-1">
            {/* Избранное */}
            <button
              onClick={onToggleFavorite}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: isFavorite ? "#9f1239" : "#f7edd8",
                border: `1px solid ${isFavorite ? "#9f1239" : "#e3c07f"}`,
              }}
              title={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
            >
              <Icon name="Heart" size={16} style={{ color: isFavorite ? "white" : "#a86e2e" }} />
            </button>
            {/* Посещено */}
            <button
              onClick={onMarkVisited}
              className="flex items-center gap-1.5 px-3 h-10 rounded-full text-xs font-montserrat transition-all"
              style={{
                background: isVisited ? "#065f46" : "#f7edd8",
                border: `1px solid ${isVisited ? "#065f46" : "#e3c07f"}`,
                color: isVisited ? "white" : "#a86e2e",
              }}
            >
              <Icon name={isVisited ? "CheckCircle" : "Circle"} size={13} />
              {isVisited ? "Посещено" : "Отметить"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {point.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full font-montserrat" style={{ background: "#f7edd8", color: "#a86e2e", border: "1px solid #e3c07f" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Вкладки */}
      <div className="flex gap-0 mb-6 border-b-2 overflow-x-auto" style={{ borderColor: "#e3c07f" }}>
        {[
          { id: "desc", label: "Описание", icon: "BookOpen" },
          { id: "media", label: "Фото и видео", icon: "Image" },
          { id: "audio", label: "Аудиогид", icon: "Headphones" },
          { id: "quiz", label: "Викторина", icon: "HelpCircle" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "desc" | "media" | "audio" | "quiz")}
            className="flex items-center gap-2 px-4 py-3 text-sm font-montserrat transition-all border-b-2 -mb-0.5 whitespace-nowrap"
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

      {/* Вкладка: Фото и видео */}
      {activeTab === "media" && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-2 gap-4 mb-4">
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
                <div className="absolute bottom-2 left-2 text-xs font-montserrat px-2 py-0.5 rounded" style={{ background: "rgba(44,26,14,0.6)", color: "white" }}>
                  Фото {i + 1}
                </div>
              </button>
            ))}
          </div>

          {/* Панорама 360° заглушка */}
          <div className="mb-4 p-4 rounded-xl border flex items-center gap-3" style={{ background: "rgba(253,243,227,0.7)", borderColor: "#e3c07f" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#f7edd8", border: "1px solid #c8941a" }}>
              <Icon name="Globe" size={18} style={{ color: "#c8941a" }} />
            </div>
            <div>
              <p className="font-montserrat text-sm font-medium" style={{ color: "#2c1a0e" }}>Панорамный снимок 360°</p>
              <p className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>Загрузка панорамы...</p>
            </div>
            <span className="ml-auto text-xs font-montserrat px-3 py-1 rounded-full" style={{ background: "#e3c07f", color: "#6b4a30" }}>Скоро</span>
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

      {/* Вкладка: Аудиогид */}
      {activeTab === "audio" && (
        <div className="animate-fade-in space-y-3">
          <p className="text-sm font-montserrat mb-5" style={{ color: "#6b4a30" }}>
            Аудиогид с народной музыкой на фоне. Выберите язык:
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
                    <p className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>~12 минут · с народной музыкой</p>
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
                <Icon name="Music" size={16} style={{ color: "#c8941a" }} />
                <span className="text-sm font-montserrat" style={{ color: "#6b4a30" }}>Воспроизводится: {playingAudio}</span>
              </div>
              <div className="w-full rounded-full h-1.5" style={{ background: "#e3c07f" }}>
                <div className="h-1.5 rounded-full" style={{ width: "35%", background: "#c8941a" }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>4:12</span>
                <span className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>12:00</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Вкладка: Викторина */}
      {activeTab === "quiz" && (
        <QuizTab point={point} accent={accent} />
      )}
    </div>
  );
};
