const { User } = require('../../src/models/user');
const { getAllUsers, getUnapprovedAlumni } = require('../../src/controllers/userController');

// Mock response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('User Controller Unit Tests', () => {
  describe('getAllUsers', () => {
    it('should return all users successfully', async () => {
      // Create test users
      await User.create([
        { email: 'user1@test.com', password: 'pass1', role: 'alumni' },
        { email: 'user2@test.com', password: 'pass2', role: 'admin' }
      ]);

      const req = {};
      const res = mockResponse();

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          users: expect.any(Array)
        }
      });

      const jsonCall = res.json.mock.calls[0][0];
      expect(jsonCall.data.users).toHaveLength(2);
    });

    it('should handle errors gracefully', async () => {
      // Mock User.find to throw an error
      jest.spyOn(User, 'find').mockRejectedValueOnce(new Error('Database error'));

      const req = {};
      const res = mockResponse();

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Internal Server Error'
      });

      // Restore the original implementation
      User.find.mockRestore();
    });
  });

  describe('getUnapprovedAlumni', () => {
    beforeEach(async () => {
      // Create test data
      await User.create([
        { email: 'approved@test.com', password: 'pass1', role: 'alumni', isApproved: true },
        { email: 'unapproved@test.com', password: 'pass2', role: 'alumni', isApproved: false },
        { email: 'admin@test.com', password: 'pass3', role: 'admin', isApproved: true }
      ]);
    });

    it('should return only unapproved alumni', async () => {
      const req = {};
      const res = mockResponse();

      await getUnapprovedAlumni(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          alumni: expect.any(Array)
        }
      });

      const jsonCall = res.json.mock.calls[0][0];
      expect(jsonCall.data.alumni).toHaveLength(1);
      expect(jsonCall.data.alumni[0].email).toBe('unapproved@test.com');
      expect(jsonCall.data.alumni[0].isApproved).toBe(false);
    });

    it('should return empty array when no unapproved alumni exist', async () => {
      // Update all alumni to be approved
      await User.updateMany({ role: 'alumni' }, { isApproved: true });

      const req = {};
      const res = mockResponse();

      await getUnapprovedAlumni(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      const jsonCall = res.json.mock.calls[0][0];
      expect(jsonCall.data.alumni).toHaveLength(0);
    });

    it('should handle database errors', async () => {
      // Mock User.find to throw an error
      jest.spyOn(User, 'find').mockRejectedValueOnce(new Error('Database connection failed'));

      const req = {};
      const res = mockResponse();

      await getUnapprovedAlumni(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Internal Server Error'
      });

      User.find.mockRestore();
    });
  });
});
