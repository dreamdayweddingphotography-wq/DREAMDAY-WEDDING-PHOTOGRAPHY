import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import { Printer, Download, ArrowLeft } from 'lucide-react';
import QuotationDocument from './QuotationDocument';
import './ViewQuotation.css';

const ViewQuotation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quotation, setQuotation] = useState(null);
    const [loading, setLoading] = useState(true);
    const printRef = useRef();

    useEffect(() => {
        const fetchQuotation = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/quotations/${id}`);
                setQuotation(res.data.data);
            } catch (error) {
                console.error("Error fetching quotation:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuotation();
    }, [id]);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: `Quotation_${id}`,
    });

    const handleDownload = () => {
        const element = printRef.current;
        const opt = {
            margin:       0,
            filename:     `Quotation_${id}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
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
        </div>
    );
};

export default ViewQuotation;
