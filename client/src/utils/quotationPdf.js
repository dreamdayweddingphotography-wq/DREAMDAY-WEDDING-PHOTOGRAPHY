import html2pdf from 'html2pdf.js';

/**
 * Generates and downloads an A4 PDF from a QuotationDocument element while
 * keeping table rows, totals, and the footer intact across page breaks.
 */
export const downloadQuotationPdf = (element, filename) => {
    const opt = {
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak: {
            mode: ['css', 'legacy'],
            avoid: ['.vq-header', '.vq-info-row', '.vq-table tr', '.vq-total-wrapper', '.vq-footer', '.vq-footer-item']
        }
    };

    return html2pdf().set(opt).from(element).save();
};

