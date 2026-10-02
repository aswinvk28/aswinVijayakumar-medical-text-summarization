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
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-3 App-sidebar">
          <header className="App-header">
            <h1>Medical Text Summarization demo</h1>
          </header>
          <div className="row">
            <p className="mb-3">Learn more about the <a href="https://openi.nlm.nih.gov/faq?download=true">dataset</a> from which we trained our model.</p>
            <p className="mb-3">Note: This is a demo application and the summarized text may not be accurate.</p>
            <p>Some of the examples: </p>
            <div className="examples-content">
              Findings1: <textarea rows="5" class="form-control" disabled>Heart size within normal limits, stable mediastinal and hilar contours. Mild hyperinflation appears similar to prior. No focal alveolar consolidation, no definite pleural effusion seen. Scattered chronic appearing irregular interstitial markings, no typical findings of pulmonary edema.</textarea>
              Impression1: <textarea rows="2" class="form-control" disabled>No acute findings</textarea>
              <br />Findings2: <textarea rows="5" class="form-control" disabled>The cardiomediastinal silhouette is stable in appearance. No interval change in the diffuse increased bilateral pulmonary interstitial markings, greatest in the peripheral aspect of the left lung and left lung base. These opacities appear slightly increased as compared to prior examination. Mild left-sided volume loss redemonstrated, unchanged. No pneumothorax or pleural effusion. The thoracic spine appears intact.</textarea>
              Impression2: <textarea rows="2" class="form-control" disabled>1. Slight interval worsening of the diffusely increased bilateral pulmonary interstitial markings, greatest in the peripheral aspect of the left lung and the left lung base. These findings are most consistent with slight interval worsening of the patient's known interstitial lung disease. 2. Stable, mild left-sided volume loss. .</textarea>
            </div>
            <div className="mb-3">
              <h3>Tech stack</h3>
              <ul className="tech-stack row row-cols-4" style={{ listStyleType: 'none' }}>
                <li className="tech-stack-item col">
                  <span>Transformers <sub className="library-from">- from HuggingFace</sub></span>
                </li>
                <li className="tech-stack-item col">
                  <span>Flask</span>
                </li>
                <li className="tech-stack-item col">
                  <span>Datasets <sub className="library-from">- from HuggingFace</sub></span>
                </li>
                <li className="tech-stack-item col">
                  <span>Torch</span>
                </li>
                <li className="tech-stack-item col">
                  <span>Huggingface Hub</span>
                </li>
                <li className="tech-stack-item col">
                  <span>Bootstrap</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="App col-9" id="app-container">
          <div className="container">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" width="150" />
            </header>
            <section className="App-content">
              <p>Welcome to Kwikdrift!</p>
              <p>We're excited to have you here.</p>
              <p>Feel free to explore our demo Large Language Model (LLM) for Medical Text Summarization.</p>
              <div className="App-form text-start">
                <form onSubmit={handleSubmit} id="medical-text-form" action="https://aswinvk28-medical-text-summarization.hf.space/" method="post">
                  <div className="medical-text-input mb-3">
                    <label for="FormControlInput" class="form-label">Findings (Input Medical Text)</label>
                    <textarea id="FormControlInput" class="form-control" name="input_text" rows="5" cols="50" placeholder="Enter your medical text here after diagnosis..." required></textarea>
                  </div>
                  <div className="medical-text-form-submit mb-3">
                    <button class="btn btn-primary mb-3" type="submit">Try the Demo</button>
                  </div>
                  <div className="medical-text-output mb-3">
                    <label for="FormControlOutput" class="form-label">Impression (Summarized Text)</label>
                    <textarea disabled id="FormControlOutput" class="form-control" name="output_text" rows="5" cols="50" placeholder="Summarized text will appear here..."></textarea>
                  </div>
                </form>
              </div>
            </section>
            <footer className="App-footer text-start">
              <h3>Rouge Scores</h3>
              <ul className="rouge-score row row-cols-6" style={{ listStyleType: 'none' }}>
                <li className="rouge-score-item col"><b>Rouge-1: 0.55</b></li>
                <li className="rouge-score-item col"><b>Rouge-2: 0.44</b></li>
                <li className="rouge-score-item col"><b>Rouge-L: 0.54</b></li>
              </ul>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
