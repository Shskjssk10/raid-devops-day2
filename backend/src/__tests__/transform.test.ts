import { describe, it, expect } from 'vitest';
import { transformUserData, extractCompanyDomain, getUsersFromDatabase } from '../index';

describe('transformUserData', () => {
  it('should transform user object by splitting full name into first and last name', () => {
    const mockUser = {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
    };

    const result = transformUserData(mockUser);

    expect(result).toEqual({
      id: 1,
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice@example.com',
    });
  });

  it('should handle single name correctly', () => {
    const mockUser = {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
    };

    const result = transformUserData(mockUser);

    expect(result.first_name).toBe('Bob');
    expect(result.last_name).toBe(undefined);
    expect(result.id).toBe(2);
    expect(result.email).toBe('bob@example.com');
  });

  it('should preserve id and email fields', () => {
    const mockUser = {
      id: 999,
      name: 'Carol Williams',
      email: 'carol.williams@example.com',
    };

    const result = transformUserData(mockUser);

    expect(result.id).toBe(999);
    expect(result.email).toBe('carol.williams@example.com');
  });

  it('should have correct property names in output', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    };

    const result = transformUserData(mockUser);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('first_name');
    expect(result).toHaveProperty('last_name');
    expect(result).toHaveProperty('email');
  });
});

describe('extractCompanyDomain', () => {
  it('should extract the company domain from a user email', () => {
    const email = 'alice@example.com';
    const result = extractCompanyDomain(email);
    expect(result).toBe('example.com');
  });
});

describe('getUsersFromDatabase', () => {
  it('should return an array of user objects', () => {
    const users = getUsersFromDatabase();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });
});