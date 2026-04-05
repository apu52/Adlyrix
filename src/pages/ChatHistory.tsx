import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, ChevronLeft, ChevronRight, Facebook, Globe, Instagram, LoaderCircle, MessageCircle, Send } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { demoLibraryCreatives, demoLibrarySessions } from "@/lib/demoCreativeLibrary";

type PlatformId = "instagram" | "facebook" | "whatsapp" | "website";
type ChatMessage = { id: string; role: "assistant" | "user"; text: string; platformId?: PlatformId; kind?: "creative"; creativeId?: string; };
type ChatSession = { id: string; title: string; createdAtLabel: string; platformId: PlatformId; messages: ChatMessage[]; };

const platformMeta: Record<PlatformId, { label: string; icon: typeof Instagram }> = {
  instagram: { label: "Instagram", icon: Instagram },
  facebook: { label: "Facebook", icon: Facebook },
  whatsapp: { label: "WhatsApp", icon: MessageCircle },
  website: { label: "Website", icon: Globe },
};

const ChatHistory = () => {
  const [searchParams] = useSearchParams();
  const [sessions, setSessions] = useState(demoLibrarySessions);
  const [activeSessionId, setActiveSessionId] = useState(searchParams.get("session") ?? demoLibrarySessions[0]?.id ?? "");
  const [chatInput, setChatInput] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [historyCollapsed, setHistoryCollapsed] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const requestedSessionId = searchParams.get("session");
    if (requestedSessionId) setActiveSessionId(requestedSessionId);
  }, [searchParams]);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId) ?? sessions[0],
    [activeSessionId, sessions],
  );
  const creativeMap = useMemo(
    () => Object.fromEntries(demoLibraryCreatives.map((creative) => [creative.id, creative])),
    [],
  );

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [activeSession?.messages, isReplying]);

  const handleSend = () => {
    const trimmedInput = chatInput.trim();
    if (!trimmedInput || !activeSession || isReplying) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedInput,
      platformId: activeSession.platformId,
    };

    setSessions((current) =>
      current.map((session) =>
        session.id === activeSession.id
          ? { ...session, messages: [...session.messages, userMessage], createdAtLabel: "Just now" }
          : session,
      ),
    );
    setChatInput("");
    setIsReplying(true);

    window.setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: `I picked up this ${platformMeta[activeSession.platformId].label} conversation from where you left it. I'll keep refining this direction and save the new changes in the same thread.`,
        platformId: activeSession.platformId,
      };

      setSessions((current) =>
        current.map((session) =>
          session.id === activeSession.id
            ? { ...session, messages: [...session.messages, assistantMessage], createdAtLabel: "Just now" }
            : session,
        ),
      );
      setIsReplying(false);
    }, 900);
  };

  return (
    <DashboardLayout>
      <div
        className="grid h-full min-h-0 gap-0 overflow-hidden rounded-[2rem] border border-[#2a3446] bg-[linear-gradient(135deg,#091018_0%,#0d1220_45%,#121021_100%)] shadow-[0_24px_80px_hsl(230_30%_4%_/_0.45)] transition-all duration-300 ease-in-out"
        style={{ gridTemplateColumns: historyCollapsed ? "56px minmax(0,1fr)" : "320px minmax(0,1fr)" }}
      >
        <aside className="flex min-h-0 flex-col border-r border-[#31405b] bg-[linear-gradient(180deg,#121722_0%,#171b28_100%)]">
          <div className={`flex items-center justify-between border-b border-[#31405b] bg-[#151b28] transition-all duration-300 ease-in-out ${historyCollapsed ? "px-2 py-3" : "px-5 py-5"}`}>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${historyCollapsed ? "max-w-0 opacity-0" : "max-w-xs opacity-100"}`}>
              <h1 className="text-lg font-semibold text-foreground">Previous Chats</h1>
              <p className="mt-1 text-xs text-muted-foreground">Open any saved conversation and continue chatting from the same thread.</p>
            </div>
            <button
              type="button"
              onClick={() => setHistoryCollapsed((current) => !current)}
              className={`shrink-0 rounded-full border border-[#3a4a68] bg-[#1c2433] text-muted-foreground transition-all hover:bg-[#273247] hover:text-foreground ${historyCollapsed ? "mx-auto h-9 w-9" : "h-9 w-9"}`}
            >
              {historyCollapsed ? <ChevronRight size={14} className="mx-auto" /> : <ChevronLeft size={14} className="mx-auto" />}
            </button>
          </div>
          <div className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${historyCollapsed ? "px-2 py-3" : "px-4 py-4"}`}>
            {historyCollapsed ? (
              <div className="space-y-2">
                {sessions.map((session) => {
                  const Icon = platformMeta[session.platformId].icon;
                  const selected = activeSession?.id === session.id;

                  return (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => setActiveSessionId(session.id)}
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all ${
                        selected ? "border-primary bg-primary/10 text-primary" : "border-[#33415a] bg-[#1a2231] text-muted-foreground hover:border-[#4a5f80] hover:text-foreground"
                      }`}
                      title={session.title}
                    >
                      <Icon size={16} />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => {
                  const Icon = platformMeta[session.platformId].icon;
                  const selected = activeSession?.id === session.id;
                  const lastAssistantMessage = session.messages.filter((message) => message.role === "assistant").slice(-1)[0]?.text;

                  return (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => setActiveSessionId(session.id)}
                      className={`w-full rounded-[1.4rem] border p-4 text-left transition-all ${
                        selected
                          ? "border-primary bg-[linear-gradient(180deg,rgba(86,74,255,0.18)_0%,rgba(86,74,255,0.08)_100%)] shadow-[0_0_0_1px_hsl(var(--primary)/0.18)]"
                          : "border-[#33415a] bg-[#1a2231] hover:border-[#4a5f80] hover:bg-[#202a3d]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Icon size={16} />
                          </div>
                          <span className="text-sm font-semibold text-foreground">{session.title}</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground">{session.createdAtLabel}</span>
                      </div>
                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted-foreground">{lastAssistantMessage}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        <section className="flex min-h-0 flex-col bg-[radial-gradient(circle_at_top,#1b1932_0%,#0d1321_38%,#0a0e16_100%)]">
          <div className="border-b border-[#31405b] bg-[linear-gradient(180deg,#111827_0%,#101521_100%)] px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-primary">Saved Conversation</p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">{activeSession?.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">Switch chats from the left panel anytime and continue from where you stopped.</p>
              </div>
            </div>
          </div>

          <div ref={threadRef} className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
              {(activeSession?.messages ?? []).map((message) => (
                <div key={message.id} className={`${message.role === "user" ? "ml-auto max-w-2xl" : "max-w-4xl"}`}>
                  <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full ${message.role === "assistant" ? "bg-amber-400 text-black" : "bg-primary/20 text-primary"}`}>
                      {message.role === "assistant" ? <Bot size={18} /> : <Send size={18} />}
                    </span>
                    <span className="font-medium text-foreground">{message.role === "assistant" ? "VC Assistant" : "You"}</span>
                  </div>
                  {message.kind === "creative" && message.creativeId && creativeMap[message.creativeId] ? (
                    <div className="overflow-hidden rounded-[2rem] border border-[#31405b] bg-[linear-gradient(180deg,#171e2a_0%,#121926_100%)] shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
                      <div className="border-b border-[#31405b] bg-[#192131] px-5 py-4">
                        <p className="text-sm font-semibold text-foreground">{creativeMap[message.creativeId].title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{creativeMap[message.creativeId].caption}</p>
                      </div>
                      <div className="px-5 py-5">
                        <div className="overflow-hidden rounded-[1.4rem] border border-[#33415a] bg-[#101620]">
                          <img
                            src={creativeMap[message.creativeId].imageUrl}
                            alt={creativeMap[message.creativeId].title}
                            className="max-h-[520px] w-full object-contain bg-[#0f172a]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`rounded-[1.75rem] px-5 py-4 ${message.role === "assistant" ? "border border-[#31405b] bg-[linear-gradient(180deg,#1a2232_0%,#161d2a_100%)] text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.18)]" : "bg-[linear-gradient(180deg,#11c84b_0%,#089d39_100%)] text-white shadow-[0_14px_30px_rgba(8,177,60,0.18)]"}`}>
                      <p className="whitespace-pre-line text-sm leading-8">{message.text}</p>
                    </div>
                  )}
                </div>
              ))}
              {isReplying ? (
                <div className="max-w-4xl">
                  <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-black">
                      <LoaderCircle size={18} className="animate-spin" />
                    </span>
                    <span className="font-medium text-foreground">VC Assistant</span>
                  </div>
                  <div className="rounded-[1.75rem] border border-[#31405b] bg-[linear-gradient(180deg,#1a2232_0%,#161d2a_100%)] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                    <p className="text-sm leading-8 text-foreground">Continuing this saved chat and preparing the next reply.</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="border-t border-[#31405b] bg-[linear-gradient(180deg,#101620_0%,#0d131d_100%)] px-6 py-2">
            <div className="mx-auto w-full max-w-3xl">
              <div className="relative">
                <div className="rounded-full border border-[#3a4a68] bg-[linear-gradient(180deg,#182131_0%,#141b28_100%)] px-4 py-2 pr-16 shadow-[0_14px_40px_rgba(0,0,0,0.22)]">
                  <textarea
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    disabled={isReplying}
                    rows={1}
                    placeholder="Continue this saved conversation from where you left off."
                    className="max-h-24 w-full resize-none bg-transparent py-1 text-sm leading-6 text-foreground outline-none placeholder:text-muted-foreground/65"
                  />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={isReplying || !chatInput.trim()}
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                      isReplying || !chatInput.trim()
                        ? "cursor-not-allowed bg-secondary text-muted-foreground"
                        : "bg-[linear-gradient(180deg,#11c84b_0%,#089d39_100%)] text-white shadow-[0_14px_30px_rgba(8,177,60,0.18)] hover:brightness-110"
                    }`}
                    title="Send"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default ChatHistory;
