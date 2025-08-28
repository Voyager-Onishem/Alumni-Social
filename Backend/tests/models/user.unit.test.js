const { User } = require('../../src/models/user');

describe('User Model Unit Tests', () => {
  describe('User Schema Validation', () => {
    it('should create a user successfully with valid data', async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'testpassword',
        role: 'alumni',
        isApproved: true
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.role).toBe(userData.role);
      expect(savedUser.isApproved).toBe(userData.isApproved);
    });

    it('should fail validation without required email', async () => {
      const userData = {
        password: 'testpassword',
        role: 'alumni'
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should fail validation without required password', async () => {
      const userData = {
        email: 'testuser@example.com',
        role: 'alumni'
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should fail validation with invalid role', async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'testpassword',
        role: 'invalid_role'
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
    });

    it('should set default isApproved to false', async () => {
      const userData = {
        email: 'testuser@example.com',
        password: 'testpassword',
        role: 'alumni'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.isApproved).toBe(false);
    });
  });

  describe('User Query Operations', () => {
    beforeEach(async () => {
      // Create test users
      await User.create([
        {
          email: 'alumni1@example.com',
          password: 'password1',
          role: 'alumni',
          isApproved: true
        },
        {
          email: 'alumni2@example.com',
          password: 'password2',
          role: 'alumni',
          isApproved: false
        },
        {
          email: 'admin@example.com',
          password: 'adminpass',
          role: 'admin',
          isApproved: true
        }
      ]);
    });

    it('should find approved alumni', async () => {
      const approvedAlumni = await User.find({ role: 'alumni', isApproved: true });
      
      expect(approvedAlumni).toHaveLength(1);
      expect(approvedAlumni[0].email).toBe('alumni1@example.com');
    });

    it('should find unapproved alumni', async () => {
      const unapprovedAlumni = await User.find({ role: 'alumni', isApproved: false });
      
      expect(unapprovedAlumni).toHaveLength(1);
      expect(unapprovedAlumni[0].email).toBe('alumni2@example.com');
    });

    it('should find users by role', async () => {
      const adminUsers = await User.find({ role: 'admin' });
      const alumniUsers = await User.find({ role: 'alumni' });
      
      expect(adminUsers).toHaveLength(1);
      expect(alumniUsers).toHaveLength(2);
    });

    it('should find user by email', async () => {
      const user = await User.findOne({ email: 'admin@example.com' });
      
      expect(user).toBeTruthy();
      expect(user.role).toBe('admin');
      expect(user.isApproved).toBe(true);
    });
  });
});
