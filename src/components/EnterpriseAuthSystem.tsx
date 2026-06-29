import React, { useState, useEffect } from 'react';
import { 
  LogIn, ShieldCheck, Mail, Phone, Lock, Eye, EyeOff, Sparkles, 
  ArrowRight, ArrowLeft, CheckCircle2, User, Key, AlertCircle, 
  FileText, Upload, Check, RefreshCw, X, Shield, Smartphone, 
  MapPin, Landmark, Trash2, Bell, LogOut, FileCheck, Layers
} from 'lucide-react';
import { PartnerRole } from '../types';

// Storage Key for simulation data
const STORAGE_KEY = 'kamaikart_auth_system_v1';

export interface UserAccount {
  phone: string;
  email: string;
  fullName: string;
  role: PartnerRole;
  password?: string;
  dob: string;
  gender: string;
  state: string;
  district: string;
  block: string;
  panchayat: string;
  village: string;
  pinCode: string;
  aadhaarNo: string;
  panNo: string;
  bankAccount: string;
  ifscCode: string;
  upiId: string;
  emergencyContact: string;
  nomineeName: string;
  nomineeRelation: string;
  occupation: string;
  education: string;
  experienceYears: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  kycNotes?: string;
  isActive: boolean;
  walletBalance: number;
  joinedAt: string;
  documents: {
    aadhaarFront?: string;
    aadhaarBack?: string;
    pan?: string;
    photo?: string;
    shopPhoto?: string;
    bankPassbook?: string;
    cancelledCheque?: string;
  };
}

export interface SessionDevice {
  id: string;
  deviceType: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface AuthLog {
  id: string;
  timestamp: string;
  action: 'login_success' | 'login_failed' | 'password_reset' | 'kyc_submitted' | 'kyc_approved' | 'kyc_rejected' | 'user_suspended' | 'user_activated' | 'session_revoked';
  ip: string;
  details: string;
  isSuspicious?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'welcome' | 'registration' | 'kyc_approved' | 'kyc_rejected' | 'security' | 'wallet';
  timestamp: string;
  read: boolean;
}

// Initial mockup accounts for testing
const DEFAULT_ACCOUNTS: UserAccount[] = [
  {
    phone: '9999999999',
    email: 'admin@kamaikart.com',
    fullName: 'Satish Raj (Super Admin)',
    role: 'super-admin',
    password: '1234',
    dob: '1992-05-15',
    gender: 'Male',
    state: 'Bihar',
    district: 'Gaya',
    block: 'Gaya Sadar',
    panchayat: 'Gaya South',
    village: 'Chandauti',
    pinCode: '823001',
    aadhaarNo: '1234-5678-9012',
    panNo: 'ABCDE1234F',
    bankAccount: '100910203040',
    ifscCode: 'SBIN0000010',
    upiId: 'satish@oksbi',
    emergencyContact: '9876543210',
    nomineeName: 'Rekha Devi',
    nomineeRelation: 'Mother',
    occupation: 'Business',
    education: 'Post Graduate',
    experienceYears: '8',
    kycStatus: 'approved',
    isActive: true,
    walletBalance: 125000,
    joinedAt: '2026-01-10T10:00:00.000Z',
    documents: { photo: 'profile_placeholder' }
  },
  {
    phone: '8888888888',
    email: 'ceo@kamaikart.com',
    fullName: 'Rajesh Kumar (CEO)',
    role: 'ceo',
    password: '1234',
    dob: '1985-08-20',
    gender: 'Male',
    state: 'Bihar',
    district: 'Patna',
    block: 'Phulwari',
    panchayat: 'Phulwari West',
    village: 'Phulwari',
    pinCode: '801505',
    aadhaarNo: '9876-5432-1098',
    panNo: 'XYZAB5678C',
    bankAccount: '990112233445',
    ifscCode: 'ICIC0001234',
    upiId: 'rajesh@okicici',
    emergencyContact: '8877665544',
    nomineeName: 'Anjali Kumar',
    nomineeRelation: 'Spouse',
    occupation: 'Executive',
    education: 'MBA',
    experienceYears: '15',
    kycStatus: 'approved',
    isActive: true,
    walletBalance: 450000,
    joinedAt: '2026-01-01T09:00:00.000Z',
    documents: { photo: 'profile_placeholder' }
  },
  {
    phone: '2222222222',
    email: 'kirana.gaya@gmail.com',
    fullName: 'Mahesh Shaw (Kirana Merchant)',
    role: 'merchant',
    password: '1234',
    dob: '1988-11-04',
    gender: 'Male',
    state: 'Bihar',
    district: 'Gaya',
    block: 'Bodhgaya',
    panchayat: 'Mastipur Panchayat',
    village: 'Mastipur',
    pinCode: '824231',
    aadhaarNo: '4455-6677-8899',
    panNo: 'MSHAW7788K',
    bankAccount: '302010405060',
    ifscCode: 'HDFC0000121',
    upiId: 'maheshkirana@okhdfc',
    emergencyContact: '9122334455',
    nomineeName: 'Sunita Shaw',
    nomineeRelation: 'Spouse',
    occupation: 'Retail Shopkeeper',
    education: 'Secondary School',
    experienceYears: '12',
    kycStatus: 'approved',
    isActive: true,
    walletBalance: 18450,
    joinedAt: '2026-04-12T11:30:00.000Z',
    documents: { photo: 'profile_placeholder', shopPhoto: 'shop_placeholder' }
  },
  {
    phone: '3333333333',
    email: 'suresh.ppm@kamaikart.net',
    fullName: 'Suresh Paswan (PPM Gaya)',
    role: 'ppm',
    password: '1234',
    dob: '1994-03-22',
    gender: 'Male',
    state: 'Bihar',
    district: 'Gaya',
    block: 'Bodhgaya',
    panchayat: 'Mastipur Panchayat',
    village: 'Bakraur',
    pinCode: '824231',
    aadhaarNo: '5566-7788-9900',
    panNo: 'SPASW9900L',
    bankAccount: '409010807060',
    ifscCode: 'BARB0BODHGA',
    upiId: 'sureshppm@okbaroda',
    emergencyContact: '9344556677',
    nomineeName: 'Rita Devi',
    nomineeRelation: 'Sister',
    occupation: 'Social Worker',
    education: 'Graduate',
    experienceYears: '4',
    kycStatus: 'approved',
    isActive: true,
    walletBalance: 6720,
    joinedAt: '2026-05-01T14:15:00.000Z',
    documents: { photo: 'profile_placeholder' }
  },
  {
    phone: '1111111111',
    email: 'ramesh.verma@gmail.com',
    fullName: 'Ramesh Verma (Rural Customer)',
    role: 'customer',
    password: '1234',
    dob: '1998-02-14',
    gender: 'Male',
    state: 'Bihar',
    district: 'Gaya',
    block: 'Bodhgaya',
    panchayat: 'Mastipur Panchayat',
    village: 'Bakraur',
    pinCode: '824231',
    aadhaarNo: '8899-0011-2233',
    panNo: 'RVERM3322M',
    bankAccount: '502010908070',
    ifscCode: 'IDIB000B021',
    upiId: 'ramesh@okindian',
    emergencyContact: '9001122334',
    nomineeName: 'Shanti Verma',
    nomineeRelation: 'Mother',
    occupation: 'Agriculture',
    education: 'Secondary School',
    experienceYears: '2',
    kycStatus: 'approved',
    isActive: true,
    walletBalance: 2450,
    joinedAt: '2026-06-15T16:00:00.000Z',
    documents: { photo: 'profile_placeholder' }
  }
];

export function getSystemState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // Fallback
    }
  }

  const defaultState = {
    accounts: DEFAULT_ACCOUNTS,
    currentUser: null as UserAccount | null,
    logs: [
      { id: 'l1', timestamp: new Date(Date.now() - 3600000).toISOString(), action: 'login_success', ip: '192.168.1.15', details: 'Satish Raj signed in from Chrome browser on Windows.', isSuspicious: false },
      { id: 'l2', timestamp: new Date(Date.now() - 7200000).toISOString(), action: 'kyc_approved', ip: '192.168.1.15', details: 'Mahesh Shaw Kirana KYC was verified and approved.', isSuspicious: false }
    ] as AuthLog[],
    notifications: [
      { id: 'n1', title: 'System Security Initialized', message: 'KamaiKart RBAC controls fully enforced with standard session policies.', type: 'security', timestamp: new Date().toISOString(), read: false },
      { id: 'n2', title: 'Welcome to RSPSA Corporate Portal', message: 'You can now switch between 18+ roles and manage configurations seamlessly.', type: 'welcome', timestamp: new Date().toISOString(), read: false }
    ] as AppNotification[],
    sessions: [
      { id: 's1', deviceType: 'Desktop Computer', browser: 'Google Chrome / Windows', location: 'Patna, Bihar, India', ip: '103.241.12.84', lastActive: 'Active Now', isCurrent: true },
      { id: 's2', deviceType: 'Android Smartphone', browser: 'KamaiKart App v2.4 / Android 13', location: 'Gaya, Bihar, India', ip: '157.34.182.10', lastActive: '2 hours ago', isCurrent: false }
    ] as SessionDevice[]
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
  return defaultState;
}

export function saveSystemState(state: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

interface EnterpriseAuthSystemProps {
  language: 'EN' | 'HI';
  onAuthSuccess: (user: UserAccount) => void;
  onClose: () => void;
}

export default function EnterpriseAuthSystem({ language, onAuthSuccess, onClose }: EnterpriseAuthSystemProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [selectedRole, setSelectedRole] = useState<PartnerRole>('customer');
  
  // Login fields
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 0, num2: 0 });

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpMedium, setOtpMedium] = useState<'sms' | 'email'>('sms');
  const [otpCode, setOtpCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [simulatedReceivedOtp, setSimulatedReceivedOtp] = useState('');

  // Register Fields (Multi-step)
  const [regStep, setRegStep] = useState(1);
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: 'Male',
    referralCode: '',
    state: 'Bihar',
    district: '',
    block: '',
    panchayat: '',
    village: '',
    pinCode: '',
    aadhaarNo: '',
    panNo: '',
    bankAccount: '',
    ifscCode: '',
    upiId: '',
    emergencyContact: '',
    nomineeName: '',
    nomineeRelation: 'Spouse',
    occupation: '',
    education: '',
    experienceYears: '0',
    agreeTerms: false
  });

  // KYC Upload documents state
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: boolean }>({});
  const [ocrScanning, setOcrScanning] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);

  // General feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize captcha challenge
  const resetCaptcha = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setCaptchaChallenge({ num1: n1, num2: n2 });
    setCaptchaAnswer('');
  };

  useEffect(() => {
    resetCaptcha();
  }, [authMode, loginMethod]);

  // Handle OTP countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  // Handle Registration Step 1 validation
  const validateRegStep1 = () => {
    if (!regForm.fullName.trim()) return 'Please enter your Full Legal Name.';
    if (!regForm.phone || regForm.phone.length !== 10 || isNaN(Number(regForm.phone))) return 'Please enter a valid 10-digit mobile number.';
    if (!regForm.password || regForm.password.length < 4) return 'Password must be at least 4 characters long.';
    if (regForm.password !== regForm.confirmPassword) return 'Passwords do not match.';
    if (!regForm.dob) return 'Please specify Date of Birth.';
    return '';
  };

  const validateRegStep2 = () => {
    if (!regForm.district.trim()) return 'District is required.';
    if (!regForm.block.trim()) return 'Block name is required.';
    if (!regForm.panchayat.trim()) return 'Panchayat is required.';
    if (!regForm.village.trim()) return 'Village name is required.';
    if (regForm.pinCode.length !== 6 || isNaN(Number(regForm.pinCode))) return 'Please provide a valid 6-digit PIN code.';
    return '';
  };

  const validateRegStep3 = () => {
    if (regForm.aadhaarNo.replace(/-/g, '').length !== 12) return 'Aadhaar must be exactly 12 digits.';
    if (!regForm.bankAccount || regForm.bankAccount.length < 9) return 'Please enter a valid Bank Account number.';
    if (!regForm.ifscCode || regForm.ifscCode.length !== 11) return 'IFSC code must be exactly 11 characters.';
    return '';
  };

  // Submit OTP Request
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const targetVal = loginMethod === 'otp' ? loginPhone : regForm.phone;
    if (!targetVal || targetVal.length !== 10) {
      setErrorMsg('Enter a valid 10-digit phone number first.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setSimulatedReceivedOtp(generatedOtp);
      setOtpSent(true);
      setOtpTimer(60);
      setOtpAttempts(0);
      setSuccessMsg(`Simulated OTP sent via ${otpMedium.toUpperCase()}: ${generatedOtp}`);
    }, 1200);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Check captcha
    const parsedAnswer = parseInt(captchaAnswer);
    if (isNaN(parsedAnswer) || parsedAnswer !== (captchaChallenge.num1 + captchaChallenge.num2)) {
      setErrorMsg('Incorrect Captcha Security Answer.');
      resetCaptcha();
      return;
    }

    const state = getSystemState();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (loginMethod === 'password') {
        // Authenticate by mobile/email & password
        const found = state.accounts.find((acc: any) => 
          (acc.phone === loginPhone || acc.email === loginEmail) && acc.password === loginPassword
        );

        if (!found) {
          setErrorMsg('Invalid Credentials. Please check your phone/email & password.');
          // Log failure
          const newLog: AuthLog = {
            id: 'log_' + Date.now(),
            timestamp: new Date().toISOString(),
            action: 'login_failed',
            ip: '103.241.12.84',
            details: `Failed sign-in attempt for identifier ${loginPhone || loginEmail}.`,
            isSuspicious: true
          };
          state.logs.unshift(newLog);
          saveSystemState(state);
          return;
        }

        if (!found.isActive) {
          setErrorMsg('This account is suspended. Contact Support executive.');
          return;
        }

        // Setup current session
        state.currentUser = found;
        const newLog: AuthLog = {
          id: 'log_' + Date.now(),
          timestamp: new Date().toISOString(),
          action: 'login_success',
          ip: '103.241.12.84',
          details: `${found.fullName} (${found.role.toUpperCase()}) authenticated successfully via password.`,
          isSuspicious: false
        };
        state.logs.unshift(newLog);
        
        // Add new login alert notification
        state.notifications.unshift({
          id: 'not_' + Date.now(),
          title: 'New Account Login Alert',
          message: `Your account was logged in from IP 103.241.12.84. Device: Desktop Chrome.`,
          type: 'security',
          timestamp: new Date().toISOString(),
          read: false
        });

        saveSystemState(state);
        onAuthSuccess(found);
      } else {
        // OTP authentication
        if (!otpSent) {
          setErrorMsg('Please request an OTP verification code first.');
          return;
        }
        if (otpCode !== simulatedReceivedOtp) {
          setOtpAttempts(prev => prev + 1);
          if (otpAttempts >= 2) {
            setErrorMsg('Max OTP attempts exceeded. Please generate a new code.');
            setOtpSent(false);
            setOtpCode('');
            return;
          }
          setErrorMsg(`Incorrect OTP code. ${2 - otpAttempts} attempts remaining.`);
          return;
        }

        const found = state.accounts.find((acc: any) => acc.phone === loginPhone);
        if (!found) {
          setErrorMsg('No partner account exists for this mobile number. Please register first.');
          return;
        }

        state.currentUser = found;
        const newLog: AuthLog = {
          id: 'log_' + Date.now(),
          timestamp: new Date().toISOString(),
          action: 'login_success',
          ip: '103.241.12.84',
          details: `${found.fullName} logged in securely using OTP validation.`,
          isSuspicious: false
        };
        state.logs.unshift(newLog);
        saveSystemState(state);
        onAuthSuccess(found);
      }
    }, 1500);
  };

  // Document upload simulation with OCR analysis
  const handleDocUpload = (docName: string) => {
    setOcrScanning(docName);
    setOcrResult(null);
    setTimeout(() => {
      setOcrScanning(null);
      setUploadedDocs(prev => ({ ...prev, [docName]: true }));
      let parsedText = '';
      if (docName === 'aadhaarFront') parsedText = 'GOVERNMENT OF INDIA - AADHAAR - NO: ' + regForm.aadhaarNo;
      else if (docName === 'pan') parsedText = 'INCOME TAX DEPARTMENT - PERMANENT ACCOUNT CARD: ' + regForm.panNo;
      else if (docName === 'cancelledCheque') parsedText = 'STATE BANK OF INDIA - A/C: ' + regForm.bankAccount;
      else parsedText = 'IMAGE ANALYSIS: Metadata Match Verified.';
      setOcrResult(`Simulated OCR Scan Approved: "${parsedText}"`);
    }, 2000);
  };

  // Complete multi-step registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regForm.agreeTerms) {
      setErrorMsg('You must review and agree to terms and conditions.');
      return;
    }

    const state = getSystemState();
    // Check duplication
    const duplicate = state.accounts.some((acc: any) => acc.phone === regForm.phone);
    if (duplicate) {
      setErrorMsg('A partner account with this phone number already exists.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      const newUser: UserAccount = {
        phone: regForm.phone,
        email: regForm.email,
        fullName: regForm.fullName,
        role: selectedRole,
        password: regForm.password,
        dob: regForm.dob,
        gender: regForm.gender,
        state: regForm.state,
        district: regForm.district,
        block: regForm.block,
        panchayat: regForm.panchayat,
        village: regForm.village,
        pinCode: regForm.pinCode,
        aadhaarNo: regForm.aadhaarNo,
        panNo: regForm.panNo,
        bankAccount: regForm.bankAccount,
        ifscCode: regForm.ifscCode,
        upiId: regForm.upiId,
        emergencyContact: regForm.emergencyContact,
        nomineeName: regForm.nomineeName,
        nomineeRelation: regForm.nomineeRelation,
        occupation: regForm.occupation || 'Self Employed',
        education: regForm.education || 'Graduate',
        experienceYears: regForm.experienceYears || '0',
        kycStatus: 'pending', // Starts pending document approval
        isActive: true,
        walletBalance: 0,
        joinedAt: new Date().toISOString(),
        documents: {
          aadhaarFront: uploadedDocs.aadhaarFront ? 'uploaded_ref' : undefined,
          aadhaarBack: uploadedDocs.aadhaarBack ? 'uploaded_ref' : undefined,
          pan: uploadedDocs.pan ? 'uploaded_ref' : undefined,
          photo: uploadedDocs.photo ? 'uploaded_ref' : undefined,
          shopPhoto: uploadedDocs.shopPhoto ? 'uploaded_ref' : undefined,
          bankPassbook: uploadedDocs.bankPassbook ? 'uploaded_ref' : undefined,
          cancelledCheque: uploadedDocs.cancelledCheque ? 'uploaded_ref' : undefined,
        }
      };

      state.accounts.push(newUser);
      
      // Post registration success log
      state.logs.unshift({
        id: 'log_' + Date.now(),
        timestamp: new Date().toISOString(),
        action: 'kyc_submitted',
        ip: '103.241.12.84',
        details: `New registration completed for ${newUser.fullName} as ${selectedRole.toUpperCase()}. Documents sent for approval.`,
        isSuspicious: false
      });

      // Welcome notifications
      state.notifications.unshift({
        id: 'not_reg_' + Date.now(),
        title: 'Boarding Registration Successful',
        message: `Welcome, ${newUser.fullName}! Your profile has been created with pending KYC state. Enterprise reviews complete within 24 hours.`,
        type: 'registration',
        timestamp: new Date().toISOString(),
        read: false
      });

      // Automatically sign in
      state.currentUser = newUser;
      saveSystemState(state);
      setSuccessMsg('Registration Successful! Redirecting to dashboard...');
      setTimeout(() => {
        onAuthSuccess(newUser);
      }, 1500);

    }, 2000);
  };

  // Fast switch to existing preset demo accounts (Admin/CEO/Merchant etc) for fast evaluation
  const handleDemoLogin = (phone: string) => {
    const state = getSystemState();
    const found = state.accounts.find((acc: any) => acc.phone === phone);
    if (found) {
      state.currentUser = found;
      state.logs.unshift({
        id: 'log_demo_' + Date.now(),
        timestamp: new Date().toISOString(),
        action: 'login_success',
        ip: '103.241.12.84',
        details: `Demo Instant Login used for ${found.fullName} (${found.role.toUpperCase()})`,
        isCurrent: true
      } as any);
      saveSystemState(state);
      onAuthSuccess(found);
    }
  };

  // Google Sign-in simulation
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate choosing the super admin or seed account
      handleDemoLogin('9999999999');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-950 w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row h-full max-h-[92vh] md:h-auto">
        
        {/* Left Side Banner Detail */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-brand-primary p-6 md:p-8 text-white flex flex-col justify-between md:w-5/12 text-center md:text-left shrink-0">
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-brand-accent animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-brand-accent">RSPSA SECURITY GATEWAY</span>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-extrabold font-display leading-tight">KamaiKart Portal</h3>
              <p className="text-[11px] text-gray-300 leading-normal">
                Enterprise Multi-Role Authentication, Verification & RBAC Access Dashboard Engine.
              </p>
            </div>
          </div>

          {/* Quick Evaluator Switcher - Essential for the testing of 18+ roles */}
          <div className="mt-6 pt-6 border-t border-white/10 text-left space-y-2">
            <p className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-wider">Fast-Track Evaluation logins:</p>
            <div className="grid grid-cols-2 gap-1.5 text-[9px]">
              <button 
                onClick={() => handleDemoLogin('9999999999')}
                className="py-1 px-2 bg-white/10 hover:bg-white/20 text-white rounded text-left truncate cursor-pointer transition-colors"
              >
                ⚙️ Super Admin
              </button>
              <button 
                onClick={() => handleDemoLogin('8888888888')}
                className="py-1 px-2 bg-white/10 hover:bg-white/20 text-white rounded text-left truncate cursor-pointer transition-colors"
              >
                👔 CEO Dashboard
              </button>
              <button 
                onClick={() => handleDemoLogin('2222222222')}
                className="py-1 px-2 bg-white/10 hover:bg-white/20 text-white rounded text-left truncate cursor-pointer transition-colors"
              >
                🏪 Kirana Merchant
              </button>
              <button 
                onClick={() => handleDemoLogin('3333333333')}
                className="py-1 px-2 bg-white/10 hover:bg-white/20 text-white rounded text-left truncate cursor-pointer transition-colors"
              >
                🤝 Panchayat PPM
              </button>
            </div>
            <p className="text-[8px] text-gray-400 mt-1">Default Password is <strong>1234</strong></p>
          </div>

          <div className="hidden md:block pt-4">
            <span className="text-[9px] text-gray-400 font-mono">v2.5 Enterprise Compliance</span>
          </div>
        </div>

        {/* Right Side Interaction Forms */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto p-5 sm:p-6 bg-gray-50 dark:bg-gray-950 max-h-[60vh] md:max-h-[85vh]">
          
          {/* Header row with close button */}
          <div className="flex justify-between items-center pb-3 border-b dark:border-gray-800">
            <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-brand-primary" />
              {authMode === 'login' && 'Sign-In Gateway'}
              {authMode === 'register' && `Boarding Step ${regStep} of 4`}
              {authMode === 'forgot' && 'Reset Security Credentials'}
            </span>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-500 cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Feedback logs */}
          {errorMsg && (
            <div className="mt-3 p-2.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl text-[11px] flex items-start gap-1.5 font-sans leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mt-3 p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl text-[11px] flex items-start gap-1.5 font-sans leading-relaxed">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Core Sign-In View */}
          {authMode === 'login' && (
            <div className="py-4 space-y-4">
              {/* Select login category: Password or OTP */}
              <div className="flex rounded-xl bg-gray-100 dark:bg-gray-900 p-1 border">
                <button
                  type="button"
                  onClick={() => { setLoginMethod('password'); setErrorMsg(''); }}
                  className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg cursor-pointer ${
                    loginMethod === 'password' ? 'bg-white dark:bg-gray-800 text-brand-primary dark:text-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  Password Sign-In
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginMethod('otp'); setErrorMsg(''); }}
                  className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg cursor-pointer ${
                    loginMethod === 'otp' ? 'bg-white dark:bg-gray-800 text-brand-primary dark:text-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  Secure OTP Sign-In
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-3.5 text-xs text-left">
                {loginMethod === 'password' ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 block uppercase">Phone Number or Email</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={loginPhone || loginEmail}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val.includes('@')) {
                              setLoginEmail(val);
                              setLoginPhone('');
                            } else {
                              setLoginPhone(val);
                              setLoginEmail('');
                            }
                          }}
                          placeholder="Enter Registered Mobile or Email"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 pl-9 pr-3 focus:ring-1 focus:ring-brand-primary focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Account Password</label>
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot')}
                          className="text-[10px] text-brand-primary font-extrabold hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                          type="password"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 pl-9 pr-3 focus:ring-1 focus:ring-brand-primary focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  /* OTP Login */
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 block uppercase">Mobile Number</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            maxLength={10}
                            value={loginPhone}
                            onChange={(e) => setLoginPhone(e.target.value)}
                            placeholder="Enter 10-Digit Mobile"
                            className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 pl-9 pr-3 focus:outline-hidden"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isLoading}
                          className="px-3.5 py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl shrink-0 cursor-pointer disabled:opacity-50 text-[11px]"
                        >
                          {otpSent ? 'Resend' : 'Send OTP'}
                        </button>
                      </div>
                    </div>

                    {otpSent && (
                      <div className="p-3 bg-brand-primary/5 rounded-xl border border-brand-primary/10 space-y-2 animate-fade-in">
                        <label className="text-[10px] font-bold text-gray-500 block uppercase">Enter Verification Code</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="6-Digit OTP"
                          className="w-full bg-white dark:bg-gray-900 border border-brand-primary text-center tracking-widest font-mono text-sm font-bold rounded-xl py-1.5 focus:outline-hidden"
                        />
                        <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                          <span>Expiry in {otpTimer}s</span>
                          <span>{otpAttempts} attempts of 3</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Captcha System - Security Requirement */}
                <div className="space-y-1.5 bg-gray-100/80 dark:bg-gray-900/40 p-3 rounded-xl border dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">Captcha Verification</span>
                    <button type="button" onClick={resetCaptcha} className="text-brand-primary font-bold hover:underline flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" /> Refresh
                    </button>
                  </div>
                  <div className="flex gap-3 items-center mt-1">
                    <span className="font-mono bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold px-3 py-1.5 rounded-lg border tracking-wider text-sm select-none">
                      {captchaChallenge.num1} + {captchaChallenge.num2} = ?
                    </span>
                    <input
                      type="text"
                      required
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      placeholder="Answer"
                      className="flex-1 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-1.5 px-3 focus:outline-hidden text-center font-bold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-500">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded accent-brand-primary"
                    />
                    Remember secure session
                  </label>
                  <span className="font-mono text-[9px] text-emerald-500 flex items-center gap-0.5">● SECURE SSL SHA-256</span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-brand-primary/10 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-t-white border-r-transparent animate-spin"></div>
                  ) : (
                    <LogIn className="w-4 h-4 text-white" />
                  )}
                  Authenticate Account
                </button>
              </form>

              {/* Federated Login option (Google) */}
              <div className="space-y-2.5 border-t dark:border-gray-800 pt-3.5">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-2 bg-white dark:bg-gray-900 hover:bg-gray-100 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl flex items-center justify-center gap-2 font-bold cursor-pointer transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.281 1.09 15.542 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.83 11.57-11.79 0-.79-.085-1.4-.185-1.925H12.24z"/>
                  </svg>
                  Connect with Google Account
                </button>

                <p className="text-center text-[11px] text-gray-400">
                  Not registered yet?{' '}
                  <button onClick={() => setAuthMode('register')} className="text-brand-primary font-bold hover:underline cursor-pointer">
                    Join KamaiKart Network
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Multi-step Registration View */}
          {authMode === 'register' && (
            <div className="py-2.5 space-y-4">
              
              {/* Progress Stepper bar */}
              <div className="grid grid-cols-4 gap-1 pb-2">
                {[
                  { step: 1, label: 'Profile' },
                  { step: 2, label: 'Address' },
                  { step: 3, label: 'Financial' },
                  { step: 4, label: 'Documents' }
                ].map((s) => (
                  <div key={s.step} className="text-center space-y-1">
                    <div className={`h-1.5 rounded-full transition-all ${
                      regStep >= s.step ? 'bg-brand-primary' : 'bg-gray-200 dark:bg-gray-800'
                    }`}></div>
                    <span className={`text-[8.5px] uppercase font-bold tracking-tight font-mono block ${
                      regStep === s.step ? 'text-brand-primary' : 'text-gray-400'
                    }`}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Core Multistep registration form container */}
              <form onSubmit={regStep === 4 ? handleRegisterSubmit : (e) => e.preventDefault()} className="space-y-4 text-xs text-left">
                
                {/* STEP 1: Basic Profile details */}
                {regStep === 1 && (
                  <div className="space-y-3.5 animate-fade-in">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 block uppercase">Ecosystem Partner Role *</label>
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as PartnerRole)}
                        className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden font-bold"
                      >
                        <option value="customer">Customer (Rural Buyer)</option>
                        <option value="merchant">Merchant (Village Kirana Store)</option>
                        <option value="ppm">PPM (Panchayat Point Manager)</option>
                        <option value="ppm-leader">PPM Leader (Block Supervisor)</option>
                        <option value="franchise">Block Franchise Depot</option>
                        <option value="distributor">Super Distributor</option>
                        <option value="warehouse-staff">Warehouse Logistics Staff</option>
                        <option value="delivery-partner">Delivery Partner</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 block uppercase">Full Legal Name (as in Aadhaar) *</label>
                      <input
                        type="text"
                        required
                        value={regForm.fullName}
                        onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                        placeholder="Satish Raj"
                        className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Mobile Number *</label>
                        <input
                          type="tel"
                          maxLength={10}
                          required
                          value={regForm.phone}
                          onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          placeholder="10-Digit Mobile"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Email Address (Optional)</label>
                        <input
                          type="email"
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          placeholder="satish@kamaikart.com"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Date of Birth *</label>
                        <input
                          type="date"
                          required
                          value={regForm.dob}
                          onChange={(e) => setRegForm({ ...regForm, dob: e.target.value })}
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Gender *</label>
                        <select
                          value={regForm.gender}
                          onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Account Password *</label>
                        <input
                          type="password"
                          required
                          value={regForm.password}
                          onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Confirm Password *</label>
                        <input
                          type="password"
                          required
                          value={regForm.confirmPassword}
                          onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                          placeholder="••••••••"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Address / Localization details */}
                {regStep === 2 && (
                  <div className="space-y-3.5 animate-fade-in">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-primary" /> Rural Address Location Hierarchy
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">State *</label>
                        <select
                          value={regForm.state}
                          onChange={(e) => setRegForm({ ...regForm, state: e.target.value })}
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        >
                          <option value="Bihar">Bihar</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">District *</label>
                        <input
                          type="text"
                          required
                          value={regForm.district}
                          onChange={(e) => setRegForm({ ...regForm, district: e.target.value })}
                          placeholder="E.g. Gaya"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Block Name *</label>
                        <input
                          type="text"
                          required
                          value={regForm.block}
                          onChange={(e) => setRegForm({ ...regForm, block: e.target.value })}
                          placeholder="E.g. Bodhgaya"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Gram Panchayat *</label>
                        <input
                          type="text"
                          required
                          value={regForm.panchayat}
                          onChange={(e) => setRegForm({ ...regForm, panchayat: e.target.value })}
                          placeholder="E.g. Mastipur"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Village Name *</label>
                        <input
                          type="text"
                          required
                          value={regForm.village}
                          onChange={(e) => setRegForm({ ...regForm, village: e.target.value })}
                          placeholder="E.g. Bakraur"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">PIN Code *</label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={regForm.pinCode}
                          onChange={(e) => setRegForm({ ...regForm, pinCode: e.target.value })}
                          placeholder="824231"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Emergency Phone *</label>
                        <input
                          type="tel"
                          maxLength={10}
                          required
                          value={regForm.emergencyContact}
                          onChange={(e) => setRegForm({ ...regForm, emergencyContact: e.target.value })}
                          placeholder="Emergency Mobile No"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Referral Code (Optional)</label>
                        <input
                          type="text"
                          value={regForm.referralCode}
                          onChange={(e) => setRegForm({ ...regForm, referralCode: e.target.value })}
                          placeholder="E.g. PPMWELCOME"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden text-brand-primary font-bold uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Financial credentials and Nominee */}
                {regStep === 3 && (
                  <div className="space-y-3.5 animate-fade-in">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5 text-brand-primary" /> Financial Identification Credentials
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Aadhaar Number *</label>
                        <input
                          type="text"
                          required
                          value={regForm.aadhaarNo}
                          onChange={(e) => setRegForm({ ...regForm, aadhaarNo: e.target.value })}
                          placeholder="0000-0000-0000"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">PAN Card Number (Optional for Customers)</label>
                        <input
                          type="text"
                          value={regForm.panNo}
                          onChange={(e) => setRegForm({ ...regForm, panNo: e.target.value.toUpperCase() })}
                          placeholder="ABCDE1234F"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 block uppercase">Bank Account Number *</label>
                      <input
                        type="text"
                        required
                        value={regForm.bankAccount}
                        onChange={(e) => setRegForm({ ...regForm, bankAccount: e.target.value })}
                        placeholder="E.g. 100910203040"
                        className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Bank IFSC Code *</label>
                        <input
                          type="text"
                          maxLength={11}
                          required
                          value={regForm.ifscCode}
                          onChange={(e) => setRegForm({ ...regForm, ifscCode: e.target.value.toUpperCase() })}
                          placeholder="SBIN0000010"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden font-mono uppercase"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">UPI ID *</label>
                        <input
                          type="text"
                          required
                          value={regForm.upiId}
                          onChange={(e) => setRegForm({ ...regForm, upiId: e.target.value })}
                          placeholder="satish@okpay"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-t dark:border-gray-800 pt-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Nominee Full Name</label>
                        <input
                          type="text"
                          value={regForm.nomineeName}
                          onChange={(e) => setRegForm({ ...regForm, nomineeName: e.target.value })}
                          placeholder="Nominee Name"
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 block uppercase">Nominee Relation</label>
                        <select
                          value={regForm.nomineeRelation}
                          onChange={(e) => setRegForm({ ...regForm, nomineeRelation: e.target.value })}
                          className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                        >
                          <option value="Spouse">Spouse</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Son">Son</option>
                          <option value="Daughter">Daughter</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Documents Upload & OCR Simulation */}
                {regStep === 4 && (
                  <div className="space-y-3.5 animate-fade-in">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-brand-primary" /> Upload Scanned Verification Documents (Image format)
                    </p>

                    <div className="grid grid-cols-2 gap-3.5">
                      {/* Aadhaar front */}
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-dashed dark:border-gray-800 flex flex-col justify-between items-center text-center gap-2">
                        <span className="text-[10px] font-bold text-gray-500">Aadhaar Card Front *</span>
                        {uploadedDocs.aadhaarFront ? (
                          <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5"><Check className="w-3 h-3" /> Uploaded</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDocUpload('aadhaarFront')}
                            disabled={ocrScanning !== null}
                            className="p-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary font-bold rounded-lg text-[9px] flex items-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" /> Attach
                          </button>
                        )}
                      </div>

                      {/* PAN front */}
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-dashed dark:border-gray-800 flex flex-col justify-between items-center text-center gap-2">
                        <span className="text-[10px] font-bold text-gray-500">PAN Card Image *</span>
                        {uploadedDocs.pan ? (
                          <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5"><Check className="w-3 h-3" /> Uploaded</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDocUpload('pan')}
                            disabled={ocrScanning !== null}
                            className="p-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary font-bold rounded-lg text-[9px] flex items-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" /> Attach
                          </button>
                        )}
                      </div>

                      {/* Cancelled Cheque */}
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-dashed dark:border-gray-800 flex flex-col justify-between items-center text-center gap-2">
                        <span className="text-[10px] font-bold text-gray-500">Bank Passbook / Cheque *</span>
                        {uploadedDocs.cancelledCheque ? (
                          <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5"><Check className="w-3 h-3" /> Uploaded</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDocUpload('cancelledCheque')}
                            disabled={ocrScanning !== null}
                            className="p-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary font-bold rounded-lg text-[9px] flex items-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" /> Attach
                          </button>
                        )}
                      </div>

                      {/* Profile Photo */}
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-dashed dark:border-gray-800 flex flex-col justify-between items-center text-center gap-2">
                        <span className="text-[10px] font-bold text-gray-500">Profile Photo *</span>
                        {uploadedDocs.photo ? (
                          <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5"><Check className="w-3 h-3" /> Uploaded</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDocUpload('photo')}
                            disabled={ocrScanning !== null}
                            className="p-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary font-bold rounded-lg text-[9px] flex items-center gap-1 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" /> Attach
                          </button>
                        )}
                      </div>
                    </div>

                    {/* OCR status visualization */}
                    {ocrScanning && (
                      <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl space-y-1.5 text-[10.5px]">
                        <div className="flex items-center gap-1.5 font-bold">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>AI Engine scanning document "{ocrScanning}"...</span>
                        </div>
                        <p className="text-[9.5px] text-gray-400">Verifying security parameters, OCR parsing, and checking facial identity metadata.</p>
                      </div>
                    )}

                    {ocrResult && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-[10px] font-mono leading-normal">
                        {ocrResult}
                      </div>
                    )}

                    <div className="flex items-start gap-2 pt-2 border-t dark:border-gray-800">
                      <input
                        type="checkbox"
                        required
                        checked={regForm.agreeTerms}
                        onChange={(e) => setRegForm({ ...regForm, agreeTerms: e.target.checked })}
                        className="mt-0.5 rounded"
                      />
                      <span className="text-[10px] text-gray-400 leading-normal">
                        I declare that all bank details, Aadhaar identity, and local descriptions are correct. I agree to RSPSA partner code guidelines.
                      </span>
                    </div>
                  </div>
                )}

                {/* Step navigation triggers */}
                <div className="flex justify-between items-center pt-4 border-t dark:border-gray-800">
                  {regStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => { setRegStep(prev => prev - 1); setErrorMsg(''); }}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                      className="text-gray-500 hover:underline font-bold text-[11px]"
                    >
                      Already standard partner? Sign In
                    </button>
                  )}

                  {regStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => {
                        let err = '';
                        if (regStep === 1) err = validateRegStep1();
                        else if (regStep === 2) err = validateRegStep2();
                        else if (regStep === 3) err = validateRegStep3();
                        if (err) {
                          setErrorMsg(err);
                          return;
                        }
                        setErrorMsg('');
                        setRegStep(prev => prev + 1);
                      }}
                      className="px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      Continue <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading || !uploadedDocs.aadhaarFront || !uploadedDocs.cancelledCheque || !uploadedDocs.photo}
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-extrabold rounded-xl flex items-center gap-1.5 cursor-pointer ml-auto shadow-md shadow-emerald-500/10"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 rounded-full border-2 border-t-white border-r-transparent animate-spin"></div>
                      ) : (
                        <CheckCircle2 className="w-4 h-4" />
                      )}
                      Finish Boarding
                    </button>
                  )}
                </div>

              </form>
            </div>
          )}

          {/* Forgot Password Mode */}
          {authMode === 'forgot' && (
            <div className="py-6 space-y-4 text-xs text-left">
              <p className="text-gray-500 leading-normal">
                Specify your registered 10-digit mobile number or email. We will dispatch a temporary security OTP token link to restore password access.
              </p>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 block uppercase">Mobile or Email Address</label>
                <input
                  type="text"
                  placeholder="E.g. satish@kamaikart.com or 10-digit mobile"
                  className="w-full bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl py-2 px-3 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-between items-center pt-3">
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-brand-primary font-bold hover:underline"
                >
                  Return to Sign-In
                </button>
                <button
                  onClick={() => {
                    setSuccessMsg('A security token link has been successfully simulated to your contact channel.');
                    setTimeout(() => { setAuthMode('login'); setSuccessMsg(''); }, 3000);
                  }}
                  className="px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  Send Recovery Link
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
