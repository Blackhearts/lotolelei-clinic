import { supabase } from './supabase.js';

// Register a new patient
async function registerPatient(patientData) {
    try {
        const { data, error } = await supabase
            .from('patients')
            .insert([patientData]);
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error registering patient:', error);
        throw error;
    }
}

// Get patient by ID
async function getPatientById(patientId) {
    try {
        const { data, error } = await supabase
            .from('patients')
            .select('*')
            .eq('patient_id', patientId)
            .single();
            
        if (error && error.code !== 'PGRST116') throw error; // Ignore "No rows found" error
        return data;
    } catch (error) {
        console.error('Error fetching patient:', error);
        throw error;
    }
}

// Form submission handler for register.html
document.addEventListener('DOMContentLoaded', () => {
    const patientForm = document.getElementById('patient-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    
    if (patientForm) {
        patientForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const patientData = {
                patient_id: document.getElementById('patient-id').value,
                first_name: document.getElementById('first-name').value,
                surname: document.getElementById('surname').value,
                gender: document.getElementById('gender').value,
                date_of_birth: document.getElementById('date-of-birth').value,
                phone_number: document.getElementById('phone-number').value
            };
            
            try {
                // Check if patient already exists
                const existingPatient = await getPatientById(patientData.patient_id);
                if (existingPatient) {
                    showMessage(errorMessage, 'Patient with this ID already exists');
                    return;
                }
                
                // Register new patient
                await registerPatient(patientData);
                
                // Show success message and reset form
                showMessage(successMessage, 'Patient registered successfully!');
                patientForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
                
            } catch (error) {
                showMessage(errorMessage, 'Error registering patient: ' + error.message);
            }
        });
    }
});

function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

// Export functions for use in other modules
export { registerPatient, getPatientById };