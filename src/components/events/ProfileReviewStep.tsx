'use client';

import { useState } from 'react';
import { HiOutlinePencil, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';

interface ProfileData {
  phone: string;
  address: string;
  spouseName: string;
  spouseEmail: string;
  spousePhone: string;
  children: { name: string; age: string }[];
}

interface ProfileReviewStepProps {
  profile: ProfileData;
  memberName: string;
  onChange: (updated: ProfileData) => void;
}

export default function ProfileReviewStep({ profile, memberName, onChange }: ProfileReviewStepProps) {
  const [editingSection, setEditingSection] = useState<'contact' | 'spouse' | 'children' | null>(null);

  const hasSpouseData = !!(profile.spouseName || profile.spouseEmail || profile.spousePhone);

  const updateField = (field: keyof ProfileData, value: string) => {
    onChange({ ...profile, [field]: value });
  };

  const updateChild = (index: number, field: 'name' | 'age', value: string) => {
    const updated = [...profile.children];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...profile, children: updated });
  };

  const addChild = () => {
    onChange({ ...profile, children: [...profile.children, { name: '', age: '' }] });
  };

  const removeChild = (index: number) => {
    onChange({ ...profile, children: profile.children.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Review Your Profile</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Please verify your details are up to date. Click &quot;Edit&quot; to make changes.
      </p>

      {/* Contact Details */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Details</h4>
          <button
            type="button"
            onClick={() => setEditingSection(editingSection === 'contact' ? null : 'contact')}
            className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
          >
            <HiOutlinePencil className="w-3 h-3" />
            {editingSection === 'contact' ? 'Done' : 'Edit'}
          </button>
        </div>
        {editingSection === 'contact' ? (
          <div className="space-y-2">
            <div>
              <label className="label">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="input"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Name</span>
              <span className="text-gray-900 dark:text-gray-100">{memberName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Phone</span>
              <span className="text-gray-900 dark:text-gray-100">{profile.phone || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Address</span>
              <span className="text-gray-900 dark:text-gray-100">{profile.address || '—'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Spouse Details */}
      {(hasSpouseData || editingSection === 'spouse') && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Spouse Details</h4>
            <button
              type="button"
              onClick={() => setEditingSection(editingSection === 'spouse' ? null : 'spouse')}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
            >
              <HiOutlinePencil className="w-3 h-3" />
              {editingSection === 'spouse' ? 'Done' : 'Edit'}
            </button>
          </div>
          {editingSection === 'spouse' ? (
            <div className="space-y-2">
              <div>
                <label className="label">Spouse Name</label>
                <input
                  type="text"
                  value={profile.spouseName}
                  onChange={(e) => updateField('spouseName', e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Spouse Email</label>
                <input
                  type="email"
                  value={profile.spouseEmail}
                  onChange={(e) => updateField('spouseEmail', e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Spouse Phone</label>
                <input
                  type="tel"
                  value={profile.spousePhone}
                  onChange={(e) => updateField('spousePhone', e.target.value)}
                  className="input"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Name</span>
                <span className="text-gray-900 dark:text-gray-100">{profile.spouseName || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Email</span>
                <span className="text-gray-900 dark:text-gray-100">{profile.spouseEmail || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Phone</span>
                <span className="text-gray-900 dark:text-gray-100">{profile.spousePhone || '—'}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Spouse button when no spouse data exists */}
      {!hasSpouseData && editingSection !== 'spouse' && (
        <button
          type="button"
          onClick={() => setEditingSection('spouse')}
          className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
        >
          <HiOutlinePlus className="w-3 h-3" />
          Add Spouse Details
        </button>
      )}

      {/* Children */}
      {(profile.children.length > 0 || editingSection === 'children') && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Children</h4>
            <button
              type="button"
              onClick={() => setEditingSection(editingSection === 'children' ? null : 'children')}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
            >
              <HiOutlinePencil className="w-3 h-3" />
              {editingSection === 'children' ? 'Done' : 'Edit'}
            </button>
          </div>
          {editingSection === 'children' ? (
            <div className="space-y-3">
              {profile.children.map((child, idx) => (
                <div key={idx} className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      value={child.name}
                      onChange={(e) => updateChild(idx, 'name', e.target.value)}
                      className="input"
                    />
                  </div>
                  <div className="w-20">
                    <label className="label">Age</label>
                    <input
                      type="text"
                      value={child.age}
                      onChange={(e) => updateChild(idx, 'age', e.target.value)}
                      className="input"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeChild(idx)}
                    className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addChild}
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                <HiOutlinePlus className="w-3 h-3" />
                Add Child
              </button>
            </div>
          ) : (
            <div className="space-y-1 text-sm">
              {profile.children.map((child, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-gray-900 dark:text-gray-100">{child.name || '(no name)'}</span>
                  <span className="text-gray-500 dark:text-gray-400">{child.age ? `Age ${child.age}` : ''}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Children button when no children exist */}
      {profile.children.length === 0 && editingSection !== 'children' && (
        <button
          type="button"
          onClick={() => {
            addChild();
            setEditingSection('children');
          }}
          className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
        >
          <HiOutlinePlus className="w-3 h-3" />
          Add Children
        </button>
      )}
    </div>
  );
}
