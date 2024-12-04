const Contact = require('../models/contactModel');  // استيراد الـ Model


exports.getAllContacts = async (req, res) => {
  try {
    
    const contacts = await Contact.find();

    
    res.status(200).json(contacts);
  } catch (error) {
    
    res.status(500).json({ message: 'Failed to retrieve messages. Please try again later.' });
  }
};


exports.saveContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const newContact = new Contact({
      name,
      email,
      message
    });

    
    await newContact.save();

   
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    
    console.error('Error saving contact form:', error);
    res.status(500).json({ message: 'Failed to send message, please try again later.' });
  }
};