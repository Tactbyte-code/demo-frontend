import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { SummaryPdf } from "./SummaryPdf";
import { File } from "lucide-react";

export function SummaryExport({ data }) {
    return (
        <>
            {data && (
                <PDFDownloadLink
                    document={<SummaryPdf data={data} />}
                    fileName="summary.pdf"
                >
                    {({ loading }) => (
                        <Button
                            size="sm"
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5
                        bg-info-bg text-foreground
                        border border-primary/20 opacity-80"
                        >
                            <File className="w-3.5 h-3.5 shrink-0" />
                            {loading ? "Preparing..." : "Download PDF"}
                        </Button>
                    )}
                </PDFDownloadLink>
            )}
        </>
    );
}
