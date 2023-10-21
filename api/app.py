from flask import Flask, jsonify, request
import os
import json
from flask_cors import CORS
app = Flask(__name__)

# Define the path to the JSON file
tasks_file = "tasks.json"

# Load existing tasks from tasks.json
if os.path.exists(tasks_file):
    with open(tasks_file, 'r') as file:
        tasks = json.load(file)
else:
    tasks = []
CORS(app, resources={r"/tasks/*": {"origins": "http://localhost:4200"}})
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    task = {
        'id': len(tasks) + 1,
        'title': data['title'],
        'done': False
    }
    tasks.append(task)
    
    # Save tasks to the JSON file
    with open(tasks_file, 'w') as file:
        json.dump(tasks, file)
    
    return jsonify({'message': 'Task added successfully'})

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task:
        task['done'] = data['done']
        
        # Save tasks to the JSON file
        with open(tasks_file, 'w') as file:
            json.dump(tasks, file)
        
        return jsonify({'message': 'Task updated successfully'})
    return jsonify({'message': 'Task not found'}, 404)

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task:
        tasks.remove(task)
        
        # Save tasks to the JSON file
        with open(tasks_file, 'w') as file:
            json.dump(tasks, file)
        
        return jsonify({'message': 'Task deleted successfully'})
    return jsonify({'message': 'Task not found'}, 404)

if __name__ == '__main__':
    app.run(debug=True)
