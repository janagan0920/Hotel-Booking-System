package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
import com.examly.springapp.model.Room;
import com.examly.springapp.repository.BookingRepository;
import com.examly.springapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        return booking.orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    public Booking createBooking(Booking booking) {
        // Validate room exists
        Room room = roomRepository.findById(booking.getRoom().getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + booking.getRoom().getRoomId()));

        // Validate room availability
        if (!room.getAvailable()) {
            throw new RuntimeException("Room is not available");
        }

        // Validate email format
        if (!Pattern.matches(EMAIL_REGEX, booking.getGuestEmail())) {
            throw new RuntimeException("Invalid email format");
        }

        // Validate date order
        if (booking.getCheckOutDate().isBefore(booking.getCheckInDate()) || 
            booking.getCheckOutDate().isEqual(booking.getCheckInDate())) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }


        // Calculate total price
        long days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        booking.setTotalPrice(room.getPricePerNight() * days);
        booking.setStatus("PENDING");
        booking.setCreatedAt(LocalDate.now());

        return bookingRepository.save(booking);
    }

    public Booking updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        if (!status.equals("APPROVED") && !status.equals("REJECTED")) {
            throw new RuntimeException("Invalid status");
        }

        booking.setStatus(status);
        
        if (status.equals("APPROVED")) {
            Room room = booking.getRoom();
            room.setAvailable(false);
            roomRepository.save(room);
        }

        return bookingRepository.save(booking);
    }
}