export default class SignaturePad {
  // Initialize the component with provided configuration
  constructor(config) {
    this.config = config || {};
    this.canvas = null;
    this.clearButton = null;
    this.labelSpan = null;
    this.userData = this.config.userData || null;
    this.init();
  }

  init() {
    // Create the canvas element for drawing the signature
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'signature-pad';

    // Create the clear button to clear the canvas
    this.clearButton = document.createElement('button');
    this.clearButton.type = 'button';
    this.clearButton.className = 'clear-button';
    this.clearButton.innerText = 'Clear Signature';
    this.clearButton.addEventListener('click', () => this.clearCanvas());

    // Create a span element for the label
    this.labelSpan = document.createElement('span');
    this.labelSpan.className = 'form-label';
    this.labelSpan.innerText = this.config.label || 'Signature';

    // Create a container to hold the canvas and clear button
    const container = document.createElement('div');
    container.className = 'signature-container';
    container.appendChild(this.canvas);
    container.appendChild(this.clearButton);

    // Load existing signature data if available
    if (this.userData) {
      this.loadSignature(this.userData);
    }

    // Append the label and container to the specified parent element
    this.config.container.appendChild(this.labelSpan);
    this.config.container.appendChild(container);
  }

  // Clear the canvas
  clearCanvas() {
    const context = this.canvas.getContext('2d')
    if (context) {
      context.beginPath()
      context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.saveSignature()
    }
  }

  // Load signature data from an image URL
  loadSignature(userData) {
    const context = this.canvas.getContext('2d');
    const image = new Image();
    image.onload = () => context.drawImage(image, 0, 0);
    image.src = userData;
  }

  // Save the signature as a data URL
  saveSignature() {
    const dataUrl = this.canvas.toDataURL('image/png');
    this.config.userData = dataUrl;
    console.log('save signature:', this.config.userData);
  }

  onRender() {
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = 150;

    const context = this.canvas.getContext('2d');
    context.strokeStyle = '#000';
    context.lineWidth = 2;

    let isDrawing = false;

    // Initialize the canvas for drawing and attach event listeners
    this.canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      context.moveTo(e.offsetX, e.offsetY);
    });
    this.canvas.addEventListener('mousemove', (e) => {
      if (isDrawing) {
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
      }
    });
    this.canvas.addEventListener('mouseup', () => {
      isDrawing = false;
      this.saveSignature();
    });
    this.canvas.addEventListener('mouseout', () => {
      isDrawing = false;
    });

    // Load existing signature data if available
    if (this.userData) {
      this.loadSignature(this.userData);
    } else {
      console.log('No saved user data found.');
    }
  }
}