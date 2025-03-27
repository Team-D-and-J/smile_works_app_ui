"use client";

import { useState } from "react";
import "../globals.css";

const TreatmentDocuments: React.FC = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [pdfSrc, setPdfSrc] = useState<string | null>(null);

	const treatments: { name: string; pdfPath?: string }[] = [
		{ name: "Dental Restoration", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Invisalign", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Tooth Extractions", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Complete Exams", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Veneer", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Crown", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Teeth Whitening", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Mouthguard", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Dental Bonding", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Bridge", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Gum Recession", pdfPath: "/pdfs/tooth_extractions.pdf" },
		{ name: "Dental Implants", pdfPath: "/pdfs/tooth_extractions.pdf" },
	];

	const openModal = (pdfPath?: string) => {
		if (pdfPath) {
			setPdfSrc(pdfPath);
			setModalOpen(true);
		}
	};

	const closeModal = () => {
		setModalOpen(false);
		setPdfSrc(null);
	};

	return (
		<div className="p-4">
			<h2 className="mb-5 text-xl font-bold">
				Click treatment to view and print document
			</h2>

			<div className="grid grid-cols-3 gap-4">
				{treatments.map((treatment, index) => (
					<button
						key={index}
						className="bg-gray-700 text-white px-8 py-6 rounded-md hover:bg-gray-600"
						onClick={() => openModal(treatment.pdfPath)}
					>
						{treatment.name}
					</button>
				))}
			</div>

			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
					onClick={closeModal}
				>
					<div
						className="bg-white p-6 w-3/4 max-w-3xl rounded-lg relative"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="absolute top-3 right-5 text-2xl"
							onClick={closeModal}
						>
							&times;
						</button>
						{pdfSrc && (
							<iframe src={pdfSrc} className="w-full h-[500px]" />
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default TreatmentDocuments;
