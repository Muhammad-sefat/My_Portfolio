"use client";

import React, { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { useToast } from "@/components/ui/Toast";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MailOpen, Mail, Trash2, Calendar, User, CornerDownRight } from "lucide-react";

export function ContactContent() {
  const { contacts, deleteContact, markContactAsRead } = useDashboard();
  const { toast } = useToast();

  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const handleSelectMessage = (id: number) => {
    setSelectedMessageId((prev) => (prev === id ? null : id));
    markContactAsRead(id);
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling the message expand
    if (confirm("Are you sure you want to delete this message?")) {
      deleteContact(id);
      if (selectedMessageId === id) {
        setSelectedMessageId(null);
      }
      toast({
        title: "Message Deleted",
        description: "The message has been permanently deleted.",
        variant: "destructive",
      });
    }
  };

  const filteredContacts = contacts.filter((c) => {
    if (filter === "unread") return !c.read;
    if (filter === "read") return c.read;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2 border-b border-neutral-900 pb-4">
        {(["all", "unread", "read"] as const).map((type) => {
          const count =
            type === "all"
              ? contacts.length
              : type === "unread"
              ? contacts.filter((c) => !c.read).length
              : contacts.filter((c) => c.read).length;

          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                filter === type
                  ? "bg-[#E85D04]/10 text-[#E85D04] border-[#E85D04]/30"
                  : "bg-[#0d0d0e] text-neutral-400 border-neutral-900 hover:text-white hover:bg-neutral-900"
              }`}
            >
              {type} ({count})
            </button>
          );
        })}
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredContacts.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-neutral-900 rounded-2xl bg-[#0d0d0e]">
            <p className="text-neutral-500 text-sm">No messages found.</p>
          </div>
        ) : (
          filteredContacts.map((msg) => {
            const isExpanded = selectedMessageId === msg.id;

            return (
              <Card
                key={msg.id}
                onClick={() => handleSelectMessage(msg.id)}
                className={`cursor-pointer transition-all duration-300 border ${
                  isExpanded
                    ? "border-[#E85D04]/30 bg-[#0d0d0e]"
                    : msg.read
                    ? "border-neutral-900/60 bg-[#070708]/40 opacity-70 hover:opacity-100"
                    : "border-neutral-900 bg-[#0d0d0e]/80 hover:border-neutral-800"
                }`}
              >
                <div className="flex flex-col gap-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3 items-start min-w-0">
                      {/* Read status Icon */}
                      <div className="mt-0.5 flex-shrink-0">
                        {msg.read ? (
                          <MailOpen className="h-4 w-4 text-neutral-500" />
                        ) : (
                          <Mail className="h-4 w-4 text-[#E85D04] animate-pulse" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className={`text-sm font-semibold truncate ${msg.read ? "text-neutral-400" : "text-white"}`}>
                            {msg.name}
                          </span>
                          <span className="text-xs text-neutral-500 font-mono">
                            &lt;{msg.email}&gt;
                          </span>
                        </div>
                        <h4 className={`text-xs font-medium mt-1 truncate ${msg.read ? "text-neutral-400" : "text-white"}`}>
                          {msg.subject}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="flex items-center gap-1 text-[10px] text-neutral-500 font-medium">
                        <Calendar className="h-3 w-3" />
                        {msg.date}
                      </span>
                      <button
                        onClick={(e) => handleDelete(msg.id, e)}
                        className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/20 transition-all duration-200"
                        title="Delete message"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expandable message details */}
                  {isExpanded && (
                    <div className="border-t border-neutral-900/80 pt-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-900/60 space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400 border-b border-neutral-900/40 pb-2">
                          <User className="h-3.5 w-3.5 text-[#E85D04]" />
                          <span>Sender details: <strong>{msg.name}</strong> ({msg.email})</span>
                        </div>
                        <p className="text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed font-sans">
                          {msg.message}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#E85D04]/10 hover:bg-[#E85D04]/20 border border-[#E85D04]/30 px-4 py-2 text-xs font-semibold text-[#E85D04] transition-all duration-200"
                        >
                          <CornerDownRight className="h-3.5 w-3.5" />
                          Reply via Email
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
