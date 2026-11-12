import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { Printer, Download, ArrowLeft } from 'lucide-react';
import QuotationDocument from './QuotationDocument';
import { downloadQuotationPdf } from '../../utils/quotationPdf';
import './ViewQuotation.css';

const ViewQuotation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quotation, setQuotation] = useState(null);
    const [loading, setLoading] = useState(true);
    const printRef = useRef();
    const pdfRef = useRef();

    useEffect(() => {
        const fetchQuotation = async () => {
            try {
                const res = await axios.get(`/api/quotations/${id}`);
                setQuotation(res.data.data);
            } catch (error) {
                console.error("Error fetching quotation:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuotation();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        downloadQuotationPdf(pdfRef.current || printRef.current, `Quotation_${id}.pdf`);
    };

    if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Loading Quotation...</div>;
    if (!quotation) return <div style={{padding: '50px', textAlign: 'center'}}>Quotation Not Found</div>;

    return (
        <div className="vq-page">
            <div className="vq-actions">
                <button className="vq-btn vq-btn-back" onClick={() => navigate('/admin')}>
                    <ArrowLeft size={16} /> Back
                </button>
                <button className="vq-btn vq-btn-print" onClick={handlePrint}>
                    <Printer size={16} /> Print
                </button>
                <button className="vq-btn vq-btn-download" onClick={handleDownload}>
                    <Download size={16} /> Download PDF
                </button>
            </div>
            <QuotationDocument quotation={quotation} printRef={printRef} />
            <div style={{ position: 'fixed', top: '-10000px', left: '-10000px', pointerEvents: 'none' }}>
                <QuotationDocument quotation={quotation} printRef={pdfRef} isPdfExport />
            </div>
        </div>
    );
};

export default ViewQuotation;
