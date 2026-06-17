"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";
import { Card } from "@/components/ui/Card";
import { MailOpen, Mail, Trash2, Calendar, User, CornerDownRight } from "lucide-react";
import { Contact } from "../types";
import { contactService } from "../services/contact.service";

export function ContactContent() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const [selectedMessageId, setSelectedMessageId] = useState<string | number | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const loadContacts = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const data = await contactService.getContacts();
      setContacts(data);
    } catch (err) {
      console.log(err);
      setError("Failed to load messages");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts(true);
  }, []);

  const handleSelectMessage = async (id: string | number, isRead: boolean) => {
    setSelectedMessageId((prev) => (prev === id ? null : id));
    if (!isRead) {
      try {
        await contactService.markAsRead(String(id));
        toast({
          title: "Marked as Read",
          description: "Message marked as read successfully.",
          variant: "success",
        });
        await loadContacts();
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to mark message as read.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDelete = async (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await contactService.deleteContact(String(id));
        if (selectedMessageId === id) {
          setSelectedMessageId(null);
        }
        toast({
          title: "Message Deleted",
          description: "The message has been permanently deleted.",
          variant: "destructive",
        });
        await loadContacts();
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to delete message.",
          variant: "destructive",
        });
      }
    }
  };

  const filteredContacts = contacts.filter((c) => {
    if (filter === "unread") return !c.read;
    if (filter === "read") return c.read;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-muted-foreground text-sm font-semibold">
        Loading messages...
      </div>
    );
  }
  if (error) {
    return <div className="flex justify-center py-10 text-red-500 font-semibold">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2 border-b border-border pb-4">
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
              className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${filter === type
                  ? "bg-[#E85D04]/10 text-[#E85D04] border-[#E85D04]/30"
                  : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-card"
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
          <div className="py-16 text-center border border-dashed border-border rounded-2xl bg-card">
            <p className="text-muted-foreground text-sm">No messages found.</p>
          </div>
        ) : (
          filteredContacts.map((msg) => {
            const isExpanded = selectedMessageId === (msg._id || msg.id);

            return (
              <Card
                key={msg._id || msg.id}
                onClick={() => handleSelectMessage(msg._id || msg.id || "", msg.read)}
                className={`cursor-pointer transition-all duration-300 border ${isExpanded
                    ? "border-[#E85D04]/30 bg-card"
                    : msg.read
                      ? "border-border bg-card/40 opacity-70 hover:opacity-100"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
              >
                <div className="flex flex-col gap-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3 items-start min-w-0">
                      {/* Read status Icon */}
                      <div className="mt-0.5 flex-shrink-0">
                        {msg.read ? (
                          <MailOpen className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Mail className="h-4 w-4 text-[#E85D04] animate-pulse" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className={`text-sm font-semibold truncate ${msg.read ? "text-muted-foreground" : "text-foreground"}`}>
                            {msg.name}
                          </span>
                          <span className="text-xs text-muted-foreground font-mono">
                            &lt;{msg.email}&gt;
                          </span>
                        </div>
                        <h4 className={`text-xs font-medium mt-1 truncate ${msg.read ? "text-muted-foreground" : "text-foreground"}`}>
                          {msg.subject}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                        <Calendar className="h-3 w-3" />
                        {msg.date || (msg.createdAt ? new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "")}
                      </span>
                      <button
                        onClick={(e) => handleDelete(msg._id || msg.id || "", e)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-border transition-all duration-200 cursor-pointer"
                        title="Delete message"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expandable message details */}
                  {isExpanded && (
                    <div className="border-t border-border pt-4 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="rounded-xl bg-background p-4 border border-border space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-b border-border pb-2">
                          <User className="h-3.5 w-3.5 text-[#E85D04]" />
                          <span>Sender details: <strong>{msg.name}</strong> ({msg.email})</span>
                        </div>
                        <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed font-sans">
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
