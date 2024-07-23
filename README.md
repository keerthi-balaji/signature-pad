# signature-pad
A simple and reusable Signature Pad component for web applications. This component allows users to draw their signature on a canvas, clear it, and save it as a data URL.
## Features

- Draw signatures on a canvas
- Clear the canvas with a button
- Save and load signatures as data URLs
- Easily integrate into any web application

## Getting Started

### Prerequisites

To use the SignaturePad component, you need to have a basic understanding of JavaScript and HTML.

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/signature-pad.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd signature-pad
    ```

### Usage
##Initialize the component:
Create a new instance of the SignaturePad component and render it in a specified container:
```sh
import SignaturePad from './signaturePad.js';

const container = document.getElementById('signature-container');

const signaturePad = new SignaturePad({
  container: container,
  label: 'Your Signature'
});

signaturePad.onRender();
```
