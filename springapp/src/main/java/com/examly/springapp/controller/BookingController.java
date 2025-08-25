package com.examly.springapp.controller;

import com.examly.springapp.exception.BadRequestException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.*;
import com.examly.springapp.repository.*;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate; 
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000") // React runs on 3000
public class BookingController {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public BookingController(BookingRepository bookingRepository, RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    

    @PostMapping
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody BookingRequest request) {
        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + request.getRoomId()));

        if (!room.getAvailable()) {
            throw new BadRequestException("Room is not available");
        }

        if (!request.getGuestEmail().matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            throw new BadRequestException("Invalid email format");
        }

        if (!request.getCheckOutDate().isAfter(request.getCheckInDate())) {
            throw new BadRequestException("Check-out date must be after check-in date");
        }

        long days = ChronoUnit.DAYS.between(request.getCheckInDate(), request.getCheckOutDate());
        double totalPrice = days * room.getPricePerNight();

        Booking booking = new Booking(
                null,
                room,
                request.getGuestName(),
                request.getGuestEmail(),
                request.getCheckInDate(),
                request.getCheckOutDate(),
                totalPrice,
                "PENDING",
                LocalDate.now()
        );

        Booking savedBooking = bookingRepository.save(booking);
        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    @PutMapping("/{id}/status")
    public Booking updateBookingStatus(@PathVariable Long id, @RequestBody StatusRequest statusRequest) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        if (!statusRequest.getStatus().matches("APPROVED|REJECTED")) {
            throw new BadRequestException("Invalid status");
        }

        
        booking.setStatus(statusRequest.getStatus());
        bookingRepository.save(booking);

        Room room = booking.getRoom();
        // Room becomes unavailable if booking is approved, and stays available if rejected
        room.setAvailable("REJECTED".equals(statusRequest.getStatus()));
        roomRepository.save(room);

        return booking;
    }
}