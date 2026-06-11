import { FileText, Globe, File, Loader2, CheckCircle, XCircle } from "lucide-react";

const TYPE_ICON = {
  pdf: FileText,
  url: Globe,
  txt: File,
  docx: FileText,
};

const STATUS_ICON = {
  pending:    <Loader2 size={12} className="text-muted animate-spin" />,
  processing: <Loader2 size={12} className="text-muted animate-spin" />,
  ready:      <CheckCircle size={12} className="text-green-500" />,
  failed:     <XCircle size={12} className="text-red-500" />,
};

export default function SourceItem({ source }) {
  const Icon = TYPE_ICON[source.source_type] || File;

  return (
    <li className="flex items-center gap-2 px-4 py-2 hover:bg-secondary cursor-default">
      <Icon size={14} className="text-muted shrink-0" />
      <span className="text-xs truncate flex-1">{source.filename}</span>
      <span className="shrink-0">{STATUS_ICON[source.status]}</span>
    </li>
  );
}