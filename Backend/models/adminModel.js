const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    unique: true,   
  },
  password: {
    type: String,
    required: true, 
  },
  role: {
    type: String,
    required: true,
    default: 'admin', 
  }
}, { timestamps: true });


adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  
  try {
    const salt = await bcrypt.genSalt(10);  
    this.password = await bcrypt.hash(this.password, salt);  
    next();
  } catch (error) {
    return next(error);
  }
});


adminSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);  
};


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

