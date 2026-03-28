import { useState, useCallback } from 'react';

const STORAGE_KEY = 'drugwise_user_profile';

const DEFAULT_PROFILE = {
  name: 'Nguyen An Loc',
  gender: 'Male',
  role: 'Patient',
  phone: '+65 9131 5790',
  email: 'anlocngdz@gmail.com',
  age: 20,
  location: 'Singapore',
  avatarUrl: null,
  avatarFrame: 'none',
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export default function useUserProfile() {
  const [profile, setProfile] = useState(loadProfile);

  const updateAvatar = useCallback((base64String) => {
    setProfile((prev) => {
      const next = { ...prev, avatarUrl: base64String };
      saveProfile(next);
      return next;
    });
  }, []);

  const updateFrame = useCallback((frameName) => {
    setProfile((prev) => {
      const next = { ...prev, avatarFrame: frameName };
      saveProfile(next);
      return next;
    });
  }, []);

  const resetAvatar = useCallback(() => {
    setProfile((prev) => {
      const next = { ...prev, avatarUrl: null };
      saveProfile(next);
      return next;
    });
  }, []);

  return { profile, updateAvatar, updateFrame, resetAvatar };
}
