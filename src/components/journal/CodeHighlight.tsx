"use client";

import { useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

// Dracula Pro theme - enhanced version of the standard Dracula theme
const draculaPro = {
  ...dracula,
  types: {
    ...dracula.types,
    // Enhanced colors for better readability
    keyword: { color: "#ff79c6", fontWeight: "bold" },
    builtin: { color: "#8be9fd", fontWeight: "bold" },
    function: { color: "#50fa7b" },
    string: { color: "#f1fa8c" },
    number: { color: "#bd93f9" },
    comment: { color: "#6272a4", fontStyle: "italic" },
    operator: { color: "#ff79c6" },
    punctuation: { color: "#f8f8f2" },
    className: { color: "#50fa7b", fontWeight: "bold" },
    tag: { color: "#ff79c6" },
    attrName: { color: "#50fa7b" },
    attrValue: { color: "#f1fa8c" },
    regex: { color: "#ffb86c" },
    variable: { color: "#8be9fd" },
    constant: { color: "#bd93f9" },
    symbol: { color: "#f1fa8c" },
    deleted: { color: "#ff5555", backgroundColor: "#ff555533" },
    inserted: { color: "#50fa7b", backgroundColor: "#50fa7b33" },
    changed: { color: "#ffb86c", backgroundColor: "#ffb86c33" },
  },
};

interface CodeHighlightProps {
  children: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  title?: string;
  copyable?: boolean;
}

export function CodeHighlight({
  children,
  language = "typescript",
  filename,
  highlightLines = [],
  showLineNumbers = true,
  title,
  copyable = true,
}: CodeHighlightProps) {
  const code = useMemo(() => children.trim(), [children]);
  const highlightSet = useMemo(() => new Set(highlightLines), [highlightLines]);

  // Custom line renderer to support line highlighting
  const lineProps = (lineNumber: number) => {
    const isHighlighted = highlightSet.has(lineNumber);
    return {
      className: isHighlighted ? "highlighted-line" : "",
      style: isHighlighted
        ? { backgroundColor: "rgba(255, 121, 198, 0.1)", borderLeft: "3px solid #ff79c6" }
        : {},
    };
  };

  return (
    <div className="code-block relative group rounded-xl overflow-hidden border border-border-subtle bg-void-950/80 backdrop-blur-sm">
      {(title || filename) && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-void-900 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="font-ui text-step--1 text-pallor-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blood-400" />
                <span className="font-mono text-step--1">{filename}</span>
              </span>
            )}
            {title && (
              <span className="font-ui text-step--1 text-pallor-400 italic">{title}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {language && (
              <span className="font-mono text-step--2 text-pallor-400 uppercase tracking-wider">
                {language}
              </span>
            )}
            {copyable && (
              <CopyButton code={code} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={draculaPro}
          code={code}
          lineProps={showLineNumbers ? lineProps : undefined}
          showLineNumbers={showLineNumbers}
          wrapLongLines={true}
          customStyle={{
            margin: 0,
            padding: showLineNumbers ? "1rem 0" : "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.7",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            tabSize: 2,
          }}
          PreTag="div"
        />
      </div>

      <style jsx>{`
        .code-block .highlighted-line {
          background-color: rgba(255, 121, 198, 0.1);
          border-left: 3px solid #ff79c6;
        }
        .code-block .line-number {
          color: #6272a4;
          padding: 0 1rem;
          user-select: none;
          text-align: right;
          min-width: 2.5rem;
          display: inline-block;
        }
        .code-block .line-number::before {
          content: attr(data-line);
        }
      `}</style>
    </div>
  );
}

interface CopyButtonProps {
  code: string;
  className?: string;
}

function CopyButton({ code, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-lg text-pallor-400 hover:text-pallor-100 hover:bg-void-800 transition-colors ${className}`}
      aria-label={copied ? "Copied to clipboard" : "Copy code"}
      title={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <svg className="w-4 h-4 text-wine-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      )}
    </button>
  );
}

import { useState } from "react";