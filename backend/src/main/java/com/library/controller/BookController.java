package com.library.controller;

import com.library.model.Book;
import com.library.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
public class BookController {

    private final BookRepository repository;

    public BookController(BookRepository repository) {
        this.repository = repository;
    }

    // CREATE
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return repository.save(book);
    }

    // READ ALL
    @GetMapping
    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book updatedBook) {
        return repository.findById(id).map(book -> {
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setYear(updatedBook.getYear());
            book.setCategory(updatedBook.getCategory());
            book.setPageCount(updatedBook.getPageCount());
            return repository.save(book);
        }).orElse(null);
    }

    // UPDATE Availability
    // public Book updateBookAvailability(@PathVariable Long id, @RequestBody Book updatedBook){
    //     return repository.findById(id).map(book -> {
    //         if(book.getAvailability()){
    //             book.setAvailability(false)
    //         } else {
    //             book.setAvailability(true)
    //         }
    //         return repository.save(book);
    //     }).orElse(null);
    // }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
