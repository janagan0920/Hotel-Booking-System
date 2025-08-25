package com.examly.springapp.controller;

import com.examly.springapp.model.Room;
import com.examly.springapp.repository.RoomRepository;
import com.examly.springapp.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:3000") // React runs on 3000
public class RoomController {
    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @GetMapping("/available")
    public List<Room> getAvailableRooms() {
        return roomRepository.findByAvailable(true);
    }

    @GetMapping("/{id}")
    public Room getRoomById(@PathVariable Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        Room savedRoom = roomRepository.save(room);
        return new ResponseEntity<>(savedRoom, HttpStatus.CREATED);
    }
}
