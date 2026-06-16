"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface BlogDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  blogTitle?: string;
  deleting?: boolean;
}

export function BlogDeleteModal({ isOpen, onClose, onConfirm, blogTitle, deleting }: BlogDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Are you sure you want to delete the blog article <span className="font-semibold text-foreground">"{blogTitle}"</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            disabled={deleting}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={deleting}
            onClick={onConfirm}
            className="flex gap-2 items-center cursor-pointer"
          >
            {deleting ? "Deleting..." : "Delete Post"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
