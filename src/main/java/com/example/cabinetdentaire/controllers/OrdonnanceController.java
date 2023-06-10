package com.example.cabinetdentaire.controllers;

import com.example.cabinetdentaire.entities.Ordonnance;
import com.example.cabinetdentaire.entities.Patient;
import com.example.cabinetdentaire.entities.Seance;
import com.example.cabinetdentaire.exceptions.PatientNotFoundException;
import com.example.cabinetdentaire.exceptions.SeanceNotFoundException;
import com.example.cabinetdentaire.reposityries.OrdonnanceRepo;
import com.example.cabinetdentaire.reposityries.PatientRepo;
import com.example.cabinetdentaire.reposityries.SeanceRepo;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Date;

import com.itextpdf.text.pdf.PdfWriter;


@RestController
@RequestMapping("/ordonnances")
@CrossOrigin("http://localhost:3000")
public class OrdonnanceController {

    private OrdonnanceRepo ordonnanceRepo;
    private SeanceRepo seanceRepo;

    private PatientRepo patientRepo;

    // Injecter les repos dans le constructeur du contrôleur
    public OrdonnanceController(OrdonnanceRepo ordonnanceRepo, SeanceRepo seanceRepo, PatientRepo patientRepo) {
        this.ordonnanceRepo = ordonnanceRepo;
        this.seanceRepo = seanceRepo;
        this.patientRepo = patientRepo;
    }

    @PostMapping("/{seanceId}/{patientId}")
    public Ordonnance createOrdonnance(@RequestBody Ordonnance ordonnance,
                                       @PathVariable Long seanceId,
                                       @PathVariable Long patientId) {
        // Retrieve the seance based on seanceId
        Seance seance = seanceRepo.findById(seanceId)
                .orElseThrow(() -> new SeanceNotFoundException(seanceId));
        ordonnance.setSeance(seance);

        // Retrieve the patient based on patientId
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new PatientNotFoundException(patientId));
        ordonnance.setPatient(patient);

        ordonnance.setPrescription(ordonnance.getPrescription());

        // Save the ordonnance in the database
        return ordonnanceRepo.save(ordonnance);
    }


    @GetMapping("/{seanceid}/{patientid}/download")
    public ResponseEntity<InputStreamResource> downloadOrdonnance(
            @PathVariable("seanceid") Long seanceId,
            @PathVariable("patientid") Long patientId
    ) {
        // Fetch the ordonnance based on seanceId and patientId from the database
        Ordonnance ordonnance = ordonnanceRepo.findBySeanceIdAndPatientId(seanceId, patientId);
        if (ordonnance == null) {
            // Handle the case where ordonnance is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Generate the content of the PDF using iText
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document();
        try {
            PdfWriter writer = PdfWriter.getInstance(document, baos);
            document.open();

            // Add logo
            Image logo = Image.getInstance(getClass().getResource("/tooth.png"));
            logo.setAlignment(Element.ALIGN_LEFT);
            logo.scaleToFit(50, 70); // Adjust the size of the logo as needed

// Add title
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 40, Font.BOLD, new BaseColor(2, 48, 71));
            Paragraph title = new Paragraph("Cabinet dentaire", titleFont);
            title.setAlignment(Element.ALIGN_TOP);

// Add prescription
            Font prescriptionFont = new Font(Font.FontFamily.HELVETICA, 20, Font.NORMAL);
            Paragraph prescription = new Paragraph(ordonnance.getPrescription(), prescriptionFont);
            prescription.setAlignment(Element.ALIGN_CENTER);

// Add date
            Font dateFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);
            Paragraph date = new Paragraph(new Date().toString(), dateFont);
            date.setAlignment(Element.ALIGN_BOTTOM);


            document.add(logo);
            document.add(title);
            document.add(prescription);
            document.add(date);

            document.close();
        } catch (Exception e) {
            // Handle PDF generation error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        // Return the PDF file as a response
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ordonnance.pdf");
        ByteArrayInputStream bis = new ByteArrayInputStream(baos.toByteArray());
        InputStreamResource inputStreamResource = new InputStreamResource(bis);
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(inputStreamResource);
    }

}
