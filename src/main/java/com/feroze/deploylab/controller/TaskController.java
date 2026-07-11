package com.feroze.deploylab.controller;

import com.feroze.deploylab.model.Task;
import com.feroze.deploylab.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PutMapping("/{id}/complete")
public Task completeTask(@PathVariable Long id) {

    Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));

    task.setCompleted(true);

    return taskRepository.save(task);
}

@DeleteMapping("/{id}")
public void deleteTask(@PathVariable Long id) {

    taskRepository.deleteById(id);
}
}