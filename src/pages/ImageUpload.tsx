import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  FileImage,
  FileText,
  Image as ImageIcon,
  Upload,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

type UploadAsset = {
  id: string;
  file: File;
  name: string;
  sizeLabel: string;
  previewUrl?: string;
  previewType: "image" | "pdf" | "unsupported";
};

const ACCEPTED_FILE_TYPES = "image/png,image/jpeg,image/webp,image/jpg,application/pdf";
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const buildAsset = (file: File): UploadAsset => {
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";

  return {
    id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
    file,
    name: file.name,
    sizeLabel: formatFileSize(file.size),
    previewUrl: isImage || isPdf ? URL.createObjectURL(file) : undefined,
    previewType: isImage ? "image" : isPdf ? "pdf" : "unsupported",
  };
};

const ImageUpload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const assetsRef = useRef<UploadAsset[]>([]);
  const selectedPlatforms = (location.state as { selectedPlatforms?: string[] } | null)?.selectedPlatforms ?? [];
  const [assets, setAssets] = useState<UploadAsset[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);

  useEffect(() => {
    return () => {
      assetsRef.current.forEach((asset) => {
        if (asset.previewUrl) {
          URL.revokeObjectURL(asset.previewUrl);
        }
      });
    };
  }, []);

  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId) ?? assets[0] ?? null;

  const addFiles = (incomingFiles: FileList | File[]) => {
    const fileList = Array.from(incomingFiles);
    const acceptedFiles = fileList.filter(
      (file) =>
        (file.type.startsWith("image/") || file.type === "application/pdf") && file.size <= MAX_FILE_SIZE_BYTES,
    );
    const rejectedCount = fileList.length - acceptedFiles.length;
    const nextAssets = acceptedFiles.map(buildAsset);

    if (nextAssets.length === 0) {
      setUploadMessage("Please choose JPG, PNG, WEBP, or PDF files smaller than 10MB.");
      return;
    }

    setUploadMessage(
      rejectedCount > 0
        ? `${rejectedCount} file${rejectedCount > 1 ? "s were" : " was"} skipped because only JPG, PNG, WEBP, and PDF files up to 10MB are allowed.`
        : "",
    );

    setAssets((current) => {
      const existingKeys = new Set(current.map((asset) => `${asset.name}-${asset.file.lastModified}-${asset.file.size}`));
      const uniqueAssets = nextAssets.filter(
        (asset) => !existingKeys.has(`${asset.name}-${asset.file.lastModified}-${asset.file.size}`),
      );

      if (current.length === 0 && uniqueAssets.length > 0) {
        setSelectedAssetId(uniqueAssets[0].id);
      }

      return [...current, ...uniqueAssets];
    });
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const removeAsset = (assetId: string) => {
    setAssets((current) => {
      const assetToRemove = current.find((asset) => asset.id === assetId);

      if (assetToRemove?.previewUrl) {
        URL.revokeObjectURL(assetToRemove.previewUrl);
      }

      const nextAssets = current.filter((asset) => asset.id !== assetId);

      if (selectedAssetId === assetId) {
        setSelectedAssetId(nextAssets[0]?.id ?? null);
      }

      return nextAssets;
    });
  };

  const handleContinue = () => {
    if (assets.length === 0) {
      return;
    }

    navigate("/ad-form", {
      state: {
        selectedPlatforms,
        uploadedAssets: assets.map((asset) => ({
          id: asset.id,
          name: asset.name,
          previewType: asset.previewType,
        })),
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">Step 2 of 4</p>
          <h1 className="text-3xl font-bold text-foreground">Upload Your Creative Assets</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Add the images or PDF documents you want us to use. The uploaded file list and preview panel now work with real files instead of demo placeholders.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="glass p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Browse Or Drag Files</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Supported formats: JPG, PNG, WEBP and PDF up to 10MB each.
                </p>
              </div>
              <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
                {assets.length} uploaded
              </span>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_FILE_TYPES}
              multiple
              className="hidden"
              onChange={(event) => {
                if (event.target.files) {
                  addFiles(event.target.files);
                }

                event.target.value = "";
              }}
            />

            <div
              role="button"
              tabIndex={0}
              onClick={openFilePicker}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openFilePicker();
                }
              }}
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setIsDragging(false);
              }}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);
                addFiles(event.dataTransfer.files);
              }}
              className={`rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                isDragging
                  ? "border-primary bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]"
                  : "border-border bg-secondary/20 hover:border-primary/50 hover:bg-secondary/35"
              }`}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Upload size={28} />
              </div>
              <p className="text-lg font-semibold text-foreground">Drop files here or browse from your device</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Click anywhere in this box or use the button below to choose files.
              </p>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openFilePicker();
                }}
                className="mt-5 rounded-xl border border-border bg-secondary/70 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary"
              >
                Browse Files
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { title: "No preset files", text: "The page now starts empty until you upload your own assets." },
                { title: "Working previews", text: "Image thumbnails and PDF previews update instantly after upload." },
                { title: "Multi-file support", text: "Add files from drag and drop or with the browse button anytime." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-secondary/30 p-4">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            {uploadMessage && <p className="mt-4 text-sm text-amber-300">{uploadMessage}</p>}
          </div>

          <div className="glass p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Uploaded Assets</h2>
                <p className="mt-1 text-sm text-muted-foreground">Select a file to preview it on the right.</p>
              </div>
              {assets.length > 0 && (
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="rounded-xl border border-border px-4 py-2 text-sm text-foreground transition-all hover:bg-secondary"
                >
                  Add More
                </button>
              )}
            </div>

            {assets.length === 0 ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center rounded-2xl border border-border bg-secondary/20 px-6 text-center">
                <ImageIcon size={34} className="text-muted-foreground" />
                <p className="mt-4 text-base font-semibold text-foreground">No files uploaded yet</p>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Once you upload images or PDFs, they will appear here with remove actions and preview support.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {assets.map((asset, index) => {
                    const isActive = selectedAsset?.id === asset.id;

                    return (
                      <motion.div
                        key={asset.id}
                        whileTap={{ scale: 0.98 }}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedAssetId(asset.id)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedAssetId(asset.id);
                          }
                        }}
                        className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-all ${
                          isActive
                            ? "border-primary bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary)/0.2)]"
                            : "border-border bg-secondary/25 hover:border-primary/40"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeAsset(asset.id);
                          }}
                          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-all hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X size={14} />
                        </button>

                        <div className="mb-3 overflow-hidden rounded-xl bg-card">
                          {asset.previewType === "image" && asset.previewUrl ? (
                            <img src={asset.previewUrl} alt={asset.name} className="h-32 w-full object-cover" />
                          ) : (
                            <div className="flex h-32 items-center justify-center bg-secondary/70">
                              <FileText size={32} className="text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="pr-10">
                          <div className="mb-1 flex items-center gap-2">
                            {asset.previewType === "image" ? (
                              <FileImage size={14} className="text-primary" />
                            ) : (
                              <FileText size={14} className="text-primary" />
                            )}
                            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                              {index === 0 ? "Primary" : asset.previewType}
                            </span>
                          </div>
                          <p className="truncate text-sm font-medium text-foreground">{asset.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{asset.sizeLabel}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {selectedAsset && (
                  <div className="rounded-2xl border border-border bg-secondary/20 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Preview</p>
                        <p className="text-xs text-muted-foreground">{selectedAsset.name}</p>
                      </div>
                      <span className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {selectedAsset.previewType}
                      </span>
                    </div>

                    {selectedAsset.previewType === "image" && selectedAsset.previewUrl && (
                      <div className="overflow-hidden rounded-2xl border border-border bg-card">
                        <img
                          src={selectedAsset.previewUrl}
                          alt={selectedAsset.name}
                          className="max-h-[380px] w-full object-contain bg-black/20"
                        />
                      </div>
                    )}

                    {selectedAsset.previewType === "pdf" && selectedAsset.previewUrl && (
                      <iframe
                        title={selectedAsset.name}
                        src={selectedAsset.previewUrl}
                        className="h-[380px] w-full rounded-2xl border border-border bg-card"
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <Link
            to="/create-ad"
            className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-secondary"
          >
            <ArrowLeft size={14} /> Back
          </Link>
          <button
            type="button"
            disabled={assets.length === 0}
            onClick={handleContinue}
            className={`flex items-center gap-1.5 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
              assets.length === 0
                ? "cursor-not-allowed bg-secondary text-muted-foreground"
                : "btn-gradient text-primary-foreground"
            }`}
          >
            Continue <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ImageUpload;
