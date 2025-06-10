import { supabase } from './supabase.js';
import { getPatientById } from './patients.js';

// Record a new consultation
async function recordConsultation(consultationData) {
    try {
        // First verify patient exists
        const patient = await getPatientById(consultationData.patient_id);
        if (!patient) {
            throw new Error('Patient not found');
        }
        
        const { data, error } = await supabase
            .from('consultations')
            .insert([consultationData]);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error recording consultation:', error);
        throw error;
    }
}

// Get consultations by patient ID
async function getConsultationsByPatientId(patientId) {
    try {
        const { data, error } = await supabase
            .from('consultations')
            .select('*')
            .eq('patient_id', patientId)
            .order('date_of_consultation', { ascending: false });
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching consultations:', error);
        throw error;
    }
}

// Form submission handler for consultation.html
document.addEventListener('DOMContentLoaded', () => {
    const consultationForm = document.getElementById('consultation-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    
    if (consultationForm) {
        consultationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const consultationData = {
                consultation_id: document.getElementById('consultation-id').value,
                date_of_consultation: document.getElementById('date-of-consultation').value,
                patient_id: document.getElementById('patient-id').value,
                doctor_id: document.getElementById('doctor-id').value,
                diagnosis: document.getElementById('diagnosis').value,
                prescribed_medication: document.getElementById('prescribed-medication').value || null
            };
            
            try {
                await recordConsultation(consultationData);
                
                // Show success message and reset form
                showMessage(successMessage, 'Consultation recorded successfully!');
                consultationForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                showMessage(errorMessage, 'Error recording consultation: ' + error.message);
            }
        });
    }
});

function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Export functions for use in other modules
export { recordConsultation, getConsultationsByPatientId };