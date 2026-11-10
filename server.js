const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Paths
const dataDir = path.join(__dirname, 'data');
const messagesFile = path.join(dataDir, 'messages.json');
const portfolioDataFile = path.join(dataDir, 'portfolio-data.json');
const emailJsConfigFile = path.join(dataDir, 'emailjs-config.json');
const resumePath = path.join(__dirname, 'public', 'assets', 'docs', 'Abubakar_Z_Resume.pdf');

// Ensure messages file exists
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2));
}

// Helper to read messages
function readMessages() {
  try {
    if (!fs.existsSync(messagesFile)) return [];
    const content = fs.readFileSync(messagesFile, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading messages:', err);
    return [];
  }
}

// Helper to save message
function saveMessage(msg) {
  const messages = readMessages();
  messages.unshift(msg);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
}

// --- API ROUTES ---

// 1. Get Portfolio Data
app.get('/api/portfolio', (req, res) => {
  try {
    const data = fs.readFileSync(portfolioDataFile, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Error fetching portfolio data:', err);
    res.status(500).json({ error: 'Could not load portfolio data' });
  }
});

// 2. Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (Name, Email, Message).'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.'
      });
    }

    const newMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'Portfolio Inquiry').trim(),
      message: message.trim(),
      recipient: 'abubakar.careers@gmail.com',
      ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      receivedAt: new Date().toISOString()
    };

    saveMessage(newMessage);

    console.log(`[Contact Form] New inquiry from ${newMessage.name} (${newMessage.email}) -> Sent to abubakar.careers@gmail.com`);

    // Asynchronously forward to FormSubmit so real email is delivered to abubakar.careers@gmail.com
    try {
      fetch('https://formsubmit.co/ajax/abubakar.careers@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `🔔 New Client Inquiry from ${newMessage.name} (${newMessage.email})`,
          name: newMessage.name,
          email: newMessage.email,
          message: newMessage.message,
          receivedAt: newMessage.receivedAt
        })
      }).catch(err => console.warn('[FormSubmit Background]', err.message));
    } catch (e) {}

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully to abubakar.careers@gmail.com.'
    });
  } catch (err) {
    console.error('Error saving contact message:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred. Please try again or reach out directly to abubakar.careers@gmail.com.'
    });
  }
});

// 3. View Inquiries / Messages (Admin API)
app.get('/api/messages', (req, res) => {
  const messages = readMessages();
  res.json({
    total: messages.length,
    messages
  });
});

// EmailJS Configuration API
app.get('/api/emailjs-config', (req, res) => {
  try {
    if (fs.existsSync(emailJsConfigFile)) {
      const config = JSON.parse(fs.readFileSync(emailJsConfigFile, 'utf8'));
      return res.json(config);
    }
  } catch (e) {}
  res.json({ serviceId: '', templateId: '', publicKey: '' });
});

app.post('/api/emailjs-config', (req, res) => {
  try {
    const { serviceId, templateId, publicKey } = req.body || {};
    const config = {
      serviceId: (serviceId || '').trim(),
      templateId: (templateId || '').trim(),
      publicKey: (publicKey || '').trim()
    };
    fs.writeFileSync(emailJsConfigFile, JSON.stringify(config, null, 2), 'utf8');
    return res.json({ success: true, config });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Download Resume / CV
app.get('/api/download-cv', (req, res) => {
  if (fs.existsSync(resumePath)) {
    res.download(resumePath, 'Abubakar_Z_Resume.pdf', (err) => {
      if (err) {
        console.error('Error sending resume:', err);
        if (!res.headersSent) {
          res.status(500).send('Could not download resume.');
        }
      }
    });
  } else {
    res.status(404).send('Resume file not found on server.');
  }
});

// 5. Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime(), timestamp: new Date() });
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server with automatic port retry if occupied
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`=================================================`);
    console.log(`🚀 Abubakar Z. Portfolio Server running on port ${port}`);
    console.log(`🌐 Live URL: http://localhost:${port}`);
    console.log(`📄 Resume: http://localhost:${port}/assets/docs/Abubakar_Z_Resume.pdf`);
    console.log(`📬 Contact API: http://localhost:${port}/api/contact`);
    console.log(`=================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is occupied by another app (e.g. Next.js). Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(DEFAULT_PORT);
