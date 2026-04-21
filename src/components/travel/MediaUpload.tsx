import { useRef, useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

const UPLOAD_URL = "https://functions.poehali.dev/3ca78579-6096-42c0-a6be-cd84f600e5f4";

const ACCEPT_IMAGE = "image/jpeg,image/png,image/webp,image/gif";
const ACCEPT_VIDEO = "video/mp4,video/webm,video/quicktime";

export interface UserMedia {
  url: string;
  type: "photo" | "video";
}

interface Props {
  pointId: string;
  accent: string;
  onUploaded: (media: UserMedia) => void;
  onClose: () => void;
}

type Tab = "photo" | "video";
type UploadState = "idle" | "uploading" | "success" | "error";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const MediaUpload = ({ pointId, accent, onUploaded, onClose }: Props) => {
  const [tab, setTab] = useState<Tab>("photo");
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = tab === "photo" ? ACCEPT_IMAGE : ACCEPT_VIDEO;
  const maxMB = tab === "photo" ? 15 : 150;

  const reset = () => {
    setFile(null);
    setPreview(null);
    setState("idle");
    setErrorMsg("");
  };

  const handleFile = useCallback(async (f: File) => {
    const allowed = tab === "photo"
      ? ["image/jpeg", "image/png", "image/webp", "image/gif"]
      : ["video/mp4", "video/webm", "video/quicktime"];

    if (!allowed.includes(f.type)) {
      setErrorMsg(`Неподдерживаемый формат. Можно: ${tab === "photo" ? "JPG, PNG, WEBP, GIF" : "MP4, WEBM, MOV"}`);
      setState("error");
      return;
    }
    if (f.size > maxMB * 1024 * 1024) {
      setErrorMsg(`Файл слишком большой. Максимум ${maxMB} МБ.`);
      setState("error");
      return;
    }

    setFile(f);
    setState("idle");
    setErrorMsg("");

    if (f.type.startsWith("image/")) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }, [tab, maxMB]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    e.target.value = "";
  };

  const upload = async () => {
    if (!file) return;
    setState("uploading");
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64, mimeType: file.type, pointId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка загрузки");
      setState("success");
      onUploaded({ url: data.url, type: data.type });
    } catch (e: unknown) {
      setState("error");
      setErrorMsg(e instanceof Error ? e.message : "Не удалось загрузить файл");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#fdf3e3", border: "1.5px solid #e3c07f" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between px-6 py-4" style={{ background: "#f7edd8", borderBottom: "1px solid #e3c07f" }}>
          <div className="flex items-center gap-2">
            <Icon name="Upload" size={18} style={{ color: accent }} />
            <span className="font-cormorant text-lg font-semibold" style={{ color: "#2c1a0e" }}>
              Добавить свои материалы
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-amber-100 transition-colors">
            <Icon name="X" size={18} style={{ color: "#a86e2e" }} />
          </button>
        </div>

        <div className="p-5">
          {/* Переключатель фото/видео */}
          <div className="flex rounded-xl overflow-hidden border mb-5" style={{ borderColor: "#e3c07f" }}>
            {(["photo", "video"] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); reset(); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-montserrat transition-all"
                style={{
                  background: tab === t ? accent : "transparent",
                  color: tab === t ? "white" : "#a86e2e",
                  fontWeight: tab === t ? "600" : "400",
                }}
              >
                <Icon name={t === "photo" ? "Image" : "Video"} size={15} />
                {t === "photo" ? "Фотография" : "Видео"}
              </button>
            ))}
          </div>

          {/* Зона дропа */}
          {!file ? (
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className="relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-all py-10"
              style={{
                borderColor: dragging ? accent : "#d4a96a",
                background: dragging ? `${accent}10` : "rgba(253,243,227,0.5)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1.5px solid ${accent}50` }}
              >
                <Icon name={tab === "photo" ? "ImagePlus" : "FileVideo"} size={24} style={{ color: accent }} />
              </div>
              <div className="text-center">
                <p className="font-montserrat text-sm font-medium mb-1" style={{ color: "#2c1a0e" }}>
                  {dragging ? "Отпустите файл" : "Перетащите или нажмите для выбора"}
                </p>
                <p className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>
                  {tab === "photo" ? "JPG, PNG, WEBP, GIF · до 15 МБ" : "MP4, WEBM, MOV · до 150 МБ"}
                </p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleInput}
              />
            </div>
          ) : (
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "#e3c07f" }}>
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="" className="w-full h-48 object-cover" />
                  <button
                    onClick={reset}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(44,26,14,0.65)" }}
                  >
                    <Icon name="X" size={14} style={{ color: "white" }} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4" style={{ background: "#f7edd8" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accent}20`, border: `1px solid ${accent}40` }}>
                    <Icon name="FileVideo" size={18} style={{ color: accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-montserrat text-sm font-medium truncate" style={{ color: "#2c1a0e" }}>{file.name}</p>
                    <p className="text-xs font-montserrat" style={{ color: "#a86e2e" }}>
                      {(file.size / (1024 * 1024)).toFixed(1)} МБ
                    </p>
                  </div>
                  <button onClick={reset}>
                    <Icon name="X" size={16} style={{ color: "#a86e2e" }} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Ошибка */}
          {state === "error" && (
            <div className="mt-3 flex items-start gap-2 p-3 rounded-lg" style={{ background: "rgba(159,18,57,0.07)", border: "1px solid rgba(159,18,57,0.3)" }}>
              <Icon name="AlertCircle" size={15} style={{ color: "#9f1239", flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs font-montserrat" style={{ color: "#9f1239" }}>{errorMsg}</p>
            </div>
          )}

          {/* Успех */}
          {state === "success" && (
            <div className="mt-3 flex items-center gap-2 p-3 rounded-lg" style={{ background: "rgba(6,95,70,0.07)", border: "1px solid rgba(6,95,70,0.3)" }}>
              <Icon name="CheckCircle" size={15} style={{ color: "#065f46" }} />
              <p className="text-xs font-montserrat font-medium" style={{ color: "#065f46" }}>Файл успешно добавлен!</p>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-montserrat text-sm transition-all"
              style={{ background: "#f0e0c0", color: "#6b4a30", border: "1px solid #d4a96a" }}
            >
              {state === "success" ? "Закрыть" : "Отмена"}
            </button>
            {state !== "success" && (
              <button
                onClick={upload}
                disabled={!file || state === "uploading"}
                className="flex-2 flex-grow flex items-center justify-center gap-2 py-3 rounded-xl font-montserrat text-sm font-medium transition-all"
                style={{
                  background: !file || state === "uploading" ? "#d4b896" : accent,
                  color: "white",
                  cursor: !file || state === "uploading" ? "not-allowed" : "pointer",
                }}
              >
                {state === "uploading" ? (
                  <>
                    <Icon name="Loader" size={15} style={{ animation: "spin 1s linear infinite" }} />
                    Загружаю...
                  </>
                ) : (
                  <>
                    <Icon name="Upload" size={15} />
                    Загрузить
                  </>
                )}
              </button>
            )}
          </div>

          <p className="mt-4 text-center text-xs font-montserrat" style={{ color: "#b8905a" }}>
            Добавляя материалы, вы соглашаетесь с правилами публикации
          </p>
        </div>
      </div>
    </div>
  );
};
