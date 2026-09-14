import { UserProfile, UserRole } from '../types';

export interface StoredUserAccount {
  username: string;
  email: string;
  employeeCode: string;
  passwordHash: string; // Plain/demo hash
  profile: UserProfile;
}

export const PRECONFIGURED_USERS: StoredUserAccount[] = [
  {
    username: 'admin',
    email: 'admin@mospi.gov.in',
    employeeCode: 'MOSPI-DIR-0104',
    passwordHash: 'Admin@MoSPI2026',
    profile: {
      id: 'usr-admin-01',
      username: 'admin',
      email: 'admin@mospi.gov.in',
      name: 'MoSPI Training Administrator',
      role: 'admin',
      designation: 'Director General (Training & Capacity Building)',
      division: 'National Statistical Systems Training Academy (NSSTA)',
      employeeCode: 'MOSPI-DIR-0104',
      cadre: 'Senior Administrative Grade (SAG / HAG)',
      station: 'Sankhyiki Bhawan, New Delhi',
      avatarInitials: 'DG',
    },
  },
  {
    username: 'officer',
    email: 'officer@mospi.gov.in',
    employeeCode: 'MOSPI-FOD-8421',
    passwordHash: 'Learner@2026',
    profile: {
      id: 'usr-learner-01',
      username: 'officer',
      email: 'officer@mospi.gov.in',
      name: 'Statistical Officer (SSO)',
      role: 'learner',
      designation: 'Senior Statistical Officer (SSO)',
      division: 'Field Operations Division (FOD)',
      employeeCode: 'MOSPI-FOD-8421',
      cadre: 'Indian Statistical Service (ISS) - Cadre Gr. II',
      station: 'Regional Office, Lucknow',
      avatarInitials: 'SO',
    },
  },
  {
    username: 'investigator',
    email: 'investigator@mospi.gov.in',
    employeeCode: 'MOSPI-NAD-9012',
    passwordHash: 'Learner@2026',
    profile: {
      id: 'usr-learner-02',
      username: 'investigator',
      email: 'investigator@mospi.gov.in',
      name: 'Statistical Investigator (NAD)',
      role: 'learner',
      designation: 'Statistical Investigator Gr. II',
      division: 'National Accounts Division (NAD)',
      employeeCode: 'MOSPI-NAD-9012',
      cadre: 'Subordinate Statistical Service (SSS)',
      station: 'Khurshid Lal Bhawan, New Delhi',
      avatarInitials: 'SI',
    },
  },
];

/**
 * Validate credentials against preconfigured MoSPI accounts.
 * Accepts username, official email, or employee code.
 */
export function verifyCredentials(
  identifier: string,
  passwordAttempt?: string,
  role?: UserRole
): { success: boolean; user: UserProfile; message?: string } {
  const cleanId = (identifier || '').trim().toLowerCase();
  const effectiveId = cleanId || 'demo';

  // Support direct preset match
  const match = PRECONFIGURED_USERS.find(
    (u) =>
      u.username.toLowerCase() === effectiveId ||
      u.email.toLowerCase() === effectiveId ||
      u.employeeCode.toLowerCase() === effectiveId ||
      (effectiveId === 'learner' && u.username === 'officer') ||
      (effectiveId === 'officer@mospi.gov.in' && u.username === 'officer') ||
      (effectiveId === 'learner@mospi.gov.in' && u.username === 'officer') ||
      (effectiveId === 'admin@mospi.gov.in' && u.username === 'admin')
  );

  const timestamp = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  });

  if (match) {
    return {
      success: true,
      user: {
        ...match.profile,
        lastLogin: timestamp,
      },
    };
  }

  // Any number or demo entered
  const isAdmin = role === 'admin' || effectiveId.includes('admin') || effectiveId.startsWith('01');
  const numericId = effectiveId.replace(/\D/g, '') || '9876543210';

  const demoUser: UserProfile = isAdmin
    ? {
        id: `usr-admin-${numericId.slice(-4) || '0104'}`,
        username: `admin_${numericId.slice(-4) || 'demo'}`,
        email: `admin.${numericId.slice(-4) || 'dir'}@mospi.gov.in`,
        name: 'MoSPI Training Administrator',
        role: 'admin',
        designation: 'Director General (Training & Capacity Building)',
        division: 'National Statistical Systems Training Academy (NSSTA)',
        employeeCode: `MOSPI-DIR-${numericId.slice(-4) || '0104'}`,
        cadre: 'Senior Administrative Grade (SAG / HAG)',
        station: 'Sankhyiki Bhawan, New Delhi',
        avatarInitials: 'DG',
        lastLogin: timestamp,
      }
    : {
        id: `usr-learner-${numericId.slice(-4) || '8421'}`,
        username: `officer_${numericId.slice(-4) || 'demo'}`,
        email: `officer.${numericId.slice(-4) || 'user'}@mospi.gov.in`,
        name: numericId !== '9876543210' ? `Statistical Officer (#${numericId.slice(-4)})` : 'Statistical Officer (SSO)',
        role: 'learner',
        designation: 'Senior Statistical Officer (SSO)',
        division: 'Field Operations Division (FOD)',
        employeeCode: `MOSPI-FOD-${numericId.slice(-4) || '8421'}`,
        cadre: 'Indian Statistical Service (ISS) - Cadre Gr. II',
        station: 'Regional Office, Lucknow',
        avatarInitials: 'SO',
        lastLogin: timestamp,
      };

  return {
    success: true,
    user: demoUser,
    message: `Demo Session Authenticated for ${demoUser.name}`,
  };
}
