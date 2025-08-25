package com.examly.springapp.service;

import com.examly.springapp.model.Room;
import com.examly.springapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByAvailable(true);
    }

    public Room getRoomById(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
    }
}