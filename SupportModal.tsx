import React, { useState } from 'react';
import { X, User, Camera, Save, Calendar, Phone, Mail, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    gender: user?.gender || '',
    dateOfBirth: user?.dateOfBirth || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateUser(formData);
    setIsSaving(false);
    setSaved(true);
    
    setTimeout(() => setSaved(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black">Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isAuthenticated ? (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Sign in to view profile
              </h3>
              <p className="text-gray-500 text-sm">
                Create an account to manage your profile settings.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#FFD36A] to-[#FF8A3D] flex items-center justify-center overflow-hidden">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-white" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-black flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Tap to change profile picture
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Gender */}
                <div>
                  <label className="flex items-center text-sm font-medium text-black mb-2">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30 bg-white"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="flex items-center text-sm font-medium text-black mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center text-sm font-medium text-black mb-2">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                    placeholder="+975 17XXXXXX"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-sm font-medium text-black mb-2">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-black outline-none transition-all focus:border-[#FFD36A] focus:ring-2 focus:ring-[#FFD36A]/30"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Document Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-black">
                    Profile Documentation
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Document Type</span>
                    <span className="text-black capitalize">
                      {user?.documentType?.replace('_', ' ') || 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Document ID</span>
                    <span className="text-black font-mono">
                      {user?.documentId || 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">KYC Status</span>
                    <span className={`font-medium ${user?.kycCompleted ? 'text-green-600' : 'text-yellow-600'}`}>
                      {user?.kycCompleted ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full rounded-full bg-gradient-to-r from-[#FFD36A] to-[#FF8A3D] py-3 font-semibold text-white shadow-lg shadow-[#FFD36A]/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : saved ? (
                  <>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
