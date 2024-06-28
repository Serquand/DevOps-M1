const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    is_complete: Boolean,
    due_date: Date,
});
const Todo = mongoose.model('Todo', todoSchema);

describe('Todos API', () => {
    beforeAll(async () => {
        const url = `mongodb+srv://Serkan:J8zn3kGeLadw7fV7@cluster0.6smcpie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
            due_date: '2023-12-31',
            is_complete: false
        };

        const task = new Todo(newTask);
        await task.save();
        taskId = task._id;

        const savedTask = await Todo.findById(taskId);
        expect(savedTask).not.toBeNull();
        expect(savedTask.title).toBe(newTask.title);
        expect(savedTask.description).toBe(newTask.description);
        expect(new Date(savedTask.due_date)).toEqual(new Date(newTask.due_date));
        expect(savedTask.is_complete).toBe(false);
    });

    it('should get all tasks', async () => {
        const tasks = await Todo.find();
        expect(tasks.length).toBeGreaterThan(0);
    });

    it('should update a task to complete', async () => {
        await Todo.findByIdAndUpdate(taskId, { is_complete: true });

        const updatedTask = await Todo.findById(taskId);
        expect(updatedTask.is_complete).toBe(true);
    });

    it('should delete a task', async () => {
        await Todo.findByIdAndDelete(taskId);

        const deletedTask = await Todo.findById(taskId);
        expect(deletedTask).toBeNull();
    });
});
