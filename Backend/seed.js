const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// ─── Models ───────────────────────────────────────────────────────────────────
const counterSchema = new mongoose.Schema({ _id: String, seq: { type: Number, default: 0 } });
const Counter = mongoose.model('Counter', counterSchema);

const UserSchema = new mongoose.Schema({
  Emp_ID: { type: String, unique: true },
  User_Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Role: { type: String, default: 'Employee' },
  Department: { type: String, default: '' },
  Designation: { type: String, default: '' },
  Phone: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
UserSchema.pre('save', async function () {
  if (this.Emp_ID) return;
  const counter = await Counter.findOneAndUpdate({ _id: 'employee' }, { $inc: { seq: 1 } }, { upsert: true, new: true });
  this.Emp_ID = `EMP-${String(counter.seq).padStart(3, '0')}`;
});
const User = mongoose.model('User', UserSchema);

const AssetSchema = new mongoose.Schema({
  Asset_ID: { type: String, unique: true },
  Asset_Name: { type: String, required: true },
  Asset_Type: { type: String, required: true },
  Serial_No: { type: String, required: true, unique: true },
  Purchase_Date: { type: Date },
  Warranty: { type: Date },
  Codal_Life: { type: Number, default: 0 },
  Status: { type: String, default: 'Available' },
  Image: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
AssetSchema.pre('save', async function () {
  if (this.Asset_ID) return;
  const counter = await Counter.findOneAndUpdate({ _id: 'asset' }, { $inc: { seq: 1 } }, { upsert: true, new: true });
  this.Asset_ID = `AST-${String(counter.seq).padStart(3, '0')}`;
});
const Asset = mongoose.model('Asset', AssetSchema);

const AssignmentSchema = new mongoose.Schema({
  id: { type: String },
  assetId: { type: String },
  assetName: { type: String },
  empId: { type: String },
  employee: { type: String },
  department: { type: String },
  assignedDate: { type: String },
  returnDate: { type: String, default: '-' },
  status: { type: String, default: 'Active' },
}, { timestamps: true });
const Assignment = mongoose.model('Assignment', AssignmentSchema);

const MaintenanceSchema = new mongoose.Schema({
  asset_id: { type: String },
  asset_name: { type: String, default: '' },
  asset_readable_id: { type: String, default: '' },
  technician_name: { type: String },
  issue_description: { type: String },
  remarks: { type: String, default: '' },
  cost: { type: Number, default: 0 },
  status: { type: String, default: 'In Progress' },
  service_date: { type: Date, default: Date.now },
  next_due_date: { type: Date },
  created_at: { type: Date, default: Date.now }
});
const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);

const VendorSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  contact: { type: String },
  email: { type: String },
  phone: { type: String },
  city: { type: String },
  country: { type: String, default: 'India' },
  category: { type: String },
  status: { type: String, default: 'Active' },
  assetsCount: { type: Number, default: 0 },
  totalSpend: { type: Number, default: 0 },
  rating: { type: Number, default: 4 },
  since: { type: Number },
}, { timestamps: true });
const Vendor = mongoose.model('Vendor', VendorSchema);

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
const Category = mongoose.model('Category', CategorySchema);

// ─── Seed Data ────────────────────────────────────────────────────────────────
const employees = [
  { User_Name: 'Arjun Sharma',     Email: 'arjun.sharma@company.com',     Role: 'Employee', Department: 'IT Department',  Designation: 'System Administrator',  Phone: '9876543210' },
  { User_Name: 'Priya Nair',       Email: 'priya.nair@company.com',       Role: 'Employee', Department: 'IT Department',  Designation: 'Software Engineer',      Phone: '9876543211' },
  { User_Name: 'Rohit Verma',      Email: 'rohit.verma@company.com',      Role: 'Employee', Department: 'Finance',        Designation: 'Accountant',             Phone: '9876543212' },
  { User_Name: 'Kavita Reddy',     Email: 'kavita.reddy@company.com',     Role: 'Employee', Department: 'HR Department',  Designation: 'HR Manager',             Phone: '9876543213' },
  { User_Name: 'Vikram Iyer',      Email: 'vikram.iyer@company.com',      Role: 'Employee', Department: 'IT Department',  Designation: 'Network Engineer',       Phone: '9876543214' },
  { User_Name: 'Anjali Singh',     Email: 'anjali.singh@company.com',     Role: 'Employee', Department: 'Marketing',      Designation: 'Marketing Lead',         Phone: '9876543215' },
  { User_Name: 'Karthik Menon',    Email: 'karthik.menon@company.com',    Role: 'Employee', Department: 'Sales',          Designation: 'Sales Executive',        Phone: '9876543216' },
  { User_Name: 'Sneha Patel',      Email: 'sneha.patel@company.com',      Role: 'Employee', Department: 'HR Department',  Designation: 'Recruiter',              Phone: '9876543217' },
  { User_Name: 'Rahul Gupta',      Email: 'rahul.gupta@company.com',      Role: 'Employee', Department: 'IT Department',  Designation: 'DevOps Engineer',        Phone: '9876543218' },
  { User_Name: 'Meera Krishnan',   Email: 'meera.krishnan@company.com',   Role: 'Employee', Department: 'Finance',        Designation: 'Financial Analyst',      Phone: '9876543219' },
  { User_Name: 'Suresh Kumar',     Email: 'suresh.kumar@company.com',     Role: 'Employee', Department: 'Operations',     Designation: 'Operations Manager',     Phone: '9876543220' },
  { User_Name: 'Divya Mehta',      Email: 'divya.mehta@company.com',      Role: 'Employee', Department: 'Marketing',      Designation: 'Content Strategist',     Phone: '9876543221' },
  { User_Name: 'Aakash Joshi',     Email: 'aakash.joshi@company.com',     Role: 'Employee', Department: 'Sales',          Designation: 'Sales Manager',          Phone: '9876543222' },
  { User_Name: 'Pooja Desai',      Email: 'pooja.desai@company.com',      Role: 'Employee', Department: 'IT Department',  Designation: 'QA Engineer',            Phone: '9876543223' },
  { User_Name: 'Nikhil Bajaj',     Email: 'nikhil.bajaj@company.com',     Role: 'Employee', Department: 'Finance',        Designation: 'Auditor',                Phone: '9876543224' },
  { User_Name: 'Ritu Agarwal',     Email: 'ritu.agarwal@company.com',     Role: 'Employee', Department: 'HR Department',  Designation: 'HR Executive',           Phone: '9876543225' },
  { User_Name: 'Manish Tiwari',    Email: 'manish.tiwari@company.com',    Role: 'Employee', Department: 'Operations',     Designation: 'Logistics Lead',         Phone: '9876543226' },
  { User_Name: 'Swati Bhatt',      Email: 'swati.bhatt@company.com',      Role: 'Employee', Department: 'Marketing',      Designation: 'SEO Specialist',         Phone: '9876543227' },
  { User_Name: 'Deepak Pillai',    Email: 'deepak.pillai@company.com',    Role: 'Employee', Department: 'IT Department',  Designation: 'Frontend Developer',     Phone: '9876543228' },
  { User_Name: 'Nisha Kapoor',     Email: 'nisha.kapoor@company.com',     Role: 'Employee', Department: 'Sales',          Designation: 'Account Executive',      Phone: '9876543229' },
  { User_Name: 'Admin User',       Email: 'admin@ams.com',                Role: 'Admin',    Department: 'IT Department',  Designation: 'System Administrator',   Phone: '9876543200' },
];

const assets = [
  { Asset_Name: 'Dell Latitude 5440',       Asset_Type: 'Laptop',        Serial_No: 'DLS44OY133456',  Purchase_Date: new Date('2024-02-15'), Warranty: new Date('2027-02-15'), Codal_Life: 3, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/laptop.png' },
  { Asset_Name: 'HP LaserJet Pro',          Asset_Type: 'Printer',       Serial_No: 'HPLJ778899',     Purchase_Date: new Date('2023-11-05'), Warranty: new Date('2025-11-05'), Codal_Life: 2, Status: 'Available',     Image: 'https://img.icons8.com/fluency/200/print.png' },
  { Asset_Name: 'Apple MacBook Pro',        Asset_Type: 'Laptop',        Serial_No: 'APMBP223344',    Purchase_Date: new Date('2024-01-20'), Warranty: new Date('2027-01-20'), Codal_Life: 3, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/laptop.png' },
  { Asset_Name: 'Samsung 24" Monitor',      Asset_Type: 'Monitor',       Serial_No: 'SMS24R998877',   Purchase_Date: new Date('2023-08-12'), Warranty: new Date('2025-08-12'), Codal_Life: 2, Status: 'Under Repair',  Image: 'https://img.icons8.com/fluency/200/monitor.png' },
  { Asset_Name: 'Lenovo ThinkPad E14',      Asset_Type: 'Laptop',        Serial_No: 'LNTP445566',     Purchase_Date: new Date('2024-03-10'), Warranty: new Date('2027-03-10'), Codal_Life: 3, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/laptop.png' },
  { Asset_Name: 'Epson Projector EB-X51',   Asset_Type: 'Projector',     Serial_No: 'EPPRJ112233',    Purchase_Date: new Date('2023-06-18'), Warranty: new Date('2025-06-18'), Codal_Life: 2, Status: 'Available',     Image: 'https://img.icons8.com/fluency/200/electronics.png' },
  { Asset_Name: 'iPhone 15 Pro',            Asset_Type: 'Mobile Device', Serial_No: 'APIP15P55667',   Purchase_Date: new Date('2024-04-02'), Warranty: new Date('2026-04-02'), Codal_Life: 2, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/smartphone.png' },
  { Asset_Name: 'Logitech MX Master 3S',    Asset_Type: 'Peripheral',    Serial_No: 'LGMX3S889900',   Purchase_Date: new Date('2024-05-08'), Warranty: new Date('2026-05-08'), Codal_Life: 2, Status: 'Available',     Image: 'https://img.icons8.com/fluency/200/electronics.png' },
  { Asset_Name: 'iPad Pro 12.9"',           Asset_Type: 'Tablet',        Serial_No: 'APIPD129776',    Purchase_Date: new Date('2024-02-28'), Warranty: new Date('2026-02-28'), Codal_Life: 2, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/tablet.png' },
  { Asset_Name: 'Canon EOS R6 Camera',      Asset_Type: 'Camera',        Serial_No: 'CNEOSR6334455',  Purchase_Date: new Date('2023-12-15'), Warranty: new Date('2025-12-15'), Codal_Life: 2, Status: 'Under Repair',  Image: 'https://img.icons8.com/fluency/200/camera.png' },
  { Asset_Name: 'Dell OptiPlex 7090',       Asset_Type: 'Desktop',       Serial_No: 'DLOX7090776',    Purchase_Date: new Date('2023-09-10'), Warranty: new Date('2026-09-10'), Codal_Life: 3, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/desktop.png' },
  { Asset_Name: 'HP EliteDesk 800',         Asset_Type: 'Desktop',       Serial_No: 'HPED800221',     Purchase_Date: new Date('2024-01-08'), Warranty: new Date('2027-01-08'), Codal_Life: 3, Status: 'Available',     Image: 'https://img.icons8.com/fluency/200/desktop.png' },
  { Asset_Name: 'HP Pavilion 24 AIO',       Asset_Type: 'Desktop',       Serial_No: 'HPPV24558',      Purchase_Date: new Date('2023-07-20'), Warranty: new Date('2026-07-20'), Codal_Life: 3, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/desktop.png' },
  { Asset_Name: 'Brother MFC-L8900',        Asset_Type: 'Printer',       Serial_No: 'BRMFC889922',    Purchase_Date: new Date('2023-10-25'), Warranty: new Date('2025-10-25'), Codal_Life: 2, Status: 'Available',     Image: 'https://img.icons8.com/fluency/200/print.png' },
  { Asset_Name: 'LG UltraWide 34"',         Asset_Type: 'Monitor',       Serial_No: 'LGUW34112',      Purchase_Date: new Date('2024-02-10'), Warranty: new Date('2027-02-10'), Codal_Life: 3, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/monitor.png' },
  { Asset_Name: 'Dell P2422H Monitor',      Asset_Type: 'Monitor',       Serial_No: 'DLP2422998',     Purchase_Date: new Date('2024-03-15'), Warranty: new Date('2027-03-15'), Codal_Life: 3, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/monitor.png' },
  { Asset_Name: 'Samsung Galaxy S23',       Asset_Type: 'Mobile Device', Serial_No: 'SMGS23445',      Purchase_Date: new Date('2024-04-12'), Warranty: new Date('2026-04-12'), Codal_Life: 2, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/smartphone.png' },
  { Asset_Name: 'Microsoft Surface Pro 9',  Asset_Type: 'Laptop',        Serial_No: 'MSSP9332',       Purchase_Date: new Date('2024-05-05'), Warranty: new Date('2027-05-05'), Codal_Life: 3, Status: 'Available',     Image: 'https://img.icons8.com/fluency/200/laptop.png' },
  { Asset_Name: 'Lenovo Yoga 9i',           Asset_Type: 'Laptop',        Serial_No: 'LNYO9I223',      Purchase_Date: new Date('2024-03-28'), Warranty: new Date('2027-03-28'), Codal_Life: 3, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/laptop.png' },
  { Asset_Name: 'HP ProBook 450 G10',       Asset_Type: 'Laptop',        Serial_No: 'HPPB450789',     Purchase_Date: new Date('2024-06-01'), Warranty: new Date('2027-06-01'), Codal_Life: 3, Status: 'In Use',        Image: 'https://img.icons8.com/fluency/200/laptop.png' },
];

const vendors = [
  { id: 'V001', name: 'Dell India Pvt. Ltd.',  contact: 'Rahul Sharma',   email: 'rahul.sharma@dell.com',    phone: '+91 98765 11234', city: 'Bangalore', category: 'Hardware', status: 'Active',   assetsCount: 4, totalSpend: 568000, rating: 5,   since: 2019 },
  { id: 'V002', name: 'HP India',              contact: 'Priya Mehta',    email: 'priya@hp.com',             phone: '+91 98765 22345', city: 'Mumbai',    category: 'Hardware', status: 'Active',   assetsCount: 4, totalSpend: 224500, rating: 4.5, since: 2018 },
  { id: 'V003', name: 'Apple India',           contact: 'Vikram Singh',   email: 'vikram@apple.com',         phone: '+91 98765 33456', city: 'Mumbai',    category: 'Hardware', status: 'Active',   assetsCount: 3, totalSpend: 458900, rating: 5,   since: 2020 },
  { id: 'V004', name: 'Samsung India',         contact: 'Anita Desai',    email: 'anita@samsung.com',        phone: '+91 98765 44567', city: 'Delhi',     category: 'Hardware', status: 'Active',   assetsCount: 2, totalSpend: 138500, rating: 4,   since: 2017 },
  { id: 'V005', name: 'Lenovo India',          contact: 'Karthik Nair',   email: 'karthik@lenovo.com',       phone: '+91 98765 55678', city: 'Bangalore', category: 'Hardware', status: 'Active',   assetsCount: 2, totalSpend: 213000, rating: 4.5, since: 2019 },
  { id: 'V006', name: 'Epson India',           contact: 'Sneha Patil',    email: 'sneha@epson.com',          phone: '+91 98765 66789', city: 'Pune',      category: 'Hardware', status: 'Active',   assetsCount: 1, totalSpend: 42000,  rating: 4,   since: 2021 },
  { id: 'V007', name: 'Brother India',         contact: 'Rajesh Kumar',   email: 'rajesh@brother.com',       phone: '+91 98765 77890', city: 'Chennai',   category: 'Hardware', status: 'Active',   assetsCount: 1, totalSpend: 48000,  rating: 3.5, since: 2022 },
  { id: 'V008', name: 'LG Electronics',        contact: 'Pooja Reddy',    email: 'pooja@lg.com',             phone: '+91 98765 88901', city: 'Hyderabad', category: 'Hardware', status: 'Active',   assetsCount: 1, totalSpend: 48000,  rating: 4,   since: 2020 },
  { id: 'V009', name: 'Microsoft Store',       contact: 'Arjun Kapoor',   email: 'arjun@microsoft.com',      phone: '+91 98765 99012', city: 'Hyderabad', category: 'Software', status: 'Active',   assetsCount: 1, totalSpend: 132000, rating: 5,   since: 2018 },
  { id: 'V010', name: 'Canon India',           contact: 'Neha Joshi',     email: 'neha@canon.com',           phone: '+91 98765 01234', city: 'Mumbai',    category: 'Hardware', status: 'Active',   assetsCount: 1, totalSpend: 245000, rating: 4.5, since: 2019 },
  { id: 'V011', name: 'Logitech India',        contact: 'Sanjay Verma',   email: 'sanjay@logitech.com',      phone: '+91 98765 12121', city: 'Bangalore', category: 'Hardware', status: 'Inactive', assetsCount: 0, totalSpend: 8500,   rating: 4,   since: 2023 },
  { id: 'V012', name: 'TechServ IT Services',  contact: 'Manish Gupta',   email: 'manish@techserv.in',       phone: '+91 98765 23232', city: 'Noida',     category: 'Services', status: 'Inactive', assetsCount: 0, totalSpend: 0,      rating: 3,   since: 2024 },
];

const categories = [
  { name: 'Laptop',        image: 'https://img.icons8.com/fluency/200/laptop.png' },
  { name: 'Desktop',       image: 'https://img.icons8.com/fluency/200/desktop.png' },
  { name: 'Monitor',       image: 'https://img.icons8.com/fluency/200/monitor.png' },
  { name: 'Printer',       image: 'https://img.icons8.com/fluency/200/print.png' },
  { name: 'Mobile Device', image: 'https://img.icons8.com/fluency/200/smartphone.png' },
  { name: 'Tablet',        image: 'https://img.icons8.com/fluency/200/tablet.png' },
  { name: 'Camera',        image: 'https://img.icons8.com/fluency/200/camera.png' },
  { name: 'Projector',     image: 'https://img.icons8.com/fluency/200/electronics.png' },
  { name: 'Peripheral',    image: 'https://img.icons8.com/fluency/200/electronics.png' },
];

// ─── Main Seed Function ───────────────────────────────────────────────────────
async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ams');
  console.log('✅ Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Asset.deleteMany({}),
    Assignment.deleteMany({}),
    Maintenance.deleteMany({}),
    Vendor.deleteMany({}),
    Category.deleteMany({}),
    Counter.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing data');

  // Seed Categories
  await Category.insertMany(categories);
  console.log(`✅ Seeded ${categories.length} categories`);

  // Seed Vendors
  await Vendor.insertMany(vendors);
  console.log(`✅ Seeded ${vendors.length} vendors`);

  // Seed Employees (Users)
  const savedUsers = [];
  for (const emp of employees) {
    const user = new User(emp);
    await user.save();
    savedUsers.push(user);
  }
  console.log(`✅ Seeded ${savedUsers.length} employees`);

  // Seed Assets
  const savedAssets = [];
  for (const a of assets) {
    const asset = new Asset(a);
    await asset.save();
    savedAssets.push(asset);
  }
  console.log(`✅ Seeded ${savedAssets.length} assets`);

  // Seed Assignments (assign In Use assets to employees)
  const inUseAssets = savedAssets.filter(a => a.Status === 'In Use');
  const assignments = [];
  const empList = savedUsers.filter(u => u.Role === 'Employee');
  
  const assignmentPairs = [
    { assetIdx: 0,  empIdx: 0  }, // Dell Latitude → John Doe
    { assetIdx: 2,  empIdx: 5  }, // MacBook Pro → Sarah Wilson
    { assetIdx: 4,  empIdx: 2  }, // ThinkPad → Robert Brown
    { assetIdx: 6,  empIdx: 6  }, // iPhone 15 → James Taylor
    { assetIdx: 8,  empIdx: 11 }, // iPad Pro → Sophia Garcia
    { assetIdx: 10, empIdx: 9  }, // Dell OptiPlex → Olivia Anderson
    { assetIdx: 12, empIdx: 15 }, // HP Pavilion → Mia King
    { assetIdx: 14, empIdx: 13 }, // LG UltraWide → Isabella Allen
    { assetIdx: 15, empIdx: 19 }, // Dell Monitor → Charlotte Scott
    { assetIdx: 16, empIdx: 10 }, // Galaxy S23 → William Thomas
    { assetIdx: 18, empIdx: 18 }, // Lenovo Yoga → Alexander Hill
    { assetIdx: 19, empIdx: 12 }, // HP ProBook → Benjamin Hall
  ];

  for (let i = 0; i < assignmentPairs.length; i++) {
    const { assetIdx, empIdx } = assignmentPairs[i];
    const asset = savedAssets[assetIdx];
    const emp = empList[empIdx] || empList[i % empList.length];
    if (!asset || !emp) continue;

    const assignment = new Assignment({
      id: `ASN-${String(i + 1).padStart(3, '0')}`,
      assetId: asset.Asset_ID,
      assetName: asset.Asset_Name,
      empId: emp.Emp_ID,
      employee: emp.User_Name,
      department: emp.Department,
      assignedDate: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
      returnDate: '-',
      status: 'Active',
    });
    await assignment.save();
    assignments.push(assignment);
  }
  console.log(`✅ Seeded ${assignments.length} assignments`);

  // Seed Maintenance records
  const maintenanceData = [
    { assetIdx: 3,  tech: 'Mike Johnson',    issue: 'Screen flickering and display issues',     remarks: 'Panel replacement needed', cost: 8500  },
    { assetIdx: 9,  tech: 'Daniel Martinez', issue: 'Lens autofocus malfunction',               remarks: 'Sent to Canon service center', cost: 12000 },
    { assetIdx: 0,  tech: 'Mary Smith',      issue: 'Battery draining fast, OS slow',           remarks: 'Battery replaced, OS reinstalled', cost: 3500  },
    { assetIdx: 5,  tech: 'Mike Johnson',    issue: 'Projector lamp replacement due',           remarks: 'Lamp replaced, cleaned filters', cost: 6000  },
    { assetIdx: 1,  tech: 'Daniel Martinez', issue: 'Paper jam and toner cartridge issue',      remarks: 'Cartridge replaced', cost: 2500  },
  ];

  for (let i = 0; i < maintenanceData.length; i++) {
    const { assetIdx, tech, issue, remarks, cost } = maintenanceData[i];
    const asset = savedAssets[assetIdx];
    if (!asset) continue;
    const rec = new Maintenance({
      asset_id: asset.Asset_ID,
      asset_readable_id: asset.Asset_ID,
      asset_name: asset.Asset_Name,
      technician_name: tech,
      issue_description: issue,
      remarks,
      cost,
      status: i < 2 ? 'In Progress' : 'Completed',
      service_date: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000),
      next_due_date: new Date(Date.now() + (30 - i * 5) * 24 * 60 * 60 * 1000),
    });
    await rec.save();
  }
  console.log(`✅ Seeded ${maintenanceData.length} maintenance records`);

  console.log('\n🎉 Database seeded successfully!');
  console.log('─────────────────────────────────────');
  console.log(`👥 Employees : ${savedUsers.length}`);
  console.log(`📦 Assets    : ${savedAssets.length}`);
  console.log(`🔗 Assignments: ${assignments.length}`);
  console.log(`🔧 Maintenance: ${maintenanceData.length}`);
  console.log(`🏪 Vendors   : ${vendors.length}`);
  console.log(`📁 Categories: ${categories.length}`);
  console.log('─────────────────────────────────────');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});