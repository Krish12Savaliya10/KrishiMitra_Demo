import { useState, useRef, useEffect } from "react";
import { X, Send, Leaf, User, Loader2, Image as ImageIcon, Copy, Check, ChevronRight, AlertTriangle, ExternalLink, Square } from "lucide-react";
import { useAppData } from "@/lib/AppDataContext";

// ── Inline markdown formatter (bold/italic/code/links) ────────────────────────
function fmt(t) {
  return t
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, `<strong class="font-semibold text-foreground">$1</strong>`)
    .replace(/\*(.*?)\*/g, `<em class="italic">$1</em>`)
    .replace(/`([^`]+)`/g, `<code class="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[0.82em] text-primary">$1</code>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" class="text-primary underline underline-offset-2" target="_blank" rel="noopener">$1</a>`);
}

// ── Compact markdown renderer (headings, lists, tables, quotes, code) ─────────
function Markdown({ text }) {
  const lines = text.split("\n");
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const block = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { block.push(lines[i]); i++; }
      const raw = block.join("\n");
      // Skip chart / sync payload fences in the compact widget — handled separately.
      if (!lang.startsWith("chart:") && lang !== "json:database-sync" && !(lang === "json" && raw.includes('"cropPlan"'))) {
        out.push(
          <div key={i} className="my-2 overflow-hidden rounded-lg border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-3 py-1.5">
              <span className="font-mono text-[10px] text-muted-foreground">{lang || "code"}</span>
            </div>
            <pre className="overflow-x-auto p-3 text-[11.5px] leading-relaxed text-foreground font-mono"><code>{raw}</code></pre>
          </div>
        );
      }
      i++; continue;
    }

    if (line.includes("|") && i + 1 < lines.length && lines[i + 1].match(/^[\s|:-]+$/)) {
      const rows = [line, lines[i + 1]]; i += 2;
      while (i < lines.length && lines[i].includes("|")) { rows.push(lines[i]); i++; }
      const headers = rows[0].split("|").map(c => c.trim()).filter(Boolean);
      const body = rows.slice(2).map(r => r.split("|").map(c => c.trim()).filter(Boolean));
      out.push(
        <div key={i} className="my-2 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-xs">
            <thead className="bg-surface-2">
              <tr>{headers.map((h, hi) => <th key={hi} className="border-b border-border px-2.5 py-1.5 text-left font-semibold text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="border-b border-border/60 last:border-0">
                  {row.map((cell, ci) => <td key={ci} className="px-2.5 py-1.5 text-foreground/90">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("### "))
      out.push(<h3 key={i} className="mt-3 mb-1 flex items-center gap-1.5 text-[13px] font-semibold text-foreground"><ChevronRight className="h-3 w-3 text-primary shrink-0" /><span dangerouslySetInnerHTML={{ __html: fmt(line.slice(4)) }} /></h3>);
    else if (line.startsWith("## "))
      out.push(<h2 key={i} className="mt-3 mb-1.5 border-b border-border pb-1 text-sm font-bold text-foreground" dangerouslySetInnerHTML={{ __html: fmt(line.slice(3)) }} />);
    else if (line.startsWith("# "))
      out.push(<h1 key={i} className="mt-3 mb-1.5 text-[15px] font-bold text-foreground" dangerouslySetInnerHTML={{ __html: fmt(line.slice(2)) }} />);
    else if (line.startsWith("> "))
      out.push(<blockquote key={i} className="my-2 flex items-start gap-2 border-l-4 border-warning/50 bg-warning/5 py-1.5 pl-2.5 pr-2 rounded-r-lg"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-warning" /><span className="text-xs text-warning-foreground/80 italic" dangerouslySetInnerHTML={{ __html: fmt(line.slice(2)) }} /></blockquote>);
    else if (line.match(/^---+$/))
      out.push(<hr key={i} className="my-2.5 border-border" />);
    else if (line.match(/^[\s]*[-*+] /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[\s]*[-*+] /)) { items.push(lines[i].replace(/^\s*[-*+] /, "")); i++; }
      out.push(<ul key={`ul${i}`} className="my-1.5 space-y-1">{items.map((it, j) => (
        <li key={j} className="flex items-start gap-2">
          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-primary" />
          <span className="text-[13px] leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: fmt(it) }} />
        </li>
      ))}</ul>);
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) { items.push(lines[i].replace(/^\d+\. /, "")); i++; }
      out.push(<ol key={`ol${i}`} className="my-1.5 space-y-1.5 list-none">{items.map((it, j) => (
        <li key={j} className="flex items-start gap-2">
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[9px] font-bold text-primary mt-0.5">{j + 1}</span>
          <span className="text-[13px] leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: fmt(it) }} />
        </li>
      ))}</ol>);
      continue;
    } else if (line.trim() === "")
      out.push(<div key={i} className="h-1.5" />);
    else
      out.push(<p key={i} className="text-[13px] leading-relaxed text-foreground/90" dangerouslySetInnerHTML={{ __html: fmt(line) }} />);

    i++;
  }

  return <div className="space-y-0.5">{out}</div>;
}

function stripSyncBlock(text) {
  const syncRegex = /```(?:json:database-sync|json)\n([\s\S]*?"cropPlan"[\s\S]*?)\n```/;
  const hasPlan = syncRegex.test(text);
  return { text: hasPlan ? text.replace(syncRegex, "").trim() : text, hasPlan };
}

export function ChatWidget({ isOpen, onClose }) {
  const { token } = useAppData();
  const [messages, setMessages] = useState([
    { role: "assistant", id: "welcome", text: "Namaste! I'm AI Mitra, your farming assistant. Ask me about crops, soil, pests, weather, or your farm's schedule." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const endRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", id: `u-${Date.now()}`, text: input };
    const aiMessage = { role: "assistant", text: "", isLoading: true, id: `a-${Date.now()}` };

    setMessages(prev => [...prev, userMessage, aiMessage]);
    setInput("");
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const apiBase = import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api");
      const res = await fetch(`${apiBase}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ message: userMessage.text, sessionId: "session-1" }),
        signal: controller.signal,
      });

      if (res.status === 401) throw new Error("Please log in with a real account to use AI Mitra.");
      if (!res.ok) throw new Error("Connection failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const dataStr = line.slice(6).trim();
          if (dataStr === "[DONE]") {
            setMessages(p => p.map(m => m.id === aiMessage.id ? { ...m, isLoading: false } : m));
            continue;
          }
          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.error) {
              fullText = parsed.error;
              setMessages(p => p.map(m => m.id === aiMessage.id ? { ...m, text: fullText, isLoading: false } : m));
            } else if (parsed.chunk) {
              fullText += parsed.chunk;
              setMessages(p => p.map(m => m.id === aiMessage.id ? { ...m, text: fullText, isLoading: false } : m));
            }
          } catch (e) { /* ignore partial chunk */ }
        }
      }
      setMessages(p => p.map(m => m.id === aiMessage.id ? { ...m, isLoading: false } : m));
    } catch (err) {
      if (err.name === "AbortError") {
        setMessages(p => p.map(m => m.id === aiMessage.id ? { ...m, isLoading: false } : m));
      } else {
        setMessages(prev => prev.map(m => m.id === aiMessage.id ? { ...m, text: err.message, isLoading: false } : m));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInterrupt = () => abortRef.current?.abort();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages(prev => [...prev, { role: "user", id: `u-img-${Date.now()}`, text: `📷 Uploaded image: ${file.name}` }]);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiBase = import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api");
      const res = await fetch(`${apiBase}/disease/predict`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to analyze image");

      const reply = data.success === false || data.data?.fallback
        ? "The disease model is currently unavailable in this environment, so the scanner is running in demo mode. I can still help with general crop advice through chat."
        : `I analyzed the image. The detected crop disease is **${data.data.disease}** with a confidence of ${(data.data.confidence * 100).toFixed(1)}%.`;
      setMessages(prev => [...prev, { role: "assistant", id: `a-img-${Date.now()}`, text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", id: `a-err-${Date.now()}`, text: `Error analyzing image: ${err.message}` }]);
    } finally {
      setIsLoading(false);
      e.target.value = null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex h-[560px] w-80 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:w-96">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface/80 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/25">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" />
          </div>
          <div>
            <p className="font-display text-sm font-bold leading-none text-foreground">AI Mitra</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">KrishiMitra · Llama 3.1</p>
          </div>
        </div>
        <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-background px-3 py-3">
        {messages.map((msg) => {
          const { text, hasPlan } = msg.role === "assistant" ? stripSyncBlock(msg.text || "") : { text: msg.text, hasPlan: false };

          if (msg.role === "user") {
            return (
              <div key={msg.id} className="mb-3 flex justify-end gap-2">
                <div className="max-w-[85%] rounded-2xl rounded-tr bg-primary px-3.5 py-2.5 text-[13px] leading-relaxed text-primary-foreground whitespace-pre-wrap">
                  {text}
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className="group mb-3 flex gap-2.5">
              <div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/25">
                <Leaf className="h-3 w-3 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                {msg.isLoading && !text ? (
                  <div className="flex w-fit items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                ) : (
                  <Markdown text={text} />
                )}

                {hasPlan && (
                  <a href="/ai-saathi" className="mt-2 flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
                    <Leaf className="h-3.5 w-3.5" /> A crop plan was proposed — open AI Saathi to save it
                    <ExternalLink className="ml-auto h-3 w-3" />
                  </a>
                )}

                {!msg.isLoading && text && (
                  <button
                    onClick={() => { navigator.clipboard.writeText(text); setCopiedId(msg.id); setTimeout(() => setCopiedId(null), 1500); }}
                    className="mt-1.5 flex items-center gap-1 rounded px-1.5 py-1 text-[10px] text-muted-foreground opacity-0 transition-opacity hover:bg-surface-2 hover:text-foreground group-hover:opacity-100"
                  >
                    {copiedId === msg.id ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                    {copiedId === msg.id ? "Copied" : "Copy"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="shrink-0 border-t border-border bg-surface/60 p-3 backdrop-blur-md">
        <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 transition-all focus-within:border-primary/50">
          <label className="cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground shrink-0" title="Upload leaf image">
            <ImageIcon className="h-4 w-4" />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isLoading} />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crops, soil, weather..."
            className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-60"
            disabled={isLoading}
          />
          <button
            type={isLoading ? "button" : "submit"}
            onClick={isLoading ? handleInterrupt : undefined}
            disabled={!isLoading && !input.trim()}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all ${isLoading ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : input.trim() ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "bg-surface-2 text-muted-foreground cursor-not-allowed"}`}
          >
            {isLoading ? <Square className="h-3 w-3 fill-current" /> : <Send className="h-3.5 w-3.5" />}
          </button>
        </div>
      </form>
    </div>
  );
}
