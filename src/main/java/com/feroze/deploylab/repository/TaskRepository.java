package com.feroze.deploylab.repository;

import com.feroze.deploylab.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
