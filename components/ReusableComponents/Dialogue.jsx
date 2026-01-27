import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

const Dialogue = ({ header, open, onOpenChange, children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="text-xl font-semibold">{header}</DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Dialogue;
