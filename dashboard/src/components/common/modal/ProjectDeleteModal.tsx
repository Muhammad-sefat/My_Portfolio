"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface ProjectDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  projectTitle?: string;
  deleting?: boolean;
}

export function ProjectDeleteModal({ isOpen, onClose, onConfirm, projectTitle, deleting }: ProjectDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Are you sure you want to delete the project <span className="font-semibold text-foreground">"{projectTitle}"</span>? This action cannot be undone.
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
            {deleting ? "Deleting..." : "Delete Project"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
