import request from 'supertest';
import express from 'express';
import router from '../../src/routes/userRoutes';
import User from '../../src/models/User';

const app = express();
app.use(express.json());
app.use('/users', router);

// Mock the User model
jest.mock('../../src/models/User');

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should fetch all users', async () => {
      const mockUsers = [
        { 
            _id: '1', 
            firstName: 'Joanne', 
            lastName: 'Kim', 
            email:'joannekim@email.com', 
            password: 'wildflower' 
        }, 
        { 
            _id: '2', 
            firstName: 'Andi', 
            lastName: 'Wang', 
            email:'aurndi@email.com', 
            password: 'pizza'
        }
    ];
      (User.find as jest.Mock).mockResolvedValue(mockUsers);

      const res = await request(app).get('/users');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUsers);
    });

    it('should handle errors when fetching all users', async () => {
      (User.find as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/users');

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error fetching users');
    });
  });

  describe('GET /users/:id', () => {
    it('should fetch a user by ID', async () => {
      const mockUser = { _id: '1', name: 'John' };
      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).get('/users/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUser);
    });

    it('should return 404 if the user is not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/users/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should handle errors when fetching a user by ID', async () => {
      (User.findById as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const res = await request(app).get('/users/1');

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error fetching user');
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const mockUser = 
      { 
        _id: '1', 
        firstName: 'Joanne', 
        lastName: 'Kim', 
        email:'joannekim@email.com', 
        password: 'wildflower'  
    };
      (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).post('/users').send( 
        {
        firstName: 'Joanne', 
        lastName: 'Kim', 
        email:'joannekim@email.com', 
        password: 'wildflower' 
    });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockUser);
    });

    it('should handle errors when creating a user', async () => {
      (User.prototype.save as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const res = await request(app).post('/users').send({ firstName: 'Joanne' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Error creating user');
    });
  });

  describe('POST /login', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear any mocks before each test
    });
  
    it('should return 401 if user is not found', async () => {
      // Mock User.findOne to return null (user not found)
      User.findOne = jest.fn().mockResolvedValue(null);
  
      const res = await request(app)
      .post('/users/login')
      .send({ email: 'nonexistent@example.com', password: 'password123' });
  
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
    });
  
    it('should return 401 if password is incorrect', async () => {
      // Mock User.findOne to return a user with an incorrect password
      const mockUser = { _id: '123', email: 'user@example.com', password: 'correctpassword' };
      User.findOne = jest.fn().mockResolvedValue(mockUser);
  
      const res = await request(app)
      .post('/users/login')
      .send({ email: 'user@example.com', password: 'wrongpassword' });
  
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
      expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
    });
  
    it('should return 200 if email and password match', async () => {
      // Mock User.findOne to return a user with the correct password
      const mockUser = { _id: '123', email: 'user@example.com', password: 'correctpassword' };
      User.findOne = jest.fn().mockResolvedValue(mockUser);
  
      const res = await request(app)
      .post('/users/login')
      .send({ email: 'user@example.com', password: 'correctpassword' });
  
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Login successful');
      expect(res.body.userId).toBe(mockUser._id);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
    });
  
    it('should return 500 if there is a server error', async () => {
      // Mock User.findOne to throw an error
      User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));
  
      const res = await request(app)
        .post('/users/login')
        .send({ email: 'user@example.com', password: 'password123' });
  
      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Internal server error');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
        const mockUser = 
        { 
          _id: '1', 
          firstName: 'Joanne', 
          lastName: 'Kim', 
          email:'joannekim@email.com', 
          password: 'wildflower'  
      };
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).put('/users/1').send({ firstName: 'Joanne Updated' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUser);
    });

    it('should return 404 if the user to update is not found', async () => {
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const res = await request(app).put('/users/1').send({ firstName: 'Joanne Updated' });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should handle errors when updating a user', async () => {
      (User.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const res = await request(app).put('/users/1').send({ firstName: 'Joanne Updated' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Error updating user');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      (User.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: '1', firstName: 'Joanne' });

      const res = await request(app).delete('/users/1');

      expect(res.status).toBe(204);
    });

    it('should return 404 if the user to delete is not found', async () => {
      (User.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const res = await request(app).delete('/users/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should handle errors when deleting a user', async () => {
      (User.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('DB Error'));

      const res = await request(app).delete('/users/1');

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error deleting user');
    });
  });
});
