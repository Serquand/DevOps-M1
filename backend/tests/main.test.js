const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const todos = require('../routes/todos.routes');

const app = express();
app.use(express.json());
app.use('/todos', todos);

describe('Todos API', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/todo_test`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    let taskId;

    it('should create a new task', async () => {
        const newTask = {
            title: 'Test Task',
            description: 'This is a test task',
            due_date: '2023-12-31'
        };

        const response = await request(app)
            .post('/todos')
            .send(newTask)
            .expect(201);

        taskId = response.body._id;

        expect(response.body.title).toBe(newTask.title);
        expect(response.body.description).toBe(newTask.description);
        expect(new Date(response.body.due_date)).toEqual(new Date(newTask.due_date));
        expect(response.body.is_complete).toBe(false);
    });

    it('should get all tasks', async () => {
        const response = await request(app)
            .get('/todos')
            .expect(200);

        expect(response.body.todos.length).toBeGreaterThan(0);
        expect(response.body.done.length).toBe(0);
    });

    it('should update a task to complete', async () => {
        const response = await request(app)
            .patch(`/todos/complete/${taskId}`)
            .send({ is_complete: true })
            .expect(200);

        expect(response.body.is_complete).toBe(true);
    });

    it('should delete a task', async () => {
        await request(app)
            .delete(`/todos/${taskId}`)
            .expect(204);

        const response = await request(app)
            .get('/todos')
            .expect(200);

        expect(response.body.todos.length).toBe(0);
    });
});