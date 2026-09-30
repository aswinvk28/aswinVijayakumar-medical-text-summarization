import logo from './kwikdrift-logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputText = form.elements.input_text.value;

    document.getElementById('app-container').classList.add('loading');

    // Send the input text to the backend for summarization
    fetch('https://aswinvk28-medical-text-summarization.hf.space/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: inputText })
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      // Update the output text area with the summarized text
      form.elements.output_text.value = data.content;
      document.getElementById('app-container').classList.remove('loading');
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('app-container').classList.remove('loading');
    });
  }

  return (
    <div className="App" id="app-container">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="150" />
      </header>
      <section className="App-content">
        <p>Welcome to Kwikdrift!</p>
        <p>We're excited to have you here.</p>
        <p>Feel free to explore our demo Large Language Model (LLM) for Medical Text Summarization.</p>
        <div className="App-form container">
          <div className="caption">
            <h2>Medical Text Summarization Demo</h2>
            <p className="mb-3">Learn more about the <a href="https://openi.nlm.nih.gov/faq?download=true">dataset</a> from which we trained our model.</p>
            <p className="mb-3">Note: This is a demo application and the summarized text may not be accurate.</p>
            <p className="mb-3">Some of the examples: 
              <br/>Findings1: <em>Heart size within normal limits, stable mediastinal and hilar contours. Mild hyperinflation appears similar to prior. No focal alveolar consolidation, no definite pleural effusion seen. Scattered chronic appearing irregular interstitial markings, no typical findings of pulmonary edema.</em>
              <br/>Impression1: <em>No acute findings</em>
              <br/>Findings2: <em>The cardiomediastinal silhouette is stable in appearance. No interval change in the diffuse increased bilateral pulmonary interstitial markings, greatest in the peripheral aspect of the left lung and left lung base. These opacities appear slightly increased as compared to prior examination. Mild left-sided volume loss redemonstrated, unchanged. No pneumothorax or pleural effusion. The thoracic spine appears intact.</em>
              <br/>Impression2: <em>1. Slight interval worsening of the diffusely increased bilateral pulmonary interstitial markings, greatest in the peripheral aspect of the left lung and the left lung base. These findings are most consistent with slight interval worsening of the patient's known interstitial lung disease. 2. Stable, mild left-sided volume loss. .</em>
            </p>
          </div>
          <form onSubmit={handleSubmit} id="medical-text-form" action="https://aswinvk28-medical-text-summarization.hf.space/" method="post">
            <div className="medical-text-input mb-3">
              <label for="FormControlInput" class="form-label">Input Medical Text</label>
              <textarea id="FormControlInput" class="form-control" name="input_text" rows="5" cols="50" placeholder="Enter your medical text here after diagnosis..." required></textarea>
            </div>
            <div className="medical-text-output mb-3">
              <label for="FormControlOutput" class="form-label">Summarized Text</label>
              <textarea id="FormControlOutput" class="form-control" name="output_text" rows="5" cols="50" placeholder="Summarized text will appear here..."></textarea>
            </div>
            <div className="medical-text-form-submit mb-3">
              <button class="btn btn-primary mb-3" type="submit">Try the Demo</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
