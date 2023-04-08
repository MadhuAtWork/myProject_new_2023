import React, { useState } from 'react';
import { Document, Page ,pdfjs} from 'react-pdf';
// import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

function PdfViewer(props) {
  const [numPages, setNumPages] = useState(null);

  return (
    <div>
      <Document file={props.uploaddata} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
}

export default PdfViewer;