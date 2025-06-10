const SUPABASE_URL = 'https://ctzvvqthrnnujtkpezpv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0enZ2cXRocm5udWp0a3BlenB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MTczNzUsImV4cCI6MjA2NTA5MzM3NX0.Ckh7WiVUx7SYzycyLJUf98wkKqR70PwLCTFUoTYC920';
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

async function showForm(type) {
  const container = document.getElementById('form-container');
  if (type === 'register') {
    container.innerHTML = `
      <h2>Register Patient</h2>
      <input placeholder="Patient ID (e.g. PN001)" id="pid" />
      <input placeholder="First Name" id="fname" />
      <input placeholder="Surname" id="sname" />
      <select id="gender"><option>Male</option><option>Female</option></select>
      <input type="date" id="dob" />
      <input placeholder="Phone" id="phone" />
      <button onclick="registerPatient()">Submit</button>
    `;
  } else if (type === 'consultation') {
    container.innerHTML = `
      <h2>Record Consultation</h2>
      <input placeholder="Consultation ID (e.g. C1001)" id="cid" />
      <input type="date" id="cdate" />
      <input placeholder="Patient ID" id="cpid" />
      <input placeholder="Doctor ID" id="did" />
      <input placeholder="Diagnosis" id="diag" />
      <input placeholder="Medication" id="med" />
      <button onclick="recordConsultation()">Submit</button>
    `;
  } else if (type === 'search') {
    container.innerHTML = `
      <h2>Search Patient Consultations</h2>
      <input placeholder="Patient ID" id="searchid" />
      <button onclick="searchConsultations()">Search</button>
      <div id="results"></div>
    `;
  }
}

async function registerPatient() {
  const data = {
    patient_id: document.getElementById('pid').value,
    first_name: document.getElementById('fname').value,
    surname: document.getElementById('sname').value,
    gender: document.getElementById('gender').value,
    dob: document.getElementById('dob').value,
    phone: document.getElementById('phone').value,
  };
  const { error } = await supabaseClient.from('patients').insert(data);
  alert(error ? 'Error: ' + error.message : 'Patient Registered');
}

async function recordConsultation() {
  const data = {
    consultation_id: document.getElementById('cid').value,
    consultation_date: document.getElementById('cdate').value,
    patient_id: document.getElementById('cpid').value,
    doctor_id: document.getElementById('did').value,
    diagnosis: document.getElementById('diag').value,
    medication: document.getElementById('med').value,
  };
  const { error } = await supabaseClient.from('consultations').insert(data);
  alert(error ? 'Error: ' + error.message : 'Consultation Recorded');
}

async function searchConsultations() {
  const id = document.getElementById('searchid').value;
  const { data, error } = await supabaseClient
    .from('consultations')
    .select('*')
    .eq('patient_id', id);
  const results = document.getElementById('results');
  if (error) {
    results.innerHTML = 'Error fetching data.';
    return;
  }
  results.innerHTML = data.map(c => `
    <p><strong>${c.consultation_date}:</strong> ${c.diagnosis} - ${c.medication}</p>
  `).join('');
}
